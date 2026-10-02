import { createCanvas, loadImage } from "@napi-rs/canvas";
import { writeFile } from "node:fs/promises";
for (const name of ["spain-family-v2", "spain-work-v2", "spain-coast-v2"]) {
  const img = await loadImage(`assets/photography/${name}.png`);
  const canvas = createCanvas(1200, 800);
  canvas.getContext("2d").drawImage(img, 0, 0, 1200, 800);
  const webp = await canvas.encode("webp", 84);
  await writeFile(`public/assets/photos/${name}.webp`, webp);
  console.log(`${name}: ${webp.length} bytes`);
}
