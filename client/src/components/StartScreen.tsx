interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
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
        cursor: 'pointer',
      }}
      onClick={onStart}
    >
      <h1
        style={{
          fontSize: '3rem',
          marginBottom: '1rem',
          textShadow: '0 0 20px #c8b56044',
          letterSpacing: '0.3em',
        }}
      >
        THE BACKROOMS
      </h1>
      <p style={{ fontSize: '0.9rem', opacity: 0.6, marginBottom: '2rem', maxWidth: '500px', textAlign: 'center', lineHeight: 1.6 }}>
        If you're not careful and noclip out of reality in the wrong areas, you'll end up in the Backrooms,
        where it's nothing but the stink of old moist carpet, the madness of mono-yellow, and the endless
        background noise of fluorescent lights at maximum hum-buzz.
      </p>
      <p style={{ fontSize: '0.8rem', opacity: 0.4, animation: 'pulse 2s infinite' }}>
        [ click anywhere to enter ]
      </p>
      <p style={{ fontSize: '0.7rem', opacity: 0.3, marginTop: '2rem' }}>
        WASD to move &bull; Mouse to look &bull; Shift to run
      </p>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
