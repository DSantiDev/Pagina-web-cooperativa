import { useState } from "react";

type Section =
  | "historia"
  | "mision-vision"
  | "modelo-cooperativo"
  | "principios"
  | "valores"
  | "normativa"
  | "gobierno"
  | "estatutos"
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
    id: "modelo-cooperativo",
    label: "Modelo Cooperativo",
    children: [
      { id: "principios", label: "Principios Cooperativos" },
      { id: "valores", label: "Valores Institucionales" },
    ],
  },
  {
    id: "normativa",
    label: "Normativa",
    children: [
      { id: "gobierno", label: "Gobierno Corporativo" },
      { id: "estatutos", label: "Estatutos" },
    ],
  },
  {
    id: "trabaja",
    label: "Trabaja con Nosotros",
  },
];

function NavBar() {
  const navLinks = ["Inicio", "Productos", "Quiénes Somos", "Confianza", "Beneficios", "Contacto"];
  return (
    <header style={{ background: "#F7F0FF", borderBottom: "1px solid #C9DCFF" }}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ background: "var(--coovitel-gold)" }}
          >
            CV
          </div>
          <div>
            <div className="font-bold text-lg leading-tight" style={{ color: "var(--coovitel-navy)", fontFamily: "Poppins, sans-serif" }}>
              COOVITEL
            </div>
            <div className="text-[9px] leading-tight" style={{ color: "#1A2842" }}>
              Cooperativa Empresarial de Ahorro y Crédito
            </div>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-medium transition-colors"
              style={{
                color: link === "Quiénes Somos" ? "var(--coovitel-blue)" : "#1A2842",
                fontFamily: "Poppins, sans-serif",
                borderBottom: link === "Quiénes Somos" ? "2px solid var(--coovitel-gold)" : "none",
                paddingBottom: link === "Quiénes Somos" ? "2px" : "0",
              }}
            >
              {link}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden md:inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border-2 transition-colors"
            style={{ borderColor: "var(--coovitel-navy)", color: "var(--coovitel-navy)", fontFamily: "Poppins, sans-serif" }}
          >
            Oficina Virtual
          </a>
          <a
            href="#"
            className="hidden md:inline-flex items-center px-5 py-2 rounded-full text-sm font-bold text-white transition-colors"
            style={{ background: "var(--coovitel-gold)", color: "#131739", fontFamily: "Poppins, sans-serif" }}
          >
            Asóciate
          </a>
        </div>
      </div>
    </header>
  );
}

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
          + COOPERATIVA · 64 AÑOS DE CONFIANZA
        </div>

        <h1
          className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Conócenos: más que una
          <br />
          <span style={{ color: "var(--coovitel-gold)" }}>cooperativa financiera</span>
        </h1>
        <p className="text-white/70 text-base max-w-xl">
          Somos una organización solidaria que lleva 64 años construyendo bienestar financiero con transparencia, responsabilidad y vocación de servicio.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-8 mt-8">
          {[
            { value: "64+", label: "Años" },
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
    { year: "1960", text: "Fundación de COOVITEL por un grupo de trabajadores del sector de telecomunicaciones con el propósito de generar bienestar colectivo." },
    { year: "1975", text: "Expansión a nuevas ciudades del país, llegando a Medellín, Cali y Barranquilla con nuevas oficinas de atención." },
    { year: "1990", text: "Obtención de la certificación de calidad y ampliación del portafolio de servicios de ahorro y crédito." },
    { year: "2005", text: "Lanzamiento de la plataforma digital y oficina virtual, marcando el inicio de la transformación tecnológica." },
    { year: "2015", text: "Certificación ISO 9001:2015 por Bureau Veritas. Reconocimiento A+ de Value & Risk." },
    { year: "2024", text: "Con 17.000+ asociados activos y presencia en 9 ciudades, COOVITEL se consolida como una de las cooperativas financieras más importantes de Colombia." },
  ];
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--coovitel-gold)" }}>HISTORIA DE COOVITEL</span>
      </div>
      <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--coovitel-navy)", fontFamily: "Poppins, sans-serif" }}>
        64 años construyendo <span style={{ color: "var(--coovitel-blue)" }}>confianza</span>
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
            Generar bienestar financiero y social a nuestros asociados, sus familias y comunidades, a través de productos y servicios cooperativos de calidad, fundamentados en la solidaridad, la transparencia y la innovación continua, contribuyendo al desarrollo sostenible de Colombia.
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
            Para 2030, ser la cooperativa financiera más reconocida de Colombia por su impacto social, solidez patrimonial e innovación digital, con presencia nacional y referente latinoamericano en el modelo cooperativo de ahorro y crédito.
          </p>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-5" style={{ color: "var(--coovitel-navy)", fontFamily: "Poppins, sans-serif" }}>
        Nuestros objetivos estratégicos
      </h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { icon: "💼", title: "Solidez financiera", desc: "Mantener indicadores de solvencia y liquidez superiores a los exigidos por la normativa vigente." },
          { icon: "🤝", title: "Servicio asociado", desc: "Brindar atención de alta calidad con tiempos de respuesta ágiles y soluciones personalizadas." },
          { icon: "🌱", title: "Responsabilidad social", desc: "Desarrollar programas de educación financiera y bienestar para nuestros asociados y comunidades." },
          { icon: "💡", title: "Transformación digital", desc: "Implementar tecnología de vanguardia para mejorar la experiencia del asociado." },
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

