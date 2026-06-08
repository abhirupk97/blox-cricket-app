"use client";
import { useState, useRef, useEffect } from 'react';

export default function InlineExpand({ 
  children, 
  buttonTextOpen = "EXPAND", 
  buttonTextClose = "COLLAPSE", 
  buttonStyle = {},
  className = "" // Catches the 'glitch-hover' class
}) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState('0px');

  // Smoothly calculates the height of the content when opening/closing
  useEffect(() => {
    if (isOpen) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight('0px');
    }
  }, [isOpen, children]);

  // Dynamically figures out what text should be showing
  const currentText = isOpen ? buttonTextClose : buttonTextOpen;

  return (
    <div className="inline-expand-container" style={{ width: '100%' }}>
      
      {/* THE BUTTON CONTAINER */}
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: isOpen ? '1rem' : '0' }}>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          style={buttonStyle}
          className={className} 
          data-text={currentText} /* Dynamically feeds the exact text to your CSS glitch */
        >
          {currentText}
        </button>
      </div>

      {/* THE EXPANDING CONTENT */}
      <div 
        ref={contentRef}
        style={{ 
          height: height,
          overflow: 'hidden',
          opacity: isOpen ? 1 : 0,
          transition: 'height 0.4s ease-in-out, opacity 0.4s ease-in-out',
          width: '100%'
        }}
      >
        <div style={{ paddingBottom: '10px' }}>
          {children}
        </div>
      </div>

    </div>
  );
}