import EmberRouter from '@ember/routing/router';

import config from 'is-ready/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('issues');
  this.route('project');
});
