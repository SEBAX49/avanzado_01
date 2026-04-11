import { useEffect } from "react";
import type { Card } from "../types/card";
import { useNavigate } from "react-router-dom";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (idCard: number) => void; 
  personaje: Card | null;
};

// 1. Componente de botón estilizado "Piedra Gótica"
function BotonEliminar({ onClick }: { onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="bg-[#1a0f0f] border border-[#3e1414] hover:bg-[#2b1212] text-red-500 hover:text-red-400 py-1.5 px-4 rounded-sm cursor-pointer transition-colors font-serif text-xs uppercase tracking-widest shadow-[inset_0_0_8px_rgba(0,0,0,0.8)]"
    >
      Descartar
    </button>
  );
}

const tipoColors: Record<string, { from: string; to: string; badge: string }> = {
  CULEAO: { from: "#1e1b4b", to: "#000000", badge: "bg-black/50 text-purple-300 border-purple-900" },
  "Eléctrico": { from: "#422006", to: "#050505", badge: "bg-black/50 text-yellow-500 border-yellow-900" },
  Fuego: { from: "#450a0a", to: "#000000", badge: "bg-black/50 text-orange-500 border-red-900" },
  Agua: { from: "#082f49", to: "#020617", badge: "bg-black/50 text-blue-300 border-blue-900" },
  Planta: { from: "#052e16", to: "#000000", badge: "bg-black/50 text-green-400 border-green-900" },
  default: { from: "#1e293b", to: "#0f172a", badge: "bg-black/50 text-gray-300 border-gray-600" },
};

function Modal({ isOpen, onClose, onDelete, personaje }: ModalProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !personaje) return null;

  const handleDelete = () => {
    if (personaje.idCard !== undefined && window.confirm(`¿Abandonar el registro de ${personaje.name}?`)) {
      onDelete(personaje.idCard);
      onClose();
    }
  };

  const handleEdit = () => {
    if (personaje.idCard !== undefined) {
      navigate(`/edit/${personaje.idCard}`);
      onClose();
    }
  }

  const tipo = personaje.attributes?.tipo ?? "default";
  const numero = personaje.attributes?.numero ?? "000";
  const isCustom = tipo === "Personalizado";
  const displayTipo = isCustom ? (personaje.attributes?.customType || "Desconocido") : tipo;
  const customColor = personaje.attributes?.customColor || "#ffffff";
  const theme = isCustom ? {
    from: customColor,
    to: customColor,
    badge: "bg-black/50 border-gray-500 font-serif",
    bar: "" 
  } : (tipoColors[tipo] ?? tipoColors.default);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
      />
 
      <div
        className="relative w-full max-w-2xl hk-border rounded-sm overflow-hidden animate-slide-up"
        style={{ animationDuration: '0.4s' }}
      >
        {/* Subtle background gradient based on theme */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ background: `radial-gradient(circle at center, ${theme.from} 0%, transparent 70%)` }}
        />

        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center bg-[#080808]/80">
          <div className="flex-shrink-0">
            <div className="relative group p-2">
              <div className="absolute inset-0 border border-slate-700 rotate-45 rounded-sm opacity-20" />
              {personaje.pictureUrl && !personaje.pictureUrl.startsWith("URL_") ? (
                <img src={personaje.pictureUrl} alt={personaje.name} className="w-48 h-48 object-cover relative rounded-full border-4 border-[#1c1c1c] z-10 drop-shadow-[0_0_20px_rgba(0,0,0,1)] grayscale-20" />
              ) : (
                <div className="w-48 h-48 rounded-full flex items-center justify-center text-7xl font-serif text-slate-500 relative z-10 shadow-inner bg-[#111]"
                  style={{ border: `4px solid #1c1c1c` }}>
                  {personaje.name.charAt(0)}
                </div>
              )}
            </div>
          </div>

          <div className="flex-grow text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
              <span className="text-sm font-serif text-gray-500 tracking-widest">Nº {numero}</span>
              <span 
                className={`px-3 py-1 rounded-sm text-[10px] font-sans uppercase tracking-[0.2em] border ${theme.badge} shadow-sm`}
                style={isCustom ? { color: customColor, borderColor: customColor } : {}}
              >
                {displayTipo}
              </span>
              
              <BotonEliminar onClick={handleDelete} />
              
              <button onClick={handleEdit} className="bg-[#1c1f24] hover:bg-[#282d34] border border-[#2d3748] text-gray-300 py-1.5 px-4 rounded-sm cursor-pointer font-serif text-xs uppercase tracking-widest transition-colors shadow-[inset_0_0_8px_rgba(0,0,0,0.8)]">
                Inscribir
              </button>
            </div>

            <h2 className="text-4xl md:text-5xl font-serif text-gray-200 uppercase tracking-tighter mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] border-b border-slate-800 pb-2 inline-block">
              {personaje.name}
            </h2>

            <p className="text-gray-400 font-sans text-sm md:text-base leading-relaxed mb-8 italic border-l-2 border-slate-700 pl-4 py-1">
              {personaje.description}
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-[#0b0c10] border border-slate-800 rounded-sm p-4 hover:border-slate-600 transition-colors">
                <p className="text-[10px] font-sans text-gray-500 uppercase tracking-widest mb-1">Ataque</p>
                <p className="text-2xl font-serif font-black text-gray-300">{personaje.attack}</p>
                <div className="h-0.5 bg-slate-900 mt-2 relative">
                  <div className={`absolute top-0 left-0 h-full transition-all duration-1000 ${isCustom ? "" : "bg-slate-400"}`} style={{ width: `${Math.min(((personaje.attack ?? 0) / 350) * 100, 100)}%`, ...(isCustom ? { backgroundColor: customColor } : {}) }} />
                </div>
              </div>
              <div className="bg-[#0b0c10] border border-slate-800 rounded-sm p-4 hover:border-slate-600 transition-colors">
                <p className="text-[10px] font-sans text-gray-500 uppercase tracking-widest mb-1">Defensa</p>
                <p className="text-2xl font-serif font-black text-gray-300">{personaje.defense}</p>
                <div className="h-0.5 bg-slate-900 mt-2 relative">
                  <div className={`absolute top-0 left-0 h-full transition-all duration-1000 ${isCustom ? "" : "bg-slate-500"}`} style={{ width: `${Math.min(((personaje.defense ?? 0) / 350) * 100, 100)}%`, ...(isCustom ? { backgroundColor: customColor } : {}) }} />
                </div>
              </div>
              <div className="bg-[#0b0c10] border border-slate-800 rounded-sm p-4 hover:border-slate-600 transition-colors col-span-2 lg:col-span-1">
                <p className="text-[10px] font-sans text-gray-500 uppercase tracking-widest mb-1">Alma (HP)</p>
                <p className="text-2xl font-serif font-black text-gray-300">{personaje.lifePoints || 0}</p>
                <div className="h-0.5 bg-slate-900 mt-2 relative">
                  <div className={`absolute top-0 left-0 h-full transition-all duration-1000 ${isCustom ? "" : "bg-[#86c6f4]"}`} style={{ width: `${Math.min(((personaje.lifePoints ?? 0) / 5000) * 100, 100)}%`, ...(isCustom ? { backgroundColor: customColor } : {}) }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute cursor-pointer top-4 right-4 w-8 h-8 rounded-sm bg-transparent flex items-center justify-center text-gray-500 hover:text-white transition-all font-serif hover:scale-110 active:scale-95 z-50 text-xl"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default Modal;