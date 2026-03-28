import { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  // Añadimos la función que manejará la eliminación en el estado global/padre
  onDelete: (numero: string) => void; 
  personaje: {
    nombre: string;
    numero: string;
    tipo: string;
    ataque: number;
    defensa: number;
    descripcion: string;
    imagen: string;
  } | null;
};

// 1. Componente de botón reutilizable y funcional
function BotonEliminar({ onClick }: { onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="bg-red-600 hover:bg-red-700 text-white py-2 px-5 rounded-2xl cursor-pointer transition-colors font-bold text-xs uppercase"
    >
      Eliminar
    </button>
  );
}

const tipoColors: Record<string, { from: string; to: string; badge: string }> = {
  CULEAO: { from: "#7c3aed", to: "#ec4899", badge: "bg-pink-500/20 text-pink-300 border-pink-500/40" },
  "Eléctrico": { from: "#f59e0b", to: "#fbbf24", badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40" },
  Fuego: { from: "#ef4444", to: "#f97316", badge: "bg-orange-500/20 text-orange-300 border-orange-500/40" },
  Agua: { from: "#0ea5e9", to: "#38bdf8", badge: "bg-sky-500/20 text-sky-300 border-sky-500/40" },
  Planta: { from: "#22c55e", to: "#86efac", badge: "bg-green-500/20 text-green-300 border-green-500/40" },
  default: { from: "#6366f1", to: "#8b5cf6", badge: "bg-violet-500/20 text-violet-300 border-violet-500/40" },
};

function Modal({ isOpen, onClose, onDelete, personaje }: ModalProps) {
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

  // 2. Función para manejar el clic en eliminar
  const handleDelete = () => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar a ${personaje.nombre}?`)) {
      onDelete(personaje.numero);
      onClose(); // Cerramos el modal después de eliminar
    }
  };

  const theme = tipoColors[personaje.tipo] ?? tipoColors.default;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-2xl bg-[#0c081c] rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl shadow-purple-500/20 animate-slide-up"
        style={{ animationDuration: '0.4s' }}
      >
        <div
          className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[100px] opacity-30"
          style={{ background: theme.from }}
        />

        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-shrink-0">
            <div className="relative group">
              <div className="absolute inset-0 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all" />
              {personaje.imagen && !personaje.imagen.startsWith("URL_") ? (
                <img src={personaje.imagen} alt={personaje.nombre} className="w-48 h-48 object-cover relative rounded-full border-2 border-white/50 z-10 drop-shadow-2xl animate-float" />
              ) : (
                <div className="w-48 h-48 rounded-full flex items-center justify-center text-7xl font-black text-white relative z-10 shadow-xl"
                  style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}>
                  {personaje.nombre.charAt(0)}
                </div>
              )}
            </div>
          </div>

          <div className="flex-grow text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
              <span className="text-sm font-mono text-white/30 tracking-widest">#{personaje.numero}</span>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${theme.badge}`}>
                {personaje.tipo}
              </span>
              
              {/* 3. Implementación del botón de eliminar */}
              <BotonEliminar onClick={handleDelete} />
              
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-5 rounded-2xl cursor-pointer font-bold text-xs uppercase transition-colors">
                Editar
              </button>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
              {personaje.nombre}
            </h2>

            <p className="text-white/60 text-lg leading-relaxed mb-8 italic">
              "{personaje.descripcion}"
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/5 rounded-2xl p-4 hover:bg-white/10 transition-colors">
                <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Ataque</p>
                <p className="text-3xl font-black text-white">{personaje.ataque}</p>
                <div className="h-1 bg-white/10 mt-2 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000" style={{ width: `${Math.min((personaje.ataque / 350) * 100, 100)}%` }} />
                </div>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-2xl p-4 hover:bg-white/10 transition-colors">
                <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Defensa</p>
                <p className="text-3xl font-black text-white">{personaje.defensa}</p>
                <div className="h-1 bg-white/10 mt-2 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-1000" style={{ width: `${Math.min((personaje.defensa / 350) * 100, 100)}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute cursor-pointer top-6 right-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-white/10 hover:text-white transition-all border border-white/10 hover:scale-110 active:scale-95 z-50"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default Modal;