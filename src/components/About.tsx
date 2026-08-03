import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, MapPin, Coffee } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { MagneticButton } from './MagneticButton';
import { profile, stats } from '@/data/content';

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const step = (ts: number) => {
      if (start === 0) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setN(Math.floor(p * value));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="relative z-10 mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
      <SectionHeading index="01" title="The story behind the work" />

      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-2xl font-medium leading-relaxed text-white/80 md:text-3xl"
          >
          I am a software engineer passionate about building products that are fast, scalable, and genuinely useful.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 space-y-5 text-white/50"
          >
            <p>
My focus is on creating modern web applications with React, Next.js, TypeScript, and Node.js while continuously improving my understanding of software engineering fundamentals.
            </p>
            <p>
           I enjoy learning beyond frameworks—exploring system design, databases, cloud technologies, and AI engineering—to understand how production-grade software is built.
            </p>
            <p>
            Every project is an opportunity to learn something new, improve my craft, and move one step closer to building products that make a real impact.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <MagneticButton href={profile.resumeUrl} icon={<Download size={16} />}>
              Download Resume
            </MagneticButton>
            <div className="flex items-center gap-2 text-sm text-white/40">
              <MapPin size={14} className="text-electric" /> {profile.location}
            </div>
            <div className="flex items-center gap-2 text-sm text-white/40">
              <Coffee size={14} className="text-violet" /> Open to remote
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="lg:col-span-5">
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group spotlight rounded-2xl glass p-6 transition-all duration-300 hover:glass-strong"
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
                }}
              >
                <div className="font-display text-4xl font-bold text-gradient md:text-5xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm text-white/40">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
