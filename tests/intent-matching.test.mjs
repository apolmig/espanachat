import { test } from "node:test";
import assert from "node:assert/strict";
import { matchGuideIntent, matchGuideDetail } from "../src/intent-matching.js";

// Independent user queries below are not generated from matcher expressions.
// Minimal fixtures keep this routing contract independent of guide copy/content.
const questions = [
  [
    "dni",
    "¿Cómo renuevo mi DNI o pasaporte?",
    "How do I renew my ID or passport?",
  ],
  [
    "vida",
    "¿Cómo descargo mi vida laboral?",
    "How do I download my work history?",
  ],
  [
    "paro",
    "He perdido mi empleo. ¿Por dónde empiezo?",
    "I lost my job. Where do I start?",
  ],
  ["clave", "¿Cómo me registro en Cl@ve?", "How do I register for Cl@ve?"],
  [
    "carpeta",
    "¿Dónde consulto mis trámites?",
    "Where can I see my procedures?",
  ],
  [
    "renta",
    "¿Cómo hago la declaración de la renta?",
    "How do I file my income tax return?",
  ],
  [
    "ayudas",
    "¿Dónde encuentro ayudas y becas?",
    "Where can I find grants and scholarships?",
  ],
  [
    "padron",
    "¿Cómo me empadrono?",
    "How do I register on the municipal register?",
  ],
  [
    "sanitaria",
    "¿Cómo solicito mi tarjeta sanitaria?",
    "How do I apply for a health card?",
  ],
  [
    "certificado",
    "¿Cómo obtengo un certificado digital?",
    "How do I get a digital certificate?",
  ],
  [
    "tse",
    "¿Cómo solicito la Tarjeta Sanitaria Europea?",
    "How do I apply for a European Health Insurance Card?",
  ],
  [
    "conducir",
    "¿Cómo renuevo mi permiso de conducir?",
    "How do I renew my driving licence?",
  ],
  [
    "nacimiento",
    "¿Cómo pido un certificado de nacimiento?",
    "How do I request a birth certificate?",
  ],
  [
    "nuss",
    "¿Cómo solicito mi número de la Seguridad Social?",
    "How do I apply for a Social Security number?",
  ],
];
const guides = Object.freeze(
  questions.map(([id, question, en]) =>
    Object.freeze({ id, question, en: Object.freeze({ question: en }) }),
  ),
);

test("exact guide questions have priority in both languages with punctuation and accents normalized", () => {
  for (const guide of guides) {
    for (const query of [guide.question, guide.en.question]) {
      assert.equal(matchGuideIntent(query, guides), guide);
      assert.equal(
        matchGuideIntent(`  ${query.toUpperCase()}!!!  `, guides),
        guide,
      );
    }
  }
  const unfamiliar = { id: "new-topic", question: "A new suggested question!" };
  assert.equal(
    matchGuideIntent("a new suggested question", [unfamiliar]),
    unfamiliar,
  );
});

