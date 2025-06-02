import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SurfacePlot = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const size = 10;
  const resolution = 50;
  
  // Create geometry for surface plot
  const geometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(size, size, resolution, resolution);
    const positionAttribute = geometry.attributes.position as THREE.BufferAttribute;
    // Cast to Float32Array for mutable access
    const positions = positionAttribute.array as Float32Array;
    
    // Apply function to create surface
    for (let i = 0; i <= resolution; i++) {
      for (let j = 0; j <= resolution; j++) {
        const idx = (i * (resolution + 1) + j) * 3;
        const x = positions[idx];
        const y = positions[idx + 1];
        
        // z = f(x, y)
        const z = 0.5 * Math.sin(x * 1.5) * Math.cos(y * 1.5) * 
                  Math.sin(Math.sqrt(x*x + y*y) + 1);
        
        positions[idx + 2] = z;
      }
    }
    
    geometry.computeVertexNormals();
    return geometry;
  }, [size, resolution]);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    
    const geometry = mesh.geometry;
    const positionAttribute = geometry.attributes.position as THREE.BufferAttribute;
    // Cast to Float32Array for mutable access
    const positions = positionAttribute.array as Float32Array;
    
    const time = clock.getElapsedTime();
    const count = resolution + 1;  // Precompute for performance
    
    // Animate the surface
    for (let i = 0; i <= resolution; i++) {
      for (let j = 0; j <= resolution; j++) {
        const idx = (i * count + j) * 3;
        const x = positions[idx];
        const y = positions[idx + 1];
        
        // Animate the surface with time
        positions[idx + 2] = 0.5 * Math.sin(x * 1.5 + time) * 
                             Math.cos(y * 1.5 + time * 0.7) * 
                             Math.sin(Math.sqrt(x*x + y*y) + time * 0.5);
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