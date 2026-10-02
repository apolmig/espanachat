// Prepared guidance reviewed against public official pages on 2 October 2026.
// Territorial destinations are resolved separately; these guides set no local
// requirements and cannot access records or submit an application.
const reviewedAt = "2026-10-02";

export const practicalSources = {
  padronInfo: {
    name: "INE · Dónde tramitar el padrón",
    domain: "ine.es",
    url: "https://www.ine.es/dyngs/AYU/index.htm?cid=118",
    reviewedAt,
  },
  padronRules: {
    name: "INE · Certificados y volantes de empadronamiento",
    domain: "idapadron.ine.es",
    url: "https://idapadron.ine.es/repositorio/legislacion/RESOL2FEB.htm",
    reviewedAt,
  },
  localDirectory: {
    name: "Punto de Acceso General · Ayuntamientos",
    domain: "administracion.gob.es",
    url: "https://administracion.gob.es/espanaadmon/quienesquien/entidades-locales-ayuntamientos-estructuras-y-directorios",
    reviewedAt,
  },
  tsi: {
    name: "Sanidad · Tarjeta Sanitaria Individual",
    domain: "sanidad.gob.es",
    url: "https://www.sanidad.gob.es/areas/saludDigital/tarjetaSanitariaSNS/home.htm",
    reviewedAt,
  },
  healthDirectory: {
    name: "Sanidad · Organismos autonómicos de salud",
    domain: "sanidad.gob.es",
    url: "https://www.sanidad.gob.es/organizacion/ccaa/directorio/home.htm",
    reviewedAt,
  },
  fnmtCitizen: {
    name: "FNMT · Certificado de persona física",
    domain: "sede.fnmt.gob.es",
    url: "https://www.sede.fnmt.gob.es/certificados/persona-fisica",
    reviewedAt,
  },
  fnmtPresencial: {
    name: "FNMT · Certificado con acreditación presencial",
    domain: "sede.fnmt.gob.es",
    url: "https://www.sede.fnmt.gob.es/certificados/persona-fisica/obtener-certificado-software",
    reviewedAt,
  },
  fnmtRenewal: {
    name: "FNMT · Renovar el certificado",
    domain: "sede.fnmt.gob.es",
    url: "https://www.sede.fnmt.gob.es/certificados/persona-fisica/renovar",
    reviewedAt,
  },
};

