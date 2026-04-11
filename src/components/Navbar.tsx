import { Link, useLocation } from "react-router-dom";
import { Home, PlusCircle } from "lucide-react";

export function Navbar() {
  const location = useLocation();

  const navLinks = [
    { name: "Inicio", path: "/", icon: <Home size={18} /> },
    { name: "Nueva Carta", path: "/create", icon: <PlusCircle size={18} /> },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[90] px-3 py-2 rounded-sm border-2 border-slate-800 bg-[#080808]/90 shadow-2xl flex items-center gap-2">
      {navLinks.map((link) => {
        const isActive = location.pathname === link.path;
        return (
          <Link
            key={link.path}
            to={link.path}
            className={`
              relative px-6 py-2 rounded-sm text-sm font-serif uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2
              ${isActive ? "text-[#f7f7f7] bg-slate-900/50" : "text-gray-500 hover:text-gray-300 hover:bg-white/5"}
            `}
          >
            <span className="text-lg opacity-50">{link.icon}</span>
            {link.name}
            {isActive && (
              <div
                className="absolute inset-0 rounded-sm border border-slate-500/50 pointer-events-none"
                style={{ boxShadow: "0 0 10px rgba(100, 116, 139, 0.3)" }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
