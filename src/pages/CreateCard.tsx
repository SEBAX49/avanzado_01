import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../types/card';

interface CreateCardProps {
  onAddCard: (card: Card) => void;
}

const TIPOS = ["CULEAO", "Eléctrico", "Fuego", "Agua", "Planta", "Normal"];

export function CreateCard({ onAddCard }: CreateCardProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Card>({
    nombre: '',
    numero: '',
    tipo: 'CULEAO',
    ataque: 50,
    defensa: 50,
    descripcion: '',
    imagen: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.numero) {
      alert("Por favor completa los campos básicos.");
      return;
    }
    onAddCard(formData);
    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: (name === 'ataque' || name === 'defensa') ? parseInt(value) || 0 : value
    }));
  };

  return (
    <div className="relative z-10 max-w-2xl mx-auto px-6 py-32">
      <div
        className="bg-[#0c081c]/80 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl animate-card-enter"
      >
        <header className="mb-10 text-center">
          <h2 className="text-4xl font-black uppercase tracking-tight gradient-text mb-2">Crear Nueva Carta</h2>
          <p className="text-white/40 text-sm">Añade un nuevo héroe legendario a la colección.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/40 font-bold ml-1">Nombre</label>
              <input
                required
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej. Pikachu"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white placeholder:text-white/10 focus:outline-none focus:border-purple-500/50 transition-all"
              />
            </div>
            {/* Número */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/40 font-bold ml-1">Número</label>
              <input
                required
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                placeholder="Ej. 025"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white placeholder:text-white/10 focus:outline-none focus:border-purple-500/50 transition-all"
              />
            </div>
          </div>

          {/* Tipo */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/40 font-bold ml-1">Tipo Elemental</label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white appearance-none focus:outline-none focus:border-purple-500/50 transition-all cursor-pointer"
            >
              {TIPOS.map(t => <option key={t} value={t} className="bg-[#0c081c]">{t}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ataque */}
            <div className="space-y-2 text-center md:text-left">
              <label className="text-xs uppercase tracking-widest text-white/40 font-bold ml-1 flex justify-between">
                <span>Ataque</span>
                <span className="text-purple-400">{formData.ataque}</span>
              </label>
              <input
                type="range"
                name="ataque"
                min="1"
                max="350"
                value={formData.ataque}
                onChange={handleChange}
                className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>
            {/* Defensa */}
            <div className="space-y-2 text-center md:text-left">
              <label className="text-xs uppercase tracking-widest text-white/40 font-bold ml-1 flex justify-between">
                <span>Defensa</span>
                <span className="text-blue-400">{formData.defensa}</span>
              </label>
              <input
                type="range"
                name="defensa"
                min="1"
                max="350"
                value={formData.defensa}
                onChange={handleChange}
                className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>

          {/* Imagen */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/40 font-bold ml-1">URL de Imagen</label>
            <input
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
              placeholder="https://ejemplo.com/poke.png"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white placeholder:text-white/10 focus:outline-none focus:border-purple-500/50 transition-all"
            />
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/40 font-bold ml-1">Descripción</label>
            <textarea
              name="descripcion"
              rows={3}
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Cuéntanos sobre este personaje..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white placeholder:text-white/10 focus:outline-none focus:border-purple-500/50 transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-purple-500/20 mt-4"
          >
            Añadir a la Colección ✦
          </button>
        </form>
      </div>
    </div>
  );
}
