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
      {/* Dark floating head - barely visible in darkness */}
      <mesh position={[0, 1.4, 0]}>
        <sphereGeometry args={[0.3, 10, 8]} />
        <meshStandardMaterial color="#020202" roughness={1} />
      </mesh>
      {/* Wispy dark body that fades */}
      <mesh position={[0, 0.8, 0]}>
        <coneGeometry args={[0.25, 1.2, 8]} />
        <meshStandardMaterial color="#050505" transparent opacity={0.4} roughness={1} />
      </mesh>
      {/* Left eye - glowing yellow */}
      <mesh position={[-0.1, 1.5, 0.22]}>
        <sphereGeometry args={[0.045, 6, 6]} />
        <meshBasicMaterial color="#ffff00" />
      </mesh>
      {/* Right eye */}
      <mesh position={[0.1, 1.5, 0.22]}>
        <sphereGeometry args={[0.045, 6, 6]} />
        <meshBasicMaterial color="#ffff00" />
      </mesh>
      {/* Wide crescent smile */}
      <mesh position={[0, 1.3, 0.24]} rotation={[0.1, 0, 0]}>
        <torusGeometry args={[0.12, 0.015, 4, 16, Math.PI]} />
        <meshBasicMaterial color="#ffff00" />
      </mesh>
      <pointLight color="#ffff00" intensity={intensity * 0.5} distance={5} decay={2} position={[0, 1.4, 0.3]} />
    </group>
  );
}

function HoundModel({ state }: { state: EntityState }) {
  const eyeColor = state === 'chase' ? '#ff0000' : '#ff4400';
  return (
    <group>
      {/* Muscular body */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[0.35, 0.3, 0.8]} />
        <meshStandardMaterial color="#1a0808" roughness={0.95} />
      </mesh>
      {/* Ribcage detail */}
      <mesh position={[0, 0.42, -0.1]}>
        <boxGeometry args={[0.38, 0.25, 0.4]} />
        <meshStandardMaterial color="#200e0e" roughness={0.9} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.5, 0.4]}>
        <boxGeometry args={[0.22, 0.2, 0.25]} />
        <meshStandardMaterial color="#2a1010" roughness={0.9} />
      </mesh>
      {/* Elongated snout with teeth */}
      <mesh position={[0, 0.45, 0.58]}>
        <boxGeometry args={[0.12, 0.1, 0.18]} />
        <meshStandardMaterial color="#1a0808" roughness={0.9} />
      </mesh>
      {/* Teeth */}
      <mesh position={[0, 0.42, 0.65]}>
        <boxGeometry args={[0.08, 0.03, 0.04]} />
        <meshBasicMaterial color="#ccccaa" />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.08, 0.54, 0.52]}>
        <sphereGeometry args={[0.025, 4, 4]} />
        <meshBasicMaterial color={eyeColor} />
      </mesh>
      <mesh position={[0.08, 0.54, 0.52]}>
        <sphereGeometry args={[0.025, 4, 4]} />
        <meshBasicMaterial color={eyeColor} />
      </mesh>
      {/* Four legs */}
      {[[-0.12, 0.3], [0.12, 0.3], [-0.12, -0.3], [0.12, -0.3]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.17, z]}>
          <boxGeometry args={[0.06, 0.34, 0.06]} />
          <meshStandardMaterial color="#1a0808" roughness={0.9} />
        </mesh>
      ))}
      {/* Tail */}
      <mesh position={[0, 0.45, -0.45]} rotation={[0.5, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.01, 0.2, 4]} />
        <meshStandardMaterial color="#1a0808" />
      </mesh>
    </group>
  );
}

