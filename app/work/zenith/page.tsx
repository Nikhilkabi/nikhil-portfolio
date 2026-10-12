import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { FadeUp } from '@/components/FadeUp';

export const metadata: Metadata = {
  title: 'Zenith — Nikhil K Abi',
  description: 'A local-first Windows app for trips, a bucket list, and the places you mean to go.',
};

const SECTIONS = [
  {
    id: '01',
    label: 'The Problem',
    finding:
      'Trip apps want an account, a browser, and somewhere else for the photos.',
    recommendation:
      'I wanted the places I mean to go filed on this computer.',
  },
  {
    id: '02',
    label: 'The App',
    finding:
      'Zenith is a Windows desktop app. The home wall is trips, a bucket list, and countries. A country opens into places, with photos, notes, and saved links. Paste a URL or drop a screenshot into the inbox and file it when you know where it belongs. Search covers countries, places, notes, links, and whatever is still unfiled.',
    recommendation:
      'The library is a SQLite file and a folder in Documents. Export writes a zip. Import merges it back.',
  },
  {
    id: '03',
    label: 'The Result',
    finding:
      'Double-click Zenith on the desktop. No terminal. No account. Deletes sit in trash for 30 days, and HEIC is turned away with a clear message.',
    recommendation: null,
  },
] as const;

export default function ZenithCaseStudy() {
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
              <h1 className="cs-title">Zenith</h1>
              <p className="cs-kicker">A local-first bucket list for Windows.</p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <dl className="cs-meta">
                <div>
                  <dt>Built for</dt>
                  <dd>Personal use</dd>
                </div>
                <div>
                  <dt>Stack</dt>
                  <dd>Tauri · Rust · SQLite</dd>
                </div>
                <div>
                  <dt>Runs on</dt>
                  <dd>Windows desktop</dd>
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
                    </div>
                  </article>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.42}>
              <div className="cs-action">
                <a
                  href="https://github.com/Nikhilkabi/zenith"
                  className="btn btn-solid"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </a>
              </div>
            </FadeUp>
          </div>
        </section>
      </main>
    </>
  );
}
