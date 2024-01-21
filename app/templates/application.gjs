// @glint-nocheck
import { pageTitle } from 'ember-page-title';
import { ExternalLink, Form, Switch } from 'ember-primitives';
import Route from 'ember-route-template';
import data from 'is-ready/data.json';

const GetStarted = <template>
  To get started with a Polaris App: clone this
  <ExternalLink href="https://github.com/NullVoxPopuli/polaris-starter">starter template</ExternalLink>.

  <br /><br />

  To get started with a Polaris Library: use the
  <ExternalLink href="https://github.com/embroider-build/addon-blueprint">
    @embroider/addon-blueprint</ExternalLink>.
</template>;

const total = data.total;
const totalResolved = data.finished;

const percent = Math.round((totalResolved / total) * 100);

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
</template>;

function howLong() {
  console.time('Rendering from json');

  requestAnimationFrame(() => {
    console.timeEnd('Rendering from json');
  });
}

export default Route(
  <template>
    {{pageTitle "is Polaris ready yet?"}}

    <h1>
      <span class="title">
        Is Polaris ready yet?
      </span>
      <!-- <span class="answer">Yes!</span> -->
      <span class="answer-no">Almost!, we're getting there.</span>
      <span class="progress">
        {{percent}}% of the way there.
        {{totalResolved}}
        of
        {{total}}
        tasks finished.
      </span>
    </h1>

    <p class="get-started">
      <GetStarted />
    </p>

    <main>
      <h2>Authoring Experience</h2>
      <Section @title="<template>" @data={{data.templateTag}} />
      <Section @title="Vite" @data={{data.vite}} />
      <Section @title="CSS" @data={{data.css}} />
      <Section @title="Routing" @data={{data.routing}} />
      <Section @title="Reactivity" @data={{data.reactivity}} />
      <Section @title="Intellisense" @data={{data.intellisense}} />
      <Section @title="Removing Old Patterns" @data={{data.removingOldPatterns}} />

      <h2>Tooling</h2>
      <Section @title="Shrinking the Build" @data={{data.shrinkingTheBuild}} />
      <Section @title="Compatibility" @data={{data.compatibility}} />
      <Section @title="Glint" @data={{data.glint}} />
      <Section @title="Linting" @data={{data.linting}} />
      <br /><br />
      <Section @title="Other" @data={{data.other}} />
    </main>

    {{(howLong)}}
  </template>
);
