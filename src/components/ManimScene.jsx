import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber'
import { CircleGeometry } from 'three'
import * as THREE from 'three';

export const Scene = ({ children, play = true, style }) => {
  const sceneRef = useRef();
  
  return (
    <group ref={sceneRef} style={style}>
      {children}
    </group>
  );
};

export const Circle = ({ position = [0, 0, 0], radius = 1, color = 'blue' }) => {
  const meshRef = useRef()
  
  // Create geometry once (better performance)
  const geometry = new CircleGeometry(radius, 32)
  const material = new THREE.MeshBasicMaterial({ color })

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Smooth bounce animation
      meshRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * 2) * 0.3
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      geometry={geometry}
      material={material}
    />
  )
}

export const Square = ({ position = [0, 0, 0], size = 1, color = 'white' }) => {
  const meshRef = useRef();

  useEffect(() => {
    if (!meshRef.current) return;
    meshRef.current.position.set(...position);
    
    const geometry = new THREE.PlaneGeometry(size, size);
    const material = new THREE.MeshBasicMaterial({ 
      color,
      side: THREE.DoubleSide, // Renders both sides
    });
    
    meshRef.current.geometry = geometry;
    meshRef.current.material = material;
  }, [position, size, color]);

  return <mesh ref={meshRef} rotation={[0, 0, 0]} />; // No rotation
};