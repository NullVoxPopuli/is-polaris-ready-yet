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
      'https://github.com/emberjs/ember.js/issues/20062',
      'https://github.com/embroider-build/content-tag/issues/39'
    ]
  },
  reactivity: {
    category: 'authoring experience',
    issues: [
      'https://github.com/emberjs/rfcs/pull/957',
      'https://github.com/emberjs/ember.js/issues/20096',
      'https://github.com/emberjs/ember.js/issues/20095',
    ],
  },
  intellisense: {
    category: 'authoring experience',
    issues: [
      'https://github.com/ijlee2/ember-codemod-args-to-signature/issues/1',
      'https://github.com/emberjs/ember-qunit/pull/1137',
      'https://github.com/emberjs/ember-qunit/pull/1099',
      'https://github.com/emberjs/data/issues/8852',
      'https://github.com/ember-cli/ember-page-title/pull/275',
      'https://github.com/ember-cli/ember-page-title/pull/262',
    ],
  },
  removingOldPatterns: {
    category: 'authoring experience',
    issues: [
      'https://github.com/emberjs/ember.js/issues/20472',
    ]
  },
  shrinkingTheBuild: {
    category: 'tooling',
    issues: [
      'https://github.com/mainmatter/qunit-dom/issues/2023',
      'https://github.com/mainmatter/qunit-dom/pull/2027',
      'https://github.com/mainmatter/qunit-dom/pull/2066',
      'https://github.com/mainmatter/qunit-dom/pull/2054',
      'https://github.com/mainmatter/qunit-dom/pull/2028',
      'https://github.com/emberjs/ember-qunit/pull/1064',
      'https://github.com/emberjs/ember-test-waiters/issues/458',
      'https://github.com/emberjs/ember-test-waiters/pull/454',
      'https://github.com/emberjs/ember-test-waiters/pull/453',
      'https://github.com/emberjs/ember-test-waiters/pull/452',
      'https://github.com/emberjs/ember-test-waiters/pull/460',
      'https://github.com/emberjs/ember-test-waiters/pull/463',
      'https://github.com/emberjs/ember-test-waiters/pull/464',
      'https://github.com/ember-cli/ember-fetch/issues/738',
    ],
  },
  compatibility: {
    category: 'tooling',
    issues: [
      'https://github.com/ember-cli/ember-page-title/pull/258',
      'https://github.com/mainmatter/qunit-dom/pull/2065',
      'https://github.com/mainmatter/qunit-dom/pull/2031',
      'https://github.com/emberjs/ember-qunit/pull/1134',
      'https://github.com/emberjs/ember-qunit/pull/1111',
      'https://github.com/emberjs/ember-qunit/pull/1102',
      'https://github.com/emberjs/ember-qunit/pull/1095',
      'https://github.com/emberjs/ember-qunit/pull/1089',
      'https://github.com/emberjs/ember-qunit/pull/1012',
      'https://github.com/embroider-build/ember-auto-import/pull/512',
      'https://github.com/embroider-build/ember-auto-import/pull/606',
      'https://github.com/embroider-build/ember-auto-import/pull/605',
      'https://github.com/embroider-build/ember-auto-import/pull/603',
      'https://github.com/embroider-build/ember-auto-import/pull/602',
      'https://github.com/embroider-build/ember-auto-import/pull/596',
      'https://github.com/embroider-build/ember-auto-import/pull/594',
      'https://github.com/embroider-build/ember-auto-import/pull/587',
      'https://github.com/embroider-build/ember-auto-import/pull/574',
      'https://github.com/embroider-build/ember-auto-import/pull/573',
      'https://github.com/embroider-build/ember-auto-import/pull/563',
      'https://github.com/embroider-build/ember-auto-import/pull/562',
      'https://github.com/embroider-build/ember-auto-import/pull/553',
      'https://github.com/embroider-build/ember-auto-import/pull/544',
      'https://github.com/embroider-build/ember-auto-import/pull/541',
      'https://github.com/embroider-build/ember-auto-import/pull/531',
      'https://github.com/embroider-build/ember-auto-import/pull/530',
      'https://github.com/embroider-build/ember-auto-import/pull/524',
      'https://github.com/embroider-build/ember-auto-import/pull/523',
      'https://github.com/embroider-build/ember-auto-import/pull/521',
      'https://github.com/embroider-build/ember-auto-import/pull/510',
      'https://github.com/embroider-build/ember-auto-import/pull/496',
      'https://github.com/embroider-build/ember-auto-import/pull/492',
      'https://github.com/embroider-build/ember-auto-import/pull/490',
      'https://github.com/embroider-build/ember-auto-import/pull/487',
      'https://github.com/embroider-build/ember-auto-import/pull/485',
      'https://github.com/embroider-build/ember-auto-import/pull/480',
      'https://github.com/embroider-build/ember-auto-import/issues/588',
      'https://github.com/embroider-build/ember-auto-import/issues/589',
      'https://github.com/embroider-build/ember-auto-import/issues/592',
      'https://github.com/embroider-build/ember-auto-import/issues/595',
      'https://github.com/embroider-build/ember-auto-import/issues/601',
      'https://github.com/embroider-build/ember-auto-import/issues/577',
      'https://github.com/embroider-build/ember-auto-import/issues/558',
      'https://github.com/embroider-build/ember-auto-import/issues/557',
      'https://github.com/embroider-build/ember-auto-import/issues/556',
      'https://github.com/embroider-build/ember-auto-import/issues/547',
      'https://github.com/embroider-build/ember-auto-import/issues/540',
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
