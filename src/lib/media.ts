/**
 * ───────────────────── BIBLIOTECA CENTRAL DE IMÁGENES ─────────────────────
 *
 * Aquí se cambian todas las imágenes del sitio. Cada nombre indica la página
 * y sección donde se muestra. No cambies el nombre antes de los dos puntos;
 * modifica solamente la dirección que está entre comillas.
 *
 * IMAGEN EXTERNA: pega una URL directa, por ejemplo:
 *   "https://sitio.com/mi-imagen.jpg"
 *
 * IMAGEN DEL REPOSITORIO (recomendado):
 *   1. Guarda el archivo en la carpeta `public/images/`.
 *   2. Usa esta dirección: "/images/nombre-de-la-imagen.jpg"
 *   No requiere importar nada ni modificar otro archivo.
 *
 * Para los sliders se recomiendan imágenes verticales de 1080 × 1350 px.
 * Para fondos y secciones, imágenes horizontales. Al guardar, el sitio se
 * actualiza automáticamente.
 * ────────────────────────────────────────────────────────────────────────────
 */
export type TutorialVideo = {
  title: string;
  description: string;
  category: string;
  duration: string;
  videoUrl: string;
  thumbnailUrl?: string;
};

const MEDIA = {
  // ── Inicio / Slider principal ───────────────────────────────────────────
  homeSlider1: "https://img.magnific.com/fotos-premium/toma-vertical-arena-toros-santamaria-bogota-colombia_665346-39057.jpg?w=1480",
  homeSlider1Alt: "Panorámica de la Plaza de Toros Santamaría en Bogotá",
  homeSlider2: "https://img.magnific.com/vector-gratis/cartel-promocional-retro-bogota_23-2148316095.jpg?t=st=1789052238~exp=1789055838~hmac=6e483ca02d7170ec5a2eda5bc199056da099a8d38113d73d81c5b65824205f3a&w=1480",
  homeSlider2Alt: "Ilustración retro de Bogotá",
  homeSlider3: "https://images.unsplash.com/photo-1761253469057-4a39359889f2?auto=format&fit=crop&q=80",
  homeSlider3Alt: "Comunidad reunida en una actividad cooperativa",

  // Ejemplo para agregar una cuarta imagen local del slider:
  // homeSlider4: "/images/slider-4.jpg",
  // homeSlider4Alt: "Describe brevemente la imagen para lectores de pantalla",

  // ── Inicio / Fondos e imágenes de secciones ─────────────────────────────
  homeFondoHero: "https://images.unsplash.com/photo-1759375242319-b0a3ad1398ed?auto=format&fit=crop&q=80",
  homeFondoEstadisticas: "https://images.unsplash.com/photo-1761253468562-64b68d8a2740?auto=format&fit=crop&q=80",
  homeFondoNosotros: "https://images.unsplash.com/photo-1759374667714-2d42af0f7e8c?auto=format&fit=crop&q=80",
  homeImagenNosotros: "https://images.unsplash.com/photo-1574382641881-5e0b8a072ec8?auto=format&fit=crop&q=80",
  homeImagenNosotrosAlt: "Comunidad reunida en Bogotá, Colombia",
  homeFondoConfianza: "https://images.unsplash.com/photo-1759375368039-7df9ca6e7307?auto=format&fit=crop&q=80",
  homeFondoBeneficios: "https://images.unsplash.com/photo-1618842738491-7235639dfac0?auto=format&fit=crop&q=80",
  homeFondoContacto: "https://images.unsplash.com/photo-1759374514091-74aa7d9d073f?auto=format&fit=crop&q=80",

  // ── Página Bienestar ─────────────────────────────────────────────────────
  bienestarHero: "https://images.unsplash.com/photo-1503458626055-1d267bae7bb8?auto=format&fit=crop&q=80",
  bienestarImagenBeneficios: "https://images.unsplash.com/photo-1609780447631-05b93e5a88ea?auto=format&fit=crop&q=80",
  bienestarImagenBeneficiosAlt: "Personas de la comunidad en Bogotá, Colombia",

  // ── Página Confianza ─────────────────────────────────────────────────────
  confianzaImagenPrincipal: "https://images.unsplash.com/photo-1775691980322-2ad457854305?auto=format&fit=crop&q=80",
  confianzaImagenPrincipalAlt: "Plaza de Bolívar en Bogotá, Colombia",

  // ── Página Tutoriales (/tutoriales) ──────────────────────────────────────
  // Guarda el MP4 en `public/videos/`. Para agregar otro, copia el objeto de abajo dentro de esta lista.
  // `thumbnailUrl` es opcional: acepta una imagen local de `public/images/` o una URL.
  tutorialVideos: [
    {
      title: "Cómo solicitar un certificado",
      description: "Paso a paso para solicitar tu certificado desde los canales de atención.",
      category: "Trámites",
      duration: "1:25 min",
      videoUrl: "/videos/solicitar-certificado.mp4"
    },
    // { title: "Título del nuevo tutorial", description: "Explica brevemente qué aprenderá el asociado.", category: "Trámites", duration: "2 min", videoUrl: "/videos/nombre-del-video.mp4", thumbnailUrl: "/images/miniatura.jpg" },
  ] as TutorialVideo[],
} as const;

