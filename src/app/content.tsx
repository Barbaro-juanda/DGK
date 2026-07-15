import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { products as productosBase, type Producto } from "./products";
import { fetchProductoOverrides, fetchHomeCopy, type HomeCopy } from "./sanity";

type ContentCtx = {
  productos: Producto[];
  getProducto: (slug: string) => Producto | undefined;
  copy: HomeCopy;
};

const Ctx = createContext<ContentCtx | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<Record<string, Partial<Producto>>>({});
  const [copy, setCopy] = useState<HomeCopy>({});

  useEffect(() => {
    let vivo = true;
    // Producto: se sobrescriben solo los campos de texto/precio; la imagen siempre viene del código.
    fetchProductoOverrides().then((ovs) => {
      if (!vivo) return;
      const mapa: Record<string, Partial<Producto>> = {};
      for (const o of ovs) {
        const campos: Partial<Producto> = {};
        if (o.nombre) campos.nombre = o.nombre;
        if (o.detalle) campos.detalle = o.detalle;
        if (o.precio) campos.precio = o.precio;
        if (o.presentacion) campos.presentacion = o.presentacion;
        if (o.descripcion) campos.descripcion = o.descripcion;
        if (Object.keys(campos).length) mapa[o.slug] = campos;
      }
      setOverrides(mapa);
    });
    fetchHomeCopy().then((c) => vivo && setCopy(c));
    return () => {
      vivo = false;
    };
  }, []);

  const productos = useMemo(
    () => productosBase.map((p) => (overrides[p.slug] ? { ...p, ...overrides[p.slug] } : p)),
    [overrides]
  );

  const getProducto = useMemo(() => {
    const idx = new Map(productos.map((p) => [p.slug, p]));
    return (slug: string) => idx.get(slug);
  }, [productos]);

  return <Ctx.Provider value={{ productos, getProducto, copy }}>{children}</Ctx.Provider>;
}

export function useContent() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useContent debe usarse dentro de <ContentProvider>");
  return ctx;
}
