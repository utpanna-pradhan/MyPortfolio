import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 9 + 3;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          setTimeout(onDone, 700);
        }, 500);
      }
      setProgress(Math.min(p, 100));
    }, 90);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-ink-950"
        >
          {/* Animated logo mark */}
          <div className="relative mb-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-8 rounded-full border border-electric/20"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-14 rounded-full border border-violet/10"
            />
            <div className="relative font-display text-6xl font-bold text-gradient">U</div>
          </div>

          <div className="font-mono text-xs uppercase tracking-[0.4em] text-white/40">Utpanna Pradhan</div>

          {/* Progress bar */}
          <div className="mt-10 h-px w-64 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-electric to-violet"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-4 font-mono text-xs text-white/40">
            {String(Math.floor(progress)).padStart(3, '0')}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
