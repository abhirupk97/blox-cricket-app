"use client";
import { useState, useEffect, useRef } from 'react';

// The hacker symbols it will use to scramble the text
const CHARS = '!<>-_\\/[]{}—=+*^?#_010101';

export default function ScrambleText({ text }) {
  // Start the text completely scrambled
  const [displayText, setDisplayText] = useState(
    text.replace(/./g, () => CHARS[Math.floor(Math.random() * CHARS.length)])
  );
  const [hasRun, setHasRun] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    
    // Only decrypt when the user scrolls down and looks at it!
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun) {
          setHasRun(true);
          let iteration = 0;
          
          const interval = setInterval(() => {
            setDisplayText(text.split("").map((letter, index) => {
              if (index < iteration) return text[index];
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            }).join(""));

            if (iteration >= text.length) clearInterval(interval);
            iteration += 1 / 2; // Speed of the decryption
          }, 30);
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.disconnect(); };
  }, [text, hasRun]);

  return <span ref={ref}>{displayText}</span>;
}