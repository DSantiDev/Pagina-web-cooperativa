import { useState } from "react";

type Tab = "oficinas" | "formulario" | "canales" | "faq";

const offices = [
  {
    city: "Bogotá",
    name: "Oficina Principal",
    address: "Calle 67 # 9 - 34, Chapinero",
    phone: "(601) 566 6601",
    hours: "Lun–Vie 8:30 a. m. – 4:30 p. m. · Jornada continua",
    email: "mercadeoypublicidad@coovitel.coop",
  },
  {
    city: "Tunja",
    name: "Sede Tunja",
    address: "Carrera 10 # 17-57, Centro Histórico",
    phone: "01 8000 967474",
    hours: "Lun–Vie 8:30 a. m. – 4:30 p. m. · Jornada continua",
    email: "mercadeoypublicidad@coovitel.coop",
  },
  {
    city: "Cali",
    name: "Sede Cali",
    address: "Avenida 5A Norte # 25N - 44, barrio San Vicente",
    phone: "01 8000 967474",
    hours: "Lun–Vie 8:30 a. m. – 12:00 m. y 1:00 p. m. – 4:30 p. m.",
    email: "mercadeoypublicidad@coovitel.coop",
  },
  {
    city: "Barranquilla",
    name: "Sede Barranquilla",
    address: "Carrera 52 # 72-152, local 2A, C.C. El Prado",
    phone: "01 8000 967474",
    hours: "Lun–Vie 8:30 a. m. – 12:00 m. y 1:00 p. m. – 4:30 p. m.",
    email: "mercadeoypublicidad@coovitel.coop",
  },
  {
    city: "Cúcuta",
    name: "Sede Cúcuta",
    address: "Caobos Mall, Avenida Segunda Este # 13A-09, local 2",
    phone: "01 8000 967474",
    hours: "Lun–Vie 8:30 a. m. – 12:00 m. y 1:00 p. m. – 4:30 p. m. · Sáb 9:00 a. m. – 11:00 a. m.",
    email: "mercadeoypublicidad@coovitel.coop",
  },
  {
    city: "Bucaramanga",
    name: "Sede Bucaramanga",
    address: "Carrera 29 # 42-12, local 01, Edificio Parque 42, barrio Sotomayor",
    phone: "01 8000 967474",
    hours: "Lun–Vie 8:30 a. m. – 12:00 m. y 1:00 p. m. – 4:30 p. m.",
    email: "mercadeoypublicidad@coovitel.coop",
  },
  {
    city: "Medellín",
    name: "Sede Medellín",
    address: "Carrera 49 # 49-73, oficina 1310",
    phone: "01 8000 967474",
    hours: "Lun–Vie 8:30 a. m. – 12:00 m. y 1:00 p. m. – 4:30 p. m.",
    email: "mercadeoypublicidad@coovitel.coop",
  },
  {
    city: "Ibagué",
    name: "Sede Tolima",
    address: "Carrera 5 # 37 bis - 19, Edificio Fontainebleu, local 105",
    phone: "01 8000 967474",
    hours: "Lun–Vie 8:30 a. m. – 12:00 m. y 1:00 p. m. – 4:30 p. m.",
    email: "mercadeoypublicidad@coovitel.coop",
  },
  {
    city: "Manizales",
    name: "Sede Manizales",
    address: "Carrera 24 # 22 - 02, Edificio Plaza Centro, oficina 907",
    phone: "01 8000 967474",
    hours: "Lun–Vie 8:30 a. m. – 12:00 m. y 1:00 p. m. – 4:30 p. m.",
    email: "mercadeoypublicidad@coovitel.coop",
  },
];

