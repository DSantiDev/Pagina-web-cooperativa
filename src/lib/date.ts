/** Formatea fechas ISO para su lectura consistente en todo el sitio. */
export function formatSpanishDate(date: string) {
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}
