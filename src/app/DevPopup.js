"use client";

import { useState } from 'react';

export default function DevPopup({ developers }) {
  const [selectedDev, setSelectedDev] = useState(null);

  return (
    <>
      <div className="dev-cards">
        {developers && developers.length > 0 ? developers.map((dev, index) => (
          <div 
            className="dev-card" 
            key={index} 
            onClick={() => setSelectedDev(dev)}
            style={{ cursor: 'pointer', transition: '0.3s' }}
            onMouseOver={(e) => e.target.style.borderColor = 'var(--neon-green)'}
            onMouseOut={(e) => e.target.style.borderColor = '#333'}
          >
            {/* The ? ensures it doesn't crash if the name is temporarily missing */}
            {dev?.name || "Unnamed Dev"}
          </div>
        )) : (
          <div className="dev-card">No Devs Listed</div>
        )}
      </div>

      {/* --- THE POPUP MODAL --- */}
      {selectedDev && (
        <div className="modal-backdrop" onClick={() => setSelectedDev(null)}>
          <div className="modal-content glass-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedDev(null)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{selectedDev?.name || "Unknown"}</h2>
            <h4 style={{ color: 'var(--neon-green)', marginBottom: '1rem', textTransform: 'uppercase' }}>
              {selectedDev?.role || "Developer"}
            </h4>
            <p style={{ lineHeight: '1.6' }}>{selectedDev?.bio || "No bio available."}</p>
          </div>
        </div>
      )}
    </>
  );
}