const guides = [
  {
    id: "padron",
    territoryKind: "municipality",
    question: "¿Cómo me empadrono?",
    title: "El padrón se tramita en tu ayuntamiento.",
    intro:
      "El alta y los cambios de datos del padrón corresponden al ayuntamiento del municipio donde resides. El INE no tramita el alta.",
    steps: [
      [
        "Localiza tu ayuntamiento.",
        "Usa el directorio oficial por provincia y municipio para encontrar el organismo responsable.",
      ],
      [
        "Busca el trámite de alta o cambio de domicilio.",
        "En la web o sede municipal, consulta los documentos y los canales disponibles para tu situación.",
      ],
      [
        "Presenta la solicitud por el canal indicado.",
        "Sigue las instrucciones municipales. Un certificado o volante acredita o informa de una inscripción; pedirlo no sustituye el alta.",
      ],
    ],
    refs: ["padronInfo", "localDirectory", "padronRules"],
    stepRefs: [["localDirectory"], ["padronInfo"], ["padronRules"]],
    scope: [
      "Orientación general. Gestión municipal; requisitos y canales se consultan en cada ayuntamiento.",
      "General guidance. Municipal management; check each council for requirements and available channels.",
    ],
    actions: [
      ["localDirectory", "Encontrar mi ayuntamiento", "Find my council"],
    ],
    keywords: [
      "padron",
      "empadronamiento",
      "empadronarme",
      "empadronar",
      "empadronado",
      "certificado de empadronamiento",
      "volante de empadronamiento",
      "municipal register",
      "register my address",
      "proof of residence",
    ],
    en: {
      question: "How do I register my address?",
      title: "Register your address with your local council.",
      intro:
        "Registration and changes to the municipal register are handled by the council where you live. INE does not process registration.",
      steps: [
        [
          "Find your council.",
          "Use the official directory by province and municipality to locate the responsible authority.",
        ],
        [
          "Find registration or address changes.",
          "Check the municipal website or electronic office for documents and channels relevant to your circumstances.",
        ],
        [
          "Apply through the specified channel.",
          "Follow council instructions. A certificate or information slip relates to an existing registration; requesting one does not register you.",
        ],
      ],
    },
    detail: {
      id: "certificate",
      question: "¿Cómo pido un certificado de empadronamiento?",
      aliases: [
        "quiero un certificado de empadronamiento",
        "necesito un volante de empadronamiento",
        "necesito el certificado",
        "y el certificado",
        "y el volante",
        "how do i get proof of residence",
        "i need the certificate",
      ],
      title: "Pide el documento de padrón que te soliciten.",
      intro:
        "El certificado acredita el empadronamiento y el volante es informativo. Si un trámite exige certificado, no lo sustituyas por un volante.",
      steps: [
        [
          "Comprueba qué documento te piden.",
          "Consulta el trámite de destino para saber qué documento y qué información necesita.",
        ],
        [
          "Solicítalo en tu ayuntamiento.",
          "Busca certificados o volantes de padrón en su sede y revisa cómo identificarte o pedirlo por otros canales.",
        ],
      ],
      refs: ["padronRules", "localDirectory"],
      stepRefs: [["padronRules"], ["padronRules", "localDirectory"]],
      actions: [
        ["localDirectory", "Encontrar mi ayuntamiento", "Find my council"],
      ],
      en: {
        question: "How do I request a municipal registration certificate?",
        title: "Request the registration document you need.",
        intro:
          "A certificado formally certifies registration; a volante is an information slip. Do not substitute a volante when a procedure requires a certificado.",
        steps: [
          [
            "Check the requested document.",
            "Check the receiving procedure for the document and information it requires.",
          ],
          [
            "Request it from your council.",
            "Find registration certificates or slips on its electronic office and check identification or alternative request channels.",
          ],
        ],
      },
    },
  },
  {
    id: "sanitaria",
    territoryKind: "region",
    question: "¿Cómo solicito mi tarjeta sanitaria?",
    title: "Consulta la tarjeta sanitaria en tu servicio de salud.",
    intro:
      "La Tarjeta Sanitaria Individual identifica a su titular en el Sistema Nacional de Salud. La emite la administración sanitaria autonómica o INGESA en Ceuta y Melilla.",
    steps: [
      [
        "Localiza tu servicio de salud.",
        "En el directorio de Sanidad, elige la comunidad o ciudad autónoma donde resides.",
      ],
      [
        "Consulta la solicitud de tarjeta sanitaria.",
        "Comprueba en ese portal los documentos, la acreditación del derecho y los canales de atención que correspondan a tu situación.",
      ],
      [
        "Haz la gestión en el servicio oficial.",
        "Sigue sus indicaciones. Esta guía trata la tarjeta del SNS, no la Tarjeta Sanitaria Europea ni consultas médicas.",
      ],
    ],
    refs: ["tsi", "healthDirectory"],
    stepRefs: [["healthDirectory"], ["tsi", "healthDirectory"], ["tsi"]],
    scope: [
      "Orientación administrativa general. Servicio autonómico de salud o INGESA; no se determina el derecho a asistencia.",
      "General administrative guidance. Regional health service or INGESA; entitlement to healthcare is not assessed here.",
    ],
    actions: [
      [
        "healthDirectory",
        "Localizar mi servicio de salud",
        "Find my health service",
      ],
    ],
    keywords: [
      "tarjeta sanitaria",
      "tarjeta de salud",
      "tsi",
      "tarjeta sip",
      "health card",
      "medical card",
    ],
    en: {
      question: "How do I apply for my health card?",
      title: "Check the health card with your health service.",
      intro:
        "The individual health card identifies its holder in Spain’s National Health System. Regional health authorities issue it, or INGESA in Ceuta and Melilla.",
      steps: [
        [
          "Find your health service.",
          "Choose the region or autonomous city where you live in the Ministry directory.",
        ],
        [
          "Check the health card application.",
          "Use that portal to check documents, proof of entitlement and contact channels for your circumstances.",
        ],
        [
          "Use the official service.",
          "Follow its instructions. This guide covers the SNS card, not the European Health Insurance Card or medical advice.",
        ],
      ],
    },
    detail: {
      id: "replacement",
      question: "He perdido mi tarjeta sanitaria. ¿Qué hago?",
      aliases: [
        "he perdido mi tarjeta sanitaria",
        "me han robado la tarjeta sanitaria",
        "se ha roto mi tarjeta sanitaria",
        "he perdido la tarjeta",
        "necesito un duplicado",
        "i lost my health card",
        "i lost the card",
      ],
      title: "Consulta cómo pedir una tarjeta de sustitución.",
      intro:
        "La gestión corresponde al organismo que emite tu tarjeta. Las instrucciones para pérdida, robo o deterioro deben consultarse en ese servicio.",
      steps: [
        [
          "Busca el procedimiento de sustitución.",
          "En el portal de tu servicio de salud, busca duplicado o pérdida de tarjeta sanitaria.",
        ],
        [
          "Comprueba el canal y los datos que solicita.",
          "Si no encuentras el trámite, usa su atención a la ciudadanía. No compartas aquí números de tarjeta ni información médica.",
        ],
      ],
      refs: ["tsi", "healthDirectory"],
      stepRefs: [["healthDirectory"], ["healthDirectory"]],
      actions: [
        [
          "healthDirectory",
          "Localizar mi servicio de salud",
          "Find my health service",
        ],
      ],
      en: {
        question: "I have lost my health card. What should I do?",
        title: "Check how to request a replacement card.",
        intro:
          "Contact the authority that issues your card. Check its instructions for loss, theft or damage.",
        steps: [
          [
            "Find the replacement procedure.",
            "Search your health service portal for a duplicate or lost health card.",
          ],
          [
            "Check the channel and requested details.",
            "If you cannot find the procedure, use its public information service. Do not share card numbers or medical information here.",
          ],
        ],
      },
    },
  },
  {
    id: "certificado",
    question: "¿Cómo obtengo el certificado digital de la FNMT?",
    title: "Obtén tu certificado de persona física en la FNMT.",
    intro:
      "El certificado de ciudadano de la FNMT es un archivo digital para identificarte y firmar. Su solicitud es distinta del registro en Cl@ve.",
    steps: [
      [
        "Elige cómo acreditar tu identidad.",
        "La FNMT ofrece vías presencial, vídeo, DNIe y dispositivo móvil. Consulta la modalidad que vas a utilizar.",
      ],
      [
        "Sigue la preparación y la solicitud oficiales.",
        "En la vía presencial, configura el equipo, solicita el certificado y acredita tu identidad siguiendo el orden indicado por la FNMT.",
      ],
      [
        "Descarga y protege el certificado.",
        "Completa la descarga según tu modalidad. La FNMT recomienda una copia de seguridad; no compartas el archivo, su contraseña ni el código de solicitud en este chat.",
      ],
    ],
    refs: ["fnmtCitizen", "fnmtPresencial"],
    stepRefs: [["fnmtCitizen"], ["fnmtPresencial"], ["fnmtPresencial"]],
    scope: [
      "Certificado FNMT de persona física. Esta guía no solicita ni instala certificados y no cubre certificados de empresas.",
      "FNMT individual certificate. This guide does not request or install certificates and does not cover company certificates.",
    ],
    actions: [
      ["fnmtCitizen", "Elegir modalidad en la FNMT", "Choose an FNMT method"],
      [
        "fnmtPresencial",
        "Ver los pasos con acreditación presencial",
        "Check the in-person identity route",
      ],
    ],
    keywords: [
      "certificado digital",
      "certificado electronico",
      "certificado fnmt",
      "fnmt",
      "digital certificate",
      "electronic certificate",
    ],
    en: {
      question: "How do I get an FNMT digital certificate?",
      title: "Get your individual certificate from FNMT.",
      intro:
        "The FNMT citizen certificate is a digital file for identification and signing. Applying for it is different from registering with Cl@ve.",
      steps: [
        [
          "Choose an identity verification method.",
          "FNMT offers in-person, video, DNIe and mobile-device routes. Check the method you will use.",
        ],
        [
          "Follow the official preparation and application.",
          "For the in-person route, configure your computer, apply and prove your identity in FNMT’s specified order.",
        ],
        [
          "Download and protect the certificate.",
          "Complete your route’s download steps. FNMT recommends a backup; do not share the file, its password or the application code in this chat.",
        ],
      ],
    },
    detail: {
      id: "renewal",
      question: "¿Cómo renuevo mi certificado digital de la FNMT?",
      aliases: [
        "cómo renovar mi certificado digital",
        "renovar certificado fnmt",
        "quiero renovar mi certificado digital",
        "renovar el certificado",
        "y para renovarlo",
        "how to renew my fnmt certificate",
        "renew my digital certificate",
      ],
      title: "Comprueba si tu certificado FNMT puede renovarse.",
      intro:
        "La FNMT distingue la renovación de la obtención de un nuevo certificado. El estado y la forma de obtención del anterior afectan al procedimiento.",
      steps: [
        [
          "Lee las condiciones de renovación.",
          "Comprueba la caducidad, revocación y los casos que exigen acreditar de nuevo tu identidad en la página oficial.",
        ],
        [
          "Usa el procedimiento que corresponda.",
          "Si procede renovar, sigue configuración, solicitud y descarga. Si no, consulta las vías de obtención de un nuevo certificado.",
        ],
      ],
      refs: ["fnmtRenewal", "fnmtCitizen"],
      stepRefs: [["fnmtRenewal"], ["fnmtRenewal", "fnmtCitizen"]],
      actions: [
        [
          "fnmtRenewal",
          "Ver condiciones para renovar en la FNMT",
          "Check FNMT renewal conditions",
        ],
        [
          "fnmtCitizen",
          "Ver cómo obtener un nuevo certificado",
          "Check how to get a new certificate",
        ],
      ],
      en: {
        question: "How do I renew my FNMT digital certificate?",
        title: "Check whether your FNMT certificate can be renewed.",
        intro:
          "Renewing and obtaining a new certificate are different procedures. The previous certificate’s status and verification method affect the route.",
        steps: [
          [
            "Read the renewal conditions.",
            "Check expiry, revocation and cases requiring fresh identity verification on the official page.",
          ],
          [
            "Use the appropriate procedure.",
            "If renewal is possible, follow configuration, application and download. Otherwise, check the routes for a new certificate.",
          ],
        ],
      },
    },
  },
];

export const practicalGuides = guides.map((guide) => ({
  ...guide,
  reviewedAt,
  followups: [guide.detail.question],
}));
