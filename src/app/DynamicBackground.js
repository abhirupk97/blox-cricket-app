"use client";
import { useState, useEffect } from 'react';

export default function DynamicBackground() {
  const [scrollDepth, setScrollDepth] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollDepth(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Trigger once on load in case they refresh halfway down the page
    handleScroll(); 
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determines if we are deep enough to trigger the Pitch Green shift (between 600px and 1800px)
  const isPitchGreen = scrollDepth > 600 && scrollDepth < 1800; 

  return (
    <div className={`bg-overlay ${isPitchGreen ? 'pitch-green-mode' : ''}`}></div>
  );
}