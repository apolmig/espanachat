import { test } from "node:test";
import assert from "node:assert/strict";
import {
  guides,
  sources,
  findGuide,
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
test("basic personal-data patterns are blocked without blocking ordinary questions", () => {
  for (const text of [
    "DNI 00000000T",
    "NIE X0000000T",
    "demo@example.test",
    "ES00 0000 0000 0000 0000 0000",
    "Tel 600 000 000",
  ])
    assert.equal(hasPersonalData(text), true, text);
  for (const g of guides) assert.equal(hasPersonalData(g.question), false);
});
