import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Testimonial: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => gsap.fromTo('.testimonial-card', { y: 70, opacity: 0, rotate: 2 }, { y: 0, opacity: 1, rotate: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } }), ref);
    return () => ctx.revert();
  }, []);
  return (
    <section className="testimonial-section" ref={ref}>
      <div className="testimonial-card">
        <span className="testimonial-mark">"</span>
        <p className="testimonial-quote">
          We originally wanted a simple website. I've worked with agencies before.
          Most of them asked how we wanted the website to look.
          But Santosh first understood our business, found the gap, and built around it.
          He didn't just make a logo, website and leave.
          Today, we're happy with where HAR is going.
        </p>
        <div className="testimonial-meta">
          <span>Owner, HAR Online Store</span>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
