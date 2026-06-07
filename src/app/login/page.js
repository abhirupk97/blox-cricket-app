'use client';
import { useState } from 'react';
 
export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
 
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
 
      if (res.ok) {
        // Hard redirect — forces browser to send the new cookie with the request
        window.location.href = '/studio';
      } else {
        const data = await res.json();
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0a0a',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{
        background: '#1a1a1a',
        border: '1px solid #333',
        borderTop: '3px solid #FFC107',
        padding: '3rem 2.5rem',
        width: '100%',
        maxWidth: '420px',
        borderRadius: '2px',
      }}>
        <h1 style={{
          fontFamily: 'Teko, sans-serif',
          fontSize: '2.5rem',
          color: '#FFC107',
          letterSpacing: '2px',
          marginBottom: '0.25rem',
          textTransform: 'uppercase',
        }}>
          STAFF LOGIN
        </h1>
        <p style={{
          color: '#555',
          fontSize: '0.8rem',
          marginBottom: '2rem',
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}>
          BLOX CRICKET — ADMIN ACCESS
        </p>
 
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
 
          <div>
            <label style={{
              display: 'block',
              color: '#666',
              fontSize: '0.75rem',
              letterSpacing: '1px',
              marginBottom: '6px',
              textTransform: 'uppercase',
            }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
              required
              style={{
                width: '100%',
                background: '#111',
                border: '1px solid #2a2a2a',
                borderRadius: '2px',
                padding: '10px 14px',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#FFC107'}
              onBlur={e => e.target.style.borderColor = '#2a2a2a'}
            />
          </div>
 
          <div>
            <label style={{
              display: 'block',
              color: '#666',
              fontSize: '0.75rem',
              letterSpacing: '1px',
              marginBottom: '6px',
              textTransform: 'uppercase',
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              style={{
                width: '100%',
                background: '#111',
                border: '1px solid #2a2a2a',
                borderRadius: '2px',
                padding: '10px 14px',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#FFC107'}
              onBlur={e => e.target.style.borderColor = '#2a2a2a'}
            />
          </div>
 
          {error && (
            <p style={{
              color: '#FF4655',
              fontSize: '0.85rem',
              letterSpacing: '0.5px',
              margin: '0',
            }}>
              ✕ {error}
            </p>
          )}
 
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? '#aa8500' : '#FFC107',
              color: '#000',
              border: 'none',
              padding: '12px',
              fontSize: '1rem',
              fontWeight: '700',
              letterSpacing: '2px',
              borderRadius: '2px',
              cursor: loading ? 'not-allowed' : 'pointer',
              textTransform: 'uppercase',
              transition: 'background 0.2s',
              marginTop: '0.5rem',
            }}
          >
            {loading ? 'VERIFYING...' : 'ENTER →'}
          </button>
 
        </form>
      </div>
    </div>
  );
}