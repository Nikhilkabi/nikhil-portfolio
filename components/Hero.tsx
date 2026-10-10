'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();
  const base = reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 };

  return (
    <section id="hero" className="stage" aria-label="Introduction">
      <motion.div
        className="stage-card"
        initial={base}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <div>
          <h1 className="stage-name">Nikhil K Abi</h1>
          <p className="stage-role">Growth and marketing operations</p>
          <p className="stage-bio">Data-trained. Creatively wired. Based in Bangalore.</p>
        </div>
        <div className="stage-side">
          <div className="stage-actions">
            <a href="#projects" className="btn btn-solid">View the work</a>
            <a href="#contact" className="btn btn-glass">Get in touch</a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
