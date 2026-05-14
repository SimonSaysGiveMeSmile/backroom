import { useRef, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ItemDef } from '../items/ItemData';

interface ItemPickupProps {
  def: ItemDef;
  position: [number, number, number];
  onPickup: () => void;
  playerPos: THREE.Vector3;
}

export const ItemPickup = memo(function ItemPickup({ def, position, onPickup, playerPos }: ItemPickupProps) {
  const groupRef = useRef<THREE.Group>(null);
  const collected = useRef(false);

  useFrame(({ clock }) => {
    if (!groupRef.current || collected.current) return;

    const t = clock.getElapsedTime();
    groupRef.current.position.set(position[0], position[1] + 0.4 + Math.sin(t * 2.5) * 0.06, position[2]);
    groupRef.current.rotation.y = t * 1.5;

    const dx = position[0] - playerPos.x;
    const dz = position[2] - playerPos.z;
    if (dx * dx + dz * dz < 2.25) {
      collected.current = true;
      onPickup();
    }
  });

  if (collected.current) return null;

  const geometry = (() => {
    switch (def.shape) {
      case 'sphere': return <sphereGeometry args={[def.scale[0], 8, 6]} />;
      case 'box': return <boxGeometry args={def.scale} />;
      case 'cylinder': return <cylinderGeometry args={[def.scale[0], def.scale[0], def.scale[1], 8]} />;
    }
  })();

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        {geometry}
        <meshStandardMaterial
          color={def.color}
          emissive={def.emissive}
          emissiveIntensity={1.5}
          roughness={0.2}
        />
      </mesh>
      {/* Glow disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
        <circleGeometry args={[0.2, 8]} />
        <meshBasicMaterial color={def.emissive} transparent opacity={0.25} />
      </mesh>
    </group>
  );
});
