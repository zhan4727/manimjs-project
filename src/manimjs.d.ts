declare module 'manimjs' {
  import { ReactNode } from 'react';
  import { Vector3 } from 'three';

  // Define animation value types
  export type AnimatableValue = 
    | Vector3 
    | [number, number, number] 
    | number;

  // Define animation tuple structure
  export type AnimationTuple = 
    [AnimatableValue, number] |  // [target, duration]
    [AnimatableValue, number, number]; // [target, duration, delay]

  export interface AnimationProps {
    position?: AnimationTuple;
    rotate?: AnimationTuple;
    scale?: AnimationTuple;
    opacity?: AnimationTuple;
    color?: AnimationTuple;
  }

  export interface ShapeProps {
    position?: Vector3 | [number, number, number];
    color?: string;
    radius?: number;
    size?: number;
    animation?: AnimationProps;
  }

  export const Scene: React.FC<{ 
    children?: ReactNode;
    play?: boolean;
    style?: React.CSSProperties;
  }>;
  
  export const Circle: React.FC<ShapeProps>;
  export const Square: React.FC<ShapeProps>;
}