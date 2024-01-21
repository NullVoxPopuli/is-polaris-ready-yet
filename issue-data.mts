import jsonData from './issue-data.json';

export interface Dataset {
  category: 'tooling' | 'authoring experience' | 'other';
  issues: string[]
}

export const data: Record<stsring, Dataset> = jsonData;
