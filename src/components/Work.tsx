import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticHover } from './MagneticHover';
import './Work.css';
import workVid from '../assets/work.mp4';

gsap.registerPlugin(ScrollTrigger);

const Work: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Cinematic clip-path reveal of the video (expands from a constrained polygon)
      gsap.fromTo(visualRef.current,
        { scale: 1.05, clipPath: "polygon(5% 5%, 95% 5%, 95% 95%, 5% 95%)" },
        {
          scale: 1, 
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "center center",
            scrub: 1
          }
        }
      );

      // Giant structural title floats upwards aggressively
      gsap.fromTo(titleRef.current,
        { y: 150 },
        {
          y: -150,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        }
      );

      // Glassmorphism card floats up gently
      gsap.fromTo(infoRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0, opacity: 1,
          ease: "power3.out",
          duration: 1.5,
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 85%"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="work-section" style={{ flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ width: '90vw', maxWidth: '1600px', marginBottom: 'var(--space-md)' }}>
        <h2 className="charismatic-title charismatic-dark">THE WORK</h2>
      </div>
      <div className="work-center-container">
        
        {/* Massive Video Background */}
        <div ref={visualRef} className="work-massive-visual">
          <video autoPlay loop muted playsInline className="work-video">
            <source src={workVid} type="video/mp4" />
          </video>
          <div className="work-video-overlay"></div>
        </div>

        {/* Floating Glassmorphism Info Card */}
        <div ref={infoRef} className="work-floating-info">
          <h4 className="info-overline" style={{fontFamily: 'var(--font-editorial)', fontStyle: 'italic'}}>CASE STUDY 01</h4>
          <p className="case-description text-body">
            The previous system was broken. Loading screens that never ended. I stripped it down to the studs and rebuilt it with modern architecture. Now it's the fastest portal in the country.
          </p>
          <ul className="stats-list">
            <li><span>Scale</span> Thousands of students</li>
            <li><span>Timeline</span> 3 months</li>
          </ul>
          <div className="case-links">
            <MagneticHover>
              <a href="https://santosh-kumar-shah.github.io/Viswa-Niketan/" target="_blank" rel="noopener noreferrer" className="case-link hover-target">Live Portal</a>
            </MagneticHover>
            <MagneticHover>
              <a href="https://github.com/SANTOSH-KUMAR-SHAH/Viswa-Niketan.git" target="_blank" rel="noopener noreferrer" className="case-link hover-target">Source</a>
            </MagneticHover>
          </div>
        </div>

        {/* Giant Project Title Overlapping Everything */}
        <h3 ref={titleRef} className="work-giant-title">
          SCHOOL<br/>PORTAL
        </h3>

      </div>
    </section>
  );
};

export default Work;
