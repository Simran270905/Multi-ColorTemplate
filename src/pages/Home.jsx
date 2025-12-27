// src/pages/Home.jsx
import React, { useEffect } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Invite from "../components/Invite";
import Story from "../components/Story";
import Rituals from "../components/Rituals";
import Blessings from "../components/Blessings";
import Footer from "../components/Footer";

const homeConfig = {
  id: "wedding-home-1",
  title: "Ishita & Raman | Wedding Invitation",
  sections: [
    { name: "Hero", component: Hero, id: "hero" },
    { name: "Invite", component: Invite, id: "invite" },
    { name: "Story", component: Story, id: "story" },
    { name: "Rituals", component: Rituals, id: "rituals" },
    { name: "Blessings", component: Blessings, id: "blessings" },
  ],
  layout: {
    mainGap: "6", // ✅ REDUCED from gap-8 md:gap-10 lg:gap-20
    sectionPadding: { 
      default: "4", 
      sm: "6", 
      md: "10", 
      lg: "16" 
    },
  },
  background: {
    gradientFrom: "#fdf2f0",
    gradientTo: "#f9f5f0",
  },
};

const Home = ({ config = homeConfig }) => {
  useEffect(() => {
    document.title = config.title;
  }, [config.title]);

  return (
    <div className={`min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[${config.background.gradientFrom}] to-[${config.background.gradientTo}]`}>
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT - REDUCED GAP */}
      <main className={`flex flex-col gap-${config.layout.mainGap} md:gap-${config.layout.mainGap}`}>
        {/* HERO */}
        <section className="w-full">
          <Hero />
        </section>

        {/* INVITATION */}
        <section className={`w-full px-${config.layout.sectionPadding.default} sm:px-${config.layout.sectionPadding.sm} md:px-${config.layout.sectionPadding.md} lg:px-${config.layout.sectionPadding.lg}`}>
          <Invite />
        </section>

        {/* STORY */}
        <section className={`w-full px-${config.layout.sectionPadding.default} sm:px-${config.layout.sectionPadding.sm} md:px-${config.layout.sectionPadding.md} lg:px-${config.layout.sectionPadding.lg}`}>
          <Story />
        </section>

        {/* RITUALS */}
        <section className={`w-full px-${config.layout.sectionPadding.default} sm:px-${config.layout.sectionPadding.sm} md:px-${config.layout.sectionPadding.md} lg:px-${config.layout.sectionPadding.lg}`}>
          <Rituals />
        </section>

        {/* BLESSINGS */}
        <section className={`w-full px-${config.layout.sectionPadding.default} sm:px-${config.layout.sectionPadding.sm} md:px-${config.layout.sectionPadding.md} lg:px-${config.layout.sectionPadding.lg}`}>
          <Blessings />
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Home;
