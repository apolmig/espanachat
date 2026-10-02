import { test } from "node:test";
import assert from "node:assert/strict";
import { guides } from "../src/knowledge.js";
import { buildGuidePath, readGuideLink } from "../src/guide-links.js";

test("every main and detail guide round-trips in both languages", () => {
  for (const guide of guides) {
    for (const detail of [null, guide.detail.id]) {
      for (const lang of ["es", "en"]) {
        const path = buildGuidePath(guide, detail, lang);
        assert.ok(path.startsWith("/chat?"));
        const url = new URL(path, "https://espana.chat");
        const result = readGuideLink(url.search, guides);
        assert.equal(result.guide, guide);
        assert.equal(result.detail, detail);
        assert.equal(result.lang, lang);
        assert.deepEqual(
          [...url.searchParams.keys()],
          [
            "guia",
            ...(detail ? ["detalle"] : []),
            ...(lang === "en" ? ["idioma"] : []),
          ],
        );
      }
    }
  }
});

test("sharing defaults to the main Spanish guide and only uses catalogue detail IDs", () => {
  const guide = guides.find(({ id }) => id === "padron");
  assert.equal(buildGuidePath(guide), "/chat?guia=padron");
  assert.equal(
    buildGuidePath(guide, "certificate", "en"),
    "/chat?guia=padron&detalle=certificate&idioma=en",
  );
  assert.equal(buildGuidePath(guide, "renewal", "fr"), "/chat?guia=padron");
  assert.equal(
    buildGuidePath({ id: "padron", detail: { id: "made-up" } }, "made-up"),
    "/chat?guia=padron",
  );
  for (const guide of [
    null,
    undefined,
    "padron",
    {},
    { id: "unknown" },
    { id: "../padron" },
    { id: "padrón" },
  ])
    assert.equal(buildGuidePath(guide, "certificate", "en"), null);
});

test("missing, unknown and duplicate guide parameters do not resolve an answer", () => {
  for (const search of [
    "",
    "?idioma=en",
    "?guia=",
    "?guia=unknown",
    "?guia=PADRON",
    "?guia=padr%C3%B3n",
    "?guia=padron&guia=padron",
    "?guia=padron&guia=sanitaria",
    "?guia=padron&guia=unknown",
    "?guia=..%2Fpadron",
    "?guia=%E0%A4%A",
  ])
    assert.equal(readGuideLink(search, guides), null, search);
  assert.equal(readGuideLink("?guia=padron", []), null);
  assert.equal(readGuideLink("?guia=padron", undefined), null);
  const padron = guides.find(({ id }) => id === "padron");
  assert.equal(readGuideLink("?guia=padron", [padron, padron]), null);
  for (const search of [null, undefined, 5, { guia: "padron" }])
    assert.equal(readGuideLink(search, guides), null);
});

test("optional fields fall back safely instead of choosing unsupported content", () => {
  const padron = guides.find(({ id }) => id === "padron");
  for (const search of [
    "?guia=padron&detalle=renewal",
    "?guia=padron&detalle=certificate&detalle=certificate",
    "?guia=padron&detalle=certificate&detalle=replacement",
    "?guia=padron&detalle=certificad%C3%B3",
  ])
    assert.deepEqual(readGuideLink(search, guides), {
      guide: padron,
      detail: null,
      lang: "es",
    });
  for (const language of ["", "es", "EN", "fr", "ingl%C3%A9s", "en&idioma=en"])
    assert.equal(
      readGuideLink(`?guia=padron&idioma=${language}`, guides).lang,
      "es",
    );
  assert.equal(
    readGuideLink("?guia=padron&detalle=bad&idioma=en", guides).lang,
    "en",
  );
});

test("unrelated Unicode, private-looking query fields and supplied context are never shared", () => {
  const padron = guides.find(({ id }) => id === "padron");
  const result = readGuideLink(
    new URLSearchParams({
      guia: "padron",
      detalle: "certificate",
      idioma: "en",
      pregunta: "¿Dónde vivo? María, calle Prueba 42",
      municipio: "A Coruña",
      territory: "Madrid",
      conversation: "demo@example.test",
      url: "https://example.test/private",
    }),
    guides,
  );
  assert.deepEqual(result, {
    guide: padron,
    detail: "certificate",
    lang: "en",
  });
  const path = buildGuidePath(
    {
      ...result.guide,
      territory: { label: "A Coruña" },
      question: "DNI 00000000T",
      conversation: "demo@example.test",
    },
    result.detail,
    result.lang,
  );
  assert.equal(path, "/chat?guia=padron&detalle=certificate&idioma=en");
});

test("the reader resolves the caller's whitelist without mutating search parameters", () => {
  const guide = { id: "local-guide", detail: { id: "local-detail" } };
  const params = new URLSearchParams(
    "guia=local-guide&detalle=local-detail&idioma=en&extra=%C3%B1",
  );
  const before = params.toString();
  assert.deepEqual(readGuideLink(params, [guide]), {
    guide,
    detail: "local-detail",
    lang: "en",
  });
  assert.equal(params.toString(), before);
  assert.equal(readGuideLink(params, guides), null);
  assert.equal(buildGuidePath(guide, "local-detail", "en"), null);
});
