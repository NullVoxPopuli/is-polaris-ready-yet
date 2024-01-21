import Component from '@glimmer/component';
import { service } from '@ember/service';

import { Form, Switch } from 'ember-primitives';

const BOOLEAN = ['display-as-list', 'hide-done'];

export class DisplaySettings extends Component {
  <template>
    <Form @onChange={{this.update}}>
      <Switch @checked={{this.qps.displayAsList}} as |s|>
        <s.Control name="display-as-list" />
        <s.Label>List instead of boxes</s.Label>
      </Switch>

      <Switch @checked={{this.qps.hideDone}} as |s|>
        <s.Control name="hide-done" />
        <s.Label>Hide done</s.Label>
      </Switch>
    </Form>
  </template>

  @service qps;

  update = (newValues) => {
    let qps = this.qps.current;

    for (let boolKey of BOOLEAN) {
      if (!(boolKey in newValues)) {
        newValues[boolKey] = 'off';
      }
    }

    for (let [key, value] of Object.entries(newValues)) {
      if (qps[key] !== value) {
        switch (true) {
          case BOOLEAN.includes(key):
            qps[key] = value === 'on' ? '1' : '0';

            break;
          default:
            qps[key] = value;

            break;
        }
      }
    }

    this.qps.set(qps);
  };
}

export const Filters = <template>
  <details>
    <summary>Filters and Display</summary>
    <DisplaySettings />
  </details>
</template>;
