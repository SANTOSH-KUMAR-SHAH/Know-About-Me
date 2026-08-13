import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CONTENT } from '../utils/constants';

// Importing heavy assets to preload them into browser cache
import webVid from '../assets/web.mp4';
import workVid from '../assets/work.mp4';
import portraitUrl from '../assets/portrait.jpg';

interface PreloaderProps {
  onStartExit?: () => void;
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onStartExit, onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  const [progress, setProgress] = useState(0);

  // Store callbacks in refs to avoid re-triggering useEffect on parent re-renders
  const onStartExitRef = useRef(onStartExit);
  const onCompleteRef = useRef(onComplete);
  onStartExitRef.current = onStartExit;
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let minTimeElapsed = false;
    let mediaLoaded = false;
    let exitStarted = false;

    // Master function to trigger the exit animation ONLY when conditions are met
    const triggerExit = () => {
      if (minTimeElapsed && mediaLoaded && !exitStarted && nameRef.current && containerRef.current) {
        exitStarted = true;
        const chars = nameRef.current.querySelectorAll('.char');
        const tlExit = gsap.timeline({
          onComplete: () => {
            if (onCompleteRef.current) onCompleteRef.current();
          }
        });

        // 1. Preloader name characters fade up & out
        tlExit.to(chars, {
          opacity: 0,
          y: -40,
          stagger: 0.015,
          duration: 0.4,
          ease: "power2.in"
        })
        // 2. Preloader curtain lifts up smoothly, revealing the hero section underneath
        .to(containerRef.current, {
          yPercent: -100,
          duration: 1.1,
          ease: "expo.inOut",
          onStart: () => {
            if (onStartExitRef.current) onStartExitRef.current();
          }
        }, "-=0.1");
      }
    };

    // Condition 1: Enforce minimum display time for text reveal
    const chars = nameRef.current?.querySelectorAll('.char');
    if (chars) {
      gsap.fromTo(chars, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.04, 
          duration: 0.9, 
          ease: "expo.out",
          onComplete: () => {
            setTimeout(() => {
              minTimeElapsed = true;
              triggerExit();
            }, 400);
          }
        }
      );
    }

    // Condition 2: Preload media assets
    const mediaSources = [webVid, workVid, portraitUrl];
    let loadedCount = 0;

    const checkMedia = () => {
      loadedCount++;
      setProgress(Math.round((loadedCount / mediaSources.length) * 100));
      if (loadedCount === mediaSources.length) {
        mediaLoaded = true;
        triggerExit();
      }
    };

    mediaSources.forEach(src => {
      if (src.endsWith('.mp4')) {
        const vid = document.createElement('video');
        vid.src = src;
        vid.preload = 'auto';
        vid.oncanplaythrough = checkMedia;
        vid.onerror = checkMedia;
        vid.load();
      } else {
        const img = new Image();
        img.onload = checkMedia;
        img.onerror = checkMedia;
        img.src = src;
      }
    });

    // Safety fallback: Force exit after max 3 seconds so preloader never hangs
    const safetyTimer = setTimeout(() => {
      minTimeElapsed = true;
      mediaLoaded = true;
      triggerExit();
    }, 3000);

    return () => {
      clearTimeout(safetyTimer);
      if (chars) gsap.killTweensOf(chars);
    };
  }, []); // Run once on mount to prevent any animation interruption glitch

  const nameChars = CONTENT.hero.name.split('');

  return (
    <div ref={containerRef} className="preloader-container">
      <h1 ref={nameRef} className="preloader-name text-hero">
        {nameChars.map((char, index) => (
          <span key={index} className="char" style={{ display: 'inline-block' }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
      <div className="preloader-progress" style={{
        position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)',
        fontSize: '0.8rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)'
      }}>
        {progress < 100 ? `LOADING ASSETS [${progress}%]` : 'INITIALIZING EXPERIENCE'}
      </div>
    </div>
  );
};

export default Preloader;
