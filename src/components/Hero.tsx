import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, FolderGit2, Sparkles, MousePointer2 } from 'lucide-react';
import { lazy, Suspense } from 'react';
const UniverseScene = lazy(() => import('./UniverseScene').then((m) => ({ default: m.UniverseScene })));
import { MagneticButton } from './MagneticButton';
import { profile } from '@/data/content';

function Typewriter() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = profile.roles[idx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && text === '') {
      setDeleting(false);
      setIdx((i) => (i + 1) % profile.roles.length);
    } else {
      timeout = setTimeout(() => {
        setText((t) =>
          deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)
        );
      }, deleting ? 45 : 90);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, idx]);

  return (
    <span className="text-gradient">
      {text}
      <span className="ml-1 inline-block h-[1em] w-[3px] animate-pulse-soft bg-electric align-middle" />
    </span>
  );
}

function Spotlight() {
  useEffect(() => {
    function onMove(e: MouseEvent) {
      document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
      document.documentElement.style.setProperty('--my', `${e.clientY}px`);
    }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[2]"
      style={{
        background:
          'radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(56,189,248,0.06), transparent 40%)',
      }}
    />
  );
}

export function Hero() {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <Suspense fallback={null}>
        <UniverseScene />
      </Suspense>
      <Spotlight />

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-b from-ink-950/40 via-transparent to-ink-950" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-white/60"
        >
          <Sparkles size={12} className="text-electric" />
          Available for Frontend , Full-Stack & AI Engineer roles
        </motion.div>

        <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-8xl lg:text-9xl">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            UTPANNA
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="block text-gradient"
          >
            PRADHAN
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-6 h-8 font-mono text-lg md:text-2xl"
        >
          <Typewriter />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-8 max-w-xl text-base text-white/50 md:text-lg"
        >
         Turning ideas into fast, responsive, and intuitive web applications.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
        >
          <MagneticButton href="#projects" icon={<FolderGit2 size={16} />}>
            Explore Portfolio
          </MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            Get in Touch
          </MagneticButton>
          <MagneticButton href={profile.resumeUrl} variant="ghost" icon={<Download size={16} />}>
            Resume
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <a href="#about" className="flex flex-col items-center gap-2 text-white/40 transition-colors hover:text-white">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
              <ArrowDown size={16} />
            </motion.div>
          </a>
        </motion.div>

        <div className="absolute bottom-10 right-10 hidden items-center gap-2 text-white/30 lg:flex">
          <MousePointer2 size={12} />
          <span className="font-mono text-[10px] uppercase tracking-widest">Move to explore</span>
        </div>
      </div>
    </section>
  );
}
