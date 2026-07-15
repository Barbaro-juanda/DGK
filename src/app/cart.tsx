import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { type Producto } from "./products";
import { useContent } from "./content";

export type CartItem = { slug: string; cantidad: number };

type Linea = { producto: Producto; cantidad: number; subtotal: number };

type CartCtx = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  addItem: (slug: string, cantidad?: number) => void;
  removeItem: (slug: string) => void;
  setCantidad: (slug: string, cantidad: number) => void;
  clear: () => void;
  count: number;
  lineas: Linea[];
  total: number;
};

const STORAGE_KEY = "dgk_cart_v1";
const Ctx = createContext<CartCtx | null>(null);

// "$82.000" -> 82000
export function parsePrecio(precio: string): number {
  const digits = precio.replace(/[^\d]/g, "");
  return digits ? parseInt(digits, 10) : 0;
}

export function formatPrecio(valor: number): string {
  return `$${valor.toLocaleString("es-CO")}`;
}

function readStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { productos } = useContent();
  const [items, setItems] = useState<CartItem[]>(readStorage);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* almacenamiento no disponible (modo privado, etc.) — el carrito sigue funcionando en memoria */
    }
  }, [items]);

  const addItem = (slug: string, cantidad = 1) => {
    setItems((prev) => {
      const existente = prev.find((i) => i.slug === slug);
      if (existente) {
        return prev.map((i) => (i.slug === slug ? { ...i, cantidad: Math.min(99, i.cantidad + cantidad) } : i));
      }
      return [...prev, { slug, cantidad: Math.min(99, Math.max(1, cantidad)) }];
    });
    setIsOpen(true);
  };

  const removeItem = (slug: string) => setItems((prev) => prev.filter((i) => i.slug !== slug));

  const setCantidad = (slug: string, cantidad: number) =>
    setItems((prev) => prev.map((i) => (i.slug === slug ? { ...i, cantidad: Math.max(1, Math.min(99, cantidad)) } : i)));

  const clear = () => setItems([]);

  const lineas = useMemo<Linea[]>(
    () =>
      items
        .map((i) => {
          const producto = productos.find((p) => p.slug === i.slug);
          if (!producto) return null;
          const subtotal = parsePrecio(producto.precio) * i.cantidad;
          return { producto, cantidad: i.cantidad, subtotal };
        })
        .filter((l): l is Linea => l !== null),
    [items, productos]
  );

  const total = useMemo(() => lineas.reduce((acc, l) => acc + l.subtotal, 0), [lineas]);
  const count = useMemo(() => items.reduce((acc, i) => acc + i.cantidad, 0), [items]);

  const value: CartCtx = {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    addItem,
    removeItem,
    setCantidad,
    clear,
    count,
    lineas,
    total,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
