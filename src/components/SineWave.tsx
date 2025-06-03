import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Line } from '@react-three/drei';

const SineWave = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const lineRef = useRef<any>(null);
  const [points] = useState(() => {
    const segmentCount = 100;
    const length = 20; // Increased from 10 to 20
    const points = [];
    
    for (let i = 0; i <= segmentCount; i++) {
      const x = (i / segmentCount) * length - length / 2;
      points.push(new THREE.Vector3(x, 0, 0));
    }
    
    return points;
  });

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    const positions: number[] = [];
    points.forEach((point) => {
      const x = point.x;
      const y = Math.sin(x * 1.5 + time) * 1.5; // Increased amplitude from 0.5 to 1.5
      positions.push(x, y, 0);
    });
    
    if (lineRef.current) {
      lineRef.current.geometry.setPositions(positions);
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.2;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[3, 10, 5]}
        intensity={1.2}
        castShadow
      />
      
      <Line
        ref={lineRef}
        points={points.map(p => [p.x, p.y, p.z])}
        color="orange"
        lineWidth={1.2}
      />
      
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} /> {/* Increased from 0.5 to 1 */}
        <meshStandardMaterial 
          color="#00ffff"
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
};

export default SineWave;