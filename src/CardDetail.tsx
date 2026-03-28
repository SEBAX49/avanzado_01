import { useState } from "react";

type Props = {
  numero: string;
  nombre: string;
  tipo: string;
  ataque: number;
  defensa: number;
  descripcion: string;
  imagen: string;
  delay?: number;
  
};

const tipoColors: Record<string, { from: string; to: string; badge: string; bar: string }> = {
  CULEAO: { from: "#7c3aed", to: "#ec4899", badge: "bg-pink-500/20 text-pink-300 border-pink-500/40", bar: "from-purple-500 to-pink-500" },
  "Eléctrico": { from: "#f59e0b", to: "#fbbf24", badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40", bar: "from-yellow-400 to-amber-500" },
  Fuego: { from: "#ef4444", to: "#f97316", badge: "bg-orange-500/20 text-orange-300 border-orange-500/40", bar: "from-red-500 to-orange-500" },
  Agua: { from: "#0ea5e9", to: "#38bdf8", badge: "bg-sky-500/20 text-sky-300 border-sky-500/40", bar: "from-sky-500 to-blue-400" },
  Planta: { from: "#22c55e", to: "#86efac", badge: "bg-green-500/20 text-green-300 border-green-500/40", bar: "from-green-500 to-emerald-400" },
  default: { from: "#6366f1", to: "#8b5cf6", badge: "bg-violet-500/20 text-violet-300 border-violet-500/40", bar: "from-indigo-500 to-violet-500" },
};

function StatBar({ label, value, max = 350, colorClass }: { label: string; value: number; max?: number; colorClass: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-white/50">{label}</span>
        <span className="text-sm font-bold text-white/90">{value}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${colorClass} transition-all duration-1000 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function CardDetail({ ataque, defensa, descripcion, imagen, nombre, numero, tipo, delay = 0 }: Props) {
  const [hovered, setHovered] = useState(false);
  const theme = tipoColors[tipo] ?? tipoColors.default;

  return (
    <div
      className="group relative"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── CARD FRONT ── */}
      <div
        className={`relative w-full rounded-3xl border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-500 ${hovered ? "border-white/25 -translate-y-3 scale-[1.02]" : "shadow-lg"}`}
        style={{
          minHeight: "420px",
          background: "rgba(12, 8, 28, 0.80)",
          boxShadow: hovered
            ? `0 0 40px ${theme.from}55, 0 20px 60px rgba(0,0,0,0.6)`
            : "0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        {/* Top gradient strip */}
        <div
          className="absolute top-0 left-0 right-0 h-48 opacity-20 pointer-events-none transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`,
            opacity: hovered ? 0.4 : 0.2
          }}
        />

        {/* Orb glow behind image */}
        <div
          className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-3xl opacity-40 pointer-events-none transition-all duration-700"
          style={{
            background: `radial-gradient(circle, ${theme.from}, ${theme.to})`,
            transform: hovered ? "translateX(-50%) scale(1.8)" : "translateX(-50%) scale(1)"
          }}
        />

        <div className="relative z-10 p-6 flex flex-col gap-4 h-full">
          {/* Header row */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-white/30 tracking-widest">#{numero}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${theme.badge}`}>
              {tipo}
            </span>
          </div>

          {/* Image Area */}
          <div className="flex justify-center h-28 relative">
            {imagen && !imagen.startsWith("URL_") ? (
              <img
                src={imagen}
                alt={nombre}
                className="h-28 w-28 object-contain drop-shadow-[0_0_16px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div
                className="h-28 w-28 rounded-full flex items-center justify-center text-5xl font-black shadow-inner"
                style={{
                  background: `linear-gradient(135deg, ${theme.from}33, ${theme.to}33)`,
                  border: `2px solid ${theme.from}44`,
                  color: "white"
                }}
              >
                {nombre.charAt(0)}
              </div>
            )}
          </div>

          {/* Name & Desc */}
          <div className="text-center mt-2">
            <h2
              className="text-2xl font-black uppercase tracking-wider gradient-text transition-all duration-500"
              style={{
                backgroundImage: `linear-gradient(90deg, ${theme.from}, ${theme.to}, ${theme.from})`,
                transform: hovered ? "scale(1.05)" : "scale(1)"
              }}
            >
              {nombre}
            </h2>
            <p className="text-xs text-white/40 mt-1 italic line-clamp-2 px-2 overflow-hidden h-8">{descripcion}</p>
          </div>

          {/* Stats Summary */}
          <div className="flex flex-col gap-3 mt-auto">
            <StatBar label="Ataque" value={ataque} colorClass={theme.bar} />
            <StatBar label="Defensa" value={defensa} colorClass={theme.bar} />
          </div>

          {/* Hint */}
          <p className="text-center text-[10px] text-white/20 mt-2 uppercase tracking-[0.2em] font-bold group-hover:text-white/40 transition-colors">
            Click para ver mas detalles ✦
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardDetail;