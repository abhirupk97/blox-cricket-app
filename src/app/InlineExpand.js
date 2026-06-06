'use client';
import { useState } from 'react';

export default function InlineExpand({ buttonTextOpen, buttonTextClose, buttonStyle, children }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{ width: '100%' }}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={buttonStyle}
      >
        {isExpanded ? buttonTextClose : buttonTextOpen}
      </button>

      <div
        className={`inline-expand-wrapper ${isExpanded ? 'is-expanded' : ''}`}
        style={{ width: '100%' }}
      >
        <div className="inline-expand-inner">
          {children}
        </div>
      </div>
    </div>
  );
}