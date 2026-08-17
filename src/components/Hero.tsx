import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { splitText } from '../utils/splitText';
import vidPath from '../assets/web.mp4';
import webPoster from '../assets/web-poster.jpg';

interface HeroProps {
  startAnimation?: boolean;
}

const Hero: React.FC<HeroProps> = ({ startAnimation = false }) => {
  const welcomeRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline({ paused: true });
    tlRef.current = tl;

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
      }, 0);
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
        }, lineIndex === 0 ? 0.2 : (0.2 + lineIndex * 0.15));
      });
    }

    return () => { tl.kill(); };
  }, []);

  // Trigger entrance animation when preloader starts exiting
  useEffect(() => {
    if (startAnimation && tlRef.current) {
      tlRef.current.play();
    }
  }, [startAnimation]);

  return (
    <section className="hero-section">
      <div className="hero-video-wrapper">
        <video ref={videoRef} className="hero-video" autoPlay loop muted playsInline preload="auto" poster={webPoster}>
          <source src={vidPath} type="video/mp4" />
        </video>
        <div className="hero-video-overlay"></div>
      </div>

      {/* Welcome text — character-by-character reveal from above */}
      <div ref={welcomeRef} className="hero-welcome">
        <p className="welcome-text">
          <span style={{ color: 'white' }}>{splitText("I build digital experiences around real ")}</span>
          <span style={{ color: 'var(--color-accent)' }}>{splitText("business problems.")}</span>
        </p>
      </div>

      {/* Visually Hidden SEO Header for Google Ranking */}
      <h1 className="sr-only">
        Santosh Kumar Shah - Independent Web Developer and Digital Designer in Kathmandu, Nepal
      </h1>

      {/* Name — each line character-split for cascading reveal */}
      <div className="hero-name-block">
        <div ref={nameRef} className="hero-title">
          <span className="hero-line hero-line-hii">{splitText("Hi")}</span>
          <span className="hero-line hero-line-iam">{splitText("I am")}</span>
          <span className="hero-line hero-line-name">{splitText("Santosh")}</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