const faqs = [
  {
    q: "¿Quién puede asociarse a COOVITEL?",
    a: "Pueden asociarse personas naturales mayores de edad que trabajen en empresas aliadas a COOVITEL o que cumplan los requisitos establecidos en nuestros estatutos. También pueden vincularse personas jurídicas según las condiciones especiales definidas por el Consejo de Administración.",
  },
  {
    q: "¿Cómo puedo solicitar un crédito?",
    a: "Puedes solicitar un crédito a través de nuestra Oficina Virtual, visitando cualquiera de nuestras sedes, por WhatsApp o llamando a nuestra línea de atención. Necesitas ser asociado activo con al menos 3 meses de antigüedad y tener tus aportes al día.",
  },
  {
    q: "¿Cuánto tiempo tarda la aprobación de un crédito?",
    a: "El proceso de aprobación toma entre 24 y 48 horas hábiles una vez se radique la documentación completa. Para créditos digitales el proceso puede ser en menos de 24 horas, 100% en línea.",
  },
  {
    q: "¿Qué tasas de interés maneja COOVITEL?",
    a: "Nuestras tasas son preferenciales para asociados y están por debajo de la tasa promedio del mercado. Las tasas varían según el tipo de crédito, monto y plazo. Consulta las tasas vigentes en nuestra Oficina Virtual o comunícate con atención al cliente.",
  },
  {
    q: "¿Cómo puedo consultar el saldo de mis ahorros?",
    a: "Puedes consultar tu saldo en cualquier momento a través de coovitel.coop y la Oficina Virtual, llamando a la línea de atención o visitando cualquiera de nuestras sedes.",
  },
  {
    q: "¿Qué documentos necesito para asociarme?",
    a: "Para asociarte necesitas: cédula de ciudadanía vigente, certificación laboral o comprobante de ingresos, diligenciar el formulario de vinculación y firmar los estatutos. El proceso puede realizarse de forma presencial o en línea a través de nuestra Oficina Virtual.",
  },
  {
    q: "¿COOVITEL está vigilada por la Superintendencia de la Economía Solidaria?",
    a: "Sí. COOVITEL está vigilada y controlada por la Superintendencia de la Economía Solidaria (Supersolidaria), lo que garantiza la transparencia y seguridad de los recursos de todos nuestros asociados. También contamos con certificación ISO 9001:2015 y calificación A+ Value & Risk.",
  },
  {
    q: "¿Puedo retirar mis aportes si me desvinculo?",
    a: "Al momento de la desvinculación, tienes derecho al reembolso de tus aportes sociales según los procedimientos establecidos en los estatutos y la normativa cooperativa vigente. El proceso toma entre 30 y 60 días hábiles después de aprobada la desvinculación.",
  },
];

