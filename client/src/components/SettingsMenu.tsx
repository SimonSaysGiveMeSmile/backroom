import { useGame, Difficulty } from '../store/GameContext';
import { LEVELS } from '../levels/LevelConfig';

interface SettingsMenuProps {
  onClose: () => void;
}

export function SettingsMenu({ onClose }: SettingsMenuProps) {
  const { state, dispatch } = useGame();

  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    fontFamily: 'monospace',
    color: '#c8b560',
  };

  const panelStyle: React.CSSProperties = {
    background: '#1a1800',
    border: '1px solid #4a4020',
    padding: '30px',
    borderRadius: '4px',
    width: '500px',
    maxHeight: '80vh',
    overflowY: 'auto',
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '20px',
  };

  const headingStyle: React.CSSProperties = {
    fontSize: '14px',
    marginBottom: '8px',
    color: '#e8d080',
    borderBottom: '1px solid #3a3020',
    paddingBottom: '4px',
  };

  const btnStyle = (active: boolean): React.CSSProperties => ({
    padding: '6px 12px',
    margin: '2px 4px',
    background: active ? '#4a4020' : '#2a2010',
    border: `1px solid ${active ? '#8a7040' : '#3a3020'}`,
    color: active ? '#ffe080' : '#8a7a50',
    cursor: 'pointer',
    borderRadius: '2px',
    fontSize: '11px',
    fontFamily: 'monospace',
  });

  const actionBtnStyle: React.CSSProperties = {
    padding: '8px 20px',
    margin: '4px',
    background: '#3a3020',
    border: '1px solid #6a5030',
    color: '#e8d080',
    cursor: 'pointer',
    borderRadius: '2px',
    fontSize: '12px',
    fontFamily: 'monospace',
  };

  return (
    <div style={containerStyle} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={panelStyle}>
        <h2 style={{ fontSize: '18px', marginBottom: '20px', textAlign: 'center', color: '#ffe080' }}>
          SETTINGS
        </h2>

        <div style={sectionStyle}>
          <div style={headingStyle}>LEVEL SELECT</div>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {LEVELS.map(level => (
              <button
                key={level.id}
                style={btnStyle(state.level === level.id)}
                onClick={() => dispatch({ type: 'SET_LEVEL', level: level.id })}
              >
                {level.name} — {level.subtitle}
              </button>
            ))}
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={headingStyle}>DIFFICULTY</div>
          <div style={{ display: 'flex' }}>
            {(['easy', 'normal', 'hard'] as Difficulty[]).map(d => (
              <button
                key={d}
                style={btnStyle(state.difficulty === d)}
                onClick={() => dispatch({ type: 'SET_DIFFICULTY', difficulty: d })}
              >
                {d.toUpperCase()}
              </button>
            ))}
          </div>
          <div style={{ fontSize: '10px', marginTop: '6px', opacity: 0.6 }}>
            {state.difficulty === 'easy' && 'Fewer entities, slower, reduced detection.'}
            {state.difficulty === 'normal' && 'Standard experience.'}
            {state.difficulty === 'hard' && 'More entities, faster, increased detection.'}
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={headingStyle}>CONTROLS</div>
          <div style={{ fontSize: '10px', lineHeight: '1.8', opacity: 0.7 }}>
            <div>WASD / Arrows — Move</div>
            <div>Mouse — Look</div>
            <div>Shift — Sprint</div>
            <div>C — Crouch (reduces detection)</div>
            <div>Space — Melee attack</div>
            <div>ESC — Settings</div>
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={headingStyle}>INVENTORY</div>
          {state.inventory.length === 0 ? (
            <div style={{ fontSize: '10px', opacity: 0.5 }}>Empty</div>
          ) : (
            <div style={{ fontSize: '10px' }}>
              {state.inventory.map(item => (
                <div key={item.id}>{item.name} x{item.quantity}</div>
              ))}
            </div>
          )}
        </div>

        <div style={sectionStyle}>
          <div style={headingStyle}>CREDITS</div>
          <div style={{ fontSize: '10px', lineHeight: '1.8', opacity: 0.7 }}>
            <div>Created by SimonSaysGiveMeSmile</div>
            <div>AI-assisted development with Claude (Anthropic)</div>
            <div style={{ marginTop: '6px' }}>
              <a href="https://github.com/SimonSaysGiveMeSmile/backroom" target="_blank" rel="noopener noreferrer" style={{ color: '#c8b560', textDecoration: 'underline' }}>
                github.com/SimonSaysGiveMeSmile/backroom
              </a>
            </div>
            <div style={{ marginTop: '4px' }}>MIT License — Free and open source</div>
            <div style={{ marginTop: '6px', opacity: 0.6 }}>
              Tech: React Three Fiber, Three.js, TypeScript, WebSocket, Vite
            </div>
            <div style={{ opacity: 0.6 }}>
              Inspired by the Backrooms Wiki and SCP Foundation
            </div>
            <div style={{ marginTop: '6px', opacity: 0.5 }}>
              backrooms.online — v1.0.0
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button style={actionBtnStyle} onClick={onClose}>RESUME</button>
          <button style={actionBtnStyle} onClick={() => { dispatch({ type: 'RESTART' }); onClose(); }}>
            RESTART
          </button>
        </div>
      </div>
    </div>
  );
}
