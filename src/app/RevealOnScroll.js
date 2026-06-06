"use client";
import { useEffect, useRef, useState } from 'react';

export default function RevealOnScroll({ children, id, className }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // This observer watches exactly when the section enters the screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once it snaps in, it locks into place permanently
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 } // Triggers exactly when 15% of the section is visible
    );

    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <section 
      id={id} 
      ref={ref} 
      /* We apply the new tactical-reveal class here */
      className={`tactical-reveal ${isVisible ? 'is-visible' : ''} ${className || ''}`}
    >
      {children}
    </section>
  );
}