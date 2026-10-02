// Deterministic routing to prepared guides, not an interpretation of entitlement
// or an administrative decision. Exact follow-ups and conversation context belong
// to knowledge.js. Unknown wording deliberately returns null instead of guessing.
const normalize = (text) =>
  typeof text === "string"
    ? text
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/cl@ve/g, "clave")
        .replace(/[^\p{Letter}\p{Number}]+/gu, " ")
        .trim()
        .replace(/\s+/g, " ")
    : "";

const any = (text, patterns) => patterns.some((pattern) => pattern.test(text));

// Explicitly unsupported procedures take precedence over incidental words such
// as "certificado", "sanitaria" or "paro". This is intentionally conservative:
// it does not attempt to understand negation or split a compound question.
const outsideCoverage = [
  /\b(tarjetas? sanitarias? europeas?|tse|european health insurance cards?|ehic)\b/,
  /\b(permiso|carnet|carne|licencia) de conducir\b/,
  /\b(driving|driver|drivers) licen[cs]es?\b/,
  /\b(permiso|tarjeta|autorizacion) de residencia\b/,
  /\b(residence permits?|residency permits?|immigration|extranjeria)\b/,
  /\b(nie|tie)\b.*\b(renov\w*|renuev\w*|solicit\w*|pedir|obten\w*|sacar)\b/,
  /\b(renov\w*|renuev\w*|solicit\w*|pedir|obten\w*|sacar)\b.*\b(nie|tie)\b/,
  /\b(certificados?|certificacion) (de )?(nacimiento|matrimonio|defuncion|antecedentes|empresa|representante)\b/,
  /\b(birth|marriage|death|company|criminal record) certificates?\b/,
  /\b(certificados?|certificates?)\b.*\b(representantes?|representatives?)\b/,
  /\bcertificados? (digital(?:es)? |electronicos? )?(de |del )?dni(e| electronico)?\b/,
  /\bdnie (digital |electronic )?certificates?\b/,
  /\bcertificates? (of |from |for )(my )?dnie\b/,
  /\b(recetas?|diagnosticos?|medicamentos?|tratamientos?|sintomas?|prescriptions?|diagnosis|diagnoses|symptoms?|treatments?|medical advice)\b/,
  /\b(paro cardiaco|cardiac arrest)\b/,
  /\b(pagar|pago|abonar)\b.*\b(cotizaciones|cotizacion)\b/,
  /\b(pay|paying)\b.*\b(social security contributions)\b/,
  /\bclave (de )?((mi|la|el) )?(wifi|wi fi|banco|banca|correo|email)\b/,
];

