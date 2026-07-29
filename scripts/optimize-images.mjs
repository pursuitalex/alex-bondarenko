/**
 * assets/ (originals, local-only) → public/ (optimized, what the site serves).
 *
 * Run it after replacing any original:  npm run images
 *
 * Rasters are re-encoded to WebP at the SAME pixel size — the sources are
 * already sized for their slots (hero 2000×865 for a 1920 frame, project
 * shots 737×480), so scaling here would only cost sharpness. A fully-opaque
 * alpha channel is dropped: Figma exports one even when nothing is
 * transparent, and it inflates the file for nothing.
 *
 * SVGs are copied verbatim — they are already vector and tiny.
 */
import sharp from "sharp";
import { readdir, mkdir, copyFile, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const QUALITY = 85; // visually lossless for photos; raise if you spot artefacts

/** [source dir, destination dir] */
const DIRS = [
  ["assets/images", "public"],
  ["assets/projects", "public/projects"],
  ["assets/projects/logos", "public/projects/logos"],
  ["assets/icons", "public"],
  ["assets/icons/tech-icons", "public/tech-icons"],
  ["assets/work-previews", "public/work-previews"],
];

const RASTER = /\.(png|jpe?g)$/i;
const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

let before = 0;
let after = 0;
const rows = [];

for (const [srcRel, destRel] of DIRS) {
  const srcDir = path.join(ROOT, srcRel);
  const destDir = path.join(ROOT, destRel);
  if (!existsSync(srcDir)) continue;
  await mkdir(destDir, { recursive: true });

  const entries = await readdir(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile()) continue; // nested dirs are listed explicitly above
    const src = path.join(srcDir, entry.name);

    if (RASTER.test(entry.name)) {
      const out = path.join(destDir, entry.name.replace(RASTER, ".webp"));
      const image = sharp(src);
      // Drop a pointless alpha channel, but only when nothing is transparent.
      const { isOpaque } = await image.stats();
      const buf = await (isOpaque ? image.flatten() : image)
        .webp({ quality: QUALITY, effort: 6 })
        .toBuffer();
      await writeFile(out, buf);

      const srcSize = (await stat(src)).size;
      before += srcSize;
      after += buf.length;
      rows.push(
        `  ${path.relative(ROOT, out).padEnd(34)} ${kb(srcSize).padStart(8)} → ${kb(buf.length).padStart(8)}  −${Math.round((1 - buf.length / srcSize) * 100)}%`,
      );
    } else if (entry.name.endsWith(".svg")) {
      await copyFile(src, path.join(destDir, entry.name));
    }
  }
}

if (rows.length === 0) {
  // assets/ is deliberately not in git, so a fresh clone simply has no
  // originals — /public already holds everything the site needs.
  console.log(
    "\n  No originals found under assets/ — nothing to do.\n" +
      "  That folder is local-only (see .gitignore); /public is already built.\n",
  );
  process.exit(0);
}

console.log(rows.join("\n"));
console.log(
  `\n  ${rows.length} images: ${kb(before)} → ${kb(after)}  (−${Math.round((1 - after / before) * 100)}%, saved ${kb(before - after)})`,
);
