/**
 * ───────────────────── VALIDACIÓN DE FORMULARIOS ──────────────────────────
 *
 * Este archivo reúne las reglas que usan los formularios de todo el sitio.
 * Así se evita repetir validaciones y todos los formularios muestran los
 * mismos mensajes y restricciones.
 *
 * Para usarlo en un formulario:
 * 1. Agrega `onInvalid={showFieldError}` y `onInput={clearFieldError}` al <form>.
 * 2. Usa `sanitizeName`, `sanitizePhone` o `sanitizeDocument` en el onChange.
 * 3. Asigna el patrón correspondiente al input: `pattern={NAME_PATTERN}` o
 *    `pattern={PHONE_PATTERN}`.
 *
 * Los errores se colocan como atributos HTML y el estilo visual se controla
 * desde CSS. Por eso no aparecen los avisos nativos del navegador.
 * ──────────────────────────────────────────────────────────────────────────
 */

/** Solo letras, espacios, apóstrofes y guiones; incluye caracteres en español. */
export const NAME_PATTERN = "[A-Za-zÁÉÍÓÚáéíóúÑñÜü' -]+";

/** Número telefónico colombiano de exactamente 10 dígitos. */
export const PHONE_PATTERN = "[0-9]{10}";

/** Elimina números y símbolos no permitidos de un campo de nombre. */
export function sanitizeName(value: string) {
  return value.replace(/[^\p{L}\s'-]/gu, "").replace(/\s{2,}/g, " ");
}

/** Conserva solo números y limita el teléfono a 10 dígitos. */
export function sanitizePhone(value: string) {
  return value.replace(/\D/g, "").slice(0, 10);
}

/** Conserva solo números y limita un documento de identidad a 15 dígitos. */
export function sanitizeDocument(value: string) {
  return value.replace(/\D/g, "").slice(0, 15);
}

type ValidatableField = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function isValidatableField(target: EventTarget | null): target is ValidatableField {
  return target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement;
}

/** Devuelve un mensaje claro según la regla de HTML que no se cumplió. */
function getFieldErrorMessage(field: ValidatableField) {
  const { validity } = field;
  if (validity.customError) return field.validationMessage;
  if (validity.valueMissing) return field instanceof HTMLSelectElement ? "Selecciona una opción para continuar." : "Este campo es obligatorio.";
  if (validity.typeMismatch && field.type === "email") return "Ingresa un correo electrónico válido.";
  if (validity.patternMismatch && field.type === "tel") return "Ingresa exactamente 10 números.";
  if (validity.patternMismatch && field.inputMode === "numeric") return "Ingresa solo números.";
  if (validity.patternMismatch) return "Usa únicamente letras y espacios.";
  if (validity.tooShort && (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)) return `Ingresa al menos ${field.minLength} caracteres.`;
  if (validity.tooLong && (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)) return `Ingresa máximo ${field.maxLength} caracteres.`;
  return "Revisa este campo e inténtalo nuevamente.";
}

/**
 * Evita el aviso nativo del navegador y activa el estado visual definido en CSS.
 * Añade `aria-invalid` para accesibilidad y `data-field-error` para mostrar el
 * mensaje pequeño debajo del campo.
 */
export function showFieldError(event: { preventDefault: () => void; target: EventTarget | null }) {
  event.preventDefault();
  if (isValidatableField(event.target)) {
    event.target.setAttribute("aria-invalid", "true");
    event.target.parentElement?.setAttribute("data-field-error", getFieldErrorMessage(event.target));
  }
}

/** Retira el estado de error cuando el campo vuelve a ser válido al escribir. */
export function clearFieldError(event: { target: EventTarget | null }) {
  if (isValidatableField(event.target) && event.target.validity.valid) {
    event.target.removeAttribute("aria-invalid");
    event.target.parentElement?.removeAttribute("data-field-error");
  }
}
