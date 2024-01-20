import { pageTitle } from 'ember-page-title';
import Route from 'ember-route-template';

const GetStarted = <template>
  To get started with a Polaris App:

  To get started with a Polaris Library:
</template>;

export default Route(
  <template>
    {{pageTitle "is Polaris ready yet?"}}

      <GetStarted />

    {{outlet}}
  </template>
);
