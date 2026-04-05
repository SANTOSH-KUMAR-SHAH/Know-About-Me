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

      // Title rises with scale — feels like it's coming toward you
      gsap.fromTo(titleRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%" }
        }
      );

      // Email link pops in after title
      gsap.fromTo(emailRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: emailRef.current, start: "top 90%" }
        }
      );

      // Social links fan in from below
      if (socialsRef.current) {
        const links = socialsRef.current.querySelectorAll('.social-link');
        gsap.fromTo(links,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.8, stagger: 0.1, ease: "power2.out",
            scrollTrigger: { trigger: socialsRef.current, start: "top 90%" }
          }
        );
      }

      // Footer fades in last
      gsap.fromTo(footerRef.current,
        { opacity: 0 },
        {
          opacity: 0.5,
          duration: 1.5, ease: "power2.inOut",
          scrollTrigger: { trigger: footerRef.current, start: "top 95%" }
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
        
        <a ref={emailRef} href={`mailto:${CONTENT.email}`} className="email-link text-hero hover-target">
          Say Hello
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
