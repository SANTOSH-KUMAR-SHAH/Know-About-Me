import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTENT } from '../utils/constants';
import { splitWords } from '../utils/splitText';
import './About.css';
import portraitImg from '../assets/portrait.jpg';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Portrait image — slow parallax reveal
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { y: 80, scale: 1.1 },
          {
            y: -80,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      }

      // Each paragraph — word-by-word staggered reveal on scroll
      textRefs.current.forEach((textRef) => {
        if (!textRef) return;

        const words = textRef.querySelectorAll('.word');
        if (words.length > 0) {
          gsap.set(words, { y: '100%', opacity: 0 });
          gsap.to(words, {
            y: '0%',
            opacity: 1,
            duration: 0.6,
            stagger: 0.04,
            ease: "power2.out",
            scrollTrigger: {
              trigger: textRef,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-section container" style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
      <h2 className="charismatic-title" style={{ width: '100%' }}>THE STORY</h2>
      <div className="about-grid">
        <div className="about-image-column">
          <div className="portrait-wrapper">
            <div ref={imageRef} className="portrait-inner">
              <img src={portraitImg} alt="Santosh" className="portrait-image" />
            </div>
            <div className="portrait-overlay"></div>
          </div>
        </div>
        <div className="about-content">
          {CONTENT.about.story.map((line, index) => {
            const isAgeLine = line === "I was 17.";
            const isPhilosophyLine = line.includes("अनुगच्छतु प्रवाहं");
            const isLastLine = index === CONTENT.about.story.length - 1;

            let className = "story-text";
            if (isAgeLine) className += " text-age hero-impact";
            if (isPhilosophyLine) className += " text-philosophy";
            if (isLastLine) className += " text-bold";

            // Philosophy line uses dangerouslySetInnerHTML for the highlight span
            if (isPhilosophyLine) {
              return (
                <p
                  key={index}
                  ref={(el) => { textRefs.current[index] = el; }}
                  className={className}
                  dangerouslySetInnerHTML={{
                    __html: line.replace('अनुगच्छतु प्रवाहं', '<span class="font-devanagari highlight">अनुगच्छतु प्रवाहं</span>')
                  }}
                />
              );
            }

            return (
              <p
                key={index}
                ref={(el) => { textRefs.current[index] = el; }}
                className={className}
              >
                {splitWords(line)}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
