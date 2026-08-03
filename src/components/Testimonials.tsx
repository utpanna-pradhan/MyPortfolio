import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { testimonials } from '@/data/content';

export function Testimonials() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  const t = testimonials[idx];

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
      <SectionHeading index="06" title="Kind words" />

      <div className="relative mx-auto max-w-3xl">
        <Quote size={48} className="mx-auto mb-8 text-electric/30" />
        <div className="relative h-64 md:h-56">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center text-center"
            >
              <p className="font-display text-xl font-medium leading-relaxed text-white/85 md:text-2xl">
                "{t.quote}"
              </p>
              <div className="mt-8 flex items-center gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full font-display font-bold"
                  style={{ background: `${t.accent}25`, color: t.accent, border: `1px solid ${t.accent}40` }}
                >
                  {t.initials}
                </div>
                <div className="text-left">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-white/40">{t.role} · {t.company}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === idx ? 'w-8 bg-electric' : 'w-1.5 bg-white/20'
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
