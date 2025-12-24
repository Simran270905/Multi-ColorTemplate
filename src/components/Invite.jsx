import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const Invite = () => {
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
      className="relative py-24 md:py-32 px-4 md:px-10 lg:px-20 overflow-hidden
                 bg-gradient-to-b from-[#fdf2f0]/90 via-[#f8f4ed]/80 to-[#f9f5f0]/90"
    >
      <motion.div
        className="relative max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={sectionControls}
      >
        {/* HEADER */}
        <motion.div className="text-center mb-16 md:mb-20">
          <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-[#b8860b] mb-4 font-para font-bold">
            An Auspicious Beginning
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-monster font-medium text-[#3d2207]">
            With divine blessings and family love
          </h2>
        </motion.div>

        {/* INVITE CARD */}
        <motion.div
          className={`relative mx-auto max-w-3xl lg:max-w-4xl rounded-[3rem] border-4 border-[#daa520]/50
            bg-gradient-to-br from-[#fdfcfb]/95 via-white/90 to-[#f8f4ed]/90
            backdrop-blur-2xl shadow-2xl
            ${isOpen ? "cursor-default" : "cursor-pointer"}`}
          onClick={!isOpen ? toggleInvite : undefined}
          whileHover={!isOpen ? { y: -6, scale: 1.02 } : {}}
        >
          {/* NAMES */}
          <div className="text-center font-para py-10 md:py-12 px-6 md:px-10 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {[
                {
                  name: "Miss Ishita",
                  parents: "Mr. Rameshwar & Mrs. Sunita Sharma",
                },
                {
                  name: "Mr. Raman",
                  parents: "Mr. Vijay & Mrs. Lakshmi Patil",
                },
              ].map(({ name, parents }) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3
                    className="text-3xl md:text-4xl lg:text-5xl font-awesome p-5
                               bg-gradient-to-r from-[#daa520] to-[#f4d03f]
                               bg-clip-text text-transparent"
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

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 px-4 md:px-8 lg:px-12 pb-12">
              {[
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
              ].map((e) => (
                <motion.div
                  key={e.title}
                  className="rounded-3xl p-8 md:p-12
                             bg-gradient-to-br from-[#fef7e0] via-[#f8f4ed] to-[#f4a8a0]/80
                             border-4 border-[#daa520]/40 shadow-xl backdrop-blur-xl"
                >
                  <h4 className="text-2xl md:text-3xl font-title font-black text-[#5d2e0a] mb-4">
                    {e.title}
                  </h4>
                  <p className="text-2xl md:text-3xl font-black text-[#daa520]">
                    {e.date}
                  </p>
                  <p className="text-xl md:text-2xl font-font font-semibold text-[#3d2207]/90">
                    {e.time}
                  </p>
                  <p className="text-lg md:text-xl font-font font-bold text-[#5d2e0a]">
                    {e.venue}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* SINGLE CTA BUTTON */}
        <div className="flex justify-center mt-12 md:mt-16">
          <motion.button
            onClick={toggleInvite}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="font-serif text-lg md:text-xl font-semibold
                       px-10 md:px-14 py-4 md:py-5
                       rounded-3xl border-2 border-[#daa520]/60
                       bg-[#fdfcfb]/90 backdrop-blur-xl
                       text-[#5d2e0a] shadow-xl
                       hover:bg-[#daa520]/10 transition-all duration-300"
          >
            {isOpen ? "Roll Invitation Back ↶" : "Open Sacred Invitation ✨"}
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default Invite;
