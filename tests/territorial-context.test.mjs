import { test } from "node:test";
import assert from "node:assert/strict";
import {
  guides,
  sources,
  resolveConsultation,
  getGuideContent,
} from "../src/knowledge.js";
import {
  regions,
  municipalities,
  findRegion,
  findMunicipality,
} from "../src/territorial-services.js";
import {
  prepareTerritory,
  isMunicipalityName,
} from "../src/territorial-context.js";

test("health selection covers every autonomous community and both autonomous cities", () => {
  assert.equal(regions.length, 19);
  assert.equal(new Set(regions.map((region) => region.id)).size, 19);
  for (const region of regions) {
    const territory = prepareTerritory("region", { id: region.id });
    const content = getGuideContent("sanitaria", null, "es", territory);
    assert.equal(content.territory.label, region.label);
    assert.equal(
      content.actions[0][0],
      `region:${region.id}${region.mainSource ? ":main" : ""}`,
    );
    for (const ref of [
      ...content.stepRefs.flat(),
      ...content.actions.map(([ref]) => ref),
    ]) {
      assert.ok(content.refs.includes(ref));
      assert.ok(sources[ref]);
      const url = new URL(sources[ref].url);
      assert.equal(url.protocol, "https:");
      assert.ok(
        url.hostname === sources[ref].domain ||
          url.hostname.endsWith(`.${sources[ref].domain}`),
      );
    }
  }
  for (const id of ["ceuta", "melilla"])
    assert.match(sources[`region:${id}`].name, /INGESA/);
  assert.equal(prepareTerritory("region", { id: "invented" }), null);
});

test("municipal guidance distinguishes reviewed destinations from the directory fallback", () => {
  for (const municipality of municipalities) {
    const territory = prepareTerritory("municipality", {
      label: municipality.label,
    });
    const content = getGuideContent("padron", "certificate", "en", territory);
    assert.equal(content.territory.id, municipality.id);
    assert.equal(content.actions[0][0], `municipality:${municipality.id}`);
    assert.match(content.territoryNotice, /Official service/);
  }
  const unknown = prepareTerritory("municipality", { label: "Alpedrete" });
  const content = getGuideContent("padron", null, "es", unknown);
  assert.equal(content.territory.id, null);
  assert.match(
    content.territoryNotice,
    /No tenemos un enlace municipal revisado/,
  );
  assert.equal(content.actions[0][0], "localDirectory");
  assert.ok(!content.refs.some((ref) => ref.startsWith("municipality:")));
  assert.equal(getGuideContent("sanitaria").territory, undefined);
  assert.equal(
    getGuideContent("certificado", null, "es", unknown).territory,
    undefined,
  );
});

test("registration and replacement keep destinations distinct from certificates and first cards", () => {
  const madrid = prepareTerritory("municipality", { label: "Madrid" });
  const registration = getGuideContent("padron", null, "es", madrid);
  const certificate = getGuideContent("padron", "certificate", "es", madrid);
  assert.equal(registration.actions[0][0], "municipality:madrid:main");
  assert.equal(certificate.actions[0][0], "municipality:madrid");
  assert.notEqual(
    sources[registration.actions[0][0]].url,
    sources[certificate.actions[0][0]].url,
  );
  const catalonia = prepareTerritory("region", { id: "cataluna" });
  const firstCard = getGuideContent("sanitaria", null, "es", catalonia);
  const replacement = getGuideContent(
    "sanitaria",
    "replacement",
    "es",
    catalonia,
  );
  assert.notEqual(
    sources[firstCard.actions[0][0]].url,
    sources[replacement.actions[0][0]].url,
  );
  assert.match(replacement.actions[0][1], /duplicado/i);
  const pending = getGuideContent(
    "sanitaria",
    null,
    "es",
    prepareTerritory("region", { id: "castilla-la-mancha" }),
  );
  assert.match(pending.territoryNotice, /pendiente de revisión/);
});

