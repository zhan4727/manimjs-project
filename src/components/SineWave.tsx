import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Line } from '@react-three/drei'; // Import Line from drei

const SineWave = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const lineRef = useRef<any>(null); // Ref for Line component
  const [points] = useState(() => {
    const segmentCount = 100;
    const length = 10;
    const points = [];
    
    for (let i = 0; i <= segmentCount; i++) {
      const x = (i / segmentCount) * length - length / 2;
      points.push(new THREE.Vector3(x, 0, 0));
    }
    
    return points;
  });

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    // Update sine wave points
    const positions: number[] = [];
    points.forEach((point) => {
      const x = point.x;
      const y = Math.sin(x * 2 + time) * 0.5;
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
      {/* Lighting */}
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[3, 10, 5]}
        intensity={1.2}
        castShadow
      />
      
      {/* Sine Wave */}
      <Line
        ref={lineRef}
        points={points.map(p => [p.x, p.y, p.z])}
        color="orange"
        lineWidth={1.2}
      />
      
      {/* Cyan Box */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial 
          color="#00ffff" // Pure cyan
          roughness={0.2} // Makes it shinier
          metalness={0.1} // Slight metallic reflection
        />
      </mesh>
    </group>
  );
};

export default SineWave;