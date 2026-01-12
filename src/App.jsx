import React, { useState, useEffect } from 'react';

// --- DATA: CUENTAS NEQUI (Base de Datos Unificada) ---
const ACCOUNT_DB = {
  "alexandra": { name: "Alexandra Huérfano", number: "3112542241", area: "Lectura" },
  "hellen": { name: "Hellen Aranda", number: "3186524114", area: "Lectura" },
  "sofia": { name: "Sofia Suarez", number: "3167390630", area: "Lectura" },
  "sofía": { name: "Sofia Suarez", number: "3167390630", area: "Lectura" },
  "carlos": { name: "Carlos Murillo", number: "3014050956", area: "Sociales" },
  "david": { name: "David Mendoza", number: "3117217558", area: "Sociales" },
  "jose": { name: "Jose Manuel Londoño", number: "3158742494", area: "Ciencias" },
  "josé": { name: "Jose Manuel Londoño", number: "3158742494", area: "Ciencias" },
  "fanny": { name: "Fanny Novoa", number: "3212257303", area: "Ciencias" },
  "jesus": { name: "Jesus Tovar", number: "3202194904", area: "Ciencias" },
  "viviana": { name: "Viviana Rincón", number: "3160539096", area: "Inglés/Matemáticas" },
  "sara": { name: "Sara Palacio", number: "3204747141", area: "Matemáticas" },
  "aida": { name: "Aida Oliva", number: "3182813281", area: "Matemáticas" },
  "luis": { name: "Aida Oliva", number: "3182813281", area: "Matemáticas/Taller" },
  "daniel": { name: "Sandra Johanna Cuspoca", number: "3162243793", area: "Física" }
};

const findAccount = (teacherName) => {
  const nameParts = teacherName.toLowerCase().split(' ');
  for (const part of nameParts) {
    if (ACCOUNT_DB[part]) return ACCOUNT_DB[part];
  }
  return null;
};

