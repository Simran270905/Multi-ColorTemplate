import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimationControls } from "framer-motion";

const Invite = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimationControls();
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const scrollAnimation = {
    hidden: { height: "0%", opacity: 0, scaleY: 0.8, transition: { duration: 0.6 } },
    visible: { height: "100%", opacity: 1, scaleY: 1, transition: { duration: 0.8 } }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, staggerChildren: 0.2 } }
  };

  const handleToggleInvite = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (isOpen) {
      await controls.start("hidden");
      setIsOpen(false);
    } else {
      setIsOpen(true);
      await controls.start("visible");
    }
    setTimeout(() => setIsAnimating(false), 800);
  };

  return (
    <section
      ref={ref}
      id="invite"
      className="relative py-24 md:py-32 px-4 md:px-10 lg:px-20 overflow-hidden
                 bg-gradient-to-b from-[#fdf2f0]/90 via-[#f8f4ed]/80 to-[#f9f5f0]/90"
    >
      {/* ✨ Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-[#daa520]/12 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#e2725b]/10 rounded-full blur-[140px]"
          animate={{ y: [0, -8, 0], scale: [1, 1.02, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="relative max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* 🌟 SACRED OM SEAL */}
        <motion.div className="flex justify-center mb-12 md:mb-16" variants={scrollAnimation} style={{ originY: 0 }}>
          <motion.div
            className="relative w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-[#fbbf24] via-[#daa520] to-[#b8860b]
                       shadow-2xl border-4 border-[#8b4513]/50 rounded-3xl flex items-center justify-center
                       backdrop-blur-xl overflow-hidden cursor-default"
            whileHover={{ scale: 1.05, boxShadow: "0 25px 60px rgba(218,165,32,0.4)" }}
            animate={{ rotate: [0, 1, -1, 0], scale: [1, 1.02, 1] }}
            transition={{ rotate: { duration: 10, repeat: Infinity }, scale: { duration: 4, repeat: Infinity } }}
          >
            {/* Radiating glow */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-[#daa520]/40 to-transparent rounded-3xl"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <motion.div 
              className="w-16 h-16 md:w-20 md:h-20 bg-[#fdfcfb]/95 rounded-2xl flex items-center justify-center
                         shadow-lg border-4 border-white/80 relative z-10"
              animate={{ scale: [1, 1.03, 1], boxShadow: ["0 0 20px rgba(218,165,32,0.3)", "0 0 30px rgba(218,165,32,0.5)", "0 0 20px rgba(218,165,32,0.3)"] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <span className="text-2xl md:text-3xl font-serif font-black text-[#3d2207] drop-shadow-lg">ॐ</span>
            </motion.div>

            <motion.div
              className="absolute top-2 right-2 w-3 h-3 bg-[#fbbf24]/60 rounded-full"
              animate={{ y: [-2, 2, -2], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

        {/* 📜 INVITATION HEADER */}
        <motion.div className="text-center mb-16 md:mb-20" variants={scrollAnimation}>
          <motion.p 
            className="text-xs md:text-sm uppercase tracking-[0.35em] text-[#b8860b] mb-4 font-para font-bold"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            An Auspicious Beginning
          </motion.p>

          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-monster font-medium text-[#3d2207] tracking-tight leading-tight"
            animate={{ scale: [1, 1.02, 1], y: [0, -2, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            With divine blessings and family love
          </motion.h2>

          <motion.div 
            className="mt-8 md:mt-10 h-[1px] w-40 md:w-48 mx-auto bg-gradient-to-r from-transparent via-[#daa520] to-transparent relative"
            animate={{ scaleX: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <div className="absolute inset-0 bg-[#daa520]/40 rounded-full animate-pulse" />
          </motion.div>
        </motion.div>

        {/* 🎭 INVITATION CARD */}
        <motion.div
          className={`relative mx-auto max-w-3xl lg:max-w-4xl rounded-[3rem] border-4 border-[#daa520]/50
                     bg-gradient-to-br from-[#fdfcfb]/95 via-white/90 to-[#f8f4ed]/90 backdrop-blur-2xl shadow-2xl
                     transition-all duration-1000 overflow-hidden cursor-${isOpen ? 'default' : 'pointer'}`}
          onClick={isOpen ? undefined : handleToggleInvite}
          initial={{ scale: 0.9, rotateX: 15 }}
          animate={{ scale: 1, rotateX: 0, boxShadow: ["0 25px 70px -15px rgba(218,165,32,0.25)", "0 40px 90px -20px rgba(218,165,32,0.35)", "0 25px 70px -15px rgba(218,165,32,0.25)"] }}
          transition={{ duration: 1.2, delay: 0.3 }}
          whileHover={!isOpen ? { y: -6, scale: 1.02, boxShadow: "0 35px 80px rgba(218,165,32,0.35)" } : {}}
        >
          {/* Golden border glow */}
          <motion.div
            className="absolute inset-0 border-6 border-transparent rounded-[3rem]
                       bg-gradient-to-r from-[#daa520]/20 via-transparent to-[#daa520]/20"
            animate={{ rotate: [0, 0.5, -0.5, 0], scale: [1, 1.01, 1] }}
            transition={{ duration: 20, repeat: Infinity }}
          />

          {/* ✨ Names Section */}
          <div className="text-center font-para py-10 md:py-12 px-6 md:px-10 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {[
                { name: "Miss Ishita", parents: "Mr. Rameshwar & Mrs. Sunita Sharma", delay: 0 },
                { name: "Mr. Raman", parents: "Mr. Vijay & Mrs. Lakshmi Patil", delay: 0.2 }
              ].map(({ name, parents, delay }) => (
                <motion.div key={name} initial={{ opacity: 0, y: 30, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.5 + delay }} className="group">
                  <motion.h3 
                    className="text-3xl md:text-4xl lg:text-5xl font-awesome  text-[#5d2e0a] p-5 
                               bg-gradient-to-r from-[#daa520] to-[#f4d03f] bg-clip-text text-transparent"
                    whileHover={{ scale: 1.04, y: -3 }}
                  >
                    {name}
                  </motion.h3>
                  <p className="text-xs md:text-sm uppercase tracking-widest text-[#8b4513]  opacity-80">Daughter of / Son of</p>
                  <motion.p className="font-font font-bold text-lg md:text-xl text-[#daa520] tracking-wide font-light" whileHover={{ scale: 1.02 }}>
                    {parents}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Ceremony Details */}
          <motion.div variants={scrollAnimation} className={`overflow-hidden transition-all duration-1000 ${isOpen ? 'max-h-[1800px] py-0 md:py-0' : 'max-h-0 py-0'}`}>
            <div className="border-t-4 border-[#daa520]/40 mx-8 md:mx-16 m-10" />

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 px-4 md:px-8 lg:px-12">
              {[
                { title: "Wedding Ceremony", date: "18th December 2025", time: "7:30 AM Onwards", venue: "Shri Ganesh Mandir, Pune", gradient: "from-[#fef7e0] via-[#f8f4ed] to-[#f4a8a0]/80", delay: 0 },
                { title: "Reception", date: "18th December 2025", time: "7:30 PM Onwards", venue: "The Corinthians Resort, Pune", gradient: "from-[#fef7e0]/90 via-[#f8f4ed]/80 to-[#e2725b]/60", delay: 0.3 }
              ].map(({ title, date, time, venue, gradient, delay }) => (
                <motion.div key={title} initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.8 + delay }} className={`rounded-3xl p-8 md:p-12 bg-gradient-to-br ${gradient} border-4 border-[#daa520]/40 shadow-xl hover:shadow-2xl backdrop-blur-xl relative overflow-hidden group cursor-default`} whileHover={{ y: -4, scale: 1.02, boxShadow: "0 25px 60px rgba(218,165,32,0.3)" }}>
                  <motion.h4 className="text-2xl md:text-3xl font-title font-black mb-4 text-[#5d2e0a] relative z-10" animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 2, repeat: Infinity }}>{title}</motion.h4>
                  <motion.p className="text-2xl md:text-3xl font-black text-[#daa520] mb-2 relative z-10 tracking-tight" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1 + delay, duration: 0.6 }}>{date}</motion.p>
                  <motion.p className="text-xl md:text-2xl font-font font-semibold mb-4 text-[#3d2207]/90 relative z-10">{time}</motion.p>
                  <motion.p className="text-lg md:text-xl font-font font-bold text-[#5d2e0a] relative z-10 leading-relaxed">{venue}</motion.p>
                </motion.div>
              ))}
            </div>

            {/* Blessing Closing */}
            <motion.div className="text-center py-16 md:py-20 px-8 md:px-16 mt-12" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5 }}>
              <div className="border-t-2 border-[#daa520]/40 mx-8 md:mx-16 mb-12" />
              <motion.p className="font-font font-bold italic text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto mb-12 md:mb-16 text-[#5d2e0a]/90 leading-relaxed backdrop-blur-xl" animate={{ opacity: [1, 0.9, 1], scale: [1, 1.01, 1] }} transition={{ duration: 3, repeat: Infinity }}>
                ✨ "Your presence and blessings will make this occasion truly special. We look forward to celebrating this joyous union with you." ✨
              </motion.p>

              {isOpen && (
                <motion.button onClick={handleToggleInvite} className="group rounded-3xl border-2 border-[#daa520]/50 px-10 md:px-14 py-5 md:py-6 font-serif text-lg md:text-xl font-semibold bg-[#fdfcfb]/80 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:bg-[#daa520]/10 transition-all duration-400 flex items-center justify-center mx-auto gap-2 relative overflow-hidden" whileHover={{ scale: 1.05, boxShadow: "0 20px 50px rgba(218,165,32,0.3)" }} whileTap={{ scale: 0.98 }}>
                  <span className="relative z-10">Roll Invitation Back</span>
                  <motion.span className="relative z-10" animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity }}>↶</motion.span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#daa520]/30 rounded-3xl opacity-0 group-hover:opacity-100" />
                </motion.button>
              )}
            </motion.div>
          </motion.div>

          {/* 📍 Unroll Prompt */}
          {!isOpen && (
            <motion.div className="absolute inset-0 flex items-end justify-center pb-10 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.p className="text-base md:text-lg uppercase tracking-[0.25em] text-[#8b4513]/80 font-medium bg-[#fdfcfb]/90 px-6 py-3 rounded-3xl backdrop-blur-xl shadow-lg border border-[#daa520]/30" animate={{ scale: [1, 1.05, 1], y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                ✨ Tap to Unroll Sacred Invitation ✨
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Invite;
