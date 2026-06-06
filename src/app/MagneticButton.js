"use client";
import { useState } from 'react';

export default function MagneticButton({ children, href, className, style, onClick }) {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    // Calculate where the click happened relative to the button
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create a new ripple instance
    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);

    // Clean up the ripple after animation finishes (500ms)
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 500);

    if (onClick) onClick(e);
  };

  const Element = href ? 'a' : 'button';

  return (
    <Element 
      href={href} 
      className={`magnetic-btn ${className || ''}`} 
      style={{ ...style, position: 'relative', overflow: 'hidden' }}
      onClick={handleClick}
    >
      <span style={{ position: 'relative', zIndex: 2 }}>{children}</span>
      
      {/* Map through and render the dark ripples */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          style={{
            position: 'absolute',
            top: ripple.y,
            left: ripple.x,
            width: '20px',
            height: '20px',
            background: 'rgba(0, 0, 0, 0.6)', /* Tactical Dark Ripple */
            borderRadius: '50%',
            transform: 'translate(-50%, -50%) scale(0)',
            animation: 'rippleBlast 0.5s linear forwards',
            zIndex: 1
          }}
        />
      ))}

      {/* Ripple Animation strictly for this button */}
      <style jsx>{`
        @keyframes rippleBlast {
          to {
            transform: translate(-50%, -50%) scale(15);
            opacity: 0;
          }
        }
      `}</style>
    </Element>
  );
}