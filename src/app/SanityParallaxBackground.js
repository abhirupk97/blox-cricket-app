"use client";
import { useEffect, useRef, useState } from 'react';


export default function SanityParallaxBackground({ settings }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  // Safely extract Sanity settings with fallbacks
  const particleColor = settings?.particleColor || '#39FF14';
  const particleCount = settings?.particleCount || 100;
  const speedMult = settings?.animationSpeed || 1;
  const bgImageUrl = settings?.bgImageUrl || "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?q=80&w=2070&auto=format&fit=crop";

  // Track Mouse & Scroll for Parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate normalized mouse position (-1 to 1)
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };
    
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 3D Canvas Particle Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Initialize Particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1, // Varies size for fake depth
        speedX: (Math.random() - 0.5) * speedMult,
        speedY: (Math.random() - 0.5) * speedMult,
        opacity: Math.random(),
        depth: Math.random() // Used for mouse parallax multiplier
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        // Move particles automatically
        p.x += p.speedX;
        p.y += p.speedY;

        // Mouse Parallax effect on particles based on their "depth"
        const parallaxX = mousePosition.x * (p.depth * 20);
        const parallaxY = mousePosition.y * (p.depth * 20);

        // Wrap around screen
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;

        ctx.beginPath();
        ctx.arc(p.x + parallaxX, p.y + parallaxY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particleColor}${Math.floor(p.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = particleColor;
        ctx.fill();
      });

      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [particleColor, particleCount, speedMult, mousePosition]);

  return (
    <div ref={containerRef} style={{ position: 'fixed', inset: 0, zIndex: -5, overflow: 'hidden', backgroundColor: '#050505' }}>
      
      {/* LAYER 1: Deep Background Image (Moves opposite to mouse and scroll) */}
      {bgImageUrl && (
        <div style={{
          position: 'absolute',
          inset: '-5%', // Make it slightly larger so edges don't show when moving
          backgroundImage: `url(${bgImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4,
          transform: `translate(${mousePosition.x * -20}px, calc(${mousePosition.y * -20}px + ${scrollY * 0.2}px))`,
          transition: 'transform 0.1s ease-out'
        }} />
      )}

      {/* LAYER 2: The 3D Particles */}
      <canvas 
        ref={canvasRef} 
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          transform: `translateY(${scrollY * 0.4}px)` // Particles scroll faster than background for depth
        }} 
      />

      {/* LAYER 3: Dark Vignette Gradient to blend the edges into the website */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, transparent 0%, #050505 100%)',
        pointerEvents: 'none'
      }} />
    </div>
  );
}