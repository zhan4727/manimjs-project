// ManimScene.d.ts
import * as React from 'react';
import * as THREE from 'three';

// Declare the module
declare module './ManimScene' {
  // Default export (if your component uses `export default`)
  const ManimScene: React.FC<{
    play?: boolean;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }>;
  export default ManimScene;

  // Named exports (Scene, Circle, Square)
  export const Scene: React.FC<{
    play?: boolean;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }>;

  export const Circle: React.FC<{
    position?: [number, number, number];
    radius?: number;
    color?: string;
  }>;

  export const Square: React.FC<{
    position?: [number, number, number];
    size?: number;
    color?: string;
  }>;
}