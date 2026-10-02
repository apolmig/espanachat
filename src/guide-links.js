import { guides as preparedGuides } from "./knowledge.js";

const safeId = /^[a-z][a-z0-9-]{0,63}$/;

function findAllowedGuide(id, guides) {
  if (typeof id !== "string" || !safeId.test(id) || !Array.isArray(guides))
    return null;
  const matches = guides.filter((guide) => guide?.id === id);
  return matches.length === 1 ? matches[0] : null;
}

function allowedDetail(guide, detailId) {
  return typeof detailId === "string" &&
    safeId.test(detailId) &&
    guide.detail?.id === detailId
    ? detailId
    : null;
}

/**
 * Build a shareable prepared-guide link. Only catalogue IDs and language are
 * serialized; the supplied object's other fields never enter the URL.
 */
export function buildGuidePath(guide, detailId, lang = "es") {
  const allowed = findAllowedGuide(guide?.id, preparedGuides);
  if (!allowed) return null;

  const params = new URLSearchParams({ guia: allowed.id });
  const detail = allowedDetail(allowed, detailId);
  if (detail) params.set("detalle", detail);
  if (lang === "en") params.set("idioma", "en");
  return `/chat?${params.toString()}`;
}

/**
 * Resolve only an explicitly allowed prepared guide. Ambiguous guide IDs are
 * rejected; invalid or duplicate optional fields fall back to the main guide
 * and Spanish. Free text, location and all other query fields are ignored.
 */
export function readGuideLink(search, guides) {
  if (typeof search !== "string" && !(search instanceof URLSearchParams))
    return null;

  const params = new URLSearchParams(search);
  const ids = params.getAll("guia");
  if (ids.length !== 1) return null;
  const guide = findAllowedGuide(ids[0], guides);
  if (!guide) return null;

  const details = params.getAll("detalle");
  const languages = params.getAll("idioma");
  return {
    guide,
    detail: details.length === 1 ? allowedDetail(guide, details[0]) : null,
    lang: languages.length === 1 && languages[0] === "en" ? "en" : "es",
  };
}
