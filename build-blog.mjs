import { glob } from "glob";
import path from "path";
import Handlebars from "handlebars";
import { mkdir, readFile, stat, writeFile } from "fs/promises";
import {marked} from "marked";
import {markedHighlight} from "marked-highlight";
import hljs from 'highlight.js';

marked.use(markedHighlight({
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  }
}));

const blogsDir = "blogs";
const blogTemplatesPattern = path.join(blogsDir, "template.*");
const blogTemplatesPrefix = path.join(blogsDir, "template.");

/** @type {(e: string | Buffer) => string } */
const bufferToString = (e) =>
  typeof e === "string" ? e : e?.toString() ?? String(e);
const bufferToJson = (e) => JSON.parse(bufferToString(e));

const templates = await glob(blogTemplatesPattern);
/** @type {Array<{ filename: string, content: string | Buffer }>} */
const templatesContent = await Promise.all(
  templates.map(async (filename) => ({
    filename: filename.replace(blogTemplatesPrefix, ""),
    content: await readFile(filename),
  }))
);

const templatable = templatesContent.map((e) => ({
  ...e,
  template: (context) => {
    if (e.filename.includes('.html') || e.filename.includes('.json') || e.filename.includes('.txt')) {
      return Handlebars.compile(bufferToString(e.content))(context)
    } else {
      // e.g. images
      return e.content
    }
  },
}));

const blogItemsDir = await glob(blogsDir + "/*/");

const validatedBlogItems = await Promise.all(
  blogItemsDir.map(async (dir) => {
    const blogPath = path.join(dir, "blog.md");
    const metaPath = path.join(dir, "meta.json");
    const statCommandFailedFactory = (filepath) => (err) => {
      const error = new Error("stat command failed for: " + filepath);
      error.cause = err;
      return error;
    };

    const readFailedFactory = (filepath) => (err) => {
      const error = new Error("read command failed for: " + filepath);
      error.cause = err;
      return error;
    };

    const blogPathExists = await stat(blogPath).catch(
      statCommandFailedFactory(blogPath)
    );
    const metaPathExists = await stat(metaPath).catch(
      statCommandFailedFactory(metaPath)
    );

    const content = await readFile(blogPath)
      .then(bufferToString)
      .catch(readFailedFactory(blogPath));

    /** @type {string} */
    const cleanedContent = content instanceof Error ? "" : content
    const meta = await readFile(metaPath)
      .then(bufferToJson)
      .catch(readFailedFactory(metaPath));
    /** @type {Record<string, string> & { time: Date }} */
    const cleanedMeta =
      meta instanceof Error
        ? {}
        : {
            ...meta,
            time: new Date(meta?.time ?? Date.now()),
            markdown: marked.parse(cleanedContent, {
              mangle: false,
            })
          };

    /** @type {Array<Error>} */
    const maybeError = [blogPathExists, metaPathExists, content, meta];

    /** @type {boolean} */
    const valid = maybeError.every((e) => !(e instanceof Error));
    return {
      blog: dir,
      valid,
      errors: maybeError.filter((e) => e instanceof Error),
      blogPath,
      metaPath,
      content: cleanedContent,
      meta: cleanedMeta,
    };
  })
);

validatedBlogItems
  .filter((e) => !e.valid)
  .forEach((e) => {
    console.error(`:: Failed to retrieve ${e.blog}`);
    e.errors.forEach((e) =>
      console.error("::    " + e?.message + "\n" + e?.stack)
    );
  });

const validBlogItems = validatedBlogItems.filter((e) => e.valid);

const blogsJson = validBlogItems.map((e) => ({
  link: path.join("/", e.blog),
  ...e.meta,
}));

const chainedPromiseCause = (err) => {
  const error = new Error("chained promise error");
  error.cause = err;
  return err;
};

const logPromiseCatch = (err) => {
  const error = new Error("chained promise error");
  error.cause = err;
  console.error(error);
};

const blogsTask = validBlogItems
  .map(async (blog, taskItem) => {
    const publicBlogsPath = path.join("public", blog.blog);
    console.log(`:: [${taskItem}] Creating directory ${publicBlogsPath}`);
    await mkdir(publicBlogsPath, { recursive: true });
    const templateTasks = templatable.map(
      async (template, templateTaskItem) => {
        const publicBlogsItem = path.join(publicBlogsPath, template.filename);
        console.log(
          `:: [${taskItem}.${templateTaskItem}] Writing ${publicBlogsItem}`
        );
        const templated = template.template(blog.meta);
        await writeFile(publicBlogsItem, templated).catch(chainedPromiseCause);
      }
    );
    await Promise.all(templateTasks);
  })


await Promise.all(blogsTask).catch(logPromiseCatch);;

const blogsJsonAsset = path.join("src", "assets", "blogs.json");
console.log(`:: Writing to ${blogsJsonAsset}`);
await writeFile(blogsJsonAsset, JSON.stringify(blogsJson, null, 2)).catch(
  logPromiseCatch
);
