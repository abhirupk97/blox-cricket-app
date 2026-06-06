"use client";
import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';
import MagneticButton from './MagneticButton';

export default function DevProfilePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      {/* The Trigger Button */}
      <MagneticButton 
        onClick={() => setIsOpen(true)}
        className="glitch-hover"
        style={{ 
          background: 'transparent', 
          border: '1px solid var(--text-main)', 
          color: 'var(--text-main)', 
          padding: '12px 30px', 
          fontSize: '1rem',
          fontWeight: 'bold', 
          letterSpacing: '1px', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        SEE DEVs &rarr;
      </MagneticButton>

      {/* The Profile Modal */}
      {isOpen && mounted && createPortal(
        <div className="modal-backdrop" onClick={() => setIsOpen(false)} style={{ zIndex: 99999, background: 'rgba(5,5,5,0.9)' }}>
          <div className="hacker-profile-card" onClick={(e) => e.stopPropagation()}>
            
            <button onClick={() => setIsOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#888', fontSize: '1.5rem', cursor: 'pointer' }}>
              <i className="fa-solid fa-xmark"></i>
            </button>

            {/* Top Section: About Dev */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
              <i className="fa-regular fa-user" style={{ color: '#39FF14', fontSize: '1.5rem' }}></i>
              <h3 style={{ margin: 0, fontSize: '1.2rem', letterSpacing: '1px', fontFamily: 'Inter, sans-serif' }}>ABOUT DEV</h3>
            </div>

            <p style={{ color: '#aaa', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Passionate developer who loves turning ideas into real world products. Focused on clean code, performance and great user experiences.
            </p>

            <div className="dev-skills-row">
              <div className="skill-tag"><i className="fa-solid fa-code"></i> Code</div>
              <div className="skill-tag"><i className="fa-solid fa-cube"></i> Build</div>
              <div className="skill-tag"><i className="fa-solid fa-cloud-arrow-up"></i> Deploy</div>
              <div className="skill-tag"><i className="fa-solid fa-rocket"></i> Innovate</div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '2.5rem 0' }} />

            {/* Bottom Section: Avatar & Details */}
            <div className="dev-avatar-ring">
              <i className="fa-solid fa-code"></i>
            </div>

            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '2.2rem', margin: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Teko, sans-serif', letterSpacing: '2px' }}>
                ABHIRUP <i className="fa-solid fa-certificate verified-badge"></i>
              </h2>
              <p style={{ color: '#888', margin: '5px 0 20px 0', fontSize: '0.95rem' }}>Full Stack Developer</p>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', color: '#aaa', fontSize: '0.95rem', fontStyle: 'italic', textAlign: 'left' }}>
                <i className="fa-solid fa-quote-left" style={{ color: '#39FF14', fontSize: '1.2rem', marginTop: '4px' }}></i>
                <p style={{ margin: 0, maxWidth: '250px', lineHeight: '1.5' }}>
                  Building immersive digital experiences and clean, performant web solutions.
                </p>
              </div>
            </div>

          </div>
        </div>,
        document.body
      )}
    </>
  );
}