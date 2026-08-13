import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Education: React.FC = () => {
  const whiteRef = useRef<HTMLDivElement>(null);
  const blackContainerRef = useRef<HTMLDivElement>(null);
  const blackPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // White section: staggered text reveal
      const lines = whiteRef.current?.querySelectorAll('.edu-animate-in');
      if (lines && lines.length) {
        gsap.fromTo(lines,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.18,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: whiteRef.current,
              start: 'top 72%',
            }
          }
        );
      }

      // Black panel: two-phase timeline
      // Phase 1 (40% of scroll): curtain drops from top — TEXT FULLY APPEARS
      // Phase 2 (60% of scroll): panel stays pinned so user can read it fully
      // After container ends: natural scroll takes over, white section appears below
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: blackContainerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          invalidateOnRefresh: true,
        }
      });

      tl.fromTo(blackPanelRef.current,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', duration: 0.4 }
      )
      // Hold fully visible — user reads the text
      .to({}, { duration: 0.6 });

    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* PART 1 — White section scrolls normally */}
      <div className="standard-section" ref={whiteRef}>
        <div className="standard-copy">
          <p className="section-kicker edu-animate-in">AND THE LAST THINGS</p>
          <p className="standard-lede edu-animate-in">Quality comes before the words used to describe it.</p>
          <p className="standard-principle edu-animate-in">
            The world does not care where you learned.<br />
            <em>It cares what you can do.</em>
          </p>
        </div>
      </div>

      {/* PART 2 — Tall container: sticky black panel */}
      {/* Phase 1 (first 40% of scroll): black curtain drops revealing full text */}
      {/* Phase 2 (remaining 60%): text stays fully visible while pinned */}
      {/* After container: white section scrolls in naturally below */}
      <div ref={blackContainerRef} className="edu-black-container">
        <div ref={blackPanelRef} className="edu-black-panel">
          <div className="edu-master-content">
            <span className="edu-master-pre">Design, branding, business and human behavior around it.</span>
            <h3 className="edu-master-huge">WEBSITE<br />DEVELOPMENT<br />AT THE CORE</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Education;
