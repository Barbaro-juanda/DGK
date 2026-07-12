import { asset } from "./wa";

export type Producto = {
  slug: string;
  ref: string;
  nombre: string;
  detalle: string;
  precio: string;
  imagen: string;
  presentacion: string;
  descripcion: string;
};

// Catálogo real de la línea DGK. Cada producto tiene su foto y su página propia (/linea/:slug).
export const products: Producto[] = [
  {
    slug: "ceramico-6k-carbon",
    ref: "DGK-01",
    nombre: "Cerámico 6K.Carbon",
    detalle: "Protección y sellado 12 meses",
    precio: "$82.000",
    imagen: asset("dgk-6k-taller.jpg"),
    presentacion: "30 ml",
    descripcion: "Recubrimiento cerámico de alto sólido con efecto hidrofóbico y alto brillo. Protege y sella la pintura hasta por 12 meses, con filtro UV y mayor resistencia química. Ideal para mantener el acabado como recién salido del taller.",
  },
  {
    slug: "restaurador-krom",
    ref: "DGK-02",
    nombre: "Restaurador Krom",
    detalle: "Partes negras y pintura mate",
    precio: "$30.000",
    imagen: asset("prod-restaurador-krom.webp"),
    presentacion: "120 gr",
    descripcion: "Restaurador de partes negras y pintura mate. Recupera el color y protege plásticos, gomas y superficies mate, devolviéndoles un aspecto uniforme sin dejar brillo artificial.",
  },
  {
    slug: "lubricante-cadena",
    ref: "DGK-03",
    nombre: "Lubricante de cadena",
    detalle: "Alta adherencia",
    precio: "$22.000",
    imagen: asset("prod-lubricante-cadena.webp"),
    presentacion: "120 ml",
    descripcion: "Lubricante de cadena de alta adherencia. Reduce el desgaste y protege contra la corrosión, manteniendo la transmisión suave y silenciosa entre cada mantenimiento.",
  },
  {
    slug: "shampoo-ph-neutro",
    ref: "DGK-04",
    nombre: "Shampoo pH neutro",
    detalle: "Concentrado, no retira sellados",
    precio: "$19.000",
    imagen: asset("prod-shampoo.jpg"),
    presentacion: "540 ml",
    descripcion: "Shampoo concentrado de pH neutro. Limpia a fondo sin retirar sellados ni ceras, dejando un acabado brillante y reluciente. Fórmula de alta tecnología, rinde por su concentración.",
  },
  {
    slug: "silicona-7-en-1",
    ref: "DGK-05",
    nombre: "Silicona 7 en 1",
    detalle: "Multiuso, filtro UV",
    precio: "$19.000",
    imagen: asset("prod-silicona.webp"),
    presentacion: "250 ml",
    descripcion: "Silicona multiuso 7 en 1: brillo, protección UV, antiadherente, antiempañante, lavado en seco, previene la oxidación y resiste altas temperaturas. Un solo producto para múltiples superficies.",
  },
  {
    slug: "desengrasante-multiusos",
    ref: "DGK-06",
    nombre: "Desengrasante multiusos",
    detalle: "Fórmula concentrada",
    precio: "$19.000",
    imagen: asset("prod-desengrasante.webp"),
    presentacion: "540 ml",
    descripcion: "Desengrasante multiusos de fórmula concentrada y rendidora. Limpia eficazmente motor, cadena, rines, chasis, plásticos y suspensiones. Se puede diluir en agua según el nivel de grasa.",
  },
  {
    slug: "limpiador-cascos",
    ref: "DGK-07",
    nombre: "Limpiador de cascos",
    detalle: "Antibacterial",
    precio: "$12.000",
    imagen: asset("prod-limpiador-cascos.webp"),
    presentacion: "30 ml",
    descripcion: "Limpiador de cascos antibacterial. Limpia visor e interior sin dañar los materiales, ideal para llevar en tus viajes. Uso externo.",
  },
  {
    slug: "scotch-brite",
    ref: "DGK-08",
    nombre: "Scotch-Brite",
    detalle: "Limpieza y preparación",
    precio: "$11.000",
    imagen: asset("prod-scotch-brite.webp"),
    presentacion: "Unidad",
    descripcion: "Almohadilla Scotch-Brite para limpieza y preparación de superficies. Herramienta de uso profesional en el taller para un acabado impecable.",
  },
  {
    slug: "cepillo-cadena",
    ref: "DGK-09",
    nombre: "Cepillo limpieza cadena",
    detalle: "Cerdas de precisión",
    precio: "$10.000",
    imagen: asset("prod-cepillo-cadena.jpg"),
    presentacion: "Unidad",
    descripcion: "Cepillo de precisión para limpieza de cadena. Sus cerdas llegan a cada eslabón para un desengrase profundo y un mantenimiento más rápido y cómodo.",
  },
];

export const getProducto = (slug: string) => products.find((p) => p.slug === slug);
