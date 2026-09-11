import { useEffect, useRef, useState } from "react";
import { getCoovitelYears } from "../lib/brand";
import redVitalLogo from "../assets/redvital/redvital-total-logo.png";
import appDescuentos from "../assets/redvital/app-descuentos.jpeg";
import appCategorias from "../assets/redvital/app-categorias.jpeg";
import appConvenios from "../assets/redvital/app-convenios.jpeg";
import appPlan from "../assets/redvital/app-plan.jpeg";
import MEDIA from "../lib/media";

const COOVITEL_YEARS = getCoovitelYears();

function GooglePlayIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.2 2.1v19.8L14.1 12 3.2 2.1Z" fill="#12B9E8" />
      <path d="M3.2 2.1 14.1 12l4.15-3.7L5.45 1.12a1.62 1.62 0 0 0-2.25.98Z" fill="#00E676" />
      <path d="m14.1 12 4.15-3.7 2.56 1.45c1.58.9 1.58 3.2 0 4.1l-2.56 1.45L14.1 12Z" fill="#FFD21E" />
      <path d="M3.2 21.9 14.1 12l4.15 3.7-12.8 7.18a1.62 1.62 0 0 1-2.25-.98Z" fill="#FF3D57" />
    </svg>
  );
}

type Tab = "sociales" | "financieros" | "redvital" | "exequial" | "educacion";

const TABS: { id: Tab; label: string; shortLabel: string; group: string }[] = [
  { id: "redvital", label: "RedVital", shortLabel: "RedVital", group: "Asistencias" },
  { id: "sociales", label: "Beneficios", shortLabel: "Beneficios", group: "Beneficios" },
  { id: "exequial", label: "Auxilios Cooperativos", shortLabel: "Auxilios", group: "Auxilios" },
];

type AssistanceConditions = {
  schedule?: string;
  eventLimit?: string;
  coverage?: string;
};

type RedVitalService = {
  name: string;
  detail?: string;
  detailSections?: { title: string; detail: string }[];
  conditions?: AssistanceConditions;
};

type RedVitalAssistance = {
  title: string;
  icon: string;
  services: RedVitalService[];
};

