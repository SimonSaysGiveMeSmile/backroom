import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FluorescentLightProps {
  position: [number, number, number];
}

export function FluorescentLight({ position }: FluorescentLightProps) {
  const lightRef = useRef<THREE.PointLight>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const flickerOffset = useRef(Math.random() * 1000);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + flickerOffset.current;
    const flicker = Math.sin(t * 60) * 0.02 + Math.sin(t * 120) * 0.01;
    const slowPulse = Math.sin(t * 0.5) * 0.05;
    const randomFlicker = Math.random() < 0.002 ? -0.3 : 0;

    const intensity = 0.8 + flicker + slowPulse + randomFlicker;

    if (lightRef.current) {
      lightRef.current.intensity = Math.max(0.1, intensity);
    }
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.6 + intensity * 0.4;
    }
  });

  return (
    <group position={position}>
      <pointLight
        ref={lightRef}
        color="#f0e8a0"
        intensity={0.8}
        distance={12}
        decay={2}
        castShadow={false}
      />
      {/* Light fixture housing */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[1.2, 0.05, 0.3]} />
        <meshStandardMaterial color="#888888" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Light tube */}
      <mesh ref={meshRef} position={[0, -0.02, 0]}>
        <boxGeometry args={[1.0, 0.03, 0.08]} />
        <meshBasicMaterial color="#fffde0" transparent opacity={0.9} />
      </mesh>
    </group>
  );
}
