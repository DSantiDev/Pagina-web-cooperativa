/**
 * PANEL DE CONTENIDO EDITABLE
 *
 * Actualiza aquí documentos, novedades, avisos solidarios y resultados del
 * buscador sin tocar los componentes visuales.
 *
 * DOCUMENTOS DESCARGABLES
 * 1. Guarda el PDF, DOC o DOCX en `public/documentos/`.
 * 2. Agrega un bloque a `SITE_DOCUMENTS`.
 * 3. Escribe su ruta en `fileUrl`, por ejemplo:
 *    fileUrl: "/documentos/estatuto-coovitel.pdf"
 *
 * Cuando `fileUrl` existe, el botón descarga el archivo real. Si no existe,
 * el botón lleva al enlace de consulta definido en `href`.
 */

export type SiteDocument = {
  title: string;
  category: "Certificados" | "Formularios" | "Estatutos" | "Tarifas" | "Reglamentos"; // Si en necesario agregar mas copiar solo esto | "Nombre categoria"
  description: string;
  updatedAt: string;
  href: string;
  action: string;
  /** Ruta local o URL directa del archivo que se descargará. */
  fileUrl?: string;
  /** Nombre sugerido al descargar un archivo local. */
  downloadName?: string;
};

/** Aparece en: Centro de documentos (/documentos) y Normatividad (/normatividad). */
export const SITE_DOCUMENTS: SiteDocument[] = [
  // Copia este bloque para publicar otro documento:
  // { title: "Nombre del documento", category: "Estatutos", description: "Breve descripción.", updatedAt: "2026-09-11", href: "/normatividad", action: "Descargar PDF", fileUrl: "/documentos/nombre-del-archivo.pdf", downloadName: "nombre-del-archivo.pdf" },
  {
    title: "Documento_ejemplo",
    category: "Reglamentos",
    description: "Documento de ejemplo disponible para consulta y descarga.",
    updatedAt: "2026-09-11",
    href: "/normatividad",
    action: "Descargar documento",
    fileUrl: "/documentos/Documento_ejemplo.pdf",
    downloadName: "Documento ejemplo 2026.pdf",
  },
];

export type SiteNews = {
  date: string;
  category: "Asamblea" | "Beneficios" | "Atención" | "Productos";
  title: string;
  summary: string;
  href: string;
};

/** Aparece en: Novedades y fechas importantes (/actualidad), en la línea de tiempo. */
export const SITE_NEWS: SiteNews[] = [
  // Copia este bloque para publicar una novedad: { date: "2026-09-11", category: "Atención", title: "Título de la novedad", summary: "Resumen de la información.", href: "/contacto" },
  { date: "2026-09-01", category: "Asamblea", title: "Información de Asamblea", summary: "Consulta la información disponible sobre la Asamblea y sus comunicaciones para asociados.", href: "/" },
  { date: "2026-09-01", category: "Beneficios", title: "Beneficios y convenios vigentes", summary: "Revisa las condiciones, tarifas y disponibilidad antes de solicitar un beneficio.", href: "/bienestar" },
  { date: "2026-09-01", category: "Productos", title: "Consulta tasas y simuladores", summary: "Las tasas y condiciones de los productos se actualizan directamente en sus simuladores.", href: "/productos" },
  { date: "2026-09-01", category: "Atención", title: "Canales de atención", summary: "Encuentra oficinas, líneas telefónicas, correo y otros canales para resolver tus solicitudes.", href: "/contacto" },
];

/**
 * Obituarios. Deja la lista vacía si no hay publicaciones.
 * Para agregar uno, copia el ejemplo y cambia fecha, nombre, empresa y mensaje.
 */
export type SiteObituary = { date: string; title: string; company: string; message: string };
/** Aparece en: Confianza → Transparencia → Obituarios y también en /actualidad. */
export const SITE_OBITUARIES: SiteObituary[] = [
  // Copia este bloque para publicar un aviso: { date: "2026-09-11", title: "Nombre del asociado", company: "Empresa", message: "Mensaje autorizado por la Cooperativa." },
  { date: "2024-08-15", title: "Carlos Alberto Pérez Muñoz", company: "ETB S.A.", message: "COOVITEL expresa sus condolencias a la familia y compañeros del asociado." },
  { date: "2024-07-03", title: "María del Pilar Rodríguez Gómez", company: "Claro Colombia", message: "Compartimos el dolor de sus seres queridos. Que descanse en paz." },
  { date: "2024-06-20", title: "José Hernando Torres Ávila", company: "Telmex Colombia", message: "COOVITEL acompaña a la familia en este momento de dolor." },
];

