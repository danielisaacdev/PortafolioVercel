import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Inicio", path: "/" },
  { name: "Sobre Mí", path: "/about" },
  { name: "Proyectos", path: "/project" },
  { name: "Contacto", path: "/contact" },
];

function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-900/60 dark:bg-[#1b1f2c]/60 backdrop-blur-xl shadow-2xl shadow-blue-500/5">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-16">
        <div className="text-xl font-black tracking-tighter text-white dark:text-[#f4fff5]">
          <Link to="/" className="no-underline hover:text-primary transition-colors">
            Daniel Isaac<span className="text-primary">.dev</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-8 font-['Inter'] tracking-tight font-medium text-sm">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                className={`relative px-1 py-1 no-underline transition-colors ${
                  isActive ? "text-primary font-bold" : "text-[#bec7d3] hover:text-white"
                }`}
                to={item.path}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_0_8px_rgba(147,204,255,0.6)]"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 38,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="text-white hover:text-primary transition-colors"
            aria-label={isMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            aria-expanded={isMenuOpen}
          >
            <span className="material-symbols-outlined">{isMenuOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden border-t border-white/5 bg-slate-900/95 backdrop-blur-xl"
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4 font-['Inter']">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`no-underline text-sm font-semibold tracking-tight transition-colors ${
                      isActive ? "text-primary" : "text-[#bec7d3] hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
