import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowUpRight, MessageCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router";
import { wa } from "./wa";
import { products } from "./products";

function Grain() {
  return <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-screen [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 180 180%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%221%22/%3E%3C/svg%3E')]" />;
}

export default function Linea() {
  const app = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prevTitle = document.title;
    const metaEl = document.querySelector('meta[name="description"]');
    const prevDesc = metaEl?.getAttribute("content") ?? "";
    document.title = "Línea DGK — Productos y precios | Cerámico, shampoo, lubricante y más";
    metaEl?.setAttribute(
      "content",
      "La línea propia de productos DGK para el cuidado de tu moto: cerámico 6K.Carbon, restaurador Krom, shampoo pH neutro, lubricante de cadena y más. Precios y compra por WhatsApp."
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
          <Link to="/" className="group flex items-center gap-2.5 rounded-sm text-[#f4f0e8] outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500] focus-visible:ring-offset-4 focus-visible:ring-offset-[#111]">
            <span className="grid size-8 place-items-center border border-[#E5B500] text-[11px] font-bold tracking-[-0.08em]">DGK</span>
            <span className="text-[11px] font-medium uppercase tracking-[0.22em]">Detailing</span>
          </Link>
          <Link to="/" className="flex items-center gap-2 rounded-sm font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 transition hover:text-[#F2C623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500]"><ArrowLeft size={15} /> Inicio</Link>
        </nav>
      </header>

      <main id="contenido">
        <section className="bg-[#121210] px-5 pb-14 pt-32 md:px-10 md:pb-16 md:pt-40">
          <div className="mx-auto max-w-[1480px]">
            <p className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[#E5B500]"><span className="size-1.5 rounded-full bg-[#E5B500]" /> Línea DGK / Productos</p>
            <h1 className="max-w-4xl font-display text-[clamp(2.8rem,7vw,6rem)] font-medium leading-[0.9] tracking-[-0.04em] text-[#f6f2eb]">Lo que pones<br /><em className="font-normal text-[#E5B500]">en tus manos.</em></h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/65">Nuestra línea propia: lo mismo que aplicamos en el taller, todos los días. Toca un producto para ver su detalle. La compra se coordina por WhatsApp.</p>
          </div>
        </section>

        <section className="bg-[#171714] px-5 pb-24 pt-6 md:px-10 md:pb-32">
          <div data-stagger className="mx-auto grid max-w-[1480px] gap-4 grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <Link key={p.slug} to={`/linea/${p.slug}`} className="group flex flex-col overflow-hidden rounded-sm bg-[#1b1a17] transition hover:bg-[#22211d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500]">
                <div className="relative overflow-hidden bg-[#22211d]">
                  <img src={p.imagen} alt={p.nombre} className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
                  {p.nombre.includes("Cerámico") && <span className="absolute left-3 top-3 bg-[#E5B500] px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#171714]">Top</span>}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="text-lg leading-6 text-[#f5f1e8]">{p.nombre}</h2>
                  <p className="mt-1 text-xs text-white/45">{p.detalle}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="font-mono text-lg text-[#F2C623]">{p.precio}</p>
                    <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#E5B500] opacity-0 transition group-hover:opacity-100">Ver <ArrowUpRight size={14} /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-[1480px]">
            <a href={wa("Hola, quiero pedir varios productos de la línea DGK")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full bg-[#E5B500] px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.15em] text-[#171714] transition duration-200 hover:scale-[1.03] hover:bg-[#F2C623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C623] focus-visible:ring-offset-4 focus-visible:ring-offset-[#171714]">Pedir por WhatsApp <MessageCircle size={16} /></a>
          </div>
        </section>
      </main>

      <a href={wa("Hola, quiero más información sobre la línea de productos DGK")} target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp" className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-[#E5B500] text-[#171714] shadow-[0_0_0_0_rgba(229,181,0,.4)] transition duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C623] focus-visible:ring-offset-4 focus-visible:ring-offset-[#171714] motion-safe:animate-[pulse_2.8s_ease-in-out_infinite]"><MessageCircle size={23} /></a>
    </div>
  );
}
