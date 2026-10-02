// Display metadata only. Procedure content and permitted share IDs live in knowledge.js.
export const guideLabels = {
  dni: ["DNI y pasaporte", "ID and passport"],
  vida: ["Vida laboral", "Work history"],
  paro: ["Paro y prestaciones", "Unemployment"],
  clave: ["Cl@ve", "Cl@ve"],
  carpeta: ["Mis trámites", "My applications"],
  renta: ["Renta", "Tax return"],
  ayudas: ["Ayudas y becas", "Grants and scholarships"],
  padron: ["Padrón", "Local register"],
  sanitaria: ["Tarjeta sanitaria", "Health card"],
  certificado: ["Certificado digital", "Digital certificate"],
  tse: ["Tarjeta Sanitaria Europea", "European Health Insurance Card"],
  conducir: ["Permiso de conducir", "Driving licence"],
  nacimiento: ["Certificado de nacimiento", "Birth certificate"],
  nuss: ["Número de la Seguridad Social", "Social Security number"],
};

export const guideCategories = [
  {
    id: "documents",
    label: ["Documentos", "Documents"],
    guides: ["dni", "padron", "nacimiento"],
  },
  {
    id: "work",
    label: ["Trabajo y ayudas", "Work and support"],
    guides: ["vida", "paro", "ayudas", "nuss"],
  },
  { id: "health", label: ["Salud", "Health"], guides: ["sanitaria", "tse"] },
  { id: "driving", label: ["Conducción", "Driving"], guides: ["conducir"] },
  {
    id: "digital",
    label: ["Trámites digitales", "Digital services"],
    guides: ["clave", "carpeta", "certificado"],
  },
  { id: "tax", label: ["Impuestos", "Tax"], guides: ["renta"] },
];

export const frequentGuideIds = [
  "dni",
  "vida",
  "paro",
  "padron",
  "sanitaria",
  "certificado",
];
