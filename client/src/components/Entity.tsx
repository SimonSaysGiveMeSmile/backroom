import { useRef, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EntityDef, EntityState } from '../entities/EntityData';

interface EntityProps {
  def: EntityDef;
  position: THREE.Vector3;
  state: EntityState;
}

function SmilerModel({ state }: { state: EntityState }) {
  const intensity = state === 'chase' ? 3 : state === 'alert' ? 2 : 1;
  return (
    <group>
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.35, 8, 6]} />
        <meshStandardMaterial color="#030303" roughness={1} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.12, 0.72, 0.26]}>
        <sphereGeometry args={[0.055, 6, 6]} />
        <meshBasicMaterial color="#ffff00" />
      </mesh>
      <mesh position={[0.12, 0.72, 0.26]}>
        <sphereGeometry args={[0.055, 6, 6]} />
        <meshBasicMaterial color="#ffff00" />
      </mesh>
      {/* Smile - single torus */}
      <mesh position={[0, 0.55, 0.28]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.1, 0.02, 4, 12, Math.PI]} />
        <meshBasicMaterial color="#ffff00" />
      </mesh>
      {/* Eye glow */}
      <pointLight color="#ffff00" intensity={intensity} distance={4} decay={2} position={[0, 0.7, 0.3]} />
    </group>
  );
}

function HumanoidModel({ color, headColor, height, eyeColor }: { color: string; headColor: string; height: number; eyeColor?: string }) {
  return (
    <group>
      <mesh position={[0, height - 0.15, 0]}>
        <sphereGeometry args={[0.13, 6, 6]} />
        <meshStandardMaterial color={headColor} roughness={0.7} />
      </mesh>
      {eyeColor && (
        <>
          <mesh position={[-0.05, height - 0.13, 0.1]}>
            <sphereGeometry args={[0.025, 4, 4]} />
            <meshBasicMaterial color={eyeColor} />
          </mesh>
          <mesh position={[0.05, height - 0.13, 0.1]}>
            <sphereGeometry args={[0.025, 4, 4]} />
            <meshBasicMaterial color={eyeColor} />
          </mesh>
        </>
      )}
      <mesh position={[0, height - 0.5, 0]}>
        <boxGeometry args={[0.28, 0.45, 0.16]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      <mesh position={[-0.2, height - 0.5, 0]}>
        <boxGeometry args={[0.07, 0.4, 0.07]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      <mesh position={[0.2, height - 0.5, 0]}>
        <boxGeometry args={[0.07, 0.4, 0.07]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      <mesh position={[-0.07, height - 1.0, 0]}>
        <boxGeometry args={[0.09, 0.45, 0.09]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      <mesh position={[0.07, height - 1.0, 0]}>
        <boxGeometry args={[0.09, 0.45, 0.09]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
    </group>
  );
}

function HoundModel({ state }: { state: EntityState }) {
  const eyeColor = state === 'chase' ? '#ff0000' : '#ff4400';
  return (
    <group>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.3, 0.25, 0.7]} />
        <meshStandardMaterial color="#1a0e0e" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.4, 0.4]}>
        <boxGeometry args={[0.18, 0.18, 0.22]} />
        <meshStandardMaterial color="#2a1515" roughness={0.9} />
      </mesh>
      {/* Snout */}
      <mesh position={[0, 0.36, 0.54]}>
        <boxGeometry args={[0.1, 0.08, 0.12]} />
        <meshStandardMaterial color="#1a0e0e" roughness={0.9} />
      </mesh>
      <mesh position={[-0.06, 0.44, 0.52]}>
        <sphereGeometry args={[0.025, 4, 4]} />
        <meshBasicMaterial color={eyeColor} />
      </mesh>
      <mesh position={[0.06, 0.44, 0.52]}>
        <sphereGeometry args={[0.025, 4, 4]} />
        <meshBasicMaterial color={eyeColor} />
      </mesh>
      {[[-0.1, 0.25], [0.1, 0.25], [-0.1, -0.25], [0.1, -0.25]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.14, z]}>
          <boxGeometry args={[0.05, 0.28, 0.05]} />
          <meshStandardMaterial color="#1a0e0e" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function CrawlerModel({ state }: { state: EntityState }) {
  return (
    <group>
      <mesh position={[0, 2.72, 0]}>
        <boxGeometry args={[0.5, 0.1, 0.5]} />
        <meshStandardMaterial color="#080808" roughness={1} />
      </mesh>
      {[0, 1, 2, 3, 4, 5].map(i => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.2, 2.55, Math.sin(angle) * 0.2]}>
            <cylinderGeometry args={[0.015, 0.01, 0.35, 3]} />
            <meshStandardMaterial color="#1a0505" roughness={0.9} />
          </mesh>
        );
      })}
      <mesh position={[0, 2.68, 0.22]}>
        <sphereGeometry args={[0.035, 4, 4]} />
        <meshBasicMaterial color={state === 'chase' ? '#ff0000' : '#880000'} />
      </mesh>
    </group>
  );
}

function PartygoerModel({ state }: { state: EntityState }) {
  return (
    <group>
      <HumanoidModel color="#cccc00" headColor="#ffee00" height={1.6} />
      <mesh position={[0, 1.38, 0.12]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.05, 0.012, 4, 8, Math.PI]} />
        <meshBasicMaterial color="#111100" />
      </mesh>
      <mesh position={[0, 1.55, 0]}>
        <coneGeometry args={[0.07, 0.18, 6]} />
        <meshStandardMaterial color="#ff00cc" emissive="#ff00cc" emissiveIntensity={0.4} />
      </mesh>
      {state === 'chase' && (
        <pointLight color="#ffee00" intensity={1.5} distance={3} decay={2} position={[0, 1, 0]} />
      )}
    </group>
  );
}

