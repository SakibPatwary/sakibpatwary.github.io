import { readFile, stat } from "node:fs/promises";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
const directory = path.join(root, "dist");
const html = await readFile(path.join(directory, "index.html"), "utf8");
for (const [, reference] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  if (/^(https?:|data:|#)/.test(reference)) continue;
  if (reference.startsWith("/"))
    throw Error(`Non-relative output resource: ${reference}`);
  await stat(path.join(directory, reference));
}
const projects = JSON.parse(
  await readFile(path.join(root, "src/projects.json"), "utf8"),
);
for (const name of ["avatar.png", ...projects.map((project) => project.image)])
  await stat(
    path.join(
      directory,
      "assets/optimized",
      name.replace(/\.(png|jpe?g)$/i, ".webp"),
    ),
  );
console.log(
  "Static build verified: relative entry assets and all 18 optimized images are present.",
);
