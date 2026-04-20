'use client';

import { FadeUp } from '@/components/FadeUp';
import { SectionLabel } from '@/components/SectionLabel';

const LINKS = [
  {
    label:   'Email',
    display: 'nikhilkabi0504@gmail.com',
    href:    'mailto:nikhilkabi0504@gmail.com',
  },
  {
    label:   'LinkedIn',
    display: 'linkedin.com/in/nikhil-k-abi',
    href:    'https://www.linkedin.com/in/nikhil-k-abi-9a0b42169/',
  },
  {
    label:   'GitHub',
    display: 'github.com/Nikhilkabi',
    href:    'https://github.com/Nikhilkabi',
  },
] as const;

export function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      style={{ paddingBlock: 'clamp(4.5rem,9vw,8rem)' }}
    >
      <div className="w">
        <FadeUp>
          <SectionLabel>04 — Contact</SectionLabel>
        </FadeUp>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }} className="ct-grid-outer">
          <FadeUp delay={0.06}>
            <h2 className="ct-head">
              Let&rsquo;s<br /><em>talk<span className="d">.</span></em>
            </h2>
            <p className="ct-sub">
              If the role needs both sides of the brain, reach out.
            </p>
          </FadeUp>

          <FadeUp delay={0.14}>
            <dl className="ct-list">
              {LINKS.map(({ label, display, href }) => (
                <div key={label} className="ct-row">
                  <dt>{label}</dt>
                  <dd>
                    <a
                      href={href}
                      target={href.startsWith('mailto') ? undefined : '_blank'}
                      rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    >
                      {display} <span className="ct-arrow">→</span>
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </FadeUp>
        </div>

        <footer className="ft">
          <span>Nikhil K Abi © 2026</span>
          <div className="ft-mark">Built with Next.js</div>
        </footer>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .ct-grid-outer { grid-template-columns: 1fr 1fr !important; gap: 8rem !important; align-items: start; }
        }
      `}</style>
    </section>
  );
}
