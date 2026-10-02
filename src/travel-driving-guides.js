// Prepared guidance reviewed against public official pages on 2 October 2026.
// These national guides do not assess entitlement, request documents or access
// healthcare or driving records. Applications remain on the official services.
const reviewedAt = "2026-10-02";

export const travelDrivingSources = {
  tseInfo: {
    name: "Seguridad Social · Tarjeta Sanitaria Europea",
    domain: "seg-social.es",
    url: "https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/PrestacionesPensionesTrabajadores/10938/11566/1761?changeLanguage=es",
    reviewedAt,
  },
  cpsInfo: {
    name: "Seguridad Social · Certificado Provisional Sustitutorio",
    domain: "revista.seg-social.es",
    url: "https://revista.seg-social.es/-/como-solicitar-el-certificado-provisional-sustitutorio-cps",
    reviewedAt,
  },
  dgtRenewal: {
    name: "DGT · Renovación del permiso de conducir",
    domain: "sede.dgt.gob.es",
    url: "https://sede.dgt.gob.es/es/permisos-de-conducir/obtencion-y-gestion-de-permisos/renovacion-de-permiso-proximo-a-caducar/",
    reviewedAt,
  },
  dgtRenewalInfo: {
    name: "DGT · Renovar un permiso próximo a caducar",
    domain: "dgt.es",
    url: "https://www.dgt.es/nuestros-servicios/permisos-de-conducir/ha-caducado-o-necesitas-una-copia-de-tu-permiso/renovar-un-permiso-proximo-a-caducar/index.html",
    reviewedAt,
  },
  dgtCentres: {
    name: "DGT · Centros de Reconocimiento de Conductores",
    domain: "dgt.es",
    url: "https://www.dgt.es/conoce-la-dgt/con-quien-trabajamos/centros-reconocimiento-conductores/",
    reviewedAt,
  },
  dgtDuplicate: {
    name: "DGT · Duplicado por pérdida, robo o deterioro",
    domain: "sede.dgt.gob.es",
    url: "https://sede.dgt.gob.es/es/permisos-de-conducir/obtencion-y-gestion-de-permisos/duplicado-de-permisos",
    reviewedAt,
  },
  dgtDuplicateInfo: {
    name: "Revista DGT · Cómo solicitar un duplicado",
    domain: "revista.dgt.es",
    url: "https://revista.dgt.es/es/tramites/2026/0624-Duplicado-permiso-de-conducir.shtml",
    reviewedAt,
  },
};

