# is Polaris ready yet?

Status board for Polaris-related work: https://is-polaris-ready.nullvoxpopuli.com/

## Where does the data come from?

Two files:
- automatically scaped via: [this script](https://github.com/NullVoxPopuli/is-polaris-ready-yet/blob/main/github-data/gather-issues.mts)
- manually sorted and added issue/pull requests via: [this json](https://github.com/NullVoxPopuli/is-polaris-ready-yet/blob/main/github-data/issue-data.json)

If you'd like to make a change to where an issue / pull-request shows up, feel free to PR an addition/move/removal/etc to the JSON.

## Want to remove an issue/pull request from the list?

PR an addition to `./github-data/omit.txt` that includes the URL

## Want to add an issue/pull request to the list?

PR an addition to `./github-data/issue-data.json` that includes the URL


## Installation

- `git clone <repository-url>` this repository
- `cd is-ready`
- `pnpm install`

## Running / Development

- `pnpm start`
- Visit your app at [http://localhost:4200](http://localhost:4200).
- Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

- `pnpm test`

### Linting

- `pnpm run lint`
- `pnpm lint:fix`

## Further Reading / Useful Links

- [ember.js](https://emberjs.com/)
- [ember-cli](https://cli.emberjs.com/release/)
- Development Browser Extensions
  - [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  - [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
