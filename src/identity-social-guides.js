// Prepared administrative guidance checked against the official source bodies.
// No records are accessed and no application is submitted by this prototype.
const reviewedAt = "2026-10-02";

export const identitySocialSources = {
  birthCertificate: {
    name: "Justicia · Solicitar certificado de nacimiento",
    domain: "sede.mjusticia.gob.es",
    url: "https://sede.mjusticia.gob.es/es/tramites/certificado-nacimiento",
    reviewedAt,
  },
  birthWithoutId: {
    name: "Justicia · Guía sin identificación mediante Cl@ve",
    domain: "sede.mjusticia.gob.es",
    url: "https://sede.mjusticia.gob.es/documents/d/guest/solicitud-certificado-nacimiento-sin-identificacion",
    reviewedAt,
  },
  civilRegistryHelp: {
    name: "Justicia · Preguntas frecuentes del Registro Civil",
    domain: "sede.mjusticia.gob.es",
    url: "https://sede.mjusticia.gob.es/es/informacion-ayuda/faq-registro-civil",
    reviewedAt,
  },
  nussRequest: {
    name: "Importass · Solicitar el Número de la Seguridad Social",
    domain: "portal.seg-social.gob.es",
    url: "https://portal.seg-social.gob.es/wps/portal/importass/importass/Categorias/Altas%2C%2Bbajas%2By%2Bmodificaciones/Altas%2By%2Bafiliacion%2Bde%2Btrabajadores/Solicitar%2Bel%2Bnumero%2Bde%2Bla%2BSeguridad%2BSocial",
    reviewedAt,
  },
  nussAccreditation: {
    name: "Importass · Acreditación del Número de la Seguridad Social",
    domain: "portal.seg-social.gob.es",
    url: "https://portal.seg-social.gob.es/wps/portal/importass/importass/Categorias/Vida%2Blaboral%2Be%2Binformes/Informes%2Bsobre%2Btu%2Bsituacion%2Blaboral/Acreditacion_NUSS",
    reviewedAt,
  },
};

