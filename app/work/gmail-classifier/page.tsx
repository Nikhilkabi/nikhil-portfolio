import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { FadeUp } from '@/components/FadeUp';

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
    figure: {
      src: '/gmail-classifier.png',
      alt: 'n8n Gmail AI Classifier workflow',
    },
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
      <Nav />
      <main>
        <section className="cs">
          <div className="w">
            <FadeUp>
              <a href="/#projects" className="back">All work</a>
            </FadeUp>

            <FadeUp delay={0.04}>
              <h1 className="cs-title">Gmail AI Classifier</h1>
              <p className="cs-kicker">Built for myself. Zero inbox noise since.</p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <dl className="cs-meta">
                <div>
                  <dt>Built for</dt>
                  <dd>Personal use</dd>
                </div>
                <div>
                  <dt>Stack</dt>
                  <dd>n8n · Google Gemini</dd>
                </div>
                <div>
                  <dt>Outcome</dt>
                  <dd>Zero manual sorting</dd>
                </div>
              </dl>
            </FadeUp>

            <div className="cs-stack">
              {SECTIONS.map((item, i) => (
                <FadeUp key={item.id} delay={0.16 + i * 0.08}>
                  <article className="cs-card">
                    <span className="cs-num">{item.id}</span>
                    <div>
                      <h2>{item.label}</h2>
                      <blockquote>{item.finding}</blockquote>
                      {item.recommendation && (
                        <p className="cs-note">{item.recommendation}</p>
                      )}
                      {'figure' in item && item.figure && (
                        <figure className="cs-figure">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.figure.src} alt={item.figure.alt} />
                        </figure>
                      )}
                    </div>
                  </article>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
