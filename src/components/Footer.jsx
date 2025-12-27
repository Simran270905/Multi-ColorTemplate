import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const footerConfig = {
  id: "wedding-footer-contact-1",
  brideName: "Ishita",
  groomName: "Raman",
  contact: {
    phone: "+91 98765 43210",
    email: "priyaarjun2025@gmail.com",
    whatsapp: "919876543210",
  },
  venue: {
    name: "Shri Ganesh Mandir",
    location: "Pune, Maharashtra",
  },
  calendar: {
    summary: "Ishita & Raman Wedding",
    start: "20251218T073000",
    end: "20251218T090000",
    location: "Shri Ganesh Mandir, Pune",
    filename: "Ishita-Raman-Wedding.ics",
  },
  company: "StarX Innovation & IT Solution",
  year: "2025",
  colors: {
    primary: "#daa520",
    gradientFrom: "#fbbf24",
    gradientTo: "#daa520",
    accent: "#e2725b",
    text: "#3d2207",
    backgroundFrom: "#3d2207",
    backgroundVia: "#5d2e0a",
  },
  layout: {
    gridGap: "4", // ✅ REDUCED from gap-6
    buttonsGap: "3", // ✅ REDUCED from gap-4
    padding: { py: { default: "12", sm: "14" }, px: { default: "4", sm: "6", md: "16" } },
  },
};

const Footer = ({ config = footerConfig }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [copied, setCopied] = useState(false);

  const whatsappUrl = `https://wa.me/${config.contact.whatsapp}?text=Hi! We'd love to attend ${config.brideName} & ${config.groomName}'s wedding! 🎉`;

  const calendarData = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${config.calendar.summary}
DTSTART:${config.calendar.start}
DTEND:${config.calendar.end}
LOCATION:${config.calendar.location}
END:VEVENT
END:VCALENDAR`;

  const copyEmail = () => {
    navigator.clipboard.writeText(config.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCalendar = () => {
    const blob = new Blob([calendarData], { type: "text/calendar" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = config.calendar.filename;
    a.click();
  };

  return (
    <footer
      ref={ref}
      className={`relative py-${config.layout.padding.py.default} sm:py-${config.layout.padding.py.sm} px-${config.layout.padding.px.default} sm:px-${config.layout.padding.px.sm} md:px-${config.layout.padding.px.md} bg-gradient-to-t from-[${config.colors.backgroundFrom}] via-[${config.colors.backgroundVia}] to-[${config.colors.backgroundFrom}] border-t-4 border-[${config.colors.primary}]/40 text-white overflow-hidden`}
    >
      {/* Soft gold glow - EXACT SAME */}
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
          className="text-2xl sm:text-3xl md:text-4xl font-font font-black bg-gradient-to-r from-[#fbbf24] to-[#daa520] bg-clip-text text-transparent mb-8"
        >
          {config.brideName} & {config.groomName}
        </h2>

        {/* Info - REDUCED GAP */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-${config.layout.gridGap} text-sm mb-10`}
        >
          <div>
            <p className="font-semibold font-font text-[#daa520] mb-1">Contact</p>
            <p className="text-white/90">{config.contact.phone}</p>
          </div>

          <div>
            <p className="font-semibold font-font text-[#daa520] mb-1">Venue</p>
            <p className="text-white/90">{config.venue.name}</p>
            <p className="text-white/90">{config.venue.location}</p>
          </div>

          <div>
            <p className="font-semibold font-font text-[#daa520] mb-1">RSVP</p>
            <p
              onClick={copyEmail}
              className="cursor-pointer underline decoration-[#daa520]/60 break-all inline-flex items-center justify-center gap-2"
            >
              {config.contact.email}
              {copied && (
                <span className="text-[10px] bg-[#daa520] text-black px-2 py-0.5 rounded-full">
                  Copied
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Actions - REDUCED GAP */}
        <div className={`flex flex-col sm:flex-row gap-${config.layout.buttonsGap} justify-center mb-8`}>
          <button
            onClick={() => window.open(whatsappUrl, "_blank")}
            className="w-full sm:w-auto px-8 py-3 rounded-full border border-[#e2725b]/60 text-[#e2725b] hover:bg-[#e2725b]/20 transition"
          >
            📱 WhatsApp
          </button>

          <button
            onClick={downloadCalendar}
            className="w-full sm:w-auto px-8 py-3 rounded-full border border-[#daa520]/60 text-[#daa520] hover:bg-[#daa520]/20 transition"
          >
            📅 Add to Calendar
          </button>
        </div>

        {/* Footer note */}
        <p className="text-[11px] sm:text-xs text-white/70 font-serif italic leading-relaxed">
          Designed with ❤️ for our special day
          <br />
          <span className="text-[#daa520] font-semibold">
            © {config.year} {config.company}
          </span>
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
