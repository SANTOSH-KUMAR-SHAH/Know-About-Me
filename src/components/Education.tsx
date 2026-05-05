import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Education: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Each block reveals on scroll
      const blocks = gsap.utils.toArray('.edu-reveal');
      blocks.forEach((block: any) => {
        gsap.fromTo(block,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: block, start: 'top 80%' }
          }
        );
      });

      // 3. "Obsession" word scales in dramatically
      const obsession = document.querySelector('.edu-obsession');
      if (obsession) {
        gsap.fromTo(obsession,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 1.5, ease: 'expo.out',
            scrollTrigger: { trigger: obsession, start: 'top 80%' }
          }
        );
      }

      // 4. Master banner horizontal wipe reveal
      const master = document.querySelector('.edu-master-section');
      if (master) {
        gsap.fromTo(master,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)', duration: 2, ease: 'expo.inOut',
            scrollTrigger: { trigger: master, start: 'top 70%' }
          }
        );
      }

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="edu-section" ref={sectionRef}>

      {/* OPENING — Full viewport hero */}
      <div className="edu-hero-block">
        <span className="edu-hero-tag edu-reveal">THE FOUNDATION</span>
        <h2 className="edu-hero-title edu-reveal">
          I didn't<br />drop out.
        </h2>
        <p className="edu-hero-sub edu-reveal">I outgrew the system.</p>
      </div>

      {/* NARRATIVE FLOW — centered column */}
      <div className="edu-narrative">

        <div className="edu-stamp edu-reveal">
          <span className="edu-stamp-label">FORMAL EDUCATION</span>
          <span className="edu-stamp-value">CLASS 12</span>
        </div>

        <p className="edu-text edu-reveal">
          That's the last line on my formal education. If you're judging already,
          I get it. Most people stop reading here.
        </p>

        <p className="edu-text-accent edu-reveal">
          You're still here. Most already gave up. You're rare.
        </p>

        <div className="edu-line-break edu-reveal" />

        <p className="edu-text edu-reveal">
          While my classmates sat in rows absorbing   theory they'd forget by next semester,
          I was doing something different. I was <em>building.</em>
        </p>

        <p className="edu-text edu-reveal">
          Not  because someone assigned me to. Not because a syllabus told me to.
          Because the moment I opened a code editor, something clicked that no classroom
          ever triggered.
        </p>

        {/* FULL-WIDTH DRAMATIC WORD */}
        <div className="edu-obsession">
          <span>Obsession.</span>
        </div>

        <p className="edu-text edu-reveal">
          The kind where you forget to eat because you're chasing a bug at 3am. The kind
          where everyone around you is studying for an exam, and you're redesigning how
          an entire system should work.
        </p>

        <div className="edu-line-break edu-reveal" />

        <p className="edu-text edu-reveal">
          People ask me: "Don't you regret not going the traditional route?"
        </p>

        <p className="edu-text edu-reveal">
          I don't regret it. I just chose a different classroom.
          One where the exams are deadlines, the textbook is documentation,
          and the degree is the thing you ship.
        </p>

        <p className="edu-text-accent edu-reveal">
          The world doesn't care where you learned.<br />
          It cares what you can do.
        </p>

      </div>

      {/* MASTER BANNER — Full-width cinematic takeover */}
      <div className="edu-master-section">
        <div className="edu-master-content">
          <span className="edu-master-pre">not the jack — but I am the</span>
          <h3 className="edu-master-huge">MASTER<br />OF SOME<br />TRADES.</h3>
        </div>
      </div>

      {/* CLOSING — centered */}
      <div className="edu-closing-block">
        <p className="edu-closing-soft edu-reveal">School taught me one thing:</p>
        <p className="edu-closing-bold edu-reveal">
          The real education starts<br />
          when you close the textbook.
        </p>
      </div>

    </section>
  );
};

export default Education;
