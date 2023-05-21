import { mkdir, writeFile } from "fs/promises";
import path from "path";
import prompts from "prompts";

function safeFilename(str) {
  // Remove any characters that are not letters, digits, or a period
  let cleaned = str.replace(/[^a-zA-Z0-9. _]/g, "");

  // Replace any spaces with underscores
  cleaned = cleaned.replace(/ /g, "_");

  // Remove any leading or trailing underscores
  cleaned = cleaned.replace(/^_+|_+$/g, "");

  // Convert to lowercase and return
  return cleaned.toLowerCase();
}

const { name } = await prompts({
  type: "text",
  name: "name",
  message: "Blog post title?",
});

const now = new Date();
const year = `${now.getFullYear()}`;
const month = `${now.getMonth() + 1}`.padStart(2, "0");
const day = `${now.getDay()}`.padStart(2, "0");
const ymdString = `${year}_${month}_${day}`;
const dirname = safeFilename(`${ymdString}_${name}`);

const blogsDir = "blogs";
const blogDir = path.join(blogsDir, dirname);
const mdPath = path.join(blogDir, "blog.md");
const metaPath = path.join(blogDir, "meta.json");

await mkdir(blogDir, { recursive: true });

console.log(`:: Creating ${mdPath}`);
await writeFile(mdPath, `${name}\n---\n`);

console.log(`:: Creating ${metaPath}`);
const meta = {
  title: name,
  description: "",
  thumbnail: "",
  time: now.toISOString(),
  categories: [],
};
await writeFile(metaPath, JSON.stringify(meta, null, 2));
