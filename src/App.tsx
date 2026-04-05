import React, { useState } from 'react';
import { useLenis } from './hooks/useLenis';
import { CustomCursor } from './components/CustomCursor';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import About from './components/About';
import TransitionZone from './components/TransitionZone';
import Work from './components/Work';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import ReturnTransition from './components/ReturnTransition';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  
  useLenis();

  return (
    <>
      <CustomCursor />
      
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <main className="app-container">
          {/* Black Zone */}
          <div className="zone-black">
            <Hero />
            <About />
          </div>

          {/* Transition Zone (Black -> White) */}
          <TransitionZone />

          {/* White Zone */}
          <div className="zone-white">
            <Work />
            <Skills />
            <Education />
          </div>

          {/* Return Transition (White -> Black) */}
          <ReturnTransition />

          {/* Final Black Zone */}
          <div className="zone-black">
            <Contact />
          </div>
        </main>
      )}
    </>
  );
}

export default App;
