import Service, { service } from '@ember/service';

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

  set = (qps) => {
    this.router.transitionTo({ queryParams: qps });
  };
}
