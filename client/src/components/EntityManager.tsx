import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Entity } from './Entity';
import { ENTITIES } from '../entities/EntityData';
import { EntityInstance, updateEntityAI, getRandomWaypoint } from '../entities/EntityAI';
import { useGame, getDifficultyMultipliers } from '../store/GameContext';
import { LEVELS } from '../levels/LevelConfig';

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + seed * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export function EntityManager() {
  const { state, dispatch } = useGame();
  const { camera } = useThree();
  const entitiesRef = useRef<EntityInstance[]>([]);
  const initialized = useRef(-1);
  const attackCooldown = useRef(0);

  const levelConfig = LEVELS[state.level];
  const mult = getDifficultyMultipliers(state.difficulty);

  if (initialized.current !== state.level) {
    const pool = levelConfig.entityPool;
    const count = Math.floor(8 * mult.spawnRate);
    const spawned: EntityInstance[] = [];

    for (let i = 0; i < count; i++) {
      const entityId = pool[Math.floor(seededRandom(i * 7 + state.level * 100) * pool.length)];
      const def = ENTITIES[entityId];
      if (!def) continue;

      const angle = seededRandom(i * 13) * Math.PI * 2;
      const dist = 20 + seededRandom(i * 31) * 60;
      const pos = new THREE.Vector3(Math.cos(angle) * dist, 0, Math.sin(angle) * dist);

      spawned.push({
        id: i,
        def,
        position: pos,
        targetPosition: getRandomWaypoint(pos, 10),
        state: 'idle',
        stateTimer: 0,
        alertLevel: 0,
        lastKnownPlayerPos: null,
      });
    }

    entitiesRef.current = spawned;
    initialized.current = state.level;
  }

  useFrame((_, delta) => {
    if (state.paused) return;

    const playerPos = new THREE.Vector3(camera.position.x, 0, camera.position.z);
    attackCooldown.current = Math.max(0, attackCooldown.current - delta);

    entitiesRef.current = entitiesRef.current.map(entity => {
      const dist = entity.position.distanceTo(playerPos);
      if (dist > 80) return entity;

      const updated = updateEntityAI(
        entity,
        playerPos,
        state.isCrouching,
        state.isSprinting,
        delta,
        state.difficulty
      );

      if (updated.state === 'attack' && updated.stateTimer < delta * 2 && attackCooldown.current <= 0) {
        dispatch({ type: 'DAMAGE', amount: updated.def.damage });
        attackCooldown.current = 1.5;
      }

      return updated;
    });
  });

  const visibleEntities = useMemo(() => entitiesRef.current, [state.level]);

  return (
    <>
      {entitiesRef.current.map(entity => (
        <Entity
          key={entity.id}
          def={entity.def}
          position={entity.position}
          state={entity.state}
        />
      ))}
    </>
  );
}
