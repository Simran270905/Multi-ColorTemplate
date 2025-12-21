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
    let frame;

    class Particle {
      constructor() { this.reset(); }
      reset() {
        const r = canvas.getBoundingClientRect();
        this.x = Math.random() * r.width;
        this.y = Math.random() * r.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 2 + 0.6;
        this.life = 0;
        this.maxLife = 200 + Math.random() * 150;
        this.color = ["rgba(218,165,32,0.35)", "rgba(255,215,0,0.25)", "rgba(231,114,91,0.25)"][Math.floor(Math.random() * 3)];
      }
      update(w, h) {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;
        if (this.life > this.maxLife || this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
      }
      draw(ctx) {
        ctx.globalAlpha = 0.6;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let particles = [];

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * devicePixelRatio;
      canvas.height = r.height * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      particles = Array.from({ length: window.innerWidth < 640 ? 25 : 50 }, () => new Particle());
    };

    const render = () => {
      const r = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(r.width, r.height); p.draw(ctx); });
      frame = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const container = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
  };

  const card = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 14 } },
  };

  return (
    <section
      ref={ref}
      id="rituals"
      className="relative w-full overflow-hidden
        bg-gradient-to-br from-[#fdf2f0]/90 via-[#f8f4ed]/80 to-[#f9f5f0]/90
        py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 lg:px-20"
    >
      <canvas ref={canvasRef} className="absolute inset-0 -z-10 w-full h-full opacity-60 pointer-events-none" />

      <motion.div className="max-w-7xl mx-auto" variants={container} initial="hidden" animate={controls}>
        {/* HEADER */}
        <motion.div className="text-center mb-16 md:mb-28" variants={card}>
          <p className="text-xs uppercase tracking-[0.35em] text-[#b8860b] mb-4 font-bold">
            Sacred Traditions
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-adelio font-black text-[#3d2207]">
            Wedding{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#daa520] to-[#f4d03f]">
              Rituals
            </span>
          </h2>
        </motion.div>

        {/* TIMELINE */}
        <div className="relative grid gap-10 md:grid-cols-2">
          {/* CENTER LINE (DESKTOP ONLY) */}
          <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-transparent via-[#daa520]/70 to-transparent" />

          {rituals.map((ritual, i) => (
            <motion.div
              key={ritual.title}
              variants={card}
              className={`relative
                ${i % 2 === 0 ? "md:ml-auto md:pr-10" : "md:mr-auto md:pl-10"}`}
            >
              {/* DOT */}
              <div
                className={`hidden md:block absolute top-1/2 -translate-y-1/2
                  ${i % 2 === 0 ? "-right-[14px]" : "-left-[14px]"}
                  w-6 h-6 rounded-full bg-gradient-to-br from-[#daa520] to-[#f4d03f]
                  border border-white/60 shadow-lg`}
              />

              {/* CARD */}
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#daa520]/30 shadow-xl text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#daa520] to-[#f4d03f] flex items-center justify-center text-2xl sm:text-3xl shadow-md">
                  {ritual.icon}
                </div>
                <h3 className="text-lg sm:text-xl md:text-3xl font-awesome text-[#3d2207] mb-2">
                  {ritual.title}
                </h3>
                <p className="text-xs uppercase tracking-widest text-[#b8860b] mb-2">
                  {ritual.time}
                </p>
                <p className="text-sm sm:text-base text-[#5d2e0a]/90">
                  {ritual.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Rituals;
