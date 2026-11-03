import sharp from "sharp";
import { mkdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
const projects = JSON.parse(
  await readFile(path.join(root, "src/projects.json"), "utf8"),
);
const images = [
  ...new Set(["avatar.png", ...projects.map((project) => project.image)]),
];
const output = path.join(root, "public/assets/optimized");
await mkdir(output, { recursive: true });
let originalBytes = 0,
  optimizedBytes = 0;
await Promise.all(
  images.map(async (name) => {
    const input = path.join(root, "public/assets/images", name);
    const target = path.join(output, name.replace(/\.(png|jpe?g)$/i, ".webp"));
    const sourceInfo = await stat(input);
    originalBytes += sourceInfo.size;
    let current;
    try {
      current = await stat(target);
    } catch {}
    if (!current || current.mtimeMs < sourceInfo.mtimeMs) {
      await sharp(input)
        .rotate()
        .resize({
          width: name === "avatar.png" ? 400 : 1000,
          height: 1000,
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({ quality: 84, effort: 5 })
        .toFile(target);
      current = await stat(target);
    }
    optimizedBytes += current.size;
  }),
);
console.log(
  `Images: ${images.length} WebP assets, ${(originalBytes / 1024).toFixed(0)} KB → ${(optimizedBytes / 1024).toFixed(0)} KB (${Math.round((1 - optimizedBytes / originalBytes) * 100)}% smaller).`,
);