test("common Spanish and English requests select a single useful guide", () => {
  const corpus = [
    ["Se me ha caducado el pasaporte", "dni"],
    ["Necesito cita para el DNI", "dni"],
    ["Where can I renew my Spanish ID?", "dni"],
    ["I lost my passport", "dni"],
    ["Renovar DNI y pasaporte", "dni"],
    ["¿Cuánto he cotizado?", "vida"],
    ["¿Cuántos años llevo cotizando?", "vida"],
    ["Quiero mi historial laboral", "vida"],
    ["NECESITO MI VIDA LABORAL, por favor", "vida"],
    ["Where can I see my employment history?", "vida"],
    ["Download my Social Security record", "vida"],
    ["Me han echado del trabajo", "paro"],
    ["Me quedé sin empleo ayer", "paro"],
    ["Quiero renovar el paro", "paro"],
    ["I'm unemployed, where should I start?", "paro"],
    ["I've been laid off", "paro"],
    ["I got fired yesterday", "paro"],
    ["I was dismissed last week", "paro"],
    ["Quiero darme de alta en Cl@ve", "clave"],
    ["Clave: registro y acceso a trámites públicos", "clave"],
    ["¿Cómo consigo Clave PIN?", "clave"],
    ["Sign up for Cl@ve", "clave"],
    ["How can I activate Clave Permanente?", "clave"],
    ["Necesito entrar en Mi Carpeta Ciudadana", "carpeta"],
    ["Quiero revisar mis expedientes", "carpeta"],
    ["Ver el estado de mis trámites", "carpeta"],
    ["How can I access my citizen folder?", "carpeta"],
    ["I want to track my applications", "carpeta"],
    ["Quiero hacer la renta", "renta"],
    ["¿Dónde veo el borrador de la renta?", "renta"],
    ["Consultar una declaración de IRPF presentada", "renta"],
    ["How do I file my taxes?", "renta"],
    ["I need my income tax return", "renta"],
    ["¿Dónde encuentro becas?", "ayudas"],
    ["Busco ayudas para el alquiler", "ayudas"],
    ["Necesito ayuda para los estudios", "ayudas"],
    ["I need rent support", "ayudas"],
    ["Where can I find scholarships?", "ayudas"],
    ["Sacar el padrón", "padron"],
    ["Me he mudado y quiero empadronarme", "padron"],
    ["Certificado de empadronamiento", "padron"],
    ["How do I register at my town hall?", "padron"],
    ["I need a municipal residence certificate", "padron"],
    ["Darme de alta en un centro de salud", "sanitaria"],
    ["Renovar mi tarjeta sanitaria", "sanitaria"],
    ["Quiero inscribirme con el médico de cabecera", "sanitaria"],
    ["How can I apply for a regional health card?", "sanitaria"],
    ["How do I get a Spanish health insurance card?", "sanitaria"],
    ["I want to register with a GP", "sanitaria"],
    ["Certificado FNMT", "certificado"],
    ["Quiero obtener certificados digitales", "certificado"],
    ["Necesito renovar mi certificado electrónico", "certificado"],
    ["How can I get an electronic certificate?", "certificado"],
    ["I need a digital certificate", "certificado"],
    ["Necesito tarjeta sanitaria europea", "tse"],
    ["Solicitar TSE", "tse"],
    ["European health insurance card", "tse"],
    ["How do I renew my EHIC?", "tse"],
    ["I need a European health card", "tse"],
    ["Solicitar tarjeta europea de salud", "tse"],
    ["Las tarjetas sanitarias europeas de mi familia", "tse"],
    ["Pedir un certificado provisional sustitutorio", "tse"],
    ["I need a provisional replacement certificate", "tse"],
    ["I need to renew my driving licence", "conducir"],
    ["Renovar el carnet de conducir", "conducir"],
    ["Me caduca el carné de conducir", "conducir"],
    ["Mi permiso de conducir está deteriorado", "conducir"],
    ["I lost my driver's license", "conducir"],
    ["Dónde obtengo mi certificado de nacimiento", "nacimiento"],
    ["How do I request a birth certificate?", "nacimiento"],
    ["Necesito un certificado literal de nacimiento", "nacimiento"],
    ["Certificado electrónico de nacimiento", "nacimiento"],
    ["A digital birth certificate", "nacimiento"],
    ["¿Cómo pido mi partida de nacimiento con DNI?", "nacimiento"],
    ["Necesito mi partida de nacimiento con certificado digital", "nacimiento"],
    ["Solicitar mi NUSS", "nuss"],
    ["¿Cuál es mi NAF?", "nuss"],
    ["Pedir un número de afiliación", "nuss"],
    ["Necesito el número de la Seguridad Social para trabajar", "nuss"],
    ["How can I get a Spanish Social Security number?", "nuss"],
    ["Where do I find my Social Security affiliation number?", "nuss"],
  ];
  for (const [query, id] of corpus) {
    assert.equal(matchGuideIntent(query, guides)?.id, id, query);
  }
});

