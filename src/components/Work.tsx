import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import workVid from '../assets/work.mp4';

gsap.registerPlugin(ScrollTrigger);

const Work: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(visualRef.current,
        { scale: 1.08, clipPath: 'inset(8% 8% 8% 8%)' },
        { scale: 1, clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', end: 'center center', scrub: true } }
      );
      gsap.fromTo(titleRef.current,
        { y: 160, opacity: 0.2 },
        { y: -140, opacity: 1, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 } }
      );
      // Animate case entries
      gsap.fromTo('.work-case-entry', { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.18, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: '.work-cases-list', start: 'top 80%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="work-section award-case-study">

      {/* Section Header */}
      <div className="section-intro work-section-intro">
        <p className="section-kicker">MY BEST WORK</p>
        <h2 className="charismatic-title charismatic-dark">HAR ONLINE STORE</h2>
        <p className="work-intro-line">A real business problem, turned into a working digital experience.</p>
      </div>

      {/* Main Video Visual */}
      <div className="work-center-container">
        <div ref={visualRef} className="work-massive-visual">
          <video autoPlay loop muted playsInline className="work-video">
            <source src={workVid} type="video/mp4" />
          </video>
          <div className="work-video-overlay" />
          <span className="case-floating-label">LIVE / HAR</span>
        </div>
        <h3 ref={titleRef} className="work-giant-title">HAR<br />ONLINE<br />STORE</h3>
      </div>

      {/* 3-part Case Study */}
      <div className="work-cases-list">

        {/* 01 — Brand Identity */}
        <article className="work-case-entry">
          <div className="work-case-header">
            <span className="work-case-num">01</span>
            <div className="work-case-title-block">
              <h3 className="work-case-title">Brand Identity</h3>
              <span className="work-case-sub">Logo / visual identity</span>
            </div>
          </div>
          <div className="work-case-body">
            <div className="work-case-text">
              <p className="work-case-lede">
                A business needs an identity before it needs attention.
              </p>
              <p className="work-case-copy">
                Har needed an identity that could live beyond the physical shop.
                I designed HAR's logo as the visual foundation for its move into
                the digital space — something simple enough to recognize and
                strong enough to grow with the business.
              </p>
            </div>
            {/* Logo placeholder */}
            <div className="work-case-asset work-logo-placeholder">
              <span className="work-logo-placeholder-text">Logo coming soon</span>
            </div>
          </div>
        </article>

        {/* 02 — Digital Experience */}
        <article className="work-case-entry">
          <div className="work-case-header">
            <span className="work-case-num">02</span>
            <div className="work-case-title-block">
              <h3 className="work-case-title">Digital Experience</h3>
              <span className="work-case-sub">Website / ecommerce system</span>
            </div>
          </div>
          <div className="work-case-body">
            <div className="work-case-text">
              <p className="work-case-lede">
                The store was already good. The problem was that not everyone could reach it.
              </p>
              <p className="work-case-copy">
                A customer had to physically find the store to discover the products,
                ask questions, and place an order.
                But what about someone living outside Kathmandu?
              </p>
              <p className="work-case-copy">
                <em>That was the gap I saw.</em>
              </p>
              <p className="work-case-copy">
                The business didn't simply need a website.
                They needed a way to sell beyond the physical store.
              </p>
              <p className="work-case-copy">
                I designed and built an e-commerce system around that opportunity:
              </p>
              <ul className="work-case-list">
                <li>Product discovery</li>
                <li>Product presentation</li>
                <li>Shopping experience</li>
                <li>Ordering &amp; Checkout</li>
                <li>Business-side tools</li>
                <li>Admin side tools</li>
              </ul>
              <p className="work-case-result">
                <strong>The result —</strong> The business now has a digital place
                where customers beyond the physical store can discover and order its products.
              </p>
              <div className="work-case-links">
                <a href="https://haronline.pages.dev" target="_blank" rel="noopener noreferrer" className="case-link hover-target">
                  Live → HAR Online Store <span>{'→'}</span>
                </a>
              </div>
              <p className="work-case-principle">
                <em>The goal wasn't to build a website. The goal was to remove a limitation.</em>
              </p>
            </div>
            {/* Website visual placeholder */}
            <div className="work-case-asset work-logo-placeholder">
              <span className="work-logo-placeholder-text">Visual coming soon</span>
            </div>
          </div>
        </article>

        {/* 03 — Launch / Motion Design */}
        <article className="work-case-entry">
          <div className="work-case-header">
            <span className="work-case-num">03</span>
            <div className="work-case-title-block">
              <h3 className="work-case-title">Launch / Motion Design</h3>
              <span className="work-case-sub">Announcement</span>
            </div>
          </div>
          <div className="work-case-body">
            <div className="work-case-text">
              <p className="work-case-lede">
                A digital launch deserves its own moment.
              </p>
              <p className="work-case-copy">
                I designed and animated this piece to introduce HAR Online Store's
                new digital presence (website) and create a consistent visual
                connection between the brand and its launch.
              </p>
            </div>
            {/* Motion visual placeholder */}
            <div className="work-case-asset work-logo-placeholder">
              <span className="work-logo-placeholder-text">Motion coming soon</span>
            </div>
          </div>
        </article>

      </div>
    </section>
  );
};

export default Work;
