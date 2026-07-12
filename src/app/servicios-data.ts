// Datos de los 5 servicios, compartidos entre el teaser del Home y la página completa /servicios.
export type Servicio = { id: string; nombre: string; resumen: string; waText: string; alt: string; video?: string; imagen?: string; imagenHover?: string };

export const servicios: Servicio[] = [
  { id: "detailing-general", nombre: "Detailing general", resumen: "Lavado y pulido profesional, el punto de partida de todo trabajo.", video: "detailing-honda.mp4", waText: "Hola, quiero cotizar un detailing general para mi moto", alt: "Detallado de una Honda Hornet en el taller DGK" },
  { id: "ppf", nombre: "Instalación de PPF", resumen: "Film de protección de pintura, instalación de precisión.", video: "ppf-instalacion.mp4", waText: "Hola, quiero cotizar la instalación de PPF para mi moto", alt: "Instalación de film PPF sobre la moto con espátula" },
  { id: "ceramico-moto", nombre: "Cerámico para moto", resumen: "Protección y brillo que se mantiene, sellado de larga duración.", video: "ceramico-moto.mp4", waText: "Hola, quiero cotizar el cerámico para mi moto", alt: "Aplicación de cerámico sobre el tanque de una moto" },
  { id: "ceramico-casco", nombre: "Cerámico para casco", resumen: "El mismo estándar premium, ahora para tu casco.", video: "ceramico-casco.mp4", waText: "Hola, quiero cotizar el cerámico para mi casco", alt: "Cerámico aplicado a un casco frente al muro DGK" },
  { id: "restauracion", nombre: "Restauración de pintura", resumen: "Partes negras y pintura recuperadas: el antes y después habla por sí solo.", imagen: "restauracion-antes.png", imagenHover: "restauracion-despues.png", waText: "Hola, quiero cotizar una restauración de pintura para mi moto", alt: "Tanque negro restaurado a acabado espejo" },
];
