import React, { useEffect, useRef, useState } from "react";
import {
  X,
  ArrowUpRight,
  Globe,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Check,
  FilePdf,
  ShieldCheck,
  CaretDown,
  Trash,
  Sparkle,
  Sun,
  LinkSimple,
} from "@phosphor-icons/react";
import {
  guides,
  sources,
  findGuide,
  resolveConsultation,
  getGuideContent,
  formatReviewDate,
  hasPersonalData,
} from "./knowledge.js";
import { InfoPage } from "./InfoPage.jsx";
import { TerritoryPicker } from "./TerritoryPicker.jsx";
import { prepareTerritory } from "./territorial-context.js";
import { GuideCatalog } from "./GuideCatalog.jsx";
import { buildGuidePath, readGuideLink } from "./guide-links.js";
import { guideLabels, frequentGuideIds } from "./guide-navigation.js";

const frequentGuides = guides.filter((guide) =>
  frequentGuideIds.includes(guide.id),
);

const asset = (name) => `/assets/${name}`;
const slides = [
  {
    photo: "spain-family-v2.webp",
    guide: "ayudas",
    alt: ["Una familia en su nuevo piso", "A family in their new apartment"],
  },
  {
    photo: "spain-life.webp",
    guide: "dni",
    alt: [
      "Pareja paseando por un pueblo español",
      "A couple walking through a Spanish town",
    ],
  },
  {
    photo: "spain-work-v2.webp",
    guide: "vida",
    alt: [
      "Una mujer camino del trabajo en una calle de Madrid",
      "A woman walking to work on a Madrid street",
    ],
  },
  {
    photo: "spain-coast-v2.webp",
    guide: "paro",
    alt: [
      "Una mujer con su bicicleta en un paseo costero español",
      "A woman with her bicycle on a Spanish coastal promenade",
    ],
  },
];
function SourceIcon({ name, ...props }) {
  return (
    <img
      className="source-icon"
      src={asset(`icons/${name}.svg`)}
      alt=""
      {...props}
    />
  );
}
function Flag({ className = "" }) {
  return (
    <span aria-hidden="true" className={`fi fi-es spanish-flag ${className}`} />
  );
}

