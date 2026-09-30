export const sources = {
  pag: {
    name: "Punto de Acceso General",
    domain: "administracion.gob.es",
    url: "https://administracion.gob.es/tramites-electronicos",
    image: "portal-pag.png",
  },
  interior: {
    name: "Ministerio del Interior",
    domain: "interior.gob.es",
    url: "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/dni/cita-previa/",
  },
  cita: {
    name: "Cita previa DNI y pasaporte",
    domain: "citapreviadnie.es",
    url: "https://www.citapreviadnie.es/",
  },
  ss: {
    name: "Seguridad Social · Import@ss",
    domain: "portal.seg-social.gob.es",
    url: "https://portal.seg-social.gob.es/wps/portal/importass/importass/Categorias/Vida%20laboral%20e%20informes/Informes%20sobre%20tu%20situacion%20laboral/Informe%20de%20tu%20vida%20laboral",
  },
  sepe: {
    name: "SEPE · Prestaciones por desempleo",
    domain: "sepe.es",
    url: "https://www.sepe.es/HomeSepe/prestaciones-desempleo.html",
    image: "portal-sepe.png",
  },
  sepesede: {
    name: "SEPE · Sede electrónica",
    domain: "sede.sepe.gob.es",
    url: "https://sede.sepe.gob.es/portalSede/procedimientos-y-servicios/personas.html",
  },
  clave: {
    name: "Cl@ve · Cómo registrarse",
    domain: "clave.gob.es",
    url: "https://clave.gob.es/registro/como-puedo-registrarme.html",
    image: "portal-clave.png",
  },
  carpeta: {
    name: "Mi Carpeta Ciudadana",
    domain: "carpetaciudadana.gob.es",
    url: "https://carpetaciudadana.gob.es/",
  },
  aeat: {
    name: "Agencia Tributaria · Renta WEB",
    domain: "sede.agenciatributaria.gob.es",
    url: "https://sede.agenciatributaria.gob.es/Sede/ayuda/consultas-informaticas/renta-ayuda-tecnica/renta-web-tramitacion-borrador-declaracion.html",
  },
};

