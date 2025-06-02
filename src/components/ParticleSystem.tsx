import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Points } from 'three';

const ParticleSystem = () => {
  const particles = useRef<Points | null>(null);
  const count = 1000;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = Math.random();
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (particles.current) {
      const elapsedTime = clock.getElapsedTime();
      const positionAttr = particles.current.geometry.getAttribute('position') as THREE.BufferAttribute;
      const positionArray = positionAttr.array as Float32Array;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const x = positionArray[i3];
        const y = positionArray[i3 + 1];

        positionArray[i3 + 2] = Math.sin(
          Math.sqrt(x * x + y * y) * 2 - elapsedTime * 2
        );
      }

      positionAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <primitive
          attach="attributes-position"
          object={new THREE.BufferAttribute(positions, 3)}
        />
        <primitive
          attach="attributes-color"
          object={new THREE.BufferAttribute(colors, 3)}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        blending={THREE.AdditiveBlending}
        transparent
        opacity={0.8}
      />
    </points>
  );
};

export default ParticleSystem;