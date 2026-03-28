import { useState } from 'react';
import CardDetail from '../components/CardDetail';
import Modal from '../components/Modal';
import { Card } from '../types/card';

interface HomeProps {
  cards: Card[];
}

export function Home({ cards }: HomeProps) {
  const [selectedPersonaje, setSelectedPersonaje] = useState<Card | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (p: Card) => {
    setSelectedPersonaje(p);
    setIsModalOpen(true);
  };

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-6 py-28 overflow-visible">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
        {cards.map((p, index) => (
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

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        personaje={selectedPersonaje} 
      />
    </div>
  );
}