function ModeloCooperativoContent() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--coovitel-gold)" }}>MODELO COOPERATIVO</span>
      </div>
      <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--coovitel-navy)", fontFamily: "Poppins, sans-serif" }}>
        El modelo que nos une
      </h2>
      <p className="text-gray-600 mb-8 leading-relaxed max-w-2xl">
        El cooperativismo es una forma de organización económica y social basada en la colaboración mutua. En COOVITEL aplicamos el modelo cooperativo internacional adoptado por la Alianza Cooperativa Internacional.
      </p>
      <div
        className="rounded-2xl p-8 mb-8"
        style={{ background: "linear-gradient(135deg, var(--coovitel-dark) 0%, var(--coovitel-blue) 100%)" }}
      >
        <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
          ¿Qué es una cooperativa?
        </h3>
        <p className="text-white/70 text-sm leading-relaxed">
          Una cooperativa es una asociación autónoma de personas que se han unido voluntariamente para satisfacer sus necesidades y aspiraciones económicas, sociales y culturales en común, mediante una empresa de propiedad conjunta y de gestión democrática.
        </p>
      </div>
      <div className="grid sm:grid-cols-3 gap-5">
        {[
          { icon: "👥", title: "Propiedad conjunta", desc: "Los asociados son dueños de la cooperativa y participan en sus beneficios." },
          { icon: "🗳️", title: "Gestión democrática", desc: "Cada asociado tiene voz y voto en las decisiones de la organización." },
          { icon: "🌐", title: "Interés comunitario", desc: "Trabajamos para el bienestar de los asociados y sus comunidades." },
        ].map((item, i) => (
          <div key={i} className="rounded-xl p-6 text-center border border-gray-100 bg-white">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4"
              style={{ background: "rgba(26,26,175,0.07)" }}
            >
              {item.icon}
            </div>
            <h4 className="font-semibold mb-2 text-sm" style={{ color: "var(--coovitel-navy)", fontFamily: "Poppins, sans-serif" }}>{item.title}</h4>
            <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PrincipiosContent() {
  const principios = [
    { num: "01", title: "Membresía abierta y voluntaria", desc: "Las cooperativas son organizaciones voluntarias abiertas para todas aquellas personas dispuestas a utilizar sus servicios y aceptar las responsabilidades que conlleva la membresía." },
    { num: "02", title: "Control democrático de los miembros", desc: "Las cooperativas son organizaciones democráticas controladas por sus miembros quienes participan activamente en la definición de las políticas y en la toma de decisiones." },
    { num: "03", title: "Participación económica de los miembros", desc: "Los miembros contribuyen de manera equitativa y controlan de manera democrática el capital de la cooperativa." },
    { num: "04", title: "Autonomía e independencia", desc: "Las cooperativas son organizaciones autónomas de ayuda mutua, controladas por sus miembros." },
    { num: "05", title: "Educación, formación e información", desc: "Las cooperativas brindan educación y formación a sus miembros, representantes, directivos y empleados." },
    { num: "06", title: "Cooperación entre cooperativas", desc: "Las cooperativas sirven a sus miembros más eficazmente y fortalecen el movimiento cooperativo trabajando de manera conjunta." },
    { num: "07", title: "Compromiso con la comunidad", desc: "La cooperativa trabaja para el desarrollo sostenible de su comunidad por medio de políticas aceptadas por sus miembros." },
  ];
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--coovitel-gold)" }}>ALIANZA COOPERATIVA INTERNACIONAL</span>
      </div>
      <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--coovitel-navy)", fontFamily: "Poppins, sans-serif" }}>
        7 Principios Cooperativos
      </h2>
      <p className="text-gray-600 mb-8 leading-relaxed max-w-2xl">
        Los principios cooperativos son las pautas mediante las cuales las cooperativas ponen en práctica sus valores. COOVITEL aplica estos principios en cada decisión y actividad.
      </p>
      <div className="space-y-4">
        {principios.map((p, i) => (
          <div
            key={i}
            className="rounded-xl p-5 border flex gap-5 items-start transition-all hover:shadow-md"
            style={{ borderColor: "#C9DCFF", background: "#F7F0FF" }}
          >
            <div
              className="text-2xl font-black shrink-0 w-10 text-center leading-none mt-1"
              style={{ color: "rgba(26,26,175,0.12)", fontFamily: "Poppins, sans-serif" }}
            >
              {p.num}
            </div>
            <div>
              <h3 className="font-bold text-sm mb-1" style={{ color: "var(--coovitel-navy)", fontFamily: "Poppins, sans-serif" }}>{p.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
            </div>
            <div
              className="shrink-0 w-1.5 self-stretch rounded-full"
              style={{ background: i === 0 ? "var(--coovitel-gold)" : "var(--coovitel-blue)", opacity: 0.5 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ValoresContent() {
  const valores = [
    { icon: "🤝", color: "#173C6E", title: "Solidaridad", desc: "Actuamos con vocación de servicio y apoyo mutuo entre asociados, colaboradores y comunidades." },
    { icon: "🔍", color: "#EBC302", title: "Transparencia", desc: "Comunicamos con honestidad y claridad toda información relevante para nuestros grupos de interés." },
    { icon: "⚖️", color: "#1B65A6", title: "Equidad", desc: "Garantizamos un trato justo e igualitario para todos nuestros asociados sin ningún tipo de discriminación." },
    { icon: "🌱", color: "#800080", title: "Responsabilidad", desc: "Asumimos con compromiso las consecuencias de nuestras decisiones hacia los asociados y la sociedad." },
    { icon: "💡", color: "#A90072", title: "Innovación", desc: "Buscamos continuamente nuevas y mejores formas de servir a nuestros asociados con soluciones digitales." },
    { icon: "🏆", color: "#EBC302", title: "Excelencia", desc: "Nos esforzamos por la mejora continua en la calidad de nuestros productos, servicios y procesos." },
  ];
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--coovitel-gold)" }}>CULTURA ORGANIZACIONAL</span>
      </div>
      <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--coovitel-navy)", fontFamily: "Poppins, sans-serif" }}>
        Valores Institucionales
      </h2>
      <p className="text-gray-600 mb-8 leading-relaxed max-w-2xl">
        Nuestros valores son el alma de COOVITEL. Guían el comportamiento de cada uno de nuestros colaboradores y orientan la manera en que nos relacionamos con nuestros asociados, aliados y la sociedad.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {valores.map((v, i) => (
          <div
            key={i}
            className="rounded-2xl p-6 border border-gray-100 bg-white transition-all hover:shadow-lg hover:-translate-y-0.5"
            style={{ transition: "all 0.2s" }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4"
              style={{ background: v.color + "15" }}
            >
              {v.icon}
            </div>
            <h3 className="font-bold mb-2" style={{ color: "var(--coovitel-navy)", fontFamily: "Poppins, sans-serif" }}>{v.title}</h3>
            <p className="text-gray-500 text-xs leading-relaxed">{v.desc}</p>
            <div className="mt-4 h-1 rounded-full" style={{ background: v.color, opacity: 0.3 }} />
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
          <button
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white"
            style={{ background: "var(--coovitel-blue)", fontFamily: "Poppins, sans-serif" }}
          >
            Descargar informes →
          </button>
        </div>
      </div>
    </div>
  );
}

function EstatutosContent() {
  const docs = [
    { title: "Estatutos de COOVITEL", date: "Actualización 2023", size: "2.4 MB", type: "PDF" },
    { title: "Reglamento de Crédito", date: "Actualización 2024", size: "1.8 MB", type: "PDF" },
    { title: "Reglamento de Ahorro", date: "Actualización 2024", size: "1.2 MB", type: "PDF" },
    { title: "Código de Buen Gobierno", date: "Actualización 2022", size: "3.1 MB", type: "PDF" },
    { title: "Política de Tratamiento de Datos", date: "Actualización 2023", size: "0.8 MB", type: "PDF" },
    { title: "Política SAGRILAFT", date: "Actualización 2024", size: "1.5 MB", type: "PDF" },
  ];
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--coovitel-gold)" }}>DOCUMENTOS NORMATIVOS</span>
      </div>
      <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--coovitel-navy)", fontFamily: "Poppins, sans-serif" }}>
        Estatutos y Reglamentos
      </h2>
      <p className="text-gray-600 mb-8 leading-relaxed max-w-2xl">
        COOVITEL opera bajo un marco normativo claro y transparente. Aquí encontrarás todos los documentos reglamentarios disponibles para consulta de nuestros asociados.
      </p>
      <div className="space-y-3">
        {docs.map((doc, i) => (
          <div
            key={i}
            className="rounded-xl p-5 border border-gray-100 bg-white flex items-center justify-between group hover:border-blue-200 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                style={{ background: "var(--coovitel-blue)" }}
              >
                {doc.type}
              </div>
              <div>
                <h3 className="font-semibold text-sm" style={{ color: "var(--coovitel-navy)", fontFamily: "Poppins, sans-serif" }}>{doc.title}</h3>
                <p className="text-gray-400 text-xs">{doc.date} · {doc.size}</p>
              </div>
            </div>
            <button
              className="text-xs font-semibold px-4 py-1.5 rounded-full transition-colors"
              style={{ color: "var(--coovitel-blue)", background: "rgba(26,26,175,0.07)", fontFamily: "Poppins, sans-serif" }}
            >
              Descargar
            </button>
          </div>
        ))}
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Nombre *</label>
              <input name="nombre" value={form.nombre} onChange={handleChange} required className={inputClass} placeholder="Tu nombre" />
            </div>
            <div>
              <label className={labelClass}>Apellido *</label>
              <input name="apellido" value={form.apellido} onChange={handleChange} required className={inputClass} placeholder="Tu apellido" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Correo electrónico *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required className={inputClass} placeholder="correo@ejemplo.com" />
            </div>
            <div>
              <label className={labelClass}>Teléfono *</label>
              <input name="telefono" type="tel" value={form.telefono} onChange={handleChange} required className={inputClass} placeholder="+57 300 000 0000" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Ciudad de residencia *</label>
              <select name="ciudad" value={form.ciudad} onChange={handleChange} required className={inputClass}>
                <option value="">Selecciona tu ciudad</option>
                {["Bogotá", "Medellín", "Cali", "Barranquilla", "Bucaramanga", "Cartagena", "Pereira", "Manizales", "Otra"].map(c => (
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
            <label className={labelClass}>Adjuntar hoja de vida</label>
            <div
              className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors"
              style={{ borderColor: "#C9DCFF" }}
            >
              <div className="text-2xl mb-2">📎</div>
              <p className="text-xs text-gray-500">Arrastra tu archivo aquí o <span style={{ color: "var(--coovitel-blue)" }} className="font-semibold">haz clic para subir</span></p>
              <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX – Máximo 5MB</p>
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
  "modelo-cooperativo": <ModeloCooperativoContent />,
  principios: <PrincipiosContent />,
  valores: <ValoresContent />,
  normativa: <GobiernoContent />,
  gobierno: <GobiernoContent />,
  estatutos: <EstatutosContent />,
  trabaja: <TrabajaContent />,
};

function Sidebar({ active, setActive }: { active: Section; setActive: (s: Section) => void }) {
  const [open, setOpen] = useState<Section[]>(["historia", "modelo-cooperativo", "normativa"]);

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
                onClick={() => {
                  setActive(group.id);
                  if (group.children) toggle(group.id);
                }}
              >
                <span>{group.label}</span>
                {group.children && (
                  <span
                    className="text-xs transition-transform"
                    style={{ transform: open.includes(group.id) ? "rotate(180deg)" : "none", color: "#81A1DB" }}
                  >
                    ▾
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

function Footer() {
  return (
    <footer style={{ background: "var(--coovitel-dark)", color: "#F7F0FF" }} className="mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm"
                style={{ background: "var(--coovitel-gold)", color: "var(--coovitel-dark)" }}
              >
                CV
              </div>
              <span className="font-bold text-xl" style={{ fontFamily: "Poppins, sans-serif" }}>COOVITEL</span>
            </div>
            <p className="text-white/50 text-xs leading-relaxed mb-4">
              Cooperativa Empresarial de Ahorro y Crédito. 64 años construyendo bienestar financiero con solidaridad y transparencia en Colombia.
            </p>
            <div className="flex gap-3">
              {["f", "in", "🐦", "📷"].map((s, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors hover:opacity-80" style={{ background: "rgba(255,255,255,0.1)" }}>{s}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>Productos</h4>
            <ul className="space-y-2">
              {["Crédito Propósito", "Ahorro Propósito", "CDAT", "Aportes Sociales"].map(p => (
                <li key={p}><a href="#" className="text-white/50 text-xs hover:text-white transition-colors">{p}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>Institucional</h4>
            <ul className="space-y-2">
              {["Quiénes Somos", "Plan de Beneficios", "Asistencias Gratis", "Trabaja con Nosotros"].map(p => (
                <li key={p}><a href="#" className="text-white/50 text-xs hover:text-white transition-colors">{p}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>Contacto</h4>
            <ul className="space-y-3">
              <li className="text-white/50 text-xs">📞 01 800 00 26683</li>
              <li className="text-white/50 text-xs">✉️ info@coovitel.coop</li>
              <li className="text-white/50 text-xs">📍 Bogotá, Colombia</li>
              <li>
                <a href="#" className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mt-1" style={{ background: "var(--coovitel-gold)", color: "var(--coovitel-dark)", fontFamily: "Poppins, sans-serif" }}>
                  Oficina Virtual →
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-10 pt-6 border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">© 2024 COOVITEL. Todos los derechos reservados. Vigilada por Supersolidaria.</p>
          <div className="flex gap-5">
            {["Política de Privacidad", "Términos y Condiciones", "SAGRILAFT"].map(l => (
              <a key={l} href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function QuienesSomos() {
  const routeSection = new URLSearchParams(window.location.search).get("section");
  const [active, setActive] = useState<Section>(routeSection === "estatutos" ? "estatutos" : "historia");

  return (
    <div className="min-h-full flex flex-col" style={{ background: "var(--coovitel-light)" }}>
      <NavBar />
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

      <Footer />
    </div>
  );
}
