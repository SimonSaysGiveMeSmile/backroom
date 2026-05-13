export function HUD() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      {/* Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%)',
        }}
      />
      {/* Scanlines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
          opacity: 0.5,
        }}
      />
      {/* Crosshair */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          background: 'rgba(200, 180, 100, 0.3)',
        }}
      />
      {/* Corner text */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          fontFamily: 'monospace',
          fontSize: '11px',
          color: 'rgba(200, 180, 100, 0.2)',
        }}
      >
        LEVEL 0 — THRESHOLD
      </div>
    </div>
  );
}
