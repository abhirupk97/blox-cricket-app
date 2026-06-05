"use client";
import { useRef, useState } from 'react';

export default function MagneticButton({ children, onClick, className, style, href }) {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const x = (clientX - centerX) * 0.3;
    const y = (clientY - centerY) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  // MAGIC TRICK: If an href is provided, act like a link. Otherwise, act like a button!
  const Component = href ? 'a' : 'button';

  return (
    <Component
      href={href}
      ref={buttonRef}
      className={`magnetic-btn ${className || ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        ...style,
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: position.x === 0 ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
        display: 'inline-block' // Ensures the physics work perfectly on links
      }}
    >
      {children}
    </Component>
  );
}