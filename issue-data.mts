export interface Dataset {
  category: 'tooling' | 'authoring experience' | 'other';
  issues: string[]
}
export const data: Record<string, Dataset> = {
  routing: {
    category: 'authoring experience',
    issues: [],
  },
  templateTag: {
    category: 'authoring experience',
    issues: [
      'https://github.com/embroider-build/content-tag/issues/39'
    ]
  },
  shrinkingTheBuild: {
    category: 'tooling',
    issues: [
    ],
  },
  compatibility: {
    category: 'tooling',
    issues: [
      'https://github.com/embroider-build/ember-auto-import/pull/512',
    ],
  },
  vite: {
    category: 'tooling',
    issues: [
      'https://github.com/embroider-build/embroider/pull/1744',
      'https://github.com/embroider-build/embroider/pull/1736',
      'https://github.com/embroider-build/embroider/pull/1730',
      'https://github.com/embroider-build/embroider/pull/1614',
      'https://github.com/embroider-build/embroider/pull/1715',
      'https://github.com/embroider-build/embroider/pull/1762',
    ],
  },
  glint: {
    category: 'tooling',
    issues: [
      'https://github.com/typed-ember/glint/issues/626',
      'https://github.com/typed-ember/glint/issues/672',
      'https://github.com/typed-ember/glint/issues/679',
      'https://github.com/typed-ember/glint/issues/661',
      'https://github.com/typed-ember/glint/issues/649',
      'https://github.com/typed-ember/glint/issues/645',
      'https://github.com/typed-ember/glint/issues/628',
      'https://github.com/typed-ember/glint/issues/614',
      'https://github.com/typed-ember/glint/issues/604',
      'https://github.com/typed-ember/glint/issues/601',
      'https://github.com/typed-ember/glint/issues/599',
    ],
  },
  eslint: {
    category: 'tooling',
    issues: [],
  },
  prettier: {
    category: 'tooling',
    issues: [
      'https://github.com/prettier/prettier/pull/15087'
    ],
  },
  css: {
    category: 'authoring experience',
    issues: [],
  },
  other: {
    category: 'other',
    issues: [],
  },
} as const;
