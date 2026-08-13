import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import portraitUrl from '../assets/portrait.jpg';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray('.about-line');
      lines.forEach((line: any) => {
        gsap.fromTo(line,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: line, start: 'top 82%' }
          }
        );
      });

      // Exit dissolve: fade out photo frame and story column as section scrolls out
      gsap.to('.about-photo-frame, .about-story-scroll', {
        opacity: 0,
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'bottom bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="about-section" ref={sectionRef}>

      {/* LEFT — Pinned Photo */}
      <div className="about-photo-col">
        <div className="about-photo-frame">
          <img src={portraitUrl} alt="Santosh Kumar Shah, independent web developer and digital designer in Kathmandu, Nepal" className="about-photo" />
          <div className="about-photo-gradient" />
        </div>
      </div>

      {/* RIGHT — The Story */}
      <div className="about-story-scroll">

        <span className="about-tag about-line">WHO IS THIS GUY?</span>

        {/* THE HOOK — speaking directly to business owner */}
        <p className="about-lead about-line">
          You know your business<br />
          better than I do.
        </p>

        <p className="about-whisper about-line">
          You've spent years building it.
        </p>

        {/* ACKNOWLEDGE WHAT THEY KNOW */}
        <p className="about-para about-line">
          You know your customers. You know your products. You know what works.
        </p>

        {/* THE BUT — pattern interrupt */}
        <p className="about-accent about-line">BUT</p>

        <p className="about-para about-line">
          A great product can still be difficult to understand.{' '}
          A strong business can still look ordinary online.{' '}
          A growing company can still have an identity that{' '}
          <em>no longer fits where it is going.</em>
        </p>

        <div className="about-divider about-line" />

        {/* THE APPROACH */}
        <p className="about-para about-line">
          That's why I don't begin with a website, a logo, or a visual style.
        </p>

        <p className="about-big about-line">
          I begin with you,<br />
          your goal and<br />
          your business.
        </p>

        <p className="about-para about-line">
          I look at the business, the people, the brand, the customer, the workflow
          before deciding what to build.
        </p>

        <p className="about-para about-line">
          Sometimes the answer is an ecommerce store.{' '}
          Sometimes it's a personal portfolio, a brand website, or a complete rebrand.
        </p>

        <p className="about-para about-line">
          <em>Different problems need different solutions.</em>
        </p>

        <div className="about-divider about-line" />

        {/* THE PRINCIPLE */}
        <p className="about-para-quiet about-line">
          The technology may change. The goal won't.
        </p>

        <p className="about-para about-line">
          Whatever the problem is, I combine{' '}
          <strong>development, design, branding, psychology, and business thinking</strong>{' '}
          to solve it.
        </p>

        {/* THE IDENTITY STATEMENT */}
        <p className="about-closing about-line">
          I'm <strong>Santosh Kumar Shah</strong> — a Liberal Engineer working across
          some impactful fields to turn real business problems into digital experiences
          that people <em>understand, trust, and remember.</em>
        </p>

        <p className="about-identity about-line">
          Not just something that looks good.<br />
          <em>Something that works.</em>
        </p>

      </div>
    </section>
  );
};

export default About;