// --- DATA: SEMANAS ---
const INITIAL_DATA = [
  {
    id: 1,
    name: "Semana 1",
    range: "15 - 20 Dic",
    teachers: [
      {
        name: "Viviana Rincón", totalHours: 8, sessions: [
          { date: "15 Dic", time: "10:00 AM - 12:00 PM", type: "Teórica", topic: "Introducción", hours: 2 },
          { date: "16 Dic", time: "2:00 PM - 4:00 PM", type: "Teórica", topic: "Pronouns, Verb to Be", hours: 2 },
          { date: "17 Dic", time: "2:00 PM - 4:00 PM", type: "Práctica", topic: "Taller 1", hours: 2 },
          { date: "18 Dic", time: "2:00 PM - 4:00 PM", type: "Práctica", topic: "Taller 1", hours: 2 }
        ]
      },
      {
        name: "José Londoño", totalHours: 6, sessions: [
          { date: "15 Dic", time: "8:00 PM - 10:00 PM", type: "Teórica", topic: "Célula y Organelos", hours: 2 },
          { date: "19 Dic", time: "8:00 PM - 10:00 PM", type: "Teórica", topic: "Taller 1", hours: 2 },
          { date: "20 Dic", time: "8:00 PM - 10:00 PM", type: "Práctica", topic: "Taller 2", hours: 2 }
        ]
      },
      {
        name: "Carlos Murillo", totalHours: 4, sessions: [
          { date: "16 Dic", time: "4:00 PM - 6:00 PM", type: "Teórica", topic: "Constitución 1991", hours: 2 },
          { date: "18 Dic", time: "4:00 PM - 6:00 PM", type: "Teórica", topic: "Los Derechos", hours: 2 }
        ]
      },
      {
        name: "Alexandra Nikol", totalHours: 4, sessions: [
          { date: "17 Dic", time: "6:00 PM - 8:00 PM", type: "Teórica", topic: "Textos Continuos", hours: 2 },
          { date: "19 Dic", time: "6:00 PM - 8:00 PM", type: "Práctica", topic: "Taller 1", hours: 2 }
        ]
      },
      {
        name: "Luis Gutiérrez", totalHours: 2, sessions: [
          { date: "19 Dic", time: "2:00 PM - 4:00 PM", type: "Práctica", topic: "Taller 2", hours: 2 }
        ]
      },
      {
        name: "Hellen Tovar", totalHours: 2, sessions: [
          { date: "20 Dic", time: "6:00 PM - 8:00 PM", type: "Práctica", topic: "Minisimulacro 1", hours: 2 }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Semana 2",
    range: "22 - 27 Dic",
    teachers: [
      {
        name: "Viviana Rincón", totalHours: 10, sessions: [
          { date: "23 Dic", time: "10:00 AM - 12:00 PM", type: "Teórica", topic: "Professions, Auxiliaries...", hours: 2 },
          { date: "23 Dic", time: "2:00 PM - 4:00 PM", type: "Práctica", topic: "Taller 1 (2) y Taller 2", hours: 2 },
          { date: "23 Dic", time: "4:00 PM - 6:00 PM", type: "Práctica", topic: "Taller 1 (2) y Taller 3", hours: 2 },
          { date: "24 Dic", time: "10:00 AM - 12:00 PM", type: "Teórica", topic: "Animals, Transports...", hours: 2 },
          { date: "25 Dic", time: "2:00 PM - 4:00 PM", type: "Teórica", topic: "Hobbies & Sports...", hours: 2 }
        ]
      },
      {
        name: "Sofía Suarez", totalHours: 4, sessions: [
          { date: "27 Dic", time: "6:00 PM - 8:00 PM", type: "Teórica", topic: "Información explícita", hours: 2 },
          { date: "27 Dic", time: "8:00 PM - 10:00 PM", type: "Teórica", topic: "Oración y tipos", hours: 2 }
        ]
      },
      {
        name: "Carlos Murillo", totalHours: 4, sessions: [
          { date: "26 Dic", time: "6:00 PM - 8:00 PM", type: "Práctica", topic: "Taller 1", hours: 2 },
          { date: "27 Dic", time: "10:00 AM - 12:00 PM", type: "Teórica", topic: "Historia del Mundo", hours: 2 }
        ]
      },
      { name: "Daniel Cuspoca", totalHours: 2, sessions: [{ date: "22 Dic", time: "8:00 PM - 10:00 PM", type: "Teórica", topic: "Análisis Dimensional", hours: 2 }] },
      { name: "José Manuel", totalHours: 2, sessions: [{ date: "23 Dic", time: "8:00 PM - 10:00 PM", type: "Teórica", topic: "Átomo y Tabla", hours: 2 }] },
      { name: "Hellen Tovar", totalHours: 2, sessions: [{ date: "25 Dic", time: "6:00 PM - 8:00 PM", type: "Práctica", topic: "Taller 3", hours: 2 }] },
      { name: "Luis Gutiérrez", totalHours: 2, sessions: [{ date: "26 Dic", time: "4:00 PM - 6:00 PM", type: "Práctica", topic: "Taller 4", hours: 2 }] },
      { name: "Jesus Tovar", totalHours: 2, sessions: [{ date: "26 Dic", time: "8:00 PM - 10:00 PM", type: "Teórica", topic: "Ecosistema", hours: 2 }] }
    ]
  },
  {
    id: 3,
    name: "Semana 3",
    range: "28 Dic - 03 Ene",
    teachers: [
      { name: "Alexandra Nikol", totalHours: 2, sessions: [{ date: "29 Dic", time: "6:00 PM - 8:00 PM", type: "Práctica", topic: "Taller 4", hours: 2 }] },
      {
        name: "José Londoño", totalHours: 6, sessions: [
          { date: "29 Dic", time: "8:00 PM - 10:00 PM", type: "Práctica", topic: "Taller 2", hours: 2 },
          { date: "30 Dic", time: "2:00 PM - 4:00 PM", type: "Práctica", topic: "Taller 3", hours: 2 },
          { date: "03 Ene", time: "2:00 PM - 4:00 PM", type: "Práctica", topic: "Taller 4", hours: 2 }
        ]
      },
      {
        name: "Luis Gutiérrez", totalHours: 4, sessions: [
          { date: "30 Dic", time: "4:00 PM - 6:00 PM", type: "Práctica", topic: "Taller 5", hours: 2 },
          { date: "31 Dic", time: "10:00 AM - 12:00 PM", type: "Práctica", topic: "Taller 6", hours: 2 }
        ]
      },
      { name: "Sofía Suarez", totalHours: 2, sessions: [{ date: "02 Ene", time: "6:00 PM - 8:00 PM", type: "Teórica", topic: "Cohesión Textual", hours: 2 }] },
      {
        name: "Carlos Murillo", totalHours: 4, sessions: [
          { date: "02 Ene", time: "8:00 PM - 10:00 PM", type: "Práctica", topic: "Retroalimentación 1", hours: 2 },
          { date: "03 Ene", time: "8:00 PM - 10:00 PM", type: "Teórica", topic: "Historia de LATAM", hours: 2 }
        ]
      },
      { name: "Hellen Tovar", totalHours: 2, sessions: [{ date: "03 Ene", time: "6:00 PM - 8:00 PM", type: "Práctica", topic: "Taller 5", hours: 2 }] }
    ]
  },
  {
    id: 4,
    name: "Semana 4",
    range: "05 - 10 Ene",
    teachers: [
      {
        name: "Viviana Rincón", totalHours: 8, sessions: [
          { date: "05 Ene", time: "10:00 AM - 12:00 PM", type: "Teórica", topic: "Theoretical 5", hours: 2 },
          { date: "05 Ene", time: "2:00 PM - 4:00 PM", type: "Práctica", topic: "Taller 2 y 3", hours: 2 },
          { date: "06 Ene", time: "8:00 AM - 10:00 AM", type: "Teórica", topic: "Theoretical 6", hours: 2 },
          { date: "06 Ene", time: "10:00 AM - 12:00 PM", type: "Práctica", topic: "Taller 4", hours: 2 }
        ]
      },
      {
        name: "David Cardona", totalHours: 5, sessions: [
          { date: "05 Ene", time: "5:00 PM - 7:00 PM", type: "Práctica", topic: "Taller 3 y 4", hours: 2 },
          { date: "08 Ene", time: "4:00 PM - 6:00 PM", type: "Teórica", topic: "Historia de Colombia", hours: 2 },
          { date: "10 Ene", time: "10:00 AM - 12:00 PM", type: "Teórica", topic: "Pensamiento Social", hours: 2 }
        ]
      },
      {
        name: "Carlos Murillo", totalHours: 1, sessions: [
          { date: "05 Ene", time: "4:00 PM - 5:00 PM", type: "Teórica", topic: "Historia de LATAM (2)", hours: 1 }
        ]
      },
      {
        name: "Sara Palacio", totalHours: 6, sessions: [
          { date: "06 Ene", time: "2:00 PM - 4:00 PM", type: "Teórica", topic: "Teórica 1", hours: 2 },
          { date: "07 Ene", time: "8:00 PM - 10:00 PM", type: "Teórica", topic: "Teórica 2", hours: 2 },
          { date: "08 Ene", time: "10:00 AM - 12:00 PM", type: "Teórica", topic: "Teórica 3", hours: 2 }
        ]
      },
      {
        name: "José Londoño", totalHours: 5, sessions: [
          { date: "06 Ene", time: "8:00 PM - 10:00 PM", type: "Teórica", topic: "La Materia", hours: 2 },
          { date: "08 Ene", time: "7:00 PM - 10:00 PM", type: "Teórica", topic: "Métodos de Separación", hours: 3 }
        ]
      },
      {
        name: "Daniel Cuspoca", totalHours: 2, sessions: [
          { date: "07 Ene", time: "8:00 AM - 10:00 AM", type: "Teórica", topic: "Cinemática y Dinámica", hours: 2 }
        ]
      },
      {
        name: "Alexandra Nikol", totalHours: 2, sessions: [
          { date: "07 Ene", time: "6:00 PM - 8:00 PM", type: "Práctica", topic: "Minisimulacro 2", hours: 2 }
        ]
      },
      {
        name: "Luis Gutiérrez", totalHours: 2, sessions: [
          { date: "09 Ene", time: "4:00 PM - 6:00 PM", type: "Práctica", topic: "Taller 7", hours: 2 }
        ]
      },
      {
        name: "Sofía Suarez", totalHours: 2, sessions: [
          { date: "09 Ene", time: "6:00 PM - 8:00 PM", type: "Teórica", topic: "Narradores", hours: 2 }
        ]
      }
    ]
  }
];

// --- UTILS ---
const formatMoney = (amount) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(amount);

const openNequiApp = () => {
  // Crear un iframe invisible para abrir el deep link
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = 'nequi://';
  document.body.appendChild(iframe);

  // Eliminar el iframe después de un segundo
  setTimeout(() => {
    document.body.removeChild(iframe);
  }, 1000);

  // Opcional: Si después de 2.5 segundos quieres dar la opción de abrir el Play Store
  // puedes mostrar un toast o notificación en lugar de redirigir automáticamente
};

// --- ICONOS SVG ---
const Icon = ({ children, className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{children}</svg>
);

const Icons = {
  Logo: () => <Icon className="w-6 h-6"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></Icon>,
  Dashboard: () => <Icon><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></Icon>,
  File: () => <Icon><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></Icon>,
  Dollar: () => <Icon><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></Icon>,
  Copy: () => <Icon><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></Icon>,
  Check: () => <Icon><polyline points="20 6 9 17 4 12" /></Icon>,
  Clock: () => <Icon><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></Icon>,
  Users: () => <Icon><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></Icon>,
  Down: () => <Icon><polyline points="6 9 12 15 18 9" /></Icon>,
  Up: () => <Icon><polyline points="18 15 12 9 6 15" /></Icon>,
  CreditCard: () => <Icon><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></Icon>,
  Wallet: () => <Icon><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" /><path d="M4 6v12a2 2 0 0 0 2 2h14v-4" /><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" /></Icon>,
  X: () => <Icon><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></Icon>,
  Smartphone: () => <Icon><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></Icon>
};

// --- MODAL COMPONENT ---
const PaymentModal = ({ account, onClose, onCopy }) => {
  if (!account) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden scale-100 animate-in zoom-in-95 duration-200">
        <div className="bg-indigo-600 p-6 text-white text-center relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors">
            <Icons.X />
          </button>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-md">
            <span className="text-2xl font-bold">{account.name.charAt(0)}</span>
          </div>
          <h3 className="font-bold text-lg">{account.name}</h3>
          <p className="text-indigo-200 text-xs uppercase tracking-widest font-semibold">{account.area}</p>
        </div>

        <div className="p-6">
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-6 text-center">
            <p className="text-xs font-bold text-slate-400 uppercase mb-1">Nequi / Daviplata</p>
            <p className="text-2xl font-mono font-black text-slate-800 tracking-wider">{account.number}</p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => onCopy(account.number, "Número")}
              className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors active:scale-95"
            >
              <Icons.Copy />
              Copiar Solo Número
            </button>
            <button
              onClick={() => onCopy(`${account.name}\nNequi: ${account.number}`, "Datos Completos")}
              className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors active:scale-95"
            >
              <Icons.File />
              Copiar Datos Completos
            </button>

            {/* NUEVO BOTÓN ABRIR APP DENTRO DEL MODAL */}
            <button
              onClick={openNequiApp}
              className="flex items-center justify-center gap-2 w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 active:scale-95 mt-2"
            >
              <Icons.Smartphone />
              Abrir App Nequi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTES ---

const Toast = ({ message }) => (
  <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300 z-[100] mobile-toast">
    <div className="bg-emerald-500 rounded-full p-1"><Icons.Check /></div>
    <span className="font-semibold text-sm">{message}</span>
  </div>
);

// --- FLOATING NEQUI BUTTON (FAB GLOBAL) ---
const NequiFloatingButton = () => (
  <button
    onClick={openNequiApp}
    className="fixed bottom-20 right-6 z-40 bg-[#DA0081] text-white p-4 rounded-full shadow-2xl hover:bg-[#b5006b] hover:scale-110 transition-all duration-300 group mobile-fab"
    title="Abrir Nequi"
  >
    <Icons.Smartphone />
    <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
      Abrir Nequi
    </span>
  </button>
);

const TeacherRow = ({ teacher, weekRange, weekName, weekId, hourlyRate, onCopy, onOpenPayment, isPaid, onTogglePaid }) => {
  const [expanded, setExpanded] = useState(false);
  const [mode, setMode] = useState('detailed');

  const cost = teacher.totalHours * hourlyRate;
  const nequiAccount = findAccount(teacher.name);

  const getLong = () => {
    let text = `${teacher.name} (${teacher.totalHours} Horas Totales - ${weekRange})\n`;
    teacher.sessions.forEach(s => text += `- ${s.date} (${s.time}): Clase ${s.type} - ${s.topic} (${s.hours} horas).\n`);
    return text;
  };

  const getShort = () => {
    let text = `${teacher.name} - ${weekName.replace("Semana", "Sem")} - (${weekRange}) - (${teacher.totalHours}h)\n`;
    teacher.sessions.forEach(s => {
      const type = s.type === "Teórica" ? "Teo" : "Prac";
      const time = s.time.replace(" AM", "AM").replace(" PM", "PM").replace(":00", "");
      text += `- ${s.date}: ${time} (${type})\n`;
    });
    return text;
  };

  const previewText = mode === 'detailed' ? getLong() : getShort();

  return (
    <div className={`bg-white rounded-xl shadow-sm border transition-all duration-300 relative ${isPaid ? 'border-emerald-300 bg-emerald-50/30' :
      expanded ? 'border-indigo-300 ring-2 ring-indigo-50' : 'border-slate-200 hover:border-indigo-200'
      }`}>
      <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">

        {/* INFO PRINCIPAL */}
        <div className="flex items-center gap-4 flex-1">
          {/* CHECKBOX DE PAGO */}
          <div className="flex-shrink-0">
            <input
              type="checkbox"
              checked={isPaid}
              onChange={() => onTogglePaid(weekId, teacher.name)}
              className="w-5 h-5 rounded border-2 border-slate-300 text-emerald-600 focus:ring-2 focus:ring-emerald-500 cursor-pointer transition-all"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div
            className="flex items-center gap-4 flex-1 cursor-pointer"
            onClick={() => setExpanded(!expanded)}
          >
            <div className={`w-10 h-10 rounded-lg text-white flex items-center justify-center font-bold text-lg shadow-md flex-shrink-0 ${isPaid ? 'bg-emerald-500' : 'bg-indigo-600'
              }`}>
              {teacher.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className={`font-bold text-lg ${isPaid ? 'text-emerald-700 line-through' : 'text-slate-800'
                  }`}>{teacher.name}</h4>
                {isPaid && (
                  <span className="badge badge-success text-[10px] px-2 py-0.5">✓ Pagado</span>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-semibold">
                  <Icons.Clock className="w-3 h-3" /> {teacher.totalHours}h
                </span>
                <span className="text-slate-300">-</span>
                <span className={`font-bold ${isPaid ? 'text-emerald-600 line-through' : 'text-emerald-600'
                  }`}>
                  {formatMoney(cost)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ACCIONES */}
        <div className="flex items-center gap-2 relative">

          {/* BOTÓN NEQUI - ABRE MODAL GLOBAL */}
          {nequiAccount && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenPayment(nequiAccount);
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all border ${isPaid
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                : 'bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100'
                } active:scale-95`}
            >
              <Icons.Wallet className="w-4 h-4" />
              {isPaid ? 'Ver' : 'Pagar'}
            </button>
          )}

          <button
            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
            className={`p-2 rounded-lg transition-colors ${expanded ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
          >
            {expanded ? <Icons.Up className="w-4 h-4" /> : <Icons.Down className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-slate-100 bg-slate-50/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-slate-100">
            <div className="p-6 bg-white">
              <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Desglose de Sesiones</h5>
              <div className="space-y-3">
                {teacher.sessions.map((s, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-sm transition-all">
                    <div className="text-center min-w-[50px]">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">{s.date.split(' ')[1]}</div>
                      <div className="text-base font-bold text-slate-700">{s.date.split(' ')[0]}</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${s.type === 'Teórica' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                          {s.type}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium uppercase">{s.time}</span>
                      </div>
                      <p className="text-xs text-slate-700 font-medium leading-relaxed">{s.topic}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-indigo-600">{s.hours}h</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-white flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vista Previa Reporte</h5>
                <div className="flex bg-slate-100 p-0.5 rounded-lg">
                  {['detailed', 'short'].map(m => (
                    <button
                      key={m}
                      onClick={(e) => { e.stopPropagation(); setMode(m); }}
                      className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${mode === m ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      {m === 'detailed' ? 'Plataforma' : 'Nequi'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 rounded-lg p-4 mb-4 relative group flex-1 overflow-hidden">
                <pre className="text-indigo-100 text-[11px] font-mono leading-relaxed whitespace-pre-wrap h-full overflow-y-auto custom-scrollbar">
                  {previewText}
                </pre>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); onCopy(previewText, mode === 'detailed' ? 'Descripción de la plataforma' : 'Nequi'); }}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-xs shadow-md shadow-indigo-100 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <Icons.Copy /> Copiar Reporte {mode === 'detailed' ? 'Plataforma' : 'Nequi'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [tab, setTab] = useState('reports');
  const [selectedWeek, setSelectedWeek] = useState(INITIAL_DATA[INITIAL_DATA.length - 1].id);
  const [rate, setRate] = useState(20000);
  const [toast, setToast] = useState(null);

  // ESTADO PARA EL MODAL DE PAGO
  const [paymentAccount, setPaymentAccount] = useState(null);

  // Duración del cache en días (configurable - actualmente 30 días)
  const CACHE_DURATION_DAYS = 30;
  const CACHE_DURATION_MS = CACHE_DURATION_DAYS * 24 * 60 * 60 * 1000;

  // ESTADO PARA TRACKING DE PAGOS (guardado en localStorage con timestamp)
  const [paidTeachers, setPaidTeachers] = useState(() => {
    try {
      const saved = localStorage.getItem('paidTeachers');
      const cacheTimestamp = localStorage.getItem('paidTeachers_timestamp');

      if (saved && cacheTimestamp) {
        const age = Date.now() - parseInt(cacheTimestamp);

        // Si el cache tiene menos de CACHE_DURATION_DAYS, usarlo
        if (age < CACHE_DURATION_MS) {
          return JSON.parse(saved);
        } else {
          // Cache expirado, limpiar
          localStorage.removeItem('paidTeachers');
          localStorage.removeItem('paidTeachers_timestamp');
          return {};
        }
      }
      return {};
    } catch (error) {
      console.error('Error loading paid teachers cache:', error);
      return {};
    }
  });

  // Guardar en localStorage cada vez que cambia, con timestamp
  useEffect(() => {
    try {
      localStorage.setItem('paidTeachers', JSON.stringify(paidTeachers));
      localStorage.setItem('paidTeachers_timestamp', Date.now().toString());

      // Mostrar info del cache en consola (opcional, comentar en producción)
      const expiryDate = new Date(Date.now() + CACHE_DURATION_MS);
      console.log(`💾 Datos guardados. Expiran el: ${expiryDate.toLocaleDateString('es-CO')} a las ${expiryDate.toLocaleTimeString('es-CO')}`);
    } catch (error) {
      console.error('Error saving paid teachers cache:', error);
    }
  }, [paidTeachers]);

  const current = INITIAL_DATA.find(w => w.id === selectedWeek);

  const totalH = INITIAL_DATA.reduce((acc, w) => acc + w.teachers.reduce((t, teach) => t + teach.totalHours, 0), 0);
  const total$ = totalH * rate;

  // Función para generar un ID único por profesor y semana
  const getTeacherId = (weekId, teacherName) => `week${weekId}-${teacherName.toLowerCase().replace(/\s+/g, '-')}`;

  // Función para marcar/desmarcar como pagado
  const togglePaid = (weekId, teacherName) => {
    const id = getTeacherId(weekId, teacherName);
    const newValue = !paidTeachers[id];

    setPaidTeachers(prev => ({
      ...prev,
      [id]: newValue ? Date.now() : undefined // Guardar timestamp cuando se marca como pagado
    }));

    setToast(paidTeachers[id] ? '❌ Marcado como no pagado' : '✅ Marcado como pagado');
    setTimeout(() => setToast(null), 2000);
  };

  // Verificar si un profesor está pagado
  const isPaid = (weekId, teacherName) => {
    const id = getTeacherId(weekId, teacherName);
    return !!paidTeachers[id];
  };

  const handleCopy = (text, type) => {
    const el = document.createElement("textarea");
    el.value = text;
    el.style.position = "fixed"; el.style.left = "-9999px"; el.style.top = "0";
    document.body.appendChild(el);
    el.select();
    try {
      document.execCommand('copy');
      setToast(`¡${type} copiado!`);
    } catch (e) {
      setToast('Error al copiar');
    }
    document.body.removeChild(el);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">

      {/* 1. SIDEBAR - OCULTO EN MÓVIL */}
      <aside className="w-20 bg-slate-900 flex flex-col items-center py-6 z-30 flex-shrink-0 shadow-xl mobile-hide-sidebar">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg mb-8">
          <Icons.Logo />
        </div>

        <nav className="flex-1 space-y-4 w-full px-3">
          <button
            onClick={() => setTab('reports')}
            className={`w-full p-3 rounded-xl flex flex-col items-center gap-1 transition-all group ${tab === 'reports' ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}
            title="Reportes"
          >
            <Icons.File />
            <span className="text-[10px] font-medium">Nómina</span>
          </button>
          <button
            onClick={() => setTab('finance')}
            className={`w-full p-3 rounded-xl flex flex-col items-center gap-1 transition-all group ${tab === 'finance' ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}
            title="Finanzas"
          >
            <Icons.Dashboard />
            <span className="text-[10px] font-medium">Global</span>
          </button>
        </nav>
      </aside>

      {/* 2. AREA PRINCIPAL */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* 2.1 HEADER RESPONSIVO */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-20 flex-shrink-0 mobile-header">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold tracking-tight text-slate-800 mobile-header-title">
              {tab === 'reports' ? 'Gestión de Nómina' : 'Dashboard Financiero'}
            </h1>
            {tab === 'reports' && (
              <>
                <div className="h-6 w-px bg-slate-200 mx-2 hidden md:block"></div>
                <div className="flex items-center gap-2 overflow-x-auto max-w-[200px] md:max-w-none no-scrollbar mobile-week-selector">
                  {INITIAL_DATA.map(w => (
                    <button
                      key={w.id}
                      onClick={() => setSelectedWeek(w.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all mobile-week-btn ${selectedWeek === w.id ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                    >
                      {w.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 mobile-rate-input">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Valor Hora</span>
            <div className="flex items-center gap-1">
              <span className="text-slate-400 font-bold text-sm">$</span>
              <input
                type="number"
                value={rate}
                onChange={e => setRate(Number(e.target.value))}
                className="w-20 bg-transparent outline-none text-sm font-bold text-slate-800 text-right"
              />
            </div>
          </div>
        </header>

        {/* 2.2 CONTENIDO */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth bg-slate-50/50 mobile-main-content">
          <div className="max-w-6xl mx-auto">

            {tab === 'reports' && (
              <div className="space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-baseline justify-between">
                  <h2 className="text-lg font-bold text-slate-700 mobile-period-title">Periodo: {current.range}</h2>
                  <span className="text-xs font-medium text-slate-400 mobile-teacher-count">{current.teachers.length} docentes activos</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mobile-stats-grid">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 mobile-stat-card">
                    <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><Icons.Clock /></div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Horas Totales</p>
                      <p className="text-xl font-bold text-slate-800">{current.teachers.reduce((a, t) => a + t.totalHours, 0)}h</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 mobile-stat-card">
                    <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600"><Icons.Dollar /></div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Total a Pagar</p>
                      <p className="text-xl font-bold text-slate-800">{formatMoney(current.teachers.reduce((a, t) => a + t.totalHours, 0) * rate)}</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 mobile-stat-card">
                    <div className="bg-purple-50 p-2 rounded-lg text-purple-600"><Icons.Users /></div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Docentes</p>
                      <p className="text-xl font-bold text-slate-800">{current.teachers.length}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {current.teachers.map((teacher, i) => (
                    <TeacherRow
                      key={i}
                      teacher={teacher}
                      weekId={selectedWeek}
                      weekName={current.name}
                      weekRange={current.range}
                      hourlyRate={rate}
                      onCopy={handleCopy}
                      onOpenPayment={setPaymentAccount}
                      isPaid={isPaid(selectedWeek, teacher.name)}
                      onTogglePaid={togglePaid}
                    />
                  ))}
                </div>
              </div>
            )}

            {tab === 'finance' && (
              <div className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Total Acumulado (Semanas 1-4)</p>
                  <h3 className="text-5xl font-black text-slate-800 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600">
                    {formatMoney(total$)}
                  </h3>
                  <div className="mt-4 flex justify-center gap-4 text-sm font-medium text-slate-500">
                    <span>{totalH} Horas Totales</span>
                    <span>•</span>
                    <span>{INITIAL_DATA.length} Periodos</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <th className="px-6 py-4">Semana</th>
                          <th className="px-6 py-4">Rango</th>
                          <th className="px-6 py-4 text-center">Horas</th>
                          <th className="px-6 py-4 text-right">Monto</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {INITIAL_DATA.map(w => {
                          const h = w.teachers.reduce((a, t) => a + t.totalHours, 0);
                          return (
                            <tr key={w.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4 font-bold text-slate-800">{w.name}</td>
                              <td className="px-6 py-4 text-slate-500 text-xs font-medium">{w.range}</td>
                              <td className="px-6 py-4 text-center">
                                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">{h}h</span>
                              </td>
                              <td className="px-6 py-4 text-right font-bold text-emerald-600">
                                {formatMoney(h * rate)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* MODAL DE PAGO (RENDERIZADO EN LA RAÍZ) */}
      <PaymentModal
        account={paymentAccount}
        onClose={() => setPaymentAccount(null)}
        onCopy={handleCopy}
      />

      {/* BOTÓN FLOTANTE GLOBAL NEQUI */}
      <NequiFloatingButton />

      {toast && <Toast message={toast} />}
    </div>
  );
}
