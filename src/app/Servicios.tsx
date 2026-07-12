import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowUpRight, MessageCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router";
import { asset, wa } from "./wa";
import { servicios } from "./servicios-data";

function Grain() {
  return <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-screen [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 180 180%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%221%22/%3E%3C/svg%3E')]" />;
}

export default function Servicios() {
  const app = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prevTitle = document.title;
    const metaEl = document.querySelector('meta[name="description"]');
    const prevDesc = metaEl?.getAttribute("content") ?? "";
    document.title = "Servicios — DGK Detailing | Detailing, PPF, cerámico y restauración en Envigado";
    metaEl?.setAttribute(
      "content",
      "Los 5 servicios de DGK Detailing para tu moto: detailing general, instalación de PPF, cerámico para moto y casco, y restauración de pintura. Cotiza por WhatsApp. Envigado, Antioquia."
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
        gsap.fromTo(item, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.72, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 88%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        gsap.fromTo(group.children, { opacity: 0, y: 18 }, { opacity: 1, y: 0, stagger: 0.075, duration: 0.58, ease: "power3.out", scrollTrigger: { trigger: group, start: "top 88%", once: true } });
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
            <p className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[#E5B500]"><span className="size-1.5 rounded-full bg-[#E5B500]" /> Servicios / DGK Detailing</p>
            <h1 className="max-w-4xl font-display text-[clamp(2.8rem,7vw,6rem)] font-medium leading-[0.9] tracking-[-0.04em] text-[#f6f2eb]">Todo lo que hacemos<br /><em className="font-normal text-[#E5B500]">por tu moto.</em></h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/65">Cinco servicios distintos, cada uno con su técnica. Sin precios de catálogo: cotizamos según tu moto, directo por WhatsApp.</p>
          </div>
        </section>

        <section className="bg-[#171714] px-5 pb-24 pt-4 md:px-10 md:pb-32">
          <div data-stagger className="mx-auto grid max-w-[1480px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {servicios.map((s) => (
              <article key={s.id} className="group relative flex min-h-[360px] flex-col justify-end overflow-hidden bg-[#1b1a17] p-6 md:min-h-[420px] md:p-8">
                {s.video ? (
                  <video className="absolute inset-0 size-full object-cover opacity-70 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-90" autoPlay muted loop playsInline preload="metadata" aria-label={s.alt}>
                    <source src={asset(s.video)} type="video/mp4" />
                  </video>
                ) : (
                  <>
                    <img src={asset(s.imagen!)} alt={s.alt} className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                    {s.imagenHover && <img src={asset(s.imagenHover)} alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover opacity-0 transition duration-500 group-hover:opacity-100" />}
                    {s.imagenHover && <span className="absolute right-5 top-5 z-10 font-mono text-[10px] uppercase tracking-[0.18em] text-white/80">Antes → Después</span>}
                  </>
                )}
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(10,10,9,.92)_0%,rgba(10,10,9,.35)_55%,rgba(10,10,9,.15)_100%)]" />
                <div className="relative">
                  <h2 className="max-w-md font-display text-3xl leading-[0.95] tracking-[-0.03em] text-[#f5f1e8] md:text-4xl">{s.nombre}</h2>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-white/65">{s.resumen}</p>
                  <a href={wa(s.waText)} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-3 rounded-full bg-[#E5B500] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#171714] transition duration-200 hover:scale-[1.03] hover:bg-[#F2C623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C623] focus-visible:ring-offset-4 focus-visible:ring-offset-[#171714]">Cotizar <ArrowUpRight size={15} /></a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <a href={wa("Hola, quiero más información sobre los servicios de DGK Detailing")} target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp" className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-[#E5B500] text-[#171714] shadow-[0_0_0_0_rgba(229,181,0,.4)] transition duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C623] focus-visible:ring-offset-4 focus-visible:ring-offset-[#171714] motion-safe:animate-[pulse_2.8s_ease-in-out_infinite]"><MessageCircle size={23} /></a>
    </div>
  );
}
