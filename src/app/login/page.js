"use client";
import { useState } from 'react';
import Head from 'next/head';
import Navbar from '../Navbar'; // Keeps your navbar consistent at the top

export default function StaffLogin() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState('');

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
        // Hard reload redirect to ensure the httpOnly cookie attaches properly
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
      fontFamily: 'sans-serif'
    }}>
      <Head>
        <title>Staff Entry | Blox Cricket</title>
      </Head>

      {/* 1. FIXED TOP NAVBAR */}
      <Navbar homepage={{}} />

      {/* 2. FULL VIEWPORT CRICKET BACKGROUND */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: "url('/images/stadium-bg.jpg')", // Ensure your stadium image path matches your public folder
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0
      }} />

      {/* DARK SHIELD OVERLAY */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(10, 10, 14, 0.65)',
        zIndex: 1
      }} />

      {/* 3. PERFECTLY CENTERED CARD WRAPPER */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 2,
        padding: '20px',
        marginTop: '60px' // Leaves space so it doesn't collide with the fixed Navbar
      }}>
        
        {/* THE STAFF ENTRY CONTAINER */}
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
          
          {/* HEADER HEADER */}
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

          {/* CREDENTIALS FORM */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* USERNAME FIELD */}
            <div style={{ position: 'relative' }}>
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
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
              />
            </div>

            {/* PASSWORD FIELD */}
            <div style={{ position: 'relative' }}>
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
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
              />
            </div>

            {/* ACTION BUTTON */}
            <button
              type="submit"
              disabled={isAuthenticating}
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
                boxShadow: '0 4px 15px rgba(242, 76, 24, 0.3)',
                transition: 'transform 0.1s, box-shadow 0.2s'
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