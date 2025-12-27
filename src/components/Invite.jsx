import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const inviteConfig = {
  id: "wedding-invite-1",
  bride: {
    name: "Miss Ishita",
    parents: "Mr. Rameshwar & Mrs. Sunita Sharma",
  },
  groom: {
    name: "Mr. Raman", 
    parents: "Mr. Vijay & Mrs. Lakshmi Patil",
  },
  header: {
    subtitle: "An Auspicious Beginning",
    title: "With divine blessings and family love",
  },
  events: [
    {
      title: "Wedding Ceremony",
      date: "18th December 2025",
      time: "7:30 AM Onwards",
      venue: "Shri Ganesh Mandir, Pune",
    },
    {
      title: "Reception",
      date: "18th December 2025",
      time: "7:30 PM Onwards",
      venue: "The Corinthians Resort, Pune",
    },
  ],
  colors: {
    primary: "#daa520",
    gradientTo: "#f4d03f",
    text: "#3d2207",
    subtitle: "#b8860b",
    muted: "#8b4513",
    dark: "#5d2e0a",
  },
  layout: {
    namesGap: "8", // ✅ REDUCED from gap-12 lg:gap-16
    eventsGap: "6", // ✅ REDUCED from gap-8 lg:gap-12
    padding: { py: { default: "24", md: "32" }, px: { default: "4", md: "10", lg: "20" } },
    margins: {
      header: { default: "16", md: "20" },
      cta: { default: "12", md: "16" },
    },
  },
};

const Invite = ({ config = inviteConfig }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const sectionControls = useAnimation();
  const inviteControls = useAnimation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isInView) sectionControls.start("visible");
  }, [isInView, sectionControls]);

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, staggerChildren: 0.2 },
    },
  };

  const expandVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  const toggleInvite = () => {
    setIsOpen((prev) => !prev);
    inviteControls.start(isOpen ? "closed" : "open");
  };

  return (
    <section
      ref={ref}
      id="invite"
      className={`relative py-${config.layout.padding.py.default} md:py-${config.layout.padding.py.md} px-${config.layout.padding.px.default} md:px-${config.layout.padding.px.md} lg:px-${config.layout.padding.px.lg} overflow-hidden bg-gradient-to-b from-[#fdf2f0]/90 via-[#f8f4ed]/80 to-[#f9f5f0]/90`}
    >
      <motion.div
        className="relative max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={sectionControls}
      >
        {/* HEADER */}
        <motion.div className={`text-center mb-${config.layout.margins.header.default} md:mb-${config.layout.margins.header.md}`}>
          <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-[#b8860b] mb-4 font-para font-bold">
            {config.header.subtitle}
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-monster font-medium text-[#3d2207]">
            {config.header.title}
          </h2>
        </motion.div>

        {/* INVITE CARD */}
        <motion.div
          className={`relative mx-auto max-w-3xl lg:max-w-4xl rounded-[3rem] border-4 border-[${config.colors.primary}]/50 bg-gradient-to-br from-[#fdfcfb]/95 via-white/90 to-[#f8f4ed]/90 backdrop-blur-2xl shadow-2xl ${isOpen ? "cursor-default" : "cursor-pointer"}`}
          onClick={!isOpen ? toggleInvite : undefined}
          whileHover={!isOpen ? { y: -6, scale: 1.02 } : {}}
        >
          {/* NAMES */}
          <div className="text-center font-para py-10 md:py-12 px-6 md:px-10 relative z-10">
            <div className={`grid lg:grid-cols-2 gap-${config.layout.namesGap}`}>
              {[config.bride, config.groom].map(({ name, parents }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <h3
                    className="text-3xl md:text-4xl lg:text-5xl font-awesome p-5 bg-gradient-to-r from-[#daa520] to-[#f4d03f] bg-clip-text text-transparent"
                  >
                    {name}
                  </h3>

                  <p className="text-xs md:text-sm uppercase tracking-widest text-[#8b4513] opacity-80">
                    Daughter of / Son of
                  </p>

                  <p className="font-font font-bold text-lg md:text-xl text-[#daa520] tracking-wide">
                    {parents}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* EXPANDABLE CONTENT */}
          <motion.div
            variants={expandVariants}
            initial="closed"
            animate={inviteControls}
            className="overflow-hidden"
          >
            <div className="border-t-4 border-[#daa520]/40 mx-8 md:mx-16 my-10" />

            <div className={`grid md:grid-cols-2 gap-${config.layout.eventsGap} px-4 md:px-8 lg:px-12 pb-12`}>
              {config.events.map((event, i) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.2 }}
                  className="rounded-3xl p-8 md:p-12 bg-gradient-to-br from-[#fef7e0] via-[#f8f4ed] to-[#f4a8a0]/80 border-4 border-[#daa520]/40 shadow-xl backdrop-blur-xl"
                >
                  <h4 className="text-2xl md:text-3xl font-title font-black text-[#5d2e0a] mb-4">
                    {event.title}
                  </h4>
                  <p className="text-2xl md:text-3xl font-black text-[#daa520]">
                    {event.date}
                  </p>
                  <p className="text-xl md:text-2xl font-font font-semibold text-[#3d2207]/90">
                    {event.time}
                  </p>
                  <p className="text-lg md:text-xl font-font font-bold text-[#5d2e0a]">
                    {event.venue}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* SINGLE CTA BUTTON */}
        <div className={`flex justify-center mt-${config.layout.margins.cta.default} md:mt-${config.layout.margins.cta.md}`}>
          <motion.button
            onClick={toggleInvite}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="font-serif text-lg md:text-xl font-semibold px-10 md:px-14 py-4 md:py-5 rounded-3xl border-2 border-[#daa520]/60 bg-[#fdfcfb]/90 backdrop-blur-xl text-[#5d2e0a] shadow-xl hover:bg-[#daa520]/10 transition-all duration-300"
          >
            {isOpen ? "Roll Invitation Back ↶" : "Open Sacred Invitation ✨"}
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default Invite;
