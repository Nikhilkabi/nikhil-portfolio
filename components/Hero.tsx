'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();
  const base = reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 };

  return (
    <section
      id="hero"
      aria-label="Introduction"
      style={{ position: 'relative', minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '52px', overflow: 'hidden' }}
    >
      <div className="h-block" aria-hidden="true" />

      <div className="w" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className="h-meta"
          initial={base}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
        >
          <span className="h-meta-l">Portfolio — 2026</span>
          <span className="h-meta-r">Bangalore, India</span>
        </motion.div>

        <motion.h1
          className="h-name"
          initial={base}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.2 }}
        >
          Nikhil<br /><em>K Abi<span className="h-dot">.</span></em>
        </motion.h1>

        <motion.div
          className="h-foot"
          initial={base}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.38 }}
        >
          <p className="h-role">Growth &amp;<br />Marketing Operations</p>
          <div className="h-r">
            <p className="h-bio">Data-trained. Creatively wired.</p>
            <a href="#projects" className="h-cta">View My Work ↓</a>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="h-hint"
        aria-hidden="true"
        initial={base}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.65 }}
      >
        <div className="h-hint-bar" />
        <span>Scroll</span>
      </motion.div>
    </section>
  );
}
