"use client";

import { useState } from 'react';

export default function UpdatePopup({ updates }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="click-more-container">
        <button 
          className="click-more" 
          onClick={(e) => {
            e.preventDefault(); // This is the magic line that stops the page jump!
            setIsOpen(true);
          }}
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
        </button>
      </div>

      {/* --- THE FULL UPDATES POPUP MODAL --- */}
      {isOpen && (
        <div className="modal-backdrop" onClick={() => setIsOpen(false)}>
          <div 
            className="modal-content glass-container" 
            onClick={(e) => e.stopPropagation()} 
            style={{ maxHeight: '80vh', overflowY: 'auto', textAlign: 'left' }}
          >
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>Update Log</h2>

            <ul className="update-list-numbered" style={{ paddingLeft: '1rem' }}>
              {updates && updates.length > 0 ? (
                updates.map((update) => (
                  <li key={update._id} style={{ marginBottom: '1rem', borderBottom: '1px solid #333', paddingBottom: '1rem' }}>
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
                <li>No updates available right now.</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}