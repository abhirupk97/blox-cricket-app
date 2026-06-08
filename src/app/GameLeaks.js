"use client";
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import RevealOnScroll from './RevealOnScroll';

export default function GameLeaks({ leaksData = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const LATEST_LEAKS = leaksData.slice(0, 2);
  const ARCHIVED_LEAKS = leaksData.slice(2);

  return (
    <>
      <RevealOnScroll className="leaks-section-container">
        
        <div className="leaks-header-wrapper">
          <h2 className="leaks-header-title">GAME LEAKS</h2>
          <div className="leaks-header-line"></div>
        </div>

        <div className="leaks-grid">
          {LATEST_LEAKS.map((leak) => (
            <div key={leak._id} className="leak-card">
              <img src={leak.imageUrl} alt={leak.title} className="leak-image" />
              <h3 className="leak-title">{leak.title}</h3>
              <p className="leak-desc">{leak.description}</p>
            </div>
          ))}
        </div>

        {/* --- UPDATED: "More Leaks" Trigger Button --- */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
          <button 
            onClick={() => setIsOpen(true)}
            className="glitch-hover" 
            data-text="MORE LEAKS →"
            style={{
              background: 'var(--neon-green)',
              color: '#000',
              border: 'none',
              padding: '15px 40px',
              fontSize: '1.1rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              cursor: 'pointer',
              borderRadius: '4px',
              boxShadow: '0 5px 15px rgba(255, 87, 34, 0.4)',
              transition: 'transform 0.2s ease, background 0.2s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--neon-green)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            MORE LEAKS &rarr;
          </button>
        </div>

      </RevealOnScroll>

      {/* --- THE POPUP MODAL --- */}
      {isOpen && mounted && createPortal(
        <div className="modal-backdrop" onClick={() => setIsOpen(false)} style={{ zIndex: 999999 }}>
          <div className="leaks-modal-content" onClick={(e) => e.stopPropagation()}>
            
            <button className="close-btn glitch-hover" onClick={() => setIsOpen(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>

            <div className="leaks-header-wrapper" style={{ marginBottom: '3rem' }}>
              <h2 className="leaks-header-title" style={{ color: 'var(--accent-secondary)' }}>ARCHIVED LEAKS</h2>
              <div className="leaks-header-line" style={{ background: 'var(--accent-secondary)', boxShadow: 'none' }}></div>
            </div>

            <div className="leaks-grid">
              {ARCHIVED_LEAKS.map((leak) => (
                <div key={leak._id} className="leak-card">
                  <img src={leak.imageUrl} alt={leak.title} className="leak-image" />
                  <h3 className="leak-title">{leak.title}</h3>
                  <p className="leak-desc">{leak.description}</p>
                </div>
              ))}
            </div>

          </div>
        </div>,
        document.body
      )}
    </>
  );
}