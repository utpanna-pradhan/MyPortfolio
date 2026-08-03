import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import { profile } from '@/data/content';

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const href = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent('Hi Utpanna, I saw your portfolio and would like to discuss an opportunity.')}`;

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring' }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] shadow-lg shadow-[#25d366]/30 transition-transform hover:scale-110"
        aria-label="WhatsApp"
      >
        <MessageCircle size={24} className="text-white" />
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25d366]/40" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-[91] w-72 overflow-hidden rounded-2xl glass-strong p-5"
          >
            <button onClick={() => setOpen(false)} className="absolute right-4 top-4 text-white/40 hover:text-white" aria-label="Close">
              <X size={16} />
            </button>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25d366]/20 text-[#25d366]">
                <MessageCircle size={18} />
              </div>
              <div>
                <div className="font-semibold text-white">Utpanna Pradhan</div>
                <div className="text-xs text-[#25d366]">Typically replies in a day</div>
              </div>
            </div>
            <p className="mb-4 rounded-2xl rounded-tl-sm bg-white/5 p-3 text-sm text-white/70">
              Hi there! Thanks for visiting my portfolio. How can I help you today?
            </p>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25d366] px-4 py-2.5 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
            >
              <MessageCircle size={15} /> Start chat on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
