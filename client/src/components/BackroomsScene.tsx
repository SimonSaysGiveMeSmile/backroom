import { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Room } from './Room';
import { FluorescentLight } from './FluorescentLight';
import { AmbientAudio } from './AmbientAudio';
import { FootstepAudio } from './FootstepAudio';
import { EntityPresence } from './EntityPresence';
import { EntityManager } from './EntityManager';
import { ItemManager } from './ItemManager';
import { Props } from './Props';
import { MultiplayerPlayers } from './MultiplayerPlayers';
import { useGame } from '../store/GameContext';
import { LEVELS } from '../levels/LevelConfig';
import { buildCollisionMap } from '../systems/Collision';

interface RoomData {
  x: number;
  z: number;
  hasNorthWall: boolean;
  hasSouthWall: boolean;
  hasEastWall: boolean;
  hasWestWall: boolean;
}

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + seed * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function isOpenArea(gx: number, gz: number, level: number): boolean {
  if (Math.abs(gx) <= 2 && Math.abs(gz) <= 2) return true;
  const clusterX = Math.floor(gx / 5);
  const clusterZ = Math.floor(gz / 5);
  const clusterSeed = clusterX * 1000 + clusterZ + level * 7777;
  return seededRandom(clusterSeed) < 0.3;
}

const MAP_EXTENT = 1000;
const RENDER_RADIUS = 40;
const COLLISION_RADIUS = 50;

function generateRoomAt(gx: number, gz: number, level: number, roomSize: number, density: number): RoomData {
  const seed = gx * 10007 + gz * 7919 + level * 100003;
  const open = isOpenArea(gx, gz, level);
  const atEdge = Math.abs(gx * roomSize) >= MAP_EXTENT || Math.abs(gz * roomSize) >= MAP_EXTENT;

  if (open) {
    return {
      x: gx * roomSize,
      z: gz * roomSize,
      hasNorthWall: atEdge && gz < 0,
      hasSouthWall: atEdge && gz > 0,
      hasEastWall: atEdge && gx > 0,
      hasWestWall: atEdge && gx < 0,
    };
  }
  return {
    x: gx * roomSize,
    z: gz * roomSize,
    hasNorthWall: seededRandom(seed) > (1 - density) || (atEdge && gz < 0),
    hasSouthWall: seededRandom(seed + 1) > (1 - density) || (atEdge && gz > 0),
    hasEastWall: seededRandom(seed + 2) > (1 - density + 0.05) || (atEdge && gx > 0),
    hasWestWall: seededRandom(seed + 3) > (1 - density + 0.05) || (atEdge && gx < 0),
  };
}

function getRoomsInRadius(px: number, pz: number, radius: number, level: number, roomSize: number, density: number): RoomData[] {
  const rooms: RoomData[] = [];
  const gridRadius = Math.ceil(radius / roomSize);
  const pgx = Math.round(px / roomSize);
  const pgz = Math.round(pz / roomSize);
  const maxGrid = Math.floor(MAP_EXTENT / roomSize);
  const rr = radius * radius;

  for (let dx = -gridRadius; dx <= gridRadius; dx++) {
    for (let dz = -gridRadius; dz <= gridRadius; dz++) {
      const gx = pgx + dx;
      const gz = pgz + dz;
      if (Math.abs(gx) > maxGrid || Math.abs(gz) > maxGrid) continue;
      const wx = gx * roomSize;
      const wz = gz * roomSize;
      const ddx = wx - px;
      const ddz = wz - pz;
      if (ddx * ddx + ddz * ddz > rr) continue;
      rooms.push(generateRoomAt(gx, gz, level, roomSize, density));
    }
  }
  return rooms;
}

export function BackroomsScene() {
  const { state, dispatch } = useGame();
  const { camera } = useThree();
  const levelConfig = LEVELS[state.level];
  const [visibleRooms, setVisibleRooms] = useState<RoomData[]>([]);
  const lastChunkX = useRef(Infinity);
  const lastChunkZ = useRef(Infinity);

  useFrame(() => {
    const px = camera.position.x;
    const pz = camera.position.z;
    const chunkX = Math.floor(px / 8);
    const chunkZ = Math.floor(pz / 8);

    if (chunkX !== lastChunkX.current || chunkZ !== lastChunkZ.current) {
      lastChunkX.current = chunkX;
      lastChunkZ.current = chunkZ;

      const rooms = getRoomsInRadius(px, pz, RENDER_RADIUS, state.level, levelConfig.roomSize, levelConfig.wallDensity);
      setVisibleRooms(rooms);

      const collisionRooms = getRoomsInRadius(px, pz, COLLISION_RADIUS, state.level, levelConfig.roomSize, levelConfig.wallDensity);
      buildCollisionMap(collisionRooms, levelConfig.roomSize);
    }

    dispatch({ type: 'SET_PLAYER_POSITION', x: px, z: pz });
  });

  const visibleLights = useMemo(() => {
    const l: { x: number; z: number }[] = [];
    const spacing = levelConfig.roomSize * 4;
    if (visibleRooms.length === 0) return l;
    const px = lastChunkX.current * 8;
    const pz = lastChunkZ.current * 8;
    const lightRadius = 28;
    const startX = Math.floor((px - lightRadius) / spacing) * spacing;
    const startZ = Math.floor((pz - lightRadius) / spacing) * spacing;
    for (let x = startX; x <= px + lightRadius; x += spacing) {
      for (let z = startZ; z <= pz + lightRadius; z += spacing) {
        const dx = x - px;
        const dz = z - pz;
        if (dx * dx + dz * dz < lightRadius * lightRadius) {
          l.push({ x, z });
        }
      }
    }
    return l.slice(0, 16);
  }, [visibleRooms, levelConfig.roomSize]);

  return (
    <group>
      <ambientLight intensity={levelConfig.ambientIntensity * 1.4} color={levelConfig.ambientColor} />
      <hemisphereLight args={[levelConfig.lightColor, levelConfig.floorColor, 0.5]} />
      <directionalLight color={levelConfig.lightColor} intensity={0.3} position={[0, 3, 0]} />

      {visibleRooms.map((room, i) => (
        <Room key={`${state.level}-${room.x}-${room.z}`} {...room} levelConfig={levelConfig} />
      ))}

      {visibleLights.map((light, i) => (
        <FluorescentLight
          key={`l-${light.x}-${light.z}`}
          position={[light.x, 2.9, light.z]}
          lightColor={levelConfig.lightColor}
          lightIntensity={levelConfig.lightIntensity}
        />
      ))}

      <Props />
      <MultiplayerPlayers />
      <EntityManager />
      <ItemManager />
      <AmbientAudio />
      <FootstepAudio />
      <EntityPresence />
    </group>
  );
}
