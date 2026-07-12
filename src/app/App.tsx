import { useEffect, useRef } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router";
import { asset, wa } from "./wa";
import { servicios } from "./servicios-data";
import { products } from "./products";

// Sección Compromiso: 4 pilares, cada uno con foto real (orden definido por el cliente).
type Pilar = { numero: string; titulo: string; texto: string; video?: string; imagen?: string; alt?: string; pos?: string };
const compromiso: { eyebrow: string; titulo: string; subtexto: string; pilares: Pilar[] } = {
  eyebrow: "Nuestro compromiso",
  titulo: "No solo brilla. Funciona.",
  subtexto: "El detailing no termina en la pintura. Cuidamos cada pieza, se vea o no, con los mismos productos que vendemos y el mismo estándar que enseñamos.",
  pilares: [
    { numero: "01", titulo: "Precisión, no producción en serie", texto: "Cada moto se trata sola, a su ritmo. Sin líneas de ensamblaje, sin atajos.", imagen: "compromiso-resultado.png", alt: "Tanque gris, negro y azul de una MT-09 con acabado espejo" },
    { numero: "02", titulo: "Cuidamos lo que no se ve", texto: "Cadena, motor, plásticos internos — el mismo cuidado que la pintura, aunque nadie lo note a simple vista.", imagen: "compromiso-precision.png", pos: "object-top", alt: "Mano puliendo el carenado negro de una moto con pulidora orbital" },
    { numero: "03", titulo: "Usamos lo que vendemos", texto: "La línea DGK no es solo catálogo: es lo que aplicamos en el taller, todos los días.", imagen: "dgk-linea-productos.png", alt: "Los productos de la línea DGK en flat-lay sobre fondo oscuro" },
    { numero: "04", titulo: "Enseñamos lo que sabemos", texto: "Formación certificada para quien quiere aprender el oficio, no solo contratarlo.", imagen: "compromiso-grupo.png", pos: "object-top", alt: "Grupo de alumnos con sus certificados DGK en el taller" },
  ],
};

// Teasers del Home: 2-3 elementos destacados, el detalle completo vive en su propia página.
const serviciosTeaser = servicios.filter((s) => ["detailing-general", "ceramico-moto", "restauracion"].includes(s.id));
const productosTeaser = products.filter((p) => ["ceramico-6k-carbon", "shampoo-ph-neutro", "lubricante-cadena"].includes(p.slug));

const images = {
  certificados: asset("certificados-alumnos.png"),
  restauracionAntes: asset("restauracion-antes.png"),
  restauracionDespues: asset("restauracion-despues.png"),
  // TODO(asset real): "Imagen 4" — BMW GS completa frente al muro con logo DGK. Stand-in: 6K.Carbon en el taller.
  final: asset("dgk-6k-taller.jpg"),
};

const indice = [
  ["01", "Servicios", "#servicios"],
  ["02", "Compromiso", "#compromiso"],
  ["03", "Antes / Después", "#antes-despues"],
  ["04", "Línea DGK", "/tienda"],
  ["05", "Formación", "#formacion"],
];

