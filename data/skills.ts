export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: 'Growth & Acquisition',
    skills: ['Google Ads', 'Meta Ads', 'Performance Marketing', 'A/B Testing & CRO'],
  },
  {
    category: 'Data & Analytics',
    skills: ['SQL', 'Excel / Sheets', 'Google Analytics 4'],
  },
  {
    category: 'Automation & AI',
    skills: ['N8N', 'AI Workflow Design', 'Prompt Engineering', 'Claude API'],
  },
  {
    category: 'Development',
    skills: ['Claude Code', 'Antigravity', 'Git / GitHub', 'Lovable'],
  },
];
