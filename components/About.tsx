'use client';

import { FadeUp } from '@/components/FadeUp';
import { SectionLabel } from '@/components/SectionLabel';

const FACTS = [
  { label: 'Location',   value: 'Bangalore, India',              hi: false },
  { label: 'Experience', value: '4 years',                        hi: false },
  { label: 'Focus',      value: 'Growth · Marketing Ops · RevOps', hi: false },
  { label: 'Currently',  value: 'Open to opportunities',         hi: true  },
] as const;

export function About() {
  return (
    <section id="about" aria-label="About" style={{ paddingBlock: 'clamp(4.5rem,9vw,8rem)' }}>
      <div className="w">
        <FadeUp>
          <SectionLabel>01 — About</SectionLabel>
        </FadeUp>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3.5rem' }}
             className="about-grid">
          {/* Bio */}
          <FadeUp delay={0.06}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(2rem,4.5vw,3.5rem)', letterSpacing: '-.02em', lineHeight: 1.1, color: '#0D0C0A', marginBottom: '2rem' }}>
                Who I <em style={{ fontStyle: 'italic', fontWeight: 400 }}>am.</em>
              </h2>
              <p className="ab-p" style={{ fontFamily: 'var(--font-body)', fontSize: '.9375rem', color: '#7A7570', lineHeight: 1.82 }}>
                Nielsen Sports taught me accuracy.
              </p>
              <p className="ab-p" style={{ fontFamily: 'var(--font-body)', fontSize: '.9375rem', color: '#7A7570', lineHeight: 1.82, marginTop: '.875rem' }}>
                YuviPep taught me speed.
              </p>
              <p className="ab-p" style={{ fontFamily: 'var(--font-body)', fontSize: '.9375rem', color: '#7A7570', lineHeight: 1.82, marginTop: '.875rem' }}>
                I haven&rsquo;t had to choose between them since.
              </p>
              <blockquote className="ab-pull">
                &ldquo;Good instincts, verified.&rdquo;
              </blockquote>
            </div>
          </FadeUp>

          {/* Facts */}
          <FadeUp delay={0.14}>
            <dl className="ab-facts" style={{ display: 'flex', flexDirection: 'column' }}>
              {FACTS.map(({ label, value, hi }) => (
                <div key={label} className="ab-fact">
                  <dt>{label}</dt>
                  <dd className={hi ? 'hi' : ''}>{value}</dd>
                </div>
              ))}
            </dl>
          </FadeUp>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .about-grid { grid-template-columns: 3fr 2fr !important; gap: 6rem !important; }
        }
      `}</style>
    </section>
  );
}
