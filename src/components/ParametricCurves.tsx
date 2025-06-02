import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Line } from '@react-three/drei';
import { Line2 } from 'three/examples/jsm/lines/Line2';


const ParametricCurves = () => {
  const lineRef = useRef<Line2 | null>(null);
  const points: THREE.Vector3[] = [];

  const a = 2, b = 3, delta = Math.PI / 2;

  for (let i = 0; i <= 500; i++) {
    const t = (i / 500) * Math.PI * 4;
    const x = Math.sin(a * t + delta);
    const y = Math.sin(b * t);
    points.push(new THREE.Vector3(x * 3, y * 3, 0));
  }

  useFrame(({ clock }) => {
    if (lineRef.current) {
      const time = clock.getElapsedTime();
      const positions: number[] = [];

      for (let i = 0; i <= 500; i++) {
        const t = (i / 500) * Math.PI * 4;
        const x = Math.sin(a * t + delta + time * 0.5);
        const y = Math.sin(b * t + time * 0.3);
        positions.push(x * 3, y * 3, 0);
      }

      (lineRef.current.geometry as any).setPositions(positions);
    }
  });

  return (
    <group>
      <Line
        ref={lineRef}
        points={points}
        color="#4ECDC4"
        lineWidth={3}
      />
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#FF6B6B" emissive="#FF6B6B" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

export default ParametricCurves;