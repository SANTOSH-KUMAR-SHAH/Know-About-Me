import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTENT } from '../utils/constants';
import './Education.css';

gsap.registerPlugin(ScrollTrigger);

const Education: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      textRefs.current.forEach((textRef, index) => {
        if (!textRef) return;

        // Alternating entrance — even paragraphs from left, odd from right
        const fromX = index % 2 === 0 ? -60 : 60;

        gsap.fromTo(textRef,
          { opacity: 0, y: 40, x: fromX },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef,
              start: "top 85%",
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="education-section container">
      <h2 className="charismatic-title charismatic-dark" style={{ width: '100%', marginBottom: 'var(--space-xxl)' }}>THE JOURNEY</h2>
      <div className="education-content">
        {CONTENT.education.story.map((line, index) => {
          let className = "edu-story-text";
          
          if (line === "I'm the master of all trades.") {
            className += " edu-highlight text-huge";
          } else if (line.includes("I've already built them")) {
            className += " edu-power";
          } else if (index === CONTENT.education.story.length - 1) {
            className += " edu-closing";
          }

          return (
            <p 
              key={index} 
              ref={el => { textRefs.current[index] = el; }}
              className={className}
            >
              {line}
            </p>
          );
        })}
      </div>
    </section>
  );
};

export default Education;