test("ambiguous words, fragments and unsupported procedures do not produce a guessed answer", () => {
  for (const query of [
    "Necesito ayuda",
    "Un certificado, por favor",
    "Tengo un problema",
    "¿Cómo renovar?",
    "Quiero consultar el estado",
    "La identidad",
    "Necesito firma digital",
    "Renta",
    "Clave",
    "Vivo en un enclave de cuarenta habitantes",
    "Sanitarios y certificaciones varias",
    "Tengo cotizaciones de un presupuesto",
    "What is the weather today?",
    "Quiero sacar mi primer carnet de conducir",
    "How do I get my first driving licence?",
    "Canjear un permiso de conducir extranjero",
    "Renew and exchange my foreign driving licence",
    "Necesito el permiso internacional de conducir",
    "How do I obtain an international driving permit?",
    "Renovar permiso de conducir y hacer el examen",
    "Book my driving test",
    "Certificado de nacimiento para canjear el permiso de conducir",
    "He perdido todos los puntos de mi carnet de conducir",
    "My driving licence points have expired",
    "¿Cómo renuevo mi permiso de conducir ADR?",
    "Renovar permiso de conducir extranjero",
    "Renovar mi carnet de conducir español en el extranjero",
    "Renovar mi permiso de conducir español en Francia",
    "I need to renew my Spanish driving licence abroad",
    "¿Cómo renuevo mi carnet de conducir argentino?",
    "Renew my Colombian driving licence",
    "Certificado de nacimiento para inscribir a mi recién nacido",
    "Inscripción de nacimiento en el registro civil y certificado",
    "Register my newborn and request a birth certificate",
    "Renovar un certificado de nacimiento extranjero",
    "How can I get a foreign birth certificate?",
    "¿Cómo inscribo el nacimiento con certificado digital?",
    "Quiero dar de alta a un trabajador con su NUSS",
    "Register an employee with a Social Security number",
    "Permiso de conducir",
    "Driving licence",
    "Certificado provisional",
    "CPS",
    "Número, por favor",
    "Renovar mi permiso de residencia",
    "How to obtain a residence permit",
    "Quiero sacar el NIE",
    "Renovar TIE",
    "Necesito un certificado de empresa para pedir el paro",
    "Obtener certificado de matrimonio",
    "Company certificate",
    "Certificado FNMT de representante",
    "Quiero un diagnóstico y tarjeta sanitaria",
    "Necesito una receta médica",
    "My health card and my prescription",
    "Pedir cita para síntomas nuevos",
    "Qué hacer ante un paro cardíaco",
    "Cómo pagar mis cotizaciones",
    "Pay my Social Security contributions",
    "Cómo consigo la clave de mi banco",
    "Ayuda con mi coche",
    "Tax on buying a car",
    "Cómo inscribirme en el censo electoral",
    "Me han echado de casa",
    "Me han echado",
    "Subsidio por maternidad",
    "Necesito un subsidio",
    "Quiero renovar los certificados del DNIe",
    "Quiero renovar el certificado del DNIe",
    "Renovar los certificados electrónicos del DNI electrónico",
    "I want to renew my DNIe certificates",
  ]) {
    assert.equal(matchGuideIntent(query, guides), null, query);
  }
});

test("two distinct requested topics abstain, while ID and passport remain one family", () => {
  for (const query of [
    "Necesito renovar DNI y descargar vida laboral",
    "Renta y certificado digital",
    "Sacar el padrón y pedir tarjeta sanitaria",
    "Cl@ve y certificado digital",
    "Clave y certificado digital",
    "Quiero ayudas y pedir el paro",
    "Download my work history and file my taxes",
    "Health card or passport?",
    "Quiero el padrón con certificado digital y renovar certificado digital",
    "Padrón con Cl@ve y registrarme en Cl@ve",
    "Necesito DNI y tarjeta sanitaria",
    "Tarjeta sanitaria y TSE",
    "Tarjeta sanitaria europea y tarjeta sanitaria regional",
    "European health insurance card and my regional health card",
    "Renovar mi permiso de conducir y mi DNI",
    "Duplicado del carnet de conducir y vida laboral",
    "Certificado de nacimiento y certificado digital",
    "Get an FNMT certificate and a birth certificate",
    "Consultar NUSS y descargar vida laboral",
    "Social Security number and unemployment benefits",
    "Tarjeta sanitaria europea con certificado digital y renovar certificado digital",
    "Certificado de nacimiento sin Cl@ve y darme de alta en Cl@ve",
  ]) {
    assert.equal(matchGuideIntent(query, guides), null, query);
  }
  assert.equal(
    matchGuideIntent("I want to renew my DNI and passport", guides)?.id,
    "dni",
  );
});