export const guides = [
  {
    id: "dni",
    keywords: ["dni", "pasaporte", "identidad", "renovar", "renew", "passport"],
    question: "¿Cómo renuevo mi DNI o pasaporte?",
    title: "Renueva tu DNI o pasaporte, paso a paso.",
    intro:
      "La renovación se realiza en una unidad de documentación de la Policía Nacional. El Ministerio del Interior ofrece cita por internet o a través del 060.",
    steps: [
      [
        "Pide cita en el sitio oficial.",
        "Entra en Cita Previa DNI y Pasaporte y elige la oficina y la fecha que te convengan.",
      ],
      [
        "Comprueba qué debes llevar.",
        "Consulta los requisitos del documento que vas a renovar en Interior antes de acudir. La documentación varía según tu situación.",
      ],
      [
        "Acude a la oficina.",
        "Completa la renovación presencialmente. Este prototipo no reserva citas ni tramita documentos.",
      ],
    ],
    refs: ["interior", "cita"],
    followups: ["¿Cómo me registro en Cl@ve?", "¿Dónde consulto mis trámites?"],
    en: {
      question: "How do I renew my ID or passport?",
      title: "Renew your Spanish ID or passport.",
      intro:
        "Book an appointment at an official National Police documentation office through the official appointment website or 060. Check the requirements on the Ministry of the Interior website before attending.",
      steps: [
        [
          "Book an official appointment.",
          "Choose an office and date on the official ID and passport appointment website.",
        ],
        [
          "Check the required documents.",
          "Read the requirements for your document and circumstances on the Ministry website.",
        ],
        [
          "Attend your appointment.",
          "This prototype cannot book appointments or renew documents.",
        ],
      ],
    },
  },
  {
    id: "vida",
    keywords: [
      "vida laboral",
      "cotizacion",
      "cotizaciones",
      "trabajado",
      "work history",
      "employment history",
    ],
    question: "¿Cómo descargo mi vida laboral?",
    title: "Tu vida laboral está en Import@ss.",
    intro:
      "Puedes consultar tus altas, bajas y días de alta en la Seguridad Social, y obtener el informe en PDF desde el servicio oficial.",
    steps: [
      [
        "Abre el informe de vida laboral.",
        "Accede a Import@ss y selecciona «Consultar vida laboral».",
      ],
      [
        "Identifícate en el portal oficial.",
        "El servicio ofrece distintas formas de acceso. Si no tienes identificación electrónica, consulta la alternativa que aparece en la misma página.",
      ],
      [
        "Consulta y descarga el PDF.",
        "Puedes obtener el informe completo o acotado. Si detectas errores, el portal permite solicitar la incorporación o modificación de datos.",
      ],
    ],
    refs: ["ss"],
    followups: ["¿Cómo me registro en Cl@ve?", "¿Cómo solicito el paro?"],
    en: {
      question: "How do I download my work history?",
      title: "Your work history is on Import@ss.",
      intro:
        "View your Social Security employment record and download a PDF through the official Import@ss service.",
      steps: [
        [
          "Open the work history service.",
          "Select the work history report in Import@ss.",
        ],
        [
          "Sign in securely.",
          "Use an identification method offered by the official service. An alternative is available without electronic identification.",
        ],
        [
          "Download your report.",
          "Download the complete or filtered record and request corrections if necessary.",
        ],
      ],
    },
  },
  {
    id: "paro",
    keywords: [
      "paro",
      "desempleo",
      "sepe",
      "subsidio",
      "despedido",
      "unemployment",
      "lost my job",
    ],
    question: "He perdido mi empleo. ¿Por dónde empiezo?",
    title: "Empieza por el SEPE y tu servicio de empleo.",
    intro:
      "El SEPE gestiona las prestaciones y subsidios por desempleo. El tipo de ayuda depende de tu situación y de los requisitos de cada prestación.",
    steps: [
      [
        "Consulta la prestación que encaja contigo.",
        "La página del SEPE distingue prestación contributiva, subsidios y otras situaciones. Revisa la documentación y los plazos oficiales.",
      ],
      [
        "Comprueba tu inscripción como demandante.",
        "Para la solicitud por internet, el SEPE indica que debes estar inscrito en tu servicio de empleo autonómico, o en el SEPE en Ceuta y Melilla.",
      ],
      [
        "Usa la sede electrónica o pide cita.",
        "En la sede encontrarás la solicitud, la presolicitud en el Área Personal y la cita previa. Guarda el justificante emitido por el SEPE.",
      ],
    ],
    refs: ["sepe", "sepesede"],
    followups: [
      "¿Cómo descargo mi vida laboral?",
      "¿Cómo me registro en Cl@ve?",
    ],
    en: {
      question: "I lost my job. Where do I start?",
      title: "Start with SEPE and your employment service.",
      intro:
        "SEPE handles unemployment benefits. Eligibility depends on your circumstances and the requirements of the relevant benefit.",
      steps: [
        [
          "Find the relevant benefit.",
          "Read the official SEPE information and check documentation and deadlines.",
        ],
        [
          "Check your jobseeker registration.",
          "Online applications require registration with your regional employment service, or SEPE in Ceuta and Melilla.",
        ],
        [
          "Apply through the official service.",
          "Use the SEPE electronic office or book an appointment and retain the official receipt.",
        ],
      ],
    },
  },
  {
    id: "clave",
    keywords: [
      "clave",
      "cl@ve",
      "identificacion",
      "certificado",
      "firma",
      "identification",
      "sign in",
    ],
    question: "¿Cómo me registro en Cl@ve?",
    title: "Una identificación para tus trámites.",
    intro:
      "Cl@ve permite identificarte en los servicios públicos que la admiten. Primero debes registrarte y elegir un método adecuado para el trámite que necesitas.",
    steps: [
      [
        "Elige cómo registrarte.",
        "El portal oficial ofrece registro por internet y presencial. Las opciones incluyen carta de invitación, videoidentificación, certificado electrónico y DNIe.",
      ],
      [
        "Revisa el nivel que necesitas.",
        "El registro básico no sirve para todos los trámites. El portal explica cómo obtener el nivel avanzado.",
      ],
      [
        "Completa el registro en Cl@ve.",
        "Introduce tus datos únicamente en el servicio oficial. Aquí no necesitas compartir tu DNI, teléfono ni contraseñas.",
      ],
    ],
    refs: ["clave"],
    followups: [
      "¿Cómo descargo mi vida laboral?",
      "¿Dónde consulto mis trámites?",
    ],
    en: {
      question: "How do I register for Cl@ve?",
      title: "One identity for your public services.",
      intro:
        "Register with Cl@ve to access participating public services. The official website explains online and in-person registration.",
      steps: [
        [
          "Choose a registration method.",
          "Options include invitation letter, video identification, electronic certificate, electronic ID and in-person registration.",
        ],
        [
          "Check the security level.",
          "Basic registration is not sufficient for every service. Check whether advanced registration is needed.",
        ],
        [
          "Register on the official website.",
          "Only enter identity details and credentials on the official Cl@ve service.",
        ],
      ],
    },
  },
  {
    id: "carpeta",
    keywords: [
      "carpeta",
      "expediente",
      "estado",
      "tramites",
      "notificaciones",
      "application status",
      "my applications",
    ],
    question: "¿Dónde consulto mis trámites?",
    title: "Tus gestiones, en Mi Carpeta Ciudadana.",
    intro:
      "Mi Carpeta Ciudadana reúne información personal y trámites de las Administraciones que participan en el servicio. El acceso a tu información se realiza en el portal oficial.",
    steps: [
      [
        "Abre Mi Carpeta Ciudadana.",
        "Accede al portal oficial y elige una de las formas de identificación disponibles.",
      ],
      [
        "Busca tus expedientes o notificaciones.",
        "Consulta los servicios disponibles para los organismos integrados. La información puede depender de la Administración responsable.",
      ],
      [
        "Continúa en la sede correspondiente.",
        "Si tu trámite no aparece, consulta la sede del organismo que lo gestiona o los canales de atención del Punto de Acceso General.",
      ],
    ],
    refs: ["carpeta", "pag"],
    followups: [
      "¿Cómo me registro en Cl@ve?",
      "¿Cómo renuevo mi DNI o pasaporte?",
    ],
    en: {
      question: "Where can I check my applications?",
      title: "Your public services, in Mi Carpeta Ciudadana.",
      intro:
        "Mi Carpeta Ciudadana brings together information from participating public administrations.",
      steps: [
        [
          "Open the official portal.",
          "Choose an available sign-in method on the official website.",
        ],
        [
          "Look for your applications.",
          "Check available records and notifications for integrated organisations.",
        ],
        [
          "Contact the responsible authority.",
          "If a record is unavailable, visit the office that handles your application.",
        ],
      ],
    },
  },
  {
    id: "renta",
    keywords: [
      "renta",
      "hacienda",
      "tributaria",
      "irpf",
      "impuestos",
      "tax",
      "income tax",
    ],
    question: "¿Dónde encuentro mi declaración de la renta?",
    title: "Consulta tu renta en la Agencia Tributaria.",
    intro:
      "Renta WEB es el servicio de la Agencia Tributaria para consultar y tramitar el borrador o la declaración. Comprueba el ejercicio fiscal y las opciones disponibles en su sede.",
    steps: [
      [
        "Accede a la sede de la Agencia Tributaria.",
        "Busca el servicio Renta WEB del ejercicio que necesitas.",
      ],
      [
        "Identifícate de forma segura.",
        "La ayuda oficial explica el acceso con Cl@ve, certificado o referencia.",
      ],
      [
        "Revisa la información oficial.",
        "Consulta las guías antes de hacer cambios o presentar la declaración. Este prototipo no calcula impuestos ni presenta declaraciones.",
      ],
    ],
    refs: ["aeat"],
    followups: ["¿Cómo me registro en Cl@ve?", "¿Dónde consulto mis trámites?"],
    en: {
      question: "Where do I find my tax return?",
      title: "Find your tax return at Agencia Tributaria.",
      intro:
        "Renta WEB is the official tax agency service for viewing and preparing income tax returns. Check the appropriate tax year on its website.",
      steps: [
        [
          "Open the official electronic office.",
          "Find Renta WEB for the required tax year.",
        ],
        [
          "Sign in securely.",
          "Official guides explain access using Cl@ve, a certificate or a reference.",
        ],
        [
          "Review the official guidance.",
          "This prototype does not calculate tax or file returns.",
        ],
      ],
    },
  },
  {
    id: "ayudas",
    keywords: [
      "ayuda",
      "beca",
      "alquiler",
      "vivienda",
      "subvencion",
      "housing",
      "grant",
      "scholarship",
      "benefit",
    ],
    question: "¿Dónde puedo encontrar ayudas al alquiler?",
    title: "Encuentra la ayuda y su organismo responsable.",
    intro:
      "El Punto de Acceso General permite buscar ayudas, subvenciones, becas y premios. Para vivienda y alquiler, la convocatoria y la Administración responsable pueden variar según tu comunidad autónoma.",
    steps: [
      [
        "Busca la convocatoria oficial.",
        "Empieza en el Punto de Acceso General y en el portal de tu comunidad autónoma.",
      ],
      [
        "Comprueba ámbito, requisitos y plazo.",
        "Lee la convocatoria del organismo responsable. No todas las ayudas están abiertas ni se solicitan de la misma forma.",
      ],
      [
        "Solicita en la sede que corresponda.",
        "La resolución oficial indica dónde presentar la solicitud y qué documentos necesitas. Aquí no se determina tu elegibilidad.",
      ],
    ],
    refs: ["pag"],
    followups: ["¿Dónde consulto mis trámites?", "¿Cómo me registro en Cl@ve?"],
    en: {
      question: "Where can I find rent support?",
      title: "Find the grant and its responsible authority.",
      intro:
        "The national public service portal provides a directory of grants and scholarships. Housing support depends on the relevant regional programme.",
      steps: [
        [
          "Find the official programme.",
          "Start with the public service portal and your regional administration.",
        ],
        [
          "Check requirements and deadlines.",
          "Read the actual programme notice before applying.",
        ],
        [
          "Use the responsible electronic office.",
          "This prototype cannot determine eligibility or submit an application.",
        ],
      ],
    },
  },
];

