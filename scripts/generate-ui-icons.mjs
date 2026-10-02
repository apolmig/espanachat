import { mkdir, writeFile, copyFile } from "node:fs/promises";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  Info,
  Paperclip,
  Microphone,
  ArrowRight,
  CaretLeft,
  CaretRight,
  Play,
  Pause,
  Fingerprint,
  Sparkle,
  LockSimple,
  Laptop,
  DeviceMobile,
  Globe,
} from "@phosphor-icons/react";

const icons = {
  info: Info,
  paperclip: Paperclip,
  microphone: Microphone,
  arrow: ArrowRight,
  previous: CaretLeft,
  next: CaretRight,
  play: Play,
  pause: Pause,
  fingerprint: Fingerprint,
  stars: Sparkle,
  lock: LockSimple,
};
await mkdir("public/assets/icons", { recursive: true });
await mkdir("public/assets/devices", { recursive: true });
for (const [name, Icon] of Object.entries(icons)) {
  await writeFile(
    `public/assets/icons/${name}.svg`,
    renderToStaticMarkup(
      createElement(Icon, { size: 256, weight: "regular", color: "#000c1f" }),
    ),
  );
}
for (const [name, Icon, colour] of [
  ["laptop", Laptop, "#002664"],
  ["mobile", DeviceMobile, "#0c756f"],
  ["browser", Globe, "#146bc1"],
]) {
  const symbol = renderToStaticMarkup(
    createElement(Icon, {
      size: 156,
      weight: "regular",
      color: colour,
    }),
  );
  await writeFile(
    `public/assets/devices/${name}.svg`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><defs><linearGradient id="background" x2="1" y2="1"><stop stop-color="#ffffff"/><stop offset="1" stop-color="#edf3fa"/></linearGradient></defs><circle cx="128" cy="128" r="122" fill="url(#background)" stroke="#dae4ef" stroke-width="2"/><g transform="translate(50 50)">${symbol}</g></svg>`,
  );
}
await copyFile(
  "node_modules/@phosphor-icons/react/LICENSE",
  "public/assets/icons/Phosphor-MIT.txt",
);
console.log(
  "Generated eleven Phosphor icons and three device illustrations with MIT attribution.",
);
