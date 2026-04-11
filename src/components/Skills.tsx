import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTENT } from '../utils/constants';

gsap.registerPlugin(ScrollTrigger);

// Bulletproof CSS-based marquee — no GSAP needed for the scroll
const MarqueeTrack = ({ items, reverse = false }: { items: string[], reverse?: boolean }) => {
  const allItems = [...items, ...items, ...items, ...items];
  return (
    <div className={`marquee-viewport`}>
      <div className={`marquee-inner ${reverse ? 'marquee-reverse' : ''}`}>
        {allItems.map((item, i) => (
          <span key={i} className="marquee-pill">
            {item}
            <span className="marquee-dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' }
        }
      );
      rowsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1, delay: i * 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const rows = [
    { label: 'BUILD', items: ['React', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Vite', 'HTML5', 'CSS3', 'JavaScript', 'Modern Web'], reverse: false },
    { label: 'SHIP', items: ['Git', 'Figma', 'VS Code', 'Responsive Design', 'Performance', 'Debugging', 'Clean Code', 'Mobile First'], reverse: true },
    { label: 'LEARN', items: ['Three.js', 'Framer Motion', 'WebGL', 'UI Systems', 'Product Thinking', 'Next.js', 'Animation'], reverse: false },
  ];

  return (
    <section className="skills-section-v2" ref={sectionRef}>
      <div className="skills-header-row" ref={headingRef}>
        <h2 className="charismatic-title charismatic-dark">THE TOOLS</h2>
        <p className="skills-subtitle">the stack. the craft. the obsession.</p>
      </div>

      <div className="skills-rows">
        {rows.map((row, i) => (
          <div className="skills-row-block" key={i} ref={el => rowsRef.current[i] = el}>
            <div className="skills-row-label-wrap">
              <span className="skills-row-label">{row.label}</span>
              <span className="skills-row-count">0{i + 1}</span>
            </div>
            <MarqueeTrack items={row.items} reverse={row.reverse} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
