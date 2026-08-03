import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${mx}px, ${my}px)`;
      }
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor="hover"], input, textarea');
      setHovering(!!interactive);
    }

    function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    window.addEventListener('mousemove', onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{ marginLeft: '-4px', marginTop: '-4px' }}
      >
        <div className={`h-2 w-2 rounded-full bg-electric transition-transform duration-200 ${hovering ? 'scale-150' : 'scale-100'}`} />
      </div>
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden md:block"
        style={{ marginLeft: '-20px', marginTop: '-20px' }}
      >
        <div
          className={`h-10 w-10 rounded-full border transition-all duration-200 ${
            hovering ? 'border-violet/70 scale-125' : 'border-white/30 scale-100'
          }`}
        />
      </div>
    </>
  );
}
