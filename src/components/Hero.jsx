import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimationControls } from "framer-motion";
import portrait from "../assets/image/couple.jpg";

const heroConfig = {
  id: "wedding-hero-canvas-1",
  brideName: "Ishita",
  groomName: "Raman",
  subtitle: "With Divine Blessings",
  description: "Invite you to witness and bless their sacred union, celebrated in the timeless elegance of Maharashtrian tradition.",
  ctaText: "View Full Invitation →",
  image: portrait,
  colors: {
    primary: "#daa520",
    gradientFrom: "#d95a44",
    gradientVia: "#daa520", 
    gradientTo: "#f4d03f",
    text: "#3d2207",
    subtitle: "#b8860b",
    border: "#daa520",
  },
  canvas: {
    particleColors: [
      "rgba(218,165,32,0.3)",
      "rgba(255,215,0,0.25)",
      "rgba(184,134,11,0.2)",
      "rgba(255,223,127,0.35)",
    ],
    particleCount: { mobile: 40, desktop: 90 },
  },
  layout: {
    padding: { xs: "5", sm: "8", md: "12", lg: "24" },
    py: { sm: "20", md: "32" },
    gap: "8",
    imageMaxWidth: { xs: "[260px]", sm: "sm", md: "md" },
    spaceY: { default: "6", sm: "8" },
  },
};

const Hero = ({ config = heroConfig }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimationControls();
  const canvasRef = useRef(null);

  /* Particle system - FIXED */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    class Particle {
      constructor() { this.reset(); }
      reset() {
        const a = Math.random() * Math.PI * 2;
        const r = Math.random() * 0.4 + 0.1;
        this.x = Math.cos(a) * r;
        this.y = Math.sin(a) * r;
        this.vx = (Math.random() - 0.5) * 0.02;
        this.vy = (Math.random() - 0.5) * 0.02;
        this.size = Math.random() * 3 + 1;
        this.life = 0;
        this.maxLife = 400;
        this.color = config.canvas.particleColors[Math.floor(Math.random() * config.canvas.particleColors.length)];
        this.orbitSpeed = Math.random() * 0.008 + 0.002;
      }
      update(t) {
        this.life++;
        this.x += Math.cos(t * this.orbitSpeed) * 0.4 + this.vx;
        this.y += Math.sin(t * this.orbitSpeed) * 0.4 + this.vy;
        if (this.life > this.maxLife) this.reset();
      }
      draw(ctx, cx, cy, s) {
        ctx.save();
        ctx.globalAlpha = 0.7 * (1 - this.life / this.maxLife);
        ctx.fillStyle = this.color;
        ctx.translate(cx + this.x * s, cy + this.y * s);
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const count = window.innerWidth < 640 ? config.canvas.particleCount.mobile : config.canvas.particleCount.desktop;
    const particles = Array.from({ length: count }, () => new Particle());
    let time = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * devicePixelRatio;
      canvas.height = r.height * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const render = () => {
      const r = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update(time);
        p.draw(ctx, r.width / 2, r.height / 2, Math.min(r.width, r.height) / 600);
      });
      time++;
      animationFrameId = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [config.canvas.particleColors]); // ✅ FIXED dependency

  useEffect(() => {
    if (isInView) controls.start("animate");
  }, [isInView, controls]);

  const nameVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1.1, type: "spring", damping: 18 },
    },
  };

  const stagger = {
    hidden: { opacity: 0, y: 20 },
    animate: i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.7 },
    }),
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#fdf2f0] via-[#f8f4ed] to-[#f9f5f0]"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full -z-10 pointer-events-none"
      />

      <div className="relative z-20 grid min-h-screen grid-cols-1 md:grid-cols-2 px-5 sm:px-8 md:px-12 lg:px-24 sm:py-20 md:py-32 gap-8 md:gap-8">
        {/* IMAGE – FIRST ON MOBILE */}
        <motion.div className="flex justify-center items-center md:order-2">
          <div className="w-full max-w-[260px] sm:max-w-sm md:max-w-md aspect-[3/4] rounded-3xl overflow-hidden border-4 border-[#daa520]/40 shadow-2xl">
            <img
              src={config.image}
              alt="Couple"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* TEXT */}
        <motion.div
          className="flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-6 sm:space-y-8 text-[#3d2207]"
          initial="hidden"
          animate={controls}
        >
          <motion.p
            custom={0}
            variants={stagger}
            className="tracking-[0.35em] uppercase text-xs sm:text-sm font-para text-[#b8860b]"
          >
            {config.subtitle}
          </motion.p>

          <motion.h1
            custom={1}
            variants={nameVariants}
            className="font-serif leading-tight"
          >
            <span className="block text-4xl sm:text-5xl md:text-8xl font-monster bg-gradient-to-r from-[#d95a44] via-[#daa520] to-[#f4d03f] bg-clip-text text-transparent">
              {config.brideName} &
            </span>
            <span className="block mt-2 text-4xl sm:text-5xl md:text-8xl font-monster">
              {config.groomName}
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={stagger}
            className="max-w-md text-base sm:text-lg md:text-2xl font-font"
          >
            {config.description}
          </motion.p>

          <motion.button
            custom={3}
            variants={stagger}
            whileHover={{ scale: 1.05 }}
            className="w-full sm:w-fit px-8 sm:px-10 py-4 rounded-3xl border-2 border-[#daa520]/50 bg-[#fdfcfb]/80 font-font font-semibold shadow-xl"
            onClick={() =>
              document.getElementById("invite")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {config.ctaText}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
