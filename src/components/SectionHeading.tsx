import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

type Props = {
  index: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

export function SectionHeading({ index, title, subtitle, children }: Props) {
  return (
    <div className="mb-16 md:mb-24">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="mb-5 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-electric"
      >
        <span className="h-px w-12 bg-electric/50" />
        {index}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 max-w-xl text-lg text-white/50"
        >
          {subtitle}
        </motion.p>
      )}
      {children}
    </div>
  );
}
