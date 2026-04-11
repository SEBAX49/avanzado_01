import { useState } from "react";

type Props = {
  name: string;
  attack: number;
  defense: number;
  description: string;
  pictureUrl: string;
  attributes?: { tipo?: string; numero?: string; customType?: string; customColor?: string };
  delay?: number;
};

// Paleta lúgubre / Bestiario
const tipoColors: Record<string, { from: string; to: string; badge: string; bar: string }> = {
  CULEAO: { from: "#1e1b4b", to: "#000000", badge: "bg-black/50 text-purple-300 border-purple-900", bar: "bg-purple-900" },
  "Eléctrico": { from: "#422006", to: "#050505", badge: "bg-black/50 text-yellow-500 border-yellow-900", bar: "bg-yellow-700" },
  Fuego: { from: "#450a0a", to: "#000000", badge: "bg-black/50 text-orange-500 border-red-900", bar: "bg-red-900" },
  Agua: { from: "#082f49", to: "#020617", badge: "bg-black/50 text-blue-300 border-blue-900", bar: "bg-blue-900" },
  Planta: { from: "#052e16", to: "#000000", badge: "bg-black/50 text-green-400 border-green-900", bar: "bg-green-900" },
  default: { from: "#1e293b", to: "#0f172a", badge: "bg-black/50 text-gray-300 border-gray-600", bar: "bg-slate-600" },
};

function StatBar({ label, value, max = 350, colorClass, customColor }: { label: string; value: number; max?: number; colorClass: string; customColor?: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-gray-400">{label}</span>
        <span className="text-xs font-serif font-bold text-gray-200">{value}</span>
      </div>
      <div className="h-[3px] w-full bg-slate-800 overflow-hidden relative border border-slate-700">
        <div
          className={`h-full transition-all duration-1000 ease-out ${colorClass}`}
          style={{ width: `${pct}%`, ...(customColor ? { backgroundColor: customColor } : {}) }}
        />
      </div>
    </div>
  );
}

function CardDetail({ attack, defense, description, pictureUrl, name, attributes, delay = 0 }: Props) {
  const [hovered, setHovered] = useState(false);
  
  const tipo = attributes?.tipo ?? "default";
  const numero = attributes?.numero ?? "000";
  const isCustom = tipo === "Personalizado";
  const displayTipo = isCustom ? (attributes?.customType || "Desconocido") : tipo;
  const customColor = attributes?.customColor || "#ffffff";
  const theme = isCustom ? {
    from: "#000000",
    to: "#000000",
    badge: "bg-black/50 border-gray-600 font-serif",
    bar: ""
  } : (tipoColors[tipo] ?? tipoColors.default);

  return (
    <div
      className="group relative"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`relative w-full overflow-hidden transition-all duration-500 hk-border ${hovered ? "-translate-y-2" : ""}`}
        style={{
          minHeight: "420px",
          background: `radial-gradient(ellipse at top, ${theme.from} 0%, #000 80%)`,
        }}
      >
        {/* Top subtle texture strip */}
        <div
          className="absolute top-0 left-0 right-0 h-32 pointer-events-none transition-all duration-500 overflow-hidden"
          style={{ opacity: hovered ? 0.4 : 0.1 }}
        >
          {pictureUrl && !pictureUrl.startsWith("URL_") && (
            <img
              src={pictureUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-cover blur-md grayscale scale-150"
            />
          )}
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-black" />
        </div>

        <div className="relative z-10 p-6 flex flex-col gap-4 h-full">
          {/* Header row */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-serif text-gray-500 tracking-widest">Nº {numero}</span>
            <span 
              className={`px-3 py-1 text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] border ${theme.badge} shadow-sm`}
              style={isCustom ? { color: customColor, borderColor: customColor } : {}}
            >
              {displayTipo}
            </span>
          </div>

          {/* Image Area */}
          <div className="flex justify-center h-28 relative mt-2">
            {pictureUrl && !pictureUrl.startsWith("URL_") ? (
              <img
                src={pictureUrl}
                alt={name}
                className="h-28 w-28 border-2 border-slate-600 rounded-sm object-cover grayscale-30 shadow-[0_0_15px_rgba(0,0,0,1)] group-hover:grayscale-0 transition-all duration-500"
              />
            ) : (
              <div
                className="h-28 w-28 rounded-sm bg-[#050505] flex items-center justify-center text-5xl font-serif text-slate-500 border-2 border-slate-700 shadow-inner"
              >
                {name.charAt(0)}
              </div>
            )}
            {/* Ornamentation border corners */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-slate-400 opacity-50" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-slate-400 opacity-50" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-slate-400 opacity-50" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-slate-400 opacity-50" />
          </div>

          {/* Name & Desc */}
          <div className="text-center mt-3">
            <h2 className="text-xl font-serif uppercase tracking-[0.15em] text-gray-200 transition-all duration-500 group-hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {name}
            </h2>
            <div className="w-12 h-px bg-slate-600 mx-auto mt-2 mb-3" />
            <p className="text-xs font-sans text-gray-400 italic line-clamp-2 px-2 overflow-hidden h-8">{description}</p>
          </div>

          {/* Stats Summary */}
          <div className="flex flex-col gap-3 mt-auto bg-black/40 p-3 border border-slate-800">
            {isCustom ? (
               <>
                 <StatBar label="Ataque" value={attack} colorClass="" customColor={customColor} />
                 <StatBar label="Defensa" value={defense} colorClass="" customColor={customColor} />
               </>
            ) : (
               <>
                 <StatBar label="Ataque" value={attack} colorClass={theme.bar} />
                 <StatBar label="Defensa" value={defense} colorClass={theme.bar} />
               </>
            )}
          </div>

          {/* Hint */}
          <p className="text-center text-[9px] font-sans text-slate-600 mt-2 uppercase tracking-[0.2em] group-hover:text-slate-400 transition-colors">
            Examinar Registro
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardDetail;