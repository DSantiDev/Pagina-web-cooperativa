/**
 * Fotografías de la pagina
 * Las claves indican dónde aparece cada imagen para facilitar su reemplazo.
 */
const BOGOTA_IMAGES = {
  homeSlider1: "https://images.unsplash.com/photo-1761253468459-9603bee29a86?auto=format&fit=crop&q=80",
  homeSlider2: "https://images.unsplash.com/photo-1725395235210-9172a3b47149?auto=format&fit=crop&q=80",
  homeSlider3: "https://images.unsplash.com/photo-1761253469057-4a39359889f2?auto=format&fit=crop&q=80",
  homeFondoHero: "https://images.unsplash.com/photo-1759375242319-b0a3ad1398ed?auto=format&fit=crop&q=80",
  homeFondoEstadisticas: "https://images.unsplash.com/photo-1761253468562-64b68d8a2740?auto=format&fit=crop&q=80",
  homeFondoNosotros: "https://images.unsplash.com/photo-1759374667714-2d42af0f7e8c?auto=format&fit=crop&q=80",
  homeImagenNosotros: "https://images.unsplash.com/photo-1574382641881-5e0b8a072ec8?auto=format&fit=crop&q=80",
  homeFondoConfianza: "https://images.unsplash.com/photo-1759375368039-7df9ca6e7307?auto=format&fit=crop&q=80",
  homeFondoBeneficios: "https://images.unsplash.com/photo-1618842738491-7235639dfac0?auto=format&fit=crop&q=80",
  homeFondoContacto: "https://images.unsplash.com/photo-1759374514091-74aa7d9d073f?auto=format&fit=crop&q=80",
  bienestarHero: "https://images.unsplash.com/photo-1503458626055-1d267bae7bb8?auto=format&fit=crop&q=80",
  bienestarImagenBeneficios: "https://images.unsplash.com/photo-1609780447631-05b93e5a88ea?auto=format&fit=crop&q=80",
  confianzaImagenPrincipal: "https://images.unsplash.com/photo-1775691980322-2ad457854305?auto=format&fit=crop&q=80",
} as const;

/**
 * Slider de video del inicio.
 *
 * 1. Copia tu archivo .mp4 en public/videos/.
 * 2. Cambia `src` por la ruta del archivo.
 * 3. Pon `enabled: true` para mostrarlo en el slider o `false` para ocultarlo.
 */
export const HOME_SLIDER_VIDEO = {
  enabled: false,
  src: "/videos/home-slider.mp4",
  alt: "Video de Bogotá y COOVITEL",
  caption: "COOVITEL cerca de ti",
  sub: "Bienestar para nuestros asociados",
  topLeft: { label: "Asociados activos", value: "17.000+" },
  bottomRight: { label: "Años de confianza", value: "61+" },
  midRight: { top: "", bottom: "" },
  topRight: "",
} as const;

export default BOGOTA_IMAGES;
