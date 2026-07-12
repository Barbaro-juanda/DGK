// WhatsApp de DGK Detailing. Helper compartido entre Home (App) y /servicios.
// Mensajes prellenados por camino con el parámetro ?text=.
export const WA = "573007395203";
export const wa = (text: string) => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;

// Rutas del asset helper (Vite sirve /src/imports en dev y las emite en build).
export const asset = (file: string) => `/src/imports/${file}`;
