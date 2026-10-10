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
        <img className="pv-img" src={visual.src} alt="" />
      </div>
    );
  }

  if (visual.kind === 'audit') {
    return (
      <div className="pv" aria-hidden="true">
        <span className="pv-tag">Audit</span>
        <div className="pv-rows">
          <div><i>01</i><b /><em>Visit</em></div>
          <div><i>02</i><b /><em>Results</em></div>
          <div className="hot"><i>03</i><b /><em>Upsell</em></div>
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

export function Projects() {
  const railRef = useRef<HTMLDivElement>(null);
  const [canSlide, setCanSlide] = useState(false);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    const check = () => setCanSlide(el.scrollWidth > el.clientWidth + 8);
    check();

    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="block" aria-label="Selected projects">
      <div className="w rail-head">
        <h2>Work</h2>
        {canSlide && <p>Slide through</p>}
      </div>
      <div className="rail" ref={railRef}>
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
    </section>
  );
}
