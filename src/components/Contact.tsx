import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTENT } from '../utils/constants';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Everything fades in when the section is reached
      const elements = [titleRef.current, emailRef.current, socialsRef.current];
      gsap.fromTo(elements,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: "top 80%" 
          }
        }
      );

      // Footer fades in last
      gsap.fromTo(footerRef.current,
        { opacity: 0 },
        {
          opacity: 0.5,
          duration: 1.5, 
          ease: "power2.inOut",
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: "top 90%" 
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="contact-section container">
      <div className="contact-content">
        <h2 ref={titleRef} className="contact-title text-title">
          The flow brought you here.<br/>
          Let's build something that matters.
        </h2>
        
        <a ref={emailRef} href={`mailto:${CONTENT.email}`} className="email-link text-subtitle hover-target" style={{ fontSize: 'clamp(1rem, 4vw, 2.5rem)', textTransform: 'lowercase' }}>
          {CONTENT.email}
        </a>

        <div ref={socialsRef} className="social-links">
          {CONTENT.socials.map((social, index) => (
            <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="social-link text-subtitle hover-target">
              {social.name}
            </a>
          ))}
        </div>
      </div>
      <div ref={footerRef} className="contact-footer" style={{ justifyContent: 'center' }}>
        <span className="footer-year">© {new Date().getFullYear()}</span>
      </div>
    </section>
  );
};

export default Contact;
