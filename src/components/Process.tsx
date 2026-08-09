import React, { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  ['01', 'Listen beneath the brief', 'We start with your business, your audience, and the problem that keeps getting in the way.'],
  ['02', 'Find the real question', 'Before screens, we define what the experience needs to change and what success should feel like.'],
  ['03', 'Shape the direction', 'We turn the insight into a clear creative and digital direction with a point of view.'],
  ['04', 'Build the experience', 'I design and engineer the interface carefully, with the details that make it feel effortless.'],
  ['05', 'Refine until it is true', 'We test, remove friction, and bring the work to a place where it can meet the world confidently.'],
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
  return <section className="process-section" ref={ref}>
    <div className="process-heading"><p className="section-kicker">THE METHOD / A CLEARER WAY FORWARD</p><TextReveal><h2>You do not need to have it all figured out.<br /><em>That is where we begin.</em></h2></TextReveal><p className="process-lede">Bring the ambition, the questions, and the problem you want to solve. I will help turn them into a direction you can believe in.</p></div>
    <div className="process-list">{steps.map(([number, title, copy]) => <article className="process-step" key={number}><div className="process-number">{number}</div><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
    <div className="process-line" />
  </section>;
};

export default Process;
