export const sources = {
  pag: {
    name: "Punto de Acceso General",
    domain: "administracion.gob.es",
    url: "https://administracion.gob.es/tramites-electronicos",
    image: "portal-pag.png",
    reviewedAt: "2026-10-02",
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
    reviewedAt: "2026-10-02",
  },
  sepe: {
    name: "SEPE · Prestaciones por desempleo",
    domain: "sepe.es",
    url: "https://www.sepe.es/HomeSepe/prestaciones-desempleo.html",
    image: "portal-sepe.png",
    reviewedAt: "2026-10-02",
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
    reviewedAt: "2026-10-02",
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
  dniDocs: {
    name: "Interior · Documentación para el DNI",
    domain: "interior.gob.es",
    url: "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/dni/documentacion-necesaria-para-su-tramitacion/",
    reviewedAt: "2026-10-02",
  },
  passportDocs: {
    name: "Interior · Expedición del pasaporte",
    domain: "interior.gob.es",
    url: "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/pasaporte/procedimiento-de-expedicion/",
    reviewedAt: "2026-10-02",
  },
  demanda: {
    name: "SEPE · Demanda de empleo y servicios autonómicos",
    domain: "sede.sepe.gob.es",
    url: "https://sede.sepe.gob.es/portalSede/es/procedimientos-y-servicios/personas/empleo/tramites-demanda",
    reviewedAt: "2026-10-02",
  },
  carpetaHelp: {
    name: "Mi Carpeta Ciudadana · Expedientes no disponibles",
    domain: "carpetaciudadana.gob.es",
    url: "https://masinformacioncarpeta.carpetaciudadana.gob.es/infocc/preguntas-frecuentes/no-me-aparece-informacion-de-un-servicio-expediente",
    reviewedAt: "2026-10-02",
  },
  irpf: {
    name: "Agencia Tributaria · Gestiones de IRPF",
    domain: "sede.agenciatributaria.gob.es",
    url: "https://sede.agenciatributaria.gob.es/Sede/irpf.html",
    reviewedAt: "2026-10-02",
  },
  ayudas: {
    name: "Punto de Acceso General · Buscador de ayudas",
    domain: "administracion.gob.es",
    url: "https://administracion.gob.es/ayudas/buscador-becas",
    reviewedAt: "2026-10-02",
  },
};

const baseGuides = [
  {
    id: "dni",
    keywords: [
      "dni",
      "dnie",
      "pasaporte",
      "identidad",
      "passport",
      "spanish id",
    ],
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
      "rent support",
      "rental assistance",
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

// Prepared, source-backed follow-ups. They stay within the seven existing
// topics and never imply that this prototype can access personal records.
const guideServices = {
  dni: {
    refs: ["cita", "dniDocs", "passportDocs"],
    stepRefs: [
      ["cita"],
      ["dniDocs", "passportDocs"],
      ["dniDocs", "passportDocs"],
    ],
    scope: [
      "Renovación presencial en la Policía Nacional.",
      "In-person renewal at the National Police.",
    ],
    actions: [
      [
        "cita",
        "Pedir cita para DNI o pasaporte",
        "Book an ID or passport appointment",
      ],
    ],
    detail: {
      id: "documents",
      question: "¿Qué documentos necesito para renovar el DNI o pasaporte?",
      aliases: [
        "qué documentos necesito",
        "y qué documentos necesito",
        "what documents do i need",
      ],
      title: "Comprueba la documentación antes de la cita.",
      intro:
        "Interior publica requisitos distintos para el DNI y el pasaporte. Consulta el documento que vas a renovar y tu situación concreta.",
      steps: [
        [
          "Elige la documentación de tu documento.",
          "Abre los requisitos del DNI o el procedimiento del pasaporte en los enlaces de abajo.",
        ],
        [
          "Revisa tu situación.",
          "Comprueba las indicaciones para cambios de datos, pérdida del documento o menores antes de acudir.",
        ],
      ],
      refs: ["dniDocs", "passportDocs"],
      stepRefs: [
        ["dniDocs", "passportDocs"],
        ["dniDocs", "passportDocs"],
      ],
      actions: [
        ["dniDocs", "Ver documentación del DNI", "Check ID documents"],
        [
          "passportDocs",
          "Ver documentación del pasaporte",
          "Check passport documents",
        ],
      ],
      en: {
        question:
          "What documents do I need to renew my Spanish ID or passport?",
        title: "Check the documents before your appointment.",
        intro:
          "The Ministry publishes separate requirements for IDs and passports. Check the relevant document and your circumstances.",
        steps: [
          [
            "Choose the document requirements.",
            "Open the ID requirements or passport procedure using the links below.",
          ],
          [
            "Check your circumstances.",
            "Review instructions for changed details, lost documents or children before attending.",
          ],
        ],
      },
    },
  },
  vida: {
    stepRefs: [["ss"], ["ss"], ["ss"]],
    scope: [
      "Servicio estatal de la Tesorería General de la Seguridad Social.",
      "A national Social Security Treasury service.",
    ],
    actions: [
      [
        "ss",
        "Consultar y descargar la vida laboral",
        "View and download your work history",
      ],
    ],
    detail: {
      id: "without-id",
      question: "¿Puedo pedir la vida laboral sin identificación electrónica?",
      aliases: [
        "no tengo identificación electrónica",
        "sin identificación electrónica",
        "i have no electronic identification",
      ],
      title: "Import@ss ofrece una alternativa sin identificación electrónica.",
      intro:
        "La página del informe explica cómo solicitarlo si no dispones de identificación electrónica.",
      steps: [
        [
          "Abre la alternativa del servicio.",
          "Busca «Si no dispones de identificación electrónica» en la página oficial del informe.",
        ],
        [
          "Aporta los datos solo allí.",
          "Import@ss solicita datos personales, un selfie y una foto de tu documento de identidad. No los compartas en este chat.",
        ],
      ],
      stepRefs: [["ss"], ["ss"]],
      en: {
        question:
          "Can I request my work history without electronic identification?",
        title:
          "Import@ss offers an alternative without electronic identification.",
        intro:
          "The report page explains how to request it without electronic identification.",
        steps: [
          [
            "Open the service alternative.",
            "Find the option for people without electronic identification on the official report page.",
          ],
          [
            "Provide details only there.",
            "Import@ss asks for personal details, a selfie and an ID photo. Do not share them in this chat.",
          ],
        ],
      },
    },
  },
  paro: {
    refs: ["sepe", "demanda", "sepesede"],
    stepRefs: [["sepe"], ["demanda"], ["sepesede"]],
    scope: [
      "Prestaciones: SEPE. Demanda de empleo: servicio autonómico, salvo Ceuta y Melilla.",
      "Benefits: SEPE. Jobseeker registration: regional service, except Ceuta and Melilla.",
    ],
    actions: [
      [
        "sepesede",
        "Ver trámites de prestaciones del SEPE",
        "View SEPE benefit procedures",
      ],
      [
        "demanda",
        "Encontrar mi servicio de empleo",
        "Find my employment service",
      ],
    ],
    detail: {
      id: "employment-service",
      question: "¿Dónde me inscribo como demandante de empleo?",
      aliases: ["dónde me inscribo", "dónde me apunto", "where do i register"],
      title: "La demanda de empleo depende de dónde resides.",
      intro:
        "La inscripción como demandante y la solicitud de una prestación son gestiones diferentes.",
      steps: [
        [
          "Localiza el servicio que te corresponde.",
          "En la página del SEPE, usa «Accede a tu Comunidad Autónoma». En Ceuta y Melilla, la demanda se gestiona en el SEPE.",
        ],
        [
          "Comprueba cómo inscribirte o renovar.",
          "Sigue las instrucciones de ese servicio. La prestación por desempleo se consulta y solicita por separado en el SEPE.",
        ],
      ],
      refs: ["demanda", "sepe"],
      stepRefs: [["demanda"], ["demanda", "sepe"]],
      actions: [
        [
          "demanda",
          "Encontrar mi servicio de empleo",
          "Find my employment service",
        ],
      ],
      en: {
        question: "Where do I register as a jobseeker?",
        title: "Jobseeker registration depends on where you live.",
        intro:
          "Jobseeker registration and applying for benefits are separate procedures.",
        steps: [
          [
            "Find your employment service.",
            "Use the SEPE page to access your autonomous community. SEPE handles registration in Ceuta and Melilla.",
          ],
          [
            "Check how to register or renew.",
            "Follow that service’s instructions. Unemployment benefits are handled separately by SEPE.",
          ],
        ],
      },
    },
  },
  clave: {
    stepRefs: [["clave"], ["clave"], ["clave"]],
    scope: [
      "Identificación para los servicios públicos que admiten Cl@ve.",
      "Identification for public services that accept Cl@ve.",
    ],
    actions: [
      [
        "clave",
        "Elegir cómo registrarme en Cl@ve",
        "Choose a Cl@ve registration method",
      ],
    ],
    detail: {
      id: "security-level",
      question: "¿El registro básico de Cl@ve sirve para todos los trámites?",
      aliases: ["qué nivel necesito", "what level do i need"],
      title: "Algunos trámites necesitan registro avanzado.",
      intro:
        "El registro básico permite acceder a muchos servicios, pero no a todos ni a Cl@ve Firma.",
      steps: [
        [
          "Comprueba el nivel que exige el trámite.",
          "La sede en la que vas a realizarlo indica los métodos de acceso admitidos.",
        ],
        [
          "Consulta las vías de registro avanzado.",
          "Cl@ve explica el registro con certificado o DNIe, en oficina y mediante videoidentificación revisada por un empleado público.",
        ],
      ],
      stepRefs: [["clave"], ["clave"]],
      en: {
        question: "Does basic Cl@ve registration work for every procedure?",
        title: "Some procedures require advanced registration.",
        intro:
          "Basic registration covers many services, but not every service or Cl@ve Firma.",
        steps: [
          [
            "Check the procedure’s required level.",
            "The official service lists its accepted sign-in methods.",
          ],
          [
            "Check advanced registration options.",
            "Cl@ve explains registration with a certificate or electronic ID, at an office, or through video identification reviewed by a public employee.",
          ],
        ],
      },
    },
  },
  carpeta: {
    refs: ["carpeta", "carpetaHelp", "pag"],
    stepRefs: [["carpeta"], ["carpeta"], ["carpetaHelp", "pag"]],
    scope: [
      "Información de las Administraciones integradas en Mi Carpeta Ciudadana.",
      "Information from administrations connected to Mi Carpeta Ciudadana.",
    ],
    actions: [
      ["carpeta", "Abrir Mi Carpeta Ciudadana", "Open Mi Carpeta Ciudadana"],
    ],
    detail: {
      id: "missing-record",
      question:
        "¿Qué hago si mi expediente no aparece en Mi Carpeta Ciudadana?",
      aliases: [
        "no aparece mi expediente",
        "no veo mi expediente",
        "my application is missing",
      ],
      title: "Consulta también la sede del organismo responsable.",
      intro:
        "Mi Carpeta Ciudadana reúne información de otros organismos. La ayuda oficial contempla indisponibilidades de algunos servicios.",
      steps: [
        [
          "Revisa el aviso del portal.",
          "Consulta la ayuda para expedientes no disponibles; la ausencia de información no permite conocer el resultado del trámite.",
        ],
        [
          "Continúa en la sede del organismo.",
          "La ayuda oficial recomienda acceder a la sede de la Administración que gestiona el expediente mientras el servicio no esté disponible.",
        ],
      ],
      refs: ["carpetaHelp", "pag"],
      stepRefs: [["carpetaHelp"], ["carpetaHelp", "pag"]],
      actions: [
        [
          "carpetaHelp",
          "Ver ayuda sobre expedientes no disponibles",
          "Read help for unavailable records",
        ],
        [
          "pag",
          "Localizar el trámite y su organismo",
          "Find the procedure and its authority",
        ],
      ],
      en: {
        question:
          "What if my application is missing from Mi Carpeta Ciudadana?",
        title: "Also check the responsible authority’s website.",
        intro:
          "Mi Carpeta Ciudadana brings together information from other authorities. Its official help covers unavailable services.",
        steps: [
          [
            "Check the portal’s notice.",
            "Read the help for unavailable records. Missing information does not tell you the application’s outcome.",
          ],
          [
            "Use the authority’s electronic office.",
            "Official help recommends visiting the administration that handles the record while the service is unavailable.",
          ],
        ],
      },
    },
  },
  renta: {
    refs: ["irpf", "aeat"],
    stepRefs: [["irpf"], ["aeat"], ["irpf", "aeat"]],
    scope: [
      "Comprueba el ejercicio fiscal en la sede de la Agencia Tributaria.",
      "Check the tax year in the official tax agency service.",
    ],
    actions: [
      [
        "irpf",
        "Ver mi declaración y gestiones de renta",
        "View tax returns and income tax services",
      ],
    ],
    detail: {
      id: "filed-return",
      question: "¿Dónde consulto una declaración de la renta ya presentada?",
      aliases: ["ya la presenté", "i already filed it"],
      title: "Busca «Consulta de declaraciones presentadas».",
      intro:
        "La página de IRPF de la Agencia Tributaria distingue las declaraciones presentadas del servicio para preparar el borrador.",
      steps: [
        [
          "Abre la consulta de declaraciones presentadas.",
          "La encontrarás entre las gestiones destacadas de IRPF en la sede oficial.",
        ],
        [
          "Elige el ejercicio y accede allí.",
          "Comprueba el año que necesitas y usa la identificación que te pida la Agencia Tributaria.",
        ],
      ],
      refs: ["irpf"],
      stepRefs: [["irpf"], ["irpf"]],
      en: {
        question: "Where can I view an income tax return I already filed?",
        title: "Look for filed tax returns.",
        intro:
          "The tax agency’s IRPF page separates filed returns from the service for preparing a draft.",
        steps: [
          [
            "Open the filed returns service.",
            "Find it among the featured procedures on the official IRPF page.",
          ],
          [
            "Choose the year and sign in there.",
            "Check the year you need and use the identification requested by the tax agency.",
          ],
        ],
      },
    },
  },
  ayudas: {
    refs: ["ayudas"],
    stepRefs: [["ayudas"], ["ayudas"], ["ayudas"]],
    scope: [
      "El ámbito y el organismo dependen de cada convocatoria.",
      "Each programme sets its territory and responsible authority.",
    ],
    actions: [
      [
        "ayudas",
        "Buscar ayudas, becas y subvenciones",
        "Search grants, scholarships and support",
      ],
    ],
    detail: {
      id: "programme",
      question: "¿Cómo compruebo si puedo solicitar una ayuda?",
      aliases: ["puedo solicitarla", "am i eligible"],
      title: "Comprueba la convocatoria concreta.",
      intro:
        "El buscador permite localizar ayudas y consultar su detalle. Este prototipo no evalúa tu elegibilidad.",
      steps: [
        [
          "Busca la ayuda que necesitas.",
          "Usa los términos del programa y abre su ficha. El buscador ofrece más opciones de búsqueda.",
        ],
        [
          "Lee la convocatoria del organismo.",
          "Comprueba destinatarios, territorio, plazo y forma de solicitud en la publicación oficial antes de presentar documentación.",
        ],
      ],
      stepRefs: [["ayudas"], ["ayudas"]],
      en: {
        question: "How do I check whether I can apply for a grant?",
        title: "Check the specific programme notice.",
        intro:
          "The directory lets you find grants and view their details. This prototype does not assess eligibility.",
        steps: [
          [
            "Find the relevant programme.",
            "Search for the programme and open its record. The directory offers additional search options.",
          ],
          [
            "Read the authority’s official notice.",
            "Check who can apply, the territory, deadline and application method before submitting documents.",
          ],
        ],
      },
    },
  },
};

export const guides = baseGuides.map((guide) => ({
  ...guide,
  ...guideServices[guide.id],
  reviewedAt: "2026-10-02",
  followups: [guideServices[guide.id].detail.question],
}));

const normalizeQuestion = (text) =>
  normalize(text)
    .trim()
    .replace(/\s+/g, " ")
    .replace(/^[¿?¡!]+|[?.!]+$/g, "");

function findDetail(text, previousId) {
  const q = normalizeQuestion(text);
  return guides.find(
    (guide) =>
      [guide.detail.question, guide.detail.en.question].some(
        (question) => normalizeQuestion(question) === q,
      ) ||
      (guide.id === previousId &&
        guide.detail.aliases.some((alias) => normalizeQuestion(alias) === q)),
  );
}

export function resolveGuide(text, previousId) {
  const detailGuide = findDetail(text, previousId);
  if (detailGuide) return { guide: detailGuide, detail: detailGuide.detail.id };
  return { guide: findGuide(text), detail: null };
}

export function getGuideContent(guideId, detailId, lang = "es") {
  const guide = guides.find((g) => g.id === guideId);
  if (!guide) return null;
  const detail = detailId === guide.detail.id ? guide.detail : null;
  const content = {
    ...guide,
    ...(lang === "en" ? guide.en : {}),
    ...detail,
    ...(lang === "en" && detail ? detail.en : {}),
  };
  return content;
}

export function formatReviewDate(date, lang = "es") {
  return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function normalize(text) {
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}
export function findGuide(text, previousId) {
  const detailGuide = findDetail(text, previousId);
  if (detailGuide) return detailGuide;
  // A short follow-up without its own topic should not become a new,
  // unrelated answer just because it contains a keyword such as identity.
  if (
    guides.some((guide) =>
      guide.detail.aliases.some(
        (alias) => normalizeQuestion(alias) === normalizeQuestion(text),
      ),
    )
  )
    return null;
  const q = normalize(text).trim().replace(/\s+/g, " ");
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
  const matchesKeyword = (keyword) => {
    const term = normalize(keyword).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // Match complete words, including simple plurals, rather than fragments
    // such as "renta" inside "cuarenta" or "clave" inside "enclave".
    return new RegExp(`(?:^|[^a-z0-9])${term}(?:s|es)?(?:$|[^a-z0-9])`).test(q);
  };
  const ranked = guides
    .map((g) => ({
      guide: g,
      score: g.keywords.reduce(
        (s, k) =>
          s +
          (matchesKeyword(k)
            ? broadTerms.has(k)
              ? 1
              : Math.max(2, k.length)
            : 0),
        0,
      ),
    }))
    .sort((a, b) => b.score - a.score);
  if (ranked[0].score >= 2 && ranked[0].score > ranked[1].score)
    return ranked[0].guide;
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
