import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const SPEED = 3;
const SPRINT_SPEED = 5.5;
const PLAYER_HEIGHT = 1.6;
const BOB_SPEED = 8;
const BOB_AMOUNT = 0.03;

export function Player() {
  const { camera } = useThree();
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const keys = useRef<Record<string, boolean>>({});
  const isMoving = useRef(false);
  const bobPhase = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.code] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame((_, delta) => {
    const k = keys.current;
    const sprinting = k['ShiftLeft'] || k['ShiftRight'];
    const speed = sprinting ? SPRINT_SPEED : SPEED;

    direction.current.set(0, 0, 0);

    if (k['KeyW'] || k['ArrowUp']) direction.current.z -= 1;
    if (k['KeyS'] || k['ArrowDown']) direction.current.z += 1;
    if (k['KeyA'] || k['ArrowLeft']) direction.current.x -= 1;
    if (k['KeyD'] || k['ArrowRight']) direction.current.x += 1;

    direction.current.normalize();
    isMoving.current = direction.current.length() > 0;

    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    const right = new THREE.Vector3();
    right.crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();

    velocity.current.set(0, 0, 0);
    velocity.current.addScaledVector(forward, -direction.current.z);
    velocity.current.addScaledVector(right, direction.current.x);
    velocity.current.normalize().multiplyScalar(speed * delta);

    camera.position.x += velocity.current.x;
    camera.position.z += velocity.current.z;

    if (isMoving.current) {
      bobPhase.current += delta * BOB_SPEED * (sprinting ? 1.4 : 1);
      camera.position.y = PLAYER_HEIGHT + Math.sin(bobPhase.current) * BOB_AMOUNT;
    } else {
      camera.position.y = PLAYER_HEIGHT;
      bobPhase.current = 0;
    }
  });

  return null;
}
