import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EntityDef, EntityState } from '../entities/EntityData';

interface EntityProps {
  def: EntityDef;
  position: THREE.Vector3;
  state: EntityState;
}

function SmilerModel({ state }: { state: EntityState }) {
  return (
    <group>
      {/* Dark body mass */}
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.35, 12, 12]} />
        <meshStandardMaterial color="#050505" roughness={1} />
      </mesh>
      {/* Left eye */}
      <mesh position={[-0.12, 0.75, 0.25]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color="#ffff00" />
      </mesh>
      {/* Right eye */}
      <mesh position={[0.12, 0.75, 0.25]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color="#ffff00" />
      </mesh>
      {/* Smile curve (arc of small spheres) */}
      {Array.from({ length: 7 }).map((_, i) => {
        const angle = (i / 6) * Math.PI - Math.PI / 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.15, 0.55 + Math.sin(angle) * 0.08, 0.28]}>
            <sphereGeometry args={[0.02, 4, 4]} />
            <meshBasicMaterial color="#ffff00" />
          </mesh>
        );
      })}
      {/* Glow */}
      <pointLight color="#ffff00" intensity={state === 'chase' ? 2 : 0.8} distance={5} decay={2} position={[0, 0.7, 0.2]} />
    </group>
  );
}

function HumanoidModel({ color, headColor, height }: { color: string; headColor: string; height: number }) {
  return (
    <group>
      {/* Head */}
      <mesh position={[0, height - 0.15, 0]}>
        <sphereGeometry args={[0.14, 10, 10]} />
        <meshStandardMaterial color={headColor} roughness={0.7} />
      </mesh>
      {/* Torso */}
      <mesh position={[0, height - 0.55, 0]}>
        <boxGeometry args={[0.3, 0.5, 0.18]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      {/* Left arm */}
      <mesh position={[-0.22, height - 0.55, 0]}>
        <boxGeometry args={[0.08, 0.45, 0.08]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      {/* Right arm */}
      <mesh position={[0.22, height - 0.55, 0]}>
        <boxGeometry args={[0.08, 0.45, 0.08]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      {/* Left leg */}
      <mesh position={[-0.08, height - 1.1, 0]}>
        <boxGeometry args={[0.1, 0.5, 0.1]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      {/* Right leg */}
      <mesh position={[0.08, height - 1.1, 0]}>
        <boxGeometry args={[0.1, 0.5, 0.1]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
    </group>
  );
}

function HoundModel({ state }: { state: EntityState }) {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 0.35, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.35, 0.3, 0.8]} />
        <meshStandardMaterial color="#1a1010" roughness={0.9} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.4, 0.45]}>
        <boxGeometry args={[0.2, 0.2, 0.25]} />
        <meshStandardMaterial color="#2a1515" roughness={0.9} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.06, 0.45, 0.58]}>
        <sphereGeometry args={[0.03, 6, 6]} />
        <meshBasicMaterial color={state === 'chase' ? '#ff0000' : '#ff3300'} />
      </mesh>
      <mesh position={[0.06, 0.45, 0.58]}>
        <sphereGeometry args={[0.03, 6, 6]} />
        <meshBasicMaterial color={state === 'chase' ? '#ff0000' : '#ff3300'} />
      </mesh>
      {/* Legs */}
      {[[-0.12, 0.3], [0.12, 0.3], [-0.12, -0.3], [0.12, -0.3]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.15, z]}>
          <boxGeometry args={[0.06, 0.3, 0.06]} />
          <meshStandardMaterial color="#1a1010" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function CrawlerModel() {
  return (
    <group>
      {/* Flat body */}
      <mesh position={[0, 2.7, 0]}>
        <boxGeometry args={[0.6, 0.12, 0.6]} />
        <meshStandardMaterial color="#0a0a0a" roughness={1} />
      </mesh>
      {/* Legs hanging down */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.25, 2.5, Math.sin(angle) * 0.25]}>
            <cylinderGeometry args={[0.02, 0.015, 0.4, 4]} />
            <meshStandardMaterial color="#1a0000" roughness={0.9} />
          </mesh>
        );
      })}
      {/* Eyes */}
      <mesh position={[0, 2.65, 0.28]}>
        <sphereGeometry args={[0.04, 6, 6]} />
        <meshBasicMaterial color="#880000" />
      </mesh>
    </group>
  );
}

