import React, { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  ['01', 'Understanding you, your business and your goal', 'Your business comes first. I learn how it works, who your customers are, and what you are trying to achieve.'],
  ['02', 'Finding the gap', 'I study the problem. Do research on customers, competitors, market, existing experience — everything that can reveal the real issue.'],
  ['03', 'Deciding the best solution', 'We decide what should be built and what should be changed.'],
  ['04', 'Start Building', 'I design and develop the experience around that direction — not around a template that everyone uses.'],
  ['05', 'Improving until it solves the problem', 'We test, refine, remove what doesn\'t work, and keep improving until the solution feels right and works properly.'],
];

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
        ease: 'expo', opacity: 1, rotationX: 0, rotationY: 0,
        xPercent: 0, yPercent: 0, z: 0,
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

  return <div ref={containerRef}>{children}</div>;
};

const Process: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.process-step', { y: 70, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.13, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 72%' } });
      gsap.fromTo('.process-line', { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: 'expo.inOut', scrollTrigger: { trigger: ref.current, start: 'top 72%' } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="process-section" ref={ref}>
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
      <div className="process-list">
        {steps.map(([number, title, copy]) => (
          <article className="process-step" key={number}>
            <div className="process-number">{number}</div>
            <div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="process-line" />
    </section>
  );
};

export default Process;