const REDVITAL_ASSISTANCES: RedVitalAssistance[] = [
  { title: "Asistencia Médica", icon: "⚕️", services: [
    {
      name: "Orientación médica telefónica.",
      detail: "Esta asistencia te permite acceder a orientación médica telefónica para resolver dudas relacionadas con tu salud y bienestar. A través de este servicio, podrás recibir recomendaciones generales y acompañamiento frente a síntomas, enfermedades o situaciones de salud que requieran una orientación inicial.\n\nLa atención brindada tiene un carácter informativo y preventivo, por lo que no reemplaza una consulta médica presencial. Durante la llamada no se emiten diagnósticos médicos, incapacidades ni se realizan cambios en tratamientos previamente formulados. Asimismo, los gastos que puedan generarse por consultas, medicamentos o estudios complementarios requeridos posteriormente no están incluidos dentro de esta asistencia. Cada orientación telefónica tiene una duración máxima de 30 minutos.",
      conditions: {
        schedule: "De 7:00 a. m. a 5:00 p. m.",
        eventLimit: "Sin límite de eventos.",
        coverage: "Cobertura máxima: $200.000 por evento.",
      },
    },
    { name: "Médico a domicilio y/o tele-orientación", detail: "Esta asistencia te permite recibir orientación y atención médica cuando presentes una enfermedad o lesión que pueda ser tratada sin necesidad de acudir a un centro hospitalario. Según la valoración realizada por el equipo médico de RED VITAL TOTAL, podrás recibir teleorientación médica o la visita de un médico en tu domicilio para evaluar la situación reportada y brindarte la atención correspondiente. \n\n Para acceder al servicio, se requiere una Orientación Médica Telefónica previa y la autorización del equipo médico. Los medicamentos, estudios complementarios e incapacidades médicas no están incluidos dentro de esta asistencia.",
      conditions: {
        eventLimit: "Limite: 5 eventos al año.",
      }
     },
    {
      name: "Traslado médico por accidente o enfermedad.",
      detailSections: [
        {
          title: "Traslado médico por enfermedad",
          detail: "Esta asistencia te permite acceder a un traslado médico terrestre cuando presentes una enfermedad súbita e imprevista que requiera atención médica. Una vez tu situación sea evaluada por el equipo médico, se coordinará el traslado desde tu domicilio hasta la clínica o centro médico más cercano, siempre que exista la infraestructura necesaria para prestar el servicio. En caso de no contar con disponibilidad, se gestionará la atención a través de los servicios médicos públicos de la ciudad. \n\n Esta asistencia no incluye traslados interhospitalarios ni un segundo traslado derivado del mismo evento.",
        },
        {
          title: "Traslado médico por accidente",
          detail: "Esta asistencia te permite acceder a un traslado médico terrestre de emergencia en ambulancia cuando, a causa de un accidente, presentes una lesión súbita o traumatismo que represente una emergencia vital. Tras una valoración telefónica realizada por el equipo médico, se coordinará el servicio y se hará seguimiento hasta la llegada de las unidades de atención para tu traslado al centro médico asistencial más cercano, siempre que exista la infraestructura necesaria para prestar el servicio. \n\n Esta asistencia no incluye traslados interhospitalarios ni un segundo traslado derivado del mismo evento."
        }, 
      ],conditions: {
        eventLimit: "Sin límite de eventos."
      }
    },
    { name: "Consulta de optometría.", detail: "Esta asistencia te permite acceder a una consulta de optometría enfocada en el cuidado primario de tu salud visual. Durante la atención podrás recibir una valoración visual orientada a identificar alteraciones o problemas oculares, así como recomendaciones para su prevención y cuidado. \n\n El servicio se presta en las principales ciudades del país y se realiza exclusivamente en consultorios autorizados por RED VITAL TOTAL. Los tratamientos, procedimientos especializados y productos ópticos derivados de la consulta no hacen parte de esta asistencia.", 
      conditions: 
      { schedule: "Lunes a viernes, de 9:00 a. m. a 5:00 p. m.", 
        eventLimit: "Límite: 1 evento por año.", 
        coverage: "Cobertura máxima: $100.000 por evento." } },
    { name: "Acompañamiento y traslado a citas médicas.", detail: "Esta asistencia te permite contar con acompañamiento personal o servicio de transporte para asistir a citas médicas programadas y sesiones de terapia. Según tus necesidades, podrás elegir entre recibir acompañamiento desde tu domicilio hasta el lugar de la atención y de regreso, o acceder únicamente al servicio de traslado dentro de la misma ciudad. \n\n La solicitud debe realizarse con al menos 48 horas de anticipación y presentar el soporte de la cita o terapia programada. El servicio se presta exclusivamente dentro del perímetro urbano y cuenta con una duración máxima de 3 horas, incluyendo traslados y tiempo de espera. Cuando tu condición requiera apoyo adicional, deberás contar con un acompañante responsable durante el servicio.",
      conditions: 
      { eventLimit: "Límite: 3 evento por año."}  },
  ] },
  { title: "Asistencia Vehicular", icon: "🚗", services: [
    { name: "Servicio de grúa.", detail: "Esta asistencia te permite contar con el servicio de grúa para el traslado de tu vehículo liviano o motocicleta hasta el destino que indiques dentro de la misma ciudad. Para acceder al servicio, el vehículo deberá contar con la documentación y placa vigentes, y al momento de la solicitud deberás suministrar la información necesaria para su ubicación. \n\n El vehículo deberá estar acompañado por ti o por una persona autorizada para su entrega y recepción. La tarjeta de propiedad no necesita estar a nombre del asociado para acceder a esta asistencia. Esta asistencia no aplica para vehículos declarados como pérdida total, traslado de partes o vehículos que se encuentren en patios o bajo atención de las autoridades de tránsito.",
      conditions: 
      { eventLimit: "Límite: 3 eventos por vigencia (moto o carro).", 
        coverage: "Cobertura máxima: $300.000 por evento." } },
    { name: "Servicio técnico en carro taller.", detail: "Esta asistencia te permite recibir apoyo técnico cuando tu vehículo se inmovilice por una descarga de batería o una llanta pinchada. En estos casos, se coordinará el envío de un carro taller al lugar donde te encuentres para realizar las labores necesarias y ayudarte a restablecer la movilidad del vehículo. \n\n El servicio está orientado a la atención de estas situaciones específicas en sitio, siempre que las condiciones permitan la prestación de la asistencia.", conditions:
      { eventLimit: "Sin límite de eventos" } },
    { name: "Paso de corriente.", detail: "Esta asistencia te permite recibir apoyo cuando la batería de tu vehículo requiera una carga inicial para encender. En estos casos, se coordinará el envío de un técnico para realizar la maniobra de paso de corriente y ayudarte a restablecer la operación del vehículo. \n\n Si el inconveniente persiste después de la intervención, podrás solicitar el servicio de grúa si cuentas con esta asistencia. De lo contrario, se te proporcionará una referencia para gestionar el traslado del vehículo, cuyos costos deberás asumir directamente. Esta asistencia aplica para vehículos livianos o familiares y está disponible en las principales ciudades del país, con una cobertura de hasta 30 km. El servicio no incluye el cambio ni la compra de baterías.", conditions:
      { eventLimit: "Sin límite de eventos" } },
    { name: "Cambio de llanta.", detail: "Esta asistencia te permite recibir apoyo cuando una de las llantas de tu vehículo presente una avería o pinchazo que impida continuar el recorrido. En estos casos, se coordinará el envío de un técnico al lugar donde te encuentres para realizar el cambio de la llanta afectada y ayudarte a retomar tu trayecto. \n\n Para acceder al servicio, deberás contar con una llanta de repuesto en buen estado. Si tu vehículo utiliza pernos de seguridad o requiere una llave especial para retirarlos, deberás tenerla disponible al momento de la atención. Esta asistencia aplica para vehículos livianos o familiares y está disponible en las principales ciudades del país, con una cobertura de hasta 30 km. El servicio incluye únicamente el cambio de llanta y no contempla la reparación de la llanta averiada.", conditions: {
      eventLimit: "Límite: 2 eventos combinados al año.",
      coverage: "Cobertura máxima: $100.000 por evento."
    }},
    { name: "Conductor elegido.", detail: "Esta asistencia te permite contar con un conductor para trasladar tu vehículo hasta tu residencia habitual cuando hayas consumido bebidas alcohólicas y no te encuentres en condiciones de conducir. Para acceder al servicio, deberás solicitarlo con al menos 4 horas de anticipación. \n\n El conductor se desplazará hasta el lugar donde te encuentres y llevará el vehículo directamente a tu domicilio, siempre que la infraestructura del trayecto lo permita. La asistencia tiene una cobertura máxima de 30 km, no contempla paradas ni trayectos adicionales, y solo podrán viajar los ocupantes permitidos según la capacidad del vehículo, incluido el puesto del conductor. Para acceder al servicio, el vehículo deberá contar con la documentación vigente. Una vez coordinada la asistencia, el conductor esperará hasta 15 minutos en el lugar y hora acordados, transcurrido este tiempo, el servicio se considerará prestado. \n\n Esta asistencia aplica para vehículos livianos o familiares y está disponible en Bogotá, Medellín, Cali, Bucaramanga, Cartagena, Pereira, Armenia, Manizales, Barranquilla, Ibagué, Tunja, Montería, Sincelejo, Neiva, Florencia, Cúcuta, Villavicencio, Popayán, Pasto y Santa Marta.", 
      conditions: 
    {
      eventLimit: " Limite: 2 eventos por año.",
      coverage: " Cobertura máxima: $100.000 por evento."
    } },
  ] },
  { title: "Asistencia para el Hogar", icon: "🏠", services: [
    { name: "Servicio de handyman.", detail: "Esta asistencia te permite contar con apoyo para realizar reparaciones menores y tareas sencillas en tu hogar, como instalación de cortinas, cuadros, tendederos, accesorios de baño, televisores, espejos, percheros, barras de armario y otros trabajos similares en tu residencia habitual. \n\n El servicio incluye mano de obra, desplazamiento y materiales no accesorios, sin costo para ti, por un período máximo de 3 horas continuas o hasta el límite de cobertura establecido. Si el tiempo o el valor de la cobertura son excedidos, el costo adicional deberás asumirlo. Los accesorios no están incluidos, sin embargo, si requieres que sean suministrados por el proveedor, el valor deberá ser cubierto directamente.",
      conditions: 
      { eventLimit: "Límite: 3 eventos por año.", 
        coverage: "Cobertura máxima: $200.000 por evento." }  },
    { name: "Cerrajería.", detail: "Esta asistencia te permite contar con atención de cerrajería de emergencia cuando no puedas ingresar o salir de tu residencia habitual debido a la pérdida, extravío, olvido o robo de llaves, o por daños en la cerradura que impidan el acceso a la vivienda. El servicio también contempla la apertura de puertas interiores, terrazas, balcones y, en el caso de residencias unifamiliares, el acceso al aparcamiento. \n\n La asistencia cubre la mano de obra necesaria para la apertura de la puerta, extracción de llaves o cambio de cerradura, según sea requerido. Los materiales o elementos que deban reemplazarse como parte de la reparación deberás asumirlos.", 
      conditions: 
      { eventLimit: "Límite: 1 evento por año.", 
        coverage: "Cobertura máxima: $200.000 por evento." }  },
    { name: "Electricidad.", detail: "Esta asistencia te permite contar con atención técnica especializada cuando una avería súbita e imprevista en las instalaciones eléctricas de tu residencia ocasione una interrupción total o parcial del suministro de energía. En estos casos, se coordinará el envío de un técnico para realizar la reparación necesaria y restablecer el servicio, siempre que las condiciones de la red eléctrica lo permitan. \n\n La asistencia cubre la mano de obra y el desplazamiento del técnico. Los materiales o repuestos que se requieran para la reparación deberás asumirlos directamente.",
      conditions:
      { eventLimit: "Límite: 1 evento por año.", 
        coverage: "Cobertura máxima: $200.000 por evento." } },
    { name: "Plomería.", detail: "Esta asistencia te permite contar con atención especializada cuando una avería súbita e imprevista en las instalaciones de agua potable o sanitarias de tu residencia afecte el suministro o la evacuación de agua a través de tuberías visibles. En estos casos, se coordinará el envío de un técnico para atender la emergencia y realizar una reparación definitiva, provisional o de contención, según las características del daño y el alcance de la cobertura, siempre que el estado de las redes lo permita. \n\n La asistencia cubre la mano de obra y el desplazamiento del técnico. Los materiales o repuestos que se requieran para la reparación deberás asumirlos directamente. Este servicio no incluye reparaciones en tanques elevados, canaletas, bajantes, techos, tejas, tuberías galvanizadas ni trabajos de exploración, excavación o detección de fugas no visibles.",
      conditions:
      { eventLimit: "Límite: 1 evento por año.", 
        coverage: "Cobertura máxima: $200.000 por evento." } },
  ] },
  { title: "Asistencia para Mascotas", icon: "🐾", services: [
    { name: "Orientación veterinaria telefónica.", detail: "Esta asistencia te permite acceder a orientación veterinaria telefónica las 24 horas del día, los 365 días del año, para resolver dudas relacionadas con molestias, signos clínicos, lesiones o enfermedades de tu mascota. Un profesional veterinario te brindará recomendaciones sobre cuidados, medidas preventivas y acciones que puedes realizar en casa como apoyo inicial ante la situación reportada. \n\n Esta asistencia aplica exclusivamente para perros y gatos.", conditions: { eventLimit: "Sin límite de eventos." } },
    { name: "Refuerzo de vacunación para perro o gato.", detail: "Esta asistencia te permite acceder al refuerzo anual de vacunación para una mascota (perro o gato) mayor de 6 meses, mediante atención a domicilio o en clínicas aliadas de RED VITAL TOTAL. Antes de la aplicación, se verificará el carnet de vacunación y la identificación de la mascota para validar las vacunas correspondientes. \n\n La asistencia incluye las vacunas pentavalente, rabia para caninos y triple Felina y rabia para felinos. Este servicio cubre una única jornada anual de vacunación por mascota y no incluye vacunas diferentes a las mencionadas ni tratamientos adicionales.", 
      conditions:
      { eventLimit: "Límite: 1 evento al año.", 
        coverage: "Cobertura máxima: $100.000 por evento." } },
    { name: "Veterinario a domicilio por accidente o enfermedad.", detail: "Esta asistencia te permite acceder a atención veterinaria para tu mascota cuando, a causa de un accidente o enfermedad, presente una situación que comprometa su estado vital. Según la disponibilidad y las condiciones del caso, se coordinará la atención a domicilio o una atención inicial en clínica con profesionales pertenecientes a la red de proveedores autorizada. \n\n El servicio aplica exclusivamente para perros y gatos y está orientado a la atención de situaciones urgentes, por lo que no incluye consultas de rutina o preventivas. Los gastos asociados a hospitalización, cirugía, cuidados intensivos, exámenes, medicamentos, prótesis, rehabilitación, cuidados especiales u honorarios de especialistas deberás asumirlos directamente. La asistencia tampoco cubre servicios prestados por veterinarios que no pertenezcan a la red autorizada.", 
      conditions:
      { eventLimit: "Límite: 3 eventos combinados al año.", 
        coverage: "Cobertura máxima: $250.000 por evento." } },
  ] },
  { title: "Asistencia Emocional y Legal", icon: "💬", services: [
    { name: "Orientación psicológica telefónica.", detail: "Esta asistencia te permite acceder a orientación emocional telefónica las 24 horas del día, los 7 días de la semana, para recibir apoyo profesional en situaciones relacionadas con la familia, las relaciones de pareja, la sexualidad juvenil, los trastornos alimenticios, el bullying, la ansiedad y otros temas asociados al bienestar personal. \n\n Durante la atención, un profesional en psicología te brindará acompañamiento y orientación, y cuando lo considere pertinente, podrá recomendar la continuidad del proceso terapéutico o la valoración por otra especialidad. Este servicio no incluye la formulación de medicamentos ni la emisión de incapacidades médicas, ni garantiza resultados.", 
      conditions: { eventLimit: "Sin límite de eventos." } },
    { name: "Orientación legal telefónica.", detail: "Esta asistencia te permite acceder a orientación legal telefónica en cualquier rama del derecho para resolver inquietudes y recibir recomendaciones de carácter general. La atención en temas de derecho penal está disponible las 24 horas del día, mientras que para las demás áreas del derecho el servicio se presta de lunes a viernes, de 9:00 a. m. a 6:00 p. m. \n\n Cada consulta tiene una duración máxima de 30 minutos. Cuando la situación requiera la intervención presencial de un abogado, los honorarios correspondientes deberás asumirlos directamente. Este servicio brinda orientación jurídica y no incluye acompañamiento o representación en procesos legales.", 
      conditions: { eventLimit: "Sin límite de eventos." } },
  ] },
];

