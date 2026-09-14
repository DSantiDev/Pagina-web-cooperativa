import { useRef, useState } from "react";
import { getCoovitelYears } from "../lib/brand";
import { NAME_PATTERN, PHONE_PATTERN, clearFieldError, sanitizeName, sanitizePhone, showFieldError } from "../lib/formValidation";

const COOVITEL_YEARS = getCoovitelYears();

type Section =
  | "historia"
  | "mision-vision"
  | "normativa"
  | "gobierno"
  | "trabaja";

type MenuGroup = {
  id: Section;
  label: string;
  children?: { id: Section; label: string }[];
};

const menu: MenuGroup[] = [
  {
    id: "historia",
    label: "Historia de COOVITEL",
    children: [{ id: "mision-vision", label: "Misión y Visión" }],
  },
  {
    id: "normativa",
    label: "Normativa",
    children: [
      { id: "gobierno", label: "Gobierno Corporativo" },
    ],
  },
  {
    id: "trabaja",
    label: "Trabaja con Nosotros",
  },
];

function HeroSection() {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, var(--coovitel-dark) 0%, var(--coovitel-blue) 60%, #27548F 100%)",
        minHeight: "260px",
      }}
    >
      {/* Decorative circles */}
      <div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10"
        style={{ background: "var(--coovitel-gold)" }}
      />
      <div
        className="absolute bottom-10 left-1/3 w-48 h-48 rounded-full opacity-5"
        style={{ background: "#F7F0FF" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-10 pb-20">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4"
          style={{ background: "rgba(245,166,35,0.15)", border: "1px solid rgba(245,166,35,0.4)", color: "var(--coovitel-gold)", fontFamily: "Poppins, sans-serif" }}
        >
          + COOPERATIVA · {COOVITEL_YEARS} AÑOS DE CONFIANZA
        </div>

        <h1
          className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Una historia de solidaridad
          <br />
          <span style={{ color: "var(--coovitel-gold)" }}>que transforma vidas</span>
        </h1>
        <p className="text-white/70 text-base max-w-xl">
          Somos una organización solidaria que lleva {COOVITEL_YEARS} años construyendo bienestar financiero con transparencia, responsabilidad y vocación de servicio.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-8 mt-8">
          {[
            { value: `${COOVITEL_YEARS}+`, label: "Años" },
            { value: "17K+", label: "Asociados" },
            { value: "9", label: "Ciudades" },
            { value: "200+", label: "Empresas" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
                {s.value}
              </div>
              <div className="text-white/60 text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" style={{ display: "block" }}>
          <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" fill="var(--coovitel-light)" />
        </svg>
      </div>
    </div>
  );
}

// ─── Content sections ────────────────────────────────────────────────────────

function HistoriaContent() {
  const milestones = [
    { year: "1962", text: "Se fundó la Cooperativa de Vivienda de los Trabajadores Telecom LTDA por 51 asociados con un capital de $15.000." },
    { year: "1970–1988", text: "Cooperativa Especializada de Vivienda de los Trabajadores de la Empresa Nacional de Telecomunicaciones." },
    { year: "1989–2004", text: "Cooperativa Integral de Construcción y Vivienda de los trabajadores de Telecom–COOVITEL." },
    { year: "2004–2013", text: "Cooperativa Multiactiva Empresarial Coovitel." },
    { year: "2013", text: "Autorización para ejercer la actividad financiera." },
    { year: "2014", text: "Transformación corporativa, evolución de la marca y cambio de estructura a primer piso." },
    { year: "2019", text: "Certificación de Calidad con Bureau Veritas y calificación A– en Fortaleza Institucional." },
    { year: "2019–2020", text: "Salvamentos a cooperativas: Copinke y Coopservicios." },
    { year: "2022", text: "Fortalecimiento de canales y tecnología." },
    { year: "2023", text: "Mejoramiento de la calificación de fortaleza institucional y de deuda, e incorporación de Coolever." },
    { year: "2024", text: "Inversión en papeles comerciales con un subyacente de cartera de autos." },
    { year: "2025", text: "Incorporación de Cooperativa Compartir y transformación digital. Se mantienen las calificaciones de fortaleza y deuda." },
  ];
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--coovitel-gold)" }}>HISTORIA DE COOVITEL</span>
      </div>
      <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--coovitel-navy)", fontFamily: "Poppins, sans-serif" }}>
        62 años construyendo <span style={{ color: "var(--coovitel-blue)" }}>confianza</span>
      </h2>
      <p className="text-gray-600 mb-10 leading-relaxed max-w-2xl">
        COOVITEL nació con la misión de ofrecer soluciones financieras solidarias a trabajadores colombianos. A lo largo de seis décadas hemos crecido junto a nuestros asociados, adaptándonos a los cambios del entorno y manteniéndonos fieles a los principios cooperativos.
      </p>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5" style={{ background: "var(--coovitel-blue)", opacity: 0.15 }} />
        <div className="space-y-8 pl-12">
          {milestones.map((m, i) => (
            <div key={i} className="relative">
              <div
                className="absolute -left-12 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ background: i === milestones.length - 1 ? "var(--coovitel-gold)" : "var(--coovitel-blue)", fontFamily: "Poppins, sans-serif" }}
              >
                {i + 1}
              </div>
              <div
                className="rounded-xl p-5 border"
                style={{
                  background: i === milestones.length - 1 ? "rgba(245,166,35,0.05)" : "#F7F0FF",
                  borderColor: i === milestones.length - 1 ? "rgba(245,166,35,0.3)" : "#C9DCFF",
                }}
              >
                <span
                  className="text-sm font-bold mb-1 block"
                  style={{ color: "var(--coovitel-gold)", fontFamily: "Poppins, sans-serif" }}
                >
                  {m.year}
                </span>
                <p className="text-gray-600 text-sm leading-relaxed">{m.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MisionVisionContent() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--coovitel-gold)" }}>PROPÓSITO INSTITUCIONAL</span>
      </div>
      <h2 className="text-3xl font-bold mb-8" style={{ color: "var(--coovitel-navy)", fontFamily: "Poppins, sans-serif" }}>
        Misión y Visión
      </h2>
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div
          className="rounded-2xl p-8"
          style={{ background: "linear-gradient(135deg, var(--coovitel-dark), var(--coovitel-blue))" }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-2xl"
            style={{ background: "rgba(245,166,35,0.2)" }}
          >
            🎯
          </div>
          <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>Misión</h3>
          <p className="text-white/80 text-sm leading-relaxed">
            Somos una Cooperativa de ahorro y crédito que brinda acompañamiento cercano y oportunidades de inclusión a nuestros asociados y sus familias, a través de soluciones financieras y sociales accesibles, eficientes y de calidad, promoviendo el ahorro, el crédito responsable y el progreso social para mejorar su calidad de vida.
          </p>
        </div>
        <div
          className="rounded-2xl p-8"
          style={{ background: "linear-gradient(135deg, #EBC302, #EBC302)" }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-2xl"
            style={{ background: "rgba(255,255,255,0.2)" }}
          >
            🔭
          </div>
          <h3 className="text-xl font-bold mb-3" style={{ color: "var(--coovitel-dark)", fontFamily: "Poppins, sans-serif" }}>Visión</h3>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(9,9,80,0.8)" }}>
            Coovitel será reconocida en 2030 como una Cooperativa sólida, competitiva y cercana, que promueve la cultura del ahorro y la inclusión financiera mediante soluciones financieras y sociales accesibles y rentables, ofreciendo experiencias ágiles y confiables, soportadas en la innovación tecnológica, la gestión del conocimiento y prácticas sostenibles que generen valor.
          </p>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-5" style={{ color: "var(--coovitel-navy)", fontFamily: "Poppins, sans-serif" }}>
        Valores institucionales
      </h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { icon: "🤝", title: "Solidaridad", desc: "Actuamos con vocación de servicio y apoyo mutuo entre asociados, colaboradores y comunidades." },
          { icon: "🔍", title: "Transparencia", desc: "Comunicamos con honestidad y claridad toda información relevante." },
          { icon: "⚖️", title: "Equidad", desc: "Promovemos un trato justo e igualitario para todos nuestros asociados." },
          { icon: "🌱", title: "Responsabilidad", desc: "Asumimos con compromiso nuestras decisiones hacia los asociados y la sociedad." },
          { icon: "💡", title: "Innovación", desc: "Buscamos nuevas y mejores formas de servir a nuestros asociados." },
          { icon: "🏆", title: "Excelencia", desc: "Trabajamos por la mejora continua de nuestros servicios y procesos." },
        ].map((item, i) => (
          <div key={i} className="rounded-xl p-5 border border-gray-100 flex gap-4 bg-white">
            <span className="text-2xl">{item.icon}</span>
            <div>
              <h4 className="font-semibold text-sm mb-1" style={{ color: "var(--coovitel-navy)", fontFamily: "Poppins, sans-serif" }}>{item.title}</h4>
              <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}




function GobiernoContent() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--coovitel-gold)" }}>NORMATIVA</span>
      </div>
      <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--coovitel-navy)", fontFamily: "Poppins, sans-serif" }}>
        Gobierno Corporativo
      </h2>
      <p className="text-gray-600 mb-8 leading-relaxed max-w-2xl">
        COOVITEL cuenta con una estructura de gobierno sólida y transparente que garantiza la participación democrática de los asociados y el cumplimiento normativo ante Supersolidaria.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {[
          { title: "Asamblea General", icon: "🏛️", desc: "Máximo órgano de dirección. Compuesta por todos los delegados elegidos democráticamente por los asociados. Se reúne ordinariamente cada año." },
          { title: "Consejo de Administración", icon: "📋", desc: "Órgano de dirección permanente elegido por la Asamblea. Responsable de la gestión estratégica y la supervisión de la administración." },
          { title: "Junta de Vigilancia", icon: "🔎", desc: "Órgano de control interno que vela por el cumplimiento de los estatutos, normas legales y acuerdos de la Asamblea." },
          { title: "Revisoría Fiscal", icon: "📊", desc: "Control externo independiente que certifica la razonabilidad de los estados financieros y el cumplimiento de normas contables." },
        ].map((org, i) => (
          <div key={i} className="rounded-xl p-6 border border-gray-100 bg-white flex gap-4">
            <span className="text-3xl">{org.icon}</span>
            <div>
              <h3 className="font-bold mb-2 text-sm" style={{ color: "var(--coovitel-navy)", fontFamily: "Poppins, sans-serif" }}>{org.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{org.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div
        className="rounded-2xl p-6 flex items-start gap-4"
        style={{ background: "rgba(26,26,175,0.05)", border: "1px solid rgba(26,26,175,0.1)" }}
      >
        <div className="text-2xl">📄</div>
        <div>
          <h3 className="font-bold text-sm mb-1" style={{ color: "var(--coovitel-navy)", fontFamily: "Poppins, sans-serif" }}>
            Informes de Gestión
          </h3>
          <p className="text-gray-500 text-xs leading-relaxed mb-3">
            Consulta los informes anuales de gestión, estados financieros auditados y actas de Asamblea General disponibles para nuestros asociados.
          </p>
          <a href="/confianza?section=informes"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white"
            style={{ background: "var(--coovitel-blue)", fontFamily: "Poppins, sans-serif" }}
          >
            Descargar informes →
          </a>
        </div>
      </div>
    </div>
  );
}


function TrabajaContent() {
  const [form, setForm] = useState({
    nombre: "", apellido: "", email: "", telefono: "",
    ciudad: "", cargo: "", experiencia: "", mensaje: "", archivo: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setResumeFile = (file?: File) => {
    const allowedExtensions = ["pdf", "doc", "docx"];
    const extension = file?.name.split(".").pop()?.toLowerCase();
    const error = !file
      ? "Selecciona tu hoja de vida."
      : !extension || !allowedExtensions.includes(extension)
        ? "Solo puedes cargar archivos PDF, DOC o DOCX."
        : file.size > 5 * 1024 * 1024
          ? "La hoja de vida debe pesar máximo 5 MB."
          : "";

    setFileError(error);
    setForm({ ...form, archivo: error ? "" : file?.name ?? "" });
    if (fileInputRef.current) fileInputRef.current.setCustomValidity(error);
  };

  const clearResumeFile = () => {
    setFileError("");
    setForm({ ...form, archivo: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.setCustomValidity("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = name === "nombre" || name === "apellido"
      ? sanitizeName(value)
      : name === "telefono"
        ? sanitizePhone(value)
        : value;
    setForm({ ...form, [name]: sanitizedValue });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-6"
          style={{ background: "rgba(245,166,35,0.15)" }}
        >
          ✅
        </div>
        <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--coovitel-navy)", fontFamily: "Poppins, sans-serif" }}>
          ¡Postulación enviada!
        </h2>
        <p className="text-gray-500 max-w-md mb-6">
          Hemos recibido tu hoja de vida. Nuestro equipo de Talento Humano la revisará y se pondrá en contacto contigo si hay una oportunidad que se ajuste a tu perfil.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-2.5 rounded-full text-sm font-semibold text-white"
          style={{ background: "var(--coovitel-blue)", fontFamily: "Poppins, sans-serif" }}
        >
          Enviar otra postulación
        </button>
      </div>
    );
  }

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-colors bg-white text-gray-700";
  const labelClass = "block text-xs font-semibold mb-1.5 text-gray-600";

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--coovitel-gold)" }}>ÚNETE A NUESTRO EQUIPO</span>
      </div>
      <h2 className="text-3xl font-bold mb-2" style={{ color: "var(--coovitel-navy)", fontFamily: "Poppins, sans-serif" }}>
        Trabaja con Nosotros
      </h2>
      <p className="text-gray-600 mb-8 leading-relaxed max-w-2xl">
        En COOVITEL creemos que nuestro mayor activo son las personas. Si quieres crecer profesionalmente en un entorno cooperativo, solidario y en constante evolución, deja aquí tu información.
      </p>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {[
          { icon: "🌱", title: "Crecimiento profesional", desc: "Planes de carrera y formación continua." },
          { icon: "❤️", title: "Bienestar integral", desc: "Beneficios en salud, deporte y familia." },
          { icon: "🤝", title: "Cultura cooperativa", desc: "Ambiente de trabajo colaborativo y humano." },
        ].map((b, i) => (
          <div key={i} className="rounded-xl p-4 border border-gray-100 bg-white text-center">
            <span className="text-2xl block mb-2">{b.icon}</span>
            <h4 className="font-semibold text-xs mb-1" style={{ color: "var(--coovitel-navy)", fontFamily: "Poppins, sans-serif" }}>{b.title}</h4>
            <p className="text-gray-400 text-xs">{b.desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-8">
        <h3 className="font-bold text-lg mb-6" style={{ color: "var(--coovitel-navy)", fontFamily: "Poppins, sans-serif" }}>
          Formulario de postulación
        </h3>
        <form onSubmit={handleSubmit} onInvalid={showFieldError} onInput={clearFieldError} className="form-validation space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Nombre *</label>
              <input name="nombre" value={form.nombre} onChange={handleChange} required pattern={NAME_PATTERN} minLength={2} autoComplete="given-name" className={inputClass} placeholder="Tu nombre" />
            </div>
            <div>
              <label className={labelClass}>Apellido *</label>
              <input name="apellido" value={form.apellido} onChange={handleChange} required pattern={NAME_PATTERN} minLength={2} autoComplete="family-name" className={inputClass} placeholder="Tu apellido" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Correo electrónico *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required autoComplete="email" className={inputClass} placeholder="correo@ejemplo.com" />
            </div>
            <div>
              <label className={labelClass}>Teléfono *</label>
              <input name="telefono" type="tel" value={form.telefono} onChange={handleChange} required inputMode="numeric" pattern={PHONE_PATTERN} minLength={10} maxLength={10} className={inputClass} placeholder="3000000000" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Ciudad de residencia *</label>
              <select name="ciudad" value={form.ciudad} onChange={handleChange} required className={inputClass}>
                <option value="">Selecciona tu ciudad</option>
                {["Bogotá", "Tunja", "Barranquilla", "Cúcuta", "Cali", "Bucaramanga", "Medellín", "Manizales", "Ibagué", "Otra"].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Cargo de interés *</label>
              <select name="cargo" value={form.cargo} onChange={handleChange} required className={inputClass}>
                <option value="">Selecciona un área</option>
                {["Atención al Asociado", "Crédito y Cartera", "Tecnología e Innovación", "Contabilidad y Finanzas", "Talento Humano", "Mercadeo y Comunicaciones", "Dirección y Gerencia"].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Años de experiencia</label>
            <select name="experiencia" value={form.experiencia} onChange={handleChange} className={inputClass}>
              <option value="">Selecciona</option>
              {["Sin experiencia (recién graduado)", "1-2 años", "3-5 años", "5-10 años", "Más de 10 años"].map(e => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Cuéntanos sobre ti</label>
            <textarea
              name="mensaje"
              value={form.mensaje}
              onChange={handleChange}
              rows={4}
              className={inputClass}
              placeholder="Describe brevemente tu perfil, tus motivaciones para unirte a COOVITEL y qué puedes aportar..."
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="hoja-de-vida">Adjuntar hoja de vida *</label>
            <div
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${form.archivo ? "bg-[#F3F8E9]" : "cursor-pointer"}`}
              style={{ borderColor: "#C9DCFF" }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); setResumeFile(e.dataTransfer.files[0]); }}
            >
              <div className="text-2xl mb-2">📎</div>
              {form.archivo ? <><p className="text-sm font-bold text-[#173C6E] break-all">✓ {form.archivo}</p><button type="button" onClick={clearResumeFile} className="mt-3 text-xs font-bold text-[#B91C1C] underline">Quitar archivo</button></> : <><button type="button" onClick={() => fileInputRef.current?.click()} className="text-xs text-gray-500">Arrastra tu archivo aquí o <span style={{ color: "var(--coovitel-blue)" }} className="font-semibold">haz clic para subir</span></button><p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX – Máximo 5MB</p></>}
              {fileError && <p className="mt-2 text-xs font-semibold text-[#B91C1C]">{fileError}</p>}
              <input ref={fileInputRef} id="hoja-de-vida" name="archivo" type="file" required accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="sr-only" onChange={(e) => setResumeFile(e.target.files?.[0])} />
            </div>
          </div>
          <div className="flex items-start gap-3">
            <input type="checkbox" required id="politica" className="mt-0.5 w-4 h-4" />
            <label htmlFor="politica" className="text-xs text-gray-500 leading-relaxed">
              Acepto la <span style={{ color: "var(--coovitel-blue)" }} className="font-semibold cursor-pointer">Política de Tratamiento de Datos Personales</span> de COOVITEL y autorizo el uso de mi información para procesos de selección.
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(90deg, var(--coovitel-navy), var(--coovitel-blue))", fontFamily: "Poppins, sans-serif" }}
          >
            Enviar postulación
          </button>
        </form>
      </div>
    </div>
  );
}

const contentMap: Record<Section, React.ReactNode> = {
  historia: <HistoriaContent />,
  "mision-vision": <MisionVisionContent />,
  normativa: <GobiernoContent />,
  gobierno: <GobiernoContent />,
  trabaja: <TrabajaContent />,
};

function Sidebar({ active, setActive }: { active: Section; setActive: (s: Section) => void }) {
  const [open, setOpen] = useState<Section[]>(["historia", "normativa"]);

  const toggle = (id: Section) => {
    setOpen((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white sticky top-6">
        <div
          className="px-5 py-4 text-xs font-bold tracking-widest uppercase text-white"
          style={{ background: "var(--coovitel-navy)" }}
        >
          Quiénes Somos
        </div>
        <nav className="p-2">
          {menu.map((group) => (
            <div key={group.id}>
              <button
                className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors text-sm font-semibold"
                style={{
                  color: active === group.id || (group.children?.some((c) => c.id === active)) ? "var(--coovitel-blue)" : "#1A2842",
                  background: active === group.id ? "rgba(26,26,175,0.07)" : "transparent",
                  fontFamily: "Poppins, sans-serif",
                }}
                aria-expanded={group.children ? open.includes(group.id) : undefined}
                onClick={() => {
                  setActive(group.id);
                  if (group.children) toggle(group.id);
                }}
              >
                <span>{group.label}</span>
                {group.children && (
                  <span
                    className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[#81A1DB] bg-white text-[#173C6E] shadow-sm transition-all duration-200"
                    style={{ transform: open.includes(group.id) ? "rotate(180deg)" : "none" }}
                    aria-hidden="true"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="m7 10 5 5 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                )}
              </button>
              {group.children && open.includes(group.id) && (
                <div className="ml-3 pl-3 border-l-2 mb-1" style={{ borderColor: "rgba(26,26,175,0.1)" }}>
                  {group.children.map((child) => (
                    <button
                      key={child.id}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs transition-colors"
                      style={{
                        color: active === child.id ? "var(--coovitel-blue)" : "#1A2842",
                        background: active === child.id ? "rgba(26,26,175,0.07)" : "transparent",
                        fontWeight: active === child.id ? 600 : 400,
                        fontFamily: "Poppins, sans-serif",
                      }}
                      onClick={() => setActive(child.id)}
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 m-3 rounded-xl" style={{ background: "linear-gradient(135deg, var(--coovitel-gold), #EBC302)" }}>
          <p className="text-xs font-bold mb-1" style={{ color: "var(--coovitel-dark)", fontFamily: "Poppins, sans-serif" }}>¿Quieres ser asociado?</p>
          <p className="text-xs mb-3" style={{ color: "rgba(9,9,80,0.7)" }}>Accede a todos los beneficios de COOVITEL.</p>
          <button
            onClick={() => { window.location.href = "/asociate" }} className="w-full py-2 rounded-lg text-xs font-bold"
            style={{ background: "var(--coovitel-dark)", color: "#F7F0FF", fontFamily: "Poppins, sans-serif" }}
          >
            Asóciate →
          </button>
        </div>
      </div>
    </aside>
  );
}

export default function QuienesSomos() {
  const routeSection = new URLSearchParams(window.location.search).get("section");
  const initialSection: Section = routeSection === "mision-vision" || routeSection === "normativa" || routeSection === "gobierno" || routeSection === "trabaja" ? routeSection : "historia";
  const [active, setActive] = useState<Section>(initialSection);

  return (
    <div className="min-h-full flex flex-col" style={{ background: "var(--coovitel-light)" }}>
      
      <HeroSection />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <Sidebar active={active} setActive={setActive} />
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              {contentMap[active]}
            </div>
          </div>
        </div>
      </main>

      
    </div>
  );
}
