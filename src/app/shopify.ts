// Conexión con la tienda Shopify de DGK.
// El cliente ve el producto en NUESTRA página; al comprar, creamos el carrito en
// Shopify por detrás y lo mandamos DIRECTO a la pantalla de pago (sin pasar por
// las páginas con el tema de Shopify).
export const SHOPIFY_STORE = "https://dgk-detailing-1kkf902n.myshopify.com";

// Token público de Storefront API (está hecho para ir en el código del navegador;
// solo permite leer productos y crear carritos, no es una clave secreta).
export const SHOPIFY_STOREFRONT_TOKEN = "b18f3a8ec6832fc6240886c954a6a822";

// ID de la variante de cada producto en Shopify (el "handle" es el mismo slug de products.ts).
const VARIANTES: Record<string, string> = {
  "ceramico-6k-carbon": "gid://shopify/ProductVariant/45462705733741",
  "restaurador-krom": "gid://shopify/ProductVariant/45462711894125",
  "lubricante-cadena": "gid://shopify/ProductVariant/45462763176045",
  "shampoo-ph-neutro": "gid://shopify/ProductVariant/45462729982061",
  "silicona-7-en-1": "gid://shopify/ProductVariant/45462738567277",
  "desengrasante-multiusos": "gid://shopify/ProductVariant/45462755410029",
  "limpiador-cascos": "gid://shopify/ProductVariant/45462763208813",
  "scotch-brite": "gid://shopify/ProductVariant/45462760849517",
  "cepillo-cadena": "gid://shopify/ProductVariant/45462763241581",
};

// Crea el carrito en Shopify y devuelve la URL directa de pago (checkout).
export async function comprarEnShopify(slug: string, cantidad = 1): Promise<void> {
  const variantId = VARIANTES[slug];
  // Si por algún motivo no hay ID, abrimos la tienda como respaldo.
  if (!variantId) {
    window.open(SHOPIFY_STORE, "_blank", "noopener,noreferrer");
    return;
  }
  try {
    const res = await fetch(`${SHOPIFY_STORE}/api/2025-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: `mutation ($id: ID!, $qty: Int!) {
          cartCreate(input: { lines: [{ merchandiseId: $id, quantity: $qty }] }) {
            cart { checkoutUrl }
          }
        }`,
        variables: { id: variantId, qty: cantidad },
      }),
    });
    const json = await res.json();
    const url: string | undefined = json?.data?.cartCreate?.cart?.checkoutUrl;
    if (url) {
      window.location.href = url;
    } else {
      window.open(SHOPIFY_STORE, "_blank", "noopener,noreferrer");
    }
  } catch {
    window.open(SHOPIFY_STORE, "_blank", "noopener,noreferrer");
  }
}
