import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { FadeUp } from '@/components/FadeUp';

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
      <Nav />
      <main>
        <section className="cs">
          <div className="w">
            <FadeUp>
              <a href="/#projects" className="back">All work</a>
            </FadeUp>

            <FadeUp delay={0.04}>
              <h1 className="cs-title">Resolute AI</h1>
              <p className="cs-kicker">Growth Marketing Associate — Candidate Assignment · March 2026</p>
              <p className="cs-lede">
                Resolute tests your blood, has a doctor review the results, and delivers a personalised supplement plan.
              </p>
              <p className="cs-lede">
                I bought the product, used it, and found where it breaks.
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <dl className="cs-meta">
                <div>
                  <dt>Context</dt>
                  <dd>Candidate assignment</dd>
                </div>
                <div>
                  <dt>Date</dt>
                  <dd>March 2026</dd>
                </div>
                <div>
                  <dt>Focus</dt>
                  <dd>Product audit · CRO</dd>
                </div>
              </dl>
            </FadeUp>

            <FadeUp delay={0.14}>
              <p className="cs-label">Key Findings</p>
            </FadeUp>

            <div className="cs-stack">
              {CALLOUTS.map((item, i) => (
                <FadeUp key={item.id} delay={0.18 + i * 0.08}>
                  <article className="cs-card">
                    <span className="cs-num">{item.id}</span>
                    <div>
                      <h2>{item.severity}</h2>
                      <blockquote>{item.finding}</blockquote>
                      <p className="cs-note">{item.recommendation}</p>
                    </div>
                  </article>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.46}>
              <div className="cs-action">
                <a href="/resolute-assignment.pdf" download className="btn btn-solid">
                  Download the assignment
                </a>
              </div>
            </FadeUp>
          </div>
        </section>
      </main>
    </>
  );
}
