import { motion } from 'framer-motion';
import { Briefcase, MapPin, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { experiences } from '@/data/content';

export function Experience() {
  return (
    <section id="experience" className="relative z-10 mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
      <SectionHeading index="04" title="Where I've worked" subtitle="Each one a step closer to the engineer I want to be." />

      <div className="relative">
        {/* vertical line */}
        <div className="absolute left-[19px] top-2 h-full w-px bg-gradient-to-b from-electric via-violet to-transparent md:left-1/2 md:-translate-x-1/2" />

        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`relative flex gap-6 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12' : 'md:ml-auto md:pl-12'}`}
            >
              {/* node */}
              <div className="absolute top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-electric bg-ink-950"
                style={i % 2 === 0 ? { left: '11px', right: 'auto' } : { left: '11px', right: 'auto' }}
              >
                <div className="h-1.5 w-1.5 rounded-full bg-electric" />
              </div>
              <div className="ml-10 w-full rounded-2xl glass p-6 transition-all duration-300 hover:glass-strong md:ml-0">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-semibold">{exp.role}</h3>
                    <div className="mt-1 flex items-center gap-2 text-sm text-electric">
                      <Briefcase size={13} /> {exp.company}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs text-white/50">{exp.duration}</div>
                    <div className="mt-1 flex items-center justify-end gap-1 text-xs text-white/40">
                      <MapPin size={11} /> {exp.location}
                    </div>
                  </div>
                </div>

                <ul className="space-y-2">
                  {exp.responsibilities.map((r) => (
                    <li key={r} className="flex gap-2 text-sm text-white/60">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-electric/60" />
                      {r}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {exp.achievements.map((a) => (
                    <span key={a} className="inline-flex items-center gap-1.5 rounded-full border border-electric/20 bg-electric/5 px-3 py-1 text-xs text-electric">
                      <CheckCircle2 size={12} /> {a}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
