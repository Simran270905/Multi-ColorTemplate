import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimationControls } from "framer-motion";

const rituals = [
  {
    title: "Haldi Ceremony",
    time: "17 Dec 2025 · 11:00 AM",
    description: "A sacred turmeric ritual shared with close family and loved ones.",
    icon: "🌿",
  },
  {
    title: "Wedding Ceremony",
    time: "18 Dec 2025 · 7:30 AM",
    description: "The auspicious union solemnized amidst sacred Vedic chants.",
    icon: "🔥",
  },
  {
    title: "Saptapadi",
    time: "18 Dec 2025 · 8:00 AM",
    description: "The seven sacred vows taken together as life partners.",
    icon: "👣",
  },
  {
    title: "Wedding Reception",
    time: "18 Dec 2025 · 7:30 PM",
    description: "An evening of celebration, music, and joy with family and friends.",
    icon: "🎉",
  },
];

const Rituals = () => {
  const ref = useRef(null);
  const canvasRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimationControls();

  /* ✨ PARTICLE BACKGROUND */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    class Particle {
      constructor() { this.reset(); }
      reset() {
        const r = canvas.getBoundingClientRect();
        this.x = Math.random() * r.width;
        this.y = Math.random() * r.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 2 + 0.6;
        this.life = 0;
        this.maxLife = 250 + Math.random() * 150;
        this.color = ["rgba(218,165,32,0.4)", "rgba(255,215,0,0.3)", "rgba(231,114,91,0.3)"][Math.floor(Math.random() * 3)];
      }
      update(w, h) {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;
        if (this.life > this.maxLife || this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
      }
      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = 0.6;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const particles = Array.from({ length: window.innerWidth < 640 ? 30 : 60 }, () => new Particle());

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * window.devicePixelRatio;
      canvas.height = r.height * window.devicePixelRatio;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const render = () => {
      const r = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(r.width, r.height); p.draw(ctx); });
      animationFrameId = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 14 } },
  };

  return (
    <section
      ref={ref}
      id="rituals"
      className="relative py-20 md:py-28 px-4 md:px-12 lg:px-20 overflow-hidden
                 bg-gradient-to-br from-[#fdf2f0]/90 via-[#f8f4ed]/80 to-[#f9f5f0]/90"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10 opacity-70 pointer-events-none" />

      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* HEADER */}
        <motion.div className="text-center mb-20 md:mb-28" variants={cardVariants}>
          <p className="text-xs uppercase tracking-[0.35em] text-[#b8860b] mb-4 font-bold">Sacred Traditions</p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-adelio font-black text-[#3d2207]">
            Wedding <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#daa520] to-[#f4d03f]">Rituals</span>
          </h2>
        </motion.div>

        {/* TIMELINE */}
        <div className="relative grid md:grid-cols-2 gap-10">

          {/* CENTER LINE */}
          <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-full
                          bg-gradient-to-b from-transparent via-[#daa520]/70 to-transparent" />

          {rituals.map((ritual, index) => (
            <motion.div
              key={ritual.title}
              variants={cardVariants}
              className={`relative md:w-[90%]
                ${index % 2 === 0 ? "md:ml-auto md:pr-10" : "md:mr-auto md:pl-10"}`}
            >
              {/* DOT */}
              <motion.div
                className={`absolute top-1/2 -translate-y-1/2
                  ${index % 2 === 0 ? "md:-right-[14px]" : "md:-left-[14px]"}
                  w-5 h-5 md:w-6 md:h-6 rounded-full
                  bg-gradient-to-br from-[#daa520] to-[#f4d03f]
                  border border-white/60 shadow-lg z-30`}
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* CARD */}
              <div className="rounded-3xl p-6 md:p-8 lg:p-10 bg-white/90 backdrop-blur-xl
                              shadow-lg border border-[#daa520]/30 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#daa520] to-[#f4d03f]
                                flex items-center justify-center text-3xl shadow-md">
                  {ritual.icon}
                </div>

                <h3 className="text-xl md:text-3xl font-awesome text-[#3d2207] mb-2">{ritual.title}</h3>
                <p className="text-xs uppercase tracking-widest text-[#b8860b] mb-2">{ritual.time}</p>
                <p className="text-sm md:text-base text-[#5d2e0a]/90">{ritual.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Rituals;
