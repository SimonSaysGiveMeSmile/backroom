export interface ItemDef {
  id: string;
  name: string;
  objectNumber: number;
  color: string;
  emissive: string;
  shape: 'sphere' | 'box' | 'cylinder';
  scale: [number, number, number];
  effect: ItemEffect;
  description: string;
  rarity: number;
}

export interface ItemEffect {
  health?: number;
  water?: number;
  food?: number;
  repellent?: number;
  key?: boolean;
}

export const ITEMS: ItemDef[] = [
  {
    id: 'almond-water',
    name: 'Almond Water',
    objectNumber: 1,
    color: '#e8d8a0',
    emissive: '#ffe080',
    shape: 'cylinder',
    scale: [0.1, 0.25, 0.1],
    effect: { water: 30, health: 10 },
    description: 'Restores hydration and minor health.',
    rarity: 0.3,
  },
  {
    id: 'cashew-water',
    name: 'Cashew Water',
    objectNumber: 44,
    color: '#d0c080',
    emissive: '#c0a040',
    shape: 'cylinder',
    scale: [0.1, 0.25, 0.1],
    effect: { water: 50 },
    description: 'Superior hydration.',
    rarity: 0.15,
  },
  {
    id: 'candy',
    name: 'Candy',
    objectNumber: 5,
    color: '#ff6688',
    emissive: '#ff4466',
    shape: 'sphere',
    scale: [0.08, 0.08, 0.08],
    effect: { food: 20 },
    description: 'Sweet sustenance.',
    rarity: 0.35,
  },
  {
    id: 'royal-rations',
    name: 'Royal Rations',
    objectNumber: 16,
    color: '#aa8833',
    emissive: '#886622',
    shape: 'box',
    scale: [0.2, 0.12, 0.15],
    effect: { food: 50 },
    description: 'A full meal.',
    rarity: 0.1,
  },
  {
    id: 'level-key',
    name: 'Level Key',
    objectNumber: 2,
    color: '#ffd700',
    emissive: '#ffaa00',
    shape: 'box',
    scale: [0.15, 0.08, 0.04],
    effect: { key: true },
    description: 'Opens passage to the next level.',
    rarity: 0.05,
  },
  {
    id: 'smiler-repellent',
    name: 'Smiler Repellent',
    objectNumber: 3,
    color: '#80ff80',
    emissive: '#40cc40',
    shape: 'cylinder',
    scale: [0.08, 0.2, 0.08],
    effect: { repellent: 30 },
    description: 'Wards off entities for 30 seconds.',
    rarity: 0.08,
  },
  {
    id: 'super-almond-water',
    name: 'Super Almond Water',
    objectNumber: 100,
    color: '#ffffff',
    emissive: '#aaffff',
    shape: 'cylinder',
    scale: [0.12, 0.3, 0.12],
    effect: { health: 100, water: 100 },
    description: 'Full restoration.',
    rarity: 0.02,
  },
  {
    id: 'firesalt',
    name: 'Firesalt',
    objectNumber: 15,
    color: '#ff4400',
    emissive: '#ff2200',
    shape: 'sphere',
    scale: [0.1, 0.1, 0.1],
    effect: { health: 0 },
    description: 'Throwable. Damages entities on contact.',
    rarity: 0.12,
  },
];
