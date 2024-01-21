import { ExternalLink } from 'ember-primitives';
import { service } from 'ember-primitives';

function filtered(issues, qps) {
  let result = issues;

  if (qps.hideDone) {
    result = result.filter((issue) => issue.isPending);
  }

  return result;
}

export const Section = <template>
  {{#let (service "qps") as |qps|}}
    <section>
      <header>
        <h3>{{@title}}</h3>
      </header>

      <ul class={{if qps.displayAsList "display-as-list" "display-as-boxes"}}>
        {{#each (filtered @data.issues qps) as |issue|}}
          <li>
            <ExternalLink
              href={{issue.href}}
              class={{if issue.isPending "not-done" "done"}}
              title={{issue.text}}
            >
              {{issue.text}}
            </ExternalLink>
          </li>
        {{/each}}
      </ul>
    </section>
  {{/let}}
</template>;
