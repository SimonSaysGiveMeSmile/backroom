import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EntityDef, EntityState } from '../entities/EntityData';

interface EntityProps {
  def: EntityDef;
  position: THREE.Vector3;
  state: EntityState;
}

export function Entity({ def, position, state }: EntityProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.position.copy(position);
    meshRef.current.position.y = def.scale[1] / 2;

    const t = clock.getElapsedTime();
    if (state === 'chase' || state === 'attack') {
      meshRef.current.position.y += Math.sin(t * 12) * 0.05;
    } else if (state === 'patrol') {
      meshRef.current.position.y += Math.sin(t * 2) * 0.02;
    }

    if (glowRef.current) {
      glowRef.current.position.copy(meshRef.current.position);
      glowRef.current.intensity = state === 'chase' ? 1.5 : state === 'alert' ? 1 : 0.5;
    }
  });

  const geometry = (() => {
    switch (def.shape) {
      case 'sphere': return <sphereGeometry args={[def.scale[0], 8, 8]} />;
      case 'box': return <boxGeometry args={def.scale} />;
      case 'cylinder': return <cylinderGeometry args={[def.scale[0], def.scale[2], def.scale[1], 8]} />;
      case 'cone': return <coneGeometry args={[def.scale[0], def.scale[1], 8]} />;
    }
  })();

  return (
    <group>
      <mesh ref={meshRef}>
        {geometry}
        <meshStandardMaterial
          color={def.color}
          emissive={def.emissive}
          emissiveIntensity={def.emissiveIntensity * (state === 'chase' ? 2 : 1)}
          roughness={0.8}
        />
      </mesh>
      {def.emissiveIntensity > 0.3 && (
        <pointLight
          ref={glowRef}
          color={def.emissive}
          intensity={0.5}
          distance={6}
          decay={2}
        />
      )}
    </group>
  );
}