function FacelingModel({ state }: { state: EntityState }) {
  return (
    <group>
      {/* Smooth featureless head */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.14, 10, 8]} />
        <meshStandardMaterial color="#d4b898" roughness={0.6} />
      </mesh>
      {/* Body - plain clothes */}
      <mesh position={[0, 1.0, 0]}>
        <boxGeometry args={[0.3, 0.6, 0.18]} />
        <meshStandardMaterial color="#8a7a6a" roughness={0.9} />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.22, 1.0, 0]}>
        <boxGeometry args={[0.08, 0.5, 0.08]} />
        <meshStandardMaterial color="#8a7a6a" roughness={0.9} />
      </mesh>
      <mesh position={[0.22, 1.0, 0]}>
        <boxGeometry args={[0.08, 0.5, 0.08]} />
        <meshStandardMaterial color="#8a7a6a" roughness={0.9} />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.08, 0.4, 0]}>
        <boxGeometry args={[0.1, 0.6, 0.1]} />
        <meshStandardMaterial color="#5a4a3a" roughness={0.9} />
      </mesh>
      <mesh position={[0.08, 0.4, 0]}>
        <boxGeometry args={[0.1, 0.6, 0.1]} />
        <meshStandardMaterial color="#5a4a3a" roughness={0.9} />
      </mesh>
    </group>
  );
}

function SkinStealerModel({ state }: { state: EntityState }) {
  const eyeColor = state === 'chase' ? '#ff8800' : '#ff6600';
  return (
    <group>
      {/* Elongated head */}
      <mesh position={[0, 1.65, 0]}>
        <sphereGeometry args={[0.12, 8, 6]} />
        <meshStandardMaterial color="#7a5040" roughness={0.7} />
      </mesh>
      {/* Glowing eyes */}
      <mesh position={[-0.04, 1.67, 0.1]}>
        <sphereGeometry args={[0.02, 4, 4]} />
        <meshBasicMaterial color={eyeColor} />
      </mesh>
      <mesh position={[0.04, 1.67, 0.1]}>
        <sphereGeometry args={[0.02, 4, 4]} />
        <meshBasicMaterial color={eyeColor} />
      </mesh>
      {/* Thin stretched torso */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.25, 0.7, 0.12]} />
        <meshStandardMaterial color="#6a4030" roughness={0.8} />
      </mesh>
      {/* Elongated arms */}
      <mesh position={[-0.2, 1.0, 0]} rotation={[0, 0, 0.1]}>
        <boxGeometry args={[0.06, 0.8, 0.06]} />
        <meshStandardMaterial color="#7a5040" roughness={0.8} />
      </mesh>
      <mesh position={[0.2, 1.0, 0]} rotation={[0, 0, -0.1]}>
        <boxGeometry args={[0.06, 0.8, 0.06]} />
        <meshStandardMaterial color="#7a5040" roughness={0.8} />
      </mesh>
      {/* Long fingers */}
      <mesh position={[-0.22, 0.55, 0]}>
        <boxGeometry args={[0.08, 0.12, 0.03]} />
        <meshStandardMaterial color="#8a6050" roughness={0.7} />
      </mesh>
      <mesh position={[0.22, 0.55, 0]}>
        <boxGeometry args={[0.08, 0.12, 0.03]} />
        <meshStandardMaterial color="#8a6050" roughness={0.7} />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.07, 0.45, 0]}>
        <boxGeometry args={[0.08, 0.7, 0.08]} />
        <meshStandardMaterial color="#5a3020" roughness={0.9} />
      </mesh>
      <mesh position={[0.07, 0.45, 0]}>
        <boxGeometry args={[0.08, 0.7, 0.08]} />
        <meshStandardMaterial color="#5a3020" roughness={0.9} />
      </mesh>
    </group>
  );
}

