import pageTitle from 'ember-page-title';
import Route from 'ember-route-template';


export default Route(
  <template>
    {{pageTitle "is Polaris ready yet?"}}

    {{outlet}}
  </template>
);
