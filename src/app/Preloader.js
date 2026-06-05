"use client";
import { useState, useEffect } from 'react';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Keeps the boot screen up for exactly 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      position: 'fixed', 
      inset: 0, 
      zIndex: 999999, /* Ensures it covers EVERYTHING */
      background: '#050505',
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center',
      opacity: isLoading ? 1 : 0, 
      pointerEvents: isLoading ? 'all' : 'none',
      transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)' /* Buttery smooth fade */
    }}>
      <i 
        className="fa-solid fa-cricket-bat-ball" 
        style={{ 
          fontSize: '4rem', 
          color: '#39FF14', 
          animation: 'spin 2s linear infinite',
          filter: 'drop-shadow(0 0 20px rgba(57, 255, 20, 0.5))'
        }}
      ></i>
      <h2 style={{ 
        color: '#fff', 
        fontFamily: 'Teko, sans-serif', 
        fontSize: '2rem',
        marginTop: '20px', 
        letterSpacing: '4px' 
      }}>
        BLOX CRICKET LOADING...
      </h2>
    </div>
  );
}