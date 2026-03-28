import { Link, useLocation } from "react-router-dom";

export function Navbar() {
  const location = useLocation();

  const navLinks = [
    { name: "Inicio", path: "/", icon: "🏠" },
    { name: "Nueva Carta", path: "/create", icon: "➕" },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[90] px-6 py-3 rounded-full border border-white/10 backdrop-blur-xl bg-white/5 shadow-2xl flex items-center gap-2">
      {navLinks.map((link) => {
        const isActive = location.pathname === link.path;
        return (
          <Link
            key={link.path}
            to={link.path}
            className={`
              relative px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2
              ${isActive ? "text-white bg-white/10" : "text-white/40 hover:text-white/70 hover:bg-white/5"}
            `}
          >
            <span className="text-lg">{link.icon}</span>
            {link.name}
            {isActive && (
              <div
                className="absolute inset-0 rounded-full border border-purple-500/50 animate-pulse pointer-events-none"
                style={{ boxShadow: "0 0 15px rgba(124, 58, 237, 0.3)" }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
