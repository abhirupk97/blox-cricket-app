"use client";

import { useEffect, useRef } from 'react';

export default function RevealOnScroll({ children, id, className }) {
  const domRef = useRef();

  useEffect(() => {
    // Set up the Intersection Observer (The Scroll Watcher)
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // If the section enters the screen, add the 'is-visible' class
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { 
      threshold: 0.15 // Triggers when exactly 15% of the section becomes visible
    });

    if (domRef.current) observer.observe(domRef.current);
    
    // Cleanup function
    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} className={`reveal-wrapper ${className || ''}`} ref={domRef}>
      {children}
    </section>
  );
}