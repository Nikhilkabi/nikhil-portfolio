'use client';

import { useEffect, useRef, useState } from 'react';
import { projects, type ProjectLink, type ProjectVisual } from '@/data/projects';

function anchorProps(link: ProjectLink) {
  const newTab = link.kind === 'external';
  return {
    href: link.href,
    download: link.kind === 'download' || undefined,
    target: newTab ? '_blank' : undefined,
    rel: newTab ? 'noopener noreferrer' : undefined,
  } as const;
}

function ProjectVisual({ visual }: { visual: ProjectVisual }) {
  if (visual.kind === 'image') {
    return (
      <div className="pv">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="pv-img"
          src={visual.src}
          alt=""
          style={visual.position ? { objectPosition: visual.position } : undefined}
        />
      </div>
    );
  }

  if (visual.kind === 'rows') {
    return (
      <div className="pv" aria-hidden="true">
        <span className="pv-tag">{visual.tag}</span>
        <div className="pv-rows">
          {visual.rows.map(row => (
            <div key={row.n} className={row.hot ? 'hot' : undefined}>
              <i>{row.n}</i><b /><em>{row.label}</em>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="pv" aria-hidden="true">
      <span className="pv-tag">Ledger</span>
      <div className="pv-bars">
        <span style={{ height: '42%' }} />
        <span style={{ height: '68%' }} />
        <span style={{ height: '36%' }} />
        <span className="hot" style={{ height: '86%' }} />
        <span style={{ height: '54%' }} />
        <span style={{ height: '73%' }} />
      </div>
    </div>
  );
}

function cardStops(rail: HTMLElement) {
  const cards = [...rail.querySelectorAll<HTMLElement>('.shot')];
  const origin = cards[0]?.offsetLeft ?? 0;
  return cards.map(card => Math.max(0, card.offsetLeft - origin));
}

export function Projects() {
  const railRef = useRef<HTMLDivElement>(null);
  const [canSlide, setCanSlide] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    const measure = () => {
      const max = el.scrollWidth - el.clientWidth;
      setCanSlide(max > 8);
      setAtStart(el.scrollLeft <= 8);
      setAtEnd(el.scrollLeft >= max - 8);
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    el.addEventListener('scroll', measure, { passive: true });
    return () => {
      observer.disconnect();
      el.removeEventListener('scroll', measure);
    };
  }, []);

  const slide = (direction: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const places = cardStops(el);
    const current = el.scrollLeft;
    const target = direction > 0
      ? places.find(stop => stop > current + 24)
      : [...places].reverse().find(stop => stop < current - 24);
    if (target == null) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollTo({ left: Math.min(target, el.scrollWidth - el.clientWidth), behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <section id="projects" className="block" aria-label="Selected projects">
      <div className="w rail-head">
        <h2>Work</h2>
      </div>
      <div className="rail-frame">
      {canSlide && !atStart && (
        <button type="button" className="rail-nav prev" aria-label="Previous project" onClick={() => slide(-1)}>
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3 L5 8 L10 13" /></svg>
        </button>
      )}
      {canSlide && !atEnd && (
        <button type="button" className="rail-nav next" aria-label="Next project" onClick={() => slide(1)}>
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3 L5 8 L10 13" /></svg>
        </button>
      )}
      <div className="rail" id="work-rail" ref={railRef}>
        {projects.map(project => {
          const link = project.link ? anchorProps(project.link) : null;
          return (
            <article key={project.id} className="shot glass" aria-label={project.title}>
              {link ? (
                <a {...link} className="pv-link" tabIndex={-1} aria-hidden="true">
                  <ProjectVisual visual={project.visual} />
                </a>
              ) : (
                <ProjectVisual visual={project.visual} />
              )}
              <div className="shot-body">
                <p className="shot-label">{project.label}</p>
                <h3>{link ? <a {...link}>{project.title}</a> : project.title}</h3>
                <p className="shot-desc">{project.description}</p>
                {project.tags.length > 0 && (
                  <div className="tags">
                    {project.tags.map(tag => <span key={tag}>{tag}</span>)}
                  </div>
                )}
                {link && (
                  <a {...link} className="shot-go">{project.link?.label}</a>
                )}
              </div>
            </article>
          );
        })}
      </div>
      </div>
    </section>
  );
}
