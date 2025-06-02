import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Group } from 'three';
import React from 'react';

// Recursive function to create fractal structure
function createFractal(
  level = 0,
  maxLevel = 4,
  position: [number, number, number] = [0, 0, 0],
  size = 1
): React.ReactNode | null {
  if (level >= maxLevel) return null;

  const newSize = size * 0.5;

  const positions: [number, number, number][] = [
    [position[0] - newSize, position[1] + newSize, position[2] - newSize],
    [position[0] + newSize, position[1] + newSize, position[2] - newSize],
    [position[0] - newSize, position[1] + newSize, position[2] + newSize],
    [position[0] + newSize, position[1] + newSize, position[2] + newSize],
    [position[0], position[1] - newSize, position[2]] // <-- fixed from position[0]
  ];

  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial
          color={level === 0 ? '#1A535C' : new THREE.Color(`hsl(${180 - level * 40}, 70%, 50%)`)}
          wireframe={level < 3}
        />
      </mesh>
      {positions.map((pos, idx) => (
        <React.Fragment key={idx}>
          {createFractal(level + 1, maxLevel, pos, newSize)}
        </React.Fragment>
      ))}
    </group>
  );
}

const FractalVisualization = () => {
  const groupRef = useRef<Group | null>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime();
      groupRef.current.rotation.y = time * 0.1;
      groupRef.current.rotation.x = time * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {createFractal()}
    </group>
  );
};

export default FractalVisualization;
