"use client";
import { useEffect, useRef } from 'react';

export default function CursorTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Ensure the canvas perfectly matches the screen size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Track mouse movements and spawn glowing dots
    const handleMouseMove = (e) => {
      particles.push({
        x: e.clientX,
        y: e.clientY,
        size: 5, // Starting thickness of the trail
        life: 1  // Starts at full opacity
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // The Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79, 195, 247, ${p.life})`; // Fading Neon Green
        ctx.fill();

        // Make the trail shrink and fade out rapidly
        p.life -= 0.04;
        p.size -= 0.1;
      }

      // Delete dots that have completely faded
      particles = particles.filter((p) => p.life > 0);
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        pointerEvents: 'none', /* Ensures you can still click buttons through the trail! */
        zIndex: 9999, /* Floats on top of absolutely everything */
      }}
    />
  );
}