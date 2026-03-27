import { useState } from 'react';
import CardDetail from './CardDetail';
import Modal from './Modal';

const personajes = [
  {
    nombre: "Pepe",
    numero: "001",
    tipo: "CULEAO",
    ataque: 300,
    defensa: 1,
    imagen: "URL_DE_TU_IMAGEN_DE_PEPE",
    descripcion: "La rana más poderosa del reino digital. Su mirada puede juzgar tu alma desde el otro lado de la pantalla."
  },
  {
    nombre: "Electivire",
    numero: "002",
    tipo: "Eléctrico",
    ataque: 122,
    defensa: 80,
    imagen: "URL_DE_ELECTIVIRE",
    descripcion: "Electivire, el Pokémon Rayo. Sus dos colas pueden liberar una descarga de 20.000 voltios en un instante."
  },
  {
    nombre: "Charizard",
    numero: "006",
    tipo: "Fuego",
    ataque: 184,
    defensa: 78,
    imagen: "",
    descripcion: "Sus llamas son lo suficientemente calientes como para fundir roca sólida. Es el epítome del poder ígneo."
  },
];

function App() {
  const [selectedPersonaje, setSelectedPersonaje] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (p: any) => {
    setSelectedPersonaje(p);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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

      {/* ── Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">

        {/* Header */}
        <header className="text-center mb-16" style={{ animation: "slide-up 0.7s cubic-bezier(0.16,1,0.3,1) both" }}>
          <p className="text-xs uppercase tracking-[0.4em] text-white/30 mb-3 font-semibold">✦ Colección Épica ✦</p>
          <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tight gradient-text mb-4">
            Mi Colección
          </h1>
          <p className="text-white/40 text-lg max-w-md mx-auto leading-relaxed">
            Explora tus personajes legendarios. Haz clic en las cartas para ver sus detalles.
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
              onClick={() => handleOpenModal(p)}
              className="cursor-pointer"
            >
              <CardDetail
                {...p}
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

      {/* ── Modal ── */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        personaje={selectedPersonaje} 
      />
    </div>
  );
}

export default App;