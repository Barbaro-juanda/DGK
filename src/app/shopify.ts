// Tienda Shopify de DGK. Los botones "Comprar" de la web llevan al producto aquí,
// y Shopify se encarga del carrito y el pago.
// Si algún día cambia el dominio de la tienda, solo se edita esta línea.
export const SHOPIFY_STORE = "https://dgk-detailing-1kkf902n.myshopify.com";

// El "handle" del producto en Shopify es el mismo slug que usamos en products.ts,
// porque así los cargamos en el CSV de importación.
export const shopifyProductUrl = (slug: string) => `${SHOPIFY_STORE}/products/${slug}`;
