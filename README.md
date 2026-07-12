# DGK Detailing

Sitio web de DGK Detailing (Envigado, Antioquia) — React + Vite + Tailwind + GSAP.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Build de producción

```bash
npm run build
```

Genera la carpeta `dist/` lista para desplegar.

## Desplegar en la web (Vercel — recomendado)

1. Entra a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. Clic en **Add New… → Project**.
3. Selecciona el repo `Barbaro-juanda/DGK`.
4. Vercel detecta Vite automáticamente (Build Command: `vite build`, Output: `dist`). No cambies nada.
5. Clic en **Deploy**.

En ~1 minuto queda publicado en una URL tipo `dgk.vercel.app`. Cada vez que hagas `git push` a `main`, Vercel actualiza el sitio solo.

### Dominio propio

En el proyecto de Vercel → **Settings → Domains**, agrega tu dominio (ej. `dgkdetailing.com`) y sigue las instrucciones de DNS que te muestre.

## Estructura

- `src/app/App.tsx` — página de inicio
- `src/app/Linea.tsx` — catálogo de productos (`/linea`)
- `src/app/Producto.tsx` — página de cada producto (`/linea/:slug`)
- `src/app/products.ts` — datos del catálogo (nombre, precio, descripción, foto)
- `src/app/wa.ts` — número de WhatsApp y helper de mensajes prellenados
- `src/imports/` — fotos y videos reales de DGK
