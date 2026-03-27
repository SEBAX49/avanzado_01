import CardDetail from './CardDetail';

const personajes = [
  {
    nombre: "Pepe",
    numero: "001",
    tipo: "CULEAO",
    ataque: 300,
    defensa: 1,
    imagen: "URL_DE_TU_IMAGEN_DE_PEPE",
    descripcion: "La rana más poderosa del reino digital. Temido por todos."
  },
  {
    nombre: "Electivire",
    numero: "002",
    tipo: "Eléctrico",
    ataque: 122,
    defensa: 80,
    imagen: "URL_DE_ELECTIVIRE",
    descripcion: "Electivire, el Pokémon Rayo. Genera millones de voltios con sus puños."
  },
  {
    nombre: "Charizard",
    numero: "006",
    tipo: "Fuego",
    ataque: 184,
    defensa: 78,
    imagen: "",
    descripcion: "Sus llamas son lo suficientemente calientes como para fundir roca."
  },
];

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden font-sans">

      {/* ── Background dark gradient ── */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: "linear-gradient(135deg, #0a0618 0%, #100a2e 40%, #0c0618 70%, #130526 100%)",
        }}
      />

      {/* ── Ambient orbs ── */}
      <div
        className="fixed -top-40 -left-40 w-[600px] h-[600px] rounded-full -z-10 opacity-20 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #7c3aed, transparent 70%)",
          animation: "orb-move 12s ease-in-out infinite",
        }}
      />
      <div
        className="fixed -bottom-40 -right-40 w-[500px] h-[500px] rounded-full -z-10 opacity-20 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #ec4899, transparent 70%)",
          animation: "orb-move 15s ease-in-out infinite reverse",
        }}
      />
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full -z-10 opacity-10 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #38bdf8, transparent 70%)",
          animation: "orb-move 18s ease-in-out infinite 3s",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">

        {/* Header */}
        <header className="text-center mb-16" style={{ animation: "slide-up 0.7s cubic-bezier(0.16,1,0.3,1) both" }}>
          <p className="text-xs uppercase tracking-[0.4em] text-white/30 mb-3 font-semibold">✦ Colección Épica ✦</p>
          <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tight gradient-text mb-4">
            Mi Colección
          </h1>
          <p className="text-white/40 text-lg max-w-md mx-auto leading-relaxed">
            Explora tus personajes legendarios. Haz clic en las cartas para descubrir más.
          </p>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-purple-500/60" />
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <div className="text-purple-400/60 text-xs">✦</div>
            <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" style={{ animationDelay: "0.3s" }} />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-pink-500/60" />
          </div>
        </header>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {personajes.map((p, index) => (
            <div
              key={index}
              style={{ animation: `card-enter 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 150}ms both` }}
            >
              <CardDetail
                nombre={p.nombre}
                numero={p.numero}
                tipo={p.tipo}
                ataque={p.ataque}
                defensa={p.defensa}
                imagen={p.imagen}
                descripcion={p.descripcion}
                delay={index * 150}
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer
          className="text-center mt-20"
          style={{ animation: "fade-in 1s ease 0.8s both" }}
        >
          <p className="text-white/15 text-sm tracking-widest uppercase">
            ✦ Colección · {personajes.length} personajes ✦
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;