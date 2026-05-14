import { useState } from 'react';

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      localStorage.setItem('backrooms_email', email);
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
      <p style={{ fontSize: '0.7rem', opacity: 0.5, marginBottom: '1.5rem' }}>
        backrooms.online
      </p>
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
          Created by SimonSaysGiveMeSmile &bull; AI-assisted development with Claude
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