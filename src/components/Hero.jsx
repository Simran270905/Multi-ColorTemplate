import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimationControls } from "framer-motion";
import portrait from "../assets/image/couple.jpg"
const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0 });
  const controls = useAnimationControls();
  const canvasRef = useRef(null);

  // ----------------------------
  // Particle system (golden mandala)
  // ----------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const colors = [
      "rgba(218, 165, 32, 0.3)",
      "rgba(255, 215, 0, 0.25)",
      "rgba(184, 134, 11, 0.2)",
      "rgba(255, 223, 127, 0.35)"
    ];

    class GoldenParticle {
      constructor() { this.reset(); }
      reset() {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 0.4 + 0.1;
        this.x = Math.cos(angle) * radius;
        this.y = Math.sin(angle) * radius;
        this.vx = (Math.random() - 0.5) * 0.02;
        this.vy = (Math.random() - 0.5) * 0.02;
        this.size = Math.random() * 3 + 1;
        this.life = 0;
        this.maxLife = 400;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.orbitRadius = Math.random() * 200 + 100;
        this.orbitSpeed = Math.random() * 0.008 + 0.002;
        this.pulse = Math.random() * Math.PI * 2;
      }
      update(time) {
        this.life++;
        this.pulse += 0.1;
        this.x += Math.cos(time * this.orbitSpeed + this.pulse) * 0.5 + this.vx;
        this.y += Math.sin(time * this.orbitSpeed + this.pulse) * 0.5 + this.vy;
        if (this.life > this.maxLife) this.reset();
      }
      draw(ctx, centerX, centerY, scale) {
        const fade = 1 - this.life / this.maxLife;
        ctx.save();
        ctx.globalAlpha = fade * 0.8;
        ctx.shadowColor = this.color.replace('0.3', '0.7').replace('0.25', '0.6');
        ctx.shadowBlur = 15;
        ctx.fillStyle = this.color;
        ctx.translate(centerX + this.x * scale, centerY + this.y * scale);
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const particleCount = window.innerWidth < 640 ? 60 : 100;
    const particles = Array.from({ length: particleCount }, () => new GoldenParticle());
    let time = 0;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const scale = Math.min(rect.width, rect.height) / 600;

      // Mandala radial glow
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 300 * scale);
      gradient.addColorStop(0, "rgba(218, 165, 32, 0.06)");
      gradient.addColorStop(1, "rgba(218, 165, 32, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      particles.forEach(p => p.update(time) && p.draw(ctx, centerX, centerY, scale));
      time++;
      animationFrameId = requestAnimationFrame(render);
    };

    resizeCanvas();
    render();
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Trigger animation when in view
  useEffect(() => {
    if (isInView) controls.start("animate");
  }, [isInView, controls]);

  // ----------------------------
  // Motion Variants
  // ----------------------------
  const nameVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.8 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], type: "spring", damping: 18 } }
  };

  const staggeredVariants = {
    hidden: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: i => ({ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.15 }) }
  };

  const floatingOrb = { y: ["0%", "-15%", "0%", "8%", "0%"], rotate: ["0deg", "2deg", "-2deg", "1deg", "0deg"], scale: [1, 1.03, 1, 1.02, 1], transition: { duration: 15, repeat: Infinity, ease: "easeInOut" } };

  // ----------------------------
  // JSX Render
  // ----------------------------
  return (
    <section ref={ref} id="hero" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#fdf2f0] via-[#f8f4ed] to-[#f9f5f0] dark:from-[#0f0b07] dark:via-[#140f0a] dark:to-[#0b0806]">
      {/* Canvas particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60 md:opacity-75 pointer-events-none -z-10" />

      {/* Floating ambient glows */}
      <motion.div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#daa520]/15 rounded-full blur-[120px]" animate={floatingOrb} />
      <motion.div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-[#e2725b]/12 rounded-full blur-[140px]" animate={{ ...floatingOrb, rotate: ["0deg", "-1deg", "1deg", "-0.5deg", "0deg"] }} />

      <div className="relative z-20 grid min-h-screen md:grid-cols-2 px-6 md:px-12 lg:px-24 py-24 md:py-32 gap-20">
        {/* Left Text */}
        <motion.div className="flex flex-col justify-center text-[#3d2207] dark:text-[#f5e9d6] space-y-12" initial="hidden" animate={controls}>
          <motion.div custom={0} variants={staggeredVariants} className="flex items-center gap-6 opacity-0">
            <motion.span className="h-[2px] w-16 bg-gradient-to-r from-transparent via-[#daa520] to-transparent" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.4 }} />
            <motion.div className="relative" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
              <p className="text-sm md:text-base uppercase tracking-[0.4em] text-[#b8860b] font-para font-medium">With Divine Blessings</p>
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-[#daa520] rounded-full opacity-60 animate-ping" />
            </motion.div>
          </motion.div>

          <motion.h1 custom={1} variants={nameVariants} className="font-serif leading-tight tracking-tight">
            <motion.span className="block text-6xl md:text-8xl lg:text-9xl bg-gradient-to-r from-[#d95a44] via-[#daa520] to-[#f4d03f] bg-clip-text text-transparent font-monster" whileHover={{ scale: 1.02, rotateX: 5 }} transition={{ type: "spring", stiffness: 300 }}>Ishita</motion.span>
            <motion.span className="block mt-4 md:mt-6 text-5xl md:text-7xl lg:text-8xl font-monster text-[#3d2207] dark:text-[#f5e9d6]" animate={{ y: [0, -5, 0], opacity: [1, 0.8, 1] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}>&nbsp;& Raman</motion.span>
          </motion.h1>

          <motion.p custom={2} variants={staggeredVariants} className="max-w-lg text-xl md:text-2xl leading-relaxed text-[#5d2e0a]/90 dark:text-[#e6d7be]/80 font-font backdrop-blur-sm">
            Invite you to witness and bless their sacred union, celebrated in the timeless elegance of Maharashtrian tradition.
          </motion.p>

          <motion.div custom={3} variants={staggeredVariants} className="h-px w-48 md:w-60 bg-gradient-to-r from-transparent via-[#daa520]/80 to-transparent relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#daa520] to-transparent h-full w-12 animate-pulse opacity-40" />
          </motion.div>

          <motion.div custom={4} variants={staggeredVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}>
              <p className="text-sm uppercase tracking-widest text-[#daa520] mb-3 font-font font-bold">Date</p>
              <p className="font-font font-bold  text-3xl md:text-4xl font-black">18th December 2025</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4 }}>
              <p className="text-sm uppercase tracking-widest text-[#daa520] mb-3 font-medium">Venue</p>
              <p className="font-font font-bold  text-3xl md:text-4xl ">Shri Ganesh Mandir, Pune</p>
            </motion.div>
          </motion.div>

          <motion.button custom={5} variants={staggeredVariants} whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(218,165,32,0.4)" }} whileTap={{ scale: 0.98 }} className="group mt-8 w-fit px-12 py-5 rounded-3xl border-2 border-[#daa520]/50 bg-[#fdfcfb]/80 backdrop-blur-xl font-semibold text-lg shadow-xl hover:bg-[#daa520]/20 transition-all duration-300 overflow-hidden relative" onClick={() => document.getElementById("invite")?.scrollIntoView({ behavior: "smooth" })}>
            <span className="relative z-10 flex items-center font-font">View Full Invitation
              <motion.span className="ml-4 inline-block" animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>→</motion.span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#daa520]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.button>
        </motion.div>

        {/* Right Portrait */}
        <motion.div className="flex items-center justify-center md:justify-end" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1, transition: { delay: 1.8, duration: 1 } }}>
        <motion.div className="relative w-96 h-[22rem] md:w-[28rem] md:h-[28rem] lg:w-96 lg:h-[32rem] rounded-3xl overflow-hidden bg-gradient-to-br from-[#fef7e0]/90 via-[#f8f4ed]/80 to-[#f4a8a0]/70 shadow-3xl border-4 border-[#daa520]/40 backdrop-blur-xl">
            <motion.div className="absolute inset-8 flex items-center justify-center" animate={floatingOrb} transition={{ duration: 20 }}>
              <div className="w-72 h-72 md:w-80 md:h-80 rounded-3xl border-8 border-[#daa520]/60 bg-gradient-to-br from-[#fdfcfb]/95 to-[#f8f4ed]/90 backdrop-blur-2xl shadow-[0_30px_90px_rgba(218,165,32,0.3)] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-[#daa520]/30 via-transparent to-transparent animate-pulse opacity-40 rounded-3xl" />
                <motion.img
                    src={portrait}
                  alt="Couple Portrait"
                  className="w-full h-full object-cover rounded-2xl"
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 8, repeat: Infinity }}
                />

                <div className="absolute top-6 right-6 w-8 h-8 border-t-4 border-r-4 border-[#daa520] rounded-tr-lg" />
                <div className="absolute bottom-6 left-6 w-8 h-8 border-b-4 border-l-4 border-[#daa520] rounded-bl-lg" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