export function normalize(text) {
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}
export function findGuide(text, previousId) {
  const q = normalize(text);
  const exact = guides.find(
    (g) => normalize(g.question) === q || normalize(g.en.question) === q,
  );
  if (exact) return exact;
  const broadTerms = new Set([
    "tramites",
    "estado",
    "ayuda",
    "benefit",
    "impuestos",
    "firma",
    "certificado",
    "identidad",
    "renovar",
  ]);
  const ranked = guides
    .map((g) => ({
      guide: g,
      score: g.keywords.reduce(
        (s, k) =>
          s +
          (q.includes(normalize(k))
            ? broadTerms.has(k)
              ? 1
              : Math.max(2, k.length)
            : 0),
        0,
      ),
    }))
    .sort((a, b) => b.score - a.score);
  if (ranked[0].score) return ranked[0].guide;
  if (
    previousId &&
    /^(?:y )?(?:que documentos necesito|what documents do i need)[?.!]*$/.test(
      q,
    )
  )
    return guides.find((g) => g.id === previousId) || null;
  return null;
}
export function hasPersonalData(text) {
  return (
    /\b(?:\d{8}[A-Z]|[XYZ]\d{7}[A-Z])\b/i.test(text) ||
    /[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(text) ||
    /\b(?:ES\d{2}[\s\d]{20,30})\b/i.test(text) ||
    /(?:^|\s)(?:\+34[ -]?)?[6789](?:[ -]?\d){8}(?:\s|$)/.test(text)
  );
}
