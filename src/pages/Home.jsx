// src/pages/Home.jsx
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Invite from '../components/Invite';
import Story from '../components/Story';
import Rituals from '../components/Rituals';
import Blessings from '../components/Blessings';
import Footer from '../components/Footer';

const Home = () => {
  useEffect(() => {
    document.title = 'Ishita & Raman | Wedding Invitation';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf2f0] to-[#f9f5f0]">
      <Navbar />
      <Hero />
      <Invite />
      <Story />
      <Rituals />
      <Blessings />
      <Footer />
    </div>
  );
};

export default Home;
