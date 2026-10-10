import { FadeUp } from '@/components/FadeUp';

const FACTS = [
  { label: 'Years', value: '4' },
  { label: 'Base', value: 'Bangalore' },
  { label: 'Focus', value: 'Growth, ops, revenue' },
  { label: 'Status', value: 'Open', hi: true },
] as const;

export function About() {
  return (
    <section id="about" className="block" aria-label="About">
      <div className="w">
        <FadeUp>
          <div className="bento">
            <blockquote className="glass quote">
              Good instincts, verified.
            </blockquote>

            <div className="glass story">
              <p>Nielsen Sports taught me accuracy.</p>
              <p>YuviPep taught me speed.</p>
              <p>I haven&rsquo;t had to choose between them since.</p>
            </div>

            <article className="glass tile">
              <span>Accuracy</span>
              <h2>Nielsen Sports</h2>
            </article>
            <article className="glass tile">
              <span>Speed</span>
              <h2>YuviPep</h2>
            </article>

            <dl className="facts">
              {FACTS.map(fact => (
                <div key={fact.label} className="glass fact">
                  <dt>{fact.label}</dt>
                  <dd className={'hi' in fact && fact.hi ? 'hi' : ''}>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
