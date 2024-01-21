import Route from '@ember/routing/route';

export default class Application extends Route {
  queryParams = {
    'display-as-list': {},
    'hide-done': {},
    'exclude-labels': {},
    with: {},
    without: {},
  };
}
