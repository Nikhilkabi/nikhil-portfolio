'use client';

import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { label: 'About',    href: '#about'    },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact'  },
] as const;

export function Nav() {
  const [scrolled,       setScrolled]       = useState(false);
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [activeSection,  setActiveSection]  = useState('');

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const ids = ['about', 'skills', 'projects', 'contact'];
    const observers: IntersectionObserver[] = [];

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(id); }),
        { threshold: 0.4 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header id="nav" className={scrolled ? 'scrolled' : ''}>
      <div className="w" style={{ height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#hero" className="nav-brand">NK</a>

        <nav className="nav-links" aria-label="Main navigation">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link${activeSection === link.href.slice(1) ? ' active' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          className="nav-hamburger"
          id="hbg"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`nav-drawer${menuOpen ? ' open' : ''}`}>
        {NAV_LINKS.map(link => (
          <a key={link.href} href={link.href} onClick={closeMenu}>
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
}
