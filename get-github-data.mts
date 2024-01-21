import path from 'node:path';
import fs from 'node:fs/promises';
import sortBy from 'lodash.sortby';

import fse from 'fs-extra';
import { Octokit } from "@octokit/rest";

import { data, type Dataset } from './issue-data.mts';


const octokit = new Octokit({ auth: process.env.GITHUB_AUTH });

interface Result {
  [key: string]: {
    category: Dataset['category'];
    issues: {
      href: string;
      repo: string;
      owner: string;
      number: string;
      type: 'issues' | 'pulls';
      isPending: boolean;
    }[];
  }
}

let result: Result = {};
let existing: Result = {};

let jsonPath = 'public/data.json';
if (await fse.pathExists(jsonPath)) {

  let buffer = await fs.readFile(jsonPath);
  let str = buffer.toString();

  existing = JSON.parse(str);
}


for (let [key, dataset] of Object.entries(data)) {
  let { category, issues } = dataset;

  result[key] = { category, issues: [] };

  /**
    * Octokit/GH doesn't have a bulk-request API
    * so... we DoS them, I guess.
    */
  for (let issue of issues) {
    // Try not to get rate-limited
    await new Promise(resolve => setTimeout(resolve, 500));

    let sansDomain = issue.replace('https://github.com/', '');
    let [owner, repo, type, number] = sansDomain.split('/');

    let existingData = existing[key]?.issues
      ?.find(ex => ex.owner === owner && ex.repo === repo && ex.type === type);

    // Issue already complete, we don't need to ask GH about it.
    if (existingData?.isPending === false) {
      continue;
    }

    if (type === 'issues') {
      let response = await octokit.rest.issues.get({
        owner,
        repo,
        issue_number: number,
      });

      let isOpen = response.data.state === 'open';

      result[key].issues.push({
        href: issue,
        type,
        repo,
        owner,
        number,
        isPending: isOpen,
      });
    } else if (type === 'pull') {
      let response = await octokit.rest.pulls.get({
        owner,
        repo,
        pull_number: number,
      });

      let isOpen = response.data.state === 'open';

      result[key].issues.push({
        href: issue,
        type,
        repo,
        owner,
        number,
        isPending: isOpen,
      });
    } else {
      throw new Error(`Unsupported type: ${type}, from: ${issue}`);
    }
  }
}


for (let [key, data] of Object.entries(result)) {
  result[key].issues = sortBy(result[key].issues, ['isPending', 'href']);
}

await fs.writeFile(jsonPath, JSON.stringify(result, null, 2));
await fs.writeFile('app/data.json', JSON.stringify(result, null, 2));
