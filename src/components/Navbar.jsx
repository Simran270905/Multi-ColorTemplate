import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Active section detection
      const sections = ['hero', 'invite', 'story', 'rituals', 'blessings'];
      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top < 100 && rect.bottom > 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { name: 'Home', id: 'hero' },
    { name: 'Invitation', id: 'invite' },
    { name: 'Our Story', id: 'story' },
    { name: 'Rituals', id: 'rituals' },
    { name: 'Blessings', id: 'blessings' }
  ];

  return (
    <motion.nav 
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#fdfcfb]/98 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border-b border-[#daa520]/20' 
          : 'bg-transparent/80 backdrop-blur-md'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-24 py-5 lg:py-6">
        <div className="flex justify-between items-center">
          
          {/* ✨ LOGO - Golden Wedding Monogram */}
          <motion.div
            className="flex items-center gap-3 group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollToSection('hero')}
          >
            <div className="relative">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-[#d95a44] via-[#daa520] to-[#f4d03f] rounded-2xl shadow-lg group-hover:shadow-[0_15px_35px_rgba(218,165,32,0.4)] transition-all duration-300 relative overflow-hidden">
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Monogram */}
                <div className="absolute inset-2 flex items-center justify-center">
                  <span className="text-xl lg:text-2xl font-serif font-black text-white drop-shadow-sm">
                    ❤️

                  </span>
                </div>
              </div>
              {/* Floating sparkle */}
              <motion.div 
                className="absolute -top-1 -right-1 w-3 h-3 bg-[#f4d03f] rounded-full opacity-60"
                animate={{ 
                  scale: [1, 1.3, 1],
                  y: [0, -2, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
            </div>
            
            <motion.div 
              className="text-2xl lg:text-3xl font-invite font-bold bg-gradient-to-r from-[#d95a44] via-[#daa520] to-[#f4d03f] bg-clip-text text-transparent tracking-tight"
              animate={{ 
                scale: [1, 1.02, 1],
                y: [0, -1, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Ishita & Raman
            </motion.div>
          </motion.div>

          {/* 🌟 NAVIGATION - Animated Golden Links */}
          <ul className="hidden md:flex items-center space-x-2 lg:space-x-3">
            {navItems.map((item, index) => (
              <motion.li 
                key={item.id}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.button
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    relative px-4 lg:px-5 py-3 lg:py-3.5 font-font font-bold text-lg 
                    transition-all duration-400 rounded-2xl backdrop-blur-sm
                    {
                      activeSection === item.id
                        ? 'text-[#daa520] bg-[#daa520]/10 shadow-lg shadow-[#daa520]/20'
                        : 'text-[#5d2e0a]/80 hover:text-[#daa520] dark:text-[#f5e9d6]/80'
                    }
                  `}
                  whileHover={{ 
                    scale: 1.1,
                    y: -4,
                    backgroundColor: '#daa520',
                    color: '#fdfcfb',
                    boxShadow: "0 10px 30px rgba(218,165,32,0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Animated gold underline */}
                  <motion.div 
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-[#daa520]"
                    initial={{ width: 0, opacity: 0 }}
                    animate={activeSection === item.id ? { width: '80%', opacity: 1 } : { width: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                  
                  {/* Magic sparkle trail */}
                  <motion.div 
                    className="absolute -top-2 -right-2 w-2 h-2 bg-[#f4d03f] rounded-full opacity-0"
                    animate={activeSection === item.id ? { opacity: 1, scale: [1, 1.5, 1] } : {}}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Glow ripple effect */}
                  <div className="absolute inset-0 rounded-2xl bg-[#daa520]/20 opacity-0 group-hover:opacity-20 blur-sm transition-all duration-300" />
                </motion.button>
              </motion.li>
            ))}
          </ul>

          {/* 📱 MOBILE MENU BUTTON */}
          <motion.button
            className="md:hidden p-2 rounded-xl backdrop-blur-sm border border-[#daa520]/30
                      hover:bg-[#daa520]/10 hover:shadow-md transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path className="text-[#5d2e0a]" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* 🎊 SCROLL INDICATOR */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#d95a44] via-[#daa520] to-[#f4d03f] transform origin-left scale-x-0 opacity-0 md:opacity-100">
        <motion.div 
          className="h-full bg-[#daa520]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrolled ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </motion.nav>
  );
};

export default Navbar;
