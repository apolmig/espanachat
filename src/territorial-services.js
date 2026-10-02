// Curated public-service links. See docs/fuentes-territoriales-2026-10-02.md.
// A review date means the linked page content was recovered, not that an
// authenticated application or its eligibility rules were tested.
const reviewDate = "2026-10-02";

function source(name, domain, url, reviewed = true) {
  return { name, domain, url, ...(reviewed ? { reviewedAt: reviewDate } : {}) };
}

const healthAction = [
  "Ver información de la tarjeta sanitaria",
  "View health card information",
];

export const regions = [
  {
    id: "andalucia",
    label: "Andalucía",
    aliases: ["andalucia", "andalusia"],
    source: source(
      "Servicio Andaluz de Salud · Tarjeta sanitaria",
      "sspa.juntadeandalucia.es",
      "https://www.sspa.juntadeandalucia.es/servicioandaluzdesalud/ciudadania/tarjeta-sanitaria-de-andalucia",
    ),
    action: healthAction,
  },
  {
    id: "aragon",
    label: "Aragón",
    aliases: ["aragon"],
    source: source(
      "Gobierno de Aragón · SaludInforma",
      "saludinforma.es",
      "https://www.saludinforma.es/portalsi/web/salud/tramites-gestiones/tarjeta-sanitaria/gestione-los-datos-de-su-tarjeta",
    ),
    action: ["Ver gestiones de tarjeta sanitaria", "View health card services"],
  },
  {
    id: "asturias",
    label: "Principado de Asturias",
    aliases: ["asturias", "principado de asturias"],
    source: source(
      "Astursalud · Obtención de la tarjeta sanitaria",
      "astursalud.es",
      "https://www.astursalud.es/noticias/-/noticias/obtencion-de-la-tarjeta-sanitaria-individu-3",
    ),
    action: healthAction,
  },
  {
    id: "baleares",
    label: "Illes Balears",
    aliases: [
      "illes balears",
      "islas baleares",
      "baleares",
      "balearic islands",
    ],
    mainSource: source(
      "IB-SALUT · Tarjeta sanitaria individual",
      "ibsalut.es",
      "https://ibsalut.es/es/info-ciudadania/tarjeta-sanitaria-individual",
    ),
    mainAction: [
      "Ver información de la tarjeta sanitaria",
      "View health card information",
    ],
    source: source(
      "IB-SALUT · Tramitación de la tarjeta sanitaria",
      "ibsalut.es",
      "https://ibsalut.es/es/info-ciudadania/tarjeta-sanitaria-individual/sustitucion-y-renovacion-de-la-tarjeta-sanitaria",
    ),
    action: healthAction,
  },
  {
    id: "canarias",
    label: "Canarias",
    aliases: ["canarias", "islas canarias", "canary islands"],
    source: source(
      "Servicio Canario de la Salud · Tarjeta sanitaria",
      "gobiernodecanarias.org",
      "https://www3.gobiernodecanarias.org/sanidad/scs/contenidoGenerico.jsp?idCarpeta=0a97c0ca-4bc2-11ee-aac4-1da46e630abe&idDocument=9090ca1f-a9bb-11de-ae50-15aa3b9230b7",
    ),
    action: healthAction,
  },
  {
    id: "cantabria",
    label: "Cantabria",
    aliases: ["cantabria"],
    source: source(
      "Servicio Cántabro de Salud · Tarjeta sanitaria",
      "scsalud.es",
      "https://www.scsalud.es/tarjeta-sanitaria-faq",
    ),
    action: healthAction,
  },
  {
    id: "castilla-la-mancha",
    label: "Castilla-La Mancha",
    aliases: ["castilla la mancha", "castilla-la mancha", "castile la mancha"],
    source: source(
      "SESCAM · Tarjeta sanitaria individual",
      "jccm.es",
      "https://www.jccm.es/tramites/1002411",
      false,
    ),
    action: [
      "Abrir ficha de tarjeta sanitaria",
      "Open the health card procedure page",
    ],
  },
  {
    id: "castilla-y-leon",
    label: "Castilla y León",
    aliases: ["castilla y leon", "castile and leon"],
    source: source(
      "SACYL · Tarjeta sanitaria",
      "saludcastillayleon.es",
      "https://www.saludcastillayleon.es/es/serviciosonline/tarjeta-sanitaria",
    ),
    action: healthAction,
  },
  {
    id: "cataluna",
    label: "Cataluña",
    aliases: ["cataluna", "catalunya", "catalonia"],
    detailSource: source(
      "CatSalut · Duplicado de la tarjeta sanitaria",
      "catsalut.gencat.cat",
      "https://catsalut.gencat.cat/ca/coneix-catsalut/acces-sistema-salut/la-tsi/obtencio-tsi/solicitud-reedicio-tsi/",
    ),
    detailAction: [
      "Ver cómo pedir un duplicado",
      "View how to request a replacement",
    ],
    source: source(
      "CatSalut · Primera tarjeta sanitaria",
      "catsalut.gencat.cat",
      "https://catsalut.gencat.cat/ca/coneix-catsalut/acces-sistema-salut/la-tsi/obtencio-tsi/",
    ),
    action: [
      "Ver cómo obtener la primera tarjeta",
      "View how to obtain your first health card",
    ],
  },
  {
    id: "comunitat-valenciana",
    label: "Comunitat Valenciana",
    aliases: [
      "comunitat valenciana",
      "comunidad valenciana",
      "valencian community",
    ],
    source: source(
      "Conselleria de Sanidad · Trámites de tarjeta SIP",
      "san.gva.es",
      "https://www.san.gva.es/es/web/tarjeta-sanitaria/tramites-tarjeta-sip",
    ),
    action: ["Ver trámites de tarjeta SIP", "View SIP health card procedures"],
  },
  {
    id: "extremadura",
    label: "Extremadura",
    aliases: ["extremadura"],
    source: source(
      "Servicio Extremeño de Salud · Tarjeta sanitaria",
      "saludextremadura.ses.es",
      "https://saludextremadura.ses.es/web/preguntas-frecuentes?inputSearch=tarjeta+sanitaria",
    ),
    action: healthAction,
  },
  {
    id: "galicia",
    label: "Galicia",
    aliases: ["galicia", "galiza"],
    source: source(
      "SERGAS · Tarjeta sanitaria",
      "sergas.gal",
      "https://www.sergas.gal/Tarxeta-sanitaria?idioma=es",
    ),
    action: ["Ver gestiones de tarjeta sanitaria", "View health card services"],
  },
  {
    id: "madrid",
    label: "Comunidad de Madrid",
    aliases: ["comunidad de madrid", "madrid", "community of madrid"],
    source: source(
      "Comunidad de Madrid · Tarjeta sanitaria",
      "comunidad.madrid",
      "https://www.comunidad.madrid/salud/tarjeta-sanitaria",
    ),
    action: healthAction,
  },
  {
    id: "murcia",
    label: "Región de Murcia",
    aliases: ["region de murcia", "murcia", "region of murcia"],
    source: source(
      "Servicio Murciano de Salud · Tarjeta sanitaria",
      "murciasalud.es",
      "https://www.murciasalud.es/web/atencion-usuarios-de-servicios-sanitario/tarjeta-sanitaria",
    ),
    action: healthAction,
  },
  {
    id: "navarra",
    label: "Comunidad Foral de Navarra",
    aliases: ["navarra", "nafarroa", "comunidad foral de navarra", "navarre"],
    source: source(
      "Servicio Navarro de Salud · Tarjeta individual sanitaria",
      "navarra.es",
      "https://www.navarra.es/es/tramites/on/-/line/Solicitud-de-la-tarjeta-individual-sanitaria-TIS",
    ),
    action: healthAction,
  },
  {
    id: "pais-vasco",
    label: "País Vasco",
    aliases: ["pais vasco", "euskadi", "basque country"],
    source: source(
      "Gobierno Vasco · Tarjeta individual sanitaria",
      "euskadi.eus",
      "https://www.euskadi.eus/gobierno-vasco/-/informacion/tarjeta-individual-sanitaria/",
    ),
    action: healthAction,
  },
  {
    id: "la-rioja",
    label: "La Rioja",
    aliases: ["la rioja", "rioja"],
    source: source(
      "Rioja Salud · Tarjeta sanitaria",
      "riojasalud.es",
      "https://riojasalud.es/ciudadanos/informacion/tarjeta-sanitaria",
    ),
    action: healthAction,
  },
  {
    id: "ceuta",
    label: "Ceuta",
    aliases: ["ceuta", "ciudad autonoma de ceuta"],
    source: source(
      "INGESA · Área Sanitaria de Ceuta",
      "ingesa.sanidad.gob.es",
      "https://ingesa.sanidad.gob.es/ceuta",
    ),
    action: [
      "Abrir el servicio de salud de Ceuta",
      "Open Ceuta's health service",
    ],
  },
  {
    id: "melilla",
    label: "Melilla",
    aliases: ["melilla", "ciudad autonoma de melilla"],
    source: source(
      "INGESA · Área Sanitaria de Melilla",
      "ingesa.sanidad.gob.es",
      "https://ingesa.sanidad.gob.es/melilla/",
    ),
    action: [
      "Abrir el servicio de salud de Melilla",
      "Open Melilla's health service",
    ],
  },
];

