import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { ArrowLeft, MessageCircle, Send } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { asset, WA } from "./wa";

// Segmentos y su foto. Las PNG están recortadas con FONDO TRANSPARENTE (cutout), así que la moto
// flota sobre el panel #E5B500 sin recuadro, sin importar el amarillo original de cada foto.
const segmentos = [
  { label: "Naked", slug: "naked" },
  { label: "Deportiva", slug: "deportiva" },
  { label: "Sport touring", slug: "sport-touring" },
  { label: "Cruiser / Bagger", slug: "cruiser" },
  { label: "Doble propósito", slug: "doble-proposito" },
  { label: "Scrambler", slug: "scrambler" },
  { label: "Supermoto", slug: "supermoto" },
  { label: "Enduro", slug: "enduro" },
  { label: "Motocross", slug: "motocross" },
  { label: "Scooter / Maxi Scooter", slug: "scooter" },
];

const cilindrajes = ["Hasta 150cc", "150-300cc", "300-600cc", "600-1000cc", "1000cc+"];

// Los 5 servicios (mismos nombres que en las tarjetas del home).
const serviciosNombres = [
  "Detailing general",
  "Instalación de PPF",
  "Cerámico para moto",
  "Cerámico para casco",
  "Restauración de pintura",
];

export default function Cotizar() {
  const [params] = useSearchParams();
  const servicioOrigen = params.get("servicio") ?? "";

  const [servicio, setServicio] = useState(serviciosNombres.includes(servicioOrigen) ? servicioOrigen : serviciosNombres[0]);
  const [segmento, setSegmento] = useState(""); // slug
  const [cilindraje, setCilindraje] = useState("");
  const [nombre, setNombre] = useState("");
  const [modelo, setModelo] = useState("");
  const [imgFallo, setImgFallo] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const prevTitle = document.title;
    const metaEl = document.querySelector('meta[name="description"]');
    const prevDesc = metaEl?.getAttribute("content") ?? "";
    document.title = "Cotiza tu detailing — DGK Detailing";
    metaEl?.setAttribute("content", "Cotiza el detailing, PPF, cerámico o restauración de tu moto con DGK Detailing. Cuéntanos el modelo y el segmento y te respondemos por WhatsApp.");
    window.scrollTo(0, 0);
    return () => {
      document.title = prevTitle;
      metaEl?.setAttribute("content", prevDesc);
    };
  }, []);

  const segmentoLabel = useMemo(() => segmentos.find((s) => s.slug === segmento)?.label ?? "", [segmento]);

  const enviar = (e: FormEvent) => {
    e.preventDefault();
    const mensaje =
      `¡Hola DGK! 👋\n\n` +
      `Me gustaría cotizar un servicio para mi moto 🛵\n\n` +
      `🔧 Servicio: ${servicio}\n` +
      `🏁 Segmento: ${segmentoLabel}\n` +
      `💨 Cilindraje: ${cilindraje}\n\n` +
      `Mis datos:\n` +
      `🙋 ${nombre}\n` +
      `📍 ${modelo}\n\n` +
      `¡Quedo atento a la cotización! 🙌💛`;
    const url = `https://wa.me/${WA}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Inputs/selects sobre fondo blanco.
  const campoCls =
    "w-full rounded-lg border border-[#171714]/15 bg-white px-4 py-3 text-[15px] text-[#171714] outline-none transition placeholder:text-[#171714]/35 focus:border-[#171714] focus:ring-2 focus:ring-[#171714]/15";
  const labelCls = "mb-2 block font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[#171714]/70";

  return (
    <div className="min-h-screen bg-white font-sans text-[#171714] selection:bg-[#E5B500] selection:text-[#171714]">
      {/* Barra superior — gris oscuro */}
      <header className="sticky top-0 z-30 bg-[#22211d] px-5 py-4 text-[#f4f0e8] md:px-10">
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between" aria-label="Principal">
          <Link to="/" aria-label="DGK Detailing — inicio" className="group flex items-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500] focus-visible:ring-offset-4 focus-visible:ring-offset-[#22211d]">
            <img src={asset("logo-dgk.png")} alt="DGK — Definition good keeper" className="h-9 w-auto md:h-10" />
          </Link>
          <Link to="/" className="flex items-center gap-2 rounded-sm font-mono text-[11px] uppercase tracking-[0.18em] text-[#f4f0e8]/70 transition hover:text-[#F2C623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500]"><ArrowLeft size={15} /> Inicio</Link>
        </nav>
      </header>

      <div className="lg:grid lg:grid-cols-2 lg:items-start">
        {/* Formulario — blanco */}
        <section className="bg-white px-5 py-12 md:px-10 lg:py-16">
          <div className="mx-auto max-w-[560px] lg:mr-0">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[#171714]/60">Cotización</p>
            <h1 className="font-display text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[0.95] tracking-[-0.04em]">Cuéntanos de tu moto.</h1>
            <p className="mt-4 text-base leading-7 text-[#171714]/65">Unos datos rápidos y te enviamos la cotización por WhatsApp. Elige el segmento y verás una referencia de tu tipo de moto.</p>

            <form onSubmit={enviar} className="mt-10 flex flex-col gap-5">
              <div>
                <label className={labelCls} htmlFor="servicio">Servicio</label>
                <select id="servicio" className={campoCls} value={servicio} onChange={(e) => setServicio(e.target.value)}>
                  {serviciosNombres.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelCls} htmlFor="segmento">Segmento</label>
                  <select id="segmento" required className={campoCls} value={segmento} onChange={(e) => setSegmento(e.target.value)}>
                    <option value="" disabled>Selecciona…</option>
                    {segmentos.map((s) => <option key={s.slug} value={s.slug}>{s.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls} htmlFor="cilindraje">Cilindraje</label>
                  <select id="cilindraje" required className={campoCls} value={cilindraje} onChange={(e) => setCilindraje(e.target.value)}>
                    <option value="" disabled>Selecciona…</option>
                    {cilindrajes.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="mt-3 border-t border-[#171714]/10 pt-6">
                <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#171714]">Información del cliente</p>
                <div className="flex flex-col gap-5">
                  <div>
                    <label className={labelCls} htmlFor="nombre">Nombre de quien lleva la moto</label>
                    <input id="nombre" type="text" required className={campoCls} value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Juan David" />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="modelo">Modelo de la moto</label>
                    <input id="modelo" type="text" required className={campoCls} value={modelo} onChange={(e) => setModelo(e.target.value)} placeholder="Ej: Ducati Hypermotard 950" />
                  </div>
                </div>
              </div>

              <button type="submit" className="mt-3 inline-flex items-center justify-center gap-3 rounded-full bg-[#171714] px-7 py-4 font-mono text-[12px] uppercase tracking-[0.15em] text-[#f4efe7] transition duration-200 hover:scale-[1.02] hover:bg-[#000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171714] focus-visible:ring-offset-4">
                <MessageCircle size={17} /> Enviar cotización por WhatsApp <Send size={15} />
              </button>
              <p className="text-xs text-[#171714]/55">Se abrirá WhatsApp con tu mensaje listo para enviar. No se guarda ningún dato en el sitio.</p>
            </form>
          </div>
        </section>

        {/* Panel de motos — amarillo, se funde con el fondo de las fotos */}
        <section className="relative flex min-h-[55vh] flex-col items-center justify-center bg-[#E5B500] px-5 py-12 md:px-10 lg:sticky lg:top-[64px] lg:h-[calc(100vh-64px)] lg:self-start">
          <div className="relative aspect-[4/3] w-full max-w-[560px]">
            {/* Estado por defecto: sin segmento elegido */}
            <div className={`absolute inset-0 flex items-center justify-center p-8 text-center transition-opacity duration-500 ${segmento ? "opacity-0" : "opacity-100"}`}>
              <p className="font-display text-2xl leading-tight text-[#171714]/55">Elige el segmento<br />para ver tu tipo de moto.</p>
            </div>

            {/* Capas de foto (crossfade por opacidad; object-contain para no recortar la moto) */}
            {segmentos.map((s) => {
              const activo = segmento === s.slug;
              return (
                <div key={s.slug} className={`absolute inset-0 transition-opacity duration-500 ${activo ? "opacity-100" : "opacity-0"}`} aria-hidden={!activo}>
                  {imgFallo[s.slug] ? (
                    <div className="flex size-full flex-col items-center justify-center gap-2 p-8 text-center">
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#171714]">{s.label}</span>
                      <span className="text-sm text-[#171714]/55">Foto pendiente (<code>{s.slug}.png</code>)</span>
                    </div>
                  ) : (
                    <img
                      src={asset(`${s.slug}.png`)}
                      alt={`Moto tipo ${s.label}`}
                      className="size-full object-contain"
                      onError={() => {
                        console.error(`[DGK /cotizar] No cargó la foto del segmento "${s.label}". Falta o mal nombrada: public/imports/${s.slug}.png`);
                        setImgFallo((f) => ({ ...f, [s.slug]: true }));
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-2 flex min-h-6 items-center justify-center">
            {segmentoLabel && <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#171714]">{segmentoLabel}</span>}
          </div>
          <p className="mt-2 max-w-sm text-center text-xs leading-5 text-[#171714]/60">La imagen es una referencia del segmento, no tu moto exacta. Cuéntanos el modelo en el formulario.</p>
        </section>
      </div>
    </div>
  );
}
