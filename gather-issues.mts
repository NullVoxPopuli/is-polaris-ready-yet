import { data as existingData } from "./issue-data.mts";
import { Octokit } from "@octokit/rest";
import path from 'node:path';
import fs from 'node:fs/promises';
import sortBy from 'lodash.sortby';

import fse from 'fs-extra';

// First LTS of Ember Octane
const minDate = '2020-02-12';
const minDateTime = new Date(`${minDate}T00:00:00Z`);

const assignments = {
  templateTag: [
    { org: 'ember-template-imports', repo: 'ember-template-imports' },
    { org: 'embroider-build', repo: 'content-tag' },
  ],
  glint: [
    { org: 'typed-ember', repo: 'glint' },
  ],
  linting: [
    { org: 'ember-cli', repo: 'eslint-plugin-ember' },
    { org: 'NullVoxPopuli', repo: 'ember-eslint-parser' },
    { org: 'gitKrystan', repo: 'prettier-plugin-ember-template-tag' },
    { org: 'ember-template-lint', repo: 'ember-template-lint' },
  ],
  vite: [
    { org: 'embroider-build', repo: 'embroider' },
  ],
  reactivity: [
    { org: 'tracked-tools', repo: 'tracked-built-ins' },
    { org: 'ember-modifier', repo: 'ember-modifier' },
  ],
  compatibility: [
    { org: 'embroider-build', repo: 'ember-auto-import' },
    { org: 'ember-cli', repo: 'ember-cli-htmlbars' },
    { org: 'ember-cli', repo: 'ember-fetch' },
    { org: 'ember-cli', repo: 'ember-cli-update' },
    { org: 'ember-cli', repo: 'ember-try' },
    { org: 'ember-cli', repo: 'ember-cli-inject-live-reload' },
    { org: 'ember-cli', repo: 'ember-cli-terser' },
  ],
  removingOldPatterns: [
    { org: 'ember-learn', repo: 'ember-deprecation-app' },
  ],
  other: [
    { org: 'ember-cli', repo: 'ember-cli' },
    { org: 'ember-learn', repo: 'guides-source' },
    { org: 'ember-learn', repo: 'cli-guides' },
    { org: 'ember-learn', repo: 'empress-blog-ember-template' },
    { org: 'ember-learn', repo: 'ember-website' },
    { org: 'ember-learn', repo: 'ember-api-docs' },
    { org: 'ember-learn', repo: 'ember-api-docs-data' },
    { org: 'ember-learn', repo: 'guidemaker-ember-template' },
    { org: 'ember-learn', repo: 'ember-styleguide' },
    { org: 'ember-learn', repo: 'ember-help-wanted' },
  ],
};


let alreadyFetched = new Set();

for (let [key, dataset] of Object.entries(existingData)) {
  dataset.issues.forEach(issue => alreadyFetched.add(issue));
}


const octokit = new Octokit({ auth: process.env.GITHUB_AUTH });

async function getIssuesUntil({ org, repo }) {
  let results = [];

  let pageHadSomethingTooOld = false;

  async function getPage(page = 0) {
    let issuesResponse = await octokit.rest.issues.listForRepo({
      owner: org,
      repo,
      per_page: 100,
      page: page,
      state: 'all',
    });

    let data = issuesResponse.data.filter(d => {
      let createdAt = new Date(d.created_at);

      let isNewEnough = createdAt > minDateTime;

      if (!isNewEnough) {
        pageHadSomethingTooOld = true;
      }

      let login = d.user.login;

      if (login === 'dependabot[bot]' || login.includes('[bot]')) {
        return false;
      }

      return isNewEnough;
    }).map(d => {
      let sansDomain = d.html_url.replace('https://github.com/', '');
      let [owner, repo, type, number] = sansDomain.split('/');

      return {
        href: d.html_url,
        owner,
        repo,
        number: d.number,
        type,
        isPending: d.state === 'open',
      }
    });

    return data;
  }

  let page = 0;
  while(true) {
    let data = await getPage(page);

    results.push(...data);

    if (!pageHadSomethingTooOld) {
      page++;
    } else {
      break;
    }
  }

      process.exit(1);
  return results;
}

async function getRepoData({ org, repo }) {
  let issues = await getIssuesUntil({ org, repo });

  return [...issues];
}


let existing = [];
let jsonPath = 'public/data.json';
if (await fse.pathExists(jsonPath)) {

  let buffer = await fs.readFile(jsonPath);
  let str = buffer.toString();

  existing = JSON.parse(str);
}

/////////////////
// GET THE DATA
/////////////////
for (let [category, repos] of Object.entries(assignments)) {

  if (!existing[category].issues) {
    console.log(`${category} missing issues`);
    process.exit(1);
  }

  for (let repo of repos) {
    let issues = await getRepoData({ org: repo.org, repo: repo.repo });

    for (let issue of issues) {
      if (alreadyFetched.has(issue)) continue;

      existingData[category].issues.push(issue.href);
      existing[category] ||= { issues: [] };

      existing[category].issues.push(issue);

      await writeData();
    }
  }
}

async function writeData() {
  for (let [key, data] of Object.entries(existing)) {
    existing[key].issues = sortBy(existing[key].issues, ['isPending', 'href']);
  }

  await fs.writeFile('issue-data.json', JSON.stringify(existingData, null, 2));
  await fs.writeFile(jsonPath, JSON.stringify(existing, null, 2));
  await fs.writeFile('app/data.json', JSON.stringify(existing, null, 2));
}

