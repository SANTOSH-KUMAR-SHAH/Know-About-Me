import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FearlessContact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const headline = headlineRef.current;
      if (!track || !headline) return;

      // Calculate how far we need to translate the track to reach the end
      const getScrollAmount = () => {
        let trackWidth = track.scrollWidth;
        return -(trackWidth - window.innerWidth);
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          // Increase the scroll distance to allow time for the headline to fade first
          end: () => `+=${track.scrollWidth + window.innerHeight}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      // 1. Headline vanishes beautifully
      tl.to(headline, {
        opacity: 0,
        y: -40,
        filter: 'blur(10px)', // Adds a dreamy dissolve effect
        duration: 1,
        ease: "power2.inOut"
      });

      // 2. ONLY THEN, the horizontal track sweeps in
      tl.to(track, {
        x: getScrollAmount,
        duration: 4, // Give the cards more time in the scrub
        ease: "none"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fearless-container">
      <div className="fearless-sticky">

        <div ref={headlineRef} className="fearless-headline-wrap">
          <h2 className="fearless-headline">
            You won't talk to an agency.<br />
            You will talk to me.
          </h2>
        </div>

        <div ref={trackRef} className="fearless-track">
          {/* Spacer so the first card doesn't overlap the headline immediately */}
          <div className="fearless-card-spacer"></div>

          <div className="fearless-card">
            <div className="fearless-number">01</div>
            <div className="fearless-content">
              <h3>You will message me.</h3>
              <p>Click WhatsApp and write whatever feels easy.</p>
            </div>
          </div>

          <div className="fearless-card">
            <div className="fearless-number">02</div>
            <div className="fearless-content">
              <h3>Explain what isn't working.</h3>
              <p>Describe the situation in your own words. No technical language needed.</p>
            </div>
          </div>

          <div className="fearless-card">
            <div className="fearless-number">03</div>
            <div className="fearless-content">
              <h3>Let's understand it.</h3>
              <p>I'll ask questions and investigate what's really happening. Then I'll connect the dots and look for the real issue.</p>
            </div>
          </div>

          <div className="fearless-card">
            <div className="fearless-number">04</div>
            <div className="fearless-content">
              <h3>About you.</h3>
              <p>We will discuss your ambition, your timeline, and your investment budget.</p>
            </div>
          </div>

          <div className="fearless-card">
            <div className="fearless-number">05</div>
            <div className="fearless-content">
              <h3>The Solution.</h3>
              <p>I'll explain what would solve it. If there's something worth building, we'll figure it out together.</p>
            </div>
          </div>

          <div className="fearless-card">
            <div className="fearless-number">06</div>
            <div className="fearless-content">
              <h3>You decide.</h3>
              <p>No pressure. We agree on the direction, finalize the details, and move forward — online or over coffee.</p>
            </div>
          </div>

          <div className="fearless-card-spacer"></div>
        </div>

      </div>
    </div>
  );
};

export default FearlessContact;
