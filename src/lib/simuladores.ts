/**
 * ───────────────────── CONFIGURACIÓN DE SIMULADORES ──────────────────────
 *
 * Este archivo controla los cálculos y los límites de todos los simuladores
 * de ahorro y crédito. Los cambios que hagas aquí se reflejan automáticamente
 * en los controles, las tablas de proyección y los resultados mostrados.
 *
 * QUÉ PUEDES EDITAR CON SEGURIDAD
 * - `montoMin`: menor valor que una persona puede seleccionar.
 * - `montoMax`: mayor valor que una persona puede seleccionar.
 * - `montoDefault`: valor inicial mostrado al abrir el simulador.
 * - `plazos`: opciones de tiempo y la tasa aplicable a cada una.
 *
 * Los guiones bajos de los números son solo para lectura: `1_000_000` es lo
 * mismo que 1000000. No cambian el valor calculado.
 *
 * IMPORTANTE: los nombres de cada bloque (por ejemplo `vehiculo`, `cdat` o
 * `coovikids`) deben coincidir con el `id` del producto en Productos.tsx.
 * Cambiarlos puede desconectar un producto de su simulador.
 * ──────────────────────────────────────────────────────────────────────────
 */

/**
 * Zona técnica: estos tipos únicamente validan la estructura del archivo.
 * No necesitas modificarlos para actualizar montos, plazos ni tasas.
 */
export type AhorroSimulatorConfig = {
  plazos: { label: string; dias: number; tasa: number }[];
  montoMin: number;
  montoMax: number;
  montoDefault: number;
  tipo: "termino_fijo" | "libre" | "nomina" | "meta";
};

export type CreditoSimulatorConfig = {
  montoMin: number;
  montoMax: number;
  montoDefault: number;
  plazos: { meses: number; tasaMensual: number }[];
};

/**
 * ───────────────────── SIMULADORES DE CRÉDITO ────────────────────────────
 *
 * Cada producto tiene su propia configuración, por eso puede tener montos,
 * plazos y tasas distintos. La cuota se recalcula al mover el monto o al
 * seleccionar otro plazo.
 *
 * Dentro de `plazos`:
 * - `meses`: crea el botón del plazo y define la duración del crédito.
 * - `tasaMensual`: tasa mensual vencida (M.V.) usada para calcular la cuota.
 *   Ejemplos: 0.012 = 1.2% M.V.; 0.009 = 0.9% M.V.; 0 = crédito sin interés.
 *
 * Escribe las tasas en decimal, nunca como porcentaje completo: 0.012 es
 * correcto; 1.2 no lo es. Puedes poner una tasa diferente para cada plazo.
 */
export const SIMULADORES_CREDITO: Record<string, CreditoSimulatorConfig> = {
  educacion: {
    montoMin: 1_000_000,
    montoMax: 80_000_000,
    montoDefault: 10_000_000,
    plazos: [
      { meses: 12, tasaMensual: 0.012 },
      { meses: 24, tasaMensual: 0.012 },
      { meses: 36, tasaMensual: 0.012 },
      { meses: 48, tasaMensual: 0.012 },
    ],
  },
  recreacion: {
    montoMin: 1_000_000,
    montoMax: 30_000_000,
    montoDefault: 5_000_000,
    plazos: [
      { meses: 12, tasaMensual: 0.013 },
      { meses: 24, tasaMensual: 0.013 },
      { meses: 36, tasaMensual: 0.013 },
    ],
  },
  fidelizacion: {
    montoMin: 1_000_000,
    montoMax: 80_000_000,
    montoDefault: 10_000_000,
    plazos: [
      { meses: 12, tasaMensual: 0.0135 },
      { meses: 24, tasaMensual: 0.0135 },
      { meses: 36, tasaMensual: 0.0135 },
      { meses: 60, tasaMensual: 0.0135 },
    ],
  },
  vehiculo: {
    montoMin: 1_000_000,
    montoMax: 120_000_000,
    montoDefault: 20_000_000,
    plazos: [
      { meses: 12, tasaMensual: 0.011 },
      { meses: 24, tasaMensual: 0.011 },
      { meses: 48, tasaMensual: 0.011 },
      { meses: 72, tasaMensual: 0.011 },
    ],
  },
  "libre-inversion": {
    montoMin: 1_000_000,
    montoMax: 50_000_000,
    montoDefault: 10_000_000,
    plazos: [
      { meses: 12, tasaMensual: 0.014 },
      { meses: 24, tasaMensual: 0.014 },
      { meses: 36, tasaMensual: 0.014 },
      { meses: 48, tasaMensual: 0.014 },
    ],
  },
  credisalud: {
    montoMin: 1_000_000,
    montoMax: 40_000_000,
    montoDefault: 5_000_000,
    plazos: [
      { meses: 12, tasaMensual: 0.012 },
      { meses: 24, tasaMensual: 0.012 },
      { meses: 36, tasaMensual: 0.012 },
    ],
  },
  vivienda: {
    montoMin: 10_000_000,
    montoMax: 200_000_000,
    montoDefault: 100_000_000,
    plazos: [
      { meses: 24, tasaMensual: 0.009 },
      { meses: 60, tasaMensual: 0.009 },
      { meses: 84, tasaMensual: 0.009 },
      { meses: 120, tasaMensual: 0.009 },
    ],
  },
  crediseguros: {
    montoMin: 500_000,
    montoMax: 20_000_000,
    montoDefault: 2_000_000,
    plazos: [
      { meses: 6, tasaMensual: 0 },
      { meses: 12, tasaMensual: 0 },
      { meses: 18, tasaMensual: 0.01 },
      { meses: 24, tasaMensual: 0.01 },
    ],
  },
  "cupo-rotativo": {
    montoMin: 2_000_000,
    montoMax: 20_000_000,
    montoDefault: 5_000_000,
    plazos: [
      { meses: 12, tasaMensual: 0.015 },
      { meses: 24, tasaMensual: 0.015 },
      { meses: 36, tasaMensual: 0.015 },
      { meses: 48, tasaMensual: 0.015 },
    ],
  },
  "compra-cartera": {
    montoMin: 1_000_000,
    montoMax: 80_000_000,
    montoDefault: 10_000_000,
    plazos: [
      { meses: 12, tasaMensual: 0.012 },
      { meses: 24, tasaMensual: 0.012 },
      { meses: 36, tasaMensual: 0.012 },
      { meses: 60, tasaMensual: 0.012 },
    ],
  },
};


