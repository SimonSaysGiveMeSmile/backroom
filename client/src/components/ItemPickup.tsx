import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ItemDef } from '../items/ItemData';

interface ItemPickupProps {
  def: ItemDef;
  position: [number, number, number];
  onPickup: () => void;
  playerPos: THREE.Vector3;
}

export function ItemPickup({ def, position, onPickup, playerPos }: ItemPickupProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const collected = useRef(false);

  useFrame(({ clock }) => {
    if (!meshRef.current || collected.current) return;

    const t = clock.getElapsedTime();
    meshRef.current.position.y = position[1] + 0.3 + Math.sin(t * 2) * 0.1;
    meshRef.current.rotation.y = t * 1.5;

    const dist = meshRef.current.position.distanceTo(playerPos);
    if (dist < 1.5) {
      collected.current = true;
      onPickup();
    }
  });

  if (collected.current) return null;

  const geometry = (() => {
    switch (def.shape) {
      case 'sphere': return <sphereGeometry args={[def.scale[0], 8, 8]} />;
      case 'box': return <boxGeometry args={def.scale} />;
      case 'cylinder': return <cylinderGeometry args={[def.scale[0], def.scale[0], def.scale[1], 8]} />;
    }
  })();

  return (
    <mesh ref={meshRef} position={position}>
      {geometry}
      <meshStandardMaterial
        color={def.color}
        emissive={def.emissive}
        emissiveIntensity={0.8}
        roughness={0.3}
      />
    </mesh>
  );
}
