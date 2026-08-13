import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MarqueeTrack = ({ items, reverse = false }: { items: string[]; reverse?: boolean }) => {
  const allItems = [...items, ...items, ...items, ...items];
  return (
    <div className="marquee-viewport">
      <div className={`marquee-inner ${reverse ? 'marquee-reverse' : ''}`}>
        {allItems.map((item, i) => (
          <span key={i} className="marquee-pill">
            {item}
            <span className="marquee-dot">*</span>
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

  return (
    <section className="skills-section-v2 services-section" ref={sectionRef}>
      <div className="services-opening services-opening-centered" ref={headingRef}>
        <h2 className="services-title services-title-mega">SERVICES <span className="services-title-slash">/</span> THE OUTCOME</h2>
      </div>
      <div className="service-outcome-list">
        <article className="service-statement">
          <span className="service-index">01</span>
          <div>
            <h3>Reach more customers</h3>
            <p>I turn physical stores and products into digital experiences people can discover, trust, and buy from anywhere. It's basically called E-commerce system.</p>
          </div>
          <span className="service-arrow">{'->'}</span>
        </article>

        <article className="service-statement">
          <span className="service-index">02</span>
          <div>
            <h3>Be remembered</h3>
            <p>Turn great work into a personal website that the right people understand and remember. It's basically called creative portfolio.</p>
          </div>
          <span className="service-arrow">{'->'}</span>
        </article>

        <article className="service-statement">
          <span className="service-index">03</span>
          <div>
            <h3>Give your brand a proper home</h3>
            <p>Websites that turn you and your brand story, direction, and identity into something people can understand. It's basically called Brand website.</p>
          </div>
          <span className="service-arrow">{'->'}</span>
        </article>

        <article className="service-statement">
          <span className="service-index">04</span>
          <div>
            <h3>Become something new</h3>
            <p>Re-branding that brings the business into the next chapter.
              This is probably the cleanest with your existing client-focused idea. It's basically called Re-brand</p>
          </div>
          <span className="service-arrow">{'->'}</span>
        </article>
      </div>

      <div className="service-tagline-bridge">
        <p className="service-tagline-main">I make everything in that way<br /><em>that changes the way people see you and your business.</em></p>
        <p className="service-tagline-sub">You do not pay for technology. You pay for the future growth of you and your business.</p>
      </div>

      <div className="skills-rows">
        {rows.map((row, i) => (
          <div className="skills-row-block" key={row.label} ref={el => { rowsRef.current[i] = el; }}>
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
