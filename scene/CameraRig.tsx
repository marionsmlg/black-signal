import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../store';
import * as THREE from 'three';

export const CameraRig: React.FC = () => {
  const { scrollProgress, reducedMotion } = useStore();
  const vec = new THREE.Vector3();
  const lookAtVec = new THREE.Vector3();

  useFrame((state) => {
    // Each section is 20 units deep on Z axis
    // 0 -> 0, 1 -> -20, 2 -> -40, etc.
    const targetZ = -scrollProgress * 20;

    if (reducedMotion) {
       // Snap logic for reduced motion
       state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.1);
    } else {
       // Smooth camera glide
       // Add some mouse parallax
       const parallaxX = (state.mouse.x * 2);
       const parallaxY = (state.mouse.y * 2);
       
       // Position lerp
       state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, parallaxX, 0.05);
       state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, parallaxY, 0.05);
       state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.04);
       
       // Rotation lerp (bank slightly when moving)
       const bank = (state.camera.position.x - parallaxX) * 0.05;
       state.camera.rotation.z = THREE.MathUtils.lerp(state.camera.rotation.z, bank, 0.1);
    }
  });

  return null;
};