import React, { useRef, useEffect } from "react";
import { motion, useInView, useAnimationControls } from "framer-motion";

const blessingsConfig = {
  id: "wedding-blessings-1",
  subtitle: "With Love & Prayers",
  title: "A Blessing for the",
  titleHighlight: "Journey Ahead",
  signature: "— With blessings from family & friends —",
  blessingText: `May your lives be woven with <span class="text-[#daa520]">love</span>,
    patience, and shared laughter.<br />
    May every dawn bring <span class="text-[#e2725b]">understanding</span>,
    and every dusk bring peace.<br />
    May your home be filled with <span class="text-[#f4d03f]">warmth</span>,
    and your hearts with gratitude.`,
  colors: {
    primary: "#daa520",
    gradientVia: "#f4d03f",
    text: "#3d2207",
    subtitle: "#b8860b",
    muted: "#5d2e0a",
    accent: "#e2725b",
  },
  canvas: {
    particleColors: [
      "rgba(218, 165, 32, 0.25)",
      "rgba(255, 215, 0, 0.2)",
      "rgba(244, 208, 63, 0.3)",
      "rgba(231, 114, 91, 0.18)",
    ],
    particleCount: { mobile: 30, desktop: 60 },
  },
  layout: {
    padding: { py: { default: "20", sm: "24", md: "32" }, px: { default: "4", sm: "6", md: "12", lg: "20" } },
    maxWidth: "3xl",
    dividerWidth: { default: "24", sm: "32" },
    gap: "4", // Reduced spacing
    margins: {
      subtitle: { default: "5", sm: "6" },
      title: { default: "8", sm: "10" },
      divider: { default: "12", sm: "14" },
      signature: { default: "6", sm: "8" },
    },
  },
};

const Blessings = ({ config = blessingsConfig }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimationControls();
  const canvasRef = useRef(null);

  // Sacred particles - EXACT SAME LOGIC
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    class Particle {
      constructor(w, h) { this.reset(w, h); }
      reset(w, h) {
        this.x = Math.random() * w;
        this.y = h + 20;
        this.vy = -(Math.random() * 0.8 + 0.3);
        this.vx = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 2 + 0.8;
        this.life = 0;
        this.maxLife = 400;
        this.color = config.canvas.particleColors[Math.floor(Math.random() * config.canvas.particleColors.length)];
        this.wobble = Math.random() * Math.PI * 2;
      }
      update(w) {
        this.y += this.vy;
        this.x += this.vx + Math.sin(this.wobble) * 0.3;
        this.vy *= 0.995;
        this.wobble += 0.08;
        this.life++;
        this.size *= 0.995;
        if (this.y < -20 || this.life > this.maxLife) this.reset(w, window.innerHeight);
      }
      draw(ctx) {
        const fade = 1 - this.life / this.maxLife;
        ctx.save();
        ctx.globalAlpha = fade * 0.7;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    let particles = [];
    const particleCount = window.innerWidth < 640 ? config.canvas.particleCount.mobile : config.canvas.particleCount.desktop;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(rect.width, rect.height));
      }
    };

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createRadialGradient(
        rect.width * 0.3, rect.height * 0.7, 0,
        rect.width * 0.7, rect.height * 0.4, Math.max(rect.width, rect.height)
      );
      gradient.addColorStop(0, "rgba(248,244,237,0.12)");
      gradient.addColorStop(1, "rgba(253,249,245,0.01)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      particles.forEach(p => { p.update(rect.width); p.draw(ctx); });
      animationFrameId = requestAnimationFrame(render);
    };

    resizeCanvas();
    render();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [config.canvas.particleColors, config.canvas.particleCount]);

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.1, staggerChildren: 0.2 } }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9 } }
  };

  return (
    <section
      ref={ref}
      id="blessings"
      className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden bg-gradient-to-br from-[#fdfcfb]/95 via-[#f8f4ed]/90 to-[#fdfcfb]/95"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60 sm:opacity-70 md:opacity-85 -z-10 pointer-events-none"
      />

      <motion.div
        className="relative z-20 max-w-3xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.p
          className="text-[0.55rem] sm:text-[0.6rem] md:text-[0.7rem] uppercase tracking-[0.35em] text-[#b8860b] mb-5 sm:mb-6 font-para font-bold"
          variants={textVariants}
        >
          {config.subtitle}
        </motion.p>

        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-7xl font-adelio font-black text-[#3d2207] mb-8 sm:mb-10 leading-tight"
          variants={textVariants}
        >
          {config.title}
          <span
            className="block bg-gradient-to-r from-[#daa520] via-[#f4d03f] to-[#daa520] bg-clip-text text-transparent"
          >
            {config.titleHighlight}
          </span>
        </motion.h2>

        <div className={`w-${config.layout.dividerWidth.default} sm:w-${config.layout.dividerWidth.sm} h-px bg-gradient-to-r from-transparent via-[${config.colors.primary}] to-transparent mx-auto mb-${config.layout.margins.divider.default} sm:mb-${config.layout.margins.divider.sm}`} />

        <motion.p
          className="text-xs sm:text-sm md:text-base text-[#5d2e0a]/90 leading-relaxed font-font font-bold italic bg-white/70 backdrop-blur-lg px-5 sm:px-6 md:px-10 py-6 sm:py-7 md:py-8 rounded-2xl border border-[#daa520]/30 shadow-lg"
          variants={textVariants}
          dangerouslySetInnerHTML={{ __html: config.blessingText }}
        />

        <motion.p
          className="text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.25em] text-[#b8860b]/80 font-font font-bold mt-6 sm:mt-8"
          variants={textVariants}
        >
          {config.signature}
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Blessings;
