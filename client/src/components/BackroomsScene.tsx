import { useMemo } from 'react';
import { Room } from './Room';
import { FluorescentLight } from './FluorescentLight';
import { AmbientAudio } from './AmbientAudio';
import { FootstepAudio } from './FootstepAudio';
import { EntityPresence } from './EntityPresence';

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

export function BackroomsScene() {
  const rooms = useMemo(() => {
    const grid: RoomData[] = [];
    const gridSize = 12;
    const roomSize = 4;

    for (let gx = -gridSize; gx <= gridSize; gx++) {
      for (let gz = -gridSize; gz <= gridSize; gz++) {
        const seed = gx * 1000 + gz;
        const r = seededRandom(seed);

        grid.push({
          x: gx * roomSize,
          z: gz * roomSize,
          hasNorthWall: r > 0.55 || gz === gridSize,
          hasSouthWall: seededRandom(seed + 1) > 0.55 || gz === -gridSize,
          hasEastWall: seededRandom(seed + 2) > 0.5 || gx === gridSize,
          hasWestWall: seededRandom(seed + 3) > 0.5 || gx === -gridSize,
        });
      }
    }
    return grid;
  }, []);

  const lights = useMemo(() => {
    const l: { x: number; z: number }[] = [];
    for (let x = -48; x <= 48; x += 8) {
      for (let z = -48; z <= 48; z += 8) {
        const offset = seededRandom(x * 100 + z) * 2 - 1;
        l.push({ x: x + offset, z: z + offset });
      }
    }
    return l;
  }, []);

  return (
    <group>
      <ambientLight intensity={0.05} color="#c8a030" />

      {rooms.map((room, i) => (
        <Room key={i} {...room} />
      ))}

      {lights.map((light, i) => (
        <FluorescentLight key={i} position={[light.x, 2.9, light.z]} />
      ))}

      <AmbientAudio />
      <FootstepAudio />
      <EntityPresence />
    </group>
  );
}
