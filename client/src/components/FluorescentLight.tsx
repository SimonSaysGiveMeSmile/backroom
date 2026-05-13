import { useRef, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FluorescentLightProps {
  position: [number, number, number];
  lightColor?: string;
  lightIntensity?: number;
}

export const FluorescentLight = memo(function FluorescentLight({
  position,
  lightColor = '#fffde0',
  lightIntensity = 1.0,
}: FluorescentLightProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const flickerOffset = useRef(Math.random() * 1000);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + flickerOffset.current;
    const flicker = Math.sin(t * 60) * 0.04 + Math.sin(t * 0.7) * 0.03;
    const randomFlicker = Math.random() < 0.003 ? -0.3 : 0;
    const intensity = 0.85 + flicker + randomFlicker;

    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0.3, intensity);
    }
    if (lightRef.current) {
      lightRef.current.intensity = Math.max(0.1, lightIntensity * intensity);
    }
  });

  return (
    <group position={position}>
      <pointLight
        ref={lightRef}
        color={lightColor}
        intensity={lightIntensity}
        distance={10}
        decay={2}
      />
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[1.2, 0.05, 0.3]} />
        <meshStandardMaterial color="#666666" roughness={0.6} metalness={0.3} />
      </mesh>
      <mesh ref={meshRef} position={[0, -0.01, 0]}>
        <boxGeometry args={[1.0, 0.04, 0.1]} />
        <meshBasicMaterial color={lightColor} transparent opacity={0.9} />
      </mesh>
    </group>
  );
});
