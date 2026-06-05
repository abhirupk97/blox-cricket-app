"use client"; // This is the magic phrase Next.js is asking for!

import { TypeAnimation } from 'react-type-animation';

export default function HeroTypewriter({ title }) {
  return (
    <TypeAnimation
      sequence={[
        title || 'BLOX CRICKET', 
        2000, 
        'MULTIPLAYER MAYHEM', 
        2000,
        'THE ULTIMATE T20', 
        2000
      ]}
      wrapper="h1"
      speed={50}
      deletionSpeed={60}
      className="mega-title"
      repeat={Infinity}
    />
  );
}