import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Education: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const master = ref.current?.querySelector('.edu-master-section');
    if (!master) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(master, { clipPath: 'inset(0 100% 0 0)' }, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 2,
        ease: 'expo.inOut',
        scrollTrigger: { trigger: master, start: 'top 70%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="standard-section" ref={ref}>
      <div className="standard-copy">
        <p className="section-kicker">AND THE LAST THINGS</p>
        <p className="standard-lede">Quality comes before the words used to describe it.</p>
        <p className="standard-principle">
          The world does not care where you learned.<br />
          <em>It cares what you can do.</em>
        </p>
      </div>
      <div className="edu-master-section">
        <div className="edu-master-content">
          <span className="edu-master-pre">Design, branding, business and human behavior around it.</span>
          <h3 className="edu-master-huge">WEBSITE<br />DEVELOPMENT<br />AT THE CORE</h3>
        </div>
      </div>
    </section>
  );
};

export default Education;
