import { motion } from 'framer-motion';

const items = [
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
  'Git',
  'GitHub',
  'REST APIs',
  'Firebase',
  'MongoDB',
  'Vercel',

];

export function Marquee() {
  return (
    <div className="relative z-10 overflow-hidden border-y border-white/5 py-6">
      <motion.div
        className="flex w-max gap-12"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="font-display text-3xl font-bold text-white/20 transition-colors hover:text-gradient md:text-5xl">
              {item}
            </span>
            <span className="text-electric/40">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
