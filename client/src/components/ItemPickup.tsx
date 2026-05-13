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
  const groupRef = useRef<THREE.Group>(null);
  const collected = useRef(false);

  useFrame(({ clock }) => {
    if (!groupRef.current || collected.current) return;

    const t = clock.getElapsedTime();
    groupRef.current.position.set(position[0], position[1] + 0.4 + Math.sin(t * 2.5) * 0.08, position[2]);
    groupRef.current.rotation.y = t * 1.8;

    const dx = groupRef.current.position.x - playerPos.x;
    const dz = groupRef.current.position.z - playerPos.z;
    const dist = Math.sqrt(dx * dx + dz * dz);

    if (dist < 1.5) {
      collected.current = true;
      onPickup();
    }
  });

  if (collected.current) return null;

  const geometry = (() => {
    switch (def.shape) {
      case 'sphere': return <sphereGeometry args={[def.scale[0], 10, 10]} />;
      case 'box': return <boxGeometry args={def.scale} />;
      case 'cylinder': return <cylinderGeometry args={[def.scale[0], def.scale[0], def.scale[1], 10]} />;
    }
  })();

  return (
    <group ref={groupRef} position={position}>
      {/* Item mesh */}
      <mesh>
        {geometry}
        <meshStandardMaterial
          color={def.color}
          emissive={def.emissive}
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
      {/* Glow ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.15, 0]}>
        <ringGeometry args={[0.2, 0.25, 16]} />
        <meshBasicMaterial color={def.emissive} transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      {/* Point light for item glow */}
      <pointLight color={def.emissive} intensity={0.4} distance={3} decay={2} />
    </group>
  );
}
