import { pageTitle } from 'ember-page-title';
import { service } from 'ember-primitives';
import { ExternalLink } from 'ember-primitives';
import Route from 'ember-route-template';
import data from 'is-ready/data.json';

import { Filters } from './-components/filters';
import { Footer } from './-components/footer';
import { Header } from './-components/header';
import { Section } from './-components/section';

const GetStarted = <template>
  To get started with a Polaris App:
  <br />Clone this
  <ExternalLink href="https://github.com/NullVoxPopuli/polaris-starter">starter template</ExternalLink>.

  <br /><br />

  To get started with a Polaris Library:
  <br />use the
  <ExternalLink href="https://github.com/embroider-build/addon-blueprint">
    @embroider/addon-blueprint</ExternalLink>.
</template>;

function howLong() {
  console.time('Rendering the list');

  // With so much data, rendering
  // blocks animation frames,
  // so we can use this to determine
  // about how long rendering takes
  requestAnimationFrame(() => {
    console.timeEnd('Rendering the list');
  });
}

export default Route(
  <template>
    {{pageTitle "is Polaris ready yet?"}}

    <Header />

    <p class="get-started">
      <GetStarted />
    </p>

    <div class="filters">
      <Filters />
    </div>

    <main>
      {{#let (service "qps") as |qps|}}
        {{(howLong qps.current)}}
      {{/let}}

      <h2>Authoring Experience</h2>
      <Section @title="<template>" @data={{data.templateTag}}>
        "template-tag" is the new file format for components that unifies on the concepts of modules
        and values, allowing multiple components to be defined in a single file as well as leaning
        on the broader ecosystem for editior features such as go-to-definition. For more information
        on "template-tag", try this
        <ExternalLink href="https://tutorial.glimdown.com">
          interactive tutorial
        </ExternalLink>
        or read the
        <ExternalLink href="https://github.com/emberjs/rfcs/pull/779">RFC, reasoning, and research</ExternalLink>.
      </Section>

      <Section @title="Vite" @data={{data.vite}} />
      <Section @title="CSS" @data={{data.css}}>
        There is
        <ExternalLink href="https://github.com/cardstack/glimmer-scoped-css">
          glimmer-scoped-css
        </ExternalLink>
        which describes the direction we want to go with formal CSS support in Polaris. It needs
        polish though, and needs more compatibility. There is also
        <ExternalLink
          href="https://github.com/soxhub/ember-scoped-css/"
        >ember-scoped-css</ExternalLink>, whech demonstrates how one might achieve broad
        compatibiilty and also provides module-based-emitted CSS.
      </Section>

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

    <Footer />
  </template>
);
