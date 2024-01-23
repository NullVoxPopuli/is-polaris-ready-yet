import { pageTitle } from 'ember-page-title';
import Route from 'ember-route-template';

import { Footer } from './-components/footer';

export default Route(
  <template>
    {{pageTitle "is Polaris ready yet?"}}

    {{outlet}}

    <Footer />
  </template>
);