/**
 * Configuración única del slider principal.
 *
 * Para agregar una foto o video, añade un objeto dentro de `slides`: no debes
 * modificar Home.tsx ni duplicar ninguna lógica. Todos los campos funcionan
 * igual para ambos tipos de contenido.
 *
 * - `enabled`: false oculta el slide temporalmente.
 * - `mediaType`: usa "image" para imagen o "video" para un .mp4.
 * - `src`: URL de imagen o ruta de video, por ejemplo "/videos/mi-video.mp4".
 * - `href`: opcional; ruta interna o URL externa para volver el slide clicable.
 * - Las tarjetas de esquina son opcionales: topLeft, topRight, bottomLeft y bottomRight.
 * - `coovitelYears` se actualiza automáticamente desde la fecha de fundación.
 *
 * Para agregar otro slide, crea un bloque igual dentro de la lista `slides`:
 *
 * {
 *   id: "Slide-4", // Usa Slide-1, Slide-2... para imágenes; Video-1, Video-2... para videos.
 *   enabled: true, // Cambia a false para ocultarlo temporalmente.
 *   mediaType: "image", // Usa "video" si el contenido es un archivo .mp4.
 *   src: "/images/nueva-imagen.jpg", // También admite una URL externa o "/videos/mi-video.mp4".
 *   alt: "Descripción accesible del contenido",
 *   caption: "Título del slide",
 *   sub: "Texto complementario",
 *   href: "/bienestar", // Opcional: ruta interna o URL externa al hacer clic.
 *   topLeft: { label: "Etiqueta", value: "Dato" }, // Opcional.
 * }
 *
 * El orden en que agregues los bloques será el orden del slider. Se recomienda
 * mantener un máximo de cinco slides activos para una navegación ágil.
 */
export const getHomeSliderSlides = (coovitelYears: number) => {
  const slides = [
    {
      id: "Slide-1",
      enabled: true,
      mediaType: "image" as const,
      src: `${MEDIA.homeSlider1}&w=1080&h=1350`,
      alt: MEDIA.homeSlider1Alt,
      caption: "Asamblea septiembre 2026",
      sub: "Información para nuestros asociados",
      topLeft: { label: "Asociados activos", value: "17.000+" },
      bottomRight: { label: "Años de confianza", value: `${coovitelYears}+` },
      topRight: { label: "Calificación", value: "A+ Value & Risk" },
    },
    {
      id: "Slide-2",
      enabled: true,
      mediaType: "image" as const,
      src: `${MEDIA.homeSlider2}&w=1080&h=1350`,
      alt: MEDIA.homeSlider2Alt,
      caption: "Crédito de vehículo COOVITEL y OLX",
      sub: "Conoce nuestros canales de financiación",
      topLeft: { label: "Empresas aliadas", value: "200+" },
      bottomRight: { label: "Ciudades", value: "9" },
      topRight: { label: "Calificación", value: "A+ Value & Risk", detail: "ISO 9001:2015 · Bureau Veritas" },
      bottomLeft: { label: "Certificación", value: "ISO 9001:2015" },
    },
    {
      id: "Slide-3",
      enabled: true,
      mediaType: "image" as const,
      src: `${MEDIA.homeSlider3}&w=1080&h=1350`,
      alt: MEDIA.homeSlider3Alt,
      caption: "Unidos por la reconstrucción",
      sub: "Información de contingencia para nuestros asociados",
      topLeft: { label: "Años de trayectoria", value: `${coovitelYears}+` },
      bottomRight: { label: "Asociados activos", value: "17K+" },
      topRight: { label: "Calificación", value: "A+ Value & Risk", detail: "ISO 9001:2015 · Bureau Veritas" },
    },
    {
      id: "Video-1",
      enabled: true,
      mediaType: "video" as const,
      src: "/videos/video-slide.mp4",
      alt: "Video de COOVITEL",
      caption: "COOVITEL cerca de ti",
      sub: "Bienestar para nuestros asociados",
      topLeft: { label: "Asociados activos", value: "17.000+" },
      bottomRight: { label: "Años de confianza", value: `${coovitelYears}+` },
    },
  ]

  return slides.filter((slide) => slide.enabled)
}

export default MEDIA;