// These anchors describe the ten supported topics. Generic words such as
// "ayuda", "estado", "identidad", "firma", "tarjeta" and "certificado" are
// insufficient. Every expression uses complete word boundaries, so "renta"
// cannot match "cuarenta" and "clave" cannot match "enclave".
const topicPatterns = {
  dni: [
    /\b(dni|dnie|pasaportes?|passports?)\b/,
    /\b(spanish (id|identity card)|national (id|identity) cards?)\b/,
    /\b(renew|replace|lost)\b.*\b(my )?id cards?\b/,
  ],
  vida: [
    /\b(vida laboral|historial laboral|work history|employment history|employment record)\b/,
    /\b(cotizado|cotizando)\b/,
    /\b(mi cotizacion|mis cotizaciones)\b/,
    /\b(cotizacion|cotizaciones)\b.*\b(seguridad social|laboral|trabajo|empleo)\b/,
    /\b(social security (record|report|contributions))\b/,
    /\b(cuantos|cuantas) (dias|anos|meses) (he )?trabajado\b/,
    /\b(dias|anos) de alta (en la )?seguridad social\b/,
  ],
  paro: [
    /\b(paro|desempleo|sepe|despedid[oa]|unemployment|unemployed)\b/,
    /\b(me han|me han acabado de|me) echado\b.*\b(trabajo|empleo|empresa)\b/,
    /\b(me quede|me he quedado|estoy) sin (trabajo|empleo)\b/,
    /\b(perdi|he perdido) (mi |el )?(empleo|trabajo)\b/,
    /\b(lost my job|lost my employment|laid off|been fired|got fired|been sacked)\b/,
    /\b(i was|i am|got|been) (fired|dismissed|sacked)\b/,
  ],
  clave: [
    /\bclave (pin|permanente|movil)\b/,
    /\b(registr\w*|registro|acced\w*|acceso|activar|activacion|obtener|conseguir|sacar)\b.*\bclave\b/,
    /\bclave\b.*\b(registr\w*|registro|acced\w*|acceso|tramites publicos|register|registration|sign in|log in)\b/,
    /\b(register|registration|sign up|sign in|log in|activate|get)\b.*\bclave\b/,
  ],
  carpeta: [
    /\b(carpeta ciudadana|citizen folder|citizens folder)\b/,
    /\b(consultar|ver|revisar|consulto|veo)\b.*\b(mis expedientes|mis tramites)\b/,
    /\b(estado de mis|estado de los) (tramites|expedientes)\b/,
    /\b(check|track|view)\b.*\b(my applications|my administrative procedures|my case files)\b/,
  ],
  renta: [
    /\b(irpf|aeat|renta web|agencia tributaria|income tax|tax returns?)\b/,
    /\b(declaracion|declaraciones|borrador) (de la |de )?renta\b/,
    /\b(hacer|hago|presentar|presento|declarar|tramitar|consultar) (la |mi )?renta\b/,
    /\b(file (my )?taxes|filing (my )?taxes)\b/,
  ],
  ayudas: [
    /\b(ayudas|becas?|subvenciones?|scholarships?|grants?)\b/,
    /\b(ayuda|apoyo) (para (el |la |los )?|al |de )?(alquiler|vivienda|estudios)\b/,
    /\b(rent|housing|student) (support|assistance|benefits?)\b/,
    /\b(financial (aid|support|assistance))\b/,
  ],
  padron: [
    /\b(padron|padrones|empadronamiento|empadronamientos|empadron\w*)\b/,
    /\b(municipal register|municipal registration|town hall registration)\b/,
    /\b(register|registration)\b.*\b(town hall|municipal register)\b/,
    /\b(municipal (residence|residency) certificate|certificate of municipal (residence|residency))\b/,
  ],
  sanitaria: [
    /\b(tarjetas? sanitarias?|tarjetas? de salud|health cards?|healthcare cards?|medical cards?)\b/,
    /\b(tarjetas?|cards?) (tsi|sip)\b/,
    /\b(tsi|sip)\b.*\b(sanitaria|salud|centro de salud|health|medical)\b/,
    /\b(sanitaria|salud|centro de salud|health|medical)\b.*\b(tsi|sip)\b/,
    /\b(spanish|regional|public) health insurance cards?\b/,
    /\b(alta|inscrib\w*|registr\w*)\b.*\b(centro de salud|medico de cabecera)\b/,
    /\b(register|registration|sign up)\b.*\b(health cent(re|er)|family doctor|general practitioner|gp)\b/,
  ],
  certificado: [
    /\b(fnmt|ceres)\b/,
    /\b(certificados? (digital(?:es)?|electronicos?)|digital certificates?|electronic certificates?)\b/,
    /\b(certificados?|certificates?)\b.*\b(firma (electronica|digital)|digital signature|electronic signature)\b/,
    /\b(firma (electronica|digital)|digital signature|electronic signature)\b.*\b(certificados?|certificates?)\b/,
  ],
};

// Credentials named only as a means of accessing another procedure are not a
// second requested procedure. After removing that bounded phrase, any remaining
// credential request still counts, e.g. "padrón con Cl@ve y registrar Cl@ve".
const accessMethodPatterns = {
  clave:
    /\b(con|mediante|usando|with|using|via|through) (mi |my |a |el |la )?clave( pin| permanente| movil)?\b/g,
  certificado:
    /\b(con|mediante|usando|with|using|via|through) (mi |my |a |el |un )?(certificado (digital|electronico|de firma (digital|electronica))|digital certificate|electronic certificate|digital signature certificate|electronic signature certificate|fnmt)\b/g,
  dni: /\b(con|mediante|usando|with|using|via|through) (mi |my |a |el )?(dni|dnie|spanish id)\b/g,
};

/**
 * Return the original guide object for a single supported intent, otherwise null.
 * Exact ES/EN guide questions have priority. This function is pure, does not use
 * conversation state, does not rank ambiguous queries, and has no fuzzy matching.
 * Adding a guide needs its own curated topic patterns; generic keyword fallback
 * is deliberately absent. False negatives can be resolved by the visible guides.
 */
