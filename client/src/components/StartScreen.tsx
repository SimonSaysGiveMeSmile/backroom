import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [playerCount, setPlayerCount] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/api/players`).then(r => r.json()).then(d => setPlayerCount(d.count)).catch(() => {});
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      fetch(`${API_URL}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      }).catch(() => {});
      setEmailSubmitted(true);
    }
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: '#0a0a00',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'monospace',
        color: '#c8b560',
        overflow: 'auto',
      }}
    >
      <h1
        style={{
          fontSize: '3rem',
          marginBottom: '0.5rem',
          textShadow: '0 0 20px #c8b56044',
          letterSpacing: '0.3em',
        }}
      >
        THE BACKROOMS
      </h1>
      <p style={{ fontSize: '0.7rem', opacity: 0.5, marginBottom: '0.5rem' }}>
        backrooms.online
      </p>
      {playerCount > 0 && (
        <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '1.5rem', color: '#88cc88' }}>
          {playerCount} {playerCount === 1 ? 'wanderer' : 'wanderers'} online
        </p>
      )}
      <p style={{ fontSize: '0.9rem', opacity: 0.6, marginBottom: '1.5rem', maxWidth: '500px', textAlign: 'center', lineHeight: 1.6 }}>
        If you're not careful and noclip out of reality in the wrong areas, you'll end up in the Backrooms,
        where it's nothing but the stink of old moist carpet, the madness of mono-yellow, and the endless
        background noise of fluorescent lights at maximum hum-buzz.
      </p>

      <button
        onClick={onStart}
        style={{
          background: '#c8b560',
          color: '#0a0a00',
          border: 'none',
          padding: '12px 40px',
          fontSize: '1rem',
          fontFamily: 'monospace',
          fontWeight: 'bold',
          cursor: 'pointer',
          letterSpacing: '0.15em',
          marginBottom: '1.5rem',
        }}
      >
        ENTER THE BACKROOMS
      </button>

      <p style={{ fontSize: '0.7rem', opacity: 0.3, marginBottom: '1.5rem' }}>
        WASD to move &bull; Mouse to look &bull; Left click to attack &bull; Shift to run &bull; C to crouch &bull; ESC for settings
      </p>

      {/* Email signup */}
      <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        {!emailSubmitted ? (
          <form onSubmit={handleEmailSubmit} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              aria-label="Email address for updates"
              style={{
                background: '#1a1a0a',
                border: '1px solid #c8b56044',
                color: '#c8b560',
                padding: '8px 12px',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                width: '200px',
              }}
            />
            <button
              type="submit"
              style={{
                background: '#c8b56033',
                border: '1px solid #c8b56044',
                color: '#c8b560',
                padding: '8px 12px',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              Notify me
            </button>
          </form>
        ) : (
          <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Thanks! We'll keep you updated.</p>
        )}
        <p style={{ fontSize: '0.65rem', opacity: 0.3, marginTop: '4px' }}>
          Get notified about multiplayer events and updates
        </p>
      </div>

      {/* Creator section */}
      <div style={{ marginBottom: '1.2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.75rem', opacity: 0.7, marginBottom: '8px', color: '#c8b560' }}>
          Created by Simon Tian
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* GitHub */}
          <a
            href="https://github.com/SimonSaysGiveMeSmile"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#c8b560', textDecoration: 'none', fontSize: '0.7rem', opacity: 0.8 }}
            aria-label="GitHub"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.31-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.87.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 0z" />
            </svg>
            github.com/SimonSaysGiveMeSmile
          </a>
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/simon-tian-1333a3156"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#c8b560', textDecoration: 'none', fontSize: '0.7rem', opacity: 0.8 }}
            aria-label="LinkedIn"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
            </svg>
            linkedin.com/in/simon-tian
          </a>
          {/* X / Twitter */}
          <a
            href="https://x.com/realsimontian"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#c8b560', textDecoration: 'none', fontSize: '0.7rem', opacity: 0.8 }}
            aria-label="X (Twitter)"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
            </svg>
            x.com/realsimontian
          </a>
        </div>
      </div>

      {/* Credits and open source info */}
      <div style={{ textAlign: 'center', opacity: 0.5, fontSize: '0.7rem', lineHeight: 2, maxWidth: '500px' }}>
        <p style={{ marginBottom: '6px', fontSize: '0.75rem', opacity: 0.8 }}>
          A free, open-source tribute to the Backrooms community
        </p>
        <p>
          <a
            href="https://github.com/SimonSaysGiveMeSmile/backroom"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#c8b560', textDecoration: 'underline' }}
          >
            GitHub — SimonSaysGiveMeSmile/backroom
          </a>
        </p>
        <p style={{ opacity: 0.7 }}>
          MIT License &bull; Contributions welcome &bull; v1.0.0
        </p>
        <p style={{ marginTop: '8px', opacity: 0.6 }}>
          Built with React Three Fiber &bull; Three.js &bull; TypeScript &bull; WebSocket Multiplayer
        </p>
        <p style={{ opacity: 0.5 }}>
          Inspired by the Backrooms Wiki &bull; SCP Foundation community
        </p>
        <p style={{ marginTop: '10px', opacity: 0.4, fontSize: '0.6rem' }}>
          AI-assisted development with Claude
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}