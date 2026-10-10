'use client';

import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { label: 'About',   href: '/#about'   },
  { label: 'Skills',  href: '/#skills'  },
  { label: 'Work',    href: '/#projects' },
  { label: 'Contact', href: '/#contact' },
] as const;

function sectionId(href: string) {
  return href.split('#')[1] ?? '';
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const ids = ['skills', 'about', 'projects', 'contact'];
    let frame = 0;

    const update = () => {
      setScrolled(window.scrollY > 24);
      const present = ids.filter(id => document.getElementById(id));
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current = '';
      if (atEnd && present.length > 0) {
        current = present[present.length - 1];
      } else {
        const line = 120;
        for (const id of present) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= line) current = id;
        }
      }
      setActiveSection(prev => (prev === current ? prev : current));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header id="nav" className={[scrolled ? 'scrolled' : '', menuOpen ? 'menu-open' : ''].filter(Boolean).join(' ')}>
      <div className="nav-bar">
        <a href="/#hero" className="nav-brand">Nikhil</a>

        <nav className="nav-links" aria-label="Main navigation">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link${activeSection === sectionId(link.href) ? ' active' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a href="/#contact" className="nav-status">
          <span className="nav-dot" aria-hidden="true" />
          Open
        </a>

        <button
          className="nav-hamburger"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`nav-drawer${menuOpen ? ' open' : ''}`}>
        {NAV_LINKS.map(link => (
          <a key={link.href} href={link.href} onClick={closeMenu}>{link.label}</a>
        ))}
        <a href="/#contact" onClick={closeMenu}>Open to opportunities</a>
      </div>
    </header>
  );
}