function Modal({ children, onClose, className = "", label, closeLabel }) {
  const ref = useRef(null);
  useEffect(() => {
    const prev = document.activeElement;
    const el = ref.current;
    el.showModal();
    return () => {
      el.close();
      if (prev?.isConnected) prev.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      aria-label={label}
      className={`dialog ${className}`}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <button
        className="close-button icon-button"
        onClick={onClose}
        aria-label={closeLabel}
      >
        <X size={24} />
      </button>
      {children}
    </dialog>
  );
}

function Composer({
  t,
  suggestion = "",
  onSend,
  onFile,
  busy,
  onStop,
  compact = false,
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [listening, setListening] = useState(false);
  const fileRef = useRef(null);
  const speech = useRef(null);
  useEffect(() => () => speech.current?.abort(), []);
  const send = (e) => {
    e?.preventDefault();
    if (busy) {
      onStop?.();
      return;
    }
    const query = value.trim() || suggestion;
    if (!query) return;
    if (hasPersonalData(query)) {
      setError(
        t(
          "Quita el DNI, NUSS, teléfono, correo o cuenta bancaria antes de enviar.",
          "Remove your ID, Social Security number, phone, email or bank details before sending.",
        ),
      );
      return;
    }
    speech.current?.abort();
    setListening(false);
    setError("");
    setValue("");
    onSend(query);
  };
  const dictate = () => {
    if (listening) {
      speech.current?.stop();
      setListening(false);
      return;
    }
    const Recognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      setError(
        t(
          "Tu navegador no admite dictado. Puedes escribir la consulta.",
          "Speech recognition is unavailable in this browser. Please type your question.",
        ),
      );
      return;
    }
    const recognition = new Recognition();
    speech.current = recognition;
    recognition.lang = t("es-ES", "en-GB");
    recognition.interimResults = false;
    recognition.onresult = (e) =>
      setValue((v) => `${v} ${e.results[0][0].transcript}`.trim());
    recognition.onend = () => setListening(false);
    recognition.onerror = () => {
      setListening(false);
      setError(
        t(
          "No se pudo iniciar el micrófono. Revisa el permiso del navegador.",
          "Microphone unavailable. Check your browser permission.",
        ),
      );
    };
    setError("");
    try {
      recognition.start();
      setListening(true);
    } catch {
      recognition.onerror();
    }
  };
  return (
    <div className={`composer-wrap ${compact ? "compact" : ""}`}>
      <form
        className="composer"
        onSubmit={send}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files[0]) onFile(e.dataTransfer.files[0]);
        }}
      >
        <textarea
          rows={1}
          value={value}
          maxLength={1500}
          aria-label={t("Describe lo que necesitas", "Describe what you need")}
          placeholder={
            suggestion ||
            t("Pregunta sobre un trámite…", "Ask about a public service…")
          }
          onChange={(e) => {
            setValue(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing)
              send(e);
          }}
        />
        <div className="composer-actions">
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,application/pdf"
            className="sr-only"
            tabIndex={-1}
            onChange={(e) => {
              if (e.target.files[0]) onFile(e.target.files[0]);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            className="icon-button"
            aria-label={t("Leer un PDF", "Read a PDF")}
            onClick={() => fileRef.current.click()}
          >
            <SourceIcon name="paperclip" />
          </button>
          <button
            type="button"
            className={`icon-button ${listening ? "listening" : ""}`}
            aria-label={
              listening
                ? t("Detener dictado", "Stop dictation")
                : t("Dictar consulta", "Dictate a question")
            }
            onClick={dictate}
          >
            <SourceIcon name="microphone" />
          </button>
          <button
            className="send-button icon-button"
            type="submit"
            aria-label={
              busy
                ? t("Detener respuesta", "Stop response")
                : t("Enviar consulta", "Send question")
            }
          >
            {busy ? (
              <span className="stop-square" />
            ) : (
              <SourceIcon name="arrow" />
            )}
          </button>
        </div>
      </form>
      {(error || listening) && (
        <p role="status" className="composer-alert">
          {error || t("Te escucho…", "Listening…")}
        </p>
      )}
    </div>
  );
}

function Answer({
  message,
  t,
  lang,
  onAsk,
  onSources,
  onTerritory,
  onCatalog,
}) {
  const [rating, setRating] = useState(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [shareStatus, setShareStatus] = useState("");
  const guide = guides.find((g) => g.id === message.guide);
  const data = getGuideContent(
    message.guide,
    message.detail,
    lang,
    message.territory,
  );
  const refs = data?.refs || ["pag"];
  const actions = data?.actions || [
    [
      "pag",
      "Localizar un trámite en el portal oficial",
      "Find a procedure in the official directory",
    ],
  ];
  const suggestions = guide
    ? [
        message.detail
          ? lang === "en"
            ? guide.en.question
            : guide.question
          : lang === "en"
            ? guide.detail.en.question
            : guide.detail.question,
      ]
    : [];
  const copy = async () => {
    setShareStatus("");
    const text = data
      ? `${data.title}\n\n${data.intro}\n\n${data.steps.map((s, i) => `${i + 1}. ${s[0]} ${s[1]}`).join("\n\n")}${data.territoryNotice ? `\n\n${data.territoryNotice}` : ""}\n\n${refs.map((k) => sources[k].url).join("\n")}`
      : t(
          "Consulta el Punto de Acceso General: ",
          "Visit the public service portal: ",
        ) + sources.pag.url;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setCopyError(false);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError(true);
    }
  };
  const copyGuideLink = async () => {
    const path = buildGuidePath(guide, message.detail, lang);
    if (!path) return;
    setCopied(false);
    setCopyError(false);
    try {
      await navigator.clipboard.writeText(
        new URL(path, window.location.origin).href,
      );
      setShareStatus(
        t(
          "Enlace copiado. No incluye el territorio ni la conversación.",
          "Link copied. It does not include the area or conversation.",
        ),
      );
    } catch {
      setShareStatus(
        t(
          "No se pudo copiar el enlace de la guía.",
          "Could not copy the guide link.",
        ),
      );
    }
  };
  if (message.stopped)
    return (
      <div className="answer stopped">
        {t(
          "Respuesta detenida. Puedes hacer otra consulta.",
          "Response stopped. You can ask another question.",
        )}
      </div>
    );
  return (
    <article className="answer" id={`answer-${message.id}`} tabIndex={-1}>
      <div className="answer-mark">
        <Flag />
        <span>{t("Guía orientativa", "Prepared guide")}</span>
      </div>
      <h2>
        {data?.title ||
          t(
            "Busquemos el servicio adecuado.",
            "Let’s find the right public service.",
          )}
      </h2>
      <p>
        {data?.intro ||
          t(
            `No hemos identificado un único trámite entre las ${guides.length} guías preparadas. Pregunta por un trámite cada vez, busca su organismo en el Punto de Acceso General o explora las guías disponibles.`,
            `We could not identify a single procedure among the ${guides.length} prepared guides. Ask about one procedure at a time, find its authority in the official directory or browse the available guides.`,
          )}
      </p>
      {data && (
        <p className="answer-scope">
          <strong>{t("Dónde se gestiona: ", "Responsible service: ")}</strong>
          {data.scope[lang === "en" ? 1 : 0]}
        </p>
      )}
      {data && (
        <ol className="answer-steps">
          {data.steps.map(([title, body], i) => (
            <li key={title}>
              <span className="step-number">{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>
                  {body}{" "}
                  {data.stepRefs[i].map((ref) => (
                    <button
                      key={ref}
                      className="inline-source"
                      aria-label={`${t("Ver fuente: ", "View source: ")}${sources[ref].name}`}
                      onClick={() => onSources([ref])}
                    >
                      {refs.indexOf(ref) + 1}
                    </button>
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
      {data?.territoryKind && (
        <TerritoryPicker
          kind={data.territoryKind}
          territory={data.territory}
          t={t}
          busy={message.busy}
          onChoose={(selection) => onTerritory(message, selection)}
        />
      )}
      {data?.territoryNotice && (
        <p className="territory-notice">{data.territoryNotice}</p>
      )}
      <div className="official-actions">
        {actions.map(([ref, es, en]) => (
          <a
            key={ref}
            className="official-link"
            href={sources[ref].url}
            target="_blank"
            rel="noreferrer"
          >
            {t(es, en)}
            <ArrowUpRight size={20} />
          </a>
        ))}
      </div>
      <p className="answer-note">
        {data &&
          `${t("Guía revisada el ", "Guide reviewed on ")}${formatReviewDate(data.reviewedAt, lang)}. `}
        {t(
          "Comprueba los requisitos y plazos vigentes en el organismo responsable.",
          "Check current requirements and deadlines with the responsible authority.",
        )}
      </p>
      <div className="answer-tools">
        <button className="source-pill" onClick={() => onSources(refs)}>
          {t("Fuentes", "Sources")}
          <span>{refs.length}</span>
          <CaretDown size={14} />
        </button>
        <div className="rating-tools">
          <button
            className={`icon-button ${rating === "up" ? "selected" : ""}`}
            aria-label={t("Esta guía es útil", "This guide is helpful")}
            aria-pressed={rating === "up"}
            onClick={() => setRating((r) => (r === "up" ? null : "up"))}
          >
            <ThumbsUp size={19} />
          </button>
          <button
            className={`icon-button ${rating === "down" ? "selected" : ""}`}
            aria-label={t("Esta guía no es útil", "This guide is unhelpful")}
            aria-pressed={rating === "down"}
            onClick={() => setRating((r) => (r === "down" ? null : "down"))}
          >
            <ThumbsDown size={19} />
          </button>
          <button
            className="icon-button"
            onClick={copy}
            aria-label={t("Copiar respuesta", "Copy answer")}
          >
            {copied ? <Check size={19} /> : <Copy size={19} />}
          </button>
          {guide && (
            <button
              className="icon-button"
              onClick={copyGuideLink}
              aria-label={t("Copiar enlace de guía", "Copy guide link")}
            >
              <LinkSimple size={19} />
            </button>
          )}
        </div>
      </div>
      {(rating || copied || copyError || shareStatus) && (
        <small role="status" className="tool-status">
          {shareStatus ||
            (copyError
              ? t(
                  "No se pudo copiar. Selecciona el texto para copiarlo.",
                  "Could not copy. Select the text to copy it.",
                )
              : copied
                ? t("Respuesta copiada.", "Answer copied.")
                : t(
                    "Valoración marcada solo en esta sesión.",
                    "Rating recorded in this session only.",
                  ))}
        </small>
      )}
      <div className="followups">
        {suggestions.map((question) => (
          <button
            key={question}
            disabled={message.busy}
            onClick={() => onAsk(question, message)}
          >
            {question}
            <ArrowUpRight size={18} />
          </button>
        ))}
      </div>
      {!guide && (
        <button
          className="catalog-access"
          onClick={onCatalog}
          disabled={message.busy}
        >
          {t(
            `Explorar las ${guides.length} guías`,
            `Browse all ${guides.length} guides`,
          )}
          <ArrowUpRight size={18} aria-hidden="true" />
        </button>
      )}
    </article>
  );
}

function linkedMessages(link) {
  if (!link) return [];
  const content = getGuideContent(link.guide.id, link.detail, link.lang);
  return [
    { role: "user", text: content.question, id: crypto.randomUUID() },
    {
      role: "assistant",
      guide: link.guide.id,
      detail: link.detail,
      territory: null,
      id: crypto.randomUUID(),
    },
  ];
}

export function App() {
  const [initialGuideLink] = useState(() =>
    window.location.pathname.replace(/\/$/, "") === "/chat"
      ? readGuideLink(window.location.search, guides)
      : null,
  );
  const [route, setRoute] = useState(
    window.location.pathname.replace(/\/$/, "") || "/",
  );
  const [lang, setLang] = useState(initialGuideLink?.lang || "es");
  const t = (es, en) => (lang === "es" ? es : en);
  const [modal, setModal] = useState(null);
  const [expandedBanner, setExpandedBanner] = useState(false);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [portalPaused, setPortalPaused] = useState(false);
  const [privacyOn, setPrivacyOn] = useState(true);
  const [badge, setBadge] = useState(0);
  const [flagSpin, setFlagSpin] = useState(0);
  const [fingerprint, setFingerprint] = useState(false);
  const [messages, setMessages] = useState(() =>
    linkedMessages(initialGuideLink),
  );
  const [busy, setBusy] = useState(false);
  const [showDock, setShowDock] = useState(false);
  const [pdf, setPdf] = useState(null);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const timer = useRef(null);
  const endRef = useRef(null);
  const questionTrigger = useRef(null);
  useEffect(() => {
    const pop = () => {
      setRoute(window.location.pathname.replace(/\/$/, "") || "/");
      setModal(null);
      if (window.location.pathname.replace(/\/$/, "") === "/chat") {
        const linkedGuide = readGuideLink(window.location.search, guides);
        if (linkedGuide) {
          clearTimeout(timer.current);
          setBusy(false);
          setLang(linkedGuide.lang);
          setMessages(linkedMessages(linkedGuide));
        }
      }
    };
    window.addEventListener("popstate", pop);
    return () => window.removeEventListener("popstate", pop);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t(
      "España · Tus servicios públicos, más cerca",
      "España · Public services, made simpler",
    );
  }, [lang]);
  useEffect(() => {
    const frame = requestAnimationFrame(() =>
      document.getElementById("main")?.focus({ preventScroll: true }),
    );
    return () => cancelAnimationFrame(frame);
  }, [route]);
  useEffect(() => {
    const fn = () => setShowDock(window.scrollY > 950);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    if (
      paused ||
      route !== "/" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const id = setInterval(
      () => setSlide((s) => (s + 1) % slides.length),
      7500,
    );
    return () => clearInterval(id);
  }, [paused, route]);
  useEffect(() => {
    if (route === "/chat" && messages.length) {
      const latest = messages.at(-1);
      const showAnswer =
        latest.role === "assistant" && !latest.stopped && !busy;
      const target = showAnswer
        ? document.getElementById(`answer-${latest.id}`)
        : endRef.current;
      if (showAnswer && questionTrigger.current) {
        if (
          !questionTrigger.current.isConnected ||
          questionTrigger.current.closest(".territory-picker") ||
          (questionTrigger.current.closest(".followups") &&
            document.activeElement === document.body)
        )
          target?.focus({ preventScroll: true });
        questionTrigger.current = null;
      }
      target?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: showAnswer ? "start" : "end",
      });
    }
  }, [messages, busy, route]);
  useEffect(() => () => clearTimeout(timer.current), []);
  const nav = (path) => {
    history.pushState({}, "", path);
    setRoute(path);
    setModal(null);
    setShowDock(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const submitQuery = (query, resolution) => {
    if (busy) return;
    questionTrigger.current = document.activeElement;
    const { guide, detail, territory } = resolution;
    setMessages((ms) => [
      ...ms,
      { role: "user", text: query, id: crypto.randomUUID() },
    ]);
    if (route !== "/chat") nav("/chat");
    else {
      setModal(null);
      if (window.location.search) history.replaceState({}, "", "/chat");
    }
    setBusy(true);
    timer.current = setTimeout(() => {
      setMessages((ms) => [
        ...ms,
        {
          role: "assistant",
          guide: guide?.id || null,
          detail,
          territory,
          id: crypto.randomUUID(),
        },
      ]);
      setBusy(false);
    }, 650);
  };
  const ask = (query, originAnswer) => {
    const previousAnswer =
      originAnswer ||
      messages
        .slice()
        .reverse()
        .find((message) => message.role === "assistant");
    submitQuery(query, resolveConsultation(query, previousAnswer));
  };
  const chooseTerritory = (message, selection) => {
    const guide = guides.find((item) => item.id === message.guide);
    const territory = prepareTerritory(guide?.territoryKind, selection);
    if (!territory) return;
    const data = getGuideContent(message.guide, message.detail, lang);
    submitQuery(`${data.question} · ${territory.label}`, {
      guide,
      detail: message.detail,
      territory,
    });
  };
  const stop = () => {
    clearTimeout(timer.current);
    setBusy(false);
    setMessages((ms) => [
      ...ms,
      { role: "assistant", stopped: true, id: crypto.randomUUID() },
    ]);
  };
  const clear = () => {
    clearTimeout(timer.current);
    setBusy(false);
    setMessages([]);
    if (route === "/chat" && window.location.search)
      history.replaceState({}, "", "/chat");
    questionTrigger.current = null;
    document.getElementById("main")?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const readPdf = async (file) => {
    setModal({ type: "pdf" });
    setPdf({ name: file.name, busy: true });
    if (file.size > 10 * 1024 * 1024 || !/\.pdf$/i.test(file.name)) {
      setPdf({
        name: file.name,
        error: t("Elige un PDF de hasta 10 MB.", "Choose a PDF up to 10 MB."),
      });
      return;
    }
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url,
      ).href;
      const loadingTask = pdfjs.getDocument({
        data: new Uint8Array(await file.arrayBuffer()),
        isEvalSupported: false,
      });
      const doc = await loadingTask.promise;
      let text = "";
      for (let i = 1; i <= Math.min(doc.numPages, 20); i++) {
        const page = await doc.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item) => item.str).join(" ") + "\n";
        if (text.length > 30000) break;
      }
      const pages = doc.numPages;
      await loadingTask.destroy();
      setPdf({
        name: file.name,
        pages,
        text: text.trim().slice(0, 30000),
        guide: findGuide(text)?.id,
      });
    } catch {
      setPdf({
        name: file.name,
        error: t(
          "No se pudo leer este PDF. Puede estar protegido, dañado o usar un formato no compatible.",
          "This PDF could not be read. It may be encrypted, damaged or unsupported.",
        ),
      });
    }
  };
  const link = (path, label, cls = "") => (
    <a
      href={path}
      className={cls}
      onClick={(e) => {
        e.preventDefault();
        nav(path);
      }}
    >
      {label}
    </a>
  );
  const header = (
    <header className={`site-header ${route === "/chat" ? "chat-header" : ""}`}>
      {link(
        "/",
        <>
          <Flag />
          <span>España</span>
        </>,
        "brand",
      )}
      <div className="header-actions">
        {route === "/chat" && (
          <button
            className="guide-trigger"
            aria-label={t("Explorar guías", "Browse guides")}
            onClick={() => setModal({ type: "guides" })}
          >
            {t("Guías", "Guides")}
          </button>
        )}
        <button
          className="menu-button"
          onClick={() => setModal({ type: "menu" })}
          aria-label={t("Abrir menú", "Open menu")}
        >
          {t("Menú", "Menu")}
        </button>
      </div>
    </header>
  );
  const footer = (
    <footer className="site-footer">
      <nav
        className="footer-nav"
        aria-label={t("Enlaces del pie", "Footer links")}
      >
        {link("/como-funciona", t("Cómo funciona", "How it works"))}
        {link("/privacidad", t("Privacidad", "Privacy"))}
        {link("/sobre", t("Sobre España", "About España"))}
        {link("/proximamente", t("Lo que viene", "What comes next"))}
        {link("/preguntas", t("Preguntas frecuentes", "FAQ"))}
        <button
          onClick={() => {
            setFeedbackSent(false);
            setModal({ type: "feedback" });
          }}
        >
          {t("Comparte tu opinión", "Share feedback")}
        </button>
      </nav>
      <div className="footer-wordmark">
        España<span>.</span>
      </div>
      <div className="footer-meta">
        <p>
          <Flag />
          {t(
            "Hecho para acercarte a lo público.",
            "Bringing public services closer.",
          )}
          <br />
          {t(
            "Prototipo independiente. Sin afiliación institucional.",
            "Independent prototype. No government affiliation.",
          )}
          <br />
          <a
            className="creator-credit"
            lang="en"
            href="https://github.com/apolmig"
            target="_blank"
            rel="noopener noreferrer"
          >
            Made with{" "}
            <span className="credit-heart" role="img" aria-label="love">
              ♥
            </span>{" "}
            by apolmig
          </a>
        </p>
        <div>
          {link("/condiciones", t("Condiciones", "Terms"))}
          {link(
            "/preguntas",
            t("Preguntas frecuentes", "Frequently asked questions"),
          )}
        </div>
        <button
          className="language-button"
          onClick={() => setModal({ type: "language" })}
        >
          <Globe size={18} />
          {lang === "es" ? "Español" : "English"}
          <CaretDown size={14} />
        </button>
      </div>
    </footer>
  );
  const selectedGuide = guides.find((g) => g.id === slides[slide].guide);
  const question =
    lang === "en" ? selectedGuide.en.question : selectedGuide.question;
  const composerProps = { t, onSend: ask, onFile: readPdf, busy, onStop: stop };
  return (
    <>
      <a className="skip-link" href="#main">
        {t("Saltar al contenido", "Skip to content")}
      </a>
      {route !== "/chat" && (
        <div className={`prototype-banner ${expandedBanner ? "expanded" : ""}`}>
          <button
            onClick={() => setExpandedBanner((s) => !s)}
            aria-expanded={expandedBanner}
          >
            <span>
              {t(
                "Prototipo independiente de servicios públicos",
                "Independent public services prototype",
              )}
            </span>
            <SourceIcon name="info" />
          </button>
          {expandedBanner && (
            <p>
              {t(
                "Inspirado en America.gov. No es una web del Gobierno de España. Ofrece guías preparadas y enlaces a servicios oficiales; no realiza trámites.",
                "Inspired by America.gov. This is not a Spanish government website. It provides prepared guides and official links; it does not process applications.",
              )}
            </p>
          )}
        </div>
      )}
      {header}
      {route === "/" ? (
        <main id="main" tabIndex={-1}>
          <section className="hero-panel">
            <div
              className="hero-glow"
              style={{
                backgroundImage: `url(${asset("photos/" + slides[slide].photo)})`,
              }}
            />
            <div className="hero-content">
              <h1>{t("Hola, España.", "Hello, Spain.")}</h1>
              <p className="hero-subtitle">
                {t(
                  "Tus servicios públicos, más cerca.",
                  "Public services, made simpler.",
                )}
              </p>
              <div
                className="hero-photo"
                onFocusCapture={() => setPaused(true)}
              >
                <img
                  className="hero-image"
                  src={asset("photos/" + slides[slide].photo)}
                  alt={t(...slides[slide].alt)}
                  fetchPriority="high"
                />
                <Composer {...composerProps} suggestion={question} />
              </div>
              <div className="carousel-controls">
                <button
                  className="circle-button"
                  aria-label={t("Consulta anterior", "Previous suggestion")}
                  onClick={() => {
                    setSlide((s) => (s + slides.length - 1) % slides.length);
                    setPaused(true);
                  }}
                >
                  <SourceIcon name="previous" />
                </button>
                <button
                  className="circle-button"
                  aria-label={
                    paused
                      ? t("Reproducir carrusel", "Play carousel")
                      : t("Pausar carrusel", "Pause carousel")
                  }
                  onClick={() => setPaused((s) => !s)}
                >
                  <SourceIcon name={paused ? "play" : "pause"} />
                </button>
                <button
                  className="circle-button"
                  aria-label={t("Siguiente consulta", "Next suggestion")}
                  onClick={() => {
                    setSlide((s) => (s + 1) % slides.length);
                    setPaused(true);
                  }}
                >
                  <SourceIcon name="next" />
                </button>
              </div>
              <nav
                className="popular-guides"
                aria-label={t("Guías prácticas", "Practical guides")}
              >
                <p>{t("Consultas frecuentes", "Common questions")}</p>
                <div>
                  {frequentGuides.map((g) => (
                    <button
                      key={g.id}
                      onClick={() =>
                        ask(lang === "en" ? g.en.question : g.question)
                      }
                    >
                      {t(...guideLabels[g.id])}
                    </button>
                  ))}
                </div>
                <button
                  className="catalog-access"
                  onClick={() => setModal({ type: "guides" })}
                >
                  {t(
                    `Ver las ${guides.length} guías`,
                    `View all ${guides.length} guides`,
                  )}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </button>
              </nav>
            </div>
          </section>
          <section className="manifesto">
            <h2>
              {t("Un país", "A country")}{" "}
              <button
                className="inline-art flag-art"
                aria-label={t("Animar bandera", "Animate flag")}
                onClick={() => setFlagSpin((s) => s + 1)}
              >
                <Flag className={flagSpin % 2 ? "flipped" : ""} />
              </button>{" "}
              {t("lleno de posibilidades.", "full of possibilities.")} <br />
              {t(
                "Menos vueltas. Más respuestas.",
                "Less searching. More answers.",
              )}{" "}
              <br />
              {t("Con información", "With information")}{" "}
              <button
                className="inline-art agency-art"
                onClick={() => setBadge((s) => (s + 1) % 3)}
                aria-label={t(
                  "Ver otro servicio público",
                  "Show another public service",
                )}
              >
                {["Cl@ve", "SEPE", "060"][badge]}
              </button>{" "}
              {t("oficial.", "from official sources.")} <br />
              {t("Y tu privacidad", "And your privacy")}{" "}
              <button
                className={`inline-art fingerprint-art ${fingerprint ? "active" : ""}`}
                aria-label={t("Animar privacidad", "Animate privacy")}
                onClick={() => setFingerprint((s) => !s)}
              >
                <SourceIcon name="fingerprint" />
              </button>{" "}
              {t("por delante.", "comes first.")}
            </h2>
          </section>
          <section
            className="features"
            aria-label={t(
              "Una forma más sencilla de orientarte",
              "An easier way to find your way",
            )}
          >
            <div className="feature-row">
              <div
                className={`feature-art portal-art ${portalPaused ? "paused" : ""}`}
              >
                <img
                  className="portal-globe"
                  loading="lazy"
                  src={asset("photos/portals-globe.png")}
                  alt={t(
                    "Ilustración de portales públicos españoles en una esfera",
                    "Illustration of Spanish public service websites on a sphere",
                  )}
                />
                <button
                  className="art-control circle-button"
                  onClick={() => setPortalPaused((s) => !s)}
                  aria-label={
                    portalPaused
                      ? t("Animar portales", "Animate portals")
                      : t(
                          "Pausar animación de portales",
                          "Pause portal animation",
                        )
                  }
                >
                  <SourceIcon name={portalPaused ? "play" : "pause"} />
                </button>
              </div>
              <div className="feature-copy">
                <h2>
                  {t(
                    "Una pregunta. Menos pestañas.",
                    "One question. Fewer tabs.",
                  )}
                </h2>
                <p>
                  {t(
                    "Orientarte entre distintas administraciones puede ser complicado. Empieza con una pregunta y encuentra el servicio que necesitas.",
                    "Finding your way through different administrations can be complicated. Start with a question and find the service you need.",
                  )}
                </p>
              </div>
            </div>
            <div className="feature-row">
              <div
                className={`feature-art privacy-art ${privacyOn ? "" : "unlocked"}`}
              >
                <img
                  src={asset("icons/stars.svg")}
                  className="privacy-stars"
                  alt=""
                />
                <div className="privacy-lock">
                  <SourceIcon name="lock" />
                </div>
                <button
                  className="privacy-toggle"
                  onClick={() => setPrivacyOn((s) => !s)}
                  aria-label={t(
                    "Cambiar ilustración de privacidad",
                    "Change privacy illustration",
                  )}
                  aria-pressed={privacyOn}
                >
                  <span />
                </button>
              </div>
              <div className="feature-copy">
                <h2>{t("Tu vida. Tus datos.", "Your life. Your data.")}</h2>
                <p>
                  {t(
                    "Sin cuentas ni historial guardado. Las consultas y los PDF se procesan en tu navegador. Tú decides cuándo abrir un servicio oficial.",
                    "No accounts or saved history. Questions and PDFs are processed in your browser. You decide when to open an official service.",
                  )}
                </p>
                {link(
                  "/privacidad",
                  <>
                    {t(
                      "Así cuidamos tu privacidad",
                      "How we protect your privacy",
                    )}
                    <ArrowUpRight size={18} />
                  </>,
                  "text-link",
                )}
              </div>
            </div>
            <div className="feature-row">
              <div className="feature-art sources-art">
                <div className="agency-card card-clave">
                  <img src={asset("icons/clave-official.png")} alt="Cl@ve" />
                  <small>
                    {t("Tu identidad digital", "Your digital identity")}
                  </small>
                </div>
                <div className="agency-card card-sepe">
                  <img
                    src={asset("icons/sepe-official.svg")}
                    alt="Servicio Público de Empleo Estatal"
                  />
                </div>
                <div className="agency-card card-importass">
                  <img
                    src={asset("icons/government-official.svg")}
                    alt="Gobierno de España"
                  />
                  <small>
                    {t(
                      "Fuentes de la Administración",
                      "Public administration sources",
                    )}
                  </small>
                </div>
              </div>
              <div className="feature-copy">
                <h2>
                  {t(
                    "Fuentes oficiales. Respuestas claras.",
                    "Official sources. Clear answers.",
                  )}
                </h2>
                <p>
                  {t(
                    "Cada guía te lleva a la información del organismo responsable. Puedes comprobar la fuente y continuar tu trámite en su web.",
                    "Each guide leads to information from the responsible authority. Check the source and continue on its official website.",
                  )}
                </p>
                {link(
                  "/como-funciona",
                  <>
                    {t("Descubre cómo funciona", "See how it works")}
                    <ArrowUpRight size={18} />
                  </>,
                  "text-link",
                )}
              </div>
            </div>
            <div className="feature-row">
              <div className="feature-art browser-art">
                <div className="browser-dock">
                  {["laptop", "mobile", "browser"].map((device) => (
                    <img
                      key={device}
                      src={asset(`devices/${device}.svg`)}
                      alt={
                        {
                          laptop: t("Ordenador", "Computer"),
                          mobile: t("Móvil", "Phone"),
                          browser: t("Navegador", "Browser"),
                        }[device]
                      }
                    />
                  ))}
                </div>
                <div className="browser-caption">
                  <Flag />
                  <span>España</span>
                </div>
              </div>
              <div className="feature-copy">
                <h2>
                  {t(
                    "Donde estés. Cuando lo necesites.",
                    "Wherever you are. Whenever you need it.",
                  )}
                </h2>
                <p>
                  {t(
                    "En el móvil o en el ordenador. Escribe, usa el dictado si tu navegador lo admite o lee un PDF sin subirlo a un servidor.",
                    "On your phone or computer. Type, dictate if your browser supports it, or read a PDF without uploading it to a server.",
                  )}
                </p>
              </div>
            </div>
          </section>
          <section className="roadmap">
            <h2>
              {t("Lo mejor está por venir.", "More possibilities ahead.")}
            </h2>
            <p className="roadmap-intro">
              {t(
                "Una primera versión. Muchas posibilidades.",
                "A first version. Many possibilities.",
              )}
            </p>
            <div className="preview-grid">
              <div className="preview-card jobs-preview">
                <span className="preview-label">
                  {t("VISTA CONCEPTUAL", "CONCEPT PREVIEW")}
                </span>
                <p>{t("Un siguiente paso", "A next step")}</p>
                <h3>{t("hecho para ti.", "made for you.")}</h3>
                <div className="mini-job">
                  <Sun size={30} className="job-icon" />
                  <div>
                    <strong>
                      {t("Tu próxima oportunidad", "Your next opportunity")}
                    </strong>
                    <small>
                      {t(
                        "Empleo · Formación · Ayudas",
                        "Jobs · Training · Grants",
                      )}
                    </small>
                  </div>
                  <ArrowUpRight size={23} />
                </div>
              </div>
              <div className="preview-card photo-preview">
                <img
                  src={asset("photos/spain-family-v2.webp")}
                  alt={t(
                    "Una familia en su nuevo piso",
                    "A family in their new apartment",
                  )}
                  loading="lazy"
                />
                <span className="preview-label">
                  {t("VISTA CONCEPTUAL", "CONCEPT PREVIEW")}
                </span>
                <h3>
                  {t("Para los grandes momentos.", "For life’s big moments.")}
                </h3>
              </div>
              <div className="preview-card document-preview">
                <span className="preview-label">
                  {t("YA EN ESTE PROTOTIPO", "IN THIS PROTOTYPE")}
                </span>
                <FilePdf size={44} />
                <h3>
                  {t(
                    "Menos dudas con tus documentos.",
                    "Understand your documents.",
                  )}
                </h3>
                <button onClick={() => setModal({ type: "pdf" })}>
                  {t("Leer un PDF", "Read a PDF")}
                  <ArrowUpRight size={20} />
                </button>
              </div>
            </div>
            {link(
              "/proximamente",
              <>
                {t("Explora lo que viene", "Explore what comes next")}
                <ArrowUpRight size={18} />
              </>,
              "navy-pill",
            )}
          </section>
          {footer}
        </main>
      ) : route === "/chat" ? (
        <main
          id="main"
          className="chat-page"
          tabIndex={-1}
          aria-label={t(
            "Consulta de servicios públicos",
            "Public service questions",
          )}
        >
          <div
            className="sr-only"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {!busy &&
              messages.at(-1)?.role === "assistant" &&
              (messages.at(-1).stopped
                ? t("Respuesta detenida.", "Response stopped.")
                : `${t("Respuesta disponible: ", "Answer available: ")}${getGuideContent(messages.at(-1).guide, messages.at(-1).detail, lang)?.title || t("Consulta fuera de las guías disponibles.", "Question outside the available guides.")}`)}
          </div>
          <div className="chat-thread">
            {!messages.length && (
              <section className="chat-welcome">
                <h1>{t("¿Qué necesitas hoy?", "What do you need today?")}</h1>
                <p>
                  {t("Empieza con una pregunta.", "Start with a question.")}
                </p>
                <div className="suggestion-grid">
                  {frequentGuides.map((g) => (
                    <button
                      key={g.id}
                      onClick={() =>
                        ask(lang === "en" ? g.en.question : g.question)
                      }
                    >
                      {lang === "en" ? g.en.question : g.question}
                      <ArrowUpRight size={18} />
                    </button>
                  ))}
                </div>
                <button
                  className="catalog-access"
                  onClick={() => setModal({ type: "guides" })}
                >
                  {t(
                    `Explorar las ${guides.length} guías`,
                    `Browse all ${guides.length} guides`,
                  )}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </button>
              </section>
            )}
            <div className="demo-label">
              <Sparkle size={15} />
              {t(
                "Guías locales · Sin IA conectada",
                "Local guides · No AI connected",
              )}
            </div>
            {messages.map((m) =>
              m.role === "user" ? (
                <div className="user-message" key={m.id}>
                  {m.text}
                </div>
              ) : (
                <Answer
                  key={`${m.id}-${lang}`}
                  message={{ ...m, busy }}
                  t={t}
                  lang={lang}
                  onAsk={ask}
                  onCatalog={() => setModal({ type: "guides" })}
                  onTerritory={chooseTerritory}
                  onSources={(refs) => setModal({ type: "sources", refs })}
                />
              ),
            )}
            {busy && (
              <div className="loading-response" role="status">
                <Flag />
                <span>
                  {t("Buscando en las guías…", "Looking through the guides…")}
                </span>
                <i />
                <i />
                <i />
              </div>
            )}
            <div ref={endRef} />
          </div>
          <div className="chat-dock">
            <Composer {...composerProps} />
            <div className="dock-caption">
              <button onClick={() => setModal({ type: "chatPrivacy" })}>
                {t("Tu privacidad", "Your privacy")}
              </button>
              <span>·</span>
              <button onClick={() => setModal({ type: "howAnswers" })}>
                {t("Cómo se generan las guías", "How the guides work")}
              </button>
              {messages.length > 0 && (
                <button
                  className="clear-chat"
                  onClick={clear}
                  aria-label={t("Borrar conversación", "Clear conversation")}
                >
                  <Trash size={14} />
                  {t("Borrar", "Clear")}
                </button>
              )}
            </div>
          </div>
        </main>
      ) : (
        <>
          <InfoPage route={route} t={t} link={link} />
          {footer}
        </>
      )}
      {route !== "/chat" && (showDock || route !== "/") && (
        <div className="floating-dock">
          <Composer {...composerProps} compact />
        </div>
      )}
      {modal && (
        <Modal
          key={modal.type}
          label={
            {
              menu: t("Menú", "Menu"),
              language: t("Elige tu idioma", "Choose your language"),
              sources: t("Fuentes oficiales", "Official sources"),
              chatPrivacy: t("Tu privacidad", "Your privacy"),
              howAnswers: t("Cómo se generan las guías", "How the guides work"),
              feedback: t("Comparte tu opinión", "Share your feedback"),
              pdf: t("Consultar un PDF", "Read a PDF"),
              guides: t("Guías prácticas", "Practical guides"),
            }[modal.type]
          }
          closeLabel={t("Cerrar", "Close")}
          onClose={() => setModal(null)}
          className={modal.type === "menu" ? "menu-dialog" : ""}
        >
          {modal.type === "menu" ? (
            <>
              <div className="menu-brand">
                <Flag />
                España
              </div>
              <nav className="menu-nav">
                {link("/chat", t("Haz una consulta", "Ask a question"))}
                <button onClick={() => setModal({ type: "guides" })}>
                  {t("Guías prácticas", "Practical guides")}
                </button>
                {link("/como-funciona", t("Cómo funciona", "How it works"))}
                {link("/privacidad", t("Privacidad", "Privacy"))}
                {link("/sobre", t("Sobre España", "About España"))}
                {link("/proximamente", t("Lo que viene", "What comes next"))}
                {link("/preguntas", t("Preguntas frecuentes", "FAQ"))}
              </nav>
              <button
                className="menu-language"
                onClick={() => setModal({ type: "language" })}
              >
                <Globe size={18} />
                {lang === "es" ? "Español" : "English"}
              </button>
              <p className="menu-disclaimer">
                {t(
                  "Un prototipo independiente para orientarte entre los servicios públicos.",
                  "An independent prototype to help you find your way through public services.",
                )}
              </p>
            </>
          ) : modal.type === "guides" ? (
            <GuideCatalog lang={lang} t={t} busy={busy} onChoose={ask} />
          ) : modal.type === "language" ? (
            <>
              <h2>{t("Elige tu idioma", "Choose your language")}</h2>
              <p>
                {t(
                  "Las guías están disponibles en español e inglés.",
                  "The guides are available in Spanish and English.",
                )}
              </p>
              <div className="language-options">
                {[
                  ["es", "Español"],
                  ["en", "English"],
                ].map(([code, name]) => (
                  <button
                    key={code}
                    aria-pressed={lang === code}
                    onClick={() => {
                      setLang(code);
                      const linkedGuide = readGuideLink(
                        window.location.search,
                        guides,
                      );
                      if (route === "/chat" && linkedGuide)
                        history.replaceState(
                          {},
                          "",
                          buildGuidePath(
                            linkedGuide.guide,
                            linkedGuide.detail,
                            code,
                          ),
                        );
                      setModal(null);
                    }}
                  >
                    {name}
                    {lang === code && <Check size={20} />}
                  </button>
                ))}
              </div>
            </>
          ) : modal.type === "sources" ? (
            <>
              <h2>{t("Fuentes oficiales", "Official sources")}</h2>
              <p>
                {t(
                  "Consulta el organismo responsable para comprobar requisitos y plazos vigentes.",
                  "Check current requirements and deadlines with the responsible authority.",
                )}
              </p>
              <div className="source-list">
                {modal.refs.map((k) => (
                  <a
                    key={k}
                    href={sources[k].url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Flag />
                    <span>
                      <strong>{sources[k].name}</strong>
                      <small>{sources[k].domain}</small>
                      {sources[k].reviewedAt && (
                        <small>
                          {t("Fuente revisada el ", "Source reviewed on ")}
                          {formatReviewDate(sources[k].reviewedAt, lang)}
                        </small>
                      )}
                    </span>
                    <ArrowUpRight size={20} />
                  </a>
                ))}
              </div>
            </>
          ) : modal.type === "chatPrivacy" ? (
            <>
              <ShieldCheck size={36} />
              <h2>{t("Tus datos se quedan aquí.", "Your data stays here.")}</h2>
              <p>
                {t(
                  "Esta versión no envía consultas ni PDF a un servidor. No usa cuentas, cookies de seguimiento ni almacenamiento del historial. Al recargar, la conversación desaparece.",
                  "This version does not send questions or PDFs to a server. There are no accounts, tracking cookies or stored chat history. Refreshing clears the conversation.",
                )}
              </p>
              <p>
                {t(
                  "El dictado, si lo activas, depende del servicio de voz de tu navegador. Los enlaces externos tienen su propia política de privacidad.",
                  "Dictation, if enabled, depends on your browser’s speech service. External sites have their own privacy policies.",
                )}
              </p>
              {link(
                "/privacidad",
                t("Leer la política de privacidad", "Read the privacy policy"),
                "text-link",
              )}
            </>
          ) : modal.type === "howAnswers" ? (
            <>
              <Sparkle size={34} />
              <h2>
                {t(
                  "Guías con fuentes, sin IA real.",
                  "Sourced guides, without live AI.",
                )}
              </h2>
              <p>
                {t(
                  `Tu consulta se compara en este navegador con ${guides.length} temas preparados. Puedes explorarlos por tema en Guías prácticas. No hay IA ni búsqueda en tiempo real conectadas.`,
                  `Your question is matched in this browser against ${guides.length} prepared topics. Browse them by topic in Practical guides. No AI or real-time search is connected.`,
                )}
              </p>
              <p>
                {t(
                  "Para padrón y tarjeta sanitaria puedes elegir municipio o comunidad. La selección queda solo en esta conversación y la guía general siempre está disponible.",
                  "For municipal registration and health cards, you can choose a municipality or region. The selection stays only in this conversation, and the general guide is always available.",
                )}
              </p>
              {link(
                "/como-funciona",
                t("Más sobre cómo funciona", "More about how it works"),
                "text-link",
              )}
            </>
          ) : modal.type === "feedback" ? (
            <>
              <h2>{t("Tu opinión importa.", "Your feedback matters.")}</h2>
              {feedbackSent ? (
                <div role="status" className="feedback-confirm">
                  <Check size={32} />
                  <p>
                    {t(
                      "Has probado el formulario. Esta demo no envía ni guarda tu opinión.",
                      "You have tried the form. This demo does not send or save your feedback.",
                    )}
                  </p>
                  <button className="navy-pill" onClick={() => setModal(null)}>
                    {t("Entendido", "Got it")}
                  </button>
                </div>
              ) : (
                <form
                  className="feedback-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFeedbackSent(true);
                  }}
                >
                  <p>
                    {t(
                      "¿Qué mejorarías? Este formulario es una demostración local.",
                      "What would you improve? This is a local demonstration form.",
                    )}
                  </p>
                  <label htmlFor="feedback">
                    {t("Tu comentario", "Your feedback")}
                  </label>
                  <textarea
                    id="feedback"
                    required
                    minLength={3}
                    maxLength={1500}
                    rows={4}
                    placeholder={t(
                      "Cuéntanos qué falta…",
                      "Tell us what is missing…",
                    )}
                  />
                  <button className="navy-pill" type="submit">
                    {t("Probar formulario", "Try the form")}
                    <ArrowUpRight size={18} />
                  </button>
                </form>
              )}
            </>
          ) : modal.type === "pdf" ? (
            <>
              <FilePdf size={36} />
              <h2>{t("Lee tu PDF aquí.", "Read your PDF here.")}</h2>
              <p>
                {t(
                  "El documento se lee en este navegador. No se sube a ningún servidor. Hasta 10 MB y las primeras 20 páginas de texto.",
                  "The document is read in this browser and is not uploaded to a server. Up to 10 MB and the first 20 text pages.",
                )}
              </p>
              {!pdf ? (
                <label className="pdf-upload">
                  {t("Seleccionar un PDF", "Choose a PDF")}
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={(e) =>
                      e.target.files[0] && readPdf(e.target.files[0])
                    }
                  />
                </label>
              ) : (
                <div className="pdf-result">
                  <strong>{pdf.name}</strong>
                  {pdf.busy ? (
                    <p role="status">
                      {t("Leyendo el documento…", "Reading document…")}
                    </p>
                  ) : pdf.error ? (
                    <p role="alert">{pdf.error}</p>
                  ) : (
                    <>
                      <small>
                        {pdf.pages}{" "}
                        {pdf.pages === 1
                          ? t("página", "page")
                          : t("páginas", "pages")}
                      </small>
                      {pdf.text ? (
                        <>
                          <h3>{t("Vista previa del texto", "Text preview")}</h3>
                          <pre>{pdf.text.slice(0, 4000)}</pre>
                          <p className="small-note">
                            {t(
                              "Lectura de texto, sin resumen de IA ni verificación del documento.",
                              "Text extraction only, without AI summary or document verification.",
                            )}
                          </p>
                          {pdf.guide && (
                            <button
                              className="navy-pill"
                              onClick={() =>
                                ask(
                                  lang === "en"
                                    ? guides.find((g) => g.id === pdf.guide).en
                                        .question
                                    : guides.find((g) => g.id === pdf.guide)
                                        .question,
                                )
                              }
                            >
                              {t(
                                "Ver una guía relacionada",
                                "Open a related guide",
                              )}
                              <ArrowUpRight size={18} />
                            </button>
                          )}
                        </>
                      ) : (
                        <p>
                          {t(
                            "No hay texto seleccionable. Los documentos escaneados necesitan OCR, que esta versión aún no incluye.",
                            "No selectable text found. Scanned documents require OCR, which this version does not include.",
                          )}
                        </p>
                      )}
                    </>
                  )}
                  <button className="text-link" onClick={() => setPdf(null)}>
                    {t("Elegir otro documento", "Choose another document")}
                  </button>
                </div>
              )}
            </>
          ) : null}
        </Modal>
      )}
    </>
  );
}