/**
 * Aparece en: Confianza (/confianza) → Transparencia → Informes de gestión.
 * Cada fila representa un archivo real. Para publicar otro, agrega una fila
 * con su propio nombre, fecha, tamaño y ruta en `fileUrl`.
 */
export type ManagementReport = { year: string; title: string; size: string; type: string; fileUrl: string; downloadName: string };

export const MANAGEMENT_REPORTS: ManagementReport[] = [
  // Copia este bloque para publicar otro informe: { year: "2026", title: "Nombre del informe", size: "1.2 MB", type: "PDF", fileUrl: "/documentos/nombre-del-informe.pdf", downloadName: "nombre-del-informe.pdf" },
  {
    year: "2026",
    title: "Documento ejemplo 2026",
    size: "32.7 MB",
    type: "PDF",
    fileUrl: "/documentos/Documento_ejemplo.pdf",
    downloadName: "Documento ejemplo 2026",
  },
];

/** Aparece en: Contacto (/contacto) → Oficinas y puntos de atención. */
export const CONTACT_OFFICES = [
  // Copia este bloque para agregar una sede: { city: "Ciudad", name: "Nombre de la sede", address: "Dirección", phone: "(601) 000 0000", hours: "Lun–Vie 8:00 a. m. – 4:00 p. m.", email: "correo@coovitel.coop" },
  { city: "Bogotá", name: "Oficina Principal", address: "Calle 67 # 9 - 34, Chapinero", phone: "(601) 566 6601", hours: "Lun–Vie 8:30 a. m. – 4:30 p. m. · Jornada continua", email: "servicioasociados@coovitel.coop" },
  { city: "Tunja", name: "Sede Tunja", address: "Carrera 10 # 17-57, Centro Histórico", phone: "01 8000 967474", hours: "Lun–Vie 8:30 a. m. – 4:30 p. m. · Jornada continua", email: "servicioasociados@coovitel.coop" },
  { city: "Cali", name: "Sede Cali", address: "Avenida 5A Norte # 25N - 44, barrio San Vicente", phone: "01 8000 967474", hours: "Lun–Vie 8:30 a. m. – 12:00 m. y 1:00 p. m. – 4:30 p. m.", email: "servicioasociados@coovitel.coop" },
  { city: "Barranquilla", name: "Sede Barranquilla", address: "Carrera 52 # 72-152, local 2A, C.C. El Prado", phone: "01 8000 967474", hours: "Lun–Vie 8:30 a. m. – 12:00 m. y 1:00 p. m. – 4:30 p. m.", email: "servicioasociados@coovitel.coop" },
  { city: "Cúcuta", name: "Sede Cúcuta", address: "Caobos Mall, Avenida Segunda Este # 13A-09, local 2", phone: "01 8000 967474", hours: "Lun–Vie 8:30 a. m. – 12:00 m. y 1:00 p. m. – 4:30 p. m. · Sáb 9:00 a. m. – 11:00 a. m.", email: "servicioasociados@coovitel.coop" },
  { city: "Bucaramanga", name: "Sede Bucaramanga", address: "Carrera 29 # 42-12, local 01, Edificio Parque 42, barrio Sotomayor", phone: "01 8000 967474", hours: "Lun–Vie 8:30 a. m. – 12:00 m. y 1:00 p. m. – 4:30 p. m.", email: "servicioasociados@coovitel.coop" },
  { city: "Medellín", name: "Sede Medellín", address: "Carrera 49 # 49-73, oficina 1310", phone: "01 8000 967474", hours: "Lun–Vie 8:30 a. m. – 12:00 m. y 1:00 p. m. – 4:30 p. m.", email: "servicioasociados@coovitel.coop" },
  { city: "Ibagué", name: "Sede Tolima", address: "Carrera 5 # 37 bis - 19, Edificio Fontainebleu, local 105", phone: "01 8000 967474", hours: "Lun–Vie 8:30 a. m. – 12:00 m. y 1:00 p. m. – 4:30 p. m.", email: "servicioasociados@coovitel.coop" },
  { city: "Manizales", name: "Sede Manizales", address: "Carrera 24 # 22 - 02, Edificio Plaza Centro, oficina 907", phone: "01 8000 967474", hours: "Lun–Vie 8:30 a. m. – 12:00 m. y 1:00 p. m. – 4:30 p. m.", email: "servicioasociados@coovitel.coop" },
];

