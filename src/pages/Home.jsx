// src/pages/Home.jsx
import React, { useEffect } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Invite from "../components/Invite";
import Story from "../components/Story";
import Rituals from "../components/Rituals";
import Blessings from "../components/Blessings";
import Footer from "../components/Footer";

const Home = () => {
  useEffect(() => {
    document.title = "Ishita & Raman | Wedding Invitation";
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#fdf2f0] to-[#f9f5f0]">
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex flex-col gap-24 md:gap-32 lg:gap-40">
        {/* HERO */}
        <section className="w-full">
          <Hero />
        </section>

        {/* INVITATION */}
        <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
          <Invite />
        </section>

        {/* STORY */}
        <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
          <Story />
        </section>

        {/* RITUALS */}
        <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
          <Rituals />
        </section>

        {/* BLESSINGS */}
        <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
          <Blessings />
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Home;
