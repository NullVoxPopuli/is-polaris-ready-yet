import Component from '@glimmer/component';
import { cached } from '@glimmer/tracking';
import { service } from '@ember/service';

import { ExternalLink } from 'ember-primitives';

import { filtered } from './utils';

export class Header extends Component {
  <template>
    <h1>
      <span class="title">
        Is Polaris ready yet?
      </span>
      <ExternalLink class="whats-polaris" href="https://emberjs.com/editions/polaris/">
        (what's Polaris?)
      </ExternalLink>
      {{! <span class="answer">Yes!</span> }}
      <span class="answer-no">Almost!, we're getting there.</span>
      <span class="progress">
        {{#if this.isFiltered}}
          {{this.filteredPercent}}% of the way there.
          {{this.filteredDone}}
          of
          {{this.filtered.length}}
        {{else}}
          {{this.data.percent}}% of the way there.
          {{this.data.finished}}
          of
          {{this.data.total}}
        {{/if}}
        tasks finished.
      </span>
    </h1>

    <ExternalLink class="contribute" href="https://github.com/NullVoxPopuli/is-polaris-ready-yet/">
      Contribute on GitHub!
    </ExternalLink>
  </template>

  @service data;
  @service qps;

  @cached
  get flatList() {
    return Object.values(this.data.data)
      .map((dataset) => dataset.issues)
      .flat()
      .filter(Boolean);
  }

  @cached
  get filtered() {
    return filtered(this.flatList, this.qps);
  }

  @cached
  get filteredDone() {
    return this.filtered.filter((x) => !x.isPending).length;
  }

  get filteredPercent() {
    return Math.round((this.filteredDone / this.filtered.length) * 100);
  }

  get isFiltered() {
    return this.data.total !== this.filtered.length;
  }
}
