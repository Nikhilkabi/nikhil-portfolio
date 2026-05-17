export interface Project {
  id: string;
  title: string;
  label: string;
  description: string;
  tags: string[];
  link?: string;
  linkLabel?: string;
  github?: string;
  image?: string;
  wip?: boolean;
}

export const projects: Project[] = [
  {
    id: 'personal-expense-tracker',
    title: 'Personal Expense Tracker',
    label: 'Built in Excel. No subscriptions. No apps. Just works.',
    description: 'Tracks income, expenses, and budget vs. actuals in real time. One file, fully automated. Log a transaction, and the dashboard updates itself.',
    tags: ['Excel / M365', 'Named Ranges', 'SUMPRODUCT', 'INDEX / MATCH', 'Dynamic Dashboard', 'Data Validation'],
    link: '/personal-expense-tracker.xlsx',
    linkLabel: 'Download File',
  },
  {
    id: 'resolute-ai',
    title: 'Resolute AI: Growth Audit',
    label: 'Candidate assignment. First-hand product audit.',
    description: 'Bought the product. Found ten breaks in the B2C journey. Mapped the fix.',
    tags: ['Growth Marketing', 'Product Audit', 'CRO', 'Competitive Analysis', '30/60/90 Plan'],
    link: '/work/resolute-ai',
    linkLabel: 'View Case Study',
  },
  {
    id: 'gmail-ai-classifier',
    title: 'Gmail AI Classifier',
    label: 'Built for myself. Zero inbox noise since.',
    description: 'Every email read, classified, and labelled. No manual sorting, ever.',
    tags: ['N8N', 'Google Gemini', 'AI Automation', 'Gmail API', 'Workflow Design'],
    image: '/gmail-classifier.png',
    link: '/work/gmail-classifier',
    linkLabel: 'View Case Study',
  },
];
