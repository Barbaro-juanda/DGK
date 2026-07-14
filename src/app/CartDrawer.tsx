import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Link } from "react-router";
import { useCart, formatPrecio } from "./cart";

export default function CartDrawer() {
  const { isOpen, close, lineas, total, setCantidad, removeItem } = useCart();
  const count = lineas.reduce((acc, l) => acc + l.cantidad, 0);

  return (
    <>
      <div
        onClick={close}
        aria-hidden="true"
        className={`fixed inset-0 z-[80] bg-black/60 transition-opacity duration-300 ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        className={`fixed inset-y-0 right-0 z-[90] flex w-full max-w-md flex-col bg-[#171714] text-[#f5f1e8] shadow-2xl transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#E5B500]">Tu carrito {count > 0 && `(${count})`}</h2>
          <button onClick={close} aria-label="Cerrar carrito" className="grid size-9 place-items-center rounded-full border border-white/20 transition hover:border-[#E5B500] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500]">
            <X size={17} />
          </button>
        </div>

        {lineas.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="text-white/25" size={40} />
            <p className="text-white/60">Tu carrito está vacío.</p>
            <Link to="/linea" onClick={close} className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#E5B500] underline underline-offset-4 transition hover:text-[#F2C623]">
              Ver la línea DGK
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <ul className="flex flex-col gap-5">
                {lineas.map(({ producto, cantidad, subtotal }) => (
                  <li key={producto.slug} className="flex gap-4">
                    <Link to={`/linea/${producto.slug}`} onClick={close} className="size-20 shrink-0 overflow-hidden rounded-sm bg-[#22211d]">
                      <img src={producto.imagen} alt={producto.nombre} className="size-full object-cover" />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <Link to={`/linea/${producto.slug}`} onClick={close} className="text-sm leading-5 text-[#f5f1e8] transition hover:text-[#E5B500]">
                          {producto.nombre}
                        </Link>
                        <button onClick={() => removeItem(producto.slug)} aria-label={`Quitar ${producto.nombre} del carrito`} className="shrink-0 text-white/35 transition hover:text-[#E5B500]">
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-white/20">
                          <button onClick={() => setCantidad(producto.slug, cantidad - 1)} aria-label="Disminuir cantidad" disabled={cantidad <= 1} className="grid size-8 place-items-center rounded-full text-[#f5f1e8] transition hover:text-[#E5B500] disabled:opacity-30">
                            <Minus size={13} />
                          </button>
                          <span className="min-w-7 text-center font-mono text-sm" aria-live="polite">{cantidad}</span>
                          <button onClick={() => setCantidad(producto.slug, cantidad + 1)} aria-label="Aumentar cantidad" className="grid size-8 place-items-center rounded-full text-[#f5f1e8] transition hover:text-[#E5B500]">
                            <Plus size={13} />
                          </button>
                        </div>
                        <span className="font-mono text-sm text-[#F2C623]">{formatPrecio(subtotal)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-white/10 px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">Total</span>
                <span className="font-display text-2xl text-[#f5f1e8]">{formatPrecio(total)}</span>
              </div>
              <Link to="/pago" onClick={close} className="flex items-center justify-center gap-3 rounded-full bg-[#E5B500] px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.15em] text-[#171714] transition duration-200 hover:scale-[1.02] hover:bg-[#F2C623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C623] focus-visible:ring-offset-4 focus-visible:ring-offset-[#171714]">
                Ir a pagar
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