/**
 * ───────────────────── SIMULADORES DE AHORRO ─────────────────────────────
 *
 * La tasa de ahorro se registra como efectiva anual (E.A.). La tabla y la
 * proyección se actualizan automáticamente al cambiar un monto o plazo.
 *
 * Dentro de `plazos`:
 * - `label`: texto visible en el botón, por ejemplo "180 días".
 * - `dias`: duración real usada para calcular la proyección.
 * - `tasa`: tasa efectiva anual (E.A.) en formato decimal.
 *   Ejemplos: 0.05 = 5.0% E.A.; 0.115 = 11.5% E.A.
 *
 * `tipo: "nomina"` (Coovikids) trata el monto como un aporte mensual y suma
 * todos los aportes durante el plazo. Los demás tipos usan el monto como una
 * inversión única inicial. No uses 5 para una tasa de 5%; usa 0.05.
 */
export const SIMULADORES_AHORRO: Record<string, AhorroSimulatorConfig> = {
  coovirenta: {
    tipo: "libre",
    montoMin: 50_000,
    montoMax: 50_000_000,
    montoDefault: 5_000_000,
    plazos: [
      { label: "1 mes", dias: 30, tasa: 0.015 },
      { label: "3 meses", dias: 90, tasa: 0.042 },
      { label: "6 meses", dias: 180, tasa: 0.042 },
      { label: "12 meses", dias: 365, tasa: 0.042 },
    ],
  },
  cdat: {
    tipo: "termino_fijo",
    montoMin: 1_000_000,
    montoMax: 500_000_000,
    montoDefault: 10_000_000,
    plazos: [
      { label: "90 días", dias: 90, tasa: 0.085 },
      { label: "180 días", dias: 180, tasa: 0.102 },
      { label: "270 días", dias: 270, tasa: 0.109 },
      { label: "360 días", dias: 360, tasa: 0.115 },
    ],
  },
  coovikids: {
    tipo: "nomina",
    montoMin: 1_000,
    montoMax: 5_000_000,
    montoDefault: 200_000,
    plazos: [
      { label: "6 meses", dias: 180, tasa: 0.038 },
      { label: "12 meses", dias: 365, tasa: 0.04 },
      { label: "24 meses", dias: 730, tasa: 0.042 },
      { label: "36 meses", dias: 1_095, tasa: 0.045 },
    ],
  },
  coovicasa: {
    tipo: "meta",
    montoMin: 100_000,
    montoMax: 20_000_000,
    montoDefault: 500_000,
    plazos: [
      { label: "6 meses", dias: 180, tasa: 0.044 },
      { label: "12 meses", dias: 365, tasa: 0.05 },
      { label: "24 meses", dias: 730, tasa: 0.056 },
      { label: "36 meses", dias: 1_095, tasa: 0.062 },
    ],
  },
  coovieducacion: {
    tipo: "meta",
    montoMin: 100_000,
    montoMax: 20_000_000,
    montoDefault: 500_000,
    plazos: [
      { label: "6 meses", dias: 180, tasa: 0.044 },
      { label: "12 meses", dias: 365, tasa: 0.05 },
      { label: "24 meses", dias: 730, tasa: 0.056 },
      { label: "36 meses", dias: 1_095, tasa: 0.062 },
    ],
  },
};
