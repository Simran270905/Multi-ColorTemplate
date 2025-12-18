import React, { useEffect, useRef } from "react";
import { motion, useAnimationControls, useInView } from "framer-motion";
import photo1 from "../assets/image/photo1.jpg";
import photo2 from "../assets/image/photo2.jpg";

const Story = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimationControls();

  // Enhanced sparkle system with trailing magic
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const sparkleColors = [
      "rgba(218, 165, 32, 0.4)",
      "rgba(255, 215, 0, 0.35)",
      "rgba(184, 134, 11, 0.3)",
      "rgba(255, 223, 127, 0.45)",
    ];

    class MagicSparkle {
      constructor(w, h) {
        this.reset(w, h);
      }
      reset(w, h) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2 + 0.6;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = Math.random() * 0.15 + 0.02;
        this.life = 0;
        this.maxLife = Math.random() * 300 + 250;
        this.color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
        this.trail = [];
      }
      update(w, h) {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life++;
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > 8) this.trail.shift();
        if (this.x < -10 || this.x > w + 10 || this.y > h + 10 || this.life > this.maxLife) {
          this.reset(w, h);
        }
      }
      draw(ctx) {
        const fade = 1 - this.life / this.maxLife;
        ctx.save();
        this.trail.forEach((point, i) => {
          const trailFade = fade * (i / this.trail.length) * 0.6;
          ctx.globalAlpha = trailFade;
          ctx.fillStyle = this.color.replace("0.4", "0.15").replace("0.35", "0.12").replace("0.3", "0.1").replace("0.45", "0.18");
          ctx.beginPath();
          ctx.arc(point.x, point.y, this.size * 0.4, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = fade * 0.8;
        ctx.shadowColor = this.color.replace("0.4", "0.6").replace("0.35", "0.55");
        ctx.shadowBlur = 12;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.restore();
      }
    }

    let particles = [];

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);

      const count = window.innerWidth < 640 ? 25 : 45;
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new MagicSparkle(rect.width, rect.height));
      }
    };

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createRadialGradient(width / 2, height / 3, 0, width / 2, height / 2, Math.max(width, height) * 0.7);
      gradient.addColorStop(0, "rgba(218, 165, 32, 0.08)");
      gradient.addColorStop(0.3, "rgba(255, 215, 0, 0.04)");
      gradient.addColorStop(1, "rgba(248, 244, 237, 0.01)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update(width, height);
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    resizeCanvas();
    render();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, staggerChildren: 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], type: "spring", bounce: 0.2 } },
  };

  const photoVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.8, ease: [0.32, 0, 0.67, 0], type: "spring", damping: 15 } },
  };

  const floatingAnimation = {
    y: ["0%", "-10%", "0%", "5%", "0%"],
    rotate: ["0deg", "1deg", "-1deg", "0.5deg", "0deg"],
    scale: [1, 1.02, 1, 1.01, 1],
    transition: { duration: 12, repeat: Infinity, ease: "easeInOut" },
  };

  return (
    <section ref={ref} id="story" className="relative py-20 md:py-28 px-6 md:px-12 lg:px-24 overflow-hidden bg-gradient-to-b from-[#f8f4ed]/80 via-[#fdfcfb]/70 to-[#f8f4ed]/80">
      <div className="absolute inset-0 pointer-events-none -z-10">
        <canvas ref={canvasRef} className="w-full h-full opacity-70 md:opacity-80" />
      </div>

      <motion.div className="max-w-6xl mx-auto space-y-16 md:space-y-24" variants={containerVariants} initial="hidden" animate={controls}>
        {/* ✨ HEADER */}
        <motion.div className="text-center relative" variants={cardVariants} whileHover={{ scale: 1.02 }}>
          <motion.div className="inline-block mb-4" initial={{ scale: 0, rotate: 180 }} animate={{ scale: 1, rotate: 0, transition: { delay: 0.3, type: "spring", stiffness: 300, damping: 20 } }}>
            <p className="text-[0.6rem] md:text-[0.7rem] uppercase tracking-[0.35em] text-[#b8860b] mb-3 px-3 py-1 bg-[#daa520]/10 rounded-full backdrop-blur-sm">🌟 Our Journey 🌟</p>
          </motion.div>
          <motion.h2 className="text-4xl md:text-6xl lg:text-8xl font-adelio font-black text-[#3d2207] leading-tight tracking-tight" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}>
            Our&nbsp;<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#daa520] via-[#f4d03f] to-[#daa520]">Story</span>
          </motion.h2>
          <motion.div className="mt-6 h-1 w-36 md:w-44 mx-auto bg-gradient-to-r from-transparent via-[#daa520] to-transparent rounded-full" initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.8, duration: 0.6 }} />
        </motion.div>

        {/* 🎭 STORY CONTENT */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-6 lg:space-y-10 font-para">
            {[
              { title: "First Glance", content: "We met at Ganesh Chaturthi celebrations in 2022. Amidst the modak and aarti, our eyes met across the crowded mandap.", delay: 0.2 },
              { title: "The Proposal", content: "Under the full moon at Shaniwar Wada, Arjun proposed with his grandmother's antique ring.", delay: 0.4 },
            ].map((story) => (
              <motion.div key={story.title} variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: story.delay }} whileHover={{ y: -6, scale: 1.02, boxShadow: "0 20px 40px -10px rgba(218, 165, 32, 0.25)" }} className="group bg-[#fdfcfb]/95 backdrop-blur-2xl rounded-2xl p-6 lg:p-10 border border-[#daa520]/30 shadow-lg lg:shadow-xl hover:shadow-gold transition-all duration-500 cursor-pointer relative overflow-hidden">
                <div className="absolute -top-3 -right-3 w-16 h-16 bg-[#daa520]/10 rounded-2xl blur-xl group-hover:scale-110 transition-all duration-500" />
                <h3 className="text-xl lg:text-2xl font-serif font-black text-[#5d2e0a] mb-4 group-hover:text-[#daa520] transition-colors duration-300">{story.title}</h3>
                <p className="text-base lg:text-lg leading-relaxed text-[#3d2207] group-hover:text-[#4a2c0f]">{story.content}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6 relative">
            {[{img: photo1, gradient: "from-[#f4a8a0] to-[#f0e68c]", top: "mt-0", rotateHover: "0.8", floatDelay: 0 }, {img: photo2, gradient: "from-[#fef7e0] to-[#f4a8a0]", top: "mt-12 lg:mt-16", rotateHover: "-0.8", floatDelay: 0.2 }].map((photo, index) => (
              <motion.div key={index} variants={photoVariants} initial="hidden" animate="visible" transition={{ delay: photo.floatDelay }} className={`relative ${photo.top}`} whileHover={{ scale: 1.05, rotate: `${photo.rotateHover}deg`, z: 10 }}>
                <motion.div className={`aspect-square rounded-2xl bg-gradient-to-br ${photo.gradient} border-4 border-[#daa520]/50 shadow-xl overflow-hidden relative`} animate={floatingAnimation} transition={{ delay: index * 0.5 }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#daa520]/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-4 rounded-xl overflow-hidden border-2 border-[#fdfcfb]/90 shadow-xl bg-[#fdfcfb]">
                  <img
                    src={photo.img}
                    alt="Our Story"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#daa520] rotate-45" />
                  <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#daa520] rotate-45" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 💫 GRAND FINALE QUOTE 💫 */}
        <motion.div className="text-center relative py-8 px-6" variants={cardVariants} transition={{ delay: 0.6 }}>
          <div className="absolute inset-0 bg-gradient-to-r from-[#daa520]/5 to-[#f4d03f]/5 rounded-2xl backdrop-blur-xl -z-10" />
          <motion.div className="relative z-10" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.9, type: "spring", stiffness: 200 }}>
            <p className="text-lg lg:text-2xl xl:text-3xl font-font font-bold italic text-[#5d2207] leading-relaxed max-w-3xl mx-auto px-6 py-8 bg-[#fdfcfb]/60 backdrop-blur-xl rounded-2xl border border-[#daa520]/20 shadow-xl">
              ✨ "From friendship to forever, our love story is written in the stars and blessed by Ganapati Bappa." ✨
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .shadow-gold {
          box-shadow: 0 25px 60px -15px rgba(218, 165, 32, 0.3),
                      0 0 0 1px rgba(218, 165, 32, 0.1) !important;
        }
      `}</style>
    </section>
  );
};

export default Story;
