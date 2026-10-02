import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const deployed = new URL("../dist/client/", import.meta.url);

test("ships licensed fonts and icons without archived reference assets", async () => {
  for (const file of [
    "assets/fonts/inter-variable.woff2",
    "assets/fonts/libre-caslon-display.ttf",
    "assets/fonts/Inter-OFL.txt",
    "assets/fonts/LibreCaslonDisplay-OFL.txt",
    "assets/icons/Phosphor-MIT.txt",
    "assets/devices/laptop.svg",
    "assets/devices/mobile.svg",
    "assets/devices/browser.svg",
  ]) {
    await access(new URL(file, deployed));
  }

  const fonts = await readdir(new URL("assets/fonts/", deployed));
  assert.ok(!fonts.some((file) => /rhymes|helvetica/i.test(file)));
  const photos = await readdir(new URL("assets/photos/", deployed));
  for (const original of ["family.webp", "life.webp", "outdoors.webp"]) {
    assert.ok(
      !photos.includes(original),
      `Reference photo shipped: ${original}`,
    );
  }
  for (const archive of ["qa/", "assets/reference-ui/", "assets/browsers/"]) {
    await assert.rejects(access(new URL(archive, deployed)), {
      code: "ENOENT",
    });
  }

  const chunks = await readdir(new URL("assets/", deployed));
  const styles = (
    await Promise.all(
      chunks
        .filter((file) => file.endsWith(".css"))
        .map((file) => readFile(new URL(`assets/${file}`, deployed), "utf8")),
    )
  ).join("\n");
  assert.doesNotMatch(styles, /rhymes|helvetica-now/i);
  assert.match(styles, /inter-variable\.woff2/);
  assert.match(styles, /libre-caslon-display\.ttf/);
});
