import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

import glbPath from '../assets/Golden_Sphere.glb';

function Model(props: any) {
  const { scene } = useGLTF(glbPath);
  const meshRef = useRef<THREE.Group>(null);

  // Psychological Hack: Slow, majestic rotation creates a hypnotic, authority-driven "Flow State"
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      
      // Subtle parallax effect tied to mouse movement makes it feel "alive"
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        (state.mouse.y * Math.PI) / 8,
        0.05
      );
      meshRef.current.rotation.z = THREE.MathUtils.lerp(
        meshRef.current.rotation.z,
        (state.mouse.x * Math.PI) / 8,
        0.05
      );
    }
  });

  return (
    <group ref={meshRef} {...props} dispose={null}>
      {/* Using an initial scale, we may need to adjust this depending on the raw GLB size */}
      <primitive object={scene} scale={1.8} position={[0, 0, 0]} />
    </group>
  );
}

export const GoldenSphere: React.FC = () => {
  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      pointerEvents: 'none',
    }}>
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 1.5]} // Clamp pixel ratio to prevent 4K rendering lag on Retina screens
        gl={{ antialias: false, powerPreference: "high-performance" }} // Force dedicated GPU usage and disable heavy AA
      >
        {/* Luxury Studio Lighting */}
        <ambientLight intensity={0.7} />
        {/* Key light: Warm Gold */}
        <directionalLight position={[10, 10, 5]} intensity={2.5} color="#D4AF37" />
        {/* Fill light: Cool White to emphasize the heavy iron charcoal */}
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#ffffff" />
        
        <Suspense fallback={null}>
          {/* Reduced Float intensity to save recalculation frames */}
          <Float speed={1} rotationIntensity={0} floatIntensity={0.5}>
            <Model />
          </Float>
          {/* HDRI Environment mapping makes the gold highly reflective */}
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
};

useGLTF.preload(glbPath);
