"use client";
import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';
import MagneticButton from './MagneticButton';

export default function MediaGalleryPopup({ title, buttonText, mediaItems }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Safety check: if mediaItems is empty, don't crash
  if (!mediaItems) return null;

  return (
    <>
      <div className="click-more-container">
        <MagneticButton 
          className="glitch-hover" 
          onClick={() => setIsOpen(true)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-secondary)', fontSize: '1rem', fontWeight: 'bold' }}
        >
          {buttonText || "VIEW FULL GALLERY →"}
        </MagneticButton>
      </div>

      {isOpen && mounted && createPortal(
        <div className="modal-backdrop" onClick={() => setIsOpen(false)} style={{ zIndex: 99999, background: '#0a0a0a' }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '1400px', width: '95%', height: '90vh', overflowY: 'auto', background: 'transparent', border: 'none', boxShadow: 'none' }}>
            
            <button className="glitch-hover" onClick={() => setIsOpen(false)} style={{ position: 'fixed', top: '40px', right: '50px', fontSize: '1.5rem', color: 'var(--accent-secondary)', background: 'rgba(15, 25, 35, 0.9)', border: '1px solid var(--accent-secondary)', padding: '10px 25px', cursor: 'pointer', zIndex: 999999, fontFamily: 'Teko, sans-serif', letterSpacing: '2px' }}>
              [ X ] CLOSE GALLERY
            </button>
            
            <h2 style={{ fontSize: '3rem', textAlign: 'left', marginBottom: '2rem', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
              {title || "FULL MEDIA ARCHIVE"}
            </h2>

            <div className="ff-media-grid">
              {mediaItems.map((item) => (
                // Use || fallback to handle both Sanity (thumbUrl) and dummy (thumb) data
                <div key={item._id || item.id} className="ff-media-card" onClick={() => setActiveItem(item)}>
                  <div className="ff-media-thumb">
                    <img src={item.thumbUrl || item.thumb} alt={item.title} />
                    <div className="ff-play-badge">
                      <i className={item.type === 'video' ? 'fa-solid fa-play' : 'fa-solid fa-camera'}></i>
                      {item.duration || 'IMAGE'}
                    </div>
                  </div>
                  <div className="ff-media-meta">
                    {item.date} <span className="ff-meta-divider">|</span> {item.category}
                  </div>
                  <div className="ff-media-title">{item.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}

      {activeItem && mounted && createPortal(
        <div className="lightbox-overlay" onClick={() => setActiveItem(null)}>
          <button className="glitch-hover" onClick={() => setActiveItem(null)} style={{ position: 'absolute', top: '40px', right: '50px', fontSize: '1.5rem', color: '#fff', background: 'transparent', border: '2px solid #fff', padding: '10px 25px', cursor: 'pointer', zIndex: 999999, fontFamily: 'Teko' }}>
            [ X ] CLOSE MEDIA
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={activeItem.thumbUrl || activeItem.thumb} alt={activeItem.title} />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}