// WhatsApp de DGK Detailing. Helper compartido entre Home (App) y /servicios.
// Mensajes prellenados por camino con el parámetro ?text=.
export const WA = "573007395203";
export const wa = (text: string) => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;

// Rutas del asset helper. Deben vivir en public/imports/ (no src/imports/): Vite solo
// copia al build de producción lo que está en public/ o lo que se importa como módulo JS —
// una ruta armada como string no se detecta en build y da 404 en Vercel/Netlify aunque funcione en dev.
export const asset = (file: string) => `/imports/${file}`;
