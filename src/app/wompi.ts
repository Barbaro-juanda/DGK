// Integración con el Widget de Wompi (checkout embebido, no saca al usuario del sitio).
// https://docs.wompi.co/docs/colombia/widget-checkout-web/

// TODO(pagos): reemplazar con la llave pública real de Wompi cuando el comercio esté creado
// (empieza con "pub_test_" en sandbox o "pub_prod_" en producción). Mientras esté vacía,
// el botón de pago queda deshabilitado y la página lo indica con claridad — nunca se simula un cobro.
export const WOMPI_PUBLIC_KEY = "";

const WIDGET_SRC = "https://checkout.wompi.co/widget.js";
const SCRIPT_ID = "wompi-widget-script";

let scriptPromise: Promise<void> | null = null;

function cargarScriptWompi(): Promise<void> {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    if (document.getElementById(SCRIPT_ID)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = WIDGET_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("No se pudo cargar el widget de Wompi"));
    document.body.appendChild(script);
  });
  return scriptPromise;
}

export type ResultadoWompi = {
  transaction?: { id: string; status: "APPROVED" | "DECLINED" | "VOIDED" | "ERROR" | string };
};

type AbrirCheckoutOpts = {
  amountInCents: number;
  reference: string;
  customerEmail: string;
  redirectUrl: string;
};

// Requiere WOMPI_PUBLIC_KEY configurada — llamar solo tras verificar `pagosActivos`.
export async function abrirCheckoutWompi(opts: AbrirCheckoutOpts): Promise<ResultadoWompi> {
  if (!WOMPI_PUBLIC_KEY) throw new Error("Falta configurar WOMPI_PUBLIC_KEY");
  await cargarScriptWompi();

  return new Promise((resolve) => {
    // WidgetCheckout lo inyecta el script externo de Wompi en window; no tiene tipos oficiales.
    const WidgetCheckout = (window as unknown as { WidgetCheckout: new (config: object) => { open: (cb: (result: ResultadoWompi) => void) => void } }).WidgetCheckout;
    const checkout = new WidgetCheckout({
      currency: "COP",
      amountInCents: opts.amountInCents,
      reference: opts.reference,
      publicKey: WOMPI_PUBLIC_KEY,
      redirectUrl: opts.redirectUrl,
      customerData: { email: opts.customerEmail },
    });
    checkout.open((result) => resolve(result));
  });
}
