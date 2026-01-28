import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Stars, Grid } from '@react-three/drei';
import * as THREE from 'three';

// --- UTILS ---
const TunnelSegment = ({ position, zOffset }: { position: [number, number, number], zOffset: number }) => {
  return (
    <group position={position}>
      {/* Floor - Darker */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial 
            color="#0A0F14" 
            roughness={0.2} 
            metalness={0.8}
        />
      </mesh>
      
      {/* Grid on Floor - Muted */}
      <Grid 
        position={[0, -2.98, 0]} 
        args={[20, 20]} 
        cellColor="#1C2530" 
        sectionColor="#2A323D" 
        fadeDistance={25}
        sectionThickness={1}
        cellThickness={0.5}
      />

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#050709" roughness={0.9} />
      </mesh>

      {/* Ceiling Light Strip - Fainter, more ominous */}
      <mesh position={[0, 4.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
         <planeGeometry args={[0.2, 20]} />
         <meshBasicMaterial color="#2FE6D6" transparent opacity={0.3} />
      </mesh>

      {/* Walls */}
      <mesh position={[-6, 1, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[20, 8]} />
        <meshStandardMaterial color="#0E141B" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[6, 1, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[20, 8]} />
        <meshStandardMaterial color="#0E141B" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Vertical Ribs */}
      <mesh position={[-5.9, 1, -9]}>
        <boxGeometry args={[0.5, 8, 1]} />
        <meshStandardMaterial color="#1C2530" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[5.9, 1, -9]}>
        <boxGeometry args={[0.5, 8, 1]} />
        <meshStandardMaterial color="#1C2530" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
};

// --- ATMOSPHERIC COMPONENTS ---

const WarningStrobe = () => {
    const light = useRef<THREE.PointLight>(null);
    useFrame(({ clock }) => {
        if (light.current) {
             // Rare but intense flashes (broken circuitry)
             const r = Math.random();
             light.current.intensity = r > 0.98 ? 8 : (r > 0.9 ? 1 : 0);
             light.current.color.set(Math.random() > 0.5 ? "#B11226" : "#E6E9EE");
        }
    });
    return <pointLight ref={light} position={[0, 4, -15]} distance={60} decay={2} />;
};

const FloatingDebris = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 150; // Reduced count for loneliness
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 15, 
          (Math.random() - 0.5) * 10,
          -Math.random() * 80
        ),
        rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, 0),
        scale: Math.random() * 0.05 + 0.01,
        speed: Math.random() * 0.02 + 0.01,
        rotSpeed: new THREE.Vector3(Math.random() * 0.02, Math.random() * 0.02, Math.random() * 0.02)
      });
    }
    return temp;
  }, []);

  const dummy = new THREE.Object3D();

  useFrame((state) => {
    if (!meshRef.current) return;

    particles.forEach((p, i) => {
      p.position.z += p.speed; 
      if (p.position.z > 5) p.position.z = -80;
      
      p.rotation.x += p.rotSpeed.x;
      p.rotation.y += p.rotSpeed.y;

      dummy.position.copy(p.position);
      dummy.rotation.copy(p.rotation);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <tetrahedronGeometry args={[1, 0]} />
      {/* Darker debris */}
      <meshBasicMaterial color="#556677" transparent opacity={0.3} wireframe />
    </instancedMesh>
  );
};

const ScannerPulse = () => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame(({ clock }) => {
        if (ref.current) {
            // Slower, heavier scan
            ref.current.position.z = 10 - (clock.getElapsedTime() * 15) % 120;
            ref.current.rotation.z += 0.005;
        }
    });
    return (
        <mesh ref={ref} position={[0, 0, 0]}>
             <ringGeometry args={[4.5, 4.6, 64]} />
             <meshBasicMaterial color="#B11226" transparent opacity={0.3} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
        </mesh>
    );
};


// --- MAIN CHAMBER ---

export const Chamber: React.FC = () => {
  const artifactRef = useRef<THREE.Mesh>(null);
  const fundingCrateRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (artifactRef.current) {
      artifactRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      artifactRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
    if (fundingCrateRef.current) {
        fundingCrateRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <>
      <color attach="background" args={['#030405']} />
      
      {/* Lighting: Much darker, spotlit */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 10, 5]} intensity={0.5} color="#1C2530" />
      
      {/* Ominous red underglow */}
      <pointLight position={[0, -10, -20]} color="#B11226" intensity={2} distance={50} />

      <WarningStrobe />

      {/* Dense, dark fog */}
      <fog attach="fog" args={['#030405', 2, 35]} />

      {/* <FloatingDebris /> */}
      {/* <ScannerPulse /> */}

      {/* Segments repeated for depth */}
      {/* <TunnelSegment position={[0, 0, 0]} zOffset={0} /> */}
      {/* <TunnelSegment position={[0, 0, -20]} zOffset={-20} />
      <TunnelSegment position={[0, 0, -40]} zOffset={-40} />
      <TunnelSegment position={[0, 0, -60]} zOffset={-60} />
      <TunnelSegment position={[0, 0, -80]} zOffset={-80} />
      <TunnelSegment position={[0, 0, -100]} zOffset={-100} /> */}

      {/* Room 2: Null Vector Artifact */}
      {/* <group position={[0, 0, -40]}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh ref={artifactRef}>
            <dodecahedronGeometry args={[2, 0]} />
            <meshStandardMaterial 
              color="#000000" 
              wireframe={true}
              emissive="#E6E9EE"
              emissiveIntensity={0.5}
            />
          </mesh> */}
          {/* Internal core */}
          {/* <mesh>
             <dodecahedronGeometry args={[1.5, 0]} />
             <meshBasicMaterial color="#000000" />
          </mesh>
        </Float>
        <pointLight color="#2FE6D6" intensity={2} distance={10} decay={2} />
      </group> */}

      {/* Room 3: Funding */}
      {/* <group position={[0, 0, -60]}>
         <group ref={fundingCrateRef} position={[0, -1, 0]}>
            <mesh>
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color="#0E141B" wireframe />
            </mesh>
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial emissive="#B11226" emissiveIntensity={1} toneMapped={false} />
            </mesh>
         </group>
         <pointLight color="#B11226" intensity={3} distance={10} position={[0, 0, 0]} />
      </group> */}

      {/* Room 4: Integrity */}
      {/* <group position={[0, 0, -80]}>
         <Grid 
            position={[0, -2.8, 0]} 
            rotation={[0, 0, 0]}
            args={[10, 10]} 
            cellColor="#FF6A2B" 
            sectionColor="#FF6A2B" 
            fadeDistance={15}
        />
      </group> */}

       {/* Room 5: Terminal */}
       <group position={[0, 0, -100]}>
        {/* <mesh position={[0, -1, 0]}>
            <boxGeometry args={[4, 1, 2]} />
            <meshStandardMaterial color="#0E141B" metalness={0.9} roughness={0.2} />
        </mesh> */}
        <rectAreaLight 
            width={4} 
            height={2} 
            color="#2FE6D6" 
            intensity={5} 
            position={[0, 1, -1]} 
            lookAt={() => new THREE.Vector3(0,0,0)} 
        />
      </group>
    </>
  );
};