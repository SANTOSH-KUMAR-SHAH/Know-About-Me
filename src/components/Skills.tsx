import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MarqueeTrack = ({ items, reverse = false }: { items: string[]; reverse?: boolean }) => {
  const allItems = [...items, ...items, ...items, ...items];
  return <div className="marquee-viewport"><div className={`marquee-inner ${reverse ? 'marquee-reverse' : ''}`}>{allItems.map((item, i) => <span key={i} className="marquee-pill">{item}<span className="marquee-dot">*</span></span>)}</div></div>;
};

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: headingRef.current, start: 'top 85%' } });
      rowsRef.current.forEach((el, i) => { if (el) gsap.fromTo(el, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 1, delay: i * 0.12, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } }); });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const rows = [
    { label: 'MAKE IT CLEAR', items: ['Product discovery', 'Customer journeys', 'Business problems', 'Brand direction'], reverse: false },
    { label: 'MAKE IT FELT', items: ['Visual identity', 'Storytelling', 'Motion', 'Memorable interfaces'], reverse: true },
    { label: 'MAKE IT WORK', items: ['Ecommerce', 'Responsive systems', 'Performance', 'Reliable launch'], reverse: false },
  ];

  return <section className="skills-section-v2 services-section" ref={sectionRef}>
    <div className="services-opening services-opening-centered" ref={headingRef}>
      <h2 className="services-title services-title-mega">SERVICES <span className="services-title-slash">/</span> THE OUTCOME</h2>
    </div>
    <div className="service-outcome-list">
      <article className="service-statement"><span className="service-index">01</span><div><h3>Ecommerce Websites</h3><p>When people find your store physically, you also have to be digitally, that's where the problem comes: they should know what to trust, what to choose, and how to buy. I build the digital ecosystem that turns attention into confident orders.</p></div><span className="service-arrow">{'->'}</span></article>
      <article className="service-statement"><span className="service-index">02</span><div><h3>Creative Portfolios</h3><p>Your work should not sit inside a template that looks like everyone else. I build a digital world around your work so the right people understand its value and remember your name.</p></div><span className="service-arrow">{'->'}</span></article>
      <article className="service-statement"><span className="service-index">03</span><div><h3>Branding Websites</h3><p>A strong brand deserves a place that feels like it. I turn your direction, story, and ambition into a website that makes the business feel ready for its next chapter.</p></div><span className="service-arrow">{'->'}</span></article>
      <article className="service-statement"><span className="service-index">04</span><div><h3>Rebranding</h3><p>Sometimes the business has grown, but the identity behind the brand feel very boring. I rebrand the whole ecosystem. That's where your business growth get sky rocket.</p></div><span className="service-arrow">{'->'}</span></article>
    </div>
    <div className="service-tagline-bridge">
      <p className="service-tagline-main">I make everything in that way<br /><em>that changes the way people see you and your business.</em></p>
      <p className="service-tagline-sub">You do not pay for technology. You pay for the future growth of you and your business.</p>
    </div>
    <div className="skills-rows">{rows.map((row, i) => <div className="skills-row-block" key={row.label} ref={el => { rowsRef.current[i] = el; }}><div className="skills-row-label-wrap"><span className="skills-row-label">{row.label}</span><span className="skills-row-count">0{i + 1}</span></div><MarqueeTrack items={row.items} reverse={row.reverse} /></div>)}</div>
  </section>;
};

export default Skills;
