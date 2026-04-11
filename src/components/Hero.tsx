import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { splitText } from '../utils/splitText';
import vidPath from '../assets/web.mp4';

const Hero: React.FC = () => {
  const welcomeRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Welcome text — character-by-character reveal from above
    if (welcomeRef.current) {
      const chars = welcomeRef.current.querySelectorAll('.char');
      gsap.set(chars, { y: '100%', opacity: 0 });
      tl.to(chars, {
        y: '0%',
        opacity: 1,
        duration: 0.8,
        stagger: 0.02,
        ease: 'power3.out'
      });
    }

    // Name lines — each line's characters cascade in with stagger
    if (nameRef.current) {
      const lines = nameRef.current.querySelectorAll('.hero-line');
      lines.forEach((line, lineIndex) => {
        const chars = line.querySelectorAll('.char');
        gsap.set(chars, { y: '110%' });
        tl.to(chars, {
          y: '0%',
          duration: 0.9,
          stagger: 0.03,
          ease: 'expo.out'
        }, lineIndex === 0 ? "-=0.3" : "-=0.6");
      });
    }

    return () => { tl.kill(); };
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-video-wrapper">
        <video className="hero-video" autoPlay loop muted playsInline>
          <source src={vidPath} type="video/mp4" />
        </video>
        <div className="hero-video-overlay"></div>
      </div>

      {/* Welcome text — character split for kinetic reveal */}
      <div ref={welcomeRef} className="hero-welcome">
        <p className="welcome-text">
          {splitText("Welcome to the world of ")}
          <span className="welcome-highlight">{splitText("obsession")}</span>
        </p>
      </div>



      {/* Name — each line character-split for cascading reveal */}
      <div className="hero-name-block">
        <h1 ref={nameRef} className="hero-title">
          <span className="hero-line hero-line-hii">{splitText("Hi")}</span>
          <span className="hero-line hero-line-iam">{splitText("I am")}</span>
          <span className="hero-line hero-line-name">{splitText("Santosh")}</span>
        </h1>
      </div>
    </section>
  );
};

export default Hero;
