import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  CirclePlay,
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
import CartButton from "./CartButton.tsx";
import { useContent } from "./content";

// Servicios como tarjetas: 4 con video en loop + Restauración con foto antes/después (swap al hover).
type Servicio = { id: string; nombre: string; resumen: string; waText: string; alt: string; video?: string; imagen?: string; imagenHover?: string };
const servicios: Servicio[] = [
  { id: "detailing-general", nombre: "Detailing general", resumen: "El lavado y pulido que tu moto está pidiendo. El punto de partida de todo.", video: "detailing-honda.mp4", waText: "Hola, quiero cotizar un detailing general para mi moto", alt: "Detallado de una Honda Hornet en el taller DGK" },
  { id: "ppf", nombre: "Instalación de PPF", resumen: "Un escudo invisible para tu pintura. Se instala con pulso de cirujano.", video: "ppf-instalacion.mp4", waText: "Hola, quiero cotizar la instalación de PPF para mi moto", alt: "Instalación de film PPF sobre la moto con espátula" },
  { id: "ceramico-moto", nombre: "Cerámico para moto", resumen: "Brillo que dura y mugre que resbala. Protección para el día a día.", video: "ceramico-moto.mp4", waText: "Hola, quiero cotizar el cerámico para mi moto", alt: "Aplicación de cerámico sobre el tanque de una moto" },
  { id: "ceramico-casco", nombre: "Cerámico para casco", resumen: "El mismo cariño de tu moto, ahora para tu casco.", video: "ceramico-casco.mp4", waText: "Hola, quiero cotizar el cerámico para mi casco", alt: "Cerámico aplicado a un casco frente al muro DGK" },
  { id: "restauracion", nombre: "Restauración de pintura", resumen: "Partes negras y pintura como nuevas. El antes y después habla solo.", imagen: "restauracion-antes.png", imagenHover: "restauracion-despues.png", waText: "Hola, quiero cotizar una restauración de pintura para mi moto", alt: "Tanque negro restaurado a acabado espejo" },
];

// Sección Compromiso: 4 pilares, cada uno con foto real (orden definido por el cliente).
type Pilar = { numero: string; titulo: string; texto: string; video?: string; imagen?: string; alt?: string; pos?: string };
const compromiso: { eyebrow: string; titulo: string; subtexto: string; pilares: Pilar[] } = {
  eyebrow: "Nuestro compromiso",
  titulo: "No solo brilla. Funciona.",
  subtexto: "El detailing no termina en la pintura. Cuidamos cada pieza —se vea o no— con los mismos productos que vendemos y el mismo estándar que enseñamos. Como si la moto fuera nuestra.",
  pilares: [
    { numero: "01", titulo: "Precisión, no producción en serie", texto: "Aquí tu moto no hace fila. Se trata sola, a su ritmo, sin atajos.", imagen: "compromiso-resultado.png", alt: "Tanque gris, negro y azul de una MT-09 con acabado espejo" },
    { numero: "02", titulo: "Cuidamos lo que no se ve", texto: "Cadena, motor, plásticos internos — el mismo cuidado que la pintura, aunque nadie lo note a simple vista.", imagen: "compromiso-precision.png", pos: "object-top", alt: "Mano puliendo el carenado negro de una moto con pulidora orbital" },
    { numero: "03", titulo: "Usamos lo que vendemos", texto: "La línea DGK no es solo catálogo: es lo que aplicamos en el taller, todos los días.", imagen: "dgk-linea-productos.png", alt: "Los productos de la línea DGK en flat-lay sobre fondo oscuro" },
    { numero: "04", titulo: "Enseñamos lo que sabemos", texto: "Formación certificada para quien quiere aprender el oficio, no solo contratarlo.", imagen: "compromiso-grupo.png", pos: "object-top", alt: "Grupo de alumnos con sus certificados DGK en el taller" },
  ],
};