function DeathRatModel({ state }: { state: EntityState }) {
  return (
    <group>
      <mesh position={[0, 0.07, 0]}>
        <sphereGeometry args={[0.08, 6, 5]} />
        <meshStandardMaterial color="#2a1818" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.09, 0.08]}>
        <sphereGeometry args={[0.04, 5, 5]} />
        <meshStandardMaterial color="#3a2020" roughness={0.9} />
      </mesh>
      <mesh position={[-0.02, 0.11, 0.11]}>
        <sphereGeometry args={[0.012, 3, 3]} />
        <meshBasicMaterial color={state === 'chase' ? '#ff0000' : '#cc3333'} />
      </mesh>
      <mesh position={[0.02, 0.11, 0.11]}>
        <sphereGeometry args={[0.012, 3, 3]} />
        <meshBasicMaterial color={state === 'chase' ? '#ff0000' : '#cc3333'} />
      </mesh>
      <mesh position={[0, 0.05, -0.1]} rotation={[0.4, 0, 0]}>
        <cylinderGeometry args={[0.006, 0.004, 0.12, 3]} />
        <meshStandardMaterial color="#3a2020" />
      </mesh>
    </group>
  );
}

function DeathmothModel({ state }: { state: EntityState }) {
  return (
    <group>
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.1, 6, 5]} />
        <meshStandardMaterial color="#7a6a50" roughness={0.8} />
      </mesh>
      {/* Wings */}
      <mesh position={[-0.2, 1.5, 0]} rotation={[0, 0, 0.3]}>
        <planeGeometry args={[0.3, 0.2]} />
        <meshStandardMaterial color="#8a7a60" transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.2, 1.5, 0]} rotation={[0, 0, -0.3]}>
        <planeGeometry args={[0.3, 0.2]} />
        <meshStandardMaterial color="#8a7a60" transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 1.52, 0.08]}>
        <sphereGeometry args={[0.02, 4, 4]} />
        <meshBasicMaterial color={state === 'chase' ? '#ffaa00' : '#aa8844'} />
      </mesh>
    </group>
  );
}

function JerryModel() {
  return (
    <group>
      <HumanoidModel color="#3366aa" headColor="#5588cc" height={1.5} eyeColor="#88ccff" />
      <pointLight color="#3366aa" intensity={0.3} distance={3} decay={2} position={[0, 1, 0]} />
    </group>
  );
}

function DullerModel() {
  return (
    <group>
      <HumanoidModel color="#505050" headColor="#606060" height={1.5} />
      {/* Aura of dullness */}
      <mesh position={[0, 0.75, 0]}>
        <sphereGeometry args={[0.6, 8, 6]} />
        <meshBasicMaterial color="#404040" transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

function GenericModel({ def, state }: { def: EntityDef; state: EntityState }) {
  const geo = (() => {
    switch (def.shape) {
      case 'sphere': return <sphereGeometry args={[def.scale[0], 6, 6]} />;
      case 'box': return <boxGeometry args={def.scale} />;
      case 'cylinder': return <cylinderGeometry args={[def.scale[0], def.scale[2], def.scale[1], 6]} />;
      case 'cone': return <coneGeometry args={[def.scale[0], def.scale[1], 6]} />;
    }
  })();
  return (
    <mesh position={[0, def.scale[1] / 2, 0]}>
      {geo}
      <meshStandardMaterial
        color={def.color}
        emissive={def.emissive}
        emissiveIntensity={def.emissiveIntensity * (state === 'chase' ? 2 : 1)}
        roughness={0.8}
      />
    </mesh>
  );
}

export const Entity = memo(function Entity({ def, position, state }: EntityProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.position.set(position.x, 0, position.z);

    const t = clock.getElapsedTime();
    if (state === 'chase') {
      groupRef.current.position.y = Math.sin(t * 10) * 0.03;
    } else if (state === 'patrol') {
      groupRef.current.position.y = Math.sin(t * 2) * 0.01;
    }
  });

  const model = (() => {
    switch (def.id) {
      case 'smiler': return <SmilerModel state={state} />;
      case 'hound': return <HoundModel state={state} />;
      case 'facelings': return <HumanoidModel color="#c8b090" headColor="#b8a080" height={1.6} eyeColor="#000000" />;
      case 'skin-stealer': return <HumanoidModel color="#6a4030" headColor="#8a5040" height={1.7} eyeColor="#ff6600" />;
      case 'wretches': return <HumanoidModel color="#3a3a2a" headColor="#4a4a3a" height={1.2} eyeColor="#444400" />;
      case 'crawlers': return <CrawlerModel state={state} />;
      case 'dullers': return <DullerModel />;
      case 'partygoers': return <PartygoerModel state={state} />;
      case 'death-rats': return <DeathRatModel state={state} />;
      case 'deathmoths': return <DeathmothModel state={state} />;
      case 'jerry': return <JerryModel />;
      default: return <GenericModel def={def} state={state} />;
    }
  })();

  return <group ref={groupRef}>{model}</group>;
});
