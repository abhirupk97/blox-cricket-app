"use client";
import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';
import MagneticButton from './MagneticButton';

export default function FeaturesPopup({ buttonText }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <MagneticButton 
        onClick={() => setIsOpen(true)} 
        className="glitch-hover"
        style={{ 
          background: 'transparent', border: 'none', cursor: 'pointer', 
          color: 'var(--accent-secondary)', fontSize: '1.2rem', 
          fontWeight: 'bold', fontFamily: 'inherit', padding: '0'
        }}
      >
        {buttonText || "SEE FEATURES \u2192"}
      </MagneticButton>

      {isOpen && mounted && createPortal(
        <div className="modal-backdrop" onClick={() => setIsOpen(false)} style={{ zIndex: 99999 }}>
          <div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()} 
            style={{ 
              maxWidth: '100vw', 
              width: '100%', 
              height: '100vh', 
              overflowY: 'auto', 
              background: '#050505', /* Pitch Black for cinematic feel */
              padding: '5rem 10%',
              borderRadius: '0',
              border: 'none'
            }}
          >
            <button 
              className="glitch-hover"
              onClick={() => setIsOpen(false)} 
              style={{ 
                position: 'fixed', /* Locks it to the screen so it never scrolls away */
                top: '40px', 
                right: '50px', 
                fontSize: '1.5rem', 
                color: 'var(--accent-secondary)', /* GTA Gold */
                background: 'rgba(15, 25, 35, 0.9)', /* Dark Navy backing */
                border: '1px solid var(--accent-secondary)', 
                padding: '10px 25px', 
                cursor: 'pointer', 
                zIndex: 999999, /* God-mode priority */
                fontFamily: 'Teko, sans-serif',
                letterSpacing: '2px',
                textTransform: 'uppercase'
              }}
            >
              [ X ] CLOSE
            </button>
            
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
              
              {/* Row 1: Image Left, Text Right */}
              <div className="feature-row">
                <div className="feature-media">
                  <div className="media-box" style={{ height: '400px', background: '#111' }}>
                    FEATURE IMAGE 1
                  </div>
                </div>
                <div className="feature-text">
                  <h3>Exclusive New Content</h3>
                  <p>Step into the high-performance arena. Immediately access elite new upgrades, exclusive modifications, and test your skills in the most competitive environments on the platform.</p>
                </div>
              </div>

              {/* Row 2: Text Left, Image Right (Notice the 'reverse' class) */}
              <div className="feature-row reverse">
                <div className="feature-media">
                  <div className="media-box" style={{ height: '400px', background: '#111' }}>
                    FEATURE IMAGE 2
                  </div>
                </div>
                <div className="feature-text">
                  <h3>New Career Builder</h3>
                  <p>Get started with the tools of the trade. Quickly choose your path—Batsman, Fast Bowler, Spin Specialist, or All-Rounder—and select from powerful gear to kick-start your enterprise.</p>
                </div>
              </div>

              {/* Row 3: Image Left, Text Right */}
              <div className="feature-row">
                <div className="feature-media">
                  <div className="media-box" style={{ height: '400px', background: '#111' }}>
                    FEATURE IMAGE 3
                  </div>
                </div>
                <div className="feature-text">
                  <h3>Stunning Visuals</h3>
                  <p>Enjoy enhanced levels of fidelity and performance. Featuring upgraded textures, increased framerates, and real-time ray-traced shadows to bring the stadium to life.</p>
                </div>
              </div>

            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}