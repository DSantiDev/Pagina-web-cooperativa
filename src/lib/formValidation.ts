export const NAME_PATTERN = "[A-Za-zÁÉÍÓÚáéíóúÑñÜü' -]+";
export const PHONE_PATTERN = "[0-9]{10}";

export function sanitizeName(value: string) {
  return value.replace(/[^\p{L}\s'-]/gu, "").replace(/\s{2,}/g, " ");
}

export function sanitizePhone(value: string) {
  return value.replace(/\D/g, "").slice(0, 10);
}

export function sanitizeDocument(value: string) {
  return value.replace(/\D/g, "").slice(0, 15);
}

type ValidatableField = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function isValidatableField(target: EventTarget | null): target is ValidatableField {
  return target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement;
}

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

/** Evita el aviso nativo del navegador y activa el estado visual definido en CSS. */
export function showFieldError(event: { preventDefault: () => void; target: EventTarget | null }) {
  event.preventDefault();
  if (isValidatableField(event.target)) {
    event.target.setAttribute("aria-invalid", "true");
    event.target.parentElement?.setAttribute("data-field-error", getFieldErrorMessage(event.target));
  }
}

/** Retira el estado de error cuando el campo vuelve a ser válido. */
export function clearFieldError(event: { target: EventTarget | null }) {
  if (isValidatableField(event.target) && event.target.validity.valid) {
    event.target.removeAttribute("aria-invalid");
    event.target.parentElement?.removeAttribute("data-field-error");
  }
}
