"use client";
import { useState } from 'react';
import Head from 'next/head';
import Navbar from '../Navbar';

export default function StaffLogin() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState('');

  // Pull dynamic background path. Falls back to a local path if the env is missing.
  const bgImage = process.env.NEXT_PUBLIC_LOGIN_BG || '/images/stadium-bg.jpg';

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setError('');

    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        window.location.href = '/studio'; 
      } else {
        const data = await res.json();
        setError(`ACCESS DENIED: ${data.error}`);
        setIsAuthenticating(false);
      }
    } catch (err) {
      setError("SYSTEM ERROR: Connection failed.");
      setIsAuthenticating(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      position: 'relative',
      backgroundColor: '#0a0a0c',
      fontFamily: 'sans-serif',
      overflow: 'hidden'
    }}>
      <Head>
        <title>Staff Entry | Blox Cricket</title>
      </Head>

      {/* INJECTING GLITCH HOVER CSS ANIMATIONS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes glitch-anim {
          0% { clip-path: inset(40% 0 61% 0); transform: skew(0.3deg); }
          20% { clip-path: inset(92% 0 1% 0); transform: skew(-0.5deg); }
          40% { clip-path: inset(15% 0 80% 0); transform: skew(0.5deg); }
          60% { clip-path: inset(80% 0 5% 0); transform: skew(-0.3deg); }
          80% { clip-path: inset(3% 0 92% 0); transform: skew(0.8deg); }
          100% { clip-path: inset(40% 0 61% 0); transform: skew(0deg); }
        }
        .glitch-btn {
          position: relative;
          transition: transform 0.1s ease, box-shadow 0.2s ease;
        }
        .glitch-btn:hover:not(:disabled) {
          transform: scale(1.02);
          box-shadow: 0 0 25px rgba(242, 76, 24, 0.6) !important;
        }
        .glitch-btn:hover:not(:disabled)::after {
          content: 'BAT ON!';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(135deg, #ff8c42 0%, #f24c18 100%);
          text-shadow: -2px 0 #ff00c1, 2px 0 #00fff0;
          animation: glitch-anim 1s infinite linear alternate-reverse;
          border-radius: 6px;
          display: flex;
          alignItems: center;
          justifyContent: center;
          padding-top: 1px;
        }
      `}} />

      {/* 1. FIXED TOP NAVBAR */}
      <Navbar homepage={{}} />

      {/* 2. DYNAMIC ENVIRONMENT-DRIVEN BACKGROUND IMAGE */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0
      }} />

      {/* DARK OVERLAY BLENDER */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(10, 10, 14, 0.65)',
        zIndex: 1
      }} />

      {/* 3. CENTERED INTERFACE BOX */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 2,
        padding: '20px',
        marginTop: '60px'
      }}>
        
        <div style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: 'rgba(20, 22, 28, 0.75)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '40px 30px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
        }}>
          
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h1 style={{
              fontSize: '3.2rem',
              fontWeight: '900',
              margin: '0 0 12px 0',
              fontFamily: "'Teko', sans-serif",
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: '#ffffff',
              lineHeight: '1'
            }}>
              STAFF ENTRY
            </h1>
            <p style={{
              color: '#9aa0a6',
              fontSize: '0.95rem',
              lineHeight: '1.5',
              margin: 0,
              fontWeight: '400'
            }}>
              {isAuthenticating ? "Verifying match credentials..." : "Welcome back to the crease, player! Ready for your innings?"}
            </p>

            {error && (
              <div style={{
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid #ef4444',
                padding: '12px',
                marginTop: '20px',
                borderRadius: '6px',
                color: '#fca5a5',
                fontSize: '0.9rem',
                fontWeight: '600',
                textAlign: 'center'
              }}>
                {error}
              </div>
            )}
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div>
              <input
                name="username"
                type="text"
                placeholder="Player ID (Username)"
                required
                spellCheck="false"
                disabled={isAuthenticating}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  backgroundColor: 'rgba(10, 11, 14, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <input
                name="password"
                type="password"
                placeholder="Secret Pitch Code (Password)"
                required
                disabled={isAuthenticating}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  backgroundColor: 'rgba(10, 11, 14, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* ACTION GLITCH BUTTON */}
            <button
              type="submit"
              disabled={isAuthenticating}
              className="glitch-btn"
              style={{
                marginTop: '10px',
                padding: '14px',
                background: 'linear-gradient(135deg, #ff6b35 0%, #f24c18 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1.1rem',
                fontWeight: '800',
                fontFamily: "'Teko', sans-serif",
                textTransform: 'uppercase',
                letterSpacing: '1px',
                cursor: isAuthenticating ? 'not-allowed' : 'pointer',
                opacity: isAuthenticating ? 0.75 : 1,
                boxShadow: '0 4px 15px rgba(242, 76, 24, 0.3)'
              }}
            >
              {isAuthenticating ? "ENCRYPTING CONNECTION..." : "BAT ON!"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}