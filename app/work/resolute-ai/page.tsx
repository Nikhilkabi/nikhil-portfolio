import type { Metadata } from 'next';
import { Cursor } from '@/components/Cursor';
import { Nav } from '@/components/Nav';
import { FadeUp } from '@/components/FadeUp';
import { SectionLabel } from '@/components/SectionLabel';

export const metadata: Metadata = {
  title: 'Resolute AI — Nikhil K Abi',
  description: 'Growth marketing candidate assignment: product audit, competitive gaps, and 30/60/90-day plan.',
};

const CALLOUTS = [
  {
    id: '01',
    severity: 'Critical',
    finding:
      'A technician visits your home to collect blood. Mine never showed. Nobody from Resolute said anything.',
    recommendation:
      'The user should never be the last to know.',
  },
  {
    id: '02',
    severity: 'Critical',
    finding:
      'Your blood results are reviewed by a doctor and personalised to your body. They are delivered as a PDF.',
    recommendation:
      'A dashboard that leads with what\'s urgent and tells you what to do next.',
  },
  {
    id: '03',
    severity: 'Critical',
    finding:
      'The upsell sits at the very end of the PDF. By the time I got there, I had already bought the supplements myself.',
    recommendation:
      'Tie the upsell to the finding. That\'s the conversion peak.',
  },
] as const;

export default function ResoluteAICaseStudy() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <section style={{ paddingBlock: 'clamp(6rem, 10vw, 9rem)' }}>
          <div className="w">

            {/* Back link */}
            <FadeUp>
              <a href="/#projects" className="p-link" style={{ display: 'inline-flex', marginBottom: '2.5rem' }}>
                <span className="p-arrow">←</span> All Projects
              </a>
            </FadeUp>

            <FadeUp delay={0.04}>
              <SectionLabel>Case Study</SectionLabel>
            </FadeUp>

            {/* Heading */}
            <FadeUp delay={0.08}>
              <h1 className="p-title" style={{ fontSize: 'clamp(2.25rem, 6vw, 4.5rem)', marginBottom: '0.5rem' }}>
                Resolute AI
              </h1>
            </FadeUp>

            {/* Role context */}
            <FadeUp delay={0.12}>
              <p className="p-label" style={{ marginBottom: '1.5rem' }}>
                Growth Marketing Associate — Candidate Assignment · March 2026
              </p>
            </FadeUp>

            {/* Context line */}
            <FadeUp delay={0.14}>
              <p className="p-desc" style={{ maxWidth: '640px', marginBottom: '1.5rem' }}>
                Resolute tests your blood, has a doctor review the results, and delivers a personalised supplement plan.
              </p>
            </FadeUp>

            {/* Intro */}
            <FadeUp delay={0.16}>
              <p className="p-desc" style={{ maxWidth: '640px', marginBottom: '3rem' }}>
                I bought the product, used it, and found where it breaks.
              </p>
            </FadeUp>

            {/* Key findings label */}
            <FadeUp delay={0.2}>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '.58rem',
                textTransform: 'uppercase',
                letterSpacing: '.18em',
                color: '#D4592A',
                marginBottom: '1.75rem',
              }}>
                Key Findings
              </p>
            </FadeUp>

            {/* Callouts */}
            {CALLOUTS.map((item, i) => (
              <FadeUp key={item.id} delay={0.24 + i * 0.1}>
                <div style={{ marginBottom: '2rem' }}>
                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '.58rem',
                    textTransform: 'uppercase',
                    letterSpacing: '.14em',
                    color: '#7A7570',
                    marginBottom: '.5rem',
                  }}>
                    {item.id} — {item.severity}
                  </p>
                  <blockquote className="ab-pull" style={{ marginTop: 0 }}>
                    {item.finding}
                  </blockquote>
                  <p className="p-desc" style={{ marginTop: '.75rem', marginBottom: 0 }}>
                    {item.recommendation}
                  </p>
                </div>
              </FadeUp>
            ))}

            {/* Download button */}
            <FadeUp delay={0.56}>
              <div style={{ marginTop: '3rem' }}>
                <a
                  href="/resolute-assignment.pdf"
                  download
                  className="h-cta"
                >
                  Download Full Assignment
                </a>
              </div>
            </FadeUp>

          </div>
        </section>
      </main>
    </>
  );
}
