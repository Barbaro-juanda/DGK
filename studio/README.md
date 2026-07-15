# Panel DGK (Sanity Studio)

Este es el **panel de administración** donde DGK edita los precios, productos y textos del inicio.
Vive aparte de la página web (no afecta la tienda). La web lee de aquí automáticamente.

Proyecto Sanity: `k6f4d1iq` · dataset `production`.

## 1. Publicar el panel (una sola vez)

```bash
cd studio
npm install
npx sanity login      # entra con tu cuenta de Sanity
npx sanity deploy      # publica el panel en https://dgk.sanity.studio
```

Después de esto, DGK entra a **https://dgk.sanity.studio**, inicia sesión y edita.

## 2. Cargar los productos y textos iniciales (una sola vez)

Para que el panel no aparezca vacío:

1. En sanity.io → proyecto DGK → **API → Tokens → Add API token** → nombre "seed", permiso **Editor** → copia el token.
2. Desde la carpeta `app/`:

```bash
SANITY_TOKEN=el_token_que_copiaste  node scripts/seed-sanity.mjs
```

Eso sube los 9 productos con sus precios y los textos del inicio. (El token solo se usa una vez; puedes borrarlo después.)

## 3. Autorizar que la web lea (CORS)

En sanity.io → proyecto DGK → **API → CORS origins → Add CORS origin**, agrega (sin credenciales):

- `http://localhost:5173`
- `https://dgk-xi.vercel.app`
- (y tu dominio propio cuando lo tengas)

## Listo

Desde ahí, cuando DGK cambie un precio o un texto en el panel y guarde, la web lo muestra en segundos.
Las **fotos** de los productos siguen en el código (no se editan desde el panel) — si quieres cambiar una foto, se hace en el código.
