import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useMagnetic } from '@/hooks/useMagnetic';

type Props = {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'ghost';
  className?: string;
  href?: string;
  icon?: ReactNode;
};

export function MagneticButton({ children, onClick, variant = 'primary', className = '', href, icon }: Props) {
  const { ref, pos } = useMagnetic<HTMLAnchorElement>(0.35);
  const base =
    'group relative inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300';
  const styles =
    variant === 'primary'
      ? 'text-white bg-gradient-to-r from-electric/90 to-violet/90 glow-electric hover:shadow-[0_0_60px_-6px_rgba(56,189,248,0.7)]'
      : 'text-white/90 glass hover:glass-strong hover:border-white/20';

  const content = (
    <>
      <motion.span className="relative z-10 flex items-center gap-2.5" animate={{ x: pos.x, y: pos.y }}>
        {icon}
        {children}
      </motion.span>
      <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(120px circle at center, rgba(255,255,255,0.12), transparent 70%)' }} />
    </>
  );

  if (href) {
    return (
      <a ref={ref} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className={`${base} ${styles} ${className}`}>
        {content}
      </a>
    );
  }
  return (
    <button ref={ref as never} onClick={onClick} className={`${base} ${styles} ${className}`}>
      {content}
    </button>
  );
}
