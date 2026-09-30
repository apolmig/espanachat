import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import { openSync } from "fontkit";

const publicDir = new URL("../public/", import.meta.url);
const serif = openSync(
  fileURLToPath(
    new URL("assets/fonts/rhymes-display-regular.C9G6ykf7.woff2", publicDir),
  ),
);
const sans = openSync(
  fileURLToPath(
    new URL("assets/fonts/helvetica-now-text-400.DgICZbSh.woff2", publicDir),
  ),
);

// Outlined text renders identically without relying on the machine's fonts.
function textPaths(font, text, size, x, y, fill, tracking = 0) {
  const run = font.layout(text);
  const scale = size / font.unitsPerEm;
  let pen = x;
  const paths = run.glyphs.map((glyph, index) => {
    const position = run.positions[index];
    const path = `<path fill="${fill}" transform="translate(${pen + position.xOffset * scale} ${y - position.yOffset * scale}) scale(${scale} ${-scale})" d="${glyph.path.toSVG()}"/>`;
    pen += position.xAdvance * scale + tracking;
    return path;
  });
  return { svg: paths.join(""), width: pen - x };
}

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

const title = textPaths(serif, "España", 184, 64, 330, "#ffffff", -8);
const dot = textPaths(serif, ".", 184, 64 + title.width, 330, "#ef5965");
const card = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<title>España. Tus servicios públicos, más cerca.</title>
<desc>Tarjeta de presentación de espana.chat</desc>
<defs><linearGradient id="background" x2="1" y2="1"><stop stop-color="#002664"/><stop offset="1" stop-color="#000c1f"/></linearGradient></defs>
<rect width="1200" height="630" fill="url(#background)"/>
<g transform="translate(64 56) scale(1.125)">${mark}</g>
${textPaths(sans, "espana.chat", 30, 155, 103, "#d9e4f5").svg}
${title.svg}${dot.svg}
${textPaths(sans, "Tus servicios públicos,", 42, 70, 422, "#ffffff").svg}
${textPaths(sans, "más cerca.", 42, 70, 474, "#ffffff").svg}
<g transform="translate(880 188) scale(3.35)" opacity="0.12">${mark.replace('fill="#002664"', 'fill="none"')}</g>
<path d="M70 536H1130" stroke="#ffffff" stroke-opacity="0.18"/>
${textPaths(sans, "Guías claras. Fuentes oficiales.", 23, 70, 580, "#bfcee3").svg}
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
await writeFile(new URL("social-card.png", publicDir), render(card, 1200));
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
  "Generated SVG/ICO/PNG icons, Apple icon, manifest and 1200 × 630 social card.",
);
