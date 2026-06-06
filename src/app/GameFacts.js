"use client";
import { useState, useEffect } from 'react';

const FACTS = [
  "FACT 01: Dynamic weather directly affects pitch bounce.",
  "FACT 02: Perfect timing on a sweep shot multiplies run speed by 1.2x.",
  "FACT 03: Fast bowlers lose stamina 15% faster in high humidity.",
  "FACT 04: DRS Hawkeye uses actual real-time 3D physics collision.",
];

export default function GameFacts() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Cycles exactly every 4 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % FACTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ticker-container">
      {FACTS.map((fact, index) => {
        let positionClass = 'ticker-exit';
        if (index === currentIndex) positionClass = 'ticker-active';
        else if (index === (currentIndex + 1) % FACTS.length) positionClass = 'ticker-enter';

        return (
          <div key={index} className={`ticker-item ${positionClass}`}>
             <span className="spin-on-view">🏏</span> {fact}
          </div>
        );
      })}
    </div>
  );
}
