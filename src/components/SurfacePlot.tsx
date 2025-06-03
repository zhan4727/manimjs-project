import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import * as math from 'mathjs';

interface SurfacePlotProps {
  functionString: string;
  onError: (error: string) => void;
}

const SurfacePlot = ({ functionString, onError }: SurfacePlotProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const size = 10;
  const resolution = 50;
  const functionRef = useRef<(x: number, y: number, t: number) => number>(() => 0);

  // Compile the function when it changes
  useEffect(() => {
    try {
      const expr = math.compile(functionString);
      functionRef.current = (x: number, y: number, t: number) => {
        try {
          return expr.evaluate({ x, y, t });
        } catch {
          return 0;
        }
      };
      onError('');
    } catch (error) {
      onError('Invalid function. Use math.js syntax (e.g., "sin(x)*cos(y)")');
      console.error('Function error:', error);
      
      // Fallback to default function
      functionRef.current = (x, y, t) => 
        0.5 * Math.sin(x * 1.5 + t) * 
        Math.cos(y * 1.5 + t * 0.7) * 
        Math.sin(Math.sqrt(x*x + y*y) + t * 0.5);
    }
  }, [functionString, onError]);

  // Create flat geometry (will be deformed in useFrame)
  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(size, size, resolution, resolution);
  }, [size, resolution]);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    
    const geometry = mesh.geometry;
    const positionAttribute = geometry.attributes.position as THREE.BufferAttribute;
    const positions = positionAttribute.array as Float32Array;
    const time = clock.getElapsedTime();
    const count = resolution + 1;

    for (let i = 0; i <= resolution; i++) {
      for (let j = 0; j <= resolution; j++) {
        const idx = (i * count + j) * 3;
        const x = positions[idx];
        const y = positions[idx + 1];
        
        // Apply user's function
        positions[idx + 2] = functionRef.current(x, y, time);
      }
    }
    
    positionAttribute.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial 
        color="#6A0572" 
        wireframe={false}
        side={THREE.DoubleSide}
        metalness={0.2}
        roughness={0.1}
      />
    </mesh>
  );
};

export default SurfacePlot;