/** Aparece en: Contacto (/contacto) → Preguntas frecuentes. */
export const CONTACT_FAQS = [
  // Copia este bloque para agregar una pregunta: { q: "¿Pregunta frecuente?", a: "Respuesta clara y completa para el asociado." },
  { q: "¿Quién puede asociarse a COOVITEL?", a: "Pueden asociarse personas naturales mayores de edad que trabajen en empresas aliadas a COOVITEL o que cumplan los requisitos establecidos en nuestros estatutos. También pueden vincularse personas jurídicas según las condiciones especiales definidas por el Consejo de Administración." },
  { q: "¿Cómo puedo solicitar un crédito?", a: "Puedes solicitar un crédito a través de nuestra Oficina Virtual, visitando cualquiera de nuestras sedes, por WhatsApp o llamando a nuestra línea de atención. Necesitas ser asociado activo con al menos 3 meses de antigüedad y tener tus aportes al día." },
  { q: "¿Cuánto tiempo tarda la aprobación de un crédito?", a: "El proceso de aprobación toma entre 24 y 48 horas hábiles una vez se radique la documentación completa. Para créditos digitales el proceso puede ser en menos de 24 horas, 100% en línea." },
  { q: "¿Qué tasas de interés maneja COOVITEL?", a: "Nuestras tasas son preferenciales para asociados y están por debajo de la tasa promedio del mercado. Las tasas varían según el tipo de crédito, monto y plazo. Consulta las tasas vigentes en nuestra Oficina Virtual o comunícate con atención al cliente." },
  { q: "¿Cómo puedo consultar el saldo de mis ahorros?", a: "Puedes consultar tu saldo en cualquier momento a través de coovitel.coop y la Oficina Virtual, llamando a la línea de atención o visitando cualquiera de nuestras sedes." },
  { q: "¿Qué documentos necesito para asociarme?", a: "Para asociarte necesitas: cédula de ciudadanía vigente, certificación laboral o comprobante de ingresos, diligenciar el formulario de vinculación y firmar los estatutos. El proceso puede realizarse de forma presencial o en línea a través de nuestra Oficina Virtual." },
  { q: "¿COOVITEL está vigilada por la Superintendencia de la Economía Solidaria?", a: "Sí. COOVITEL está vigilada y controlada por la Superintendencia de la Economía Solidaria (Supersolidaria), lo que garantiza la transparencia y seguridad de los recursos de todos nuestros asociados. También contamos con certificación ISO 9001:2015 y calificación A+ Value & Risk." },
  { q: "¿Puedo retirar mis aportes si me desvinculo?", a: "Al momento de la desvinculación, tienes derecho al reembolso de tus aportes sociales según los procedimientos establecidos en los estatutos y la normativa cooperativa vigente. El proceso toma entre 30 y 60 días hábiles después de aprobada la desvinculación." },
];

export type SearchItem = { title: string; description: string; href: string; section: string };

/** Aparece en: buscador global (ícono de lupa) disponible en todas las páginas. */
export const SITE_SEARCH_ITEMS: SearchItem[] = [
  // Copia este bloque para agregar un resultado: { title: "Nombre de la sección", description: "Qué encontrará el usuario.", href: "/ruta", section: "Categoría" },
  { title: "Productos y simuladores", description: "Créditos, ahorros, CDAT y simuladores financieros.", href: "/productos", section: "Productos" },
  { title: "Asistencias RedVital", description: "Asistencias médicas, vehiculares, para el hogar, mascotas y bienestar.", href: "/bienestar", section: "Bienestar" },
  { title: "Beneficios", description: "Cine, fidelización, eventos, convenios, cultura y beneficios financieros.", href: "/bienestar", section: "Bienestar" },
  { title: "Auxilios cooperativos", description: "Auxilios y condiciones para asociados y sus familias.", href: "/bienestar", section: "Bienestar" },
  { title: "Preguntas frecuentes", description: "Respuestas sobre afiliación, créditos, ahorros, certificados y atención.", href: "/contacto?tab=faq", section: "Atención" },
  { title: "Canales de atención", description: "WhatsApp, líneas telefónicas, oficinas y correo electrónico.", href: "/contacto", section: "Atención" },
  { title: "Centro de documentos", description: "Certificados, formularios, estatutos, tarifas y reglamentos.", href: "/documentos", section: "Información" },
  { title: "Novedades y fechas importantes", description: "Asamblea, beneficios, productos y canales de atención.", href: "/actualidad", section: "Información" },
  { title: "Tutoriales", description: "Videos paso a paso para aprender a usar los servicios y secciones de la página.", href: "/tutoriales", section: "Ayuda" },
  { title: "Quiénes somos", description: "Historia, propósito y equipo de COOVITEL.", href: "/quienes-somos", section: "Institucional" },
  { title: "Confianza y seguridad", description: "Información institucional, seguridad y transparencia.", href: "/confianza", section: "Institucional" },
  { title: "Asóciate", description: "Inicia tu proceso de afiliación a COOVITEL.", href: "/asociate", section: "Afiliación" },
];
