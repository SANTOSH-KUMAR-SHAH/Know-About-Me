import React, { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Education: React.FC = () => {
  const whiteRef = useRef<HTMLDivElement>(null);
  const blackContainerRef = useRef<HTMLDivElement>(null);
  const blackPanelRef = useRef<HTMLDivElement>(null);
  const msgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // White section: staggered text reveal
      const lines = whiteRef.current?.querySelectorAll('.edu-animate-in');
      if (lines && lines.length) {
        gsap.fromTo(lines,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.18,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: whiteRef.current,
              start: 'top 72%',
            }
          }
        );
      }

      // ── Black panel scroll timeline ──────────────────────────────────────
      // Phase 0  (0 → 0.18): curtain drops, revealing the panel
      // Phase 1  (0.18 → 0.55): each sentence is a typographic event
      // Phase 2  (0.55 → 0.78): message exits, heading enters
      // Phase 3  (0.78 → 1.0): hold the heading for reading
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: blackContainerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          invalidateOnRefresh: true,
        }
      });

      // ── PHASE 0: curtain wipe ───────────────────────────────────────────
      tl.fromTo(blackPanelRef.current,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', duration: 0.18 }
      );

      // ── PHASE 1: sentence-by-sentence typographic reveal ───────────────
      // Line 1 — quiet hook: character-level cascade from below
      const line1El = msgRef.current?.querySelector('.bm-line1') as HTMLElement | null;
      if (line1El) {
        const split1 = new SplitType(line1El, { types: 'chars' });
        const chars1 = split1.chars ?? [];
        gsap.set(chars1, { y: '110%', opacity: 0 });
        tl.to(chars1, {
          y: '0%', opacity: 1,
          stagger: { each: 0.012, from: 'start' },
          duration: 0.22,
          ease: 'expo.out',
        }, '>0.04');
      }

      // Line 2 — builds tension: slide in from left as words
      const line2El = msgRef.current?.querySelector('.bm-line2') as HTMLElement | null;
      if (line2El) {
        const split2 = new SplitType(line2El, { types: 'words' });
        const words2 = split2.words ?? [];
        gsap.set(words2, { x: -40, opacity: 0 });
        tl.to(words2, {
          x: 0, opacity: 1,
          stagger: { each: 0.04, from: 'start' },
          duration: 0.2,
          ease: 'power3.out',
        }, '>0.06');
      }

      // Line 3 — the pivot: scale up from nothing, gold
      const line3El = msgRef.current?.querySelector('.bm-line3') as HTMLElement | null;
      if (line3El) {
        gsap.set(line3El, { scale: 0.6, opacity: 0, transformOrigin: 'center center' });
        tl.to(line3El, {
          scale: 1, opacity: 1,
          duration: 0.3,
          ease: 'expo.out',
        }, '>0.08');
      }

      // Line 4 — consequence: clip-path reveal left→right
      const line4El = msgRef.current?.querySelector('.bm-line4') as HTMLElement | null;
      if (line4El) {
        gsap.set(line4El, { clipPath: 'inset(0 100% 0 0)', opacity: 1 });
        tl.to(line4El, {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.28,
          ease: 'expo.inOut',
        }, '>0.05');
      }

      // Line 5 — punchline: drop in from above, full editorial scale
      const line5El = msgRef.current?.querySelector('.bm-line5') as HTMLElement | null;
      if (line5El) {
        gsap.set(line5El, { y: -60, opacity: 0 });
        tl.to(line5El, {
          y: 0, opacity: 1,
          duration: 0.35,
          ease: 'expo.out',
        }, '>0.1');
      }

      // brief hold on full message
      tl.to({}, { duration: 0.12 });

      // ── PHASE 2: message exits, heading enters ──────────────────────────
      // Exit: lines scatter upward at staggered speed
      const allLines = msgRef.current?.querySelectorAll('.bm-line');
      if (allLines) {
        tl.to(Array.from(allLines).reverse(), {
          y: -50,
          opacity: 0,
          stagger: 0.04,
          duration: 0.22,
          ease: 'power2.in',
        }, '>0.05');
      }
      tl.set(msgRef.current, { visibility: 'hidden' });

      // Heading enters
      tl.fromTo('.edu-master-pre',
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.2, ease: 'power3.out' }
      );
      tl.fromTo('.edu-master-huge',
        { clipPath: 'inset(0 100% 0 0)', x: -40 },
        { clipPath: 'inset(0 0% 0 0)', x: 0, duration: 0.65, ease: 'expo.inOut' }
      );

      // ── PHASE 3: hold heading ───────────────────────────────────────────
      tl.to({}, { duration: 0.5 });

    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* PART 1 — White section scrolls normally */}
      <div className="standard-section" ref={whiteRef}>
        <div className="standard-copy">
          <p className="section-kicker edu-animate-in">AND THE LAST THINGS</p>
          <p className="standard-lede edu-animate-in">Quality comes before the words used to describe it.</p>
          <p className="standard-principle edu-animate-in">
            The world does not care where you learned.<br />
            <em>It cares what you can do.</em>
          </p>
        </div>
      </div>

      {/* PART 2 — Tall container: sticky black panel */}
      <div ref={blackContainerRef} className="edu-black-container">
        <div ref={blackPanelRef} className="edu-black-panel">
          <div className="edu-master-content">

            {/* ── Business message: each line is its own typographic moment ── */}
            <div
              ref={msgRef}
              className="edu-business-message"
              aria-label="Why a strong digital presence matters"
            >
              {/* Line 1 — quiet, disarming hook */}
              <p className="bm-line bm-line1">
                You might not need more customers today.
              </p>

              {/* Line 2 — generational shift */}
              <p className="bm-line bm-line2">
                But the new generation doesn't ask neighbors.
              </p>

              {/* Line 3 — the pivot / gold / editorial italic / big */}
              <p className="bm-line bm-line3">
                They search on Google.
              </p>

              {/* Line 4 — consequence */}
              <p className="bm-line bm-line4">
                If they don't find you, they will never know how good you are.
              </p>

              {/* Line 5 — the punchline: biggest, most dramatic */}
              <p className="bm-line bm-line5">
                You lose a better customer<br />without even knowing.
              </p>
            </div>

            <span className="edu-master-pre">Design, branding, business and human behavior around it.</span>
            <h3 className="edu-master-huge">WEBSITE<br />DEVELOPMENT<br />AT THE CORE</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Education;