function WretchModel({ state }: { state: EntityState }) {
  return (
    <group>
      {/* Hunched head low */}
      <mesh position={[0, 0.9, 0.15]}>
        <sphereGeometry args={[0.1, 6, 6]} />
        <meshStandardMaterial color="#5a5a3a" roughness={0.9} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.03, 0.92, 0.23]}>
        <sphereGeometry args={[0.015, 4, 4]} />
        <meshBasicMaterial color={state === 'chase' ? '#ffff00' : '#666600'} />
      </mesh>
      <mesh position={[0.03, 0.92, 0.23]}>
        <sphereGeometry args={[0.015, 4, 4]} />
        <meshBasicMaterial color={state === 'chase' ? '#ffff00' : '#666600'} />
      </mesh>
      {/* Hunched body */}
      <mesh position={[0, 0.7, 0]} rotation={[0.4, 0, 0]}>
        <boxGeometry args={[0.25, 0.4, 0.2]} />
        <meshStandardMaterial color="#4a4a2a" roughness={0.95} />
      </mesh>
      {/* Dragging arms */}
      <mesh position={[-0.18, 0.5, 0.1]} rotation={[0.6, 0, 0.2]}>
        <boxGeometry args={[0.06, 0.5, 0.06]} />
        <meshStandardMaterial color="#5a5a3a" roughness={0.9} />
      </mesh>
      <mesh position={[0.18, 0.5, 0.1]} rotation={[0.6, 0, -0.2]}>
        <boxGeometry args={[0.06, 0.5, 0.06]} />
        <meshStandardMaterial color="#5a5a3a" roughness={0.9} />
      </mesh>
      {/* Short legs */}
      <mesh position={[-0.07, 0.25, 0]}>
        <boxGeometry args={[0.08, 0.4, 0.08]} />
        <meshStandardMaterial color="#3a3a2a" roughness={0.95} />
      </mesh>
      <mesh position={[0.07, 0.25, 0]}>
        <boxGeometry args={[0.08, 0.4, 0.08]} />
        <meshStandardMaterial color="#3a3a2a" roughness={0.95} />
      </mesh>
    </group>
  );
}
// MODELS_CONTINUE

function CrawlerModel({ state }: { state: EntityState }) {
  return (
    <group>
      {/* Flat body on ceiling */}
      <mesh position={[0, 2.75, 0]}>
        <boxGeometry args={[0.6, 0.08, 0.5]} />
        <meshStandardMaterial color="#0a0a0a" roughness={1} />
      </mesh>
      {/* Multiple spindly legs hanging down */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
        const angle = (i / 8) * Math.PI * 2;
        const r = 0.22;
        return (
          <mesh key={i} position={[Math.cos(angle) * r, 2.55, Math.sin(angle) * r]} rotation={[Math.cos(angle) * 0.3, 0, Math.sin(angle) * 0.3]}>
            <cylinderGeometry args={[0.012, 0.008, 0.4, 3]} />
            <meshStandardMaterial color="#1a0505" roughness={0.9} />
          </mesh>
        );
      })}
      {/* Single red eye */}
      <mesh position={[0, 2.72, 0.26]}>
        <sphereGeometry args={[0.04, 6, 6]} />
        <meshBasicMaterial color={state === 'chase' ? '#ff0000' : '#880000'} />
      </mesh>
    </group>
  );
}

function DullerModel() {
  return (
    <group>
      {/* Featureless gray humanoid */}
      <mesh position={[0, 1.35, 0]}>
        <sphereGeometry args={[0.12, 8, 6]} />
        <meshStandardMaterial color="#707070" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[0.28, 0.55, 0.16]} />
        <meshStandardMaterial color="#606060" roughness={0.7} />
      </mesh>
      <mesh position={[-0.07, 0.35, 0]}>
        <boxGeometry args={[0.09, 0.5, 0.09]} />
        <meshStandardMaterial color="#555555" roughness={0.8} />
      </mesh>
      <mesh position={[0.07, 0.35, 0]}>
        <boxGeometry args={[0.09, 0.5, 0.09]} />
        <meshStandardMaterial color="#555555" roughness={0.8} />
      </mesh>
      {/* Dullness aura */}
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.7, 12, 8]} />
        <meshBasicMaterial color="#505050" transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.5, 10, 6]} />
        <meshBasicMaterial color="#404040" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