const guides = [
  {
    id: "tse",
    question: "¿Cómo solicito la Tarjeta Sanitaria Europea?",
    title: "Prepara la tarjeta sanitaria para tu viaje por Europa.",
    intro:
      "La TSE acredita el derecho a asistencia sanitaria necesaria durante estancias temporales en los países donde es válida. Es distinta de la tarjeta sanitaria de tu comunidad.",
    steps: [
      [
        "Comprueba el destino y la vigencia.",
        "Consulta los países cubiertos y revisa que la tarjeta siga vigente hasta tu regreso. No sirve para viajar a recibir tratamiento ni para trasladar tu residencia.",
      ],
      [
        "Solicita o renueva en la Seguridad Social.",
        "Desde la información oficial, abre el Portal de Prestaciones. Revisa los canales de identificación y los datos de envío para ti o tus beneficiarios.",
      ],
      [
        "Prepara la recepción antes del viaje.",
        "La tarjeta se envía por correo postal. Si no puede emitirse o el viaje es inminente, consulta el Certificado Provisional Sustitutorio.",
      ],
    ],
    refs: ["tseInfo", "cpsInfo"],
    stepRefs: [["tseInfo"], ["tseInfo"], ["tseInfo", "cpsInfo"]],
    scope: [
      "Orientación para estancias temporales. La Seguridad Social comprueba el derecho; esta guía no evalúa cobertura personal ni ofrece consejo médico.",
      "Guidance for temporary stays. Social Security checks entitlement; this guide does not assess personal coverage or provide medical advice.",
    ],
    actions: [
      [
        "tseInfo",
        "Ver solicitud y renovación de la TSE",
        "Check EHIC applications and renewal",
      ],
    ],
    keywords: [
      "tarjeta sanitaria europea",
      "tse",
      "certificado provisional sustitutorio",
      "cps",
      "european health insurance card",
      "ehic",
      "provisional replacement certificate",
      "prc",
      "sanidad viaje europa",
      "european health card",
    ],
    en: {
      question: "How do I apply for a European Health Insurance Card?",
      title: "Prepare your health card for a trip in Europe.",
      intro:
        "The EHIC proves entitlement to necessary healthcare during temporary stays in covered countries. It is different from your regional Spanish health card.",
      steps: [
        [
          "Check the destination and expiry date.",
          "Check the covered countries and that your card is valid through your return. It does not cover travel to receive treatment or moving your residence.",
        ],
        [
          "Apply or renew with Social Security.",
          "Open the Benefits Portal from the official information page. Check identification methods and delivery details for yourself or your beneficiaries.",
        ],
        [
          "Plan delivery before travelling.",
          "The card arrives by post. If it cannot be issued or your trip is imminent, check the Provisional Replacement Certificate.",
        ],
      ],
    },
    detail: {
      id: "provisional",
      question: "¿Cómo solicito el Certificado Provisional Sustitutorio?",
      aliases: [
        "necesito el certificado provisional sustitutorio",
        "quiero el cps",
        "y si la tarjeta no llega a tiempo",
        "viajo mañana",
        "cómo pido el provisional",
        "how do i get a provisional replacement certificate",
        "what if the card does not arrive in time",
        "i travel tomorrow",
      ],
      title: "Consulta el certificado provisional para tu viaje.",
      intro:
        "El CPS puede utilizarse cuando la TSE no puede emitirse o no llega a tiempo. Su vigencia es más corta y la Seguridad Social debe comprobar que corresponde emitirlo.",
      steps: [
        [
          "Revisa cuándo procede el CPS.",
          "La guía oficial explica sus supuestos y límites para estancias temporales. No sustituye la tarjeta sanitaria autonómica.",
        ],
        [
          "Abre la solicitud desde la guía oficial.",
          "La Seguridad Social ofrece vías con y sin identificación digital. Elige la disponible y completa los datos únicamente en su servicio.",
        ],
        [
          "Descarga y comprueba el documento.",
          "Si se emite, descarga el certificado y revisa las fechas para el viaje. Es personal: cada beneficiario necesita el suyo.",
        ],
      ],
      refs: ["cpsInfo", "tseInfo"],
      stepRefs: [["cpsInfo", "tseInfo"], ["cpsInfo"], ["cpsInfo"]],
      actions: [
        [
          "cpsInfo",
          "Ver cómo solicitar el CPS",
          "Check how to request a replacement certificate",
        ],
      ],
      en: {
        question: "How do I request a Provisional Replacement Certificate?",
        title: "Check the provisional certificate for your trip.",
        intro:
          "A PRC may be used when the EHIC cannot be issued or arrives too late. It has a shorter validity period, and Social Security must check whether it can issue one.",
        steps: [
          [
            "Check when a PRC applies.",
            "The official guide explains its use and limits for temporary stays. It does not replace your regional health card.",
          ],
          [
            "Open the application from the official guide.",
            "Social Security offers routes with and without digital identification. Choose an available method and enter details only in its service.",
          ],
          [
            "Download and check the document.",
            "If issued, download the certificate and check the dates for your trip. It is personal: each beneficiary needs their own.",
          ],
        ],
      },
    },
  },
  {
    id: "conducir",
    question: "¿Cómo renuevo mi permiso de conducir?",
    title: "Renueva tu permiso en un centro autorizado o en la DGT.",
    intro:
      "Si tu permiso español está próximo a caducar o ya ha caducado, consulta su renovación. No puedes conducir con un permiso caducado.",
    steps: [
      [
        "Comprueba el procedimiento que corresponde.",
        "Revisa la renovación de permisos españoles en la DGT. Los permisos extranjeros, la residencia en otro país y la recuperación por pérdida de puntos tienen vías específicas.",
      ],
      [
        "Localiza un centro de reconocimiento autorizado.",
        "Usa el directorio de la DGT por provincia y población. El centro realiza el reconocimiento y puede tramitar la renovación completa; confirma documentación y costes antes de acudir.",
      ],
      [
        "Completa la renovación y conserva el justificante.",
        "También puedes tramitarla en la DGT con el informe de aptitud. Consulta la tasa y el canal elegido. El permiso provisional solo permite conducir en España.",
      ],
    ],
    refs: ["dgtRenewal", "dgtRenewalInfo", "dgtCentres"],
    stepRefs: [
      ["dgtRenewal"],
      ["dgtCentres", "dgtRenewalInfo"],
      ["dgtRenewal"],
    ],
    scope: [
      "Renovación de permiso español para residentes en España. Sin canjes, recuperación de puntos ni autorizaciones ADR; no se evalúa la aptitud para conducir.",
      "Renewal of a Spanish licence for residents in Spain. No exchanges, points recovery or ADR authorisations; fitness to drive is not assessed here.",
    ],
    actions: [
      [
        "dgtCentres",
        "Encontrar un centro autorizado",
        "Find an authorised assessment centre",
      ],
      [
        "dgtRenewal",
        "Ver la renovación en la DGT",
        "Check DGT renewal instructions",
      ],
    ],
    keywords: [
      "renovar permiso de conducir",
      "renovar carnet de conducir",
      "renovar carné de conducir",
      "permiso de conducir caducado",
      "duplicado permiso de conducir",
      "carnet de conducir perdido",
      "dgt",
      "renew driving licence",
      "renew driver license",
      "lost driving licence",
      "duplicate driving licence",
      "expired driving license",
    ],
    en: {
      question: "How do I renew my driving licence?",
      title: "Renew your licence at an authorised centre or with DGT.",
      intro:
        "If your Spanish licence is nearing expiry or has expired, check its renewal procedure. You cannot drive with an expired licence.",
      steps: [
        [
          "Check the appropriate procedure.",
          "Read DGT instructions for Spanish licences. Foreign licences, residence abroad and recovering a licence after losing all points have separate routes.",
        ],
        [
          "Find an authorised driver assessment centre.",
          "Use DGT’s directory by province and town. The centre carries out the assessment and can handle the full renewal; confirm documents and costs before visiting.",
        ],
        [
          "Complete renewal and keep the receipt.",
          "You can also apply with DGT using the fitness report. Check the fee and your chosen channel. The provisional licence only permits driving in Spain.",
        ],
      ],
    },
    detail: {
      id: "duplicate",
      question: "He perdido mi permiso de conducir. ¿Qué hago?",
      aliases: [
        "he perdido mi carnet de conducir",
        "me han robado el carné de conducir",
        "mi permiso de conducir está deteriorado",
        "necesito un duplicado del permiso de conducir",
        "he perdido el permiso",
        "y si lo pierdo",
        "i lost my driving licence",
        "my driving license was stolen",
        "i need a duplicate driving licence",
        "i lost the licence",
      ],
      title: "Pide un duplicado si tu permiso sigue vigente.",
      intro:
        "Un duplicado por pérdida, robo o deterioro conserva la fecha de caducidad del permiso. Si ya ha caducado, corresponde revisar la renovación.",
      steps: [
        [
          "Comprueba que el permiso esté vigente.",
          "La DGT distingue el duplicado de la renovación. Esta guía trata el permiso de conducir, no los documentos del vehículo.",
        ],
        [
          "Elige el canal oficial para el duplicado.",
          "Consulta identificación, documentación y tasa en la DGT. Hay vías por internet, teléfono y oficina; sigue las condiciones de la que elijas.",
        ],
        [
          "Guarda el documento provisional.",
          "Al completar la gestión, sigue las instrucciones para obtener el provisional y recibir el definitivo por correo. El provisional solo es válido para conducir en España.",
        ],
      ],
      refs: ["dgtDuplicate", "dgtDuplicateInfo"],
      stepRefs: [
        ["dgtDuplicate"],
        ["dgtDuplicateInfo", "dgtDuplicate"],
        ["dgtDuplicate"],
      ],
      actions: [
        [
          "dgtDuplicate",
          "Ver el duplicado en la DGT",
          "Check DGT duplicate instructions",
        ],
      ],
      en: {
        question: "I have lost my driving licence. What should I do?",
        title: "Request a duplicate if your licence is still valid.",
        intro:
          "A duplicate for loss, theft or damage keeps the original expiry date. If the licence has expired, check renewal instead.",
        steps: [
          [
            "Check that your licence is valid.",
            "DGT distinguishes duplicates from renewals. This guide covers your driving licence, not vehicle documents.",
          ],
          [
            "Choose an official duplicate channel.",
            "Check identification, documents and fees with DGT. Online, phone and office routes are available; follow your chosen route’s conditions.",
          ],
          [
            "Keep the provisional document.",
            "Once processed, follow instructions to obtain the provisional licence and receive the final one by post. The provisional licence is valid for driving in Spain only.",
          ],
        ],
      },
    },
  },
];

export const travelDrivingGuides = guides.map((guide) => ({
  ...guide,
  reviewedAt,
  followups: [guide.detail.question],
}));
