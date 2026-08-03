import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { education, certificates } from '@/data/content';

export function Education() {
  return (
    <section id="education" className="relative z-10 mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
      <SectionHeading index="05" title="Education & certificates" />

      <div className="grid gap-6 lg:grid-cols-2">
        {education.map((ed, i) => (
          <motion.div
            key={ed.degree}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="spotlight group relative overflow-hidden rounded-3xl glass p-8 transition-all duration-300 hover:glass-strong"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
              e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
            }}
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl glass-strong">
              <GraduationCap size={24} className="text-electric" />
            </div>
            <div className="mb-2 flex items-center gap-3">
              <h3 className="font-display text-2xl font-bold">{ed.degree}</h3>
              {ed.extra && (
                <span className="rounded-full border border-violet/30 bg-violet/10 px-2.5 py-0.5 text-xs text-violet">
                  {ed.extra}
                </span>
              )}
            </div>
            <p className="text-sm text-white/50">{ed.field}</p>
            <p className="mt-1 text-sm text-electric">{ed.institution}</p>
            <p className="mt-4 text-sm leading-relaxed text-white/60">{ed.detail}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-6 rounded-3xl glass p-8"
      >
        <div className="mb-5 flex items-center gap-2 text-sm text-white/60">
          <Award size={16} className="text-violet" /> Certificates
        </div>
        <div className="flex flex-wrap gap-3">
          {certificates.map((c) => (
            <span key={c} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition-colors hover:border-electric/40 hover:text-white">
              <BookOpen size={13} className="text-electric" /> {c}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
