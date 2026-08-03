import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, Code2 } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { profile } from '@/data/content';

const languages = [
  { name: 'TypeScript', pct: 42, color: '#38bdf8' },
  { name: 'JavaScript', pct: 28, color: '#f7df1e' },
  { name: 'CSS', pct: 15, color: '#a855f7' },
  { name: 'HTML', pct: 10, color: '#e34c26' },
  { name: 'Other', pct: 5, color: '#64748b' },
];

const pinned = [
  { name: 'Architectural-Studio-Lab', desc: 'A modern portfolio website for an interior design studio', stars: 1, forks: 1, lang: 'React' },
  { name: 'FlowPiolt-AI', desc: 'A modern SaaS dashboard UI built with React, TypeScript, Vite, and Tailwind CSS.', stars: 0, forks: 0, lang: 'TypeScript' },
  { name: 'salon', desc: 'A responsive salon business website with service listings, appointment booking, pricing, and customer-focused user experience.', stars: 0, forks: 0, lang: 'JavaScript' },
  { name: 'DevPrep', desc: 'A comprehensive collection of JavaScript, React, Node.js, DSA, System Design, AI, theory, coding questions, and interview preparation resources.', stars: 0, forks: 0, lang: 'JavaScript' },
];

function ContributionGraph() {
  const cells = Array.from({ length: 7 * 18 }, () => {
    const r = Math.random();
    return r > 0.85 ? 4 : r > 0.65 ? 3 : r > 0.4 ? 2 : r > 0.2 ? 1 : 0;
  });
  const colors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];
  return (
    <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto">
      {cells.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, delay: (i % 50) * 0.005 }}
          className="h-2.5 w-2.5 rounded-[3px]"
          style={{ background: colors[c] }}
        />
      ))}
    </div>
  );
}

export function GitHub() {
  const [commits, setCommits] = useState(0);

  useEffect(() => {
    let n = 0;
    const target = 847;
    const step = () => {
      n += Math.ceil(target / 60);
      if (n >= target) {
        setCommits(target);
        return;
      }
      setCommits(n);
      requestAnimationFrame(step);
    };
    const t = setTimeout(step, 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="github" className="relative z-10 mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
      <SectionHeading index="08" title="On GitHub" subtitle="Open source contributions and the repositories I keep coming back to." />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Contribution graph + stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl glass p-6 lg:col-span-2"
        >
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Github size={16} className="text-electric" /> {commits} contributions this year
            </div>
            <a href={profile.github} target="_blank" rel="noreferrer" className="text-xs text-electric hover:underline">
              View profile
            </a>
          </div>
          <ContributionGraph />
          <div className="mt-6 flex flex-wrap items-center gap-6">
            {languages.map((l) => (
              <div key={l.name} className="flex items-center gap-2 text-xs text-white/50">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: l.color }} />
                {l.name} <span className="text-white/30">{l.pct}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Language bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-3xl glass p-6"
        >
          <div className="mb-4 flex items-center gap-2 text-sm text-white/70">
            <Code2 size={16} className="text-violet" /> Languages
          </div>
          <div className="flex h-3 w-full overflow-hidden rounded-full">
            {languages.map((l) => (
              <div key={l.name} style={{ width: `${l.pct}%`, background: l.color }} />
            ))}
          </div>
          <div className="mt-6 space-y-3">
            {languages.map((l) => (
              <div key={l.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-white/60">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: l.color }} /> {l.name}
                </span>
                <span className="text-white/40">{l.pct}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Pinned repos */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {pinned.map((repo, i) => (
          <motion.a
            key={repo.name}
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group spotlight rounded-2xl glass p-5 transition-all duration-300 hover:glass-strong"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
              e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
            }}
          >
            <div className="mb-3 flex items-center gap-2">
              <Github size={14} className="text-white/40" />
              <span className="font-mono text-sm font-medium text-white/80 group-hover:text-electric">{repo.name}</span>
            </div>
            <p className="mb-4 text-xs leading-relaxed text-white/50">{repo.desc}</p>
            <div className="flex items-center gap-4 text-xs text-white/40">
              <span className="flex items-center gap-1"><Star size={12} /> {repo.stars}</span>
              <span className="flex items-center gap-1"><GitFork size={12} /> {repo.forks}</span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
