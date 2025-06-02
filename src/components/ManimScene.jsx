import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const Scene = ({ children, play = true, style }) => {
  const sceneRef = useRef();
  
  return (
    <group ref={sceneRef} style={style}>
      {children}
    </group>
  );
};

export const Circle = ({ position = [0, 0, 0], radius = 1, color = 'white' }) => {
  const meshRef = useRef();
  
  useEffect(() => {
    if (!meshRef.current) return;
    
    // Set position
    meshRef.current.position.set(...position);
    
    // Create geometry and material
    const geometry = new THREE.CircleGeometry(radius, 32);
    const material = new THREE.MeshBasicMaterial({ color });
    
    // Update mesh
    meshRef.current.geometry = geometry;
    meshRef.current.material = material;
  }, [position, radius, color]);

  return <mesh ref={meshRef} />;
};

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