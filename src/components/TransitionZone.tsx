import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTENT } from '../utils/constants';
import { useSoundEffects } from '../hooks/useSoundEffects';

gsap.registerPlugin(ScrollTrigger);

const TransitionZone: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const devanagariRef = useRef<HTMLDivElement>(null);
  const explanationRef = useRef<HTMLDivElement>(null);
  const inkRef = useRef<HTMLDivElement>(null);

  const { playDeepWhoosh } = useSoundEffects();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
          onEnter: () => playDeepWhoosh(1.5), // Play whoosh when transition begins
          onEnterBack: () => playDeepWhoosh(1.5), // Play whoosh when scrolling back up
        }
      });

      // Phase 1: Ink blob expands (black → white transition)
      tl.to(inkRef.current, {
        scale: 150,
        ease: "power2.inOut",
        duration: 1
      }, 0);

      // Phase 2: Devanagari text fades in
      tl.fromTo(devanagariRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.15 },
        0.2
      );

      // Phase 3: Devanagari holds, then dissolves out
      tl.to(devanagariRef.current,
        { opacity: 0, scale: 1.1, duration: 0.15 },
        0.45
      );

      // Phase 4: Explanation text fades in after Devanagari is gone
      tl.fromTo(explanationRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.15 },
        0.55
      );

      // Phase 5: Explanation holds, then fades out as user scrolls into Work
      tl.to(explanationRef.current,
        { opacity: 0, y: -30, duration: 0.15 },
        0.85
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="transition-zone">
      <div ref={inkRef} className="ink-blob"></div>
      
      {/* The Devanagari philosophy word */}
      <div ref={devanagariRef} className="transition-text">
        <span className="font-devanagari">{CONTENT.hero.philosophyDevanagari}</span>
        <span className="transition-translation">{CONTENT.hero.philosophyTranslation}</span>
      </div>

      {/* The explanation that appears after the Devanagari dissolves */}
      <div ref={explanationRef} className="transition-explanation">
        <p className="explanation-text">
          Most people fight the current. They push. They force. They burn out.
        </p>
        <p className="explanation-text">
          I learned something different. When you stop resisting and start listening — to the problem, to the code, to the silence between the lines — the answer finds you.
        </p>
        <p className="explanation-closing">
          That's not a philosophy. That's a weapon.
        </p>
      </div>
    </div>
  );
};

export default TransitionZone;
