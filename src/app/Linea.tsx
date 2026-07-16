import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, Loader2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router";
import { asset } from "./wa";
import { useContent } from "./content";
import { comprarEnShopify } from "./shopify";

function Grain() {
  return <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-screen [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 180 180%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%221%22/%3E%3C/svg%3E')]" />;
}

export default function Linea() {
  const app = useRef<HTMLDivElement>(null);
  const { productos } = useContent();

  useEffect(() => {
    const prevTitle = document.title;
    const metaEl = document.querySelector('meta[name="description"]');
    const prevDesc = metaEl?.getAttribute("content") ?? "";
    document.title = "Línea DGK — Productos y precios | Cerámico, shampoo, lubricante y más";
    metaEl?.setAttribute(
      "content",
      "La línea propia de productos DGK para el cuidado de tu moto: cerámico 6K.Carbon, restaurador Krom, shampoo pH neutro, lubricante de cadena y más. Compra directo en la web."
    );
    window.scrollTo(0, 0);
    return () => {
      document.title = prevTitle;
      metaEl?.setAttribute("content", prevDesc);
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((item) => {
        gsap.fromTo(item, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.72, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 84%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        gsap.fromTo(group.children, { opacity: 0, y: 15 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.55, ease: "power3.out", scrollTrigger: { trigger: group, start: "top 88%", once: true } });
      });
    }, app);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={app} className="min-h-screen overflow-x-clip bg-background font-sans text-foreground selection:bg-[#E5B500] selection:text-[#10100f]">
      <Grain />
      <a href="#contenido" className="sr-only z-[70] rounded-full bg-[#E5B500] px-5 py-3 text-sm font-semibold text-[#111] focus:not-sr-only focus:fixed focus:left-5 focus:top-5">Saltar al contenido</a>

      <header className="absolute inset-x-0 top-0 z-30 px-5 py-5 md:px-10 md:py-8">
        <nav className="mx-auto flex max-w-[1480px] items-center justify-between" aria-label="Principal">
          <Link to="/" aria-label="DGK Detailing — inicio" className="group flex items-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500] focus-visible:ring-offset-4 focus-visible:ring-offset-[#111]">
            <img src={asset("logo-dgk.png")} alt="DGK — Definition good keeper" className="h-9 w-auto md:h-10" />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 rounded-sm font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 transition hover:text-[#F2C623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500]">
              <ArrowLeft size={15} /> Inicio
            </Link>
          </div>
        </nav>
      </header>

      <main id="contenido">
        <section className="bg-[#121210] px-5 pb-14 pt-32 md:px-10 md:pb-16 md:pt-40">
          <div className="mx-auto max-w-[1480px]">
            <p className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[#E5B500]"><span className="size-1.5 rounded-full bg-[#E5B500]" /> Línea DGK / Productos</p>
            <h1 className="max-w-4xl font-display text-[clamp(2.8rem,7vw,6rem)] font-medium leading-[0.9] tracking-[-0.04em] text-[#f6f2eb]">Lo que pones<br /><em className="font-normal text-[#E5B500]">en tus manos.</em></h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/65">Nuestra línea propia: lo mismo que aplicamos en el taller, todos los días. Cómpralos directo en nuestra tienda online.</p>
          </div>
        </section>

        <section className="bg-[#171714] px-5 pb-24 pt-6 md:px-10 md:pb-32">
          <div data-stagger className="mx-auto grid max-w-[1480px] gap-4 grid-cols-2 lg:grid-cols-3">
            {productos.map((p) => (
              <ProductoCard key={p.slug} slug={p.slug} nombre={p.nombre} detalle={p.detalle} precio={p.precio} imagen={p.imagen} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function ProductoCard({ slug, nombre, detalle, precio, imagen }: { slug: string; nombre: string; detalle: string; precio: string; imagen: string }) {
  const [cargando, setCargando] = useState(false);
  const comprar = async () => {
    setCargando(true);
    await comprarEnShopify(slug);
    // Si el redirect no ocurrió (respaldo abrió otra pestaña), soltamos el estado.
    setCargando(false);
  };
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-sm bg-[#1b1a17] transition hover:bg-[#22211d]">
      <Link to={`/linea/${slug}`} className="relative overflow-hidden bg-[#22211d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500]">
        <img src={imagen} alt={nombre} className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
        {nombre.includes("Cerámico") && <span className="absolute left-3 top-3 bg-[#E5B500] px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#171714]">Top</span>}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Link to={`/linea/${slug}`} className="rounded-sm text-lg leading-6 text-[#f5f1e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500]">{nombre}</Link>
        <p className="mt-1 text-xs text-white/45">{detalle}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="font-mono text-lg text-[#F2C623]">{precio}</p>
          <button
            onClick={comprar}
            disabled={cargando}
            aria-label={`Comprar ${nombre}`}
            className="flex items-center gap-1.5 rounded-full bg-[#E5B500] px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#171714] transition duration-200 hover:scale-[1.05] hover:bg-[#F2C623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C623] disabled:opacity-70"
          >
            {cargando ? <><Loader2 size={13} className="animate-spin" /> …</> : <>Comprar <ArrowUpRight size={13} /></>}
          </button>
        </div>
      </div>
    </div>
  );
}
