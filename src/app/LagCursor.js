"use client";
import { useEffect, useState } from 'react';

export default function LagCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // 1. Track the actual invisible mouse
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 2. The physics loop for the "lag" effect
    let animationFrameId;
    const renderLoop = () => {
      setCursorPos((prev) => {
        // Linear interpolation (Lerp) creates the smooth lag
        const speed = 0.2; 
        const nextX = prev.x + (mousePos.x - prev.x) * speed;
        const nextY = prev.y + (mousePos.y - prev.y) * speed;
        return { x: nextX, y: nextY };
      });
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '20px', height: '20px',
        borderRadius: '50%',
        border: '2px solid var(--accent-secondary)', /* Glowing Gold */
        boxShadow: '0 0 10px rgba(247, 148, 29, 0.5)',
        pointerEvents: 'none',
        zIndex: 9999999,
        transform: `translate3d(${cursorPos.x - 10}px, ${cursorPos.y - 10}px, 0)`,
        transition: 'transform 0.05s linear' // Keeps it buttery smooth
      }}
    />
  );
}