test("identification named only as a method does not absorb the requested procedure", () => {
  for (const [query, id] of [
    ["Descargar vida laboral con Cl@ve", "vida"],
    ["Sacar el padrón con certificado digital", "padron"],
    ["Presentar la renta mediante Clave PIN", "renta"],
    ["Download my work history using my digital certificate", "vida"],
    ["Consultar Mi Carpeta Ciudadana con DNI", "carpeta"],
    ["Solicitar TSE mediante Cl@ve", "tse"],
    ["Certificado de nacimiento con mi certificado digital", "nacimiento"],
    ["Certificado de nacimiento sin certificado digital", "nacimiento"],
    ["Certificado de nacimiento pero no tengo Cl@ve", "nacimiento"],
    ["Birth certificate without an electronic certificate", "nacimiento"],
    ["Birth certificate, I don't have a digital certificate", "nacimiento"],
    ["Consultar el NUSS usando DNI", "nuss"],
    ["Check my Social Security number with Clave", "nuss"],
  ]) {
    assert.equal(matchGuideIntent(query, guides)?.id, id, query);
  }
});

test("routing is pure and restricted to the provided guides, without context or generic keyword fallback", () => {
  const before = JSON.stringify(guides);
  assert.equal(
    matchGuideIntent(
      "Necesito tarjeta sanitaria",
      guides.filter((g) => g.id !== "sanitaria"),
    ),
    null,
  );
  assert.equal(matchGuideIntent("Qué documentos necesito", guides), null);
  assert.equal(matchGuideIntent("¿Dónde me registro?", guides), null);
  assert.equal(
    matchGuideIntent("unrelated", [{ id: "dni", keywords: ["unrelated"] }]),
    null,
  );
  for (const text of [null, undefined, 42, {}, "", "   "]) {
    assert.equal(matchGuideIntent(text, guides), null);
  }
  assert.equal(matchGuideIntent("DNI", null), null);
  assert.equal(matchGuideIntent("DNI", []), null);
  assert.equal(JSON.stringify(guides), before);
});

const detailGuides = Object.freeze(
  Object.fromEntries(
    [
      ["certificado", "renewal"],
      ["sanitaria", "replacement"],
      ["padron", "certificate"],
      ["tse", "provisional"],
      ["conducir", "duplicate"],
      ["nacimiento", "without-id"],
      ["nuss", "consult"],
    ].map(([id, detail]) => [
      id,
      Object.freeze({ id, detail: Object.freeze({ id: detail }) }),
    ]),
  ),
);

test("regional health card and certificate-based signature terminology has clear topic anchors", () => {
  for (const [query, id] of [
    ["I need a medical card", "sanitaria"],
    ["¿Cómo pido una tarjeta de salud?", "sanitaria"],
    ["He perdido mi tarjeta SIP", "sanitaria"],
    ["Solicitar una tarjeta TSI", "sanitaria"],
    ["Necesito la TSI para el centro de salud", "sanitaria"],
    ["Qué hace falta para SIP sanitaria", "sanitaria"],
    ["Firma electrónica FNMT", "certificado"],
    ["I need an FNMT digital signature", "certificado"],
    ["Obtener un certificado de firma electrónica", "certificado"],
    ["I need a digital signature certificate", "certificado"],
  ]) {
    assert.equal(matchGuideIntent(query, guides)?.id, id, query);
  }
  for (const query of [
    "TSI",
    "SIP",
    "Configurar SIP en el teléfono",
    "El motor TSI hace ruido",
    "Quiero una firma electrónica",
    "I need a digital signature",
  ]) {
    assert.equal(matchGuideIntent(query, guides), null, query);
  }
});

test("certificate renewal requests open renewal instead of obtaining a certificate", () => {
  for (const query of [
    "Quiero renovar mi certificado digital",
    "¿Cómo renuevo el certificado electrónico?",
    "Necesito la renovación de FNMT",
    "How can I renew my FNMT certificate?",
    "Renewing my electronic certificate",
    "I want to renew my digital signature certificate",
  ]) {
    assert.equal(matchGuideIntent(query, guides)?.id, "certificado", query);
    assert.equal(
      matchGuideDetail(query, detailGuides.certificado),
      "renewal",
      query,
    );
  }
  for (const query of [
    "Registrarme FNMT",
    "Obtener el certificado digital",
    "I need a new FNMT certificate",
    "Renovarlo",
    "How do I renew it?",
  ]) {
    assert.equal(
      matchGuideDetail(query, detailGuides.certificado),
      null,
      query,
    );
  }
});

