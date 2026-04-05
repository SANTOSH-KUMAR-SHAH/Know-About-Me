import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticHover } from './MagneticHover';
import './Work.css';
import workVid from '../assets/work.mp4';

gsap.registerPlugin(ScrollTrigger);

const Work: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Subtitle slides in from left
      gsap.fromTo(subtitleRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: subtitleRef.current, start: "top 85%" }
        }
      );

      // Case study info slides in from left with depth
      gsap.fromTo(infoRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 1.4, ease: "power3.out",
          scrollTrigger: { trigger: infoRef.current, start: "top 80%" }
        }
      );

      // Case study visual slides in from right (opposing direction = depth)
      gsap.fromTo(visualRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 1.4, ease: "power3.out",
          scrollTrigger: { trigger: visualRef.current, start: "top 80%" }
        }
      );

      // Image parallax — moves slower than scroll for depth illusion
      gsap.fromTo(imageRef.current,
        { y: -50 },
        {
          y: 50,
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
    <section ref={sectionRef} className="work-section container">
      <div className="work-header">
        <p ref={subtitleRef} className="work-subtitle text-body">
          I've built a dozen projects 10X better. But this one started everything.
        </p>
      </div>

      <div className="case-study">
        <div ref={infoRef} className="case-study-info">
          <h3 className="text-title">School Portal Rebuild</h3>
          <ul className="stats-list">
            <li><strong>Scale:</strong> Thousands of students</li>
            <li><strong>Timeline:</strong> 3 months</li>
            <li><strong>Team:</strong> 1 developer</li>
          </ul>
          <p className="case-description text-body">
            The previous system was broken. Loading screens that never ended. Links that went nowhere. I stripped it down to the studs and rebuilt it with modern architecture. Now it's the fastest portal in the country.
          </p>
          <div className="case-links">
            <MagneticHover>
              <a href="https://santosh-kumar-shah.github.io/Viswa-Niketan/" target="_blank" rel="noopener noreferrer" className="case-link hover-target">View Live Portal</a>
            </MagneticHover>
            <MagneticHover>
              <a href="https://github.com/SANTOSH-KUMAR-SHAH/Viswa-Niketan.git" target="_blank" rel="noopener noreferrer" className="case-link hover-target">Source Code</a>
            </MagneticHover>
          </div>
        </div>
        <div ref={visualRef} className="case-study-visual">
          <div ref={imageRef} className="case-video-wrapper">
            <video autoPlay loop muted playsInline className="case-video">
              <source src={workVid} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
