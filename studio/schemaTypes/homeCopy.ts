import { defineType, defineField } from "sanity";

export default defineType({
  name: "homeCopy",
  title: "Textos del inicio",
  type: "document",
  fields: [
    defineField({ name: "heroEyebrow", title: "Portada — ubicación (arriba del título)", type: "string" }),
    defineField({ name: "heroTitulo1", title: "Portada — título, línea 1", type: "string" }),
    defineField({ name: "heroTitulo2", title: "Portada — título, línea 2 (en amarillo)", type: "string" }),
    defineField({ name: "heroLateral", title: "Portada — texto lateral", type: "text", rows: 3 }),
    defineField({ name: "serviciosIntro", title: "Servicios — párrafo de intro", type: "text", rows: 3 }),
    defineField({ name: "compromisoSubtexto", title: "Compromiso — párrafo de intro", type: "text", rows: 3 }),
    defineField({ name: "lineaIntro", title: "Línea DGK — párrafo de intro", type: "text", rows: 3 }),
    defineField({ name: "formacionTexto", title: "Formación — párrafo", type: "text", rows: 3 }),
  ],
  preview: { prepare: () => ({ title: "Textos del inicio" }) },
});