function PartygoerModel({ state }: { state: EntityState }) {
  return (
    <group>
      {/* Bright yellow body */}
      <mesh position={[0, 1.35, 0]}>
        <sphereGeometry args={[0.14, 8, 6]} />
        <meshStandardMaterial color="#ffee00" emissive="#ffee00" emissiveIntensity={0.3} roughness={0.5} />
      </mesh>
      {/* Wide permanent smile */}
      <mesh position={[0, 1.28, 0.12]} rotation={[0.1, 0, 0]}>
        <torusGeometry args={[0.06, 0.012, 4, 12, Math.PI]} />
        <meshBasicMaterial color="#111100" />
      </mesh>
      {/* Dark eye dots */}
      <mesh position={[-0.04, 1.37, 0.12]}>
        <sphereGeometry args={[0.02, 4, 4]} />
        <meshBasicMaterial color="#111100" />
      </mesh>
      <mesh position={[0.04, 1.37, 0.12]}>
        <sphereGeometry args={[0.02, 4, 4]} />
        <meshBasicMaterial color="#111100" />
      </mesh>
      {/* Party hat */}
      <mesh position={[0, 1.55, 0]}>
        <coneGeometry args={[0.08, 0.2, 6]} />
        <meshStandardMaterial color="#ff00cc" emissive="#ff00cc" emissiveIntensity={0.4} />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[0.3, 0.55, 0.18]} />
        <meshStandardMaterial color="#eedd00" emissive="#ffee00" emissiveIntensity={0.2} roughness={0.6} />
      </mesh>
      {/* Arms reaching out */}
      <mesh position={[-0.22, 1.0, 0.1]} rotation={[0.3, 0, 0.3]}>
        <boxGeometry args={[0.07, 0.45, 0.07]} />
        <meshStandardMaterial color="#eecc00" roughness={0.6} />
      </mesh>
      <mesh position={[0.22, 1.0, 0.1]} rotation={[0.3, 0, -0.3]}>
        <boxGeometry args={[0.07, 0.45, 0.07]} />
        <meshStandardMaterial color="#eecc00" roughness={0.6} />
      </mesh>
      <mesh position={[-0.07, 0.35, 0]}>
        <boxGeometry args={[0.09, 0.5, 0.09]} />
        <meshStandardMaterial color="#ddcc00" roughness={0.7} />
      </mesh>
      <mesh position={[0.07, 0.35, 0]}>
        <boxGeometry args={[0.09, 0.5, 0.09]} />
        <meshStandardMaterial color="#ddcc00" roughness={0.7} />
      </mesh>
      {state === 'chase' && (
        <pointLight color="#ffee00" intensity={1.5} distance={4} decay={2} position={[0, 1, 0]} />
      )}
    </group>
  );
}

function DeathRatModel({ state }: { state: EntityState }) {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 0.08, 0]} rotation={[0.1, 0, 0]}>
        <sphereGeometry args={[0.09, 8, 6]} />
        <meshStandardMaterial color="#2a1818" roughness={0.9} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.1, 0.09]}>
        <sphereGeometry args={[0.05, 6, 5]} />
        <meshStandardMaterial color="#3a2020" roughness={0.9} />
      </mesh>
      {/* Ears */}
      <mesh position={[-0.03, 0.14, 0.08]}>
        <sphereGeometry args={[0.015, 4, 4]} />
        <meshStandardMaterial color="#4a2828" roughness={0.8} />
      </mesh>
      <mesh position={[0.03, 0.14, 0.08]}>
        <sphereGeometry args={[0.015, 4, 4]} />
        <meshStandardMaterial color="#4a2828" roughness={0.8} />
      </mesh>
      {/* Glowing red eyes */}
      <mesh position={[-0.02, 0.11, 0.13]}>
        <sphereGeometry args={[0.01, 4, 4]} />
        <meshBasicMaterial color={state === 'chase' ? '#ff0000' : '#cc3333'} />
      </mesh>
      <mesh position={[0.02, 0.11, 0.13]}>
        <sphereGeometry args={[0.01, 4, 4]} />
        <meshBasicMaterial color={state === 'chase' ? '#ff0000' : '#cc3333'} />
      </mesh>
      {/* Hairless tail */}
      <mesh position={[0, 0.06, -0.12]} rotation={[0.5, 0, 0]}>
        <cylinderGeometry args={[0.005, 0.003, 0.15, 3]} />
        <meshStandardMaterial color="#4a2828" roughness={0.7} />
      </mesh>
    </group>
  );
}

