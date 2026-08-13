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
    title: 'Start Building',
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

// 3D Word Scatter Fly-in Effect on Heading
const TextReveal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const split = new SplitType(element, { types: 'words' });
    const words = split.words ?? [];
    gsap.set(words, { opacity: 0 });
    const animation = gsap.fromTo(words,
      {
        willChange: 'opacity, transform',
        z: () => gsap.utils.random(500, 950),
        opacity: 0,
        xPercent: () => gsap.utils.random(-100, 100),
        yPercent: () => gsap.utils.random(-10, 10),
        rotationX: () => gsap.utils.random(-90, 90),
      },
      {
        ease: 'expo',
        opacity: 1,
        rotationX: 0,
        rotationY: 0,
        xPercent: 0,
        yPercent: 0,
        z: 0,
        stagger: { each: 0.018, from: 'random' },
        scrollTrigger: {
          trigger: element,
          start: 'top 88%',
          end: '+=550',
          scrub: true,
          invalidateOnRefresh: true,
        },
      }
    );
    return () => {
      animation.scrollTrigger?.kill();
      split.revert();
    };
  }, []);

  return <div ref={containerRef} style={{ perspective: '1000px' }}>{children}</div>;
};

const Process: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.process-stack-card');

      cards.forEach((card) => {
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

      {/* Clean Minimalist Sticky Deck Container */}
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
            {/* Background Watermark Number */}
            <div className="process-card-watermark">{step.number}</div>

            {/* Top Minimal Number Badge */}
            <div className="process-card-header">
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

            {/* Bottom Accent Indicator */}
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