test("explicit lost, stolen, damaged or duplicate health cards open replacement", () => {
  for (const query of [
    "He perdido mi tarjeta sanitaria",
    "Me han robado la tarjeta de salud",
    "Quiero un duplicado de la tarjeta sanitaria",
    "Tarjeta SIP deteriorada",
    "I lost my health card",
    "My medical card has been stolen",
    "Replace my damaged health card",
    "Necesito sustituir mi tarjeta TSI",
    "¿Cómo sustituyo mi tarjeta sanitaria?",
  ]) {
    assert.equal(matchGuideIntent(query, guides)?.id, "sanitaria", query);
    assert.equal(
      matchGuideDetail(query, detailGuides.sanitaria),
      "replacement",
      query,
    );
  }
  for (const query of [
    "Solicitar tarjeta sanitaria",
    "Health card application",
    "Darme de alta en un centro de salud",
    "Renovar tarjeta sanitaria",
    "Necesito un duplicado",
    "I've lost it",
    "He sufrido pérdida de cobertura de la tarjeta sanitaria",
  ]) {
    assert.equal(matchGuideDetail(query, detailGuides.sanitaria), null, query);
  }
});

test("municipal certificates and registration slips open proof of registration, not first registration", () => {
  for (const query of [
    "Necesito un certificado del padrón",
    "Quiero pedir un volante de empadronamiento",
    "Dónde saco un justificante de empadronamiento",
    "Certificado de inscripción en el padrón",
    "I need a municipal residence certificate",
    "How can I obtain proof of municipal registration?",
    "Municipal registration certificate",
    "Certificado de empadronamiento con mi certificado digital",
  ]) {
    assert.equal(matchGuideIntent(query, guides)?.id, "padron", query);
    assert.equal(
      matchGuideDetail(query, detailGuides.padron),
      "certificate",
      query,
    );
  }
  for (const query of [
    "Empadronarme por primera vez",
    "Sacar el padrón con certificado digital",
    "Municipal register new",
    "Pedir un certificado",
    "I need proof",
    "Justificante del banco",
  ]) {
    assert.equal(matchGuideDetail(query, detailGuides.padron), null, query);
  }
});

test("European card and regional health card queries stay in their own procedure", () => {
  for (const query of [
    "Renovar mi tarjeta sanitaria europea",
    "My EHIC has expired",
    "He perdido las tarjetas sanitarias europeas",
  ]) {
    // Repeat the free-form query to catch accidental stateful regular expressions.
    for (let attempt = 0; attempt < 3; attempt += 1) {
      assert.equal(matchGuideIntent(query, guides)?.id, "tse", query);
      assert.equal(
        matchGuideDetail(query, detailGuides.sanitaria),
        null,
        query,
      );
      assert.equal(matchGuideDetail(query, detailGuides.tse), null, query);
    }
  }
  for (const query of [
    "Necesito un certificado provisional sustitutorio",
    "No me llega la TSE y necesito un CPS",
    "Certificado provisional para la tarjeta sanitaria europea",
    "How do I get a provisional replacement certificate?",
    "I need a provisional certificate instead of my EHIC",
  ]) {
    assert.equal(matchGuideIntent(query, guides)?.id, "tse", query);
    assert.equal(
      matchGuideDetail(query, detailGuides.tse),
      "provisional",
      query,
    );
    assert.equal(matchGuideDetail(query, detailGuides.sanitaria), null, query);
  }
});

test("driving licence renewal stays separate from replacement and unsupported driving procedures", () => {
  for (const query of [
    "He perdido mi carnet de conducir",
    "Me robaron el permiso de conducir",
    "Necesito un duplicado de la licencia de conducir",
    "Replace my damaged driving licence",
    "My driver's license was stolen",
  ]) {
    assert.equal(matchGuideIntent(query, guides)?.id, "conducir", query);
    assert.equal(
      matchGuideDetail(query, detailGuides.conducir),
      "duplicate",
      query,
    );
  }
  for (const query of [
    "Renovar mi permiso de conducir",
    "El carnet de conducir está caducado",
    "He perdido el permiso de conducir y además está caducado",
    "My damaged driving licence has expired",
    "Necesito un duplicado",
    "Obtener mi primer permiso de conducir",
    "Renew my international driving permit",
    "He perdido todos los puntos de mi carnet de conducir",
    "¿Cómo renuevo mi permiso de conducir ADR?",
  ]) {
    assert.equal(matchGuideDetail(query, detailGuides.conducir), null, query);
  }
});