export function matchGuideIntent(text, guides) {
  const query = normalize(text);
  if (!query || !Array.isArray(guides)) return null;
  const available = guides.filter(
    (guide) => guide && typeof guide.id === "string",
  );
  const exact = available.find((guide) =>
    [guide.question, guide.en?.question].some(
      (question) => normalize(question) === query,
    ),
  );
  if (exact) return exact;
  if (any(query, outsideCoverage)) return null;

  const matchingIds = new Set();
  for (const guide of available) {
    const patterns = topicPatterns[guide.id];
    if (!patterns) continue;
    const explicitClave = guide.id === "clave" && /cl@ve/i.test(text);
    if (explicitClave || any(query, patterns)) matchingIds.add(guide.id);
  }
  // A bare "renta" or "clave" cannot select a guide on its own, but it must
  // not disappear when another topic is present: "renta y certificado digital"
  // is still ambiguous. Credential method handling below remains applicable.
  if (matchingIds.size > 0) {
    for (const id of ["renta", "clave"]) {
      if (
        available.some((guide) => guide.id === id) &&
        new RegExp(`\\b${id}\\b`).test(query)
      ) {
        matchingIds.add(id);
      }
    }
  }
  if (matchingIds.size > 1) {
    for (const [id, pattern] of Object.entries(accessMethodPatterns)) {
      if (!matchingIds.has(id)) continue;
      const withoutMethod = query.replace(pattern, " ");
      if (withoutMethod !== query && !any(withoutMethod, topicPatterns[id])) {
        // Plain "clave" after a method phrase still needs to count if another
        // explicit Cl@ve occurrence was left in the query.
        if (id !== "clave" || !/\bclave\b/.test(withoutMethod))
          matchingIds.delete(id);
      }
    }
  }
  if (matchingIds.size !== 1) return null;
  return available.find((guide) => matchingIds.has(guide.id)) ?? null;
}

// The detail matcher verifies the topic against the entire supported catalogue,
// not just the supplied guide, so an independently called detail matcher cannot
// turn a two-topic request into a specific answer.
const routingCatalogue = Object.freeze(
  Object.keys(topicPatterns).map((id) => Object.freeze({ id })),
);
const detailRules = {
  certificado: {
    id: "renewal",
    patterns: [/\b(renov\w*|renuev\w*|renew\w*)\b/],
  },
  sanitaria: {
    id: "replacement",
    patterns: [
      /\b(perdi|perdido|perdida|perdidas|robo|robado|robada|sustraido|sustraida|deterior\w*|duplicados?|reemplaz\w*|sustitui\w*|sustituy\w*|sustitucion)\b/,
      /\b(lost|stolen|theft|damaged|broken|duplicate|replacement|replace)\b/,
    ],
    exclusions: [
      /\b(perdida de (cobertura|derechos|empleo)|lost (my )?coverage|coverage loss|loss of (health )?coverage)\b/,
    ],
  },
  padron: {
    id: "certificate",
    patterns: [
      /\b(certificados?|volantes?|justificantes?) (de |del |de mi )?(padron|empadronamiento)\b/,
      /\b(certificados?|volantes?|justificantes?) de inscripcion en (el )?padron\b/,
      /\b(municipal (residence|residency|registration) certificates?|certificates? of municipal (residence|residency|registration)|proof of municipal (residence|residency|registration))\b/,
    ],
  },
};

/**
 * Return a supported detail ID only for an explicit topic and detail request.
 * No conversation context or short aliases are accepted. Main applications,
 * unrelated topics, unsupported procedures and mixed families return null.
 * Call after matchGuideIntent selects a guide; knowledge.js still handles exact
 * follow-up questions and contextual aliases before free-form matching.
 */
export function matchGuideDetail(text, guide) {
  const query = normalize(text);
  const rule = detailRules[guide?.id];
  if (!query || !rule || guide.detail?.id !== rule.id) return null;
  if (matchGuideIntent(text, routingCatalogue)?.id !== guide.id) return null;
  if (rule.exclusions && any(query, rule.exclusions)) return null;
  return any(query, rule.patterns) ? guide.detail.id : null;
}
