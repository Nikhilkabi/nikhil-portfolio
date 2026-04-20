'use client';

import { FadeUp } from '@/components/FadeUp';
import { SectionLabel } from '@/components/SectionLabel';
import { skillCategories } from '@/data/skills';

export function Skills() {
  return (
    <section
      id="skills"
      aria-label="Skills and tools"
      style={{ paddingBlock: 'clamp(4.5rem,9vw,8rem)' }}
    >
      <div className="w">
        <FadeUp>
          <SectionLabel>02 — Skills &amp; Tools</SectionLabel>
        </FadeUp>

        <div className="sk-grid">
          {skillCategories.map((cat, i) => (
            <FadeUp key={cat.category} delay={i * 0.07}>
              <div className="sk-col">
                <h3>{cat.category}</h3>
                <ul>
                  {cat.skills.map(skill => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
