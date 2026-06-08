"use client";
import { useEffect, useState } from 'react';

export default function ScrollBackgroundSequence({ sequence = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!sequence || sequence.length === 0) return;

    const handleScroll = () => {
      // 1. Get current scroll position
      const scrollY = window.scrollY;
      
      // 2. Calculate the maximum possible scroll distance
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      if (maxScroll <= 0) {
         setActiveIndex(0);
         return;
      }

      // 3. Figure out the scroll percentage (0 to 1)
      const scrollPercent = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      // 4. Determine which background should be showing based on percentage
      let index = Math.floor(scrollPercent * sequence.length);

      // Edge case: if they hit the absolute bottom, keep it on the last image
      if (index >= sequence.length) {
        index = sequence.length - 1;
      }

      setActiveIndex(index);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on load

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sequence]);

  // Fallback if no images are uploaded to Sanity yet
  if (!sequence || sequence.length === 0) {
    return <div style={{ position: 'fixed', inset: 0, backgroundColor: '#050505', zIndex: -5 }} />;
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -5, backgroundColor: '#050505' }}>
      
      {/* Map through all the Sanity backgrounds */}
      {sequence.map((item, index) => {
        // Only the active background gets opacity: 1, the rest fade to 0
        const isActive = index === activeIndex;

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: isActive ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out', // Smooth 0.8s crossfade
            }}
          >
            {item.videoUrl ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              >
                <source src={item.videoUrl} type="video/mp4" />
              </video>
            ) : item.imageUrl ? (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${item.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            ) : null}
          </div>
        );
      })}

      {/* Dark Overlay so text is always readable */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(10, 10, 14, 0.65)' }} />
    </div>
  );
}