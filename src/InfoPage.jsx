import React from "react";
import {
  ArrowUpRight,
  CaretDown,
  ChatCircle,
  ShieldCheck,
  FilePdf,
  Globe,
  MagnifyingGlass,
  Buildings,
  Sparkle,
} from "@phosphor-icons/react";
import { sources } from "./knowledge.js";

export function InfoPage({ route, t, link }) {
  const card = (Icon, title, body) => (
    <article className="info-card" key={title}>
      <Icon size={34} weight="regular" />
      <h2>{title}</h2>
      <p>{body}</p>
    </article>
  );
  const directory = (
    <section className="source-directory">
      <h2>
        {t("Empieza en una fuente oficial.", "Start at an official source.")}
      </h2>
      <div>
        {["pag", "clave", "carpeta", "ss", "sepe", "aeat"].map((k) => (
          <a key={k} href={sources[k].url} target="_blank" rel="noreferrer">
            <span>
              <strong>{sources[k].name}</strong>
              <small>{sources[k].domain}</small>
            </span>
            <ArrowUpRight size={22} />
          </a>
        ))}
      </div>
    </section>
  );
  let title, intro, content;
  if (route === "/como-funciona") {
    title = t("Lo público, más sencillo.", "Public services, made simpler.");
    intro = t(
      "Una pregunta para empezar. Una fuente oficial para continuar.",
      "A question to get started. An official source to continue.",
    );
    content = (
      <>
        <div className="info-grid">
          {card(
            ChatCircle,
            t("Cuéntanos qué necesitas.", "Tell us what you need."),
            t(
              "Escribe tu consulta o elige una sugerencia. Puedes preguntar en español o en inglés.",
              "Type a question or choose a suggestion, in Spanish or English.",
            ),
          )}
          {card(
            MagnifyingGlass,
            t("Encuentra una guía.", "Find a guide."),
            t(
              "Esta versión compara palabras con siete temas preparados. No hay IA ni búsqueda en internet conectadas. Si no hay una guía, te indicamos dónde buscar.",
              "This version matches keywords against seven prepared topics. No AI or internet search is connected. If a guide is unavailable, we suggest where to look.",
            ),
          )}
          {card(
            Buildings,
            t("Comprueba la fuente.", "Check the source."),
            t(
              "Cada respuesta incluye enlaces al organismo responsable. Revisa allí los requisitos, documentación y plazos vigentes.",
              "Each guide links to the responsible authority. Check current requirements, documents and deadlines there.",
            ),
          )}
          {card(
            FilePdf,
            t("Lee tus documentos.", "Read your documents."),
            t(
              "Extrae el texto de un PDF en tu navegador. No se sube al servidor y no se interpreta con IA. Los documentos escaneados todavía necesitan OCR externo.",
              "Extract PDF text in your browser without uploading it. No AI interpretation is performed. Scanned documents still require external OCR.",
            ),
          )}
        </div>
        {directory}
        <div className="page-callout">
          <h2>
            {t(
              "Orientación. El trámite sigue en su sede.",
              "Guidance. Applications stay with the authority.",
            )}
          </h2>
          <p>
            {t(
              "No reservamos citas, presentamos solicitudes ni accedemos a tu información personal. El enlace oficial te lleva al servicio que lo hace.",
              "We do not book appointments, submit applications or access your personal records. The official link takes you to the appropriate service.",
            )}
          </p>
          {link(
            "/chat",
            <>
              {t("Haz tu primera consulta", "Ask your first question")}
              <ArrowUpRight size={20} />
            </>,
            "navy-pill",
          )}
        </div>
      </>
    );
  } else if (route === "/privacidad") {
    title = t("Tu privacidad, primero.", "Your privacy comes first.");
    intro = t(
      "Una primera versión sencilla, con límites claros.",
      "A simple first version, with clear limits.",
    );
    content = (
      <>
        <div className="info-grid">
          {card(
            ShieldCheck,
            t("Sin cuentas. Sin historial.", "No accounts. No history."),
            t(
              "No se guarda la conversación en cookies, localStorage ni una base de datos. Al recargar la página, desaparece.",
              "Conversations are not stored in cookies, localStorage or a database. Refreshing the page clears them.",
            ),
          )}
          {card(
            ChatCircle,
            t("Consultas locales.", "Local questions."),
            t(
              "Las guías se seleccionan en este navegador. Tus consultas no se envían a un servicio de IA ni a un servidor de esta aplicación.",
              "Guides are selected in this browser. Questions are not sent to an AI service or an application server.",
            ),
          )}
          {card(
            FilePdf,
            t("PDF sin subir.", "PDFs stay local."),
            t(
              "El lector procesa el archivo en memoria. Lee hasta 20 páginas y 30.000 caracteres. No verifica su autenticidad y no hace un resumen con IA.",
              "The reader processes files in memory, up to 20 pages and 30,000 characters. It does not verify authenticity or produce AI summaries.",
            ),
          )}
          {card(
            Globe,
            t("Sin ubicación ni seguimiento.", "No location or tracking."),
            t(
              "No solicitamos tu ubicación ni usamos analítica publicitaria. El servidor de desarrollo recibe las peticiones técnicas necesarias para cargar la web.",
              "We do not request your location or use advertising analytics. The development server receives the technical requests needed to load the website.",
            ),
          )}
          {card(
            MagnifyingGlass,
            t("Evita datos personales.", "Avoid personal details."),
            t(
              "El formulario detecta patrones básicos de DNI/NIE, correo, teléfono e IBAN español. El filtro es limitado: no detecta toda la información sensible. No compartas contraseñas ni datos privados.",
              "The form detects basic Spanish ID, email, phone and IBAN patterns. This limited filter cannot detect all sensitive information. Do not share passwords or private details.",
            ),
          )}
          {card(
            Buildings,
            t("Servicios externos.", "External services."),
            t(
              "Al abrir un enlace, se aplica la política del sitio oficial. Si activas dictado, tu navegador puede procesar la voz mediante su propio proveedor.",
              "Official websites apply their own policies when you open them. Dictation, if enabled, may use your browser’s speech provider.",
            ),
          )}
        </div>
        <p className="policy-date">
          {t(
            "Versión del prototipo: 30 de septiembre de 2026.",
            "Prototype version: 30 September 2026.",
          )}
        </p>
      </>
    );
  } else if (route === "/sobre") {
    title = t("Hola. Somos España.", "Hello. This is España.");
    intro = t(
      "Una idea para acercarte a tus servicios públicos.",
      "An idea to bring public services closer.",
    );
    content = (
      <>
        <div className="prose">
          <p>
            {t(
              "Este es un prototipo independiente inspirado en la experiencia de America.gov. Adaptamos su diseño a España y exploramos una forma más clara de orientarse entre administraciones.",
              "This is an independent prototype inspired by America.gov. We adapted its design for Spain and explored a clearer way to navigate public services.",
            )}
          </p>
          <p>
            {t(
              "No pertenece al Gobierno de España ni está respaldado por los organismos citados. «España» es el nombre de esta demostración, no un dominio gubernamental ni una identidad institucional.",
              "It does not belong to the Spanish government and is not endorsed by the cited authorities. “España” is the name of this demonstration, not a government domain or institutional identity.",
            )}
          </p>
          <p>
            {t(
              "La primera versión incluye siete guías revisadas con fuentes oficiales, un lector local de PDF y una interfaz accesible desde móvil y ordenador. Conectar un asistente real requerirá una base documental actualizada, controles de seguridad y evaluación de respuestas.",
              "The first version includes seven guides based on official sources, a local PDF reader and a mobile-friendly interface. A live assistant will require an updated document index, security controls and answer evaluation.",
            )}
          </p>
          {link(
            "/como-funciona",
            <>
              {t("Conoce la primera versión", "Explore the first version")}
              <ArrowUpRight size={20} />
            </>,
            "navy-pill",
          )}
        </div>
        {directory}
      </>
    );
  } else if (route === "/proximamente") {
    title = t("Más posibilidades.", "More possibilities.");
    intro = t(
      "Esto es lo que podemos construir a partir de aquí. Sin fechas de lanzamiento prometidas.",
      "Here is what we can build from here. No launch dates promised.",
    );
    content = (
      <>
        <div className="info-grid future-grid">
          {card(
            Sparkle,
            t(
              "Un asistente con fuentes actuales.",
              "An assistant with current sources.",
            ),
            t(
              "Un sistema de búsqueda en documentación oficial y generación de respuestas con citas comprobables. Primero, evaluar errores y actualización de contenidos.",
              "Search official documents and generate answers with verifiable citations. First, evaluate errors and content freshness.",
            ),
          )}
          {card(
            FilePdf,
            t("Entender documentos escaneados.", "Read scanned documents."),
            t(
              "Añadir OCR y explicaciones de documentos con consentimiento explícito, límites claros y protección de datos. El lector actual solo extrae texto.",
              "Add OCR and document explanations with explicit consent, clear limits and data protection. The current reader extracts text only.",
            ),
          )}
          {card(
            Buildings,
            t("Servicios conectados.", "Connected services."),
            t(
              "Explorar conexiones autorizadas con servicios públicos. Requiere acceso oficial, identificación segura y permisos reales. Hoy no hay ninguna integración activa.",
              "Explore authorised public service integrations. They require official access, secure identification and real permissions. No integration is active today.",
            ),
          )}
        </div>
        <div className="page-callout">
          <h2>
            {t("Lo que sí puedes probar hoy.", "What you can try today.")}
          </h2>
          <p>
            {t(
              "Consulta una guía, comprueba sus fuentes o lee el texto de un PDF local.",
              "Browse a guide, check its sources, or read the text of a local PDF.",
            )}
          </p>
          {link(
            "/chat",
            <>
              {t("Explorar el prototipo", "Explore the prototype")}
              <ArrowUpRight size={20} />
            </>,
            "navy-pill",
          )}
        </div>
      </>
    );
  } else if (route === "/preguntas") {
    title = t("Buenas preguntas.", "Good questions.");
    intro = t(
      "Respuestas claras sobre esta primera versión.",
      "Clear answers about this first version.",
    );
    const faqs = [
      [
        t(
          "¿Es una web oficial del Gobierno?",
          "Is this an official government website?",
        ),
        t(
          "No. Es una demostración independiente inspirada en America.gov. Los enlaces conducen a sitios oficiales, pero este prototipo no representa a sus organismos.",
          "No. This independent demonstration is inspired by America.gov. Links lead to official sites, but the prototype does not represent those authorities.",
        ),
      ],
      [
        t("¿Hay una IA conectada?", "Is a live AI connected?"),
        t(
          "No. El texto se compara con siete temas preparados. Las guías se cargan localmente, con enlaces para comprobar la información. No se realiza una búsqueda en tiempo real.",
          "No. Questions are matched against seven prepared topics. Guides load locally with source links. No real-time search takes place.",
        ),
      ],
      [
        t("¿Puedo hacer un trámite aquí?", "Can I submit an application here?"),
        t(
          "No. Para reservar citas, solicitar prestaciones o consultar expedientes debes continuar en la sede oficial correspondiente.",
          "No. To book appointments, apply for benefits or access records, continue at the appropriate official service.",
        ),
      ],
      [
        t("¿Se guardan mis consultas?", "Are my questions saved?"),
        t(
          "No se guardan de forma persistente. La conversación existe en memoria durante esta sesión y desaparece al recargar.",
          "They are not stored persistently. The conversation exists in memory during the session and disappears when the page is refreshed.",
        ),
      ],
      [
        t("¿Qué ocurre con mi PDF?", "What happens to my PDF?"),
        t(
          "Se extrae texto dentro del navegador, sin subir el archivo. El límite es 10 MB y las primeras 20 páginas. No hay OCR ni interpretación mediante IA.",
          "Text is extracted in the browser without uploading the file. The limit is 10 MB and the first 20 pages. There is no OCR or AI interpretation.",
        ),
      ],
      [
        t("¿Funciona el dictado?", "Does dictation work?"),
        t(
          "Depende del navegador y de sus permisos. Si admite reconocimiento de voz, puedes activarlo desde el micrófono. El procesamiento de voz depende del proveedor del navegador.",
          "It depends on browser support and permission. If speech recognition is supported, enable it with the microphone button. Speech processing depends on the browser provider.",
        ),
      ],
      [
        t("¿Qué idiomas hay?", "Which languages are available?"),
        t(
          "Español e inglés. Puedes cambiar de idioma desde el menú o el pie de página. Los sitios oficiales pueden ofrecer otros idiomas.",
          "Spanish and English. Switch languages in the menu or footer. Official websites may offer other languages.",
        ),
      ],
    ];
    content = (
      <div className="faq-list">
        {faqs.map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <CaretDown size={24} />
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    );
  } else if (route === "/condiciones") {
    title = t("Antes de empezar.", "Before you start.");
    intro = t("Condiciones de uso del prototipo.", "Prototype terms of use.");
    content = (
      <div className="prose">
        <h2>{t("Orientación general.", "General guidance.")}</h2>
        <p>
          {t(
            "Las guías ayudan a localizar servicios. No sustituyen requisitos oficiales ni asesoramiento profesional. Comprueba siempre la información en la sede responsable antes de actuar.",
            "Guides help locate services. They do not replace official requirements or professional advice. Always check the responsible authority before acting.",
          )}
        </p>
        <h2>
          {t(
            "Una demostración independiente.",
            "An independent demonstration.",
          )}
        </h2>
        <p>
          {t(
            "No se garantiza cobertura de todos los trámites, disponibilidad de enlaces ni elegibilidad para ayudas. No hay transacciones, cuentas ni presentaciones de solicitudes.",
            "There is no guarantee of complete service coverage, link availability or eligibility. No transactions, accounts or application submissions are supported.",
          )}
        </p>
        <h2>{t("Contenido y recursos.", "Content and assets.")}</h2>
        <p>
          {t(
            "Los recursos visuales de la referencia se reutilizan para una demostración local. Antes de publicar, deben revisarse sus derechos, sustituirse los recursos sin licencia y aprobarse una identidad propia.",
            "Reference visuals are reused for a local demonstration. Before publication, review rights, replace assets without a licence and approve an original identity.",
          )}
        </p>
      </div>
    );
  } else {
    title = t("Esta página no está aquí.", "This page is not here.");
    intro = t(
      "Puedes volver al inicio o hacer una consulta.",
      "Return home or ask a question.",
    );
    content = (
      <div className="page-callout">
        {link("/", t("Volver al inicio", "Return home"), "navy-pill")}
      </div>
    );
  }
  return (
    <main id="main" className="info-page">
      <div className="info-heading">
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
      <div className="info-content">{content}</div>
    </main>
  );
}
