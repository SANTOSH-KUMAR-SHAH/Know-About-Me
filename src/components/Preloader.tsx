import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CONTENT } from '../utils/constants';

// Importing heavy assets to preload them into browser cache
import webVid from '../assets/web.mp4';
import workVid from '../assets/work.mp4';
import portraitUrl from '../assets/portrait.jpg';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let minTimeElapsed = false;
    let mediaLoaded = false;
    let exitStarted = false;

    // Master function to trigger the exit animation ONLY when both conditions are met
    const triggerExit = () => {
      if (minTimeElapsed && mediaLoaded && !exitStarted && nameRef.current && containerRef.current) {
        exitStarted = true;
        const chars = nameRef.current.querySelectorAll('.char');
        const tlExit = gsap.timeline({ onComplete });
        
        tlExit.to(chars, {
          opacity: 0,
          y: -50,
          stagger: 0.02,
          duration: 0.5,
          ease: "expo.in"
        })
        .to(containerRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut"
        });
      }
    };

    // Condition 1: Run the intro animation and enforce a minimum display time
    const chars = nameRef.current?.querySelectorAll('.char');
    if (chars) {
      gsap.fromTo(chars, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.05, 
          duration: 1, 
          ease: "expo.out",
          onComplete: () => {
            // Natural read-time delay before allowing exit
            setTimeout(() => {
              minTimeElapsed = true;
              triggerExit();
            }, 600);
          }
        }
      );
    }

    // Condition 2: Actually wait for the massive videos to download (canplaythrough)
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
        vid.preload = 'auto'; // Force download into browser memory
        vid.oncanplaythrough = checkMedia;
        vid.onerror = checkMedia; // Don't hang forever if a network error occurs
        vid.load();
      } else {
        const img = new Image();
        img.onload = checkMedia;
        img.onerror = checkMedia;
        img.src = src;
      }
    });

    return () => {
      if (chars) gsap.killTweensOf(chars);
    };
  }, [onComplete]);

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
