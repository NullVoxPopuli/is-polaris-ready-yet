import { debounce } from '@ember/runloop';
import Service, { service } from '@ember/service';

import { task, timeout } from 'ember-concurrency';

export default class QueryParams extends Service {
  @service router;

  get current() {
    return this.router.currentRoute?.queryParams || {};
  }

  get displayAsList() {
    return this.current['display-as-list'] === '1';
  }

  get hideDone() {
    return this.current['hide-done'] === '1';
  }

  get with() {
    return this.current['with'];
  }

  get without() {
    return this.current['without'];
  }

  get excludeLabels() {
    return this.current['exclude-labels'];
  }

  set = (qps) => {
    this.transition.perform(qps);
  };

  transition = task({ restartable: true }, async (qps) => {
    await timeout(250);
    this.router.transitionTo({ queryParams: qps });
  });
}
