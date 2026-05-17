import type { Metadata } from 'next';
import { Cursor } from '@/components/Cursor';
import { Nav } from '@/components/Nav';
import { FadeUp } from '@/components/FadeUp';
import { SectionLabel } from '@/components/SectionLabel';

export const metadata: Metadata = {
  title: 'Gmail AI Classifier — Nikhil K Abi',
  description: 'n8n automation workflow powered by Google Gemini that classifies and labels every incoming email automatically.',
};

const SECTIONS = [
  {
    id: '01',
    label: 'The Problem',
    finding:
      'Job searching means subscriptions, alerts, newsletters, and noise, all landing in the same inbox.',
    recommendation:
      'Manual sorting was eating time I didn\'t have.',
  },
  {
    id: '02',
    label: 'The Solution',
    finding:
      'Built an n8n automation workflow powered by Google Gemini. Every incoming email is read, classified, and routed to the correct Gmail label automatically, Job Alerts, Newsletters, Subscriptions, or Monitoring.',
    recommendation:
      'No rules. No filters. Actual AI classification.',
  },
  {
    id: '03',
    label: 'The Result',
    finding:
      'Zero manual inbox sorting since deployment. The workflow runs silently in the background, every email is where it should be before I open my inbox.',
    recommendation: null,
  },
] as const;

export default function GmailClassifierCaseStudy() {
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
                Gmail AI Classifier
              </h1>
            </FadeUp>

            {/* Subheader */}
            <FadeUp delay={0.12}>
              <p className="p-label" style={{ marginBottom: '3rem' }}>
                Built for myself. Zero inbox noise since.
              </p>
            </FadeUp>

            {/* Sections */}
            {SECTIONS.map((item, i) => (
              <FadeUp key={item.id} delay={0.16 + i * 0.1}>
                <div style={{ marginBottom: '2rem' }}>
                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '.58rem',
                    textTransform: 'uppercase',
                    letterSpacing: '.14em',
                    color: '#7A7570',
                    marginBottom: '.5rem',
                  }}>
                    {item.id} — {item.label}
                  </p>
                  <blockquote className="ab-pull" style={{ marginTop: 0 }}>
                    {item.finding}
                  </blockquote>
                  {item.recommendation && (
                    <p className="p-desc" style={{ marginTop: '.75rem', marginBottom: 0 }}>
                      {item.recommendation}
                    </p>
                  )}
                </div>

                {/* Workflow image — placed after The Solution section */}
                {item.id === '02' && (
                  <FadeUp delay={0.36}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/gmail-classifier.png"
                      alt="n8n Gmail AI Classifier workflow"
                      style={{
                        display: 'block',
                        width: '100%',
                        maxWidth: '640px',
                        border: '1px solid #E0DCD5',
                        marginTop: '1.5rem',
                        marginBottom: '1rem',
                      }}
                    />
                  </FadeUp>
                )}
              </FadeUp>
            ))}

          </div>
        </section>
      </main>
    </>
  );
}
