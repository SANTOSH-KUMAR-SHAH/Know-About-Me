import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import workVid from '../assets/work.mp4';

gsap.registerPlugin(ScrollTrigger);

const Work: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(visualRef.current,
        { scale: 1.08, clipPath: 'inset(8% 8% 8% 8%)' },
        { scale: 1, clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', end: 'center center', scrub: true } }
      );
      gsap.fromTo(titleRef.current,
        { y: 160, opacity: 0.2 },
        { y: -140, opacity: 1, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 } }
      );
      gsap.fromTo(infoRef.current,
        { y: 90, opacity: 0, rotate: 2 },
        { y: 0, opacity: 1, rotate: 0, ease: 'power3.out', duration: 1.4, scrollTrigger: { trigger: infoRef.current, start: 'top 85%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="work-section award-case-study">
      <div className="section-intro work-section-intro">
        <p className="section-kicker">CASE STUDY 01 / REAL BUSINESS / NEPAL</p>
        <h2 className="charismatic-title charismatic-dark">HAR ONLINE STORE</h2>
        <p className="work-intro-line">A real business problem, turned into a working digital store.</p>
      </div>
      <div className="work-center-container">
        <div ref={visualRef} className="work-massive-visual">
          <video autoPlay loop muted playsInline className="work-video">
            <source src={workVid} type="video/mp4" />
          </video>
          <div className="work-video-overlay" />
          <span className="case-floating-label">LIVE / HAR</span>
        </div>
        <div ref={infoRef} className="work-floating-info">
          <h4 className="info-overline">THE BRIEF</h4>
          <p className="case-description text-body">HAR Online Store needed a digital experience that made clothing easier to discover, trust, and order across Nepal. I designed and built the storefront, shopping flow, checkout, payment paths, and the private tools behind the store.</p>
          <ul className="stats-list">
            <li><span>Role</span> Creative engineer</li>
            <li><span>Scope</span> Strategy, design, development</li>
            <li><span>Result</span> Live and ready for customers</li>
          </ul>
          <div className="case-links">
            <a href="https://haronline.pages.dev" target="_blank" rel="noopener noreferrer" className="case-link hover-target">Visit live store <span>{'->'}</span></a>
          </div>
          <p className="work-more-teaser">Built for a real owner, real customers, and real orders.</p>
        </div>
        <h3 ref={titleRef} className="work-giant-title">HAR<br />ONLINE<br />STORE</h3>
      </div>
    </section>
  );
};

export default Work;
