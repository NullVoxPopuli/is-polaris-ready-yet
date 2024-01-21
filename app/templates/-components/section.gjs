import Component from '@glimmer/component';
import { cached } from '@glimmer/tracking';
import { service } from '@ember/service';

import { ExternalLink } from 'ember-primitives';

function filtered(issues, qps) {
  let result = issues;

  if (qps.hideDone) {
    result = result.filter((issue) => issue.isPending);
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

  return result;
}

export class Section extends Component {
  <template>
    <section>
      <header>
        <h3>{{@title}}</h3>
      </header>

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
}
