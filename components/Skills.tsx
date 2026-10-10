'use client';

import { skillCategories } from '@/data/skills';

const ROWS = [
  skillCategories.flatMap(cat => cat.skills),
  ['Growth', 'Marketing Ops', 'RevOps', 'Analytics', 'Automation', 'CRO', 'Bangalore'],
  skillCategories.map(cat => cat.category),
];

function Lane({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const half = [...items, ...items];
  const loop = [...half, ...half];
  return (
    <div className={`lane${reverse ? ' lane-rev' : ''}`}>
      <div className="lane-track">
        {loop.map((item, i) => (
          <span className="chip" key={`${item}-${i}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="rivers" aria-label="Skills and tools">
      <ul className="sr-only">
        {ROWS[0].map(skill => <li key={skill}>{skill}</li>)}
      </ul>
      <div className="river-set" aria-hidden="true">
        {ROWS.map((items, i) => (
          <Lane key={i} items={items} reverse={i === 1} />
        ))}
      </div>
    </section>
  );
}
