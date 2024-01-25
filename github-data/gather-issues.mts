import { data as issueData } from "./issue-data.mts";
import { Octokit } from "@octokit/rest";
import path from "node:path";
import fs from "node:fs/promises";
import sortBy from "lodash.sortby";

import fse from "fs-extra";
import { formatIssue, writeData } from "./utils.mts";

// First LTS of Ember Octane
const minDate = "2020-02-12";
const minDateTime = new Date(`${minDate}T00:00:00Z`);
// Arbitrarily chosen, could be better
// docs tend to lag behind for a couple reasons
// - developers find docs hard
// - "official docs" tend to wait for things to stabilize
//   (or rather, be on the way up away from the pit of incoherence towards cohesion)
const docsMinDateTime = new Date("2023-06-01T00:00:00Z");
const emberCliMinDateTime = docsMinDateTime;

const assignments = {
  templateTag: [
    { org: "ember-template-imports", repo: "ember-template-imports" },
    { org: "embroider-build", repo: "content-tag" },
  ],
  glint: [{ org: "typed-ember", repo: "glint" }],
  linting: [
    { org: "ember-cli", repo: "eslint-plugin-ember" },
    { org: "NullVoxPopuli", repo: "ember-eslint-parser" },
    { org: "gitKrystan", repo: "prettier-plugin-ember-template-tag" },
    { org: "ember-template-lint", repo: "ember-template-lint" },
  ],
  vite: [{ org: "embroider-build", repo: "embroider" }],
  reactivity: [
    { org: "tracked-tools", repo: "tracked-built-ins" },
    { org: "ember-modifier", repo: "ember-modifier" },
  ],
  compatibility: [
    { org: "embroider-build", repo: "ember-auto-import" },
    { org: "ember-cli", repo: "ember-cli-htmlbars" },
    { org: "ember-cli", repo: "ember-fetch" },
    { org: "ember-cli", repo: "ember-cli-update" },
    { org: "ember-cli", repo: "ember-try" },
    // not relevant for Polaris, we won't be using these
    // { org: "ember-cli", repo: "ember-cli-inject-live-reload" },
    // { org: "ember-cli", repo: "ember-cli-terser" },
  ],
  removingOldPatterns: [{ org: "ember-learn", repo: "deprecation-app" }],
  highlevel: [{ org: "emberjs", repo: "tracking-polaris" }],
  other: [
    { org: "ember-cli", repo: "ember-cli" },
    { org: "ember-learn", repo: "guides-source" },
    { org: "ember-learn", repo: "cli-guides" },
    { org: "ember-learn", repo: "empress-blog-ember-template" },
    { org: "ember-learn", repo: "ember-website" },
    { org: "ember-learn", repo: "ember-api-docs" },
    { org: "ember-learn", repo: "ember-api-docs-data" },
    { org: "ember-learn", repo: "guidemaker-ember-template" },
    { org: "ember-learn", repo: "ember-styleguide" },
    { org: "ember-learn", repo: "ember-help-wanted" },
  ],
};

let alreadyCategorized = new Set();
let firstCategories = new Map();

for (let [key, dataset] of Object.entries(issueData)) {
  dataset.issues.forEach((issue) => {
    alreadyCategorized.add(issue);
    if (!firstCategories.get(issue)) {
      firstCategories.set(issue, key);
    }
  });
}

function firstCategoryFor(href) {
  return firstCategories.get(href);
}

const octokit = new Octokit({ auth: process.env.GITHUB_AUTH });

const IGNORE_LABELS = [
  "internal",
  "Internal",
  "CSS :sparkles:",
  "meta",
  "upstream",
  "test",
  "needs reproduction",
  "wontfix",
  "working as expected",
  "typescript limitation",
  "external issue",
  "dependencies",
];

async function getIssuesUntil({ org, repo }) {
  let results = [];

  let pageHadSomethingTooOld = false;

  async function getPage(page = 0) {
    let issuesResponse = await octokit.rest.issues.listForRepo({
      owner: org,
      repo,
      per_page: 100,
      page: page,
      state: "all",
    });

    let data = issuesResponse.data
      .filter((d) => {
        let createdAt = new Date(d.created_at);

        let isNewEnough = createdAt > minDateTime;

        if (org === "ember-learn") {
          isNewEnough = createdAt > docsMinDateTime;
        }

        if (repo === "ember-cli") {
          isNewEnough = createdAt > emberCliMinDateTime;
        }

        if (d.draft) {
          return false;
        }

        if (!isNewEnough) {
          pageHadSomethingTooOld = true;
        }

        let login = d.user.login;

        if (login === "dependabot[bot]" || login.includes("[bot]")) {
          return false;
        }

        let labels = d.labels.map((label) => label.name);

        if (IGNORE_LABELS.some((ignore) => labels.includes(ignore))) {
          return false;
        }

        return isNewEnough;
      })
      .map((d) => {
        return formatIssue(d);
      });

    return data;
  }

  let page = 1;
  while (true) {
    let data = await getPage(page);

    console.log(`Page ${page} for ${org}/${repo} had ${data.length} result(s)`);

    results.push(...data);

    if (data.length === 0) {
      break;
    }

    if (!pageHadSomethingTooOld) {
      page++;
    } else {
      break;
    }
  }

  return results;
}

async function getRepoData({ org, repo }) {
  let issues = await getIssuesUntil({ org, repo });

  return [...issues];
}

let existing = {};
let jsonPath = "app/data.json";
if (await fse.pathExists(jsonPath)) {
  let buffer = await fs.readFile(jsonPath);
  let str = buffer.toString();

  existing = JSON.parse(str);
}

/////////////////
// GET THE DATA
/////////////////
for (let [category, repos] of Object.entries(assignments)) {
  issueData[category] ||= { issues: [] };
  // Clearing the data in case it's stale.
  existing[category] = { ...existing[category], issues: [] };
  // existing[category] ||= { issues: [] };

  for (let repo of repos) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    let issues = await getRepoData({ org: repo.org, repo: repo.repo });

    for (let issue of issues) {
      if (!alreadyCategorized.has(issue)) {
        issueData[category].issues.push(issue.href);
      }

      // find category (which may be the same as 'category'
      let newCategory = firstCategoryFor(issue.href) || category;

      existing[newCategory] ||= { issues: [] };
      existing[newCategory].issues.push(issue);

      await writeData(existing);
    }
  }
}

await writeData(existing);
