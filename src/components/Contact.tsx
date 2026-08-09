import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTENT } from '../utils/constants';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });
      gsap.fromTo(emailRef.current, { y: 80, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: emailRef.current, start: 'top 85%' } });
      gsap.fromTo(socialsRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.3, scrollTrigger: { trigger: socialsRef.current, start: 'top 90%' } });
      gsap.fromTo(footerRef.current, { opacity: 0 }, { opacity: 0.4, duration: 2, scrollTrigger: { trigger: footerRef.current, start: 'top 95%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const email = `${CONTENT.emailUser}@${CONTENT.emailDomain}`;
  return <section className="contact-section-v2" ref={sectionRef}>
    <div className="contact-grain" />
    <div className="contact-top"><p className="contact-eyebrow">THE NEXT THING</p><h2 className="contact-tagline" ref={titleRef}>Tell me what<br />you are building.</h2><p className="contact-response">I usually reply within 30 minutes.</p></div>
    <div className="contact-email-wrap" ref={emailRef}><a className="contact-email-giant" href={`mailto:${email}`}>{email}</a><span className="contact-email-arrow">{'->'}</span></div>
    <div className="contact-socials" ref={socialsRef}>{CONTENT.socials.map((social, i) => <a key={i} className="contact-social-item" href={social.url} target="_blank" rel="noopener noreferrer"><span className="contact-social-num">0{i + 1}</span><span className="contact-social-name">{social.name}</span><span className="contact-social-arrow">{'->'}</span></a>)}</div>
    <div className="contact-footer-v2" ref={footerRef}><span className="footer-philosophy-v2">{CONTENT.hero.philosophyDevanagari}</span><span className="footer-tagline-v2">{CONTENT.hero.philosophyTranslation}</span><span className="footer-year-v2">Copyright {new Date().getFullYear()} SANTOSH KUMAR SHAH</span></div>
    <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">{'^'} Back to top</button>
  </section>;
};

export default Contact;
