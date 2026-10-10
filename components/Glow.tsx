'use client';

import { useEffect } from 'react';

export function Glow() {
  useEffect(() => {
    const move = (e: PointerEvent) => {
      document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
      document.documentElement.style.setProperty('--my', `${e.clientY}px`);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return <div className="glow" aria-hidden="true" />;
}
