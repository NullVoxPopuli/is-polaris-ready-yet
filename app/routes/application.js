import Route from '@ember/routing/route';

export default class Query extends Route {
  queryParams = {
    'display-as-list': {},
    'hide-done': {},
    label: {},
    with: {},
    without: {},
  };
}
