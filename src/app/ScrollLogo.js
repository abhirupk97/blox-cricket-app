"use client"; // This tells Next.js it's safe to use mouse clicks here!

export default function ScrollLogo({ whiteText, neonText }) {
  return (
    <div 
      className="logo" 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{ cursor: 'pointer' }}
    >
      <h2>
        <span className="text-white">{whiteText || 'BLOX'}</span>
        <span className="text-neon">{neonText || 'CRICKET'}</span>{' '}
        <i className="fa-solid fa-cricket-bat-ball text-neon"></i>
      </h2>
    </div>
  );
}