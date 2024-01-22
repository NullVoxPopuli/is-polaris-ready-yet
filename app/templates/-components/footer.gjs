import { ExternalLink } from 'ember-primitives';

const NVP = <template>
  <ExternalLink href="https://github.com/NullVoxPopuli/">NullVoxPopuli</ExternalLink>
</template>;

export const Footer = <template>
  <footer>
    <hr />
    <h3>Disclaimer</h3>
    Polaris is a massive community effort, and many many people have been helping with it throughout
    the years. This statusboard is likely not yet capturing work that has gone in to the Polaris
    effort. Additionally, this site, opinions, tutorials, (etc) linked from here are my own (<NVP
    />), and not official in any capacity.

    <h3>What is included in the data?</h3>
    The data is a combination of scraping of issues and pull requests from various ember and
    ember-adjacent repos, as well as a manually curated list. The scraper omits all bot-related
    issues / pull requests.
  </footer>
</template>;
