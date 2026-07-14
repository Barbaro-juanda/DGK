import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { ArrowLeft, Lock, Minus, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { asset } from "./wa";
import { useCart, formatPrecio } from "./cart";
import { abrirCheckoutWompi, WOMPI_PUBLIC_KEY } from "./wompi";

const campoCls =
  "w-full rounded-lg border border-white/15 bg-[#1b1a17] px-4 py-3 text-[15px] text-[#f5f1e8] outline-none transition placeholder:text-white/30 focus:border-[#E5B500] focus:ring-2 focus:ring-[#E5B500]/25";
const labelCls = "mb-2 block font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-white/60";

export default function Pago() {
  const { lineas, total, count, setCantidad, removeItem, clear } = useCart();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Pagar — DGK Detailing";
    window.scrollTo(0, 0);
  }, []);

  // Si el carrito quedó vacío (o se vació), no tiene sentido quedarse en /pago.
  useEffect(() => {
    if (count === 0) navigate("/linea", { replace: true });
  }, [count, navigate]);

  const pagosActivos = Boolean(WOMPI_PUBLIC_KEY);
  const formularioCompleto = nombre.trim() && email.trim() && telefono.trim() && direccion.trim() && ciudad.trim();

  const pagar = async (e: FormEvent) => {
    e.preventDefault();
    if (!pagosActivos || !formularioCompleto) return;
    setError(null);
    setProcesando(true);
    try {
      const referencia = `DGK-${Date.now()}`;
      const resultado = await abrirCheckoutWompi({
        amountInCents: total * 100,
        reference: referencia,
        customerEmail: email,
        redirectUrl: `${window.location.origin}/pago/gracias`,
      });
      if (resultado?.transaction?.status === "APPROVED") {
        clear();
        navigate("/pago/gracias");
      } else {
        setProcesando(false);
      }
    } catch {
      setError("No se pudo abrir la pasarela de pago. Intenta de nuevo.");
      setProcesando(false);
    }
  };

  if (count === 0) return null;

  return (
    <div className="min-h-screen bg-[#121210] font-sans text-[#f5f1e8]">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#121210]/90 px-5 py-4 backdrop-blur md:px-10">
        <nav className="mx-auto flex max-w-[1200px] items-center justify-between" aria-label="Principal">
          <Link to="/" aria-label="DGK Detailing — inicio" className="flex items-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500] focus-visible:ring-offset-4 focus-visible:ring-offset-[#121210]">
            <img src={asset("logo-dgk.png")} alt="DGK — Definition good keeper" className="h-9 w-auto md:h-10" />
          </Link>
          <Link to="/linea" className="flex items-center gap-2 rounded-sm font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 transition hover:text-[#F2C623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500]">
            <ArrowLeft size={15} /> Seguir comprando
          </Link>
        </nav>
      </header>

      <main className="px-5 py-10 md:px-10 md:py-14">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[#E5B500]">Checkout</p>
          <h1 className="font-display text-4xl leading-[0.95] tracking-[-0.035em] md:text-5xl">Termina tu compra.</h1>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_.85fr] lg:gap-16">
            {/* Datos de envío + pago */}
            <form onSubmit={pagar} className="flex flex-col gap-5">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#E5B500]">Datos de contacto y envío</p>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelCls} htmlFor="nombre">Nombre completo</label>
                  <input id="nombre" type="text" required className={campoCls} value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Juan David Escobar" />
                </div>
                <div>
                  <label className={labelCls} htmlFor="telefono">Teléfono</label>
                  <input id="telefono" type="tel" required className={campoCls} value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Ej: 300 739 5203" />
                </div>
              </div>
              <div>
                <label className={labelCls} htmlFor="email">Correo electrónico</label>
                <input id="email" type="email" required className={campoCls} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tucorreo@ejemplo.com" />
              </div>
              <div className="grid gap-5 sm:grid-cols-[1.3fr_1fr]">
                <div>
                  <label className={labelCls} htmlFor="direccion">Dirección de envío</label>
                  <input id="direccion" type="text" required className={campoCls} value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Calle, número, barrio" />
                </div>
                <div>
                  <label className={labelCls} htmlFor="ciudad">Ciudad</label>
                  <input id="ciudad" type="text" required className={campoCls} value={ciudad} onChange={(e) => setCiudad(e.target.value)} placeholder="Ej: Envigado" />
                </div>
              </div>

              <div className="mt-3 border-t border-white/10 pt-6">
                {!pagosActivos && (
                  <p className="mb-4 rounded-lg border border-[#E5B500]/30 bg-[#E5B500]/10 px-4 py-3 text-sm leading-6 text-[#F2C623]">
                    Los pagos en línea se están activando. Este checkout ya está listo — cuando conectemos la pasarela, este mismo botón procesará el cobro real.
                  </p>
                )}
                {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
                <button
                  type="submit"
                  disabled={!pagosActivos || !formularioCompleto || procesando}
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-[#E5B500] px-7 py-4 font-mono text-[12px] uppercase tracking-[0.15em] text-[#171714] transition duration-200 hover:scale-[1.01] hover:bg-[#F2C623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C623] focus-visible:ring-offset-4 focus-visible:ring-offset-[#121210] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                >
                  <Lock size={16} /> {procesando ? "Abriendo pago…" : pagosActivos ? `Pagar ${formatPrecio(total)}` : "Pagos próximamente"}
                </button>
                <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-white/45">
                  <ShieldCheck size={14} /> Pago seguro procesado por Wompi. DGK nunca almacena los datos de tu tarjeta.
                </p>
              </div>
            </form>

            {/* Resumen del pedido */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-lg border border-white/10 bg-[#171714] p-6">
                <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">Resumen del pedido</p>
                <ul className="flex flex-col gap-4">
                  {lineas.map(({ producto, cantidad, subtotal }) => (
                    <li key={producto.slug} className="flex gap-3">
                      <div className="size-16 shrink-0 overflow-hidden rounded-sm bg-[#22211d]">
                        <img src={producto.imagen} alt={producto.nombre} className="size-full object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-sm leading-5 text-[#f5f1e8]">{producto.nombre}</span>
                          <button onClick={() => removeItem(producto.slug)} aria-label={`Quitar ${producto.nombre}`} className="shrink-0 text-white/35 transition hover:text-[#E5B500]">
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <div className="mt-1.5 flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-white/20">
                            <button onClick={() => setCantidad(producto.slug, cantidad - 1)} aria-label="Disminuir cantidad" disabled={cantidad <= 1} className="grid size-6 place-items-center rounded-full text-[#f5f1e8] transition hover:text-[#E5B500] disabled:opacity-30">
                              <Minus size={11} />
                            </button>
                            <span className="min-w-6 text-center font-mono text-xs" aria-live="polite">{cantidad}</span>
                            <button onClick={() => setCantidad(producto.slug, cantidad + 1)} aria-label="Aumentar cantidad" className="grid size-6 place-items-center rounded-full text-[#f5f1e8] transition hover:text-[#E5B500]">
                              <Plus size={11} />
                            </button>
                          </div>
                          <span className="font-mono text-sm text-[#F2C623]">{formatPrecio(subtotal)}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span>Subtotal</span>
                    <span>{formatPrecio(total)}</span>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-sm text-white/60">
                    <span>Envío</span>
                    <span>Se coordina al confirmar</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">Total</span>
                    <span className="font-display text-2xl text-[#f5f1e8]">{formatPrecio(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
