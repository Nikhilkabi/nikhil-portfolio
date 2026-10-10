export type ProjectLink = {
  href: string;
  label: string;
  kind: 'download' | 'page' | 'external';
};

export type ProjectVisual =
  | { kind: 'image'; src: string }
  | { kind: 'audit' }
  | { kind: 'bars' };

export interface Project {
  id: string;
  title: string;
  label: string;
  description: string;
  tags: string[];
  visual: ProjectVisual;
  link?: ProjectLink;
}

export const projects: Project[] = [
  {
    id: 'personal-expense-tracker',
    title: 'Personal Expense Tracker',
    label: 'Built in Excel. No subscriptions. No apps. Just works.',
    description: 'Tracks income, expenses, and budget vs. actuals in real time. One file, fully automated. Log a transaction, and the dashboard updates itself.',
    tags: ['Excel / M365', 'Named Ranges', 'SUMPRODUCT', 'INDEX / MATCH', 'Dynamic Dashboard', 'Data Validation'],
    visual: { kind: 'bars' },
    link: {
      href: '/personal-expense-tracker.xlsx',
      label: 'Download File',
      kind: 'download',
    },
  },
  {
    id: 'resolute-ai',
    title: 'Resolute AI: Growth Audit',
    label: 'Candidate assignment. First-hand product audit.',
    description: 'Bought the product. Found ten breaks in the B2C journey. Mapped the fix.',
    tags: ['Growth Marketing', 'Product Audit', 'CRO', 'Competitive Analysis', '30/60/90 Plan'],
    visual: { kind: 'audit' },
    link: {
      href: '/work/resolute-ai',
      label: 'View Case Study',
      kind: 'page',
    },
  },
  {
    id: 'gmail-ai-classifier',
    title: 'Gmail AI Classifier',
    label: 'Built for myself. Zero inbox noise since.',
    description: 'Every email read, classified, and labelled. No manual sorting, ever.',
    tags: ['N8N', 'Google Gemini', 'AI Automation', 'Gmail API', 'Workflow Design'],
    visual: { kind: 'image', src: '/gmail-classifier.png' },
    link: {
      href: '/work/gmail-classifier',
      label: 'View Case Study',
      kind: 'page',
    },
  },
];
