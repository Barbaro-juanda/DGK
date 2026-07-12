import { useEffect, useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingBag, MessageCircle } from "lucide-react";
import { Link, useParams, Navigate } from "react-router";
import { wa } from "./wa";
import { getProducto, products } from "./products";

function Grain() {
  return <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-screen [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 180 180%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%221%22/%3E%3C/svg%3E')]" />;
}

export default function Producto() {
  const { slug } = useParams();
  const producto = slug ? getProducto(slug) : undefined;
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    if (!producto) return;
    const prevTitle = document.title;
    const metaEl = document.querySelector('meta[name="description"]');
    const prevDesc = metaEl?.getAttribute("content") ?? "";
    document.title = `${producto.nombre} — Línea DGK | DGK Detailing`;
    metaEl?.setAttribute("content", producto.descripcion.slice(0, 155));
    window.scrollTo(0, 0);
    return () => {
      document.title = prevTitle;
      metaEl?.setAttribute("content", prevDesc);
    };
  }, [producto]);

  // Slug inválido → de vuelta a la línea.
  if (!producto) return <Navigate to="/tienda" replace />;

  const otros = products.filter((p) => p.slug !== producto.slug).slice(0, 4);
  const pedido = wa(`Hola, quiero pedir ${cantidad} × ${producto.nombre} (${producto.precio}) de la línea DGK`);

  return (
    <div className="min-h-screen overflow-x-clip bg-background font-sans text-foreground selection:bg-[#E5B500] selection:text-[#10100f]">
      <Grain />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#121210]/90 px-5 py-4 backdrop-blur md:px-10">
        <nav className="mx-auto flex max-w-[1480px] items-center justify-between" aria-label="Principal">
          <Link to="/" className="group flex items-center gap-2.5 rounded-sm text-[#f4f0e8] outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500] focus-visible:ring-offset-4 focus-visible:ring-offset-[#111]">
            <span className="grid size-8 place-items-center border border-[#E5B500] text-[11px] font-bold tracking-[-0.08em]">DGK</span>
            <span className="text-[11px] font-medium uppercase tracking-[0.22em]">Detailing</span>
          </Link>
          <Link to="/tienda" className="flex items-center gap-2 rounded-sm font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 transition hover:text-[#F2C623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500]"><ArrowLeft size={15} /> Tienda DGK</Link>
        </nav>
      </header>

      <main id="contenido" className="bg-background px-5 py-8 md:px-10 md:py-14">
        <div className="mx-auto max-w-[1480px]">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-white/45"><Link to="/tienda" className="transition hover:text-[#E5B500]">Tienda DGK</Link> / <span className="text-white/80">{producto.nombre}</span></p>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-14">
            {/* Foto del producto */}
            <div className="relative overflow-hidden rounded-sm bg-[#22211d]">
              <img src={producto.imagen} alt={`${producto.nombre} — línea de productos DGK`} className="aspect-square w-full object-cover" />
            </div>

            {/* Información y compra */}
            <div className="flex flex-col">
              <h1 className="font-display text-4xl leading-[0.95] tracking-[-0.03em] text-[#f5f1e8] md:text-5xl">{producto.nombre}</h1>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">Ref: {producto.ref}</p>
              <p className="mt-6 font-display text-4xl text-[#f5f1e8]">{producto.precio}</p>
              <p className="mt-2 text-sm text-white/55">Presentación: <span className="text-[#F2C623]">{producto.presentacion}</span></p>

              <div className="my-8 h-px w-full bg-white/12" />

              {/* Cantidad + pedido */}
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">Cantidad</p>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center rounded-full border border-white/20">
                  <button onClick={() => setCantidad((c) => Math.max(1, c - 1))} aria-label="Disminuir cantidad" className="grid size-11 place-items-center rounded-full text-[#f5f1e8] transition hover:text-[#E5B500] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500] disabled:opacity-30" disabled={cantidad <= 1}><Minus size={16} /></button>
                  <span className="min-w-10 text-center font-mono text-lg text-[#f5f1e8]" aria-live="polite">{cantidad}</span>
                  <button onClick={() => setCantidad((c) => Math.min(99, c + 1))} aria-label="Aumentar cantidad" className="grid size-11 place-items-center rounded-full text-[#f5f1e8] transition hover:text-[#E5B500] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500]"><Plus size={16} /></button>
                </div>
                <a href={pedido} target="_blank" rel="noopener noreferrer" className="inline-flex flex-1 items-center justify-center gap-3 rounded-full bg-[#E5B500] px-7 py-4 font-mono text-[11px] uppercase tracking-[0.15em] text-[#171714] transition duration-200 hover:scale-[1.02] hover:bg-[#F2C623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C623] focus-visible:ring-offset-4 focus-visible:ring-offset-[#171714]"><ShoppingBag size={17} /> Pedir por WhatsApp</a>
              </div>

              <p className="mt-5 flex items-center gap-2 text-sm text-white/55"><MessageCircle size={15} className="text-[#E5B500]" /> ¿Necesitas asesoría? <a href={wa(`Hola, tengo una pregunta sobre ${producto.nombre}`)} target="_blank" rel="noopener noreferrer" className="text-[#E5B500] underline underline-offset-4 transition hover:text-[#F2C623]">Escríbenos</a></p>

              {/* Descripción */}
              <div className="mt-10 border-t border-white/12 pt-7">
                <h2 className="font-display text-xl tracking-[-0.02em] text-[#f5f1e8]">Descripción</h2>
                <p className="mt-4 max-w-prose text-base leading-7 text-white/65">{producto.descripcion}</p>
              </div>
            </div>
          </div>

          {/* Otros productos */}
          <div className="mt-20">
            <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.23em] text-[#E5B500]">Más de la línea DGK</p>
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
              {otros.map((p) => (
                <Link key={p.slug} to={`/tienda/${p.slug}`} className="group rounded-sm bg-[#1b1a17] p-3 transition hover:bg-[#22211d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500]">
                  <div className="overflow-hidden rounded-sm bg-[#22211d]"><img src={p.imagen} alt={p.nombre} className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.04]" /></div>
                  <h3 className="mt-3 text-sm text-[#f5f1e8]">{p.nombre}</h3>
                  <p className="mt-1 font-mono text-sm text-[#F2C623]">{p.precio}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <a href={wa("Hola, quiero más información sobre la línea de productos DGK")} target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp" className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-[#E5B500] text-[#171714] shadow-[0_0_0_0_rgba(229,181,0,.4)] transition duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C623] focus-visible:ring-offset-4 focus-visible:ring-offset-[#171714] motion-safe:animate-[pulse_2.8s_ease-in-out_infinite]"><MessageCircle size={23} /></a>
    </div>
  );
}
