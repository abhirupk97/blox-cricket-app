"use client";
import { useEffect, useRef, useState } from "react";

// We added 'animationType' so you can choose: "slide-up", "rotate", or "scale"
export default function RevealOnScroll({ children, id, className, animationType = "slide-up" }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(currentRef);
        }
      },
      { threshold: 0.15 } // Triggers when 15% of the card is visible
    );

    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  // Notice how it dynamically applies your chosen animation class!
  return (
    <div
      id={id}
      ref={ref}
      className={`reveal-wrapper reveal-${animationType} ${className || ""} ${isVisible ? "is-visible" : ""}`}
    >
      {children}
    </div>
  );
}