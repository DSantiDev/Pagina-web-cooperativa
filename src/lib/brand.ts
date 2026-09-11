export const COOVITEL_FOUNDATION_YEAR = 1962

/**
 * Se actualiza automáticamente al comenzar cada año calendario.
 * En 2026 devuelve 64 y en 2027 devolverá 65.
 * No tocar nada
 */
export function getCoovitelYears() {
  return new Date().getFullYear() - COOVITEL_FOUNDATION_YEAR
}

export function getCurrentYear() {
  return new Date().getFullYear()
}
