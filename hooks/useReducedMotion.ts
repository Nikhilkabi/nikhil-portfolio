'use client';

import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';

/**
 * Returns true if the user has requested reduced motion via OS-level setting.
 * Use this to gate all Framer Motion animations site-wide.
 */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false;
}
