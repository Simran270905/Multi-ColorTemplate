import React, { useEffect, useRef } from "react";
import { motion, useAnimationControls, useInView } from "framer-motion";
import photo1 from "../assets/image/photo1.jpg";
import photo2 from "../assets/image/photo2.jpg";

const storyConfig = {
  id: "wedding-story-1",
  header: {
    subtitle: "✨ Our Journey ✨",
    title: "Our",
    titleHighlight: "Story",
  },
  moments: [
    { 
      title: "First Glance", 
      text: "We met at Ganesh Chaturthi celebrations in 2022. Amid modak and aarti, our eyes met across the mandap." 
    },
    { 
      title: "The Proposal", 
      text: "Under the full moon at Shaniwar Wada, Arjun proposed with his grandmother's antique ring." 
    },
  ],
  quote: `✨ "From friendship to forever, our love story is written in the stars and blessed by Ganapati Bappa." ✨`,
  images: [photo1, photo2],
  colors: {
    primary: "#daa520",
    gradientVia: "#f4d03f",
    text: "#3d2207",
    dark: "#5d2e0a",
    subtitle: "#b8860b",
    sparkleColors: [
      "rgba(218,165,32,0.4)",
      "rgba(255,215,0,0.35)",
      "rgba(184,134,11,0.3)",
      "rgba(255,223,127,0.45)",
    ],
  },
  layout: {
    padding: { py: { default: "16", sm: "20", md: "28" }, px: { default: "4", sm: "6", md: "12", lg: "24" } },
    spaceY: "10", // ✅ REDUCED from space-y-14 md:space-y-24
    grid: {
      gap: "8", // ✅ REDUCED from gap-10 lg:gap-20
      imagesGap: "3", // ✅ REDUCED from gap-4 sm:gap-6
    },
    imageOffset: { default: "8", sm: "12" },
  },
  canvas: {
    sparkleCount: { mobile: 20, desktop: 40 },
  },
};

const Story = ({ config = storyConfig }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const controls = useAnimationControls();
  const canvasRef = useRef(null);

  /* Sparkle Canvas - FULLY CONFIGURABLE */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frame;

    class Sparkle {
      constructor(w, h) { this.reset(w, h); }
      reset(w, h) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2 + 0.6;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = Math.random() * 0.15 + 0.02;
        this.life = 0;
        this.maxLife = Math.random() * 300 + 200;
        this.color = config.colors.sparkleColors[Math.floor(Math.random() * config.colors.sparkleColors.length)];
        this.trail = [];
      }
      update(w, h) {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > 6) this.trail.shift();
        if (this.x < -20 || this.x > w + 20 || this.y > h + 20 || this.life > this.maxLife)
          this.reset(w, h);
      }
      draw(ctx) {
        const fade = 1 - this.life / this.maxLife;
        this.trail.forEach((p, i) => {
          ctx.globalAlpha = fade * (i / this.trail.length) * 0.4;
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, this.size * 0.4, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = fade * 0.7;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    let sparkles = [];

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * devicePixelRatio;
      canvas.height = r.height * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      sparkles = Array.from({ 
        length: window.innerWidth < 640 ? config.canvas.sparkleCount.mobile : config.canvas.sparkleCount.desktop 
      }, () => new Sparkle(r.width, r.height));
    };

    const render = () => {
      const r = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparkles.forEach(s => { s.update(r.width, r.height); s.draw(ctx); });
      frame = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, [config.colors.sparkleColors, config.canvas.sparkleCount]);

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const container = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15, duration: 0.8 } },
  };

  const card = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, type: "spring", bounce: 0.2 } },
  };

  return (
    <section
      ref={ref}
      id="story"
      className={`relative w-full overflow-hidden bg-gradient-to-b from-[#f8f4ed]/80 via-[#fdfcfb]/70 to-[#f8f4ed]/80 py-${config.layout.padding.py.default} sm:py-${config.layout.padding.py.sm} md:py-${config.layout.padding.py.md} px-${config.layout.padding.px.default} sm:px-${config.layout.padding.px.sm} md:px-${config.layout.padding.px.md} lg:px-${config.layout.padding.px.lg}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 -z-10 w-full h-full opacity-60 md:opacity-80" />

      <motion.div
        className={`max-w-6xl mx-auto space-y-${config.layout.spaceY} md:space-y-${config.layout.spaceY}`}
        variants={container}
        initial="hidden"
        animate={controls}
      >
        {/* HEADER */}
        <motion.div variants={card} className="text-center">
          <p className="text-[0.6rem] uppercase tracking-[0.35em] text-[#b8860b] mb-3">
            {config.header.subtitle}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-adelio font-black text-[#3d2207]">
            {config.header.title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#daa520] via-[#f4d03f] to-[#daa520]">
              {config.header.titleHighlight}
            </span>
          </h2>
          <div className="mt-6 h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-[#daa520] to-transparent" />
        </motion.div>

        {/* CONTENT - REDUCED GAPS */}
        <div className={`grid lg:grid-cols-2 gap-${config.layout.grid.gap} lg:gap-${config.layout.grid.gap} items-center`}>
          {/* TEXT */}
          <div className="space-y-6">
            {config.moments.map((moment, i) => (
              <motion.div key={i} variants={card} className="bg-[#fdfcfb]/95 rounded-2xl p-6 md:p-8 border border-[#daa520]/30 shadow-lg">
                <h3 className="text-xl md:text-2xl font-serif font-black text-[#5d2e0a] mb-3">
                  {moment.title}
                </h3>
                <p className="text-base md:text-lg text-[#3d2207] leading-relaxed">
                  {moment.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* IMAGES - REDUCED GAP */}
          <div className={`grid grid-cols-2 gap-${config.layout.grid.imagesGap} sm:gap-${config.layout.grid.imagesGap} max-w-md mx-auto`}>
            {config.images.map((img, i) => (
              <motion.div
                key={i}
                variants={card}
                className={`rounded-2xl overflow-hidden border-4 border-[#daa520]/50 shadow-xl ${i === 1 ? `mt-${config.layout.imageOffset.default} sm:mt-${config.layout.imageOffset.sm}` : ""}`}
              >
                <img src={img} alt="Our Story" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* QUOTE */}
        <motion.div variants={card} className="text-center">
          <p className="text-base sm:text-lg md:text-2xl italic font-font font-bold text-[#5d2207] max-w-3xl mx-auto bg-[#fdfcfb]/60 backdrop-blur-xl rounded-2xl p-6 md:p-10 border border-[#daa520]/20 shadow-xl">
            {config.quote}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Story;
