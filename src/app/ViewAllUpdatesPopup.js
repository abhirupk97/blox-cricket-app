"use client";
import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';
import MagneticButton from './MagneticButton';

export default function ViewAllUpdatesPopup({ updates }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* The Trigger Button */}
      <MagneticButton 
        onClick={() => setIsOpen(true)} 
        className="glitch-hover"
        style={{ color: 'var(--text-main)', border: 'none', fontSize: '0.9rem', letterSpacing: '1px', cursor: 'pointer', background: 'transparent' }}
      >
        VIEW ALL &raquo;
      </MagneticButton>

      {/* The Fullscreen Archive Modal */}
      {isOpen && mounted && createPortal(
        <div className="modal-backdrop" onClick={() => setIsOpen(false)} style={{ zIndex: 99999 }}>
          <div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()} 
            style={{ 
              maxWidth: '1200px', 
              width: '95%', 
              maxHeight: '90vh', 
              overflowY: 'auto', 
              background: 'var(--bg-dark)', /* Cinematic Blackout */
              padding: '3rem',
              borderTop: '4px solid var(--neon-green)',
              textAlign: 'left'
            }}
          >
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            
            <h2 className="glitch-hover" style={{ fontSize: '2.5rem', marginBottom: '2rem', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
              COMPLETE ARCHIVE LOGS
            </h2>

            {/* THE EXACT SAME GRID FORMAT inside the popup! */}
            <div className="news-grid">
              {updates.length === 0 ? (
                <p className="glitch-hover">NO CLASSIFIED DATA FOUND.</p>
              ) : (
                updates.map((update) => (
                  <div key={update._id} className="news-card">
                    
                    <div className="news-image-container">
                      {update.imageUrl ? (
                        <img src={update.imageUrl} alt={`Build ${update.version}`} className="news-image" />
                      ) : (
                        <div style={{ color: '#444', fontFamily: 'Teko', fontSize: '2rem', letterSpacing: '3px' }}>
                          NO VISUAL INTEL
                        </div>
                      )}
                    </div>

                    <div className="news-content">
                      <div className="news-meta">
                        <span>{update.date || 'RECENT'}</span>
                        <span className="meta-divider">|</span>
                        <span style={{ color: 'var(--text-main)' }}>PATCH</span>
                      </div>
                      
                      <h3 className="news-title">Build Update {update.version} Deployed</h3>
                      <p className="news-description">{update.description}</p>
                    </div>

                  </div>
                ))
              )}
            </div>

          </div>
        </div>,
        document.body
      )}
    </>
  );
}