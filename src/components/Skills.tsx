import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTENT } from '../utils/constants';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Each column rises from below with increasing delay — creates a wave
      columnsRef.current.forEach((col, index) => {
        if (!col) return;
        
        gsap.fromTo(col,
          { y: 80 + (index * 30), opacity: 0 }, // Each column starts progressively lower
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: index * 0.15, // Staggered wave timing
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            }
          }
        );
      });

      // Parallax — entire section drifts slightly slower than scroll
      gsap.fromTo(sectionRef.current,
        { y: 0 },
        {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="skills-section container">
      <div className="skills-grid">
        
        <div className="skill-column" ref={el => { columnsRef.current[0] = el; }}>
          <h2 className="skill-heading">What I build with</h2>
          <ul className="skill-list">
            {CONTENT.skills.core.map((skill, index) => (
              <li key={index} className="text-subtitle">{skill}</li>
            ))}
          </ul>
        </div>

        <div className="skill-column" ref={el => { columnsRef.current[1] = el; }}>
          <h2 className="skill-heading">How I build</h2>
          <ul className="skill-list">
            {CONTENT.skills.tools.map((skill, index) => (
              <li key={index} className="text-subtitle">{skill}</li>
            ))}
          </ul>
        </div>

        <div className="skill-column" ref={el => { columnsRef.current[2] = el; }}>
          <h2 className="skill-heading">What's next</h2>
          <ul className="skill-list skill-list-learning">
            {CONTENT.skills.learning.map((skill, index) => (
              <li key={index} className="text-subtitle">{skill}</li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};

export default Skills;
