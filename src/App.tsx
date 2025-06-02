import { Canvas } from '@react-three/fiber';
import { Scene, Circle, Square } from './components/ManimScene';

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Scene play={true}>
          <Circle 
            position={[-1, 0, 0]} 
            radius={0.5} 
            color="blue"
          />
          <Square 
            position={[1, 0, 0]} 
            size={0.8} 
            color="red"
          />
        </Scene>
      </Canvas>
    </div>
  );
}