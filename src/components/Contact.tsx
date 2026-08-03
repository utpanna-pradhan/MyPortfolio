import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { profile } from '@/data/content';

const channels = [
  { label: 'Email', value: profile.email, icon: Mail, href: `mailto:${profile.email}?subject=Opportunity for Frontend Developer`, color: '#38bdf8' },
  { label: 'Phone', value: profile.phone, icon: Phone, href: `tel:${profile.phone}`, color: '#22d3ee' },
  { label: 'WhatsApp', value: 'Chat instantly', icon: MessageCircle, href: `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent('Hi Utpanna, I saw your portfolio and would like to discuss an opportunity.')}`, color: '#25d366' },
  { label: 'LinkedIn', value: 'Connect', icon: Linkedin, href: profile.linkedin, color: '#38bdf8' },
  { label: 'GitHub', value: 'Follow', icon: Github, href: profile.github, color: '#a855f7' },
  { label: 'Medium', value: 'Read', icon: Send, href: profile.medium, color: '#22d3ee' },
];

export function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

function submit(e: React.FormEvent) {
  e.preventDefault();

  const message = `
Hi Utpanna 👋

Name: ${form.name}

Email: ${form.email}

Message:
${form.message}
`;

  const whatsappNumber = profile.whatsapp; // Example: 919876543210

  window.open(
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
    "_blank"
  );

  setSent(true);

  setTimeout(() => {
    setSent(false);
    setForm({
      name: "",
      email: "",
      message: "",
    });
  }, 3000);
}

  return (
    <section id="contact" className="relative z-10 mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
      <SectionHeading index="09" title="Let's build something" subtitle="Have a role or a project in mind? I read every message." />

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Channels */}
        <div className="grid grid-cols-2 gap-4">
          {channels.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="spotlight group rounded-2xl glass p-5 transition-all duration-300 hover:glass-strong"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
              }}
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl glass-strong" style={{ color: c.color }}>
                <c.icon size={18} />
              </div>
              <div className="text-sm font-medium text-white/80">{c.label}</div>
              <div className="mt-0.5 truncate text-xs text-white/40">{c.value}</div>
            </motion.a>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.36 }}
            className="col-span-2 flex items-center gap-3 rounded-2xl glass p-5"
          >
            <MapPin size={18} className="text-electric" />
            <div>
              <div className="text-sm font-medium text-white/80">Location</div>
              <div className="text-xs text-white/40">{profile.location} · Open to remote worldwide</div>
            </div>
          </motion.div>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl glass p-8"
        >
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-white/40">Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-electric/50 focus:outline-none focus:ring-1 focus:ring-electric/30"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-white/40">Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-electric/50 focus:outline-none focus:ring-1 focus:ring-electric/30"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-white/40">Message</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-electric/50 focus:outline-none focus:ring-1 focus:ring-electric/30"
                placeholder="Tell me about the role or project…"
              />
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-electric to-violet px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:glow-electric"
            >
              {sent ? (<><CheckCircle2 size={16} /> Message sent</>) : (<>Send message <Send size={15} /></>)}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