const guides = [
  {
    id: "nacimiento",
    question: "¿Cómo pido mi certificado de nacimiento?",
    title: "Solicita tu certificado en el Registro Civil.",
    intro:
      "La sede de Justicia ofrece solicitudes con y sin identificación electrónica. La emisión inmediata depende de la inscripción y del trámite.",
    steps: [
      [
        "Comprueba qué certificado necesitas.",
        "Revisa el tipo y la finalidad exigidos por el trámite de destino. Para certificados especiales o para el primer DNI o pasaporte, usa la solicitud general.",
      ],
      [
        "Elige el servicio de la sede de Justicia.",
        "Para pedir el tuyo, selecciona la opción de inscrito. Consulta las modalidades con identificación electrónica y sin ella.",
      ],
      [
        "Sigue la respuesta del servicio.",
        "Si no puede emitirlo al momento, te indicará el envío postal o cómo obtenerlo en el Registro Civil.",
      ],
    ],
    refs: ["birthCertificate", "civilRegistryHelp"],
    stepRefs: [
      ["birthCertificate"],
      ["birthCertificate", "civilRegistryHelp"],
      ["civilRegistryHelp"],
    ],
    scope: [
      "Certificado de una inscripción de nacimiento existente. No tramita altas, nacionalidad ni certificados de otros países.",
      "Certificate of an existing birth registration. Does not register births or handle nationality or foreign certificates.",
    ],
    actions: [
      ["birthCertificate", "Solicitar en Justicia", "Apply through Justice"],
      [
        "civilRegistryHelp",
        "Consultar dudas del Registro Civil",
        "Check Civil Registry questions",
      ],
    ],
    keywords: [
      "certificado de nacimiento",
      "certificado literal de nacimiento",
      "partida de nacimiento",
      "registro civil",
      "birth certificate",
      "literal birth certificate",
      "civil registry",
    ],
    en: {
      question: "How do I request my birth certificate?",
      title: "Request your certificate from the Civil Registry.",
      intro:
        "Justice offers applications with or without electronic identification. Immediate issue depends on the registration and service.",
      steps: [
        [
          "Check the certificate you need.",
          "Check the type and purpose required by the receiving procedure. Use the general application for special certificates or a first DNI or passport.",
        ],
        [
          "Choose the Justice service.",
          "Select the registered-person option for your own certificate. Check the routes with or without electronic identification.",
        ],
        [
          "Follow the service response.",
          "If it cannot issue the certificate immediately, it will explain postal delivery or how to obtain it from the Civil Registry.",
        ],
      ],
    },
    detail: {
      id: "without-id",
      question: "¿Puedo pedir mi certificado de nacimiento sin Cl@ve?",
      aliases: [
        "certificado de nacimiento sin clave",
        "partida de nacimiento sin certificado digital",
        "no tengo clave",
        "sin certificado digital",
        "sin identificación electrónica",
        "birth certificate without clave",
        "birth certificate without a digital certificate",
        "i do not have clave",
      ],
      title: "Usa la solicitud sin identificación mediante Cl@ve.",
      intro:
        "Existe una vía online sin Cl@ve. No emite el certificado al momento; la sede indica envío por correo ordinario.",
      steps: [
        [
          "Abre la modalidad sin Cl@ve.",
          "En la página de nacimiento, elige esa solicitud e indica que pides tu propio certificado.",
        ],
        [
          "Completa el formulario oficial.",
          "Sigue su guía para los datos, la verificación de identidad y el justificante. Envía los documentos solo en la sede oficial.",
        ],
        [
          "Revisa el canal de entrega.",
          "Comprueba la dirección postal. Si la aplicación indica que debes acudir al Registro Civil, sigue sus instrucciones de atención presencial.",
        ],
      ],
      refs: ["birthCertificate", "birthWithoutId", "civilRegistryHelp"],
      stepRefs: [
        ["birthWithoutId"],
        ["birthWithoutId"],
        ["birthCertificate", "civilRegistryHelp"],
      ],
      actions: [
        [
          "birthCertificate",
          "Ver solicitud sin Cl@ve",
          "Find the route without Cl@ve",
        ],
        [
          "birthWithoutId",
          "Leer la guía oficial (PDF)",
          "Read the official guide (PDF)",
        ],
      ],
      en: {
        question: "Can I request my birth certificate without Cl@ve?",
        title: "Use the application without Cl@ve identification.",
        intro:
          "An online route without Cl@ve is available. It does not issue certificates immediately; the site specifies ordinary postal delivery.",
        steps: [
          [
            "Open the route without Cl@ve.",
            "Choose that application on the birth-certificate page and indicate that you are requesting your own certificate.",
          ],
          [
            "Complete the official form.",
            "Follow its guide for details, identity verification and the receipt. Submit documents only on the official site.",
          ],
          [
            "Check the delivery method.",
            "Check your postal address. If the application directs you to the Civil Registry, follow its instructions for attending in person.",
          ],
        ],
      },
    },
  },
  {
    id: "nuss",
    question: "¿Cómo solicito mi número de la Seguridad Social?",
    title: "Comprueba si ya tienes NUSS antes de solicitarlo.",
    intro:
      "El Número de la Seguridad Social, también llamado NAF, te identifica ante la Seguridad Social. Importass permite consultarlo o solicitarlo si no tienes uno asignado.",
    steps: [
      [
        "Comprueba si ya lo tienes.",
        "Puede estar asignado si has trabajado o tenido Seguro Escolar. Usa la acreditación del NUSS para consultarlo, en lugar de pedir otro.",
      ],
      [
        "Si no existe, abre Solicitar NUSS.",
        "Revisa en Importass los datos y la identificación para tu caso. También explica la vía sin identificación electrónica.",
      ],
      [
        "Envía la solicitud en Importass.",
        "Sigue el formulario oficial. Obtener el número es distinto de tramitar tu alta laboral o solicitar una prestación.",
      ],
    ],
    refs: ["nussRequest", "nussAccreditation"],
    stepRefs: [
      ["nussRequest", "nussAccreditation"],
      ["nussRequest"],
      ["nussRequest"],
    ],
    scope: [
      "Consulta y solicitud del NUSS. No reconoce derechos a prestaciones ni tramita un alta laboral; no compartas números o documentos en el chat.",
      "NUSS lookup and application. Does not grant benefits or register employment; do not share numbers or documents in the chat.",
    ],
    actions: [
      [
        "nussAccreditation",
        "Consultar o acreditar mi número",
        "Check or prove my number",
      ],
      [
        "nussRequest",
        "Solicitar NUSS en Importass",
        "Apply for a NUSS in Importass",
      ],
    ],
    keywords: [
      "nuss",
      "naf",
      "número de seguridad social",
      "número de la seguridad social",
      "numero de afiliacion",
      "afiliacion a la seguridad social",
      "social security number",
      "social security affiliation number",
      "proof of social security number",
    ],
    en: {
      question: "How do I apply for a Social Security number?",
      title: "Check whether you already have a NUSS before applying.",
      intro:
        "The Social Security number, also called NAF, identifies you to Social Security. Importass lets you check it or apply if none is assigned.",
      steps: [
        [
          "Check whether you already have one.",
          "You may have one after working or being covered by school insurance. Use NUSS accreditation to check, rather than requesting another.",
        ],
        [
          "If none exists, open Request NUSS.",
          "Check Importass for your case’s details and identification. It also explains the route without electronic identification.",
        ],
        [
          "Apply through Importass.",
          "Follow the official form. Obtaining the number is separate from employment registration or applying for benefits.",
        ],
      ],
    },
    detail: {
      id: "consult",
      question: "¿Cómo consulto o acredito mi número de la Seguridad Social?",
      aliases: [
        "cómo consultar mi nuss",
        "necesito acreditar mi número de afiliación",
        "ya tengo uno",
        "ya tengo número",
        "quiero consultarlo",
        "quiero un justificante del número",
        "how do i check my nuss",
        "i already have a number",
        "i need proof of my number",
      ],
      title: "Consulta y descarga la acreditación de tu NUSS.",
      intro:
        "El servicio de acreditación permite consultar un número ya asignado y descargar un informe en PDF. No solicita un número nuevo.",
      steps: [
        [
          "Abre Acreditación del NUSS.",
          "En Importass, usa el servicio de acreditación del Número de la Seguridad Social o de Afiliación.",
        ],
        [
          "Identifícate en el servicio oficial.",
          "Consulta las opciones disponibles. Sin identificación electrónica, el portal pide datos y verificación con documento y selfie; no los envíes aquí.",
        ],
        [
          "Obtén tu informe.",
          "Descarga el PDF de acreditación y guárdalo para el trámite que te lo solicite.",
        ],
      ],
      refs: ["nussAccreditation"],
      stepRefs: [
        ["nussAccreditation"],
        ["nussAccreditation"],
        ["nussAccreditation"],
      ],
      actions: [
        [
          "nussAccreditation",
          "Obtener acreditación del NUSS",
          "Get proof of my NUSS",
        ],
      ],
      en: {
        question: "How do I check or prove my Social Security number?",
        title: "Check your NUSS and download proof of it.",
        intro:
          "The accreditation service checks an assigned number and provides a PDF report. It does not apply for a new number.",
        steps: [
          [
            "Open NUSS accreditation.",
            "Use Importass’s Social Security or affiliation number accreditation service.",
          ],
          [
            "Identify yourself on the official service.",
            "Check the options available. Without electronic identification, the portal asks for details, ID verification and a selfie; do not send them here.",
          ],
          [
            "Get your report.",
            "Download the accreditation PDF and keep it for the procedure requesting it.",
          ],
        ],
      },
    },
  },
];

export const identitySocialGuides = guides.map((guide) => ({
  ...guide,
  reviewedAt,
  followups: [guide.detail.question],
}));
