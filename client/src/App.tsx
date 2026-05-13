import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import { BackroomsScene } from './components/BackroomsScene';
import { Player } from './components/Player';
import { HUD } from './components/HUD';
import { StartScreen } from './components/StartScreen';
import { SettingsMenu } from './components/SettingsMenu';
import { GameProvider, useGame } from './store/GameContext';
import { LEVELS } from './levels/LevelConfig';

function Game() {
  const { state, dispatch } = useGame();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const levelConfig = LEVELS[state.level];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        setSettingsOpen(prev => !prev);
        dispatch({ type: 'SET_PAUSED', paused: !settingsOpen });
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [settingsOpen, dispatch]);

  return (
    <div style={{ width: '100vw', height: '100vh', cursor: settingsOpen ? 'default' : 'none' }}>
      <Canvas
        camera={{ fov: 70, near: 0.1, far: 60, position: [0, 1.6, 0], rotation: [0, 0, 0] }}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        onCreated={({ gl, camera }) => {
          gl.setClearColor(levelConfig.fogColor);
          camera.lookAt(0, 1.6, -10);
        }}
      >
        <fog attach="fog" args={[levelConfig.fogColor, levelConfig.fogNear, levelConfig.fogFar]} />
        <BackroomsScene />
        <Player />
        {!settingsOpen && <PointerLockControls />}
      </Canvas>
      <HUD />
      {settingsOpen && (
        <SettingsMenu onClose={() => {
          setSettingsOpen(false);
          dispatch({ type: 'SET_PAUSED', paused: false });
        }} />
      )}
    </div>
  );
}

export default function App() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return <StartScreen onStart={() => setStarted(true)} />;
  }

  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}
