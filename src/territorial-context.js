import {
  regions,
  municipalities,
  findRegion,
  findMunicipality,
  normalizeTerritory,
} from "./territorial-services.js";

const sourceEntries = (kind, entries) =>
  entries.flatMap((item) => [
    [`${kind}:${item.id}`, item.source],
    ...(item.mainSource ? [[`${kind}:${item.id}:main`, item.mainSource]] : []),
    ...(item.detailSource
      ? [[`${kind}:${item.id}:detail`, item.detailSource]]
      : []),
  ]);
export const territorialSources = Object.fromEntries([
  ...sourceEntries("region", regions),
  ...sourceEntries("municipality", municipalities),
]);

export function isMunicipalityName(value) {
  return (
    typeof value === "string" &&
    value.trim().length >= 2 &&
    value.trim().length <= 80 &&
    /\p{L}/u.test(value) &&
    /^[\p{L}\p{M} .’'()-]+$/u.test(value.trim()) &&
    !/\b(calle|avenida|avda|street|road|direccion|address|plaza|paseo|codigo postal)\b/i.test(
      value.normalize("NFD").replace(/\p{Diacritic}/gu, ""),
    )
  );
}

export function prepareTerritory(kind, selection) {
  if (!selection) return null;
  if (kind === "region") {
    const region = regions.find((item) => item.id === selection.id);
    return region ? { kind, id: region.id, label: region.label } : null;
  }
  if (kind !== "municipality" || !isMunicipalityName(selection.label))
    return null;
  const municipality = findMunicipality(selection.label.trim());
  return {
    kind,
    id: municipality?.id || null,
    label: municipality?.label || selection.label.trim(),
  };
}

export function resolveTerritory(guide, text, previousAnswer) {
  if (!guide?.territoryKind) return null;
  const kind = guide.territoryKind;
  const detected =
    kind === "region" ? findRegion(text) : findMunicipality(text);
  if (detected)
    return prepareTerritory(kind, {
      id: detected.id,
      label: detected.label,
    });
  // A new location attempt must never inherit an older answer's location.
  // Free-text prepositions can introduce channels such as "en internet".
  // Unrecognized locations return to the general guide and explicit picker.
  // Only that picker accepts unreviewed municipality names for the directory.
  const query = normalizeTerritory(text);
  const location = query.match(/\b(?:en|in)\s+(.+)$/)?.[1];
  if (location) return null;
  const entries = kind === "region" ? regions : municipalities;
  const mentioned = entries.filter((entry) =>
    [entry.label, ...entry.aliases].some((name) =>
      ` ${query} `.includes(` ${normalizeTerritory(name)} `),
    ),
  );
  // Any place mention that the conservative detector could not resolve must
  // return to the picker rather than silently reuse a previous destination.
  if (mentioned.length) return null;
  return previousAnswer?.guide === guide.id
    ? prepareTerritory(kind, previousAnswer.territory)
    : null;
}

export function findTerritoryReply(guide, text) {
  if (!guide?.territoryKind || typeof text !== "string") return null;
  const detected =
    guide.territoryKind === "region"
      ? findRegion(text)
      : findMunicipality(text);
  if (!detected) return null;
  const name = normalizeTerritory(text).replace(
    /^(?:vivo en|estoy en|en|i live in|in) /,
    "",
  );
  if (
    ![detected.label, ...detected.aliases].some(
      (alias) => normalizeTerritory(alias) === name,
    )
  )
    return null;
  return prepareTerritory(guide.territoryKind, {
    id: detected.id,
    label: detected.label,
  });
}

export function applyTerritory(content, selection, lang) {
  if (!content?.territoryKind) return content;
  const territory = prepareTerritory(content.territoryKind, selection);
  if (!territory) return content;
  const service =
    territory.kind === "region"
      ? regions.find((item) => item.id === territory.id)
      : municipalities.find((item) => item.id === territory.id);
  if (!service)
    return {
      ...content,
      territory,
      territoryNotice:
        lang === "en"
          ? `We do not have a reviewed council link for ${territory.label}. Use the official directory to find your town council. The guidance below is general.`
          : `No tenemos un enlace municipal revisado para ${territory.label}. Usa el directorio oficial para localizar tu ayuntamiento. La orientación de esta guía es general.`,
    };

  const variant = content.detailId
    ? service.detailSource
      ? "detail"
      : null
    : service.mainSource
      ? "main"
      : null;
  const ref = `${territory.kind}:${territory.id}${variant ? `:${variant}` : ""}`;
  const action = variant ? service[`${variant}Action`] : service.action;
  const selectedSource = territorialSources[ref];
  const scope =
    territory.kind === "region"
      ? [
          `Servicio de salud de ${territory.label}. Comprueba el procedimiento en su web oficial.`,
          `Health service for ${territory.label}. Check the procedure on its official website.`,
        ]
      : [
          `Ayuntamiento de ${territory.label}. Comprueba las opciones y requisitos del trámite en su sede.`,
          `${territory.label} town council. Check procedure options and requirements on its website.`,
        ];
  return {
    ...content,
    territory,
    scope,
    refs: [...new Set([...content.refs, ref])],
    actions: [
      [ref, ...action],
      ...content.actions.filter(([source]) => source !== ref),
    ],
    territoryNotice: !selectedSource.reviewedAt
      ? lang === "en"
        ? `Official link for ${territory.label}, with its content pending review. You can also use the Ministry's health-service directory.`
        : `Enlace oficial de ${territory.label}, con el contenido pendiente de revisión. También puedes consultar el directorio de servicios de salud de Sanidad.`
      : lang === "en"
        ? `Official service for ${territory.label}. Your circumstances and the requirements must be checked there.`
        : `Servicio oficial para ${territory.label}. Comprueba allí los requisitos de tu situación.`,
  };
}
