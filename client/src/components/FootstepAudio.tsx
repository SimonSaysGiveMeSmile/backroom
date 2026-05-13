import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

export function FootstepAudio() {
  const { camera } = useThree();
  const lastPos = useRef({ x: 0, z: 0 });
  const stepAccum = useRef(0);
  const audioCtx = useRef<AudioContext | null>(null);

  useEffect(() => {
    audioCtx.current = new AudioContext();
    return () => {
      audioCtx.current?.close();
    };
  }, []);

  const playStep = () => {
    const ctx = audioCtx.current;
    if (!ctx || ctx.state === 'suspended') return;

    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const t = i / ctx.sampleRate;
      data[i] = (Math.random() * 2 - 1) * Math.exp(-t * 50) * 0.3;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 600 + Math.random() * 200;

    const gain = ctx.createGain();
    gain.gain.value = 0.12 + Math.random() * 0.04;

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();
  };

  useFrame(() => {
    const dx = camera.position.x - lastPos.current.x;
    const dz = camera.position.z - lastPos.current.z;
    const dist = Math.sqrt(dx * dx + dz * dz);

    stepAccum.current += dist;
    if (stepAccum.current > 2.2) {
      stepAccum.current = 0;
      playStep();
    }

    lastPos.current.x = camera.position.x;
    lastPos.current.z = camera.position.z;
  });

  return null;
}
