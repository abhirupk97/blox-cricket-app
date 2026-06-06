"use client";
import { useEffect, useState } from 'react';

export default function ParallaxBackground() {
  const [scrollProgress, setScrollProgress] = useState(0);

  // High-quality, tactical cricket images
  const images = [
    "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2500&auto=format&fit=crop", // Top: Stadium under lights
    "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?q=80&w=2500&auto=format&fit=crop", // Middle: Cricket Pitch/Ball close up
    "https://images.unsplash.com/photo-1518091043644-c1d44570d2c1?q=80&w=2500&auto=format&fit=crop"  // Bottom: Dynamic action/lighting
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far down the user has scrolled as a percentage (0 to 1)
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to set initial state
    handleScroll(); 
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -3, background: '#050505', overflow: 'hidden' }}>
      
      {images.map((src, index) => {
        // Calculate when this specific image should be at 100% opacity
        const targetProgress = index / (images.length - 1); 
        
        // Calculate distance from current scroll to this image's target
        const distance = Math.abs(scrollProgress - targetProgress);
        
        // Opacity peaks at 1 when distance is 0, fades out smoothly
        const opacity = Math.max(0, 1 - distance * 1.8);

        // Subtle parallax shift up and down
        const translateY = (scrollProgress - targetProgress) * 60;

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: '-5%', left: '-5%', width: '110%', height: '110%', // Scaled up slightly to hide edges during movement
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: opacity,
              transform: `translateY(${translateY}px)`,
              transition: 'opacity 0.1s ease-out, transform 0.1s ease-out',
              willChange: 'opacity, transform' // Forces hardware acceleration for smooth 60fps
            }}
          />
        );
      })}
      
      {/* Heavy Tactical Overlay: Ensures the bright images never make your white text unreadable */}
      <div 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(180deg, rgba(20,20,20,0.6) 0%, rgba(15,18,22,0.95) 100%)' 
        }} 
      />

    </div>
  );
}