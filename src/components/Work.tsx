import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import workVid from '../assets/work.mp4';
import logoAsset from '../assets/logo.png';
import motionAsset from '../assets/motion.mp4';

gsap.registerPlugin(ScrollTrigger);

interface CaseItemProps {
  kicker: string;
  subtitle: string;
  giantTitle: React.ReactNode;
  overline: string;
  description: string;
  role?: string;
  scope?: string;
  result?: string;
  linkText?: string;
  linkUrl?: string;
  teaser?: string;
  isVideo?: boolean;
  videoSrc?: string;
  isImage?: boolean;
  imageSrc?: string;
  isMobileRatio?: boolean;
  isSquareRatio?: boolean;
  placeholderText?: string;
}

const WorkItem: React.FC<CaseItemProps> = ({
  kicker,
  subtitle,
  giantTitle,
  overline,
  description,
  linkText,
  linkUrl,
  teaser,
  isVideo,
  videoSrc,
  isImage,
  imageSrc,
  isMobileRatio,
  isSquareRatio,
  placeholderText,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(visualRef.current,
        { scale: 1.08, clipPath: 'inset(8% 8% 8% 8%)' },
        {
          scale: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'center center',
            scrub: true,
          }
        }
      );
      gsap.fromTo(titleRef.current,
        { y: 160, opacity: 0.2 },
        {
          y: -140,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          }
        }
      );
      gsap.fromTo(infoRef.current,
        { y: 90, opacity: 0, rotate: 2 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          ease: 'power3.out',
          duration: 1.4,
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="work-section award-case-study">
      {/* Intro Header */}
      <div className="section-intro work-section-intro">
        <p className="section-kicker">{kicker}</p>
        <h2 className="charismatic-title charismatic-dark">HAR ONLINE STORE</h2>
        <p className="work-intro-line">{subtitle}</p>
      </div>

      <div className="work-center-container">
        {/* Visual Container */}
        <div ref={visualRef} className={`work-massive-visual ${isMobileRatio ? 'work-mobile-ratio' : ''} ${isSquareRatio ? 'work-square-ratio' : ''}`}>
          {isVideo && videoSrc ? (
            <video autoPlay loop muted playsInline className="work-video">
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : isImage && imageSrc ? (
            <img src={imageSrc} className="work-video work-image-fit" alt="Visual asset" />
          ) : (
            <div className="work-video work-placeholder-bg">
              <span className="work-placeholder-label">{placeholderText}</span>
            </div>
          )}
          <div className="work-video-overlay" />
          <span className="case-floating-label">LIVE / HAR</span>
        </div>

        {/* Floating Info Card */}
        <div ref={infoRef} className="work-floating-info">
          <h4 className="info-overline">{overline}</h4>
          <p className="case-description text-body">{description}</p>
          {linkText && linkUrl && (
            <div className="case-links">
              <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="case-link hover-target">
                {linkText} <span>{'->'}</span>
              </a>
            </div>
          )}
          <p className="work-more-teaser">{teaser}</p>
        </div>

        {/* Giant Background Title */}
        <h3 ref={titleRef} className="work-giant-title">
          {giantTitle}
        </h3>
      </div>
    </section>
  );
};

const Work: React.FC = () => {
  const cases: CaseItemProps[] = [
    {
      kicker: "MY BEST WORK / 01",
      subtitle: "01 — Brand Identity",
      giantTitle: <>HAR<br />BRAND<br />LOGO</>,
      overline: "Logo / visual identity",
      description: "A business needs an identity before it needs attention. Har needed an identity that could live beyond the physical shop. I designed HAR's logo as the visual foundation for its move into the digital space — something simple enough to recognize and strong enough to grow with the business.",
      role: "Brand Designer",
      scope: "Logo & Visual Identity",
      result: "Completed & Ready",
      isImage: true,
      imageSrc: logoAsset,
      isSquareRatio: true,
    },
    {
      kicker: "MY BEST WORK / 02",
      subtitle: "02 — Digital Experience",
      giantTitle: <>HAR<br />ONLINE<br />STORE</>,
      overline: "Website / ecommerce system",
      description: "The store was already good. The problem was that not everyone could reach it. A customer had to physically find the store to discover the products, ask questions, and place an order. But what about someone living outside Kathmandu? That was the gap I saw. The business didn't simply need a website. They needed a way to sell beyond the physical store. So I designed and built an e-commerce system around that opportunity: Product discovery, presentation, ordering, checkout, and admin tools.",
      role: "Creative engineer",
      scope: "Strategy, Design, Development",
      result: "Live and active",
      isVideo: true,
      videoSrc: workVid,
      isMobileRatio: false,
      linkText: "Live → HAR Online Store",
      linkUrl: "https://haronline.pages.dev",
      teaser: "The goal wasn't to build a website. The goal was to remove a limitation."
    },
    {
      kicker: "MY BEST WORK / 03",
      subtitle: "03 — Launch",
      giantTitle: <>LAUNCH<br />MOTION<br />DESIGN</>,
      overline: "Motion design / announcement",
      description: "A digital launch deserves its own moment. I designed and animated this piece to introduce HAR Online Store's new digital presence (website) and create a consistent visual connection between the brand and its launch.",
      role: "Motion Designer",
      scope: "Animation, Launch Assets",
      result: "Ready for launch",
      isVideo: true,
      videoSrc: motionAsset,
      isMobileRatio: true,
    }
  ];

  return (
    <>
      {cases.map((caseItem, idx) => (
        <WorkItem key={idx} {...caseItem} />
      ))}
    </>
  );
};

export default Work;
