import { useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ItemPickup } from './ItemPickup';
import { ITEMS, ItemDef } from '../items/ItemData';
import { useGame } from '../store/GameContext';

interface SpawnedItem {
  id: number;
  def: ItemDef;
  position: [number, number, number];
  collected: boolean;
}

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + seed * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export function ItemManager() {
  const { state, dispatch } = useGame();
  const { camera } = useThree();
  const [items, setItems] = useState<SpawnedItem[]>([]);
  const initialized = useRef(-1);

  if (initialized.current !== state.level) {
    const spawned: SpawnedItem[] = [];
    const itemCount = 25;

    for (let i = 0; i < itemCount; i++) {
      const seed = i * 17 + state.level * 1000;
      const r = seededRandom(seed);

      let cumulative = 0;
      let selectedItem = ITEMS[0];
      for (const item of ITEMS) {
        cumulative += item.rarity;
        if (r < cumulative / ITEMS.reduce((s, it) => s + it.rarity, 0)) {
          selectedItem = item;
          break;
        }
      }

      const angle = seededRandom(seed + 1) * Math.PI * 2;
      const dist = 8 + seededRandom(seed + 2) * 70;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;

      spawned.push({
        id: i,
        def: selectedItem,
        position: [x, 0, z],
        collected: false,
      });
    }

    setItems(spawned);
    initialized.current = state.level;
  }

  const playerPos = useRef(new THREE.Vector3());
  useFrame(() => {
    playerPos.current.set(camera.position.x, 0, camera.position.z);
  });

  const handlePickup = (item: SpawnedItem) => {
    setItems(prev => prev.map(i => i.id === item.id ? { ...i, collected: true } : i));

    const effect = item.def.effect;
    if (effect.health) dispatch({ type: 'HEAL', amount: effect.health });
    if (effect.water) dispatch({ type: 'RESTORE_WATER', amount: effect.water });
    if (effect.food) dispatch({ type: 'RESTORE_FOOD', amount: effect.food });
    if (effect.key || effect.repellent) {
      dispatch({ type: 'ADD_ITEM', item: { id: item.def.id, name: item.def.name, quantity: 1 } });
    }
  };

  return (
    <>
      {items.filter(i => !i.collected).map(item => (
        <ItemPickup
          key={item.id}
          def={item.def}
          position={item.position}
          playerPos={playerPos.current}
          onPickup={() => handlePickup(item)}
        />
      ))}
    </>
  );
}
