import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { profile } from '@/data/content';

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 px-6 py-16 md:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="font-display text-3xl font-medium text-gradient-soft md:text-5xl">
            "{profile.tagline}"
          </p>
        </motion.div>

        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="text-gradient">UP</span><span className="text-white/30">.</span>
          </div>

          <div className="flex items-center gap-4">
            <a href={profile.github} target="_blank" rel="noreferrer" className="rounded-full glass p-2.5 text-white/60 transition-colors hover:text-white" aria-label="GitHub"><Github size={16} /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="rounded-full glass p-2.5 text-white/60 transition-colors hover:text-white" aria-label="LinkedIn"><Linkedin size={16} /></a>
            <a href={`mailto:${profile.email}`} className="rounded-full glass p-2.5 text-white/60 transition-colors hover:text-white" aria-label="Email"><Mail size={16} /></a>
            <a href={profile.resumeUrl} className="rounded-full glass p-2.5 text-white/60 transition-colors hover:text-white" aria-label="Resume"><FileText size={16} /></a>
          </div>

          <a href="#hero" className="flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white">
            Back to top <ArrowUp size={14} />
          </a>
        </div>

        <div className="mt-10 border-t border-white/5 pt-6 text-center text-xs text-white/30">
          © {new Date().getFullYear()} Utpanna Pradhan. Designed & built with React, Three.js & Framer Motion.
        </div>
      </div>
    </footer>
  );
}
