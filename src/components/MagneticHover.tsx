import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface MagneticHoverProps {
  children: React.ReactElement;
  pullFactor?: number;
}

export const MagneticHover: React.FC<MagneticHoverProps> = ({ children, pullFactor = 0.3 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { playHoverTick } = useSoundEffects();

  const handleMouseEnter = () => {
    playHoverTick(); // Play the crisp UI tick sound on hover
  };

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // Calculate the magnetic pull
    setPosition({ x: middleX * pullFactor, y: middleY * pullFactor });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      style={{ position: 'relative', display: 'inline-block', zIndex: 50 }}
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className="hover-target" // Hooked to our custom cursor logic so it turns into the large ring!
    >
      {React.cloneElement(children as React.ReactElement<any>, {
        className: `${(children.props as any).className || ''} magnetic-child`,
      })}
    </motion.div>
  );
};
