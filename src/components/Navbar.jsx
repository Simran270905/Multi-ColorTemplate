import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navbarConfig = {
  id: "wedding-navbar-1",
  brideName: "Ishita",
  groomName: "Raman",
  logo: "❤️",
  sections: [
    { name: "Home", id: "hero" },
    { name: "Invitation", id: "invite" },
    { name: "Our Story", id: "story" },
    { name: "Rituals", id: "rituals" },
    { name: "Blessings", id: "blessings" }
  ],
  colors: {
    gradientFrom: "#d95a44",
    gradientVia: "#daa520",
    gradientTo: "#f4d03f",
    active: "#daa520",
    text: "#5d2e0a",
    border: "#daa520",
  },
  layout: {
    scrollThreshold: 20,
    activeThreshold: 120,
    gaps: {
      logo: "2", // Reduced spacing
      desktopNav: "1", // Reduced from gap-2 lg:gap-4
      mobileNav: "3", // Tight mobile buttons
    },
    padding: {
      content: { px: { default: "4", sm: "6", lg: "24" }, py: { default: "4", lg: "6" } },
      mobileMenu: "4",
      mobileButtons: { px: "6", py: "4" },
    },
    sizes: {
      logo: { default: { w: "11", h: "11" }, lg: { w: "14", h: "14" } },
      logoIcon: { default: "xl", lg: "2xl" },
      logoText: { default: "2xl", lg: "3xl" },
      navButtons: { px: { default: "4", lg: "5" }, py: "2.5" },
    },
  },
};

const Navbar = ({ config = navbarConfig }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > config.layout.scrollThreshold);

      const sections = config.sections.map(s => s.id);
      for (let id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top < config.layout.activeThreshold && rect.bottom > config.layout.activeThreshold) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [config.sections, config.layout]);

  const scrollToSection = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

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
      <div className={`max-w-7xl mx-auto px-${config.layout.padding.content.px.default} sm:px-${config.layout.padding.content.px.sm} lg:px-${config.layout.padding.content.px.lg} py-${config.layout.padding.content.py.default} lg:py-${config.layout.padding.content.py.lg}`}>
        <div className="flex justify-between items-center">
          {/* LOGO */}
          <motion.div
            className={`flex items-center gap-${config.layout.gaps.logo} cursor-pointer`}
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection("hero")}
          >
            <div className={`w-${config.layout.sizes.logo.default.w} h-${config.layout.sizes.logo.default.h} lg:w-${config.layout.sizes.logo.lg.w} lg:h-${config.layout.sizes.logo.lg.h} bg-gradient-to-br from-[${config.colors.gradientFrom}] via-[${config.colors.gradientVia}] to-[${config.colors.gradientTo}] rounded-2xl flex items-center justify-center shadow-lg`}>
              <span className={`text-${config.layout.sizes.logoIcon.default} lg:text-${config.layout.sizes.logoIcon.lg} font-serif font-black text-white`}>
                {config.logo}
              </span>
            </div>

            <div className={`text-${config.layout.sizes.logoText.default} lg:text-${config.layout.sizes.logoText.lg} font-invite font-bold bg-gradient-to-r from-[${config.colors.gradientFrom}] via-[${config.colors.gradientVia}] to-[${config.colors.gradientTo}] bg-clip-text text-transparent`}>
              {config.brideName} & {config.groomName}
            </div>
          </motion.div>

          {/* DESKTOP NAV - TIGHTER SPACING */}
          <ul className={`hidden md:flex items-center gap-${config.layout.gaps.desktopNav}`}>
            {config.sections.map((item) => {
              const active = activeSection === item.id;
              return (
                <li key={item.id}>
                  <motion.button
                    onClick={() => scrollToSection(item.id)}
                    className={`px-${config.layout.sizes.navButtons.px.default} lg:px-${config.layout.sizes.navButtons.px.lg} py-${config.layout.sizes.navButtons.py} rounded-2xl font-font font-bold text-lg transition-all ${
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

      {/* MOBILE MENU - TIGHTER SPACING */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="md:hidden bg-[#fdfcfb]/95 backdrop-blur-xl border-t border-[#daa520]/20"
          >
            <ul className={`flex flex-col py-${config.layout.padding.mobileMenu}`}>
              {config.sections.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-${config.layout.padding.mobileButtons.px} py-${config.layout.padding.mobileButtons.py} font-font text-lg font-bold transition gap-${config.layout.gaps.mobileNav} ${
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