export const municipalities = [
  {
    id: "madrid",
    label: "Madrid",
    aliases: ["madrid", "madrid capital", "ciudad de madrid"],
    mainSource: source(
      "Ayuntamiento de Madrid · Altas y cambios de domicilio en el padrón",
      "sede.madrid.es",
      "https://sede.madrid.es/portal/site/tramites/menuitem.62876cb64654a55e2dbd7003a8a409a0/?vgnextchannel=b49ca38813180210VgnVCM100000c90da8c0RCRD&vgnextoid=3e3debb41f6e2410VgnVCM2000000c205a0aRCRD",
    ),
    mainAction: [
      "Ver altas y cambios en el padrón",
      "View municipal registration and address changes",
    ],
    source: source(
      "Ayuntamiento de Madrid · Certificado de empadronamiento",
      "sede.madrid.es",
      "https://sede.madrid.es/portal/site/tramites/menuitem.62876cb64654a55e2dbd7003a8a409a0/?vgnextchannel=5527814231ede410VgnVCM1000000b205a0aRCRD&vgnextfmt=d&vgnextoid=23ccdd9d6baed010VgnVCM2000000c205a0aRCRD",
    ),
    action: [
      "Ver certificado de empadronamiento",
      "View the municipal registration certificate",
    ],
  },
  {
    id: "barcelona",
    label: "Barcelona",
    aliases: ["barcelona", "ciudad de barcelona"],
    source: source(
      "Ajuntament de Barcelona · Catálogo de trámites",
      "seuelectronica.ajuntament.barcelona.cat",
      "https://seuelectronica.ajuntament.barcelona.cat/es/tramites-telematicos",
    ),
    action: [
      "Abrir catálogo municipal de trámites",
      "Open the municipal procedure catalogue",
    ],
  },
  {
    id: "valencia",
    label: "València",
    aliases: ["valencia", "valencia capital", "ciudad de valencia"],
    mainSource: source(
      "Ajuntament de València · Altas y cambios de domicilio en el padrón",
      "sede.valencia.es",
      "https://sede.valencia.es/sede/registro/procedimiento/PA.GP.11?lang=cas",
    ),
    mainAction: [
      "Ver altas y cambios en el padrón",
      "View municipal registration and address changes",
    ],
    source: source(
      "Ajuntament de València · Certificado de empadronamiento",
      "sede.valencia.es",
      "https://sede.valencia.es/sede/registro/procedimiento/pa.ce.10?lang=1",
    ),
    action: [
      "Ver certificado de empadronamiento",
      "View the municipal registration certificate",
    ],
  },
  {
    id: "sevilla",
    label: "Sevilla",
    aliases: ["sevilla", "seville", "ciudad de sevilla"],
    source: source(
      "Ayuntamiento de Sevilla · Portal municipal",
      "sevilla.org",
      "https://www.sevilla.org/",
    ),
    action: ["Abrir el Ayuntamiento de Sevilla", "Open Seville City Council"],
  },
  {
    id: "zaragoza",
    label: "Zaragoza",
    aliases: ["zaragoza", "saragossa", "ciudad de zaragoza"],
    mainSource: source(
      "Ayuntamiento de Zaragoza · Altas en el padrón",
      "zaragoza.es",
      "https://www.zaragoza.es/sede/servicio/tramite/3317",
    ),
    mainAction: [
      "Ver información del alta presencial",
      "View in-person municipal registration information",
    ],
    source: source(
      "Ayuntamiento de Zaragoza · Certificados de empadronamiento",
      "zaragoza.es",
      "https://www.zaragoza.es/sede/servicio/tramite/19101",
    ),
    action: [
      "Ver certificados de empadronamiento",
      "View municipal registration certificates",
    ],
  },
  {
    id: "malaga",
    label: "Málaga",
    aliases: ["malaga", "ciudad de malaga"],
    source: source(
      "Ayuntamiento de Málaga · Sede electrónica",
      "sede.malaga.eu",
      "https://sede.malaga.eu/sta/CarpetaPublic/doEvent?APP_CODE=STA&PAGE_CODE=PTS2_HOME",
    ),
    action: [
      "Abrir la sede del Ayuntamiento de Málaga",
      "Open Malaga's municipal electronic office",
    ],
  },
  {
    id: "a-coruna",
    label: "A Coruña",
    aliases: ["a coruna", "la coruna", "coruna", "a corunna", "la corunna"],
    mainSource: source(
      "Ayuntamiento de A Coruña · Trámites de padrón",
      "coruna.gal",
      "https://www.coruna.gal/sede/gl/tramites-e-servizos-electronicos/padron-de-habitantes?argIdioma=es",
    ),
    mainAction: [
      "Ver trámites de padrón",
      "View municipal registration procedures",
    ],
    source: source(
      "Ayuntamiento de A Coruña · Certificado de empadronamiento",
      "coruna.gal",
      "https://www.coruna.gal/sede/es/tramites-y-servicios-electronicos/guia-de-procedimientos-y-servicios/detalle-de-procedimientos/certificado-de-empadronamiento-con-certificado-digital/contenido/1453754268064?argIdioma=es",
    ),
    action: [
      "Ver certificado con identificación digital",
      "View the certificate with digital identification",
    ],
  },
];

