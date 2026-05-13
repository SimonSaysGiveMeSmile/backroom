import { useMemo, useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Room } from './Room';
import { FluorescentLight } from './FluorescentLight';
import { AmbientAudio } from './AmbientAudio';
import { FootstepAudio } from './FootstepAudio';
import { EntityPresence } from './EntityPresence';
import { EntityManager } from './EntityManager';
import { ItemManager } from './ItemManager';
import { PlayerModel } from './PlayerModel';
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

const GRID_SIZE = 24;
const RENDER_RADIUS = 44;

export function BackroomsScene() {
  const { state, dispatch } = useGame();
  const { camera } = useThree();
  const levelConfig = LEVELS[state.level];
  const [visibleRooms, setVisibleRooms] = useState<RoomData[]>([]);
  const lastChunkX = useRef(Infinity);
  const lastChunkZ = useRef(Infinity);

  const allRooms = useMemo(() => {
    const grid: RoomData[] = [];
    const roomSize = levelConfig.roomSize;
    const density = levelConfig.wallDensity;

    for (let gx = -GRID_SIZE; gx <= GRID_SIZE; gx++) {
      for (let gz = -GRID_SIZE; gz <= GRID_SIZE; gz++) {
        const seed = gx * 1000 + gz + state.level * 100000;

        grid.push({
          x: gx * roomSize,
          z: gz * roomSize,
          hasNorthWall: seededRandom(seed) > (1 - density) || gz === GRID_SIZE,
          hasSouthWall: seededRandom(seed + 1) > (1 - density) || gz === -GRID_SIZE,
          hasEastWall: seededRandom(seed + 2) > (1 - density + 0.05) || gx === GRID_SIZE,
          hasWestWall: seededRandom(seed + 3) > (1 - density + 0.05) || gx === -GRID_SIZE,
        });
      }
    }
    return grid;
  }, [state.level, levelConfig.roomSize, levelConfig.wallDensity]);

  useEffect(() => {
    buildCollisionMap(allRooms, levelConfig.roomSize);
  }, [allRooms, levelConfig.roomSize]);

  useFrame(() => {
    const px = camera.position.x;
    const pz = camera.position.z;
    const chunkX = Math.floor(px / 8);
    const chunkZ = Math.floor(pz / 8);

    if (chunkX !== lastChunkX.current || chunkZ !== lastChunkZ.current) {
      lastChunkX.current = chunkX;
      lastChunkZ.current = chunkZ;

      const visible = allRooms.filter(room => {
        const dx = room.x - px;
        const dz = room.z - pz;
        return dx * dx + dz * dz < RENDER_RADIUS * RENDER_RADIUS;
      });
      setVisibleRooms(visible);
    }

    dispatch({ type: 'SET_PLAYER_POSITION', x: px, z: pz });
  });

  const lights = useMemo(() => {
    const l: { x: number; z: number }[] = [];
    const spacing = levelConfig.roomSize * 3;
    const extent = GRID_SIZE * levelConfig.roomSize;
    for (let x = -extent; x <= extent; x += spacing) {
      for (let z = -extent; z <= extent; z += spacing) {
        l.push({ x, z });
      }
    }
    return l;
  }, [state.level, levelConfig.roomSize]);

  const visibleLights = useMemo(() => {
    const px = camera.position.x;
    const pz = camera.position.z;
    const LIGHT_RADIUS = 28;
    return lights.filter(l => {
      const dx = l.x - px;
      const dz = l.z - pz;
      return dx * dx + dz * dz < LIGHT_RADIUS * LIGHT_RADIUS;
    }).slice(0, 16);
  }, [lights, visibleRooms]);

  return (
    <group>
      <ambientLight intensity={levelConfig.ambientIntensity} color={levelConfig.ambientColor} />
      <hemisphereLight args={[levelConfig.ambientColor, levelConfig.floorColor, 0.3]} />

      {visibleRooms.map((room, i) => (
        <Room key={`${state.level}-${i}`} {...room} levelConfig={levelConfig} />
      ))}

      {visibleLights.map((light, i) => (
        <FluorescentLight key={i} position={[light.x, 2.9, light.z]} />
      ))}

      <EntityManager />
      <ItemManager />
      <PlayerModel />
      <AmbientAudio />
      <FootstepAudio />
      <EntityPresence />
    </group>
  );
}