function PartygoerModel({ state }: { state: EntityState }) {
  return (
    <group>
      <HumanoidModel color="#cccc00" headColor="#ffee00" height={1.6} />
      {/* Smile */}
      <mesh position={[0, 1.4, 0.13]}>
        <torusGeometry args={[0.06, 0.015, 4, 12, Math.PI]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      {/* Party hat */}
      <mesh position={[0, 1.6, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.08, 0.2, 8]} />
        <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.3} />
      </mesh>
      {state === 'chase' && (
        <pointLight color="#ffee00" intensity={1.5} distance={4} decay={2} position={[0, 1, 0]} />
      )}
    </group>
  );
}

function DeathRatModel() {
  return (
    <group>
      <mesh position={[0, 0.08, 0]}>
        <sphereGeometry args={[0.1, 8, 6]} />
        <meshStandardMaterial color="#2a1a1a" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.1, 0.1]}>
        <sphereGeometry args={[0.05, 6, 6]} />
        <meshStandardMaterial color="#3a2020" roughness={0.9} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.02, 0.12, 0.13]}>
        <sphereGeometry args={[0.015, 4, 4]} />
        <meshBasicMaterial color="#ff0000" />
      </mesh>
      <mesh position={[0.02, 0.12, 0.13]}>
        <sphereGeometry args={[0.015, 4, 4]} />
        <meshBasicMaterial color="#ff0000" />
      </mesh>
      {/* Tail */}
      <mesh position={[0, 0.06, -0.12]} rotation={[0.3, 0, 0]}>
        <cylinderGeometry args={[0.008, 0.005, 0.15, 4]} />
        <meshStandardMaterial color="#3a2020" roughness={0.9} />
      </mesh>
    </group>
  );
}

function JerryModel() {
  return (
    <group>
      <HumanoidModel color="#3366aa" headColor="#5588cc" height={1.5} />
      {/* Friendly glow */}
      <pointLight color="#3366aa" intensity={0.4} distance={4} decay={2} position={[0, 1, 0]} />
    </group>
  );
}

function GenericEntityModel({ def, state }: { def: EntityDef; state: EntityState }) {
  const geometry = (() => {
    switch (def.shape) {
      case 'sphere': return <sphereGeometry args={[def.scale[0], 10, 10]} />;
      case 'box': return <boxGeometry args={def.scale} />;
      case 'cylinder': return <cylinderGeometry args={[def.scale[0], def.scale[2], def.scale[1], 10]} />;
      case 'cone': return <coneGeometry args={[def.scale[0], def.scale[1], 10]} />;
    }
  })();

  return (
    <mesh position={[0, def.scale[1] / 2, 0]}>
      {geometry}
      <meshStandardMaterial
        color={def.color}
        emissive={def.emissive}
        emissiveIntensity={def.emissiveIntensity * (state === 'chase' ? 2 : 1)}
        roughness={0.8}
      />
    </mesh>
  );
}

export function Entity({ def, position, state }: EntityProps) {
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

    if (state === 'chase' || state === 'patrol' || state === 'return') {
      const dir = Math.atan2(
        position.x - groupRef.current.position.x,
        position.z - groupRef.current.position.z
      );
      groupRef.current.rotation.y += (dir - groupRef.current.rotation.y) * 0.1;
    }
  });

  const renderModel = () => {
    switch (def.id) {
      case 'smiler': return <SmilerModel state={state} />;
      case 'hound': return <HoundModel state={state} />;
      case 'facelings': return <HumanoidModel color="#c8b090" headColor="#b8a080" height={1.6} />;
      case 'skin-stealer': return <HumanoidModel color="#6a4030" headColor="#8a5040" height={1.7} />;
      case 'wretches': return <HumanoidModel color="#3a3a2a" headColor="#4a4a3a" height={1.2} />;
      case 'crawlers': return <CrawlerModel />;
      case 'partygoers': return <PartygoerModel state={state} />;
      case 'death-rats': return <DeathRatModel />;
      case 'jerry': return <JerryModel />;
      default: return <GenericEntityModel def={def} state={state} />;
    }
  };

  return (
    <group ref={groupRef}>
      {renderModel()}
    </group>
  );
}