test("territory follows the answer and is cleared by another topic or an unknown answer", () => {
  const madrid = resolveConsultation("Quiero empadronarme en Madrid");
  assert.equal(madrid.guide.id, "padron");
  assert.equal(madrid.territory.id, "madrid");
  const previous = {
    guide: madrid.guide.id,
    detail: madrid.detail,
    territory: madrid.territory,
  };
  const detail = resolveConsultation(
    guides.find((g) => g.id === "padron").detail.question,
    previous,
  );
  assert.equal(detail.territory.id, "madrid");
  assert.equal(
    resolveConsultation("Necesito una tarjeta sanitaria", previous).territory,
    null,
  );
  assert.equal(
    resolveConsultation("Qué tiempo hace en Madrid", previous).guide,
    null,
  );
  assert.equal(
    resolveConsultation("Qué tiempo hace en Madrid", previous).territory,
    null,
  );
  assert.equal(resolveConsultation("Madrid", { guide: null }).guide, null);
  assert.equal(
    resolveConsultation("Madrid", { ...previous, stopped: true }).guide,
    null,
  );
  const changed = resolveConsultation(
    "Quiero empadronarme en Barcelona",
    previous,
  );
  assert.equal(changed.territory.id, "barcelona");
  const unknownTown = resolveConsultation(
    "Quiero empadronarme en Cuenca",
    previous,
  );
  assert.equal(unknownTown.territory, null);
  for (const ending of ["Cuenca", "internet", "la web", "persona"]) {
    for (const punctuation of ["", "?"])
      assert.equal(
        resolveConsultation(
          `Cómo pido un certificado de empadronamiento en ${ending}${punctuation}`,
          previous,
        ).territory,
        null,
      );
  }
  assert.equal(
    resolveConsultation("Padrón en Madrid o Barcelona", previous).territory,
    null,
  );
  assert.equal(
    resolveConsultation("Padrón Madrid y Barcelona", previous).territory,
    null,
  );
  const previousHealth = {
    guide: "sanitaria",
    territory: prepareTerritory("region", { id: "madrid" }),
  };
  assert.equal(
    resolveConsultation("Tarjeta sanitaria en París", previousHealth).territory,
    null,
  );
  for (const question of [
    "¿Cómo solicito la tarjeta sanitaria para Asturias?",
    "How do I apply for the health card for Catalonia?",
    "Quiero mi tarjeta sanitaria pero no vivo en Madrid",
  ])
    assert.equal(resolveConsultation(question, previousHealth).territory, null);
  // An old card's follow-up uses that card's context, even if another card exists.
  const fromOriginal = resolveConsultation(
    guides.find((g) => g.id === "padron").detail.question,
    previous,
  );
  assert.equal(fromOriginal.territory.id, "madrid");
});

test("a bare place answers a pending territorial question without stealing unrelated queries", () => {
  const health = { guide: "sanitaria", detail: null };
  assert.equal(
    resolveConsultation("Andalucía", health).territory.id,
    "andalucia",
  );
  assert.equal(
    resolveConsultation("Vivo en Ceuta", health).territory.id,
    "ceuta",
  );
  assert.equal(
    resolveConsultation("How do I get a health card in Galicia").territory.id,
    "galicia",
  );
  assert.equal(
    resolveConsultation("Madrid", { guide: "padron" }).territory.id,
    "madrid",
  );
  assert.equal(
    resolveConsultation("Qué tiempo hace en Andalucía", health).guide,
    null,
  );
  assert.equal(
    resolveConsultation("Necesito una receta en Andalucía", health).guide,
    null,
  );
});

test("places are not inferred from addresses, ambiguous names or two locations", () => {
  for (const text of [
    "calle Madrid 22",
    "en Alcalá de Madrid",
    "Madrid y Barcelona",
    "vivo en Madrid o en Barcelona",
    "https://example.test/Madrid",
    "demo@example.test",
  ]) {
    assert.equal(findMunicipality(text), null, text);
  }
  for (const text of [
    "en Galicia o Andalucía",
    "calle Madrid 22",
    "Madrid y Aragón",
  ])
    assert.equal(findRegion(text), null, text);
  for (const text of [
    "calle Alcalá",
    "Madrid 28001",
    "demo@example.test",
    "",
    "600000000",
    "12345678T",
    "Madrid\nBarcelona",
    "..",
    "--",
  ])
    assert.equal(isMunicipalityName(text), false, text);
  for (const name of [
    "A Coruña",
    "San Sebastián",
    "L'Hospitalet de Llobregat",
    "Santa Cruz de Tenerife",
  ])
    assert.equal(isMunicipalityName(name), true, name);
});
