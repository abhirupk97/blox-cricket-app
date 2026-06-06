"use client";
import { useState } from 'react';
import MagneticButton from './MagneticButton';

export default function InlineExpand({ buttonTextOpen, buttonTextClose, buttonStyle, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ width: '100%' }}>
      
      {/* The Trigger Button */}
      <MagneticButton 
        onClick={() => setIsOpen(!isOpen)}
        className="glitch-hover"
        style={buttonStyle}
      >
        {isOpen ? buttonTextClose : buttonTextOpen}
      </MagneticButton>

      {/* The Sliding Content Wrapper */}
      <div className={`inline-expand-wrapper ${isOpen ? 'is-expanded' : ''}`}>
        <div className="inline-expand-inner">
          {children}
        </div>
      </div>

    </div>
  );
}