import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import SineWave from './components/SineWave';

function App() {
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh',
      position: 'relative'  // Make container a positioning context
    }}>
      {/* Title overlay */}
      <h1 style={{
        position: 'absolute',
        top: '20px',
        left: 0,
        right: 0,
        textAlign: 'center',
        color: '#fff5ee',
        fontSize: '3rem',
        fontWeight: 'bold',
        textShadow: '0 0 10px rgba(0,0,0,0.7)',
        zIndex: 10,  // Ensure it appears above canvas
        pointerEvents: 'none'  // Allow clicks to pass through to canvas
      }}>
        Math Animations
      </h1>

      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          <SineWave />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;