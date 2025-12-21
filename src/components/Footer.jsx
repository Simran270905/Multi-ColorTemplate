import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [copied, setCopied] = useState(false);

    const email = "priyaarjun2025@gmail.com";
  const whatsappUrl =
    "https://wa.me/919876543210?text=Hi! We'd love to attend Priya & Arjun's wedding! 🎉";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const calendarData = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Priya & Arjun Wedding
DTSTART:20251218T073000
DTEND:20251218T090000
LOCATION:Shri Ganesh Mandir, Pune
END:VEVENT
END:VCALENDAR`;

  const downloadCalendar = () => {
    const blob = new Blob([calendarData], { type: "text/calendar" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "Priya-Arjun-Wedding.ics";
    a.click();
  };

  return (
  <footer
    ref={ref}
    className="
      relative
      py-12 sm:py-14
      px-4 sm:px-6 md:px-16
      bg-gradient-to-t
      from-[#3d2207] via-[#5d2e0a] to-[#3d2207]
      border-t-4 border-[#daa520]/40
      text-white
      overflow-hidden
    "
  >
    {/* Soft gold glow */}
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-1/3 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-[#daa520]/20 blur-3xl rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-56 sm:w-72 h-56 sm:h-72 bg-[#fbbf24]/10 blur-[160px] rounded-full" />
    </div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1 }}
      className="max-w-5xl mx-auto text-center"
    >
      {/* Names */}
      <h2
        className="
          text-2xl sm:text-3xl md:text-4xl
          font-font font-black
          bg-gradient-to-r from-[#fbbf24] to-[#daa520]
          bg-clip-text text-transparent
          mb-8
        "
      >
        Ishita & Raman
      </h2>

      {/* Info */}
      <div
        className="
          grid
          grid-cols-1 sm:grid-cols-2 md:grid-cols-3
          gap-6
          text-sm
          mb-10
        "
      >
        <div>
          <p className="font-semibold font-font text-[#daa520] mb-1">Contact</p>
          <p className="text-white/90">+91 98765 43210</p>
        </div>

        <div>
          <p className="font-semibold font-font text-[#daa520] mb-1">Venue</p>
          <p className="text-white/90">Shri Ganesh Mandir</p>
          <p className="text-white/90">Pune, Maharashtra</p>
        </div>

        <div>
          <p className="font-semibold font-font text-[#daa520] mb-1">RSVP</p>
          <p
            onClick={copyEmail}
            className="
              cursor-pointer
              underline
              decoration-[#daa520]/60
              break-all
              inline-flex
              items-center
              justify-center
              gap-2
            "
          >
            {email}
            {copied && (
              <span className="text-[10px] bg-[#daa520] text-black px-2 py-0.5 rounded-full">
                Copied
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <button
          onClick={() => window.open(whatsappUrl, "_blank")}
          className="
            w-full sm:w-auto
            px-8 py-3
            rounded-full
            border border-[#e2725b]/60
            text-[#e2725b]
            hover:bg-[#e2725b]/20
            transition
          "
        >
          📱 WhatsApp
        </button>

        <button
          onClick={downloadCalendar}
          className="
            w-full sm:w-auto
            px-8 py-3
            rounded-full
            border border-[#daa520]/60
            text-[#daa520]
            hover:bg-[#daa520]/20
            transition
          "
        >
          📅 Add to Calendar
        </button>
      </div>

      {/* Footer note */}
      <p className="text-[11px] sm:text-xs text-white/70 font-serif italic leading-relaxed">
        Designed with ❤️ for our special day
        <br />
        <span className="text-[#daa520] font-semibold">
          © 2025 StarX Innovation & IT Solution
        </span>
      </p>
    </motion.div>
  </footer>

  );
};

export default Footer;
