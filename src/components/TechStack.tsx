import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { techStack } from '@/data/content';

const orbitItems = [
 'HTML5',
  'CSS3',
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Express.js',
  'Tailwind CSS',
  'Bootstrap',
  'REST APIs',
  'MongoDB',
  
];

function OrbitGroup() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.25;
  });

  const items = useMemo(
    () =>
      orbitItems.map((label, i) => {
        const angle = (i / orbitItems.length) * Math.PI * 2;
        const radius = 2.6;
        return { label, x: Math.cos(angle) * radius, z: Math.sin(angle) * radius, y: (i % 2 ? 0.6 : -0.6) };
      }),
    []
  );

  return (
    <group ref={group}>
      {items.map((it) => (
        <Float key={it.label} speed={2} floatIntensity={0.5} rotationIntensity={0.3}>
          <group position={[it.x, it.y, it.z]}>
            <Text fontSize={0.28} color="#e8eaf2" anchorX="center" anchorY="middle" outlineWidth={0.004} outlineColor="#38bdf8">
              {it.label}
            </Text>
          </group>
        </Float>
      ))}
      {/* orbit rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.58, 2.62, 80]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.15} side={2} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0.4, 0]}>
        <ringGeometry args={[3.1, 3.13, 80]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.1} side={2} />
      </mesh>
    </group>
  );
}

function StackCanvas() {
  return (
    <Canvas camera={{ position: [0, 1, 6], fov: 50 }} dpr={[1, 1.8]} gl={{ alpha: true }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <OrbitGroup />
      </Suspense>
    </Canvas>
  );
}

export function TechStack() {
  return (
    <section id="stack" className="relative z-10 mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
      <SectionHeading index="02" title="The tools of the craft" subtitle="An interactive orbit of the technologies I reach for daily. Hover a category to explore." />

      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="h-[360px] md:h-[460px]">
          <StackCanvas />
        </div>

        <div className="space-y-6">
          {techStack.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="spotlight rounded-2xl glass p-6 transition-all duration-300 hover:glass-strong"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
              }}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-xs text-electric">0{i + 1}</span>
                <h3 className="font-display text-xl font-semibold">{cat.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-white/70 transition-all duration-300 hover:border-electric/40 hover:text-white hover:glow-electric"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
