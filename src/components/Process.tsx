import React, { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Understanding you, your business and your goal',
    highlight: 'Your business comes first.',
    body: ' I learn how it works, who your customers are, and what you are trying to achieve.'
  },
  {
    number: '02',
    title: 'Finding the gap',
    highlight: 'I study the problem.',
    body: ' Do research on customers, competitors, market, existing experience — everything that can reveal the real issue.'
  },
  {
    number: '03',
    title: 'Deciding the best solution',
    highlight: 'We decide what should be built',
    body: ' and what should be changed.'
  },
  {
    number: '04',
    title: 'Build, design and Shape the solution',
    highlight: 'I design and develop the experience around that direction',
    body: ' — not around a template that everyone uses.'
  },
  {
    number: '05',
    title: 'Improving until it solves the problem',
    highlight: 'We test, refine, remove what doesn\'t work,',
    body: ' and keep improving until the solution feels right and works properly.'
  }
];

const TextReveal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const split = new SplitType(element, { types: 'words' });
    const words = split.words ?? [];
    gsap.set(words, { opacity: 0, y: 30 });
    const animation = gsap.to(words, {
      opacity: 1,
      y: 0,
      stagger: 0.03,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
      },
    });
    return () => {
      animation.scrollTrigger?.kill();
      split.revert();
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
};

const Process: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.process-stack-card');

      cards.forEach((card, i) => {
        // Animate each stacked card on scroll
        gsap.fromTo(card,
          { opacity: 0.7, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 30%',
              scrub: true,
            }
          }
        );
      });

      // Bottom accent line reveal
      gsap.fromTo('.process-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'expo.inOut',
          scrollTrigger: {
            trigger: '.process-line',
            start: 'top 92%',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="process-section process-stack-section" ref={sectionRef}>
      {/* Header */}
      <div className="process-heading">
        <p className="section-kicker">THE METHOD / A CLEARER WAY FORWARD</p>
        <TextReveal>
          <h2>
            I DON'T START WITH THE<br />
            <em>WEBSITE / BRANDING / REBRANDING</em>
          </h2>
        </TextReveal>
        <p className="process-lede">
          Bring the ambition, the questions, and the problem you want to solve.
          I will help turn them into a direction you can believe in.
        </p>
      </div>

      {/* Sticky Deck Cards Container */}
      <div className="process-stack-container">
        {steps.map((step, idx) => (
          <article
            className="process-stack-card"
            key={step.number}
            style={{
              top: `calc(12vh + ${idx * 22}px)`,
              zIndex: idx + 1,
            }}
          >
            {/* Background Watermark */}
            <div className="process-card-watermark">{step.number}</div>

            {/* Top Bar */}
            <div className="process-card-header">
              <div className="process-step-pill">
                <span className="process-pill-dot" />
                <span className="process-pill-text">PHASE 0{idx + 1} / 05</span>
              </div>
              <span className="process-step-count">{step.number}</span>
            </div>

            {/* Title & Content */}
            <div className="process-card-body">
              <h3 className="process-card-title">{step.title}</h3>
              <p className="process-card-copy">
                <strong className="process-copy-highlight">{step.highlight}</strong>
                {step.body}
              </p>
            </div>

            {/* Bottom accent indicator */}
            <div className="process-card-footer">
              <div className="process-footer-line" />
            </div>
          </article>
        ))}
      </div>

      <div className="process-line" />
    </section>
  );
};

export default Process;
