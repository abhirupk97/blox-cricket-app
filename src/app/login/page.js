"use client";
import Head from 'next/head';
import ParallaxBackground from '../ParallaxBackground'; 
import CursorTrail from '../CursorTrail';
import LagCursor from '../LagCursor';
import ScrambleText from '../ScrambleText';
import Navbar from '../Navbar'; // 1. Import your shared Navbar

export default function StaffLogin() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <CursorTrail />
      <LagCursor />
      
      {/* 2. Add the Navbar here at the top */}
      <Navbar homepage={{}} /> 

      <Head>
        <title>Staff Entry | Blox Cricket</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>

      <ParallaxBackground />
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(5, 5, 5, 0.4)', zIndex: -1 }}></div>

      {/* Login Box */}
      <div className="login-glass-box" style={{ marginTop: '100px' }}> {/* Added top margin to clear the navbar */}
        
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '3.5rem', margin: '0 0 10px 0', fontFamily: 'Teko, sans-serif', textTransform: 'uppercase', letterSpacing: '2px', color: '#fff' }}>
            STAFF ENTRY
          </h1>
          <p style={{ color: '#aaa', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
            Welcome back to the crease, player! Ready for your innings?
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="login-input-group">
            <i className="fa-solid fa-user"></i>
            <input type="text" className="login-input" placeholder="Player ID (Email/Phone)" required spellCheck="false" />
          </div>

          <div className="login-input-group">
            <i className="fa-solid fa-lock"></i>
            <input type="password" className="login-input" placeholder="Secret Pitch Code (Password)" required />
          </div>

          <button type="submit" className="tactical-btn glitch-hover" style={{ marginTop: '1rem' }}>
            <ScrambleText text="BAT ON!" />
          </button>
        </form>

        <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
          <a href="#reset" className="forgot-link">
            Lost your Pitch Code? <span>Click Here</span>
          </a>
        </div>
      </div>
    </div>
  );
}