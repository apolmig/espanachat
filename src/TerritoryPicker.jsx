import { useId, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { regions } from "./territorial-services.js";
import { isMunicipalityName } from "./territorial-context.js";

export function TerritoryPicker({ kind, territory, t, busy, onChoose }) {
  const fieldId = useId();
  const [value, setValue] = useState(
    kind === "region" ? territory?.id || "" : territory?.label || "",
  );
  const [editing, setEditing] = useState(!territory);
  const [error, setError] = useState(false);
  const regional = kind === "region";
  if (!editing)
    return (
      <div className="territory-selection">
        <span>
          {t("Territorio: ", "Area: ")}
          <strong>{territory.label}</strong>
        </span>
        <button disabled={busy} onClick={() => setEditing(true)}>
          {t("Cambiar", "Change")}
        </button>
      </div>
    );
  return (
    <form
      className="territory-picker"
      onSubmit={(event) => {
        event.preventDefault();
        if (busy) return;
        if (!regional && !isMunicipalityName(value)) {
          setError(true);
          return;
        }
        if (!value) return;
        onChoose(regional ? { id: value } : { label: value.trim() });
      }}
    >
      <h3>
        {regional
          ? t(
              "¿En qué comunidad o ciudad autónoma?",
              "Which autonomous community or city?",
            )
          : t("¿En qué municipio?", "Which municipality?")}
      </h3>
      <p>
        {regional
          ? t(
              "Elige tu territorio para encontrar el servicio de salud responsable.",
              "Choose your area to find the responsible health service.",
            )
          : t(
              "Escribe solo el nombre del municipio, sin dirección ni datos personales.",
              "Enter only the municipality name, without an address or personal details.",
            )}
      </p>
      <label htmlFor={fieldId}>
        {regional
          ? t("Comunidad o ciudad autónoma", "Autonomous community or city")
          : t("Municipio", "Municipality")}
      </label>
      <div className="territory-fields">
        {regional ? (
          <select
            id={fieldId}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            disabled={busy}
            required
          >
            <option value="">
              {t("Elige una opción", "Choose an option")}
            </option>
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={fieldId}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              setError(false);
            }}
            autoComplete="off"
            maxLength={80}
            disabled={busy}
            required
            aria-invalid={error || undefined}
            aria-describedby={error ? `${fieldId}-error` : undefined}
          />
        )}
        <button className="territory-submit" disabled={busy || !value.trim()}>
          {t("Ver mi servicio", "Find my service")}
          <ArrowUpRight size={18} />
        </button>
      </div>
      {error && (
        <p id={`${fieldId}-error`} className="territory-error" role="alert">
          {t(
            "Introduce únicamente un nombre de municipio, por ejemplo: Madrid.",
            "Enter only a municipality name, for example: Madrid.",
          )}
        </p>
      )}
      <p className="territory-optional">
        {t(
          "Puedes continuar con la guía general sin elegir territorio.",
          "You can use the general guide without choosing an area.",
        )}
      </p>
      {territory && (
        <button
          type="button"
          className="text-link"
          onClick={() => setEditing(false)}
        >
          {t("Cancelar cambio", "Cancel change")}
        </button>
      )}
    </form>
  );
}
