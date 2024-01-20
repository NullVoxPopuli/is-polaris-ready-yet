// @glint-nocheck
import { pageTitle } from 'ember-page-title';
import { ExternalLink, Form, Switch } from 'ember-primitives';
import Route from 'ember-route-template';
import data from 'is-ready/data.json';

const GetStarted = <template>
  To get started with a Polaris App: To get started with a Polaris Library:
</template>;

const byCategory = {};

for (let [key, dataSet] of Object.entries(data)) {
  byCategory[dataSet.category] ||= {};
  byCategory[dataSet.category][key] = dataSet;
}

const AX = byCategory['authoring experience'];
const tooling = byCategory['tooling'];

const DisplaySettings = <template>
  <Form>
    <Switch as |s|>
      <s.Control name="displayAsList" />
      <s.Label>List instead of boxes</s.Label>
    </Switch>
  </Form>
</template>;

const Section = <template>
  <section>
    <header>
      <h3>{{@title}}</h3>
    </header>

    {{! display as list? }}
    <ul class="display-as-boxes">
      {{#each @data.issues as |issue|}}
        <li>
          <ExternalLink href={{issue.href}} class={{if issue.isPending "not-done" "done"}}>
            {{issue.owner}}/{{issue.repo}}#{{issue.number}}
          </ExternalLink>
        </li>
      {{/each}}
    </ul>
  </section>
</template>;

export default Route(
  <template>
    {{pageTitle "is Polaris ready yet?"}}

    <h1>
      Is Polaris ready yet?
      <span class="answer">No.</span>
    </h1>

    <main>
      <h2>Authoring Experience</h2>
      <Section @title="<template>" @data={{AX.templateTag}} />
      <Section @title="Vite" @data={{tooling.vite}} />
      <Section @title="CSS" @data={{AX.css}} />
      <Section @title="Routing" @data={{AX.routing}} />

      <h2>Tooling</h2>
      <Section @title="Shrinking the Build" @data={{tooling.shrinkingTheBuild}} />
      <Section @title="Compatibility" @data={{tooling.compatibility}} />
      <Section @title="Glint" @data={{tooling.glint}} />
      <Section @title="ESLint" @data={{tooling.eslint}} />
      <Section @title="Prettier" @data={{tooling.prettier}} />
    </main>

    {{outlet}}
  </template>
);
