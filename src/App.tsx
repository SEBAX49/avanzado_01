import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { CreateCard } from './pages/CreateCard';
import { Navbar } from './components/Navbar';
import { useCards } from './hooks/useCards';
import TaskManager from './components/TaskManager';

function App() {
  const { cards, addCard } = useCards();

  return (

    <BrowserRouter>
      <div className="relative min-h-screen overflow-x-hidden font-sans text-white">
        
        {/* ── Navbar ── */}
        <Navbar />

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

        {/* ── Routes ── */}
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home cards={cards} />} />
            <Route path="/create" element={<CreateCard onAddCard={addCard} />} />
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