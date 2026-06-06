"use client";
import { useState } from 'react';
import ScrambleText from './ScrambleText';
import RevealOnScroll from './RevealOnScroll';

export default function AboutGameClient({ homepage, mediaUrl }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <RevealOnScroll id="about-game" className="content-section">
      
      {/* --- THE TOP 50/50 SPLIT --- */}
      <div className="gta-split-section">
        
        {/* Left Column: Image */}
        <div className="gta-split-media">
          {mediaUrl ? (
            <img 
              src={mediaUrl} 
              alt="About Game" 
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '4px', boxShadow: '0 15px 35px rgba(0,0,0,0.6)' }} 
            />
          ) : (
            <div style={{ width: '100%', aspectRatio: '16/9', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444', border: '1px solid #222', fontSize: '1.2rem', letterSpacing: '2px', borderRadius: '4px' }}>
              GAME HERO ART
            </div>
          )}
        </div>

        {/* Right Column: Text & Toggle Button */}
        <div className="gta-split-text">
          <h2 style={{ fontSize: '4.5rem', marginBottom: '1rem', textShadow: 'none', lineHeight: '1.1', textTransform: 'uppercase', color: 'var(--text-main)' }}>
            <ScrambleText text="About Game" />
          </h2>
          <p style={{ fontFamily: 'monospace', color: 'var(--neon-green)', marginBottom: '1rem', fontSize: '1rem', letterSpacing: '1px' }}>
            {homepage?.aboutGameSubline || '"LINES"'}
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ccc', marginBottom: '2.5rem' }}>
            {homepage?.aboutGameText || 'Step onto the pitch and experience the ultimate T20 multiplayer cricket showdown.'}
          </p>

          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: 'transparent',
              border: `1px solid ${isOpen ? '#FF5722' : '#FFC107'}`,
              color: isOpen ? '#FF5722' : '#FFC107',
              padding: '12px 30px',
              fontSize: '1rem',
              fontWeight: 'bold',
              fontFamily: 'inherit',
              letterSpacing: '1px',
              borderRadius: '2px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              alignSelf: 'flex-start',
              transition: 'all 0.2s ease',
              width: 'max-content'
            }}
          >
            {isOpen ? '↓ HIDE FEATURES' : 'SEE FEATURES →'}
          </button>
        </div>
      </div>

      {/* --- THE EXPANDING CONTENT (DYNAMIC) --- */}
      <div className={`features-expand-wrapper ${isOpen ? 'is-expanded' : ''}`}>
        <div className="features-expand-inner">
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', margin: '4rem 0 3rem 0' }}></div>

          {homepage?.gameFeatures?.map((feature, index) => (
            <div key={index} className={`feature-row ${index % 2 !== 0 ? 'reverse' : ''}`}>
              <div className="feature-media">
                <div className="media-box" style={{ height: '380px', background: '#0a0a0a', border: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {feature.title}
                </div>
              </div>
              <div className="feature-text">
                <div style={{ width: '40px', height: '3px', background: index % 2 === 0 ? '#FF5722' : '#FFC107', marginBottom: '1.5rem' }}></div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}

        </div>
      </div>

    </RevealOnScroll>
  );
}