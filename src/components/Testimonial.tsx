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
  return <section className="testimonial-section" ref={ref}><div className="testimonial-card"><span className="testimonial-mark">“</span><p className="testimonial-quote">The website gave HAR Online Store a much more professional way to present our products and receive orders. The process was thoughtful, and the final result feels like our business has finally found its digital home.</p><div className="testimonial-meta"><span>HAR Online Store</span><span>Client / Ecommerce project</span></div></div></section>;
};

export default Testimonial;