export const municipalityDirectory = source(
  "Punto de Acceso General · Directorio de entidades locales",
  "administracion.gob.es",
  "https://administracion.gob.es/pagFront/espanaAdmon/directorioOrganigrama/entidadesLocales/entidadesLocales.htm?idioma=es",
);

export const nationalHealthSource = source(
  "Ministerio de Sanidad · Tarjeta Sanitaria Individual",
  "sanidad.gob.es",
  "https://www.sanidad.gob.es/areas/saludDigital/tarjetaSanitariaSNS/home.htm",
);

export function normalizeTerritory(text) {
  if (typeof text !== "string") return "";
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[-–—]/g, " ")
    .replace(/[¿?¡!.,;:]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findTerritory(text, entries) {
  if (typeof text !== "string" || /https?:\/\/|@/i.test(text)) return null;
  const normalized = normalizeTerritory(text);
  if (!normalized || normalized.length > 240) return null;
  if (
    /\b(?:no (?:vivo|resido|estoy|trabajo)|(?:do not|don't|dont) live|not (?:living|resident))\b/.test(
      normalized,
    )
  )
    return null;
  // Reject addresses, numeric identifiers and multi-place comparisons. A
  // territory picker is preferable to inferring a residence from these inputs.
  if (
    /\d|\b(calle|avenida|avda|paseo|plaza|street|road|direccion|domicilio|postal)\b|\bc\//.test(
      normalized,
    )
  )
    return null;
  const exact = (candidate) =>
    entries.find((entry) =>
      [entry.label, ...entry.aliases].some(
        (alias) => normalizeTerritory(alias) === candidate,
      ),
    ) || null;
  const direct = exact(normalized);
  if (direct) return direct;
  // The complete phrase after a location preposition must be a known name.
  // Thus "en Alcalá de Madrid" is not reduced to "Madrid".
  if ((normalized.match(/\b(?:en|in)\b/g) || []).length !== 1) return null;
  const tail = normalized
    .match(/\b(?:en|in)\s+(.+)$/)?.[1]
    ?.replace(/\s+por favor$/, "")
    .replace(/\s+please$/, "");
  if (!tail) return null;
  const candidate = exact(tail);
  if (!candidate) return null;
  // A second location makes the phrase ambiguous, even when its final name is
  // valid. Prefixes containing a different covered name are not inferred.
  const prefix = normalized.slice(0, normalized.length - tail.length);
  const other = entries.some(
    (entry) =>
      entry.id !== candidate.id &&
      [entry.label, ...entry.aliases].some((alias) => {
        const name = normalizeTerritory(alias);
        return ` ${prefix} `.includes(` ${name} `);
      }),
  );
  return other ? null : candidate;
}

export function findRegion(text) {
  return findTerritory(text, regions);
}

export function findMunicipality(text) {
  return findTerritory(text, municipalities);
}
