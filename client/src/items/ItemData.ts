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
  damage?: number;
  speed?: number;
  light?: number;
  shield?: number;
}

export const ITEMS: ItemDef[] = [
  { id: 'almond-water', name: 'Almond Water', objectNumber: 1, color: '#e8d8a0', emissive: '#ffe080', shape: 'cylinder', scale: [0.1, 0.25, 0.1], effect: { water: 30, health: 10 }, description: 'The lifeblood of the Backrooms.', rarity: 0.12 },
  { id: 'level-key', name: 'Level Key', objectNumber: 2, color: '#ffd700', emissive: '#ffaa00', shape: 'box', scale: [0.15, 0.08, 0.04], effect: { key: true }, description: 'Opens passage to the next level.', rarity: 0.02 },
  { id: 'smiler-repellent', name: 'Smiler Repellent', objectNumber: 3, color: '#80ff80', emissive: '#40cc40', shape: 'cylinder', scale: [0.08, 0.2, 0.08], effect: { repellent: 30 }, description: 'Wards off entities for 30 seconds.', rarity: 0.04 },
  { id: 'candy', name: 'Candy', objectNumber: 5, color: '#ff6688', emissive: '#ff4466', shape: 'sphere', scale: [0.08, 0.08, 0.08], effect: { food: 20 }, description: 'Sweet sustenance found in wrappers.', rarity: 0.14 },
  { id: 'mirror', name: 'The Mirror', objectNumber: 6, color: '#c0c0c0', emissive: '#ffffff', shape: 'box', scale: [0.15, 0.2, 0.02], effect: { health: 5 }, description: 'Shows reflections that should not exist.', rarity: 0.02 },
  { id: 'memory-jar', name: 'Memory Jar', objectNumber: 7, color: '#9060c0', emissive: '#7040a0', shape: 'cylinder', scale: [0.08, 0.15, 0.08], effect: { health: 15 }, description: 'Contains fragments of forgotten memories.', rarity: 0.03 },
  { id: 'ghost-light', name: 'Ghost Light', objectNumber: 11, color: '#aaffee', emissive: '#66ffcc', shape: 'sphere', scale: [0.12, 0.12, 0.12], effect: { light: 60 }, description: 'Illuminates surroundings for 60 seconds.', rarity: 0.05 },
  { id: 'mortality-shard', name: 'Mortality Shard', objectNumber: 12, color: '#ff2222', emissive: '#cc0000', shape: 'box', scale: [0.06, 0.18, 0.06], effect: { damage: 40 }, description: 'Crystallized death. Throwable weapon.', rarity: 0.03 },
  { id: 'scaraback', name: 'Scaraback', objectNumber: 14, color: '#228844', emissive: '#116633', shape: 'sphere', scale: [0.07, 0.07, 0.07], effect: { shield: 20 }, description: 'Living beetle that absorbs damage.', rarity: 0.04 },
  { id: 'firesalt', name: 'Firesalt', objectNumber: 15, color: '#ff4400', emissive: '#ff2200', shape: 'sphere', scale: [0.1, 0.1, 0.1], effect: { damage: 25 }, description: 'Burns entities on contact.', rarity: 0.06 },
  { id: 'royal-rations', name: 'Royal Rations', objectNumber: 16, color: '#aa8833', emissive: '#886622', shape: 'box', scale: [0.2, 0.12, 0.15], effect: { food: 50 }, description: 'A full meal fit for royalty.', rarity: 0.05 },
  { id: 'liquid-silence', name: 'Liquid Silence', objectNumber: 17, color: '#2020aa', emissive: '#1010cc', shape: 'cylinder', scale: [0.07, 0.18, 0.07], effect: { repellent: 45 }, description: 'Mutes all sound. Entities cannot hear you.', rarity: 0.03 },
  { id: 'phonograph', name: 'The Phonograph', objectNumber: 18, color: '#8b4513', emissive: '#5a2d0a', shape: 'cylinder', scale: [0.15, 0.12, 0.15], effect: { health: 20 }, description: 'Plays music that soothes the soul.', rarity: 0.02 },
  { id: 'clumpshot', name: 'Clumpshot', objectNumber: 23, color: '#556b2f', emissive: '#3a4a1f', shape: 'sphere', scale: [0.12, 0.12, 0.12], effect: { damage: 30 }, description: 'Organic projectile. Stuns entities.', rarity: 0.04 },
  { id: 'maidens-ink', name: "Maiden's Ink", objectNumber: 26, color: '#1a1a2e', emissive: '#3030aa', shape: 'cylinder', scale: [0.06, 0.14, 0.06], effect: { health: 25, water: 10 }, description: 'Dark ink with restorative properties.', rarity: 0.03 },
  { id: '3d-glasses', name: '3D Vision Glasses', objectNumber: 29, color: '#ff0066', emissive: '#00ccff', shape: 'box', scale: [0.14, 0.05, 0.04], effect: { light: 120 }, description: 'Reveals hidden passages and entities.', rarity: 0.02 },
  { id: 'robopet', name: 'RoboPet', objectNumber: 33, color: '#c0c0c0', emissive: '#80ff80', shape: 'box', scale: [0.1, 0.08, 0.12], effect: { repellent: 60 }, description: 'Mechanical companion. Scares small entities.', rarity: 0.02 },
  { id: 'dark-vial', name: 'Dark Reparation Vial', objectNumber: 35, color: '#2a0040', emissive: '#6600aa', shape: 'cylinder', scale: [0.06, 0.16, 0.06], effect: { health: 40 }, description: 'Heals wounds with dark energy.', rarity: 0.03 },
  { id: 'spirit-link', name: 'Spirit Link', objectNumber: 36, color: '#aaeeff', emissive: '#66ccff', shape: 'sphere', scale: [0.09, 0.09, 0.09], effect: { shield: 30 }, description: 'Ethereal tether that absorbs damage.', rarity: 0.03 },
  { id: 'star-candy', name: 'Star Candy', objectNumber: 37, color: '#ffee44', emissive: '#ffdd00', shape: 'sphere', scale: [0.06, 0.06, 0.06], effect: { food: 15, speed: 10 }, description: 'Grants brief speed boost.', rarity: 0.08 },
  { id: 'red-light-white-light', name: 'Red Light White Light', objectNumber: 38, color: '#ff4444', emissive: '#ffffff', shape: 'sphere', scale: [0.1, 0.1, 0.1], effect: { damage: 35, light: 30 }, description: 'Dual-purpose: illumination and weapon.', rarity: 0.02 },
  { id: 'infinite-book', name: 'The Infinite Book', objectNumber: 39, color: '#4a2800', emissive: '#aa8844', shape: 'box', scale: [0.12, 0.16, 0.08], effect: { health: 10 }, description: 'Contains infinite pages of knowledge.', rarity: 0.02 },
  { id: 'electrical-outlet', name: 'Electrical Outlet', objectNumber: 41, color: '#f0f0f0', emissive: '#ffff44', shape: 'box', scale: [0.08, 0.1, 0.04], effect: { damage: 20 }, description: 'Portable shock device.', rarity: 0.04 },
  { id: 'lightning-bottle', name: 'Lightning In a Bottle', objectNumber: 42, color: '#4488ff', emissive: '#88ccff', shape: 'cylinder', scale: [0.08, 0.2, 0.08], effect: { damage: 50 }, description: 'Devastating electrical discharge.', rarity: 0.01 },
  { id: 'cashew-water', name: 'Cashew Water', objectNumber: 44, color: '#d0c080', emissive: '#c0a040', shape: 'cylinder', scale: [0.1, 0.25, 0.1], effect: { water: 50 }, description: 'Superior hydration source.', rarity: 0.07 },
  { id: 'ariadnes-string', name: "Ariadne's String", objectNumber: 45, color: '#ff8800', emissive: '#cc6600', shape: 'sphere', scale: [0.1, 0.1, 0.1], effect: { light: 300 }, description: 'Glowing thread. Marks your path.', rarity: 0.02 },
  { id: 'silver-tongue', name: 'Silver Tongue', objectNumber: 46, color: '#c0c0c0', emissive: '#e0e0e0', shape: 'box', scale: [0.04, 0.12, 0.04], effect: { repellent: 20 }, description: 'Calms hostile entities briefly.', rarity: 0.03 },
  { id: 'backrom', name: 'BackROM', objectNumber: 47, color: '#333333', emissive: '#00ff00', shape: 'box', scale: [0.1, 0.06, 0.1], effect: { health: 5 }, description: 'Corrupted data cartridge.', rarity: 0.04 },
  { id: 'liquid-pain', name: 'Liquid Pain', objectNumber: 48, color: '#880000', emissive: '#ff0000', shape: 'cylinder', scale: [0.07, 0.16, 0.07], effect: { damage: 60 }, description: 'Inflicts agony on entities. Handle with care.', rarity: 0.02 },
  { id: 'compression-cube', name: 'Compression Cube', objectNumber: 49, color: '#4444ff', emissive: '#2222cc', shape: 'box', scale: [0.1, 0.1, 0.1], effect: { shield: 40 }, description: 'Compresses space around you as a shield.', rarity: 0.02 },
  { id: 'voidstone', name: 'Voidstone', objectNumber: 50, color: '#0a0a0a', emissive: '#440066', shape: 'sphere', scale: [0.08, 0.08, 0.08], effect: { damage: 45, health: -10 }, description: 'Powerful but drains your life force.', rarity: 0.02 },
  { id: 'pockets', name: 'Pockets', objectNumber: 51, color: '#8b7355', emissive: '#6b5335', shape: 'box', scale: [0.12, 0.08, 0.06], effect: { food: 10 }, description: 'Contains random small supplies.', rarity: 0.06 },
  { id: 'prayer-glass', name: 'Prayer Glass', objectNumber: 59, color: '#eeeeff', emissive: '#aaaaff', shape: 'cylinder', scale: [0.06, 0.2, 0.06], effect: { health: 30, shield: 15 }, description: 'Holy relic. Heals and protects.', rarity: 0.02 },
  { id: 'throne', name: 'The Throne', objectNumber: 60, color: '#ffd700', emissive: '#ffaa00', shape: 'box', scale: [0.2, 0.25, 0.2], effect: { health: 50, food: 50, water: 50 }, description: 'Sit and be restored. Extremely rare.', rarity: 0.005 },
  { id: 'whisperer', name: 'Whisperer', objectNumber: 64, color: '#404060', emissive: '#6060aa', shape: 'sphere', scale: [0.09, 0.09, 0.09], effect: { repellent: 15 }, description: 'Whispers warnings of nearby entities.', rarity: 0.05 },
  { id: 'chocobytes', name: 'ChocoBytes', objectNumber: 67, color: '#4a2800', emissive: '#6b3a10', shape: 'box', scale: [0.1, 0.06, 0.06], effect: { food: 25, health: 5 }, description: 'Digital chocolate. Surprisingly filling.', rarity: 0.08 },
  { id: 'ottava-lamp', name: 'Ottava Lamp', objectNumber: 68, color: '#ffcc00', emissive: '#ffaa00', shape: 'cylinder', scale: [0.08, 0.22, 0.08], effect: { light: 90 }, description: 'Portable lamp. Long-lasting glow.', rarity: 0.04 },
  { id: 'corpse', name: 'Corpse', objectNumber: 70, color: '#5a4a3a', emissive: '#3a2a1a', shape: 'box', scale: [0.2, 0.08, 0.4], effect: { food: 5 }, description: 'Remains of a wanderer. May have supplies.', rarity: 0.06 },
  { id: 'pixie-gun', name: 'Pixie Gun', objectNumber: 71, color: '#ff66ff', emissive: '#cc44cc', shape: 'box', scale: [0.06, 0.1, 0.16], effect: { damage: 15 }, description: 'Fires sparkling projectiles.', rarity: 0.03 },
  { id: 'supergreen-apple', name: 'SuperGreen Apple', objectNumber: 73, color: '#00cc00', emissive: '#00ff00', shape: 'sphere', scale: [0.09, 0.09, 0.09], effect: { food: 35, health: 15 }, description: 'Unnaturally green. Extremely nutritious.', rarity: 0.05 },
  { id: 'warpberry', name: 'Warpberry', objectNumber: 74, color: '#8800ff', emissive: '#aa44ff', shape: 'sphere', scale: [0.06, 0.06, 0.06], effect: { speed: 20 }, description: 'Warps perception. Grants speed.', rarity: 0.04 },
  { id: 'chekhov-gun', name: "Chekhov's Gun", objectNumber: 75, color: '#444444', emissive: '#888888', shape: 'box', scale: [0.06, 0.08, 0.18], effect: { damage: 70 }, description: 'If it appears, it must be fired.', rarity: 0.01 },
  { id: 'radio', name: 'Portable Radio', objectNumber: 77, color: '#2a2a2a', emissive: '#44aa44', shape: 'box', scale: [0.1, 0.14, 0.04], effect: { repellent: 10 }, description: 'Plays static. Some entities dislike it.', rarity: 0.05 },
  { id: 'blue-gel', name: 'Blue Gel', objectNumber: 78, color: '#2266ff', emissive: '#4488ff', shape: 'sphere', scale: [0.1, 0.08, 0.1], effect: { health: 20, water: 20 }, description: 'Gelatinous healing substance.', rarity: 0.05 },
  { id: 'sage-crystal', name: 'Sage Crystal', objectNumber: 82, color: '#88cc88', emissive: '#44aa44', shape: 'box', scale: [0.06, 0.14, 0.06], effect: { health: 35, repellent: 20 }, description: 'Purifying crystal. Heals and wards.', rarity: 0.02 },
  { id: 'agrugua-fruit', name: 'Agrugua Fruit', objectNumber: 85, color: '#cc6600', emissive: '#aa4400', shape: 'sphere', scale: [0.1, 0.1, 0.1], effect: { food: 40, water: 15 }, description: 'Exotic fruit. Filling and hydrating.', rarity: 0.04 },
  { id: 'worn-sack', name: 'Worn Sack', objectNumber: 87, color: '#8b7355', emissive: '#5a4a30', shape: 'box', scale: [0.14, 0.12, 0.1], effect: { food: 20, water: 10 }, description: 'Contains assorted supplies.', rarity: 0.06 },
  { id: 'light-wire', name: 'Light Wire', objectNumber: 90, color: '#ffff88', emissive: '#ffff00', shape: 'cylinder', scale: [0.03, 0.3, 0.03], effect: { light: 45, damage: 10 }, description: 'Glowing wire. Light source and whip.', rarity: 0.03 },
  { id: 'super-almond-water', name: 'Super Almond Water', objectNumber: 100, color: '#ffffff', emissive: '#aaffff', shape: 'cylinder', scale: [0.12, 0.3, 0.12], effect: { health: 100, water: 100 }, description: 'Full restoration. Extremely rare.', rarity: 0.008 },
  { id: 'frvyo-jade', name: 'Frvyo Jade', objectNumber: 101, color: '#00aa66', emissive: '#00ff88', shape: 'sphere', scale: [0.07, 0.07, 0.07], effect: { health: 60, shield: 25 }, description: 'Jade stone with healing resonance.', rarity: 0.015 },
  { id: 'halo-antiserum', name: 'Halo Antiserum', objectNumber: 201, color: '#ffddaa', emissive: '#ffcc88', shape: 'cylinder', scale: [0.06, 0.18, 0.06], effect: { health: 80 }, description: 'Cures all ailments and poisons.', rarity: 0.01 },
  { id: 'hyrum-lantern', name: 'Hyrum Lantern', objectNumber: 216, color: '#ffaa44', emissive: '#ff8800', shape: 'cylinder', scale: [0.1, 0.18, 0.1], effect: { light: 180, repellent: 15 }, description: 'Ancient lantern. Repels darkness.', rarity: 0.015 },
  { id: 'seer-tea', name: 'Seer Tea', objectNumber: 365, color: '#88aa44', emissive: '#66882a', shape: 'cylinder', scale: [0.08, 0.12, 0.08], effect: { water: 40, health: 20 }, description: 'Grants brief clarity of vision.', rarity: 0.03 },
  { id: 'dice-of-destiny', name: 'Dice of Destiny', objectNumber: 666, color: '#ff0000', emissive: '#880000', shape: 'box', scale: [0.08, 0.08, 0.08], effect: { health: -20, damage: 80 }, description: 'Roll the dice. Great power at great cost.', rarity: 0.008 },
  { id: 'dumb-gum', name: 'Dumb Gum', objectNumber: 9, color: '#ff88cc', emissive: '#ff66aa', shape: 'sphere', scale: [0.05, 0.05, 0.05], effect: { food: 5 }, description: 'Chewable. Barely nutritious.', rarity: 0.1 },
  { id: 'scarecrow', name: 'Scarecrow', objectNumber: 10, color: '#8b6914', emissive: '#5a4a0a', shape: 'cylinder', scale: [0.12, 0.35, 0.12], effect: { repellent: 40 }, description: 'Place it down. Entities avoid the area.', rarity: 0.02 },
  { id: 'backrooms-tcg', name: 'Backrooms TCG', objectNumber: 40, color: '#4488cc', emissive: '#2266aa', shape: 'box', scale: [0.1, 0.14, 0.07], effect: { health: 5 }, description: 'Trading cards. Collectible but useless.', rarity: 0.06 },
  { id: 'tarot-deck', name: 'Tarot Deck', objectNumber: 43, color: '#6b2fa0', emissive: '#8844cc', shape: 'box', scale: [0.08, 0.12, 0.05], effect: { health: 10 }, description: 'Draw a card. Minor fortune.', rarity: 0.04 },
  { id: 'reality-freshener', name: 'Reality Freshener', objectNumber: 32, color: '#88ffaa', emissive: '#44cc66', shape: 'cylinder', scale: [0.06, 0.14, 0.06], effect: { health: 15, repellent: 10 }, description: 'Stabilizes local reality briefly.', rarity: 0.03 },
  { id: 'ouija-board', name: 'Ouija Board', objectNumber: 31, color: '#3a2a1a', emissive: '#aa8844', shape: 'box', scale: [0.2, 0.02, 0.15], effect: { health: -5 }, description: 'Communicates with... something.', rarity: 0.02 },
  { id: 'wall-mask', name: 'Wall Mask', objectNumber: 24, color: '#d4c4a0', emissive: '#aa9060', shape: 'box', scale: [0.12, 0.15, 0.04], effect: { shield: 15 }, description: 'Wear it. Entities may not recognize you.', rarity: 0.03 },
  { id: 'babel-balm', name: 'Babel Balm', objectNumber: 25, color: '#cc9944', emissive: '#aa7722', shape: 'cylinder', scale: [0.06, 0.1, 0.06], effect: { health: 25 }, description: 'Healing salve from ancient texts.', rarity: 0.03 },
];
