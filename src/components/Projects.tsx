import { useState, useMemo, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, X, CheckCircle2, AlertCircle, Target, Lightbulb, TrendingUp } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { projects, type Project } from '@/data/content';

const categories = ['All', 'Web App', 'Full Stack', 'Tool', 'Automation'] as const;

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const [hover, setHover] = useState(false);
  const openExternalLink = (event: MouseEvent) => event.stopPropagation();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      exit={{ opacity: 0, scale: 0.95 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onOpen}
      className="group relative cursor-pointer overflow-hidden rounded-3xl glass transition-all duration-500 hover:glass-strong"
    >
      {/* Visual */}
      <div className="relative h-56 overflow-hidden md:h-64">
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${project.accent}40, transparent 60%), radial-gradient(circle at 70% 70%, ${project.accent}20, transparent 50%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 to-transparent" />
        <motion.div
          animate={hover ? { rotate: 12, scale: 1.1 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-xl glass-strong"
        >
          <span className="font-display text-lg font-bold" style={{ color: project.accent }}>
            {project.title.charAt(0)}
          </span>
        </motion.div>
        <div className="absolute right-5 top-5 rounded-full glass px-3 py-1 text-[10px] uppercase tracking-widest text-white/60">
          {project.category}
        </div>
        <div className="absolute bottom-5 left-6 right-6">
          <h3 className="font-display text-2xl font-bold md:text-3xl">{project.title}</h3>
          <p className="mt-1 text-sm text-white/50">{project.tagline}</p>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <p className="text-sm leading-relaxed text-white/60">{project.overview}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/50">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between">
          <button className="flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-electric">
            View case study <ArrowUpRight size={14} />
          </button>
          <div className="flex gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={openExternalLink}
                className="rounded-full glass p-2 text-white/50 transition-colors hover:text-white"
                aria-label={`View ${project.title} live site`}
              >
                <ArrowUpRight size={14} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={openExternalLink}
                className="rounded-full glass p-2 text-white/50 transition-colors hover:text-white"
                aria-label={`View ${project.title} on GitHub`}
              >
                <Github size={14} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* hover glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: `0 0 60px -10px ${project.accent}50` }}
      />
    </motion.div>
  );
}

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[150] flex items-start justify-center overflow-y-auto bg-ink-950/80 p-4 backdrop-blur-md md:p-10"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="my-auto w-full max-w-3xl overflow-hidden rounded-3xl glass-strong"
        >
          <div
            className="relative h-40 overflow-hidden"
            style={{ background: `radial-gradient(circle at 30% 50%, ${project.accent}40, transparent 70%)` }}
          >
            <button onClick={onClose} className="absolute right-5 top-5 rounded-full glass p-2.5 text-white" aria-label="Close">
              <X size={16} />
            </button>
          </div>
          <div className="p-8 md:p-10">
            <div className="mb-2 text-xs uppercase tracking-widest text-white/40">{project.category}</div>
            <h3 className="font-display text-3xl font-bold md:text-4xl">{project.title}</h3>
            <p className="mt-2 text-white/50">{project.tagline}</p>

            <div className="mt-8 space-y-6">
              <div className="flex gap-3">
                <Target size={18} className="mt-0.5 shrink-0 text-electric" />
                <div>
                  <h4 className="font-semibold">Problem</h4>
                  <p className="mt-1 text-sm text-white/60">{project.problem}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Lightbulb size={18} className="mt-0.5 shrink-0 text-violet" />
                <div>
                  <h4 className="font-semibold">Solution</h4>
                  <p className="mt-1 text-sm text-white/60">{project.solution}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <AlertCircle size={18} className="mt-0.5 shrink-0 text-cyber" />
                <div>
                  <h4 className="font-semibold">Challenges</h4>
                  <p className="mt-1 text-sm text-white/60">{project.challenges}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <TrendingUp size={18} className="mt-0.5 shrink-0 text-electric" />
                <div>
                  <h4 className="font-semibold">Results</h4>
                  <p className="mt-1 text-sm text-white/60">{project.results}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                  {t}
                </span>
              ))}
            </div>

            {(project.liveUrl || project.githubUrl) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-electric to-violet px-5 py-2.5 text-sm font-medium text-white"
                  >
                    <ArrowUpRight size={15} /> View live site
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm text-white/80 hover:glass-strong"
                  >
                    <Github size={15} /> View code
                  </a>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<(typeof categories)[number]>('All');
  const [active, setActive] = useState<Project | null>(null);

  const filtered = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="projects" className="relative z-10 mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
      <SectionHeading index="03" title="Selected work" subtitle="A few projects where engineering and design had to meet in the middle." />

      <div className="mb-12 flex flex-wrap gap-2.5">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full px-4 py-2 text-sm transition-all duration-300 ${
              filter === c
                ? 'bg-gradient-to-r from-electric to-violet text-white'
                : 'glass text-white/60 hover:text-white'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={() => setActive(p)} />
          ))}
        </AnimatePresence>
      </motion.div>

      {active && <CaseStudyModal project={active} onClose={() => setActive(null)} />}
    </section>
  );
}
