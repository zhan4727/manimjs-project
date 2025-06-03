import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import SineWave from './components/SineWave';
import ParametricCurves from './components/ParametricCurves';
import ParticleSystem from './components/ParticleSystem';
import FractalVisualization from './components/FractalVisualization';
import SurfacePlot from './components/SurfacePlot';

const App = () => {
  const [activeAnimation, setActiveAnimation] = useState(0);
  const [surfaceFunction, setSurfaceFunction] = useState('0.5 * sin(x * 1.5 + t) * cos(y * 1.5 + t * 0.7) * sin(sqrt(x*x + y*y) + t * 0.5)');
  const [functionError, setFunctionError] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const animations = [
    { id: 0, title: 'Sine Wave', color: '#FF6B6B', component: <SineWave /> },
    { id: 1, title: 'Parametric Curves', color: '#4ECDC4', component: <ParametricCurves /> },
    { id: 2, title: 'Particle System', color: '#FFE66D', component: <ParticleSystem /> },
    { id: 3, title: 'Fractal Visualization', color: '#1A535C', component: <FractalVisualization /> },
    { id: 4, title: '3D Surface Plot', color: '#6A0572', component: <SurfacePlot functionString={surfaceFunction} onError={setFunctionError} /> }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isInputFocused) return; // Disable navigation when input is focused
    
      if (e.key === 'ArrowRight') {
      setActiveAnimation(prev => (prev + 1) % animations.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveAnimation(prev => (prev - 1 + animations.length) % animations.length);
      } else if (e.key >= '1' && e.key <= '5') {
        setActiveAnimation(parseInt(e.key) - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [animations.length, isInputFocused]); // Add isInputFocused as dependency

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh',
      position: 'relative',
      background: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #1a2a6c)',
      overflow: 'hidden',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.05) 0%, transparent 20%)',
        zIndex: 0
      }} />
      
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 90% 80%, rgba(255,255,255,0.03) 0%, transparent 20%)',
        zIndex: 0
      }} />
      
      {/* Title and Subtitle */}
      <div style={{
        position: 'absolute',
        top: '30px',
        left: 0,
        right: 0,
        textAlign: 'center',
        zIndex: 10,
        pointerEvents: 'none'
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '800',
          color: '#fff',
          textShadow: '0 0 15px rgba(255,255,255,0.5)',
          margin: 0,
          letterSpacing: '2px',
          background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Math Animations
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: 'rgba(255,255,255,0.8)',
          marginTop: '10px',
          maxWidth: '600px',
          margin: '10px auto 0',
          textShadow: '0 0 8px rgba(0,0,0,0.7)'
        }}>
          Interactive visualizations of mathematical concepts
        </p>
      </div>
      
      {/* Canvas Area */}
      <div style={{
        position: 'absolute',
        top: '150px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        height: '60vh',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
        border: '1px solid rgba(255,255,255,0.1)',
        zIndex: 5
      }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#4ECDC4" />
          <OrbitControls enableZoom={true} enablePan={true} />
          <Suspense fallback={null}>
            {animations[activeAnimation].component}
          </Suspense>
        </Canvas>
      </div>
      
      {/* Navigation Cards */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '20px',
        zIndex: 10
      }}>
        {animations.map((anim, index) => (
          <div 
            key={anim.id}
            onClick={() => setActiveAnimation(index)}
            style={{
              width: '120px',
              height: '140px',
              background: activeAnimation === index 
                ? `linear-gradient(135deg, ${anim.color}, #ffffff)`
                : 'rgba(30, 30, 40, 0.7)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              padding: '15px',
              boxShadow: activeAnimation === index 
                ? `0 0 20px ${anim.color}, 0 5px 15px rgba(0,0,0,0.5)` 
                : '0 5px 15px rgba(0,0,0,0.3)',
              border: activeAnimation === index 
                ? `2px solid ${anim.color}` 
                : '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: activeAnimation === index ? 'translateY(-10px)' : 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}
          >
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${anim.color}, #ffffff)`,
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#fff',
              textShadow: '0 0 5px rgba(0,0,0,0.5)'
            }}>
              {index + 1}
            </div>
            <span style={{
              color: activeAnimation === index ? '#000' : '#fff',
              fontWeight: 'bold',
              fontSize: '0.9rem'
            }}>
              {anim.title}
            </span>
          </div>
        ))}
      </div>
      
      {/* Info Panel */}
      <div style={{
        position: 'absolute',
        top: '150px',
        right: '30px',
        background: 'rgba(20, 20, 30, 0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: '15px',
        padding: '20px',
        width: '250px',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        zIndex: 10
      }}>
        <h3 style={{ 
          color: '#fff', 
          marginTop: 0, 
          borderBottom: '1px solid rgba(255,255,255,0.2)', 
          paddingBottom: '10px'
        }}>
          {animations[activeAnimation].title}
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.5' }}>
          {activeAnimation === 0 && 'Visualization of sine wave function: y = sin(x) with time-based animation.'}
          {activeAnimation === 1 && 'Parametric equations creating beautiful curves: Lissajous figures.'}
          {activeAnimation === 2 && 'Particle system demonstrating wave interference patterns.'}
          {activeAnimation === 3 && '3D fractal visualization using recursive algorithms.'}
          {activeAnimation === 4 && '3D surface plot of a mathematical function z = f(x, y, t), where the variable t represents time and increases for animation.'}
        </p>
  
        {/* Add function input only for Surface Plot */}
        {activeAnimation === 4 && (
          <div style={{ 
            marginTop: '15px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <input 
              type="text"
              value={surfaceFunction}
              onChange={(e) => setSurfaceFunction(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              placeholder="e.g., sin(x)*cos(y) + sin(t)"
              style={{ 
                width: '90%', 
                padding: '10px', 
                background: 'rgba(0,0,0,0.2)', 
                border: '1px solid rgba(255,255,255,0.2)', 
                borderRadius: '5px', 
                color: 'white',
                fontSize: '0.95rem'
              }}
            />
            {functionError && (
              <p style={{ 
                color: '#ff5555', 
                fontSize: '0.8rem', 
                marginTop: '8px',
                textAlign: 'center',
                width: '100%'
              }}>
                {functionError}
              </p>
            )}
          </div>
        )}

        <div style={{ 
          marginTop: '15px', 
          color: 'rgba(255,255,255,0.7)',
          fontSize: '0.9rem'
        }}>
          <p>Use mouse to rotate/zoom</p>
          <p>← → keys to navigate</p>
          <p>1-5 keys to select</p>
        </div>
      </div>
      
      {/* Footer */}
      <div style={{
        position: 'absolute',
        bottom: '15px',
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'rgba(255,255,255,0.6)',
        fontSize: '0.9rem',
        zIndex: 10
      }}>
        Interactive Math Visualizations • Created with React Three Fiber
      </div>
    </div>
  );
};

export default App;