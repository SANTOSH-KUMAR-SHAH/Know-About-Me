import React, { useState, useEffect, useCallback } from 'react';
import { useLenis } from './hooks/useLenis';
import { CustomCursor } from './components/CustomCursor';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TransitionZone from './components/TransitionZone';
import Work from './components/Work';
import Skills from './components/Skills';
import Education from './components/Education';
import Process from './components/Process';
import Testimonial from './components/Testimonial';
import SEOContent from './components/SEOContent';
import Contact from './components/Contact';
import ReturnTransition from './components/ReturnTransition';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [heroStart, setHeroStart] = useState(false);

  useLenis();

  useEffect(() => {
    if (!preloaderDone) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [preloaderDone]);

  const handleStartExit = useCallback(() => {
    setHeroStart(true);
  }, []);

  const handleComplete = useCallback(() => {
    setPreloaderDone(true);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  return (
    <>
      <CustomCursor />

      {/* Main site is rendered from frame 0 directly behind the preloader */}
      <main className="app-container">
        <Navbar />
        
        {/* Black Zone */}
        <div className="zone-black">
          <Hero startAnimation={heroStart} />
          <About />
        </div>

        {/* Transition Zone (Black -> White) */}
        <TransitionZone />

        {/* White Zone */}
        <div className="zone-white">
          <Skills />
          <Process />
          <Work />
          <Testimonial />
          <Education />
        </div>

        {/* Return Transition (White -> Black) */}
        <ReturnTransition />

        {/* Final Black Zone */}
        <div className="zone-black">
          <SEOContent />
          <Contact />
        </div>
      </main>

      {/* Preloader overlay — slides UP as a curtain, revealing main site underneath */}
      {!preloaderDone && (
        <Preloader
          onStartExit={handleStartExit}
          onComplete={handleComplete}
        />
      )}
    </>
  );
}

export default App;