const images = {
  // Flat-lay real de la línea DGK (los 9 productos).
  productos: asset("dgk-linea-productos.png"),
  // Certificados reales: dos alumnos con certificado junto a la Ducati, muro "DGK Detailing" visible.
  certificados: asset("certificados-alumnos.png"),
  // Cierre: frame real del taller DGK — motos frente al muro "DGK Detailing".
  final: asset("cierre-dgk.jpg"),
};

function Grain() {
  return <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-screen [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 180 180%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%221%22/%3E%3C/svg%3E')]" />;
}

export default function App() {
  const app = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDialogElement>(null);
  const [heroIn, setHeroIn] = useState(false);
  const [flip, setFlip] = useState(false); // alterna antes/después en la tarjeta de Restauración
  const { copy } = useContent(); // textos editables desde Sanity (con fallback al código)

  // Restauración: alterna antes/después solo (1s cada uno), como un video, sin necesidad de hover.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setFlip((f) => !f), 1000);
    return () => clearInterval(id);
  }, []);

  // Titular del hero: reveal de montaje con CSS (una sola vez al cargar, sin ScrollTrigger).
  // No depende de requestAnimationFrame, así que el estado final opacity:1 se aplica siempre
  // y el titular nunca queda invisible, aunque la pestaña cargue en segundo plano.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setHeroIn(true); return; }
    const t = setTimeout(() => setHeroIn(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const hero = document.querySelector("[data-hero]");
      if (hero) {
        gsap.to("[data-hero-video]", {
          scale: 1.08,
          opacity: 0.42,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "65% top", end: "bottom top", scrub: true },
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((item) => {
        gsap.fromTo(item, { opacity: 0, y: 18 }, {
          opacity: 1, y: 0, duration: 0.72, ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 84%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        gsap.fromTo(group.children, { opacity: 0, y: 15 }, {
          opacity: 1, y: 0, stagger: 0.075, duration: 0.58, ease: "power3.out",
          scrollTrigger: { trigger: group, start: "top 82%", once: true },
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
          <a href="#inicio" aria-label="DGK Detailing — inicio" className="group flex items-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500] focus-visible:ring-offset-4 focus-visible:ring-offset-[#111]">
            <img src={asset("logo-dgk.png")} alt="DGK — Definition good keeper" className="h-9 w-auto md:h-10" />
          </a>
          <div className="hidden items-center gap-8 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 md:flex">
            <a className="rounded-sm transition hover:text-[#F2C623] focus-visible:text-[#F2C623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500]" href="#servicios">Servicios</a>
            <a className="rounded-sm transition hover:text-[#F2C623] focus-visible:text-[#F2C623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500]" href="#compromiso">Compromiso</a>
            <Link className="rounded-sm transition hover:text-[#F2C623] focus-visible:text-[#F2C623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500]" to="/linea">Línea DGK</Link>
            <a className="rounded-sm transition hover:text-[#F2C623] focus-visible:text-[#F2C623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500]" href="#formacion">Formación</a>
          </div>
          <div className="flex items-center gap-3">
            <CartButton />
            <button onClick={() => menu.current?.showModal()} className="grid size-10 place-items-center rounded-full border border-white/25 text-white transition hover:border-[#E5B500] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500] md:hidden" aria-label="Abrir menú"><Menu size={18} /></button>
          </div>
        </nav>
      </header>

      <main id="contenido">
        <section id="inicio" data-hero className="relative flex min-h-[780px] items-end overflow-hidden bg-[#121210] px-5 pb-14 pt-32 md:min-h-screen md:px-10 md:pb-16">
          <video data-hero-video className="absolute inset-0 size-full object-cover opacity-60 mix-blend-screen" autoPlay muted loop playsInline preload="metadata" aria-label="Dos motos en el taller DGK con enfoque cambiante y el logo DGK al fondo">
            <source src={asset("Video_2.mp4")} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,9,.84)_0%,rgba(10,10,9,.28)_58%,rgba(10,10,9,.64)_100%),linear-gradient(0deg,rgba(10,10,9,.72),transparent_52%)]" />
          <div data-hero-copy className={`relative mx-auto grid w-full max-w-[1480px] gap-10 transition-[opacity,transform] duration-[900ms] ease-out [transition-delay:200ms] lg:grid-cols-[1fr_auto] lg:items-end ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="max-w-4xl">
              <p className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[#E5B500]"><span className="size-1.5 rounded-full bg-[#E5B500]" /> {copy.heroEyebrow ?? "Envigado · Antioquia"}</p>
              <h1 className="font-display text-[clamp(2.9rem,6.5vw,6.6rem)] font-medium leading-[0.92] tracking-[-0.04em] text-[#f6f2eb]">{copy.heroTitulo1 ?? "Tu moto no se lava."}<br /><em className="font-normal text-[#E5B500]">{copy.heroTitulo2 ?? "Se consiente."}</em></h1>
            </div>
            <div className="max-w-[290px] border-l border-[#E5B500]/60 pl-5 text-[15px] leading-6 text-white/80 lg:mb-2">{copy.heroLateral ?? "Detailing, cerámico, PPF y nuestra propia línea de productos. Todo para que tu moto ruede impecable."}</div>
          </div>
        </section>

        {/* Servicios (reemplaza la antigua sección "El método"). */}
        <section id="servicios" className="bg-[#171714] px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1480px]">
            <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-end">
              <div>
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.23em] text-[#E5B500]">01 — Servicios</p>
                <h2 className="font-display text-5xl leading-[0.9] tracking-[-0.035em] text-[#f5f1e8] md:text-7xl">Todo lo que hacemos<br />por tu moto.</h2>
              </div>
              <p className="max-w-sm text-[15px] leading-7 text-white/75 md:justify-self-end">{copy.serviciosIntro ?? "Cinco servicios, cada uno con su técnica. No hay precio de lista: cada moto es un mundo y la cotizamos como se merece."}</p>
            </div>
            <div data-stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {servicios.map((s) => (
                <article key={s.id} className="group relative flex min-h-[360px] flex-col justify-end overflow-hidden bg-[#1b1a17] p-6 md:min-h-[420px] md:p-8">
                  {s.video ? (
                    <video className="absolute inset-0 size-full object-cover opacity-70 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-90" autoPlay muted loop playsInline preload="metadata" aria-label={s.alt}>
                      <source src={asset(s.video)} type="video/mp4" />
                    </video>
                  ) : (
                    <>
                      <img src={asset(s.imagen!)} alt={s.alt} className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                      {s.imagenHover && <img src={asset(s.imagenHover)} alt="" aria-hidden="true" className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ${flip ? "opacity-100" : "opacity-0"}`} />}
                      {s.imagenHover && <span className="absolute right-5 top-5 z-10 font-mono text-[10px] uppercase tracking-[0.18em] text-white/90">{flip ? "Después" : "Antes"}</span>}
                    </>
                  )}
                  <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(10,10,9,.92)_0%,rgba(10,10,9,.35)_55%,rgba(10,10,9,.15)_100%)]" />
                  <div className="relative">
                    <h3 className="max-w-md font-display text-3xl leading-[0.95] tracking-[-0.03em] text-[#f5f1e8] md:text-4xl">{s.nombre}</h3>
                    <p className="mt-3 max-w-sm text-sm leading-6 text-white/65">{s.resumen}</p>
                    <Link to={`/cotizar?servicio=${encodeURIComponent(s.nombre)}`} className="mt-5 inline-flex items-center gap-3 rounded-full bg-[#E5B500] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#171714] transition duration-200 hover:scale-[1.03] hover:bg-[#F2C623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C623] focus-visible:ring-offset-4 focus-visible:ring-offset-[#171714]">Cotizar <ArrowUpRight size={15} /></Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Compromiso: grid 2x2, entrada en cascada. Tarjetas sin imagen = solo número + título + texto. */}
        <section id="compromiso" className="bg-[#e6e0d5] px-5 py-20 text-[#171714] md:px-10 md:py-28">
          <div className="mx-auto max-w-[1480px]">
            <div className="mb-10 max-w-2xl">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#7A5E00]">{compromiso.eyebrow}</p>
              <h2 className="font-display text-5xl leading-[0.92] tracking-[-0.035em] md:text-6xl">{compromiso.titulo}</h2>
              <p className="mt-5 text-[17px] leading-7 text-[#3d3b34]">{copy.compromisoSubtexto ?? compromiso.subtexto}</p>
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
                      <h3 className={`mt-3 max-w-xs font-display text-2xl leading-[1.05] tracking-[-0.02em] md:text-3xl ${conMedia ? "text-[#f5f1e8]" : "text-[#171714]"}`}>{p.titulo}</h3>
                      <p className={`mt-2.5 max-w-sm text-[15px] leading-6 ${conMedia ? "text-white/85" : "text-[#3d3b34]"}`}>{p.texto}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Línea DGK: teaser en el home; el catálogo con precios vive en /linea. */}
        <section id="linea" className="bg-[#171714] px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1480px]">
            <div className="mb-10 grid gap-6 md:grid-cols-2 md:items-center"><div><p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#E5B500]">03 — La línea DGK</p><h2 className="font-display text-5xl leading-[0.92] tracking-[-0.035em] text-[#f5f1e8] md:text-6xl">Cuídala como<br />en el taller.</h2></div><p className="max-w-md text-[17px] leading-7 text-white/75 md:justify-self-end">{copy.lineaIntro ?? "Cerámicos, shampoos y lubricantes de grado profesional — las mismas fórmulas que usamos en cada detailing, ahora en tu garaje."}</p></div>
            <div data-reveal className="relative overflow-hidden bg-[#23221e]"><img src={images.productos} alt="Los nueve productos de la línea DGK dispuestos en flat-lay sobre fondo oscuro" className="absolute inset-0 size-full object-cover" /><video className="relative aspect-[16/8] w-full object-cover opacity-60 mix-blend-screen" autoPlay muted loop playsInline preload="metadata"><source src={asset("Todos_los_productos.mp4")} type="video/mp4" /></video><div className="absolute inset-0 bg-gradient-to-t from-[#171714] via-transparent to-transparent" /><div className="absolute bottom-5 left-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#F2C623]"><CirclePlay size={15} /> Serie de producto / DGK</div></div>
            <Link to="/linea" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#E5B500] px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.15em] text-[#171714] transition duration-200 hover:scale-[1.03] hover:bg-[#F2C623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C623] focus-visible:ring-offset-4 focus-visible:ring-offset-[#171714]">Ver la línea y precios <ArrowUpRight size={16} /></Link>
          </div>
        </section>

        <section id="formacion" className="bg-[#e6e0d5] px-5 py-20 text-[#171714] md:px-10 md:py-32"><div className="mx-auto grid max-w-[1480px] gap-12 lg:grid-cols-[1fr_.92fr] lg:items-center lg:gap-20"><div data-reveal className="relative aspect-[4/3] overflow-hidden bg-[#332f29]"><img src={images.certificados} alt="Dos alumnos con su certificado junto a una Ducati roja, frente al muro con el logo DGK Detailing" className="absolute inset-0 size-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" /><p className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[0.19em] text-white">Formación DGK / Envigado</p></div><div><p className="mb-6 font-mono text-[10px] uppercase tracking-[0.23em] text-[#7A5E00]">04 — Fórmate con nosotros</p><h2 className="font-display text-5xl leading-[0.9] tracking-[-0.035em] md:text-7xl">Método para<br /><em>hacerlo bien.</em></h2><p className="mt-7 max-w-md text-[17px] leading-7 text-[#3d3b34]">{copy.formacionTexto ?? "¿Quieres aprender el oficio en serio? Te enseñamos la técnica, el criterio y el pulso para entregar un acabado que hable por ti."}</p><a href={wa("Hola, quiero inscribirme a la formación de detailing DGK")} target="_blank" rel="noopener noreferrer" className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#191915] px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.15em] text-[#f4efe7] transition duration-200 hover:scale-[1.025] hover:bg-[#7A5E00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500] focus-visible:ring-offset-4">Quiero aprender <ArrowUpRight size={16} /></a></div></div></section>

        <section id="contacto" data-final className="relative overflow-hidden bg-[#121210] px-5 py-24 md:px-10 md:py-36"><div data-final-bg className="absolute -inset-y-8 inset-x-0 opacity-35"><img src={images.final} alt="Motos frente al muro DGK Detailing en el taller" className="absolute inset-0 size-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#121210] via-transparent to-[#121210]" /></div><div className="absolute inset-0 bg-[#121210]/75" /><div className="relative mx-auto max-w-[1480px]"><p className="mb-5 font-mono text-[10px] uppercase tracking-[0.23em] text-[#E5B500]">El siguiente movimiento es tuyo</p><h2 className="max-w-4xl font-display text-[clamp(3.7rem,8vw,8rem)] leading-[0.86] tracking-[-0.045em] text-[#f5f1e8]">Tu moto ya<br /><em className="text-[#E5B500]">quiere pasar por aquí.</em></h2><div data-stagger className="mt-16 grid gap-3 md:grid-cols-3">{[["Servicios", "Todo lo que hacemos por tu moto", Sparkles, "#servicios"], ["Comprar DGK", "Llévate el taller a casa", ShoppingBag, "#linea"], ["Inscribirme", "Aprende con nosotros", ArrowUpRight, "#formacion"]].map(([title, line, Icon, href]) => <a href={String(href)} key={String(title)} className="group flex min-h-44 flex-col justify-between border border-white/20 bg-black/10 p-5 backdrop-blur-sm transition hover:border-[#E5B500] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500] focus-visible:ring-offset-4 focus-visible:ring-offset-[#121210]"><Icon className="text-[#E5B500]" size={20} /><div><h3 className="text-xl text-[#f5f1e8]">{String(title)}</h3><p className="mt-1 text-sm text-white/50">{String(line)}</p></div></a>)}</div></div></section>
      </main>

      <a href={wa("Hola, quiero más información sobre DGK Detailing")} target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp" className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-[#E5B500] text-[#171714] shadow-[0_0_0_0_rgba(203,166,95,.4)] transition duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C623] focus-visible:ring-offset-4 focus-visible:ring-offset-[#171714] motion-safe:animate-[pulse_2.8s_ease-in-out_infinite]"><MessageCircle size={23} /></a>

      <dialog ref={menu} className="m-0 h-screen w-screen max-w-none border-0 bg-[#171714] p-0 text-[#f5f1e8] backdrop:bg-black/70"><div className="flex h-full flex-col justify-between p-6 md:p-10"><div className="flex items-center justify-between"><span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#E5B500]">DGK / Índice</span><button onClick={closeMenu} className="grid size-10 place-items-center rounded-full border border-white/20 transition hover:border-[#E5B500] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500]" aria-label="Cerrar menú"><X size={19} /></button></div><div className="flex flex-col gap-4 font-display text-5xl leading-none md:text-7xl">{[["01", "Servicios", "#servicios"], ["02", "Compromiso", "#compromiso"], ["03", "Línea DGK", "/linea"], ["04", "Formación", "#formacion"]].map(([number, name, target]) => target.startsWith("/") ? <Link onClick={closeMenu} to={target} key={name} className="group flex items-baseline gap-5 rounded-sm transition hover:text-[#E5B500] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500]"><span className="font-mono text-[11px] text-[#E5B500]">{number}</span>{name}</Link> : <a onClick={closeMenu} href={target} key={name} className="group flex items-baseline gap-5 rounded-sm transition hover:text-[#E5B500] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500]"><span className="font-mono text-[11px] text-[#E5B500]">{number}</span>{name}</a>)}</div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Hecho para la máquina. Pensado para ti.</p></div></dialog>
    </div>
  );
}
