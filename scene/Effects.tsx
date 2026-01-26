import React from 'react';
import { EffectComposer, Bloom, Noise, Vignette, Scanline, Glitch, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction, GlitchMode } from 'postprocessing';
import { useStore } from '../store';
import * as THREE from 'three';

export const Effects: React.FC = () => {
  const { reducedMotion } = useStore();

  if (reducedMotion) return null;

  return (
    <EffectComposer disableNormalPass>
      <Bloom 
        luminanceThreshold={0.2} 
        mipmapBlur 
        intensity={1.2} 
        radius={0.5}
      />
      <Noise opacity={0.2} />
      <Vignette eskil={false} offset={0.1} darkness={0.6} />
      <Scanline 
        density={2} 
        opacity={0.1} 
        blendFunction={BlendFunction.OVERLAY}
      />
      <Glitch 
        delay={new THREE.Vector2(1.5, 3.5)} // min and max delay between glitches
        duration={new THREE.Vector2(0.1, 0.3)} // min and max duration of a glitch
        strength={new THREE.Vector2(0.1, 0.2)} // min and max strength
        mode={GlitchMode.SPORADIC} // sporadic mode
        active // turn on/off the effect (switches between "mode" and GlitchMode.DISABLED)
        ratio={0.85} // Threshold for strong glitches. 0 - no weak glitches, 1 - no strong glitches.
      />
      <ChromaticAberration
         offset={[0.002, 0.002]} // RGB shift
         radialModulation={false}
         modulationOffset={0}
      />
    </EffectComposer>
  );
};