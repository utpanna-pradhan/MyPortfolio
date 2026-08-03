import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X, Bot } from 'lucide-react';
import { profile, projects, techStack } from '@/data/content';

type Msg = { role: 'user' | 'ai'; text: string };

const seed: Msg[] = [
  { role: 'ai', text: `Hi! I'm Utpanna's portfolio assistant. Ask me about her experience, projects, or tech stack.` },
];

function answer(q: string): string {
  const lower = q.toLowerCase();
  if (/experience|work|intern/.test(lower)) {
    return `Utpanna has experience building modern web applications at Heart It Out, Unified Mentor, and SalesQueen, where she developed frontend features, created reusable UI components, and optimized application performance.She is now seeking a f role.`;
  }
  if (/project|portfolio|work/.test(lower) && /recommend|best|show/.test(lower)) {
    return `Based on your interest, I'd start with "${projects[0].title}" and "${projects[1].title}" — they show her range across immersive UI and full-stack systems.`;
  }
  if (/stack|tech|skill|technology/.test(lower)) {
    const all = techStack.flatMap((t) => t.items).join(', ');
    return `Her core stack: ${all}. She's strongest in React, Next.js, and TypeScript, with motion design and Three.js as a specialty.`;
  }
  if (/hire|available|job|role|open/.test(lower)) {
    return `Yes — Utpanna is open to Frontend Engineer,Fullstack , AI Engineer roles, remote or on-site. Reach out via the contact section.`;
  }
  if (/contact|email|reach/.test(lower)) {
    return `You can reach her at ${profile.email}, or use the contact form on this page. WhatsApp and LinkedIn are also available.`;
  }
  if (/resume|cv/.test(lower)) {
    return `You can download her resume from the About section or the footer. Want me to point you there?`;
  }
  return `Great question. Utpanna is a frontend engineer focused on React, Next.js, TypeScript, and immersive web experiences. Try asking about her projects, experience, or tech stack — or use the contact section to reach her directly.`;
}

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>(seed);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, typing]);

  function send() {
    if (!input.trim()) return;
    const q = input.trim();
    setMsgs((m) => [...m, { role: 'user', text: q }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { role: 'ai', text: answer(q) }]);
      setTyping(false);
    }, 700);
  }

  const suggestions = ['Show me her projects', 'What is her tech stack?', 'Is she available for hire?'];

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.2, type: 'spring' }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-[90] flex items-center gap-2 rounded-full glass-strong px-5 py-3 text-sm text-white shadow-lg transition-transform hover:scale-105"
        aria-label="AI Assistant"
      >
        <Sparkles size={16} className="text-electric" /> Ask AI
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            className="fixed bottom-24 left-6 z-[91] flex h-[460px] w-[340px] flex-col overflow-hidden rounded-2xl glass-strong"
          >
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-electric to-violet">
                  <Bot size={15} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Portfolio Assistant</div>
                  <div className="text-[10px] text-electric">Online</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white" aria-label="Close">
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm ${
                    m.role === 'user' ? 'bg-gradient-to-r from-electric to-violet text-white' : 'bg-white/5 text-white/80'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-white/5 px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40" style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {msgs.length <= 1 && (
              <div className="flex flex-wrap gap-2 px-4 pb-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setInput(s); }}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60 hover:text-white"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 border-t border-white/10 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ask anything…"
                className="w-full bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
              />
              <button onClick={send} className="rounded-full bg-gradient-to-r from-electric to-violet p-2 text-white" aria-label="Send">
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
