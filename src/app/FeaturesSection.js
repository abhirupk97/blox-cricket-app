'use client';
import { useState } from 'react';

// Accept the features array as a prop
export default function FeaturesSection({ features = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ width: '100%' }}>

      {/* SEE FEATURES button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: isOpen ? 'transparent' : 'transparent',
          border: `1px solid ${isOpen ? '#FF5722' : '#FFC107'}`,
          color: isOpen ? '#FF5722' : '#FFC107',
          padding: '12px 30px',
          fontSize: '1rem',
          fontWeight: 'bold',
          fontFamily: 'inherit',
          letterSpacing: '1px',
          borderRadius: '2px',
          cursor: 'none',
          textTransform: 'uppercase',
          alignSelf: 'flex-start',
          transition: 'all 0.2s ease',
        }}
      >
        {isOpen ? 'FEATURES OPEN ↓' : 'SEE FEATURES →'}
      </button>

      {/* Expand wrapper */}
      <div className={`features-expand-wrapper ${isOpen ? 'is-expanded' : ''}`}>
        <div className="features-expand-inner">

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', margin: '4rem 0 3rem 0' }}></div>

          {/* DYNAMIC MAPPING: Loops through Sanity data */}
          {features?.map((feature, index) => (
            <div key={index} className={`feature-row ${index % 2 !== 0 ? 'reverse' : ''}`}>
              <div className="feature-media">
                <div className="media-box" style={{ height: '380px', background: '#0a0a0a', border: '1px solid #1a1a1a' }}>
                  FEATURE IMAGE {index + 1}
                </div>
              </div>
              <div className="feature-text">
                <div style={{ width: '40px', height: '3px', background: index % 2 === 0 ? '#FF5722' : '#FFC107', marginBottom: '1.5rem' }}></div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}

          {/* Hide button at bottom */}
          {features.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '1rem' }}>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'transparent', border: '1px solid #444', color: '#888',
                  padding: '10px 28px', fontSize: '0.9rem', fontWeight: 'bold', fontFamily: 'inherit',
                  letterSpacing: '1px', borderRadius: '2px', cursor: 'none', textTransform: 'uppercase',
                  transition: 'all 0.2s ease',
                }}
              >
                ← HIDE FEATURES
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}