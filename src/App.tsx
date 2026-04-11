import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { CreateCard } from './pages/CreateCard';
import { EditCard } from './pages/EditCard';
import { Navbar } from './components/Navbar';
import { useCards } from './hooks/useCards';

function App() {
  const { cards, loading, addCard, deleteCard, updateCard } = useCards();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0618] flex items-center justify-center text-white font-mono text-xl tracking-widest animate-pulse">
        Cargando Colección...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="relative min-h-screen overflow-x-hidden font-sans text-white bg-[#0b0c10]">
        
        {/* ── Navbar ── */}
        <Navbar />

        {/* ── Background dark void ── */}
        <div
          className="fixed inset-0 -z-10"
          style={{
            background: "radial-gradient(ellipse at bottom, #1d2d44 0%, #0b0c10 100%)",
          }}
        />

        {/* ── Esporas y Alma (Particles) ── */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
           {[...Array(8)].map((_, i) => (
              <div 
                key={`inf-${i}`}
                className="absolute rounded-full opacity-60 animate-particle-up"
                style={{
                  width: `${Math.random() * 6 + 4}px`,
                  height: `${Math.random() * 6 + 4}px`,
                  background: '#f28833',
                  boxShadow: '0 0 12px #fbbd23',
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 10 + 10}s`,
                  animationDelay: `${Math.random() * 15}s`
                }}
              />
           ))}
           {[...Array(12)].map((_, i) => (
              <div 
                key={`soul-${i}`}
                className="absolute rounded-full opacity-40 animate-particle-up"
                style={{
                  width: `${Math.random() * 5 + 2}px`,
                  height: `${Math.random() * 5 + 2}px`,
                  background: '#e0e0e0',
                  boxShadow: '0 0 10px #86c6f4',
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 12 + 12}s`,
                  animationDelay: `${Math.random() * 15}s`
                }}
              />
           ))}
        </div>

        {/* ── Routes ── */}
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home cards={cards} onDeleteCard={deleteCard} />} />
            <Route path="/create" element={<CreateCard onAddCard={addCard} />} />
            <Route path="/edit/:id" element={<EditCard cards={cards} onUpdateCard={updateCard} />} />
          </Routes>
        </main>

        {/* Footer simple */}
        <footer
          className="text-center pb-10 opacity-20 text-xs tracking-[0.3em] uppercase"
        >
          ✦ Sistema de Colección Legendaria ✦
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;