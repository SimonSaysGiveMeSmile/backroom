import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FluorescentLightProps {
  position: [number, number, number];
}

export function FluorescentLight({ position }: FluorescentLightProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const flickerOffset = useRef(Math.random() * 1000);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() + flickerOffset.current;
    const flicker = Math.sin(t * 60) * 0.05;
    const randomFlicker = Math.random() < 0.003 ? -0.4 : 0;
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.85 + flicker + randomFlicker;
  });

  return (
    <group position={position}>
      {/* Light fixture housing */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[1.2, 0.05, 0.3]} />
        <meshStandardMaterial color="#777777" roughness={0.7} />
      </mesh>
      {/* Light tube glow */}
      <mesh ref={meshRef} position={[0, -0.01, 0]}>
        <boxGeometry args={[1.0, 0.04, 0.1]} />
        <meshBasicMaterial color="#fffde8" transparent opacity={0.9} />
      </mesh>
    </group>
  );
}
