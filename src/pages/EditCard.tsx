import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Card } from '../types/card';

interface EditCardProps {
  cards: Card[];
  onUpdateCard: (id: number, card: Partial<Card>) => Promise<boolean>;
}

const TIPOS = ["CULEAO", "Eléctrico", "Fuego", "Agua", "Planta", "Normal", "Personalizado"];

export function EditCard({ cards, onUpdateCard }: EditCardProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    numero: '',
    tipo: 'CULEAO',
    customType: '',
    customColor: '#4f46e5',
    attack: 50,
    defense: 50,
    description: '',
    pictureUrl: '',
    lifePoints: 50
  });

  useEffect(() => {
    if (cards.length > 0 && id) {
      const cardToEdit = cards.find(c => String(c.idCard) === String(id));
      if (cardToEdit) {
        setFormData({
          name: cardToEdit.name || '',
          numero: cardToEdit.attributes?.numero || '',
          tipo: cardToEdit.attributes?.tipo === 'Personalizado' ? 'Personalizado' : (TIPOS.includes(cardToEdit.attributes?.tipo || 'CULEAO') ? (cardToEdit.attributes?.tipo || 'CULEAO') : 'Personalizado'),
          customType: cardToEdit.attributes?.customType || cardToEdit.attributes?.tipo || '',
          customColor: cardToEdit.attributes?.customColor || '#4f46e5',
          attack: cardToEdit.attack || 50,
          defense: cardToEdit.defense || 50,
          description: cardToEdit.description || '',
          pictureUrl: cardToEdit.pictureUrl || '',
          lifePoints: cardToEdit.lifePoints || 50
        });
      }
    }
  }, [cards, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.numero) {
      alert("Por favor completa los campos básicos.");
      return;
    }
    
    if (id) {
      await onUpdateCard(Number(id), {
        name: formData.name,
        description: formData.description,
        attack: formData.attack,
        defense: formData.defense,
        lifePoints: formData.lifePoints,
        pictureUrl: formData.pictureUrl,
        attributes: {
          tipo: formData.tipo,
          numero: formData.numero,
          customType: formData.customType,
          customColor: formData.customColor
        }
      });
    }
    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: (name === 'attack' || name === 'defense' || name === 'lifePoints') ? parseInt(value) || 0 : value
    }));
  };

  if (cards.length === 0) {
    return <div className="text-white text-center py-32 text-xl italic opacity-50">Cargando carta...</div>;
  }

  return (
    <div className="relative z-10 max-w-2xl mx-auto px-6 py-32">
      <div
        className="bg-[#080808]/90 p-8 md:p-12 rounded-sm hk-border shadow-2xl animate-card-enter shadow-slate-900/50"
      >
        <header className="mb-10 text-center border-b border-slate-800 pb-6">
          <h2 className="text-3xl md:text-4xl font-serif uppercase tracking-[0.15em] text-[#e2e2e2] mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Editar Registro</h2>
          <p className="text-gray-500 text-sm font-sans italic">Interviene en el conocimiento sagrado del sello.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-sans ml-1">Nombre</label>
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej. El Caballero"
                className="w-full hk-input px-3 py-2"
              />
            </div>
            {/* Número */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-sans ml-1">Número</label>
              <input
                required
                type="number"
                min="0"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                placeholder="Ej. 1"
                className="w-full hk-input px-3 py-2"
              />
            </div>
          </div>

          {/* Tipo */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-sans ml-1">Atributo Elemental</label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="w-full bg-[#111] border border-slate-700 rounded-sm px-3 py-2 text-gray-300 font-serif appearance-none cursor-pointer focus:outline-none focus:border-slate-400"
            >
              {TIPOS.map(t => <option key={t} value={t} className="bg-[#0b0c10]">{t}</option>)}
            </select>
          </div>

          {formData.tipo === 'Personalizado' && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border border-slate-800 bg-black/40 rounded-sm">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-sans ml-1">Nombre Desconocido</label>
                  <input
                    required
                    name="customType"
                    value={formData.customType}
                    onChange={handleChange}
                    placeholder="Ej. Vacío"
                    className="w-full hk-input px-3 py-2"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-sans ml-1">Sello Cromático</label>
                  <input
                    required
                    type="color"
                    name="customColor"
                    value={formData.customColor}
                    onChange={handleChange}
                    className="w-full h-10 cursor-pointer bg-transparent border-0 p-0"
                  />
                </div>
             </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ataque */}
            <div className="space-y-2 text-center md:text-left">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-sans ml-1 flex justify-between">
                <span>Fuerza de Aguijón</span>
                <span className="text-slate-300 font-serif">{formData.attack}</span>
              </label>
              <input
                 type="range"
                 name="attack"
                 min="1"
                 max="350"
                 value={formData.attack}
                 onChange={handleChange}
                 className="w-full h-1 bg-slate-800 appearance-none cursor-pointer accent-slate-400"
              />
            </div>
            {/* Defensa */}
            <div className="space-y-2 text-center md:text-left">
               <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-sans ml-1 flex justify-between">
                  <span>Resistencia (Caparazón)</span>
                  <span className="text-slate-400 font-serif">{formData.defense}</span>
               </label>
               <input
                 type="range"
                 name="defense"
                 min="1"
                 max="350"
                 value={formData.defense}
                 onChange={handleChange}
                 className="w-full h-1 bg-slate-800 appearance-none cursor-pointer accent-slate-500"
               />
            </div>
          </div>

          {/* Vida */}
          <div className="space-y-2 text-center md:text-left">
            <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-sans ml-1 flex justify-between">
              <span>Máscaras (Alma)</span>
              <span className="text-[#86c6f4] font-serif">{formData.lifePoints}</span>
            </label>
            <input
              type="range"
              name="lifePoints"
              min="1"
              max="5000"
              value={formData.lifePoints}
              onChange={handleChange}
              className="w-full h-1 bg-slate-800 appearance-none cursor-pointer accent-[#86c6f4]"
            />
          </div>

          {/* Imagen */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-sans ml-1">URL de Retrato</label>
            <input
              name="pictureUrl"
              value={formData.pictureUrl}
              onChange={handleChange}
              placeholder="https://ejemplo.com/hollow.png"
              className="w-full hk-input px-3 py-2"
            />
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-sans ml-1">Registro del Cazador</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Habita en los confines sombríos..."
              className="w-full hk-input px-3 py-2 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 mt-6 bg-[#111] border border-slate-700 text-gray-300 font-serif font-bold uppercase tracking-[0.2em] hover:bg-[#1a1a1a] hover:text-white transition-all shadow-[inset_0_0_10px_rgba(0,0,0,0.8)] rounded-sm"
          >
            Modificar Sello
          </button>
        </form>
      </div>
    </div>
  );
}
