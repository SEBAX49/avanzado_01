import { useState } from 'react';
import CardDetail from '../components/CardDetail';
import Modal from '../components/Modal';
import type { Card } from '../types/card';

interface HomeProps {
  cards: Card[];
  onDeleteCard: (id: number) => void;
}

export function Home({ cards, onDeleteCard }: HomeProps) {
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
        <p className="text-[10px] font-sans uppercase tracking-[0.4em] text-gray-500 mb-3 font-semibold">✦ Bestiario de Hallownest ✦</p>
        <h1 className="text-5xl md:text-6xl font-serif uppercase tracking-widest text-[#e2e2e2] inline-block origin-center animate-title-glow mb-4">
          Diario del Cazador
        </h1>
        <p className="text-gray-400 font-sans text-lg max-w-md mx-auto leading-relaxed italic">
          Conocimiento de bestias, guerreros y horrores del reino. Pulsa un sello para revelar su registro.
        </p>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <div className="h-[2px] w-32 bg-gradient-to-r from-transparent to-slate-500 animate-draw-line-l" style={{ transformOrigin: 'right' }} />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#e0e0e0] shadow-[0_0_8px_#f7f7f7] animate-pulse-slow object-center" />
          <div className="text-gray-400 text-[10px] uppercase font-serif tracking-[0.4em] mx-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>Vacío</div>
          <div className="w-1.5 h-1.5 rotate-45 bg-[#e0e0e0] shadow-[0_0_8px_#f7f7f7] animate-pulse-slow" style={{ animationDelay: '0.2s' }} />
          <div className="h-[2px] w-32 bg-gradient-to-l from-transparent to-slate-500 animate-draw-line-r" style={{ transformOrigin: 'left' }} />
        </div>
      </header>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
        {cards.map((p, index) => (
          <div
            key={p.idCard ?? index}
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
        onDelete={onDeleteCard}
        personaje={selectedPersonaje} 
      />
    </div>
  );
}
