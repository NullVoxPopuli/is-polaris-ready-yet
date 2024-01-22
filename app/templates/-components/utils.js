const EMBER_ORGS = [
  'embroider-build',
  'ember-template-imports',
  'typed-ember',
  'emberjs',
  'ember-cli',
  'ember-modifier',
  'ember-learn',
  'ember-template-lint',
  'tracked-tools',
];

export function filtered(issues, qps) {
  let result = issues;

  if (qps.hideDone) {
    result = result.filter((issue) => issue.isPending);
  }

  if (qps.external) {
    result = result.filter((issue) => {
      return !EMBER_ORGS.some((org) => issue.href.includes(`.com/${org}`));
    });
  }

  if (qps.without) {
    let lower = qps.without
      .toLowerCase()
      .split(',')
      .map((term) => term.trim())
      .filter(Boolean);

    result = result.filter((issue) => !lower.some((l) => issue.text.toLowerCase().includes(l)));
  }

  if (qps.with) {
    let lower = qps.with.toLowerCase();

    result = result.filter((issue) => issue.text.toLowerCase().includes(lower));
  }

  if (qps.excludeLabels) {
    let labels = qps.excludeLabels
      .split(',')
      .map((term) => term.trim())
      .filter(Boolean);

    result = result.filter((issue) => !labels.some((l) => issue.labels.includes(l)));
  }

  return result;
}
