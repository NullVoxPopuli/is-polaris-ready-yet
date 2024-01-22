import Component from '@glimmer/component';
import { cached } from '@glimmer/tracking';
import { service } from '@ember/service';

import { ExternalLink } from 'ember-primitives';

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

function filtered(issues, qps) {
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

function hasStarted(num) {
  return num > 0;
}

function percent(numerator, denominator) {
  return Math.round((numerator / denominator) * 100);
}

const Completion = <template>
  {{#if (hasStarted @total)}}{{percent @done @total}}% {{/if}}({{@done}} of {{@total}} done)
</template>;

class Info extends Component {
  <template>
    {{#if this.isFiltered}}
      Filtered to
      <Completion @done={{this.filteredDone}} @total={{@filtered.length}} />
      from
      <Completion @done={{this.unfilteredDone}} @total={{this.unfilteredTotal}} />
    {{else}}
      <Completion @done={{this.unfilteredDone}} @total={{this.unfilteredTotal}} />
    {{/if}}
  </template>

  @cached
  get filteredDone() {
    return this.args.filtered.filter((x) => !x.isPending).length;
  }

  @cached
  get unfilteredDone() {
    return this.args.unfiltered.issues.filter((x) => !x.isPending).length;
  }

  get unfilteredTotal() {
    return this.args.unfiltered.issues.length;
  }

  get isFiltered() {
    return this.args.filtered.length !== this.unfilteredTotal;
  }
}

export class Section extends Component {
  <template>
    <section>
      <header>
        <h3>{{@title}}</h3>
      </header>

      <p>
        {{#if (has-block)}}
          <details open={{this.needsPlanning}}>
            <summary>
              <Info @filtered={{this.filtered}} @unfiltered={{@data}} />
            </summary>{{yield}}</details>
        {{else}}
          <Info @filtered={{this.filtered}} @unfiltered={{@data}} />
        {{/if}}
      </p>

      <ul class={{if this.qps.displayAsList "display-as-list" "display-as-boxes"}}>
        {{#each this.filtered as |issue|}}
          <li>
            <ExternalLink
              href={{issue.href}}
              class={{if issue.isPending "not-done" "done"}}
              title={{issue.text}}
            >
              {{issue.text}}
            </ExternalLink>
          </li>
        {{/each}}
      </ul>

    </section>
  </template>

  @service qps;

  @cached
  get filtered() {
    return filtered(this.args.data.issues, this.qps);
  }

  get needsPlanning() {
    return this.unfilteredTotal === 0;
  }
}
