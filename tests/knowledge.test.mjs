import { test } from "node:test";
import assert from "node:assert/strict";
import {
  guides,
  sources,
  findGuide,
  resolveGuide,
  getGuideContent,
  hasPersonalData,
} from "../src/knowledge.js";

test("every suggested question resolves to its own guide in both languages", () => {
  for (const g of guides) {
    assert.equal(findGuide(g.question)?.id, g.id);
    assert.equal(findGuide(g.en.question)?.id, g.id);
  }
});
test("free-form common queries resolve despite accents and case", () => {
  assert.equal(findGuide("Necesito mi VIDA LABORAL")?.id, "vida");
  assert.equal(findGuide("Quiero renovar el pasaporte")?.id, "dni");
  assert.equal(findGuide("I lost my job")?.id, "paro");
  assert.equal(findGuide("Cómo pedir una beca de estudios")?.id, "ayudas");
  assert.equal(
    findGuide("Clave: registro y acceso a tramites publicos")?.id,
    "clave",
  );
});
test("unknown questions do not inherit an unrelated previous answer", () => {
  assert.equal(findGuide("Cómo comprar un coche", "dni"), null);
  assert.equal(findGuide("What is the weather today?", "paro"), null);
  assert.equal(findGuide("qué documentos necesito", "dni")?.id, "dni");
});
test("all guides have real source entries and supported follow-up questions", () => {
  for (const g of guides) {
    for (const ref of g.refs) {
      assert.ok(sources[ref]);
      assert.ok(sources[ref].url.startsWith("https://"));
    }
    for (const q of g.followups) {
      assert.ok(findGuide(q), q);
    }
  }
});
test("follow-ups provide a distinct answer in the same topic in both languages", () => {
  for (const guide of guides) {
    for (const lang of ["es", "en"]) {
      const question =
        lang === "en" ? guide.detail.en.question : guide.detail.question;
      const result = resolveGuide(question, "dni");
      assert.equal(result.guide?.id, guide.id, question);
      assert.equal(result.detail, guide.detail.id);
      const main = getGuideContent(guide.id, null, lang);
      const followup = getGuideContent(result.guide.id, result.detail, lang);
      assert.notEqual(followup.title, main.title);
      assert.notDeepEqual(followup.steps, main.steps);
    }
  }
});
test("short follow-ups use the current topic without carrying unrelated context", () => {
  assert.equal(
    resolveGuide("¿Qué documentos necesito?", "dni").detail,
    "documents",
  );
  assert.equal(
    resolveGuide("Sin identificación electrónica", "vida").detail,
    "without-id",
  );
  assert.equal(
    resolveGuide("Where do I register?", "paro").detail,
    "employment-service",
  );
  assert.equal(resolveGuide("¿Qué documentos necesito?", "paro").guide, null);
  assert.equal(resolveGuide("Sin identificación electrónica").guide, null);
  assert.equal(resolveGuide("Qué tiempo hace hoy", "dni").guide, null);
  assert.equal(resolveGuide(guides[1].question, "dni").detail, null);
});
test("every step and action points to a source included in its answer", () => {
  for (const guide of guides) {
    for (const detail of [null, guide.detail.id]) {
      const content = getGuideContent(guide.id, detail);
      assert.equal(content.stepRefs.length, content.steps.length);
      for (const ref of [
        ...content.stepRefs.flat(),
        ...content.actions.map(([ref]) => ref),
      ]) {
        assert.ok(content.refs.includes(ref), `${guide.id}/${detail}: ${ref}`);
        assert.ok(sources[ref], ref);
        const url = new URL(sources[ref].url);
        assert.equal(url.protocol, "https:");
        assert.ok(url.hostname.endsWith(sources[ref].domain), ref);
      }
      assert.match(content.reviewedAt, /^\d{4}-\d{2}-\d{2}$/);
    }
  }
  assert.equal(getGuideContent("unknown"), null);
});
test("practical actions land on the appropriate service, not the first source", () => {
  assert.equal(getGuideContent("dni").actions[0][0], "cita");
  assert.equal(
    getGuideContent("paro", "employment-service").actions[0][0],
    "demanda",
  );
  assert.equal(getGuideContent("ayudas").actions[0][0], "ayudas");
  assert.equal(getGuideContent("renta").actions[0][0], "irpf");
});
test("generic words and word fragments do not select unrelated guides", () => {
  for (const query of [
    "I need to exchange my driving licence",
    "Necesito ayuda",
    "Vivo en un enclave de cuarenta habitantes",
  ])
    assert.equal(findGuide(query), null, query);
  assert.equal(findGuide("Quiero renovar el paro")?.id, "paro");
  assert.equal(findGuide("¿Dónde encuentro becas?")?.id, "ayudas");
  assert.equal(findGuide("I need rent support")?.id, "ayudas");
  assert.equal(
    findGuide("Quiero renovar mi tarjeta sanitaria")?.id,
    "sanitaria",
  );
  assert.equal(
    findGuide("¿Cómo saco el certificado de empadronamiento?")?.id,
    "padron",
  );
  assert.equal(findGuide("Necesito un certificado digital")?.id, "certificado");
  assert.equal(
    findGuide("Quiero renovar mi certificado electrónico")?.id,
    "certificado",
  );
});
test("expanded national procedures resolve to the right guide and useful follow-up", () => {
  for (const [query, id, detail] of [
    ["Renovar mi tarjeta sanitaria europea", "tse", null],
    ["No me llega la TSE y necesito un CPS", "tse", "provisional"],
    ["I need to renew my driving licence", "conducir", null],
    ["He perdido el permiso de conducir", "conducir", "duplicate"],
    ["Certificado electrónico de nacimiento", "nacimiento", null],
    [
      "Birth certificate without a digital certificate",
      "nacimiento",
      "without-id",
    ],
    ["Solicitar NUSS por primera vez", "nuss", null],
    ["¿Cuál es mi número de la Seguridad Social?", "nuss", "consult"],
  ]) {
    const result = resolveGuide(query);
    assert.equal(result.guide?.id, id, query);
    assert.equal(result.detail, detail, query);
    assert.equal(getGuideContent(id, detail).guideId, id, query);
  }
  for (const query of [
    "Tarjeta sanitaria europea y tarjeta sanitaria regional",
    "Certificado de nacimiento y certificado digital",
    "Consultar NUSS y vida laboral",
    "Renovar el DNI y el permiso de conducir",
    "Primer permiso de conducir",
    "Certificado de matrimonio sin Cl@ve",
  ]) {
    assert.equal(resolveGuide(query, "dni").guide, null, query);
  }
});
test("basic personal-data patterns are blocked without blocking ordinary questions", () => {
  for (const text of [
    "DNI 00000000T",
    "NIE X0000000T",
    "demo@example.test",
    "ES00 0000 0000 0000 0000 0000",
    "Tel 600 000 000",
    "NUSS 281234567890",
    "NAF 28/12345678/90",
    "NUSS 28 / 12345678 / 90",
  ])
    assert.equal(hasPersonalData(text), true, text);
  for (const g of guides) {
    for (const question of [
      g.question,
      g.en.question,
      g.detail.question,
      g.detail.en.question,
    ]) {
      assert.equal(hasPersonalData(question), false, question);
    }
  }
});