test("birth certificates offer the no-electronic-ID route without absorbing the FNMT topic", () => {
  for (const query of [
    "Pedir certificado de nacimiento sin identificación electrónica",
    "Certificado de nacimiento sin certificado digital",
    "Necesito un certificado de nacimiento pero no tengo Cl@ve",
    "Pedir un certificado literal de nacimiento por correo",
    "Birth certificate without an electronic ID",
    "Birth certificate, I don't have a digital certificate",
  ]) {
    assert.equal(matchGuideIntent(query, guides)?.id, "nacimiento", query);
    assert.equal(
      matchGuideDetail(query, detailGuides.nacimiento),
      "without-id",
      query,
    );
    assert.equal(
      matchGuideDetail(query, detailGuides.certificado),
      null,
      query,
    );
  }
  for (const query of [
    "Pedir certificado de nacimiento",
    "Certificado electrónico de nacimiento",
    "I need a digital birth certificate",
    "Birth certificate with my digital certificate",
    "¿Dónde puedo pedir mi certificado de nacimiento presencialmente?",
    "Request my birth certificate in person",
    "Sin identificación electrónica",
    "Obtener certificado de matrimonio sin Cl@ve",
    "Certificado de nacimiento y renovar mi certificado digital",
  ]) {
    assert.equal(matchGuideDetail(query, detailGuides.nacimiento), null, query);
  }
});

test("Social Security number lookup opens an existing-number guide and does not become work history", () => {
  for (const query of [
    "¿Cuál es mi número de la Seguridad Social?",
    "Quiero consultar mi NUSS",
    "Descargar la acreditación de mi NAF",
    "Ya tengo número de afiliación pero no lo encuentro",
    "Where can I find my Social Security number?",
    "Check my existing Social Security number with Cl@ve",
  ]) {
    assert.equal(matchGuideIntent(query, guides)?.id, "nuss", query);
    assert.equal(matchGuideDetail(query, detailGuides.nuss), "consult", query);
  }
  for (const query of [
    "Solicitar un NUSS por primera vez",
    "Necesito un número de la Seguridad Social para empezar a trabajar",
    "How do I apply for a Social Security number?",
    "Quiero consultar mi vida laboral",
    "Consultar NUSS y vida laboral",
    "¿Cuál es mi número?",
  ]) {
    assert.equal(matchGuideDetail(query, detailGuides.nuss), null, query);
  }
});

test("detail matching is pure, rejects mixed families, and requires the correct supported detail", () => {
  const before = JSON.stringify(detailGuides);
  for (const query of [
    "Renovar certificado digital y pedir tarjeta sanitaria",
    "Necesito un duplicado de mi tarjeta sanitaria y mi pasaporte",
    "Certificado de padrón y renovar FNMT",
    "I lost my health card and my digital certificate",
    "Renovar certificado de nacimiento",
    "I lost my European health insurance card",
    "He perdido las tarjetas sanitarias europeas",
    "Renuevo mi NIE y necesito un certificado de empadronamiento",
    "Renovar certificado digital del DNIe",
    "Certificado provisional sustitutorio y duplicado de tarjeta sanitaria",
    "Birth certificate without digital ID and renew my passport",
    "Check NUSS and replace my driving licence",
  ]) {
    for (const guide of Object.values(detailGuides)) {
      assert.equal(matchGuideDetail(query, guide), null, query);
    }
  }
  for (const invalid of [
    null,
    undefined,
    {},
    { id: "dni", detail: { id: "documents" } },
    { id: "certificado" },
    { id: "certificado", detail: { id: "other" } },
  ]) {
    assert.equal(
      matchGuideDetail("Renovar certificado digital", invalid),
      null,
    );
  }
  assert.equal(matchGuideDetail(undefined, detailGuides.certificado), null);
  assert.equal(JSON.stringify(detailGuides), before);
});