function DeathmothModel({ state }: { state: EntityState }) {
  const wingFlap = state === 'chase' ? 0.5 : 0.2;
  return (
    <group>
      {/* Fuzzy body */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.08, 8, 6]} />
        <meshStandardMaterial color="#7a6a50" roughness={1} />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.09, 6, 4]} />
        <meshStandardMaterial color="#8a7a60" transparent opacity={0.4} roughness={1} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.55, 0.08]}>
        <sphereGeometry args={[0.04, 6, 5]} />
        <meshStandardMaterial color="#6a5a40" roughness={0.9} />
      </mesh>
      {/* Antennae */}
      <mesh position={[-0.02, 1.6, 0.1]} rotation={[0.5, 0, -0.3]}>
        <cylinderGeometry args={[0.003, 0.002, 0.08, 3]} />
        <meshStandardMaterial color="#5a4a30" />
      </mesh>
      <mesh position={[0.02, 1.6, 0.1]} rotation={[0.5, 0, 0.3]}>
        <cylinderGeometry args={[0.003, 0.002, 0.08, 3]} />
        <meshStandardMaterial color="#5a4a30" />
      </mesh>
      {/* Wings */}
      <mesh position={[-0.18, 1.5, 0]} rotation={[0, 0, wingFlap]}>
        <planeGeometry args={[0.25, 0.18]} />
        <meshStandardMaterial color="#9a8a70" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.18, 1.5, 0]} rotation={[0, 0, -wingFlap]}>
        <planeGeometry args={[0.25, 0.18]} />
        <meshStandardMaterial color="#9a8a70" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      {/* Amber eyes */}
      <mesh position={[-0.015, 1.56, 0.11]}>
        <sphereGeometry args={[0.012, 4, 4]} />
        <meshBasicMaterial color={state === 'chase' ? '#ffaa00' : '#aa8844'} />
      </mesh>
      <mesh position={[0.015, 1.56, 0.11]}>
        <sphereGeometry args={[0.012, 4, 4]} />
        <meshBasicMaterial color={state === 'chase' ? '#ffaa00' : '#aa8844'} />
      </mesh>
    </group>
  );
}

function JerryModel() {
  return (
    <group>
      {/* Friendly blue-tinted humanoid */}
      <mesh position={[0, 1.35, 0]}>
        <sphereGeometry args={[0.13, 8, 6]} />
        <meshStandardMaterial color="#7aaacc" roughness={0.6} />
      </mesh>
      {/* Friendly eyes */}
      <mesh position={[-0.04, 1.37, 0.11]}>
        <sphereGeometry args={[0.02, 4, 4]} />
        <meshBasicMaterial color="#88ddff" />
      </mesh>
      <mesh position={[0.04, 1.37, 0.11]}>
        <sphereGeometry args={[0.02, 4, 4]} />
        <meshBasicMaterial color="#88ddff" />
      </mesh>
      {/* Casual shirt */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[0.3, 0.55, 0.18]} />
        <meshStandardMaterial color="#4477aa" roughness={0.8} />
      </mesh>
      {/* Pants */}
      <mesh position={[-0.07, 0.35, 0]}>
        <boxGeometry args={[0.1, 0.5, 0.1]} />
        <meshStandardMaterial color="#334466" roughness={0.9} />
      </mesh>
      <mesh position={[0.07, 0.35, 0]}>
        <boxGeometry args={[0.1, 0.5, 0.1]} />
        <meshStandardMaterial color="#334466" roughness={0.9} />
      </mesh>
      {/* Arms at sides */}
      <mesh position={[-0.22, 0.9, 0]}>
        <boxGeometry args={[0.07, 0.45, 0.07]} />
        <meshStandardMaterial color="#4477aa" roughness={0.8} />
      </mesh>
      <mesh position={[0.22, 0.9, 0]}>
        <boxGeometry args={[0.07, 0.45, 0.07]} />
        <meshStandardMaterial color="#4477aa" roughness={0.8} />
      </mesh>
      <pointLight color="#88ccff" intensity={0.4} distance={4} decay={2} position={[0, 1.2, 0]} />
    </group>
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
      case 'facelings': return <FacelingModel state={state} />;
      case 'skin-stealer': return <SkinStealerModel state={state} />;
      case 'wretches': return <WretchModel state={state} />;
      case 'crawlers': return <CrawlerModel state={state} />;
      case 'dullers': return <DullerModel />;
      case 'partygoers': return <PartygoerModel state={state} />;
      case 'death-rats': return <DeathRatModel state={state} />;
      case 'deathmoths': return <DeathmothModel state={state} />;
      case 'jerry': return <JerryModel />;
      default: return <FacelingModel state={state} />;
    }
  })();

  return <group ref={groupRef}>{model}</group>;
});