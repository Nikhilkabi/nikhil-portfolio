'use client';

import { FadeUp } from '@/components/FadeUp';
import { SectionLabel } from '@/components/SectionLabel';
import { projects, type Project } from '@/data/projects';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const num = String(index + 1).padStart(2, '0');

  return (
    <FadeUp delay={index * 0.08}>
      <article
        className={`proj${project.wip ? ' proj-dashed' : ''}`}
        aria-label={project.title}
      >
        <span className="pn-bg" aria-hidden="true">{num}</span>

        <div className="p-inner">
          <span className="p-idx">{num}</span>

          <div className="p-body">
            <h3 className="p-title">{project.title}</h3>
            <p className="p-label">{project.label}</p>

            <p className={`p-desc${project.wip ? ' p-desc-wip' : ''}`}>
              {project.description}
            </p>

            {project.tags.length > 0 && (
              <div className="p-tags">
                {project.tags.map(tag => (
                  <span key={tag} className="p-tag">{tag}</span>
                ))}
              </div>
            )}

            {project.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.image}
                alt={`${project.title} preview`}
                style={{
                  display: 'block',
                  width: '100%',
                  maxWidth: '580px',
                  border: '1px solid #E0DCD5',
                  marginBottom: '1.5rem',
                }}
              />
            )}

            {(project.link || project.github) && (
              <div className="p-links">
                {project.link && (
                  <a href={project.link} className="p-link" download={project.linkLabel === 'Download File' ? true : undefined} target={project.linkLabel === 'Download File' ? undefined : '_blank'} rel="noopener noreferrer">
                    <span className="p-arrow">→</span> {project.linkLabel ?? 'Live Demo'}
                  </a>
                )}
                {project.github && (
                  <a href={project.github} className="p-link" target="_blank" rel="noopener noreferrer">
                    <span className="p-arrow">→</span> GitHub
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </article>
    </FadeUp>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      aria-label="Selected projects"
      style={{ paddingBlock: 'clamp(4.5rem,9vw,8rem)' }}
    >
      <div className="w">
        <FadeUp>
          <SectionLabel>03 — Projects</SectionLabel>
        </FadeUp>

        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