function Grain() {
  return <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-screen [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 180 180%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%221%22/%3E%3C/svg%3E')]" />;
}

export default function App() {
  const app = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const hero = document.querySelector("[data-hero]");
      const heroCopy = document.querySelector("[data-hero-copy]");
      if (heroCopy) {
        gsap.fromTo(heroCopy, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 1, delay: 0.45, ease: "power3.out" });
      }
      if (hero) {
        // Parallax de fondo, no fija la sección en pantalla (sin pin).
        gsap.to("[data-hero-video]", {
          scale: 1.08,
          opacity: 0.42,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "65% top", end: "bottom top", scrub: true },
        });
      }

      // Único bloque que se fija en pantalla: es una transformación paso a paso (wipe antes/después),
      // no una sección de contenido normal. Todo lo demás usa reveal simple sin pin (ver más abajo).
      const antesDespues = document.querySelector("[data-antes-despues]");
      if (antesDespues) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: antesDespues, start: "center center", end: "+=150%", scrub: 0.55, pin: true, anticipatePin: 1 },
        });
        tl.fromTo("[data-after-layer]", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", ease: "none" }, 0);
        tl.fromTo("[data-after-media]", { scale: 1.12, filter: "blur(5px)" }, { scale: 1, filter: "blur(0px)", ease: "none" }, 0);
      }

      // Reveal simple: fade + translateY, sin pin ni scrub — aparece una vez al entrar en el viewport.
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((item) => {
        gsap.fromTo(item, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.72, ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 86%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        gsap.fromTo(group.children, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: group, start: "top 86%", once: true },
        });
      });

      gsap.to("[data-final-bg]", {
        y: -26, ease: "none",
        scrollTrigger: { trigger: "[data-final]", start: "top bottom", end: "bottom top", scrub: true },
      });
    }, app);

    return () => ctx.revert();
  }, []);

  const closeMenu = () => menu.current?.close();

  return (
    <div ref={app} className="min-h-screen overflow-x-clip bg-background font-sans text-foreground selection:bg-[#E5B500] selection:text-[#10100f]">
      <Grain />
      <a href="#contenido" className="sr-only z-[70] rounded-full bg-[#E5B500] px-5 py-3 text-sm font-semibold text-[#111] focus:not-sr-only focus:fixed focus:left-5 focus:top-5">Saltar al contenido</a>

      <header className="absolute inset-x-0 top-0 z-30 px-5 py-5 md:px-10 md:py-8">
        <nav className="mx-auto flex max-w-[1480px] items-center justify-between" aria-label="Principal">
          <a href="#inicio" className="group flex items-center gap-2.5 rounded-sm text-[#f4f0e8] outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500] focus-visible:ring-offset-4 focus-visible:ring-offset-[#111]">
            <span className="grid size-8 place-items-center border border-[#E5B500] text-[11px] font-bold tracking-[-0.08em]">DGK</span>
            <span className="text-[11px] font-medium uppercase tracking-[0.22em]">Detailing</span>
          </a>
          <div className="hidden items-center gap-7 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 lg:flex">
            <a className="rounded-sm transition hover:text-[#F2C623] focus-visible:text-[#F2C623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500]" href="#servicios">Servicios</a>
            <a className="rounded-sm transition hover:text-[#F2C623] focus-visible:text-[#F2C623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500]" href="#compromiso">Compromiso</a>
            <a className="rounded-sm transition hover:text-[#F2C623] focus-visible:text-[#F2C623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500]" href="#antes-despues">Antes / Después</a>
            <Link className="rounded-sm transition hover:text-[#F2C623] focus-visible:text-[#F2C623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500]" to="/tienda">Línea DGK</Link>
            <a className="rounded-sm transition hover:text-[#F2C623] focus-visible:text-[#F2C623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500]" href="#formacion">Formación</a>
          </div>
          <button onClick={() => menu.current?.showModal()} className="grid size-10 place-items-center rounded-full border border-white/25 text-white transition hover:border-[#E5B500] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500]" aria-label="Abrir menú"><Menu size={18} /></button>
        </nav>
      </header>

      <main id="contenido">
        <section id="inicio" data-hero className="relative flex min-h-[780px] items-end overflow-hidden bg-[#121210] px-5 pb-14 pt-32 md:min-h-screen md:px-10 md:pb-16">
          <video data-hero-video className="absolute inset-0 size-full object-cover opacity-60 mix-blend-screen" autoPlay muted loop playsInline preload="metadata" aria-label="Dos motos en el taller DGK con enfoque cambiante y el logo DGK al fondo">
            <source src={asset("Video_2.mp4")} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,9,.84)_0%,rgba(10,10,9,.28)_58%,rgba(10,10,9,.64)_100%),linear-gradient(0deg,rgba(10,10,9,.72),transparent_52%)]" />
          <div data-hero-copy className="relative mx-auto grid w-full max-w-[1480px] gap-10 opacity-0 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-4xl">
              <p className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[#E5B500]"><span className="size-1.5 rounded-full bg-[#E5B500]" /> Envigado · Antioquia</p>
              <h1 className="font-display text-[clamp(2.9rem,6.5vw,6.6rem)] font-medium leading-[0.92] tracking-[-0.04em] text-[#f6f2eb]">Tu moto sale<br /><em className="font-normal text-[#E5B500]">mejor que del concesionario.</em></h1>
            </div>
            <div className="max-w-[275px] border-l border-[#E5B500]/60 pl-5 text-sm leading-6 text-white/75 lg:mb-2">DGK Detailing — servicio, cerámico, PPF y línea propia de productos.</div>
          </div>
          <a href="#servicios" className="absolute bottom-7 right-5 flex items-center gap-3 rounded-sm font-mono text-[10px] uppercase tracking-[0.18em] text-white/75 transition hover:text-[#E5B500] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500] md:bottom-10 md:right-10">Descubrir <ChevronDown size={16} /></a>
        </section>

        {/* Servicios — teaser: 3 destacados + botón "Ver todos" a /servicios (el detalle completo vive allá). */}
        <section id="servicios" className="bg-[#171714] px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1480px]">
            <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-end">
              <div>
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.23em] text-[#E5B500]">01 — Servicios</p>
                <h2 className="font-display text-5xl leading-[0.9] tracking-[-0.035em] text-[#f5f1e8] md:text-7xl">Todo lo que hacemos<br />por tu moto.</h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-white/60 md:justify-self-end">Cinco servicios distintos, cada uno con su técnica. Sin precios de catálogo: cotizamos según tu moto.</p>
            </div>
            <div data-stagger className="grid gap-4 sm:grid-cols-3">
              {serviciosTeaser.map((s) => (
                <article key={s.id} className="group relative flex min-h-[300px] flex-col justify-end overflow-hidden bg-[#1b1a17] p-6 md:min-h-[340px]">
                  {s.video ? (
                    <video className="absolute inset-0 size-full object-cover opacity-70 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-90" autoPlay muted loop playsInline preload="metadata" aria-label={s.alt}>
                      <source src={asset(s.video)} type="video/mp4" />
                    </video>
                  ) : (
                    <>
                      <img src={asset(s.imagen!)} alt={s.alt} className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                      {s.imagenHover && <img src={asset(s.imagenHover)} alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover opacity-0 transition duration-500 group-hover:opacity-100" />}
                    </>
                  )}
                  <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(10,10,9,.9)_0%,rgba(10,10,9,.3)_60%,rgba(10,10,9,.1)_100%)]" />
                  <div className="relative">
                    <h3 className="text-2xl leading-[0.95] tracking-[-0.02em] text-[#f5f1e8]">{s.nombre}</h3>
                    <p className="mt-2 text-sm leading-5 text-white/65">{s.resumen}</p>
                  </div>
                </article>
              ))}
            </div>
            <Link to="/servicios" className="mt-8 inline-flex items-center gap-3 border-b border-[#E5B500] pb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#E5B500] transition hover:text-[#F2C623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500]">Ver todos los servicios <ArrowUpRight size={16} /></Link>
          </div>
        </section>

        {/* Compromiso: grid 2x2, entrada en cascada. Se queda completo en el home. */}
        <section id="compromiso" className="bg-[#e6e0d5] px-5 py-20 text-[#171714] md:px-10 md:py-28">
          <div className="mx-auto max-w-[1480px]">
            <div className="mb-12 max-w-2xl">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.23em] text-[#7A5E00]">{compromiso.eyebrow}</p>
              <h2 className="font-display text-5xl leading-[0.9] tracking-[-0.035em] md:text-7xl">{compromiso.titulo}</h2>
              <p className="mt-7 text-base leading-7 text-[#4b4942]">{compromiso.subtexto}</p>
            </div>
            <div data-stagger className="grid gap-4 sm:grid-cols-2">
              {compromiso.pilares.map((p) => {
                const conMedia = Boolean(p.video || p.imagen);
                return (
                  <article key={p.numero} className="group relative flex min-h-[240px] flex-col justify-end overflow-hidden bg-[#dcd5c8] p-7 md:min-h-[280px] md:p-9">
                    {p.video && <video className="absolute inset-0 size-full object-cover opacity-90 transition duration-700 group-hover:scale-[1.03]" autoPlay muted loop playsInline preload="metadata" aria-label={p.alt}><source src={asset(p.video)} type="video/mp4" /></video>}
                    {p.imagen && <img src={asset(p.imagen)} alt={p.alt} className={`absolute inset-0 size-full object-cover ${p.pos ?? "object-center"} transition duration-700 group-hover:scale-[1.03]`} />}
                    {conMedia && <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(10,10,9,.9)_0%,rgba(10,10,9,.4)_55%,rgba(10,10,9,.2)_100%)]" />}
                    <div className="relative">
                      <span className={`font-mono text-[11px] ${conMedia ? "text-[#F2C623]" : "text-[#7A5E00]"}`}>{p.numero}</span>
                      <h3 className={`mt-4 max-w-xs font-display text-2xl leading-[1.05] tracking-[-0.02em] md:text-3xl ${conMedia ? "text-[#f5f1e8]" : "text-[#171714]"}`}>{p.titulo}</h3>
                      <p className={`mt-3 max-w-sm text-sm leading-6 ${conMedia ? "text-white/70" : "text-[#57544c]"}`}>{p.texto}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Antes / Después: única sección que se fija en pantalla — wipe controlado por scroll. */}
        <section id="antes-despues" data-antes-despues className="relative flex min-h-screen flex-col justify-center bg-[#121210] px-5 py-20 md:px-10 md:py-32">
          <div className="mx-auto w-full max-w-[1480px]">
            <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.23em] text-[#E5B500]">02 — La transformación</p>
                <h2 className="font-display text-5xl leading-[0.9] tracking-[-0.035em] text-[#f5f1e8] md:text-7xl">Antes / <em className="text-[#E5B500]">después</em></h2>
              </div>
              <p className="max-w-xs text-sm leading-6 text-white/60">El scroll abre la diferencia. Micro-rayas y opacidad a la izquierda; acabado espejo a la derecha.</p>
            </div>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[560px] overflow-hidden bg-[#292824]">
              <img src={images.restauracionAntes} alt="Tanque negro de moto con micro-rayas y opacidad, antes de la restauración DGK" className="absolute inset-0 size-full object-cover" />
              <div className="absolute inset-x-0 top-4 z-10 flex justify-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/85">Antes</div>
              <div data-after-layer className="absolute inset-0 overflow-hidden" style={{ clipPath: "inset(0 100% 0 0)" }}>
                <div data-after-media className="absolute inset-0 size-full origin-left">
                  <img src={images.restauracionDespues} alt="Mismo tanque negro con acabado espejo tras la restauración DGK" className="absolute inset-0 size-full object-cover" />
                </div>
                <div className="absolute inset-y-0 right-0 w-px bg-[#E5B500] shadow-[0_0_24px_5px_rgba(229,181,0,.45)]" />
                <div className="absolute inset-x-0 top-4 z-10 flex justify-center font-mono text-[10px] uppercase tracking-[0.2em] text-[#E5B500]">Después</div>
              </div>
            </div>
            <div className="mt-10 flex justify-center">
              <a href={wa("Hola, quiero cotizar una restauración de pintura para mi moto")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full bg-[#E5B500] px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.15em] text-[#171714] transition duration-200 hover:scale-[1.03] hover:bg-[#F2C623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C623] focus-visible:ring-offset-4 focus-visible:ring-offset-[#121210]">Cotizar restauración <ArrowUpRight size={16} /></a>
            </div>
          </div>
        </section>

        {/* Línea DGK — teaser: 3 productos destacados (uno por categoría) + botón "Ver todos" a /tienda. */}
        <section id="tienda" className="bg-[#171714] px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1480px]">
            <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-end">
              <div>
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.23em] text-[#E5B500]">03 — La línea DGK</p>
                <h2 className="font-display text-5xl leading-[0.9] tracking-[-0.035em] text-[#f5f1e8] md:text-7xl">Lo que pones<br />en tus manos.</h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-white/60 md:justify-self-end">Fórmulas profesionales para mantener el estándar entre cada visita al taller. Nueve productos, con precios, en la tienda.</p>
            </div>
            <div data-stagger className="grid gap-4 sm:grid-cols-3">
              {productosTeaser.map((p) => (
                <Link key={p.slug} to={`/tienda/${p.slug}`} className="group flex flex-col overflow-hidden rounded-sm bg-[#1b1a17] transition hover:bg-[#22211d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500]">
                  <div className="overflow-hidden bg-[#22211d]"><img src={p.imagen} alt={p.nombre} className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.04]" /></div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg leading-6 text-[#f5f1e8]">{p.nombre}</h3>
                    <p className="mt-1 text-xs text-white/45">{p.detalle}</p>
                    <p className="mt-3 font-mono text-lg text-[#F2C623]">{p.precio}</p>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/tienda" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#E5B500] px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.15em] text-[#171714] transition duration-200 hover:scale-[1.03] hover:bg-[#F2C623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C623] focus-visible:ring-offset-4 focus-visible:ring-offset-[#171714]">Ver los 9 productos <ArrowUpRight size={16} /></Link>
          </div>
        </section>

        <section id="formacion" className="bg-[#e6e0d5] px-5 py-20 text-[#171714] md:px-10 md:py-32"><div className="mx-auto grid max-w-[1480px] gap-12 lg:grid-cols-[1fr_.92fr] lg:items-center lg:gap-20"><div data-reveal className="relative aspect-[4/3] overflow-hidden bg-[#332f29]"><img src={images.certificados} alt="Dos alumnos con su certificado junto a una Ducati roja, frente al muro con el logo DGK Detailing" className="absolute inset-0 size-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" /><p className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[0.19em] text-white">Formación DGK / Envigado</p></div><div><p className="mb-6 font-mono text-[10px] uppercase tracking-[0.23em] text-[#7A5E00]">04 — Fórmate con nosotros</p><h2 className="font-display text-5xl leading-[0.9] tracking-[-0.035em] md:text-7xl">Método para<br /><em>hacerlo bien.</em></h2><p className="mt-8 max-w-md text-base leading-7 text-[#4b4942]">Capacitaciones prácticas de detailing para motocicletas. Técnica, criterio y la confianza de entregar un acabado que habla por ti.</p><a href={wa("Hola, quiero inscribirme a la formación de detailing DGK")} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#191915] px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.15em] text-[#f4efe7] transition duration-200 hover:scale-[1.025] hover:bg-[#7A5E00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500] focus-visible:ring-offset-4">Conocer próximas fechas <ArrowUpRight size={16} /></a></div></div></section>

        <section id="contacto" data-final className="relative overflow-hidden bg-[#121210] px-5 py-24 md:px-10 md:py-36"><div data-final-bg className="absolute -inset-y-8 inset-x-0 opacity-35">{/* TODO(asset real): "Imagen 4" — BMW GS completa frente al muro con logo DGK. */}<img src={images.final} alt="Producto cerámico DGK 6K.Carbon en el taller DGK" className="absolute inset-0 size-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#121210] via-transparent to-[#121210]" /></div><div className="absolute inset-0 bg-[#121210]/75" /><div className="relative mx-auto max-w-[1480px]"><p className="mb-5 font-mono text-[10px] uppercase tracking-[0.23em] text-[#E5B500]">El siguiente movimiento es tuyo</p><h2 className="max-w-4xl font-display text-[clamp(3.7rem,8vw,8rem)] leading-[0.86] tracking-[-0.045em] text-[#f5f1e8]">Elige tu<br /><em className="text-[#E5B500]">próximo estándar.</em></h2><div data-stagger className="mt-16 grid gap-3 md:grid-cols-3">{[["Cotizar detailing", "Tu moto, en su mejor versión", Sparkles, "Hola, quiero cotizar un detailing para mi moto"], ["Comprar DGK", "Lleva el estándar a casa", ShoppingBag, "Hola, quiero comprar productos de la línea DGK"], ["Inscribirme", "Aprende el método", ArrowUpRight, "Hola, quiero inscribirme a la formación de detailing DGK"]].map(([title, line, Icon, text]) => <a href={wa(String(text))} target="_blank" rel="noopener noreferrer" key={String(title)} className="group flex min-h-44 flex-col justify-between border border-white/20 bg-black/10 p-5 backdrop-blur-sm transition hover:border-[#E5B500] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500] focus-visible:ring-offset-4 focus-visible:ring-offset-[#121210]"><Icon className="text-[#E5B500]" size={20} /><div><h3 className="text-xl text-[#f5f1e8]">{String(title)}</h3><p className="mt-1 text-sm text-white/50">{String(line)}</p></div></a>)}</div></div></section>
      </main>

      <a href={wa("Hola, quiero más información sobre DGK Detailing")} target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp" className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-[#E5B500] text-[#171714] shadow-[0_0_0_0_rgba(203,166,95,.4)] transition duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C623] focus-visible:ring-offset-4 focus-visible:ring-offset-[#171714] motion-safe:animate-[pulse_2.8s_ease-in-out_infinite]"><MessageCircle size={23} /></a>

      <dialog ref={menu} className="m-0 h-screen w-screen max-w-none border-0 bg-[#171714] p-0 text-[#f5f1e8] backdrop:bg-black/70"><div className="flex h-full flex-col justify-between p-6 md:p-10"><div className="flex items-center justify-between"><span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#E5B500]">DGK / Índice</span><button onClick={closeMenu} className="grid size-10 place-items-center rounded-full border border-white/20 transition hover:border-[#E5B500] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500]" aria-label="Cerrar menú"><X size={19} /></button></div><div className="flex flex-col gap-4 font-display text-4xl leading-none md:text-6xl">{indice.map(([number, name, target]) => target.startsWith("/") ? <Link onClick={closeMenu} to={target} key={name} className="group flex items-baseline gap-5 rounded-sm transition hover:text-[#E5B500] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500]"><span className="font-mono text-[11px] text-[#E5B500]">{number}</span>{name}</Link> : <a onClick={closeMenu} href={target} key={name} className="group flex items-baseline gap-5 rounded-sm transition hover:text-[#E5B500] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500]"><span className="font-mono text-[11px] text-[#E5B500]">{number}</span>{name}</a>)}</div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Hecho para la máquina. Pensado para ti.</p></div></dialog>
    </div>
  );
}
