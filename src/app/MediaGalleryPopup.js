"use client";
import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import MagneticButton from './MagneticButton';

export default function MediaGalleryPopup({ title, buttonText }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpen = (e) => {
    e.preventDefault();
    
    // The Neon Confetti Blast!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4FC3F7', '#7C4DFF', '#ffffff'] 
    });

    setIsOpen(true);
  };

  return (
    <>
      <div className="click-more-container">
        {/* ADDED GLITCH-HOVER HERE */}
        <MagneticButton 
          className="click-more glitch-hover" 
          onClick={handleOpen}
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            color: 'var(--neon-green)', 
            fontSize: '1rem', 
            fontFamily: 'inherit',
            marginTop: '1rem'
          }}
        >
          {buttonText || "View Gallery →"}
        </MagneticButton>
      </div>

      {/* --- TELEPORTED GALLERY MODAL --- */}
      {isOpen && mounted && createPortal(
        <div className="modal-backdrop" onClick={() => setIsOpen(false)}>
          <div 
            className="modal-content glass-container" 
            onClick={(e) => e.stopPropagation()} 
            style={{ 
              maxWidth: '800px', 
              maxHeight: '85vh', 
              overflowY: 'auto', 
              textAlign: 'center' 
            }}
          >
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <h2 className="glitch-hover" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{title || "Media Gallery"}</h2>

            {/* THE GALLERY GRID */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '15px',
              padding: '10px'
            }}>
              
              {/* Placeholder Boxes - We will hook these up to Sanity later! */}
              <div className="media-box glitch-hover" style={{ height: '200px' }}>PIC 1</div>
              <div className="media-box glitch-hover" style={{ height: '200px' }}>PIC 2</div>
              <div className="media-box glitch-hover" style={{ height: '200px' }}>VIDEO 1</div>
              <div className="media-box glitch-hover" style={{ height: '200px' }}>PIC 3</div>

            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}