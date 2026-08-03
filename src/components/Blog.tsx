import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, ArrowUpRight } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { blogPosts, profile } from '@/data/content';

export function Blog() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(
    () =>
      blogPosts.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.tag.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  return (
    <section id="blog" className="relative z-10 mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
      <SectionHeading index="07" title="Writing" subtitle="Notes on frontend craft, performance, and the web platform." />

      <div className="mb-10 flex max-w-md items-center gap-3 rounded-full glass px-5 py-3">
        <Search size={16} className="text-white/40" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles…"
          className="w-full bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {filtered.map((post, i) => (
          <motion.a
            key={post.title}
            href={profile.medium}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group spotlight relative overflow-hidden rounded-2xl glass p-7 transition-all duration-300 hover:glass-strong"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
              e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
            }}
          >
            <div className="flex items-center justify-between text-xs text-white/40">
              <span className="rounded-full border border-electric/20 bg-electric/5 px-2.5 py-1 text-electric">{post.tag}</span>
              <span className="flex items-center gap-1.5"><Clock size={11} /> {post.readingTime}</span>
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold leading-snug transition-colors group-hover:text-gradient">
              {post.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/55">{post.excerpt}</p>
            <div className="mt-6 flex items-center justify-between">
              <span className="font-mono text-xs text-white/30">{post.date}</span>
              <span className="flex items-center gap-1 text-sm text-white/60 transition-colors group-hover:text-electric">
                Read <ArrowUpRight size={14} />
              </span>
            </div>
          </motion.a>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="py-10 text-center text-white/40">No articles match "{query}".</p>
      )}
    </section>
  );
}
