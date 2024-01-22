import Route from '@ember/routing/route';

export default class Application extends Route {
  queryParams = {
    'display-as-list': {},
    'hide-done': {},
    'exclude-labels': {},
    external: {},
    with: {},
    without: {},
  };

  async model() {
    let response = await fetch('/data.json');

    globalThis.GH_ISSUE_DATA = await response.json();
  }
}
