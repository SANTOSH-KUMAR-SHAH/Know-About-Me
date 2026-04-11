import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CONTENT } from '../utils/constants';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    if (nameRef.current) {
      const chars = nameRef.current.querySelectorAll('.char');
      
      tl.fromTo(chars, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.05, 
          duration: 1, 
          ease: "expo.out" 
        }
      )
      .to(chars, {
        opacity: 0,
        y: -50,
        stagger: 0.02,
        duration: 0.5,
        ease: "expo.in",
        delay: 0.5
      })
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut"
      });
    }

    return () => {
      tl.kill();
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
    </div>
  );
};

export default Preloader;
