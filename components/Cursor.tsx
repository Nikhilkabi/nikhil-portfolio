'use client';

import { useEffect } from 'react';

export function Cursor() {
  useEffect(() => {
    const cd = document.getElementById('cd');
    const cr = document.getElementById('cr');
    if (!cd || !cr) return;

    let mx = innerWidth / 2, my = innerHeight / 2;
    let rx = mx, ry = my;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      cd.style.left = mx + 'px';
      cd.style.top  = my + 'px';
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button')) {
        document.body.classList.add('link-hover');
      } else {
        document.body.classList.remove('link-hover');
      }
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);

    const tick = () => {
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      cr.style.left = rx + 'px';
      cr.style.top  = ry + 'px';
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div id="cd" aria-hidden="true" />
      <div id="cr" aria-hidden="true" />
    </>
  );
}
