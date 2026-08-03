import { useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const count = 3500;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.04;
    ref.current.rotation.x += delta * 0.01;
    const t = state.clock.elapsedTime;
    ref.current.position.y = Math.sin(t * 0.3) * 0.3;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#38bdf8"
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

function ConstellationLines() {
  const ref = useRef<THREE.LineSegments>(null);
  const { nodes } = useMemo(() => {
    const pts: number[] = [];
    const ptsArr: THREE.Vector3[] = [];
    for (let i = 0; i < 40; i++) {
      const r = 5 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      ptsArr.push(new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ));
    }
    for (let i = 0; i < ptsArr.length; i++) {
      for (let j = i + 1; j < ptsArr.length; j++) {
        if (ptsArr[i].distanceTo(ptsArr[j]) < 3.2) {
          pts.push(ptsArr[i].x, ptsArr[i].y, ptsArr[i].z, ptsArr[j].x, ptsArr[j].y, ptsArr[j].z);
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    return { nodes: geo };
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.03;
      ref.current.rotation.x += delta * 0.008;
    }
  });

  return (
    <lineSegments ref={ref} geometry={nodes}>
      <lineBasicMaterial color="#a855f7" transparent opacity={0.18} />
    </lineSegments>
  );
}

function FloatingCrystal({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * 0.2;
    ref.current.rotation.y = t * 0.3;
  });
  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          transparent
          opacity={0.75}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function CoreOrb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.15;
    ref.current.rotation.z = t * 0.08;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#38bdf8"
          emissiveIntensity={0.3}
          transparent
          opacity={0.12}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function CameraRig() {
  const { camera, mouse } = useThree();
  useFrame(() => {
    camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.03;
    camera.position.y += (-mouse.y * 1.2 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export function UniverseScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.2} color="#38bdf8" />
          <pointLight position={[-10, -10, -5]} intensity={0.8} color="#a855f7" />
          <ParticleField />
          <ConstellationLines />
          <CoreOrb />
          <FloatingCrystal position={[3, 1.5, -2]} color="#38bdf8" scale={1} />
          <FloatingCrystal position={[-3.5, -1, -1]} color="#a855f7" scale={0.7} />
          <FloatingCrystal position={[2.5, -2, 1]} color="#22d3ee" scale={0.5} />
          <FloatingCrystal position={[-2, 2.5, 0.5]} color="#38bdf8" scale={0.6} />
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>
  );
}
