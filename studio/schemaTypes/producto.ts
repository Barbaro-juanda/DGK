import { defineType, defineField } from "sanity";

export default defineType({
  name: "producto",
  title: "Producto",
  type: "document",
  fields: [
    defineField({ name: "nombre", title: "Nombre", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Identificador (no cambiar)",
      type: "slug",
      options: { source: "nombre" },
      description: "Conecta este producto con su foto en la web. No lo cambies.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "precio", title: "Precio", type: "string", description: "Escríbelo así: $82.000" }),
    defineField({ name: "detalle", title: "Detalle corto", type: "string", description: "La línea pequeña bajo el nombre" }),
    defineField({ name: "presentacion", title: "Presentación", type: "string", description: "Ej: 30 ml, 540 ml, Unidad" }),
    defineField({ name: "descripcion", title: "Descripción", type: "text", rows: 4 }),
    defineField({ name: "orden", title: "Orden en la tienda", type: "number" }),
  ],
  orderings: [{ title: "Orden en la tienda", name: "ordenAsc", by: [{ field: "orden", direction: "asc" }] }],
  preview: { select: { title: "nombre", subtitle: "precio" } },
});
