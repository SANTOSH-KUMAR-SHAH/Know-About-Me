import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import SplitType from 'split-type';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTENT } from '../utils/constants';

gsap.registerPlugin(ScrollTrigger);

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uProgress;
  uniform vec2 uResolution;
  uniform vec3 uColor;
  uniform float uSpread;
  varying vec2 vUv;

  float Hash(vec2 p) {
    vec3 p2 = vec3(p.xy, 1.0);
    return fract(sin(dot(p2, vec3(37.1, 61.7, 12.4))) * 3758.5453123);
  }

  float noise(in vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f *= f * (3.0 - 2.0 * f);
    return mix(
      mix(Hash(i + vec2(0.0, 0.0)), Hash(i + vec2(1.0, 0.0)), f.x),
      mix(Hash(i + vec2(0.0, 1.0)), Hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    v += noise(p * 1.0) * 0.5;
    v += noise(p * 2.0) * 0.25;
    v += noise(p * 4.0) * 0.125;
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 centeredUv = (uv - 0.5) * vec2(aspect, 1.0);
    
    float dissolveEdge = uv.y - uProgress * 1.3;
    float noiseValue = fbm(centeredUv * 15.0);
    float d = dissolveEdge + noiseValue * uSpread;
    
    float pixelSize = 1.0 / uResolution.y;
    // Removed '1.0 -' so it starts opaque and goes to transparent
    float alpha = smoothstep(-pixelSize, pixelSize, d);
    
    gl_FragColor = vec4(uColor, alpha);
  }
`;

const SERVICE_INTRO_LINE1 = "What I can do";
const SERVICE_INTRO_LINE2 = "for you.";

const TransitionZone: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const explanationRef = useRef<HTMLDivElement>(null);
  const serviceIntroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // 1. Setup Three.js
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });

    // We match the background black exactly so it blends seamlessly
    const rgb = { r: 32 / 255, g: 30 / 255, b: 31 / 255 }; // Exact match of #201E1F / var(--color-black)

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uProgress: { value: 0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uColor: { value: new THREE.Vector3(rgb.r, rgb.g, rgb.b) },
        uSpread: { value: 0.6 },
      },
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };
    resize();
    window.addEventListener('resize', resize);

    // Render loop
    const animate = () => {
      renderer.render(scene, camera);
    };
    gsap.ticker.add(animate);

    // 2. Setup GSAP ScrollTrigger Sequence
    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=350%",
          scrub: 0.8,
          pin: true
        }
      });

      // PHASE 1: WebGL Dissolve completes — long, slow, cinematic
      tl.to(material.uniforms.uProgress, {
        value: 1.2, // Canvas fully dissolves to transparent revealing white background
        ease: "none",
        duration: 0.6
      });

      // PHASE 2: Text fades in safely AFTER WebGL is gone
      if (textRef.current && explanationRef.current) {
        const devQuote = textRef.current.querySelector('.font-devanagari');
        const transQuote = textRef.current.querySelector('.transition-translation');

        const lines = explanationRef.current.querySelectorAll('p');

        tl.fromTo([devQuote, transQuote],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.3 }
        );

        tl.to([devQuote, transQuote],
          { opacity: 0, y: -20, duration: 0.3 },
          "+=0.2"
        );

        tl.fromTo(lines,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.2, duration: 0.4 },
          "-=0.1"
        );

        // Hold explanation briefly before scroll continues
        tl.to(lines, { opacity: 0, y: -20, stagger: 0.1, duration: 0.3 }, "+=0.3");
      }

      // PHASE 3: Service intro — 3D Word Scatter Reveal (giats-portfolio style)
      if (serviceIntroRef.current) {
        // Split text into words for scatter animation
        const line1El = serviceIntroRef.current.querySelector('.service-intro-line1') as HTMLElement;
        const line2El = serviceIntroRef.current.querySelector('.service-intro-line2') as HTMLElement;
        const line1Split = line1El ? new SplitType(line1El, { types: 'words' }) : null;
        const line2Split = line2El ? new SplitType(line2El, { types: 'words' }) : null;
        const allWords = [
          ...(line1Split?.words ?? []),
          ...(line2Split?.words ?? []),
        ];

        // Hide the container initially
        gsap.set(serviceIntroRef.current, { opacity: 1 });

        // Set all words to scattered 3D state
        allWords.forEach((word) => {
          gsap.set(word, {
            opacity: 0,
            z: gsap.utils.random(500, 950),
            xPercent: gsap.utils.random(-100, 100),
            yPercent: gsap.utils.random(-10, 10),
            rotationX: gsap.utils.random(-90, 90),
          });
        });

        // Hold on white for a beat
        tl.to({}, { duration: 0.3 });

        // Scatter reveal — words fly in from 3D space to form the text
        tl.to(allWords, {
          ease: 'expo.out',
          opacity: 1,
          rotationX: 0,
          rotationY: 0,
          xPercent: 0,
          yPercent: 0,
          z: 0,
          stagger: {
            each: 0.02,
            from: 'random',
          },
          duration: 0.8,
        });

        // Hold the assembled text briefly
        tl.to({}, { duration: 0.3 });

        // Fade everything out
        tl.to(serviceIntroRef.current, {
          opacity: 0,
          y: -30,
          duration: 0.3,
          ease: 'power2.in',
        });
      }
    }, containerRef);

    return () => {
      window.removeEventListener('resize', resize);
      gsap.ticker.remove(animate);
      ctx.revert();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="transition-zone-webgl">
      {/* Light background layer revealed underneath */}
      <div className="transition-light-layer">
        <div className="transition-text-stack" ref={textRef}>
          <span className="font-devanagari" style={{ opacity: 0 }}>{CONTENT.hero.philosophyDevanagari}</span>
          <span className="transition-translation" style={{ opacity: 0 }}>{CONTENT.hero.philosophyTranslation}</span>
        </div>

        {/* Using CSS grid or absolute position so it replaces devanagari */}
        <div className="transition-explanation-webgl" ref={explanationRef}>
          <p className="explanation-text">Most people fight the current. They push. They force. They burn out.</p>
          <p className="explanation-text">I learned something different. When you stop resisting and start listening — to the problem, to the code, to the silence between the lines — the answer finds you.</p>
          <p className="explanation-closing mt-4">That's not a philosophy. That's a weapon.</p>
        </div>

        {/* PHASE 3: Service intro — 3D word scatter reveal */}
        <div className="service-intro-container" ref={serviceIntroRef} style={{ opacity: 0 }}>
          <p className="service-intro-line1">{SERVICE_INTRO_LINE1}</p>
          <p className="service-intro-line2">{SERVICE_INTRO_LINE2}</p>
        </div>
      </div>

      {/* Dark overlay layer dissolving on top */}
      <canvas className="transition-canvas" ref={canvasRef}></canvas>
    </div>
  );
};

export default TransitionZone;
