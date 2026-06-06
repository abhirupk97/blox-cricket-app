"use client";
import { useEffect, useState } from 'react';
import { client } from '../sanity/lib/client';

export default function GameFacts() {
  const [facts, setFacts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch all facts from Sanity
    client.fetch(`*[_type == "gameFact"]{factText}`).then(data => {
      setFacts(data);
    });
  }, []);

  // Simple rotation logic
  useEffect(() => {
    if (facts.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % facts.length);
      }, 5000); // Rotates every 5 seconds
      return () => clearInterval(interval);
    }
  }, [facts]);

  if (facts.length === 0) return null;

  return (
    <div className="ticker-container">
      <div className="ticker-item ticker-active">
        <span className="spin-on-view">🏏</span> 
        {facts[currentIndex].factText}
      </div>
    </div>
  );
}