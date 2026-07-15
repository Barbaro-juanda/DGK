// Pre-carga en Sanity los 9 productos y los textos del inicio, para que el panel ya venga lleno.
// Uso:  SANITY_TOKEN=tu_token  node scripts/seed-sanity.mjs
// El token se crea en sanity.io -> tu proyecto -> API -> Tokens -> "Add API token" (permiso Editor).
import { createClient } from "@sanity/client";

const token = process.env.SANITY_TOKEN;
if (!token) {
  console.error("Falta el token. Corre:  SANITY_TOKEN=xxxx node scripts/seed-sanity.mjs");
  process.exit(1);
}

const client = createClient({
  projectId: "k6f4d1iq",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const productos = [
  { slug: "ceramico-6k-carbon", nombre: "Cerámico 6K.Carbon", detalle: "Protección y sellado 12 meses", precio: "$82.000", presentacion: "30 ml", descripcion: "Recubrimiento cerámico de alto sólido con efecto hidrofóbico y alto brillo. Protege y sella la pintura hasta por 12 meses, con filtro UV y mayor resistencia química. Ideal para mantener el acabado como recién salido del taller." },
  { slug: "restaurador-krom", nombre: "Restaurador Krom", detalle: "Partes negras y pintura mate", precio: "$30.000", presentacion: "120 gr", descripcion: "Restaurador de partes negras y pintura mate. Recupera el color y protege plásticos, gomas y superficies mate, devolviéndoles un aspecto uniforme sin dejar brillo artificial." },
  { slug: "lubricante-cadena", nombre: "Lubricante de cadena", detalle: "Alta adherencia", precio: "$22.000", presentacion: "120 ml", descripcion: "Lubricante de cadena de alta adherencia. Reduce el desgaste y protege contra la corrosión, manteniendo la transmisión suave y silenciosa entre cada mantenimiento." },
  { slug: "shampoo-ph-neutro", nombre: "Shampoo pH neutro", detalle: "Concentrado, no retira sellados", precio: "$19.000", presentacion: "540 ml", descripcion: "Shampoo concentrado de pH neutro. Limpia a fondo sin retirar sellados ni ceras, dejando un acabado brillante y reluciente. Fórmula de alta tecnología, rinde por su concentración." },
  { slug: "silicona-7-en-1", nombre: "Silicona 7 en 1", detalle: "Multiuso, filtro UV", precio: "$19.000", presentacion: "250 ml", descripcion: "Silicona multiuso 7 en 1: brillo, protección UV, antiadherente, antiempañante, lavado en seco, previene la oxidación y resiste altas temperaturas. Un solo producto para múltiples superficies." },
  { slug: "desengrasante-multiusos", nombre: "Desengrasante multiusos", detalle: "Fórmula concentrada", precio: "$19.000", presentacion: "540 ml", descripcion: "Desengrasante multiusos de fórmula concentrada y rendidora. Limpia eficazmente motor, cadena, rines, chasis, plásticos y suspensiones. Se puede diluir en agua según el nivel de grasa." },
  { slug: "limpiador-cascos", nombre: "Limpiador de cascos", detalle: "Antibacterial", precio: "$12.000", presentacion: "30 ml", descripcion: "Limpiador de cascos antibacterial. Limpia visor e interior sin dañar los materiales, ideal para llevar en tus viajes. Uso externo." },
  { slug: "scotch-brite", nombre: "Scotch-Brite", detalle: "Limpieza y preparación", precio: "$11.000", presentacion: "Unidad", descripcion: "Almohadilla Scotch-Brite para limpieza y preparación de superficies. Herramienta de uso profesional en el taller para un acabado impecable." },
  { slug: "cepillo-cadena", nombre: "Cepillo limpieza cadena", detalle: "Cerdas de precisión", precio: "$10.000", presentacion: "Unidad", descripcion: "Cepillo de precisión para limpieza de cadena. Sus cerdas llegan a cada eslabón para un desengrase profundo y un mantenimiento más rápido y cómodo." },
];

const homeCopy = {
  _id: "homeCopy",
  _type: "homeCopy",
  heroEyebrow: "Envigado · Antioquia",
  heroTitulo1: "Tu moto no se lava.",
  heroTitulo2: "Se consiente.",
  heroLateral: "Detailing, cerámico, PPF y nuestra propia línea de productos. Todo para que tu moto ruede impecable.",
  serviciosIntro: "Cinco servicios, cada uno con su técnica. No hay precio de lista: cada moto es un mundo y la cotizamos como se merece.",
  compromisoSubtexto: "El detailing no termina en la pintura. Cuidamos cada pieza —se vea o no— con los mismos productos que vendemos y el mismo estándar que enseñamos. Como si la moto fuera nuestra.",
  lineaIntro: "Cerámicos, shampoos y lubricantes de grado profesional — las mismas fórmulas que usamos en cada detailing, ahora en tu garaje.",
  formacionTexto: "¿Quieres aprender el oficio en serio? Te enseñamos la técnica, el criterio y el pulso para entregar un acabado que hable por ti.",
};

const tx = client.transaction();
productos.forEach((p, i) => {
  tx.createOrReplace({
    _id: `producto-${p.slug}`,
    _type: "producto",
    nombre: p.nombre,
    slug: { _type: "slug", current: p.slug },
    precio: p.precio,
    detalle: p.detalle,
    presentacion: p.presentacion,
    descripcion: p.descripcion,
    orden: i,
  });
});
tx.createOrReplace(homeCopy);

const res = await tx.commit();
console.log(`Listo: ${productos.length} productos + textos del inicio cargados en Sanity.`);
console.log(`Documentos: ${res.results.length}`);
