import React, { useEffect, Suspense, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { HashRouter, useLocation } from 'react-router-dom';
import { Interface } from './Interface';
import { Chamber } from './scene/Chamber';
import { CameraRig } from './scene/CameraRig';
import { Effects } from './scene/Effects';
import { useStore } from './store';
import { SECTIONS } from './types';
import { BootSequence } from './components/BootSequence';

const SceneContainer = () => {
  return (
    <div className="fixed inset-0 bg-void z-[-1]">
      <Canvas
        gl={{ antialias: false, stencil: false, alpha: false }}
        camera={{ position: [0, 0, 5], fov: 50, near: 0.1, far: 200 }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <Chamber />
          <Effects />
          <CameraRig />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

const LocationHandler = () => {
  const location = useLocation();
  const { setSection, setScrollProgress } = useStore();

  useEffect(() => {
    const matchedSection = SECTIONS.find(s => s.path === location.pathname);
    if (matchedSection) {
      setSection(matchedSection.id);
      setScrollProgress(matchedSection.id);
    }
  }, [location, setSection, setScrollProgress]);

  return null;
};

const App = () => {
  const [booted, setBooted] = useState(false);

  return (
    <HashRouter>
      <LocationHandler />
      <SceneContainer />
      <Interface onBoot={booted} />
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}
    </HashRouter>
  );
};

export default App;