const REDVITAL_APP_SCREENS = [
  { src: appPlan, alt: "Pantalla Mi Plan de la App RedVital", label: "Mi plan" },
  { src: appDescuentos, alt: "Pantalla de descuentos de la App RedVital", label: "Descuentos" },
  { src: appCategorias, alt: "Pantalla de categorías de la App RedVital", label: "Categorías" },
  { src: appConvenios, alt: "Pantalla de convenios de la App RedVital", label: "Convenios" },
];

type BenefitDetail = { title: string; text?: string; items?: string[] };
type SocialBenefit = { icon: string; motion: string; title: string; description: string; details: BenefitDetail[] };

const SOCIAL_BENEFITS: SocialBenefit[] = [
  {
    icon: "🎬", motion: "cinema", title: "Cine y confitería", description: "Disfruta boletería y combos de confitería con tarifas preferenciales en Cine Colombia y Royal Films.",
    details: [
      { title: "Opciones disponibles", items: ["Boleta individual 2D. No aplica para funciones 3D.", "Combo Cine Colombia: boleta 2D, palomitas de sal de 100 g, gaseosa mediana de 640 ml y perro caliente sencillo o sándwich.", "Combo Royal Films: boleta 2D, palomitas de sal pequeñas de 40 g, gaseosa mediana de 22 oz y perro caliente."] },
      { title: "Tarifas", items: ["Royal Films: $28.500. Disponible únicamente en combo.", "Cine Colombia: boleta individual por $13.000.", "Cine Colombia: combo de boleta por $25.500."] },
      { title: "Condiciones de compra", text: "Puedes solicitar las boletas que necesites durante el mes, hasta agotar existencias. En una misma compra puedes adquirir la cantidad que requieras; desde la octava boleta se suman $1.000 por cada unidad. Para empresas asociadas, se suman $1.000 desde la primera boleta." },
      { title: "Pago y solicitud", items: ["Ventanilla de Caja Bogotá: registro inmediato.", "Efecty, cuenta de ahorros Davivienda o Bancolombia: registro de hasta 3 días hábiles.", "No se reciben pagos por PSE ni CoviPay.", "Solicita por correo o teléfono e indica nombre, cédula, correo de entrega, cine, tipo de boleta o combo. Adjunta el comprobante de pago."] },
      { title: "Compra con anticipación", text: "Te recomendamos realizar la compra con al menos 2 días de anticipación." },
    ],
  },
  {
    icon: "🎁", motion: "gift", title: "Obsequio de fidelización", description: "Reconocemos tu lealtad y antigüedad en la cooperativa con un detalle especial.",
    details: [
      { title: "Requisito de antigüedad", text: "Debes completar al menos 6 meses como asociado antes del corte de diciembre. Por ejemplo, si te asocias después de junio, podrás optar al obsequio en el siguiente año." },
      { title: "Categorías de antigüedad", items: ["De 6 meses a 1 año.", "De 1 a 3 años.", "Más de 3 años."] },
      { title: "Condiciones", text: "El obsequio está sujeto a términos y condiciones. Sus características pueden ser modificadas por decisión de la Asamblea." },
    ],
  },
  {
    icon: "🎉", motion: "events", title: "Eventos", description: "Participa en los encuentros y actividades que COOVITEL prepara para sus asociados.",
    details: [
      { title: "Evento anual", text: "Actualmente se realiza un evento anual al cierre de cada año." },
      { title: "Mantente informado", text: "Consulta nuestras redes sociales y las actualizaciones de esta página para conocer fechas, inscripción, condiciones y novedades." },
    ],
  },
  {
    icon: "📈", motion: "finance", title: "Beneficios financieros", description: "Accede a descuentos y alternativas de financiación para seguros de hogar y vehículo con aliados COOVITEL.",
    details: [
      { title: "Seguro de hogar · coberturas", items: ["Todo riesgo por incendio.", "Terremoto.", "Sustracción con o sin violencia.", "Todo riesgo para bienes móviles y portátiles.", "Responsabilidad civil familiar y extracontractual."] },
      { title: "¿Qué puedes asegurar?", items: ["Muebles y enseres.", "Equipos eléctricos, electrónicos y a gas.", "Bienes móviles y portátiles."] },
      { title: "Seguro todo riesgo de automóvil", text: "Contamos con aliados para que obtengas tu seguro todo riesgo de vehículo y puedas financiar su pago con COOVITEL." },
      { title: "Coberturas del vehículo", items: ["Daños a terceros.", "Pérdida total o parcial por hurto.", "Pérdida total o parcial por daños.", "Asistencia en carreteras, entre otros."] },
    ],
  },
  {
    icon: "🤝", motion: "family", title: "Convenios", description: "Accede a tarifas preferenciales en medicina prepagada y complementaria para ti y tu familia.",
    details: [
      { title: "Colsanitas · Plan Integral", items: ["Menores de 63 años: $515.100 al mes.", "De 63 a 90 años: $1.748.100 al mes."] },
      { title: "Medisanitas", items: ["Menores de 64 años: $334.000 al mes.", "De 64 a 69 años: $1.181.000 al mes.", "De 70 a 74 años: $1.280.000 al mes.", "De 75 a 90 años: $1.583.000 al mes."] },
      { title: "Plan Empresarial", items: ["Menores de 59 años: $186.500 al mes.", "Mayores de 60 años: $566.000 al mes."] },
    ],
  },
  {
    icon: "🎭", motion: "events", title: "Cultura", description: "Descubre los beneficios culturales disponibles mediante el convenio con ASCOOP.",
    details: [
      { title: "Convenio cultural", text: "Los beneficios de cultura están sujetos al convenio vigente con ASCOOP." },
      { title: "Mantente informado", text: "Revisa nuestras redes sociales y las actualizaciones de esta página para conocer los convenios culturales, sus fechas y sus condiciones." },
    ],
  },
];

