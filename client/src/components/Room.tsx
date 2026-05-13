import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface RoomProps {
  x: number;
  z: number;
  hasNorthWall: boolean;
  hasSouthWall: boolean;
  hasEastWall: boolean;
  hasWestWall: boolean;
}

const ROOM_SIZE = 4;
const WALL_HEIGHT = 3;
const WALL_THICKNESS = 0.1;

function createWallpaperTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#c8b060';
  ctx.fillRect(0, 0, 256, 256);

  for (let i = 0; i < 256; i += 2) {
    for (let j = 0; j < 256; j += 2) {
      const noise = Math.random() * 15;
      ctx.fillStyle = `rgba(0,0,0,${noise / 255})`;
      ctx.fillRect(i, j, 2, 2);
    }
  }

  for (let x = 0; x < 256; x += 32) {
    ctx.strokeStyle = 'rgba(160, 130, 50, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 256);
    ctx.stroke();
  }

  for (let y = 0; y < 256; y += 64) {
    ctx.strokeStyle = 'rgba(100, 80, 30, 0.15)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(256, y);
    ctx.stroke();
  }

  ctx.fillStyle = 'rgba(80, 60, 20, 0.05)';
  for (let i = 0; i < 20; i++) {
    const sx = Math.random() * 256;
    const sy = Math.random() * 256;
    const sw = Math.random() * 40 + 10;
    const sh = Math.random() * 40 + 10;
    ctx.fillRect(sx, sy, sw, sh);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);
  return texture;
}

function createCarpetTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#5c4a2a';
  ctx.fillRect(0, 0, 128, 128);

  for (let i = 0; i < 128; i++) {
    for (let j = 0; j < 128; j++) {
      const noise = Math.random() * 20;
      ctx.fillStyle = `rgba(0,0,0,${noise / 255})`;
      ctx.fillRect(i, j, 1, 1);
    }
  }

  for (let i = 0; i < 50; i++) {
    ctx.fillStyle = `rgba(60, 40, 20, ${Math.random() * 0.3})`;
    ctx.fillRect(Math.random() * 128, Math.random() * 128, Math.random() * 8 + 2, Math.random() * 8 + 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

function createCeilingTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#d4c890';
  ctx.fillRect(0, 0, 128, 128);

  ctx.strokeStyle = 'rgba(100, 80, 40, 0.4)';
  ctx.lineWidth = 2;
  for (let x = 0; x <= 128; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 128);
    ctx.stroke();
  }
  for (let y = 0; y <= 128; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(128, y);
    ctx.stroke();
  }

  for (let i = 0; i < 128; i += 2) {
    for (let j = 0; j < 128; j += 2) {
      const noise = Math.random() * 10;
      ctx.fillStyle = `rgba(0,0,0,${noise / 255})`;
      ctx.fillRect(i, j, 2, 2);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);
  return texture;
}

const wallTexture = createWallpaperTexture();
const carpetTexture = createCarpetTexture();
const ceilingTexture = createCeilingTexture();

export function Room({ x, z, hasNorthWall, hasSouthWall, hasEastWall, hasWestWall }: RoomProps) {
  const wallMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ map: wallTexture, roughness: 0.9, metalness: 0 }),
    []
  );
  const floorMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ map: carpetTexture, roughness: 1, metalness: 0 }),
    []
  );
  const ceilingMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ map: ceilingTexture, roughness: 0.8, metalness: 0 }),
    []
  );

  return (
    <group position={[x, 0, z]}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} material={floorMaterial}>
        <planeGeometry args={[ROOM_SIZE, ROOM_SIZE]} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, WALL_HEIGHT, 0]} material={ceilingMaterial}>
        <planeGeometry args={[ROOM_SIZE, ROOM_SIZE]} />
      </mesh>

      {/* North Wall */}
      {hasNorthWall && (
        <mesh position={[0, WALL_HEIGHT / 2, -ROOM_SIZE / 2]} material={wallMaterial}>
          <boxGeometry args={[ROOM_SIZE, WALL_HEIGHT, WALL_THICKNESS]} />
        </mesh>
      )}

      {/* South Wall */}
      {hasSouthWall && (
        <mesh position={[0, WALL_HEIGHT / 2, ROOM_SIZE / 2]} material={wallMaterial}>
          <boxGeometry args={[ROOM_SIZE, WALL_HEIGHT, WALL_THICKNESS]} />
        </mesh>
      )}

      {/* East Wall */}
      {hasEastWall && (
        <mesh position={[ROOM_SIZE / 2, WALL_HEIGHT / 2, 0]} material={wallMaterial}>
          <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT, ROOM_SIZE]} />
        </mesh>
      )}

      {/* West Wall */}
      {hasWestWall && (
        <mesh position={[-ROOM_SIZE / 2, WALL_HEIGHT / 2, 0]} material={wallMaterial}>
          <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT, ROOM_SIZE]} />
        </mesh>
      )}
    </group>
  );
}
