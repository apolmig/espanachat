import { useId, useRef, useState } from "react";
import { ArrowUpRight, MagnifyingGlass } from "@phosphor-icons/react";
import { guides } from "./knowledge.js";
import { guideLabels, guideCategories } from "./guide-navigation.js";

const searchable = (text) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/cl@ve/g, "clave");

export function GuideCatalog({ lang, t, busy, onChoose }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const input = useRef(null);
  const fieldId = useId();
  const terms = searchable(query.trim()).split(/\s+/).filter(Boolean);
  const available = guides.filter((guide) => {
    const group = guideCategories.find((item) =>
      item.guides.includes(guide.id),
    );
    if (category !== "all" && group?.id !== category) return false;
    const content = [
      guideLabels[guide.id].join(" "),
      ...(group?.label || []),
      guide.question,
      guide.en.question,
      guide.detail.question,
      guide.detail.en.question,
      ...(guide.keywords || []),
    ].join(" ");
    return terms.every((term) => searchable(content).includes(term));
  });
  return (
    <>
      <h2>{t("Guías prácticas.", "Practical guides.")}</h2>
      <p>
        {t(
          "Elige un trámite para continuar. Tu conversación se conserva.",
          "Choose a procedure to continue. Your conversation stays available.",
        )}
      </p>
      <div className="guide-search">
        <label htmlFor={fieldId}>
          {t(
            `Buscar entre las ${guides.length} guías`,
            `Search the ${guides.length} guides`,
          )}
        </label>
        <div>
          <MagnifyingGlass size={20} aria-hidden="true" />
          <input
            ref={input}
            id={fieldId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            maxLength={100}
            placeholder={t(
              "DNI, padrón, tarjeta sanitaria…",
              "ID, local register, health card…",
            )}
            autoComplete="off"
          />
        </div>
      </div>
      <div
        className="guide-categories"
        role="group"
        aria-label={t("Filtrar por tema", "Filter by topic")}
      >
        {[{ id: "all", label: ["Todas", "All"] }, ...guideCategories].map(
          (item) => (
            <button
              key={item.id}
              aria-pressed={category === item.id}
              onClick={() => setCategory(item.id)}
            >
              {t(...item.label)}
            </button>
          ),
        )}
      </div>
      <p className="guide-result-count" role="status">
        {available.length === 1
          ? t("1 guía disponible", "1 guide available")
          : t(
              `${available.length} guías disponibles`,
              `${available.length} guides available`,
            )}
      </p>
      <div className="guide-catalog">
        {available.map((guide) => (
          <button
            key={guide.id}
            disabled={busy}
            onClick={() =>
              onChoose(lang === "en" ? guide.en.question : guide.question)
            }
          >
            <span>
              <strong>{guideLabels[guide.id][lang === "en" ? 1 : 0]}</strong>
              <span>{lang === "en" ? guide.en.question : guide.question}</span>
            </span>
            <ArrowUpRight size={20} aria-hidden="true" />
          </button>
        ))}
      </div>
      {!available.length && (
        <div className="guide-empty">
          <p>
            {t(
              "No encontramos una guía con esos términos. Prueba con el nombre del trámite o consulta los temas disponibles.",
              "No guide matches those terms. Try the procedure name or browse the available topics.",
            )}
          </p>
          <button
            className="text-link"
            onClick={() => {
              setQuery("");
              setCategory("all");
              input.current?.focus();
            }}
          >
            {t("Mostrar todas las guías", "Show all guides")}
          </button>
        </div>
      )}
      <p className="guide-catalog-note">
        {t(
          "Guías preparadas con fuentes oficiales. Sin IA conectada.",
          "Prepared guides with official sources. No AI connected.",
        )}
      </p>
    </>
  );
}