const EXEQUIAL_FEATURES = [
  { label: "Por fallecimiento del asociado", value: "$1.5 millones" },
  { label: "Por fallecimiento de padre", value: "$1 millón" },
  { label: "Por fallecimiento de madre", value: "$1 millón" },
  { label: "Por fallecimiento de cónyuge", value: "$1 millón" },
  { label: "Hijos menores de 18 años", value: "$1 millón" },
  { label: "Hijos de 18 a 20 años con discapacidad", value: "$1 millón" },
  { label: "Auxilios solidarios", value: "Sujetos a comité" },
  { label: "Por enfermedad o calamidad", value: "Sujeto a verificación" },
];

function HeroBanner({ activeTab: _activeTab }: { activeTab: Tab }) {
  return (
    <div className="bienestar-hero relative bg-[#173C6E] overflow-hidden">
      <div
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            `url('${MEDIA.bienestarHero}&w=1400&h=400')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(19, 23, 57, 0.84) 0%, rgba(23, 60, 110, 0.78) 60%, rgba(39, 84, 143, 0.72) 100%)" }} />
      {/* decorative circles */}
      <div className="bienestar-hero__orb bienestar-hero__orb--one absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full" />
      <div className="bienestar-hero__orb bienestar-hero__orb--two absolute -bottom-10 left-1/3 w-48 h-48 bg-[#EBC302]/10 rounded-full" />
      <div className="bienestar-hero__content relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-9 sm:py-12 md:py-16">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-4">
          <div className="w-2 h-2 rounded-full bg-[#EBC302]" />
          <span className="text-white/90 text-xs font-semibold uppercase tracking-widest">Bienestar COOVITEL</span>
        </div>
        <h1 className="text-[2rem] sm:text-3xl md:text-5xl font-bold text-white leading-tight mb-3">
          Bienestar
        </h1>
        <p className="text-white/70 text-base md:text-lg max-w-xl">
          Porque ser asociado de COOVITEL va más allá del crédito y el ahorro. Descubre todos los privilegios que tenemos para ti y tu familia.
        </p>
      </div>
      {/* wave bottom */}
      <div className="relative">
        <svg viewBox="0 0 1440 40" fill="none" className="w-full block" preserveAspectRatio="none">
          <path d="M0 40 C360 0 1080 40 1440 10 L1440 40 Z" fill="white" />
        </svg>
      </div>
    </div>
  );
}

function TabNav({ activeTab, setActiveTab }: { activeTab: Tab; setActiveTab: (t: Tab) => void }) {
  return (
    <nav className="benefits-tab-nav bg-white z-40 border-b border-gray-100 shadow-sm" aria-label="Secciones de beneficios">
      <div className="benefits-tab-nav__container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="benefits-tab-nav__mobile" aria-label="Secciones de beneficios">
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={activeTab === tab.id ? "is-active" : ""}>
              <span>{tab.group}</span><strong>{tab.shortLabel}</strong>
            </button>
          ))}
        </div>
        <div className="benefits-tab-nav__list">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`benefits-tab-nav__item relative flex flex-col items-start transition-all ${
                  isActive
                    ? "is-active text-[#173C6E]"
                    : "text-gray-500 hover:text-[#173C6E]"
                }`}
              >
                <span className="text-[10px] font-semibold uppercase tracking-widest mb-0.5 text-[#173C6E] opacity-80">
                  {tab.group}
                </span>
                <span className="text-sm font-semibold">{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#173C6E] rounded-t" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

function BeneficiosSociales() {
  const [selectedBenefit, setSelectedBenefit] = useState<(typeof SOCIAL_BENEFITS)[number] | null>(null);
  const benefitDetailRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!selectedBenefit) return;
    const frame = window.requestAnimationFrame(() => benefitDetailRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }));
    return () => window.cancelAnimationFrame(frame);
  }, [selectedBenefit]);

  return (
    <div>
      <div className="bienestar-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-9 sm:py-14">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-10 sm:mb-16">
          <div>
          <span className="text-[#173C6E] text-xs font-bold uppercase tracking-widest">Beneficios COOVITEL</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#173C6E] mt-2 mb-4 leading-tight">
              Bienestar para ti<br />y tu familia
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Disfruta experiencias, convenios y condiciones preferenciales para ti y tu grupo familiar.
            </p>
            <div className="flex gap-3 flex-wrap">
              <div className="bg-[#173C6E]/5 rounded-xl px-4 py-2 text-center">
                <div className="font-bold text-[#173C6E] text-xl">17.000+</div>
                <div className="text-xs text-gray-500">Asociados</div>
              </div>
              <div className="bg-[#EBC302]/10 rounded-xl px-4 py-2 text-center">
                <div className="font-bold text-[#173C6E] text-xl">{COOVITEL_YEARS}+</div>
                <div className="text-xs text-gray-500">Años de trayectoria</div>
              </div>
              <div className="bg-[#173C6E]/5 rounded-xl px-4 py-2 text-center">
                <div className="font-bold text-[#173C6E] text-xl">9</div>
                <div className="text-xs text-gray-500">Ciudades</div>
              </div>
            </div>
          </div>
          <div className="bienestar-image-card relative">
            <img
              src={`${MEDIA.bienestarImagenBeneficios}&w=600&h=420`}
              alt="Personas de la comunidad en Bogotá, Colombia"
              className="w-full h-72 object-cover rounded-2xl shadow-xl"
            />
            <div className="absolute -bottom-4 -left-4 bg-[#EBC302] text-white rounded-xl px-4 py-3 shadow-lg">
              <div className="font-bold text-lg">200+</div>
              <div className="text-xs opacity-90">Empresas aliadas</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5" role="list" aria-label="Beneficios disponibles">
          {SOCIAL_BENEFITS.map((benefit, index) => {
            const isSelected = selectedBenefit?.title === benefit.title;
            return (
              <button
                key={benefit.title}
                type="button"
                role="listitem"
                aria-pressed={isSelected}
                onClick={() => setSelectedBenefit(isSelected ? null : benefit)}
              className={`bienestar-benefit-card group relative min-h-[148px] sm:min-h-[176px] overflow-hidden rounded-2xl sm:rounded-3xl border p-3 sm:p-5 text-center transition-all duration-300 ease-out focus:outline-none focus-visible:ring-4 focus-visible:ring-[#EBC302]/40 ${isSelected ? "-translate-y-1 border-[#173C6E] bg-[#173C6E] shadow-xl" : "border-[#DDE9C7] bg-[#F3F8E9] hover:-translate-y-2 hover:border-[#98B96C] hover:shadow-xl"}`}
                style={{ transitionDelay: `${index * 45}ms` }}
              >
                <span className={`benefit-menu-icon benefit-menu-icon--${benefit.motion} mx-auto mb-3 sm:mb-5 grid h-11 w-11 sm:h-14 sm:w-14 place-items-center rounded-xl sm:rounded-2xl text-2xl sm:text-3xl transition-all duration-300 ${isSelected ? "bg-white/15" : "bg-white shadow-sm"}`}>{benefit.icon}</span>
                <span className={`block text-sm sm:text-base font-extrabold leading-tight transition-colors ${isSelected ? "text-white" : "text-[#173C6E]"}`}>{benefit.title}</span>
                <span className={`mt-3 block text-[10px] font-bold uppercase tracking-wider transition-all ${isSelected ? "text-[#EBC302] opacity-100" : "text-[#607B37] opacity-0 group-hover:opacity-100"}`}>{isSelected ? "Seleccionado" : "Ver detalle"}</span>
              </button>
            );
          })}
        </div>

        {selectedBenefit ? <section ref={benefitDetailRef} key={selectedBenefit.title} className="mt-7 scroll-mt-36 overflow-hidden rounded-2xl border border-[#C9DCFF] bg-[#F7F0FF] p-4 shadow-sm animate-[content-reveal_.35s_ease-out] sm:p-6" aria-live="polite">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#173C6E] text-2xl">{selectedBenefit.icon}</span>
              <div><p className="text-xs font-bold uppercase tracking-widest text-[#1B65A6]">Beneficio COOVITEL</p><h3 className="text-xl font-bold text-[#173C6E]">{selectedBenefit.title}</h3></div>
            </div>
            <span className="self-start rounded-full bg-[#EBC302]/15 px-3 py-1.5 text-xs font-bold text-[#173C6E] sm:self-auto">Sujeto a términos y condiciones.</span>
          </div>
          <div className="mt-5 grid gap-3 border-t border-[#C9DCFF] pt-5 md:grid-cols-2">
            {selectedBenefit.details.map((detail, index) => {
              const isLastUnpairedDetail = selectedBenefit.details.length % 2 === 1 && index === selectedBenefit.details.length - 1;

              return <section key={detail.title} className={`relative overflow-hidden rounded-xl border border-[#C9DCFF] bg-white p-4 shadow-[0_3px_10px_rgba(23,60,110,.05)] transition-shadow hover:shadow-[0_6px_18px_rgba(23,60,110,.10)] sm:p-5${isLastUnpairedDetail ? " md:col-span-2 md:mx-auto md:w-[calc(50%-0.375rem)]" : ""}`}>
                <span className="absolute inset-x-0 top-0 h-1 bg-[#EBC302]" aria-hidden="true" />
                <h4 className="border-b border-[#E6EFFD] pb-2 text-sm font-bold text-[#173C6E]">{detail.title}</h4>
                {detail.text && <p className="mt-2 text-sm leading-relaxed text-[#1A2842]">{detail.text}</p>}
                {detail.items && <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#1A2842]">{detail.items.map((item) => <li key={item} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#EBC302]" /><span className="whitespace-pre-line">{item}</span></li>)}</ul>}
              </section>;
            })}
          </div>
        </section> : <section className="mt-7 rounded-2xl border border-dashed border-[#98B96C] bg-[#F3F8E9] p-6 text-center animate-[content-reveal_.35s_ease-out]" aria-live="polite"><span className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-white text-2xl shadow-sm">✨</span><h3 className="mt-3 text-lg font-bold text-[#173C6E]">Elige un beneficio para conocerlo</h3><p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-[#51643A]">Explora las opciones disponibles para ti y tu familia. Puedes cerrar el detalle pulsando nuevamente la card seleccionada.</p></section>}

        <div className="mt-9 sm:mt-12 bg-gradient-to-r from-[#173C6E] to-[#27548F] rounded-2xl p-5 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
          <div>
            <h3 className="text-white font-bold text-xl mb-1">¿Quieres acceder a estos beneficios?</h3>
            <p className="text-white/70 text-sm">Asóciate hoy y comienza a disfrutar de todos nuestros privilegios.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a href="/asociate" className="bg-[#EBC302] hover:bg-[#EBC302] text-white font-semibold rounded-full px-6 py-3 text-sm transition-colors">
              Asóciate ahora
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function RedVital() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [selectedAssistance, setSelectedAssistance] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [expandedDetailSections, setExpandedDetailSections] = useState<string[]>([]);
  const detailPanelRef = useRef<HTMLElement>(null);
  const screen = REDVITAL_APP_SCREENS[activeScreen];
  const activeAssistance = REDVITAL_ASSISTANCES.find((item) => item.title === selectedAssistance);
  const activeService = activeAssistance?.services.find((item) => item.name === selectedService);

  useEffect(() => {
    const slider = window.setInterval(() => setActiveScreen((current) => (current + 1) % REDVITAL_APP_SCREENS.length), 3800);
    return () => window.clearInterval(slider);
  }, []);

  useEffect(() => {
    setExpandedDetailSections([]);
  }, [selectedService]);

  const scrollToDetailOnMobile = () => {
    if (!window.matchMedia("(max-width: 1023px)").matches) return;
    window.setTimeout(() => detailPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const openAssistance = (assistance: RedVitalAssistance) => {
    if (selectedAssistance === assistance.title) {
      setSelectedAssistance(null);
      setSelectedService(null);
      return;
    }
    setSelectedAssistance(assistance.title);
    setSelectedService(assistance.services[0].name);
    scrollToDetailOnMobile();
  };

  const openService = (service: RedVitalService) => {
    setSelectedService(service.name);
    scrollToDetailOnMobile();
  };

  return (
    <div className="bienestar-section bienestar-redvital max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-9 sm:py-14">
      <section className="mb-14">
        <div className="max-w-3xl mb-8">
          <span className="text-[#173C6E] text-xs font-bold uppercase tracking-widest">Asistencias RedVital</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-[#173C6E]">Acompañamiento para cada momento</h2>
          <p className="mt-3 text-gray-600 leading-relaxed">Conoce las asistencias disponibles para ti. Cada servicio está sujeto a cobertura, condiciones y límites establecidos.</p>
        </div>
        <div className="grid lg:grid-cols-[270px_minmax(0,1fr)] gap-6 items-start">
          <aside className="bienestar-assistance-menu overflow-hidden rounded-2xl border border-[#C9DCFF] bg-white shadow-sm">
            <div className="bg-[#131739] px-5 py-4 text-xs font-black uppercase tracking-widest text-white">Asistencias</div>
            <nav className="p-2" aria-label="Categorías de asistencias">
              {REDVITAL_ASSISTANCES.map((assistance) => {
                const isSelected = selectedAssistance === assistance.title;
                return <div key={assistance.title} className={`rounded-xl ${isSelected ? "bg-[#CFE0FF]" : ""}`}><button type="button" onClick={() => openAssistance(assistance)} className={`w-full rounded-xl px-4 py-3 text-left transition-colors ${isSelected ? "text-[#173C6E]" : "text-[#1A2842] hover:bg-[#F7F0FF]"}`} aria-expanded={isSelected}><span className="flex items-center justify-between gap-3 font-bold text-sm"><span>{assistance.icon} {assistance.title}</span><span aria-hidden="true">{isSelected ? "⌃" : "⌄"}</span></span></button>{isSelected && <div className="mb-2 ml-5 border-l-2 border-[#81A1DB] pl-3 pr-2">{assistance.services.map((service) => <button key={service.name} type="button" onClick={() => openService(service)} className={`block w-full rounded-lg px-2 py-2 text-left text-xs transition-all ${selectedService === service.name ? "bg-white font-bold text-[#173C6E] shadow-sm" : "text-[#1A2842] hover:bg-white/70 hover:translate-x-1"}`}>{service.name}</button>)}</div>}</div>;
              })}
            </nav>
          </aside>
          {activeAssistance && activeService ? <section ref={detailPanelRef} key={activeService.name} className="scroll-mt-24 rounded-2xl border border-[#C9DCFF] bg-[#F7F0FF] p-4 sm:p-6 md:p-8 animate-[content-reveal_.35s_ease-out]">
            <div className="mb-5 sm:mb-6 flex items-start gap-3 sm:gap-4"><span className="grid h-11 w-11 sm:h-14 sm:w-14 shrink-0 place-items-center rounded-xl sm:rounded-2xl bg-[#173C6E] text-xl sm:text-2xl">{activeAssistance.icon}</span><div><p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#1B65A6]">{activeAssistance.title}</p><h3 className="text-xl sm:text-2xl font-bold leading-tight text-[#173C6E]">{activeService.name}</h3></div></div>
            <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_220px] md:items-start">
              <article className="rounded-xl border border-[#C9DCFF] bg-white p-4 sm:p-5">
                {activeService.detailSections ? (
                  <div className="space-y-3">
                    {activeService.detailSections.map((section) => {
                      const isExpanded = expandedDetailSections.includes(section.title);
                      return <section key={section.title} className="overflow-hidden rounded-xl border border-[#C9DCFF] bg-[#F7F0FF] transition-shadow hover:shadow-sm">
                        <button type="button" onClick={() => setExpandedDetailSections((current) => isExpanded ? current.filter((title) => title !== section.title) : [...current, section.title])} className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left" aria-expanded={isExpanded}>
                          <h4 className="text-base font-bold text-[#173C6E]">{section.title}</h4>
                          <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#173C6E] text-sm text-white transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} aria-hidden="true">⌄</span>
                        </button>
                        <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                          <div className="overflow-hidden"><div className="border-t border-[#C9DCFF] px-4 pb-4 pt-3">{section.detail.split("\n\n").map((paragraph) => <p key={paragraph} className="text-base leading-relaxed text-[#1A2842] [&+&]:mt-4">{paragraph}</p>)}</div></div>
                        </div>
                      </section>;
                    })}
                  </div>
                ) : activeService.detail?.split("\n\n").map((paragraph) => <p key={paragraph} className="text-base leading-relaxed text-[#1A2842] [&+&]:mt-4">{paragraph}</p>)}
              </article>
              <aside className="relative overflow-hidden rounded-xl border border-[#B6D1FF] bg-gradient-to-br from-white to-[#EAF3FF] p-5 shadow-lg transition-transform duration-300 md:-translate-y-3 hover:md:-translate-y-4" aria-label="Condiciones del servicio">
                <div className="absolute -right-5 -top-5 h-16 w-16 rounded-full bg-[#EBC302]/20" />
                <div className="relative">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#173C6E] text-white" aria-hidden="true">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                      <path d="M14 2v6h6" />
                      <path d="m8 15 2 2 5-5" />
                    </svg>
                  </span>
                  <p className="mt-3 text-xs font-black uppercase tracking-widest text-[#1B65A6]">Condiciones</p>
                  <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#1A2842]">
                    {activeService.conditions?.schedule && <div><span className="block text-[10px] font-bold uppercase tracking-wide text-[#1B65A6]">Horario de atención</span><p className="mt-1 font-medium">{activeService.conditions.schedule}</p></div>}
                    <p className="border-t border-[#C9DCFF] pt-3 font-semibold text-[#173C6E]">{activeService.conditions?.eventLimit ?? "Consulta las condiciones, límites y coberturas vigentes para este servicio."}</p>
                    {activeService.conditions?.coverage && <p className="border-t border-[#C9DCFF] pt-3 font-semibold text-[#173C6E]">{activeService.conditions.coverage}</p>}
                  </div>
                </div>
              </aside>
            </div>
            <p className="mt-6 border-t border-[#C9DCFF] pt-4 text-xs font-semibold text-[#1B65A6]">Aplican términos y condiciones.</p>
          </section> : <section className="relative overflow-hidden rounded-2xl border border-[#C9DCFF] bg-gradient-to-br from-[#131739] to-[#173C6E] p-8 md:p-12 text-white animate-[content-reveal_.35s_ease-out]"><div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#EBC302]/20" /><div className="absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-[#5FA8FF]/20" /><div className="relative max-w-xl"><span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-[#EBC302] text-2xl">✨</span><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#EBC302]">Tu bienestar, a un clic</p><h3 className="mt-2 text-3xl font-bold leading-tight">Elige una asistencia para conocer cómo te acompaña</h3><p className="mt-4 leading-relaxed text-[#F7F0FF]">Explora las opciones del menú y descubre el respaldo disponible para tu salud, hogar, vehículo, mascotas y bienestar emocional.</p><div className="mt-7 flex flex-wrap gap-2">{["Salud", "Hogar", "Vehículo", "Mascotas", "Bienestar"].map((item) => <span key={item} className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold transition-transform hover:-translate-y-1">{item}</span>)}</div></div></section>}
        </div>
      </section>

      {/* App highlight banner */}
      <div className="bienestar-app-banner bg-gradient-to-br from-[#131739] to-[#173C6E] rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 mb-9 sm:mb-14 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-1/4 w-40 h-40 bg-[#EBC302]/10 rounded-full translate-y-1/2" />
        <div className="relative grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <div className="inline-flex rounded-xl bg-white p-2 shadow-lg">
                <img src={redVitalLogo} alt="RedVital Total" className="h-11 w-auto" />
              </div>
              <div className="inline-flex items-center gap-2 bg-[#EBC302]/20 border border-[#EBC302]/40 rounded-full px-3 py-1">
                <div className="w-2 h-2 rounded-full bg-[#EBC302] animate-pulse" />
                <span className="text-[#F7F0FF] text-xs font-bold uppercase tracking-widest">App oficial</span>
              </div>
            </div>
            <h3 className="text-white font-bold text-2xl md:text-3xl mb-4 leading-tight">
              Descarga la App<br />
              <span className="text-[#EBC302]">Red Vital</span> y gestiona<br />
              todo desde tu celular
            </h3>
            <p className="text-[#F7F0FF] text-sm leading-relaxed mb-6">
              Pensando en tu bienestar, COOVITEL pone a tu disposición un programa de asistencias que te brinda respaldo en salud, hogar, vehículo y mascotas, con atención oportuna y acceso fácil a través de la aplicación Red Vital.
            </p>

            <div className="space-y-2 mb-8">
              {[
                "Un solo punto de acceso para todas tus asistencias.",
                "Atención especializada según el servicio requerido.",
                "Consulta las condiciones, coberturas y eventos de cada asistencia.",
                "Reporta requerimientos de forma rápida y sencilla.",
                "Lleva tus asistencias siempre a la mano desde tu dispositivo móvil.",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-[#F7F0FF] text-sm">
                  <svg className="w-4 h-4 text-[#EBC302] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Google Play */}
              <a
                href="https://play.google.com/store/apps/details?id=redvitalapp.laaseguradora.com&hl=es_CO"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-[#131739] hover:bg-[#173C6E] border border-[#C9DCFF] rounded-xl px-4 py-3 transition-all hover:scale-105"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#F7F0FF]"><GooglePlayIcon className="h-6 w-6" /></span>
                <div>
                  <div className="text-white/60 text-[10px] leading-none mb-0.5">Disponible en</div>
                  <div className="text-white font-semibold text-sm leading-none">Google Play</div>
                </div>
              </a>

              {/* App Store */}
              <a
                href="https://apps.apple.com/co/app/red-vital-app/id1643637462"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-black hover:bg-gray-900 border border-white/20 rounded-xl px-4 py-3 transition-all hover:scale-105"
              >
                <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="white">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <div className="text-white/60 text-[10px] leading-none mb-0.5">Descarga en</div>
                  <div className="text-white font-semibold text-sm leading-none">App Store</div>
                </div>
              </a>
            </div>
          </div>

          {/* App screens */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative">
              <div className="w-48 sm:w-64 rounded-[2.3rem] sm:rounded-[2.7rem] border-[7px] sm:border-[9px] border-[#C9DCFF]/40 bg-[#131739] p-2 shadow-2xl">
                <div className="overflow-hidden rounded-[2rem] bg-white">
                  <div className="flex h-7 items-center justify-center bg-[#173C6E]"><span className="h-1.5 w-16 rounded-full bg-white/40" /></div>
                  <img key={screen.src} src={screen.src} alt={screen.alt} className="redvital-screen h-72 sm:h-[23rem] w-full object-cover object-top" />
                </div>
              </div>
              <div className="absolute -bottom-3 -right-1 sm:-right-5 rounded-xl bg-[#EBC302] px-3 py-2 text-center text-white shadow-lg"><div className="font-bold text-sm">RedVital</div><div className="text-[10px] opacity-90">App oficial</div></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

function AuxiliosCooperativos() {
  return (
    <div className="bienestar-section bienestar-auxilios max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-9 sm:py-14">
      <div className="text-center mb-12">
          <span className="text-[#173C6E] text-xs font-bold uppercase tracking-widest">Auxilios Cooperativos</span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#173C6E] mt-2 mb-4">
          Respaldo solidario<br />en momentos difíciles
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
          Conoce los auxilios económicos disponibles para el asociado y su familia, sujetos a las condiciones vigentes de la cooperativa.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="bg-[#173C6E] px-6 py-4">
            <h3 className="text-white font-bold text-lg">Auxilios disponibles</h3>
            <p className="text-white/60 text-sm">Apoyos económicos para nuestros asociados</p>
          </div>
          <div className="divide-y divide-gray-50">
            {EXEQUIAL_FEATURES.map((item) => (
              <div key={item.label} className="bienestar-aux-row flex flex-col items-start justify-between gap-2 px-4 sm:flex-row sm:items-center sm:gap-4 sm:px-6 py-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#EBC302]" />
                  <span className="text-gray-700 text-sm font-medium">{item.label}</span>
                </div>
                <span className="shrink-0 text-[#173C6E] text-sm font-semibold bg-[#173C6E]/8 rounded-full px-3 py-0.5">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-[#F7F0FF] rounded-2xl p-6 border border-[#173C6E]/10">
            <h4 className="font-bold text-[#173C6E] text-base mb-3">Información importante</h4>
            <p className="text-sm leading-relaxed text-gray-600">Los auxilios se otorgan de acuerdo con el reglamento vigente, los soportes requeridos y la validación de cada caso. Los auxilios por enfermedad o calamidad están sujetos a verificación con Atención al Asociado.</p>
            <p className="mt-4 border-t border-[#C9DCFF] pt-4 text-xs font-semibold text-[#1B65A6]">Sujeto a términos y condiciones.</p>
          </div>
          <div className="bg-[#EBC302]/12 border border-[#EBC302]/30 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📞</span>
              <div>
                <h4 className="font-bold text-[#173C6E] text-sm mb-1">Canal de orientación</h4>
                <p className="text-gray-600 text-sm">En el momento que lo necesites, nuestro equipo está disponible para orientarte y activar el servicio.</p>
                <a href="tel:018000967474" className="mt-2 inline-block text-[#173C6E] font-bold text-base">01 8000 967474</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Bienestar() {
  const [activeTab, setActiveTab] = useState<Tab>("redvital");

  return (
    <div className="bienestar-page min-h-full bg-white flex flex-col">
      
      <HeroBanner activeTab={activeTab} />
      <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 bg-white">
        {activeTab === "sociales" && <BeneficiosSociales />}
        {activeTab === "redvital" && <RedVital />}
        {activeTab === "exequial" && <AuxiliosCooperativos />}
      </main>

      
    </div>
  );
}
