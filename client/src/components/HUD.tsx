import { useGame } from '../store/GameContext';
import { LEVELS } from '../levels/LevelConfig';
import { StatusBar } from './StatusBar';

export function HUD() {
  const { state } = useGame();
  const levelConfig = LEVELS[state.level];

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
      {/* Level indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '50px',
          left: '20px',
          fontFamily: 'monospace',
          fontSize: '11px',
          color: 'rgba(200, 180, 100, 0.3)',
        }}
      >
        {levelConfig.name} — {levelConfig.subtitle}
      </div>
      {/* Crouch indicator */}
      {state.isCrouching && (
        <div
          style={{
            position: 'absolute',
            bottom: '50px',
            right: '20px',
            fontFamily: 'monospace',
            fontSize: '10px',
            color: 'rgba(200, 180, 100, 0.4)',
          }}
        >
          [CROUCHING]
        </div>
      )}
      {/* Death screen */}
      {state.health <= 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(80, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <div style={{ fontFamily: 'monospace', fontSize: '24px', color: '#ff4444' }}>
            YOU DIED
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#aa4444', marginTop: '10px' }}>
            Press ESC to restart
          </div>
        </div>
      )}
      <StatusBar />
    </div>
  );
}