function HeroSection() {
  return (
    <section className="relative bg-[#173C6E] overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/5 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-10 w-48 h-48 rounded-full bg-[#1B3669]/60" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#1B3669] border border-white/20 rounded-full px-4 py-1.5 mb-5">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-white text-xs font-bold tracking-widest uppercase">Estamos para ti</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight max-w-2xl">
          Contáctanos y<br />
          <span className="text-amber-400">resolvemos juntos</span>
        </h1>
        <p className="text-white/70 text-base max-w-xl leading-relaxed">
          Encuentra la oficina más cercana, escríbenos o llámanos. Nuestro equipo está listo para brindarte la mejor atención en 9 ciudades de Colombia.
        </p>
        {/* Quick stats */}
        <div className="flex flex-wrap gap-6 mt-8">
          {[
            { value: "9", label: "Ciudades con presencia" },
            { value: "digital", label: "Atención digital" },
            { value: "<24h", label: "Tiempo de respuesta" },
          ].map((stat) => (
            <div key={stat.value} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center">
                {stat.value === "digital" ? (
                  <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-label="Atención digital">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a6.75 6.75 0 01-3.69-12.4A7.5 7.5 0 0118 10.5c0 1.2-.28 2.34-.78 3.35l1.03 3.4-3.57-.76a6.72 6.72 0 01-6.43 2.26z" />
                    <path strokeLinecap="round" d="M8.5 11.5h7M8.5 14.5h4" />
                  </svg>
                ) : <span className="text-amber-400 font-black text-xs">{stat.value}</span>}
              </div>
              <span className="text-white/70 text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Wave bottom */}
      <div className="relative h-12 -mb-1">
        <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full" preserveAspectRatio="none">
          <path d="M0 48V20C240 0 480 40 720 24C960 8 1200 44 1440 20V48H0Z" fill="#f7f0ff" />
        </svg>
      </div>
    </section>
  );
}

function SubMenuTabs({ activeTab, setActiveTab }: { activeTab: Tab; setActiveTab: (t: Tab) => void }) {
  const tabs: { id: Tab; label: string; shortLabel: string; icon: string }[] = [
    { id: "canales", label: "Canales de atención", shortLabel: "Canales", icon: "📞" },
    { id: "oficinas", label: "Oficinas y puntos de atención", shortLabel: "Oficinas", icon: "📍" },
    { id: "formulario", label: "Formulario de contacto", shortLabel: "Formulario", icon: "✉️" },
    { id: "faq", label: "Preguntas frecuentes", shortLabel: "FAQ", icon: "❓" },
  ];
  return (
    <div className="bg-white sticky top-16 z-40 border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Mobile: 2×2 grid */}
        <div className="grid grid-cols-2 sm:hidden gap-px bg-slate-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 py-3 px-2 text-xs font-black transition-all ${
                activeTab === tab.id
                  ? "bg-[#173C6E] text-white"
                  : "bg-white text-slate-500 hover:bg-slate-50 hover:text-[#173C6E]"
              }`}
            >
              <span className="text-lg leading-none">{tab.icon}</span>
              <span className="text-center leading-tight">{tab.shortLabel}</span>
            </button>
          ))}
        </div>
        {/* Desktop: horizontal tabs */}
        <div className="hidden sm:flex gap-0 -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-4 text-sm font-bold whitespace-nowrap border-b-2 transition-all ${
                activeTab === tab.id
                  ? "border-[#173C6E] text-[#173C6E] bg-slate-50"
                  : "border-transparent text-slate-500 hover:text-[#173C6E] hover:border-slate-300"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function OficinasSection() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const cities = [...new Set(offices.map((o) => o.city))];
  const filtered = selectedCity ? offices.filter((o) => o.city === selectedCity) : offices;

  return (
    <section id="oficinas" className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
      <div className="mb-10">
        <span className="text-amber-500 text-xs font-black tracking-widest uppercase">Presencia nacional</span>
        <h2 className="text-3xl sm:text-4xl font-black text-[#173C6E] mt-1 mb-3">Nuestras oficinas</h2>
        <p className="text-slate-500 max-w-xl">Encuéntranos en 9 ciudades de Colombia. Selecciona una ciudad para filtrar.</p>
      </div>

      {/* City filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedCity(null)}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
            !selectedCity ? "bg-[#173C6E] text-white shadow-md" : "bg-white border border-slate-200 text-slate-500 hover:border-[#173C6E] hover:text-[#173C6E]"
          }`}
        >
          Todas
        </button>
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => setSelectedCity(city === selectedCity ? null : city)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
              selectedCity === city ? "bg-[#173C6E] text-white shadow-md" : "bg-white border border-slate-200 text-slate-500 hover:border-[#173C6E] hover:text-[#173C6E]"
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((office) => (
          <div
            key={office.city + office.name}
            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-[#173C6E]/20 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs font-black text-amber-500 tracking-wider uppercase">{office.city}</span>
                <h3 className="text-[#173C6E] font-black text-lg leading-tight">{office.name}</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#173C6E]/10 flex items-center justify-center group-hover:bg-[#173C6E] transition-colors">
                <svg className="w-5 h-5 text-[#173C6E] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <div className="space-y-2.5 text-sm text-slate-600">
              <div className="flex gap-2">
                <svg className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>{office.address}</span>
              </div>
              <div className="flex gap-2">
                <svg className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
                </svg>
                <span>{office.phone}</span>
              </div>
              <div className="flex gap-2">
                <svg className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{office.hours}</span>
              </div>
              <div className="flex gap-2">
                <svg className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span className="text-[#173C6E] font-semibold">{office.email}</span>
              </div>
            </div>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${office.address}, ${office.city}, Colombia`)}`} target="_blank" rel="noreferrer" className="mt-5 flex w-full items-center justify-center py-2 rounded-xl border-2 border-[#173C6E]/20 text-[#173C6E] text-sm font-bold hover:bg-[#173C6E] hover:text-white hover:border-[#173C6E] transition-all">
              Ver en el mapa →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

function FormularioSection() {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", ciudad: "", asunto: "", mensaje: "", tipo: "Asociado" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  }

  if (submitted) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="max-w-xl mx-auto bg-white rounded-3xl p-10 text-center shadow-lg border border-slate-100">
          <div className="w-20 h-20 rounded-full bg-[#CFE0FF] flex items-center justify-center mx-auto mb-5">
            <svg className="w-10 h-10 text-[#1B65A6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-black text-[#173C6E] mb-2">¡Mensaje enviado!</h3>
          <p className="text-slate-500 mb-6">Gracias <strong>{form.nombre}</strong>, hemos recibido tu mensaje. Atención al cliente te contactará en menos de 24 horas hábiles al correo <strong>{form.email}</strong>.</p>
          <button onClick={() => { setSubmitted(false); setForm({ nombre: "", email: "", telefono: "", ciudad: "", asunto: "", mensaje: "", tipo: "Asociado" }); }}
            className="px-8 py-3 rounded-full bg-[#173C6E] text-white font-black hover:bg-[#1B3669] transition-colors">
            Enviar otro mensaje
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
      <div className="grid lg:grid-cols-5 gap-10">
        {/* Left info */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <span className="text-amber-500 text-xs font-black tracking-widest uppercase">Escríbenos</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#173C6E] mt-1 mb-3">Formulario de contacto</h2>
            <p className="text-slate-500 leading-relaxed">Completa el formulario y atención al cliente se pondrá en contacto contigo en menos de 24 horas hábiles.</p>
          </div>
          <div className="space-y-4">
            {[
              { icon: "⏱", title: "Respuesta rápida", desc: "Te respondemos en menos de 24 horas hábiles." },
              { icon: "🔒", title: "Datos seguros", desc: "Tu información está protegida bajo nuestra política de privacidad." },
              { icon: "👤", title: "Atención personalizada", desc: "Nuestro equipo atenderá tu caso." },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="font-black text-[#173C6E] text-sm">{item.title}</div>
                  <div className="text-slate-500 text-xs leading-relaxed mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-[#173C6E] rounded-2xl p-5 text-white">
            <div className="font-black text-sm mb-1">¿Necesitas ayuda inmediata?</div>
            <div className="text-white/70 text-xs mb-3">Escríbenos por WhatsApp y atención al cliente te atiende.</div>
            <a href="https://api.whatsapp.com/send/?phone=573160189853&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#173C6E] hover:bg-[#27548F] text-white font-black text-sm px-4 py-2.5 rounded-xl transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Abrir WhatsApp
            </a>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-3 bg-white rounded-3xl p-8 shadow-lg border border-slate-100 space-y-5">
          {/* Tipo de usuario */}
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Soy</label>
            <div className="flex gap-2 flex-wrap">
              {["Asociado", "No asociado", "Empresa aliada"].map((tipo) => (
                <button
                  key={tipo} type="button"
                  onClick={() => setForm({ ...form, tipo })}
                  className={`px-4 py-2 rounded-full text-sm font-bold border-2 transition-all ${
                    form.tipo === tipo ? "bg-[#173C6E] border-[#173C6E] text-white" : "border-slate-200 text-slate-500 hover:border-[#173C6E] hover:text-[#173C6E]"
                  }`}
                >
                  {tipo}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">Nombre completo *</label>
              <input required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                placeholder="Ej. María González"
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-800 text-sm font-semibold outline-none focus:border-[#173C6E] transition-colors placeholder:font-normal placeholder:text-slate-400" />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">Correo electrónico *</label>
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="correo@ejemplo.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-800 text-sm font-semibold outline-none focus:border-[#173C6E] transition-colors placeholder:font-normal placeholder:text-slate-400" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">Teléfono / Celular *</label>
              <input required type="tel" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                placeholder="300 000 0000"
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-800 text-sm font-semibold outline-none focus:border-[#173C6E] transition-colors placeholder:font-normal placeholder:text-slate-400" />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">Ciudad</label>
              <select value={form.ciudad} onChange={(e) => setForm({ ...form, ciudad: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-800 text-sm font-semibold outline-none focus:border-[#173C6E] transition-colors bg-white">
                <option value="">Selecciona tu ciudad</option>
                {offices.map((o) => <option key={o.city} value={o.city}>{o.city}</option>)}
                <option value="Otra">Otra ciudad</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">Asunto *</label>
            <select required value={form.asunto} onChange={(e) => setForm({ ...form, asunto: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-800 text-sm font-semibold outline-none focus:border-[#173C6E] transition-colors bg-white">
              <option value="">Selecciona un asunto</option>
              <option>Información sobre créditos</option>
              <option>Información sobre ahorros</option>
              <option>Vinculación como asociado</option>
              <option>Estado de mi solicitud</option>
              <option>Certificados y documentos</option>
              <option>Otros</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">Mensaje *</label>
            <textarea required value={form.mensaje} onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
              rows={4} placeholder="Cuéntanos en qué podemos ayudarte..."
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-800 text-sm font-semibold outline-none focus:border-[#173C6E] transition-colors placeholder:font-normal placeholder:text-slate-400 resize-none" />
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Al enviar este formulario aceptas nuestra <a href="https://coovitel.coop/wp-content/uploads/2025/07/COV-TEC-DOC-005-Politica-para-tratamiento-de-datos-personales-V2.pdf" target="_blank" rel="noreferrer" className="text-[#173C6E] underline">política de privacidad</a>. Tus datos serán tratados con confidencialidad.
          </p>

          <button type="submit" disabled={loading}
            className="w-full py-4 rounded-xl bg-[#173C6E] text-white font-black text-base hover:bg-[#1B3669] transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg shadow-blue-800/30">
            {loading ? (
              <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Enviando...</>
            ) : (
              <><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg> Enviar mensaje</>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

function CanalesSection() {
  const channels = [
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      ),
      color: "bg-[#173C6E]",
      lightColor: "bg-[#F7F0FF]",
      textColor: "text-[#173C6E]",
      title: "WhatsApp",
      subtitle: "Atención inmediata",
      value: "+57 316 018 9853",
      desc: "Escríbenos por WhatsApp y atención al cliente responderá tu solicitud.",
      badge: "Disponible ahora",
      badgeColor: "bg-[#CFE0FF] text-[#173C6E]",
      action: "Escribir por WhatsApp",
      href: "https://api.whatsapp.com/send/?phone=573160189853&text&type=phone_number&app_absent=0",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" /></svg>
      ),
      color: "bg-[#173C6E]",
      lightColor: "bg-blue-50",
      textColor: "text-[#173C6E]",
      title: "Línea nacional",
      subtitle: "Llámanos sin costo",
      value: "01 8000 967474",
      desc: "Línea gratuita nacional de COOVITEL. Para información sobre productos y atención en sedes.",
      badge: "Línea nacional",
      badgeColor: "bg-blue-100 text-[#173C6E]",
      action: "Llamar ahora",
      href: "tel:018000967474",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
      ),
      color: "bg-amber-500",
      lightColor: "bg-amber-50",
      textColor: "text-amber-600",
      title: "Correo electrónico",
      subtitle: "Escríbenos",
      value: "mercadeoypublicidad@coovitel.coop",
      desc: "Envíanos tu solicitud de información o el formulario de afiliación cuando no tengas una sede cercana.",
      badge: "Canal de información",
      badgeColor: "bg-amber-100 text-amber-700",
      action: "Enviar correo",
      href: "mailto:mercadeoypublicidad@coovitel.coop",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" /></svg>
      ),
      color: "bg-purple-600",
      lightColor: "bg-purple-50",
      textColor: "text-purple-600",
      title: "Oficina Virtual",
      subtitle: "100% en línea",
      value: "coovitel.coop",
      desc: "Gestiona tus productos, consulta saldos, solicita créditos y mucho más desde cualquier dispositivo.",
      badge: "Servicio en línea",
      badgeColor: "bg-purple-100 text-purple-700",
      action: "Ingresa a la sucursal virtual",
      href: "https://odin.selsacloud.com/linix/v7/8e273b00-cfc0-48eb-bcff-10ba62e64fe5/servicio/identidad/autenticar/gui/autenticacion-gui/ingresousuario",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
      ),
      color: "bg-rose-500",
      lightColor: "bg-rose-50",
      textColor: "text-rose-600",
      title: "Atención presencial",
      subtitle: "Visítanos",
      value: "9 ciudades en Colombia",
      desc: "Visita cualquiera de nuestras sedes. Contamos con atención personalizada para asociados y no asociados.",
      badge: "Lun-Vie 8am–5pm",
      badgeColor: "bg-rose-100 text-rose-700",
      action: "Ver oficinas",
      href: "/contacto?tab=oficinas",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
      <div className="mb-10 text-center">
        <span className="text-amber-500 text-xs font-black tracking-widest uppercase">Múltiples canales</span>
        <h2 className="text-3xl sm:text-4xl font-black text-[#173C6E] mt-1 mb-3">Canales de atención</h2>
        <p className="text-slate-500 max-w-xl mx-auto">Elige el canal que más te convenga. Estamos disponibles en múltiples plataformas para brindarte la mejor atención.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {channels.map((ch) => (
          <div key={ch.title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 rounded-2xl ${ch.lightColor} ${ch.textColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                {ch.icon}
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${ch.badgeColor}`}>{ch.badge}</span>
            </div>
            <h3 className="font-black text-[#173C6E] text-xl mb-0.5">{ch.title}</h3>
            <p className="text-slate-400 text-xs font-semibold mb-2">{ch.subtitle}</p>
            <p className={`font-black text-sm ${ch.textColor} mb-3`}>{ch.value}</p>
            <p className="text-slate-500 text-sm leading-relaxed mb-5">{ch.desc}</p>
            <a href={ch.href} target={ch.href.startsWith("http") ? "_blank" : undefined} rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-white font-black text-sm transition-all ${ch.color} hover:opacity-90`}>
              {ch.action} →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  const [search, setSearch] = useState("");

  const filtered = faqs.filter(
    (faq) =>
      search === "" ||
      faq.q.toLowerCase().includes(search.toLowerCase()) ||
      faq.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
      <div className="grid lg:grid-cols-3 gap-10">
        {/* Left */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <span className="text-amber-500 text-xs font-black tracking-widest uppercase">Resolvemos tus dudas</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#173C6E] mt-1 mb-3">Preguntas frecuentes</h2>
            <p className="text-slate-500 leading-relaxed">Aquí encontrarás respuesta a las preguntas más comunes de nuestros asociados y futuros socios.</p>
          </div>

          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar pregunta..."
              className="w-full pl-9 pr-4 py-3 rounded-xl border-2 border-slate-200 text-slate-800 text-sm font-semibold outline-none focus:border-[#173C6E] transition-colors placeholder:font-normal placeholder:text-slate-400" />
          </div>

          {/* Categories */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3">Categorías</div>
            <div className="space-y-1.5">
              {["Vinculación", "Créditos", "Ahorros", "Certificados", "Desvinculación", "Digital"].map((cat) => (
                <button key={cat} className="flex items-center gap-2 w-full text-left py-2 px-3 rounded-lg text-slate-600 text-sm font-semibold hover:bg-[#173C6E]/5 hover:text-[#173C6E] transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#173C6E] border border-[#27548F] rounded-2xl p-5 shadow-md">
            <div className="text-[#EBC302] font-black text-sm mb-1">¿No encontraste tu respuesta?</div>
            <p className="text-[#F7F0FF] text-xs leading-relaxed mb-4">Escríbenos por WhatsApp y atención al cliente resolverá tu duda.</p>
            <a href="https://api.whatsapp.com/send/?phone=573160189853&text&type=phone_number&app_absent=0" target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#EBC302] px-4 py-2.5 text-sm font-black text-[#131739] transition-transform hover:-translate-y-0.5">
              <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26C2.16 6.44 6.6 2.01 12.05 2.01c2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.89-9.88 9.89" /></svg>
              Atención al cliente
            </a>
          </div>
        </div>

        {/* Accordion */}
        <div className="lg:col-span-2 space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>
              <p className="font-semibold">No se encontraron resultados para "<span className="text-[#173C6E]">{search}</span>"</p>
            </div>
          )}
          {filtered.map((faq, i) => (
            <div key={i}
              className={`bg-white rounded-2xl border-2 transition-all overflow-hidden ${open === i ? "border-[#173C6E] shadow-md" : "border-slate-100 shadow-sm hover:border-slate-200"}`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className={`font-black text-base leading-snug ${open === i ? "text-[#173C6E]" : "text-slate-800"}`}>{faq.q}</span>
                <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all ${open === i ? "bg-[#173C6E] text-white rotate-45" : "bg-slate-100 text-slate-500"}`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <div className="w-12 h-0.5 bg-amber-400 mb-3" />
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Contacto() {
  const requestedTab = new URLSearchParams(window.location.search).get("tab");
  const [activeTab, setActiveTab] = useState<Tab>(requestedTab === "oficinas" ? "oficinas" : "canales");

  return (
    <div className="min-h-full bg-slate-50">
      
      <HeroSection />
      <SubMenuTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        {activeTab === "canales" && <CanalesSection />}
        {activeTab === "oficinas" && <OficinasSection />}
        {activeTab === "formulario" && <FormularioSection />}
        {activeTab === "faq" && <FAQSection />}
      </main>

    </div>
  );
}
