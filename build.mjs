import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import fs from "node:fs";
import path from "node:path";

const marked = new Marked(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  })
);

function applyTemplate(keyValue, filename) {
  return fs
    .readFileSync(filename, "utf-8")
    .replace(/{{ ?(\w+) ?}}/g, function (substring, group) {
      return keyValue[group] ?? substring;
    });
}

function isDirectory(e) {
  try {
    const statResult = fs.statSync(e);
    return statResult.isDirectory();
  } catch (error) {
    // ignore i guess
    return false;
  }
}

function isFile(e) {
  try {
    const statResult = fs.statSync(e);
    return statResult.isFile();
  } catch (error) {
    // ignore i guess
    return false;
  }
}

function getContent(e) {
  const contentMdPath = path.join(e, "content.md");
  const metaJsonPath = path.join(e, "meta.json");

  if (!isFile(contentMdPath) || !isFile(metaJsonPath)) return null;

  try {
    const contentMd = fs.readFileSync(contentMdPath, "utf-8");
    const metaJsonStr = fs.readFileSync(metaJsonPath);
    const metaJson = JSON.parse(metaJsonStr);

    const link = path.basename(`${e}.html`);

    return {
      link,
      meta: metaJson,
      contentHTML: applyTemplate(
        {
          ...metaJson,
          link,
          content: marked.parse(contentMd),
        },
        "blog-container.template.html"
      ),
      summaryHTML: applyTemplate(
        {
          ...metaJson,
          link,
          content: [
            marked.parse(metaJson.summary),
            `<p><a href="${link}">Read more</a></p>`,
          ].join("\n"),
        },
        "blog-container.template.html"
      ),
    };
  } catch (error) {
    throw new Error(`Error compiling: ${e}`, { cause: error });
  }
}

const blogs = fs.readdirSync("blogs");

const extractedContents = blogs
  .map((name) => path.join("blogs", name))
  .filter(isDirectory)
  .map(getContent)
  .filter((e) => e)
  .reverse();

const mainPageContents = extractedContents.map((e) => e.summaryHTML).join("\n");
const mainPage = applyTemplate(
  {
    contents: mainPageContents,
    title: "Home",
    summary:
      "I enjoy sharing how I leverage functionalities of the programming languages to create " +
      "useful hacks and tricks. Hopefully, these insights can help you enhance and streamline " +
      "your own projects.",
    keywords:
      "typescript,programming,javascript,software engineering,array,data structure",
  },
  "main-page.template.html"
);

fs.writeFileSync("docs/index.html", mainPage);

for (const content of extractedContents) {
  const pageContent = applyTemplate(
    { contents: content.contentHTML, ...content.meta },
    "main-page.template.html"
  );

  fs.writeFileSync(path.join("docs", content.link), pageContent);
}
