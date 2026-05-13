import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import { BackroomsScene } from './components/BackroomsScene';
import { Player } from './components/Player';
import { HUD } from './components/HUD';
import { StartScreen } from './components/StartScreen';

export default function App() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return <StartScreen onStart={() => setStarted(true)} />;
  }

  return (
    <div style={{ width: '100vw', height: '100vh', cursor: 'none' }}>
      <Canvas
        shadows
        camera={{ fov: 70, near: 0.1, far: 200, position: [0, 1.6, 0] }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor('#1a1a00');
        }}
      >
        <fog attach="fog" args={['#2a2200', 0, 40]} />
        <BackroomsScene />
        <Player />
        <PointerLockControls />
      </Canvas>
      <HUD />
    </div>
  );
}
