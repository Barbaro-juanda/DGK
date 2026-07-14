import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router";
import { asset } from "./wa";

export default function PagoGracias() {
  useEffect(() => {
    document.title = "¡Gracias por tu compra! — DGK Detailing";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#121210] px-5 py-16 text-center text-[#f5f1e8]">
      <img src={asset("logo-dgk.png")} alt="DGK — Definition good keeper" className="mb-10 h-10 w-auto" />
      <CheckCircle2 className="mb-6 text-[#E5B500]" size={48} />
      <h1 className="font-display text-4xl leading-[0.95] tracking-[-0.035em] md:text-5xl">¡Gracias por tu pedido!</h1>
      <p className="mt-5 max-w-md text-base leading-7 text-white/65">
        Estamos confirmando tu pago. En cuanto quede validado te escribimos para coordinar el envío. Cualquier cosa, ya tienes tus datos registrados con nosotros.
      </p>
      <Link to="/" className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#E5B500] px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.15em] text-[#171714] transition duration-200 hover:scale-[1.03] hover:bg-[#F2C623]">
        Volver al inicio
      </Link>
    </div>
  );
}
