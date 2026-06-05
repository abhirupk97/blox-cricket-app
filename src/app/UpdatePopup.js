"use client";
import MagneticButton from './MagneticButton';
import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function UpdatePopup({ updates }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const triggerBlast = (e) => {
    e.preventDefault(); 
    
    try {
      // PLAN A: The AAA Emoji Sixer Blast!
      const bat = confetti.shapeFromText({ text: '🏏', scalar: 3 });
      const ball = confetti.shapeFromText({ text: '⚾', scalar: 3 });
      const trophy = confetti.shapeFromText({ text: '🏆', scalar: 4 });

      confetti({
        particleCount: 40,
        spread: 80,
        origin: { y: 0.6 },
        shapes: [bat, ball, trophy],
        ticks: 200, 
        gravity: 0.8
      });

      // Sky Blue, Purple, and White Sparks
      confetti({
        particleCount: 50,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#4FC3F7', '#7C4DFF', '#ffffff'] 
      });
    } catch (error) {
      // PLAN B: Fallback Blast
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#4FC3F7', '#7C4DFF', '#ffffff', '#060B18']
      });
    }

    setIsOpen(true);
  };

  return (
    <>
      <div className="click-more-container">
        <MagneticButton 
          className="click-more glitch-hover" 
          onClick={triggerBlast}
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
          Click More &rarr;
        </MagneticButton>
      </div>

      {isOpen && mounted && createPortal(
        <div className="modal-backdrop" onClick={() => setIsOpen(false)}>
          <div 
            className="modal-content glass-container" 
            onClick={(e) => e.stopPropagation()} 
            style={{ maxHeight: '80vh', overflowY: 'auto', textAlign: 'left' }}
          >
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <h2 className="glitch-hover" style={{ fontSize: '2.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>Update Log</h2>

            <ul className="update-list-numbered" style={{ paddingLeft: '1rem' }}>
              {updates && updates.length > 0 ? (
                updates.map((update) => (
                  <li key={update._id} className="glitch-hover" style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(79, 195, 247, 0.2)', paddingBottom: '1rem' }}>
                    <div style={{ fontSize: '1.2rem', color: 'var(--neon-green)', marginBottom: '0.5rem' }}>
                      <strong>{update.version}</strong>
                      <span style={{ color: "#888", marginLeft: "10px", fontSize: "0.9rem" }}>
                        ({update.date})
                      </span>
                    </div>
                    <p style={{ lineHeight: '1.5', color: '#ccc' }}>{update.description}</p>
                  </li>
                ))
              ) : (
                <li className="glitch-hover">No updates available right now.</li>
              )}
            </ul>
          </div>
        </div>,
        document.body 
      )}
    </>
  );
}