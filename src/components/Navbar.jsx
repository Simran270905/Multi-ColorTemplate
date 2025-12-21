import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["hero", "invite", "story", "rituals", "blessings"];
      for (let id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top < 120 && rect.bottom > 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { name: "Home", id: "hero" },
    { name: "Invitation", id: "invite" },
    { name: "Our Story", id: "story" },
    { name: "Rituals", id: "rituals" },
    { name: "Blessings", id: "blessings" }
  ];

  return (
    <motion.nav
      className={`sticky top-0 z-50 overflow-hidden transition-all duration-500 ${
        scrolled
          ? "bg-[#fdfcfb]/95 backdrop-blur-xl shadow-lg border-b border-[#daa520]/20"
          : "bg-transparent backdrop-blur-md"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* NAVBAR CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-24 py-4 lg:py-6">
        <div className="flex justify-between items-center">
          {/* LOGO */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection("hero")}
          >
            <div className="w-11 h-11 lg:w-14 lg:h-14 bg-gradient-to-br from-[#d95a44] via-[#daa520] to-[#f4d03f] rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-xl lg:text-2xl font-serif font-black text-white">
                ❤️
              </span>
            </div>

            <div className="text-2xl lg:text-3xl font-invite font-bold bg-gradient-to-r from-[#d95a44] via-[#daa520] to-[#f4d03f] bg-clip-text text-transparent">
              Ishita & Raman
            </div>
          </motion.div>

          {/* DESKTOP NAV */}
          <ul className="hidden md:flex items-center gap-2 lg:gap-4">
            {navItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <li key={item.id}>
                  <motion.button
                    onClick={() => scrollToSection(item.id)}
                    className={`px-4 lg:px-5 py-2.5 rounded-2xl font-font font-bold text-lg transition-all
                      ${
                        active
                          ? "text-[#daa520] bg-[#daa520]/10 shadow-md"
                          : "text-[#5d2e0a]/80 hover:text-[#daa520]"
                      }`}
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                  </motion.button>
                </li>
              );
            })}
          </ul>

          {/* MOBILE TOGGLE */}
          <motion.button
            className="md:hidden p-2 rounded-xl border border-[#daa520]/30"
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileOpen((p) => !p)}
          >
            <svg className="w-6 h-6 text-[#5d2e0a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="md:hidden bg-[#fdfcfb]/95 backdrop-blur-xl border-t border-[#daa520]/20"
          >
            <ul className="flex flex-col py-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-6 py-4 font-font text-lg font-bold transition
                      ${
                        activeSection === item.id
                          ? "text-[#daa520] bg-[#daa520]/10"
                          : "text-[#5d2e0a]"
                      }`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
