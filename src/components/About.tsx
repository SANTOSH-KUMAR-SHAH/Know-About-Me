import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import portraitUrl from '../assets/portrait.jpg';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Each paragraph fades in one at a time as user scrolls
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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="about-section" ref={sectionRef}>

      {/* LEFT — Pinned Photo */}
      <div className="about-photo-col">
        <div className="about-photo-frame">
          <img src={portraitUrl} alt="Santosh" className="about-photo" />
          <div className="about-photo-gradient" />
        </div>
      </div>

      {/* RIGHT — The Story */}
      <div className="about-story-scroll">

        <span className="about-tag about-line">WHO IS THIS GUY?</span>

        {/* THE HOOK — psychological curiosity gap */}
        <p className="about-lead about-line">
          Everyone told me to<br />
          pick one thing.
        </p>

        <p className="about-whisper about-line">
          I picked everything.
        </p>

        {/* BUILDING THE WORLD */}
        <p className="about-para about-line">
          While my classmates were memorizing formulas for tomorrow's exam,
          I was reading poetry. Not because I had to. Because the rhythm of words
          taught me something textbooks never could — <em>how to feel a problem
          before solving it.</em>
        </p>

        <p className="about-para about-line">
          Then I moved to literature. Then to studying hardware — how circuits think,
          how signals travel, how a machine decides what to do next.
        </p>

        <p className="about-para about-line">
          Then I started studying people. Their psychology. Their patterns.
          Why they click where they click. Why they trust what they trust.
        </p>

        <div className="about-divider about-line" />

        {/* THE PHILOSOPHY — the system thinker reveal */}
        <p className="about-para about-line">
          And somewhere along the way, I realized something most people
          never do:
        </p>

        <p className="about-big about-line">
          The owner of a hospital<br />
          isn't the best doctor.
        </p>

        <p className="about-para about-line">
          He's the person who understands how <em>the system</em> works.
          The hiring. The workflow. The patient experience. The infrastructure
          that holds everything together while no one's watching.
        </p>

        <p className="about-para about-line">
          That's what I study. Not just code.<br />
          <em>Systems.</em>
        </p>

        <div className="about-divider about-line" />

        {/* THE PROOF — the college story */}
        <p className="about-para about-line">
          I was seventeen years old when I looked at my college's
          digital infrastructure and thought:
        </p>

        <p className="about-accent about-line">
          "I can build this better."
        </p>

        <p className="about-para about-line">
          So I did. From scratch. Every page, every system, every pixel —
          designed, developed, and shipped by a kid who wasn't even
          old enough to vote.
        </p>

        <p className="about-para about-line">
          The college already had a website. They refused to replace it with mine.
        </p>

        <p className="about-para about-line">
          That's fine.
        </p>

        <p className="about-para about-line">
          I preserved it. Not out of spite. Out of patience. Because
          I know quality doesn't need permission — <em>it just needs time.</em>
        </p>

        {/* THE TEASE — bridge to Work section */}
        <p className="about-para-quiet about-line">
          Just keep scrolling. You'll see it.
        </p>

        <div className="about-divider about-line" />

        {/* THE PHILOSOPHY */}
        <div className="about-philosophy about-line">
          <span className="about-sanskrit">अनुगच्छतु प्रवाहं</span>
          <span className="about-translate">— follow the flow</span>
        </div>

        {/* THE CLOSE — identity statement */}
        <p className="about-closing about-line">
          I make complex things simple.
        </p>

        <p className="about-identity about-line">
          That's not a skill.<br />
          That's who I am.
        </p>

      </div>
    </section>
  );
};

export default About;
