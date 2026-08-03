import { useEffect, useState, type RefObject } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowUp, ArrowDown, CornerDownLeft } from 'lucide-react';

type Command = {
  id: string;
  label: string;
  hint: string;
  action: () => void;
};

export function CommandPalette({
  open,
  onClose,
  inputRef,
  commands,
}: {
  open: boolean;
  onClose: () => void;
  inputRef: RefObject<HTMLInputElement>;
  commands: Command[];
}) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open, inputRef]);

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      } else if (e.key === 'Enter' && filtered[active]) {
        e.preventDefault();
        filtered[active].action();
        onClose();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, filtered, active, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[200] flex items-start justify-center bg-ink-950/70 pt-[15vh] backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.96, y: -10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: -10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-[92%] max-w-xl overflow-hidden rounded-2xl glass-strong shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <Search size={18} className="text-white/40" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sections, projects, links…"
                className="w-full bg-transparent text-white placeholder:text-white/30 focus:outline-none"
              />
              <kbd className="rounded glass px-2 py-1 text-[10px] text-white/40">ESC</kbd>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <div className="px-4 py-8 text-center text-sm text-white/40">No results.</div>
              )}
              {filtered.map((c, i) => (
                <button
                  key={c.id}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => {
                    c.action();
                    onClose();
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-colors ${
                    i === active ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  <span className="text-sm text-white/90">{c.label}</span>
                  <span className="font-mono text-xs text-white/30">{c.hint}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-white/10 px-5 py-3 text-[11px] text-white/30">
              <span className="flex items-center gap-2"><ArrowUp size={11} /><ArrowDown size={11} /> Navigate</span>
              <span className="flex items-center gap-2"><CornerDownLeft size={11} /> Open</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
