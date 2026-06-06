"use client";
import { useState, useEffect } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // 1. Black screen starts. Fade logo in after 300ms.
    const logoTimer = setTimeout(() => setShowLogo(true), 300);
    
    // 2. Slam the preloader away exactly 1.8 seconds later.
    const slamTimer = setTimeout(() => setLoading(false), 1800);

    return () => { clearTimeout(logoTimer); clearTimeout(slamTimer); };
  }, []);

  if (!loading) return null;

  return (
    <div className="blackout-preloader">
      <h1 className={`boot-logo ${showLogo ? 'fade-in' : ''}`}>
        BLOX<span style={{ color: 'var(--neon-green)' }}>CRICKET</span>
      </h1>
    </div>
  );
}