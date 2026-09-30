import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import { createCanvas, loadImage } from "@napi-rs/canvas";

const publicDir = new URL("../public/", import.meta.url);

const mark = `<rect width="64" height="64" rx="16" fill="#002664"/>
<path d="M20 14h24a6 6 0 0 1 6 6v18a6 6 0 0 1-6 6H30l-10 8v-8a6 6 0 0 1-6-6V20a6 6 0 0 1 6-6Z" fill="white"/>
<rect x="22" y="21" width="20" height="4" rx="1" fill="#c82632"/>
<rect x="22" y="25" width="20" height="7" fill="#f2c800"/>
<rect x="22" y="32" width="20" height="4" rx="1" fill="#c82632"/>`;
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><title>España</title>${mark}</svg>`;

function render(svg, width) {
  return new Resvg(svg, { fitTo: { mode: "width", value: width } })
    .render()
    .asPng();
}

function ico(frames) {
  const header = Buffer.alloc(6 + 16 * frames.length);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(frames.length, 4);
  let offset = header.length;
  frames.forEach(({ size, data }, index) => {
    const entry = 6 + index * 16;
    header[entry] = size;
    header[entry + 1] = size;
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(data.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...frames.map((frame) => frame.data)]);
}

// ImageGen supplies the finished artwork. This step only exports web formats.
const master = await loadImage(
  fileURLToPath(
    new URL("../assets/branding/social-card-master-v2.png", import.meta.url),
  ),
);
const socialCanvas = createCanvas(1200, 630);
socialCanvas.getContext("2d").drawImage(master, 0, 0, 1200, 630);
const socialJpeg = socialCanvas.encodeSync("jpeg", 88);
const card = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<title>España. Plaza de España de Sevilla al atardecer.</title>
<image width="1200" height="630" href="data:image/jpeg;base64,${socialJpeg.toString("base64")}"/>
</svg>`;

await mkdir(publicDir, { recursive: true });
await writeFile(new URL("favicon.svg", publicDir), icon);
await writeFile(
  new URL("favicon.ico", publicDir),
  ico([16, 32, 48].map((size) => ({ size, data: render(icon, size) }))),
);
for (const size of [32, 192, 512]) {
  const name = size === 32 ? "favicon-32x32.png" : `icon-${size}.png`;
  await writeFile(new URL(name, publicDir), render(icon, size));
}
await writeFile(
  new URL("apple-touch-icon.png", publicDir),
  render(icon.replace('rx="16"', 'rx="0"'), 180),
);
await writeFile(new URL("social-card.svg", publicDir), card);
await writeFile(new URL("social-card-v2.jpg", publicDir), socialJpeg);
await writeFile(
  new URL("social-card.png", publicDir),
  socialCanvas.encodeSync("png"),
);
await writeFile(
  new URL("site.webmanifest", publicDir),
  JSON.stringify(
    {
      id: "/",
      name: "España · Tus servicios públicos, más cerca",
      short_name: "España",
      lang: "es",
      start_url: "/",
      scope: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#002664",
      icons: [192, 512].map((size) => ({
        src: `/icon-${size}.png`,
        sizes: `${size}x${size}`,
        type: "image/png",
        purpose: "any",
      })),
    },
    null,
    2,
  ) + "\n",
);
console.log(
  "Generated icons, manifest and photographic 1200 × 630 social card.",
);
