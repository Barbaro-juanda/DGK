import { createClient } from "@sanity/client";

// Proyecto Sanity "DGK". Solo LECTURA desde el sitio (el dataset production es público para leer).
export const SANITY_PROJECT_ID = "k6f4d1iq";
export const SANITY_DATASET = "production";

export const sanity = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: true, // CDN: rápido; los cambios del panel se reflejan en segundos
});

// El sitio usa el CÓDIGO como base (siempre funciona, con sus imágenes). Sanity SOLO sobrescribe
// textos/precios por slug. Si Sanity está vacío o falla, no pasa nada: se queda con lo del código.
export type ProductoOverride = {
  slug: string;
  nombre?: string;
  detalle?: string;
  precio?: string;
  presentacion?: string;
  descripcion?: string;
};

export async function fetchProductoOverrides(): Promise<ProductoOverride[]> {
  try {
    const data = await sanity.fetch<ProductoOverride[]>(
      `*[_type == "producto"]{ "slug": slug.current, nombre, detalle, precio, presentacion, descripcion }`
    );
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

// Textos editables del home (los más importantes). Todo opcional: lo que no esté en Sanity
// se queda con el texto del código.
export type HomeCopy = {
  heroEyebrow?: string;
  heroTitulo1?: string;
  heroTitulo2?: string;
  heroLateral?: string;
  serviciosIntro?: string;
  compromisoSubtexto?: string;
  lineaIntro?: string;
  formacionTexto?: string;
};

export async function fetchHomeCopy(): Promise<HomeCopy> {
  try {
    const data = await sanity.fetch<HomeCopy | null>(
      `*[_type == "homeCopy"][0]{ heroEyebrow, heroTitulo1, heroTitulo2, heroLateral, serviciosIntro, compromisoSubtexto, lineaIntro, formacionTexto }`
    );
    return data ?? {};
  } catch {
    return {};
  }
}
