import path from "node:path";
import fs from "node:fs/promises";
import sortBy from "lodash.sortby";

import fse from "fs-extra";
import { Octokit } from "@octokit/rest";

import { formatIssue, getData, writeData, parseURL, type Result } from "./utils.mts";
import { data, type Dataset } from "./issue-data.mts";

const octokit = new Octokit({ auth: process.env.GITHUB_AUTH });

let existing = await getData();

for (let [key, dataset] of Object.entries(data)) {
  let { category, issues } = dataset;

  existing[key] ||= { category, issues: [] };

  if (typeof existing[key] !== "object") continue;

  /**
   * Octokit/GH doesn't have a bulk-request API
   * so... we DoS them, I guess.
   */
  for (let issue of issues) {
    // Try not to get rate-limited
    await new Promise((resolve) => setTimeout(resolve, 500));

    let { owner, repo, type, number } = parseURL(issue);

    let existingData = existing[key]?.issues?.find((ex) => {
      let u = parseURL(ex.href);
      return u.owner === owner && u.repo === repo && u.type === type;
    });

    console.log(issue, existingData);
    // Uncomment this to only update data not previously fetched
    if (existingData) continue;

    // Issue already complete, we don't need to ask GH about it.
    if (existingData?.isPending === false) {
      continue;
    }

    console.log("getting data");

    if (type === "issues") {
      let response = await octokit.rest.issues.get({
        owner,
        repo,
        issue_number: number,
      });

      existing[key].issues.push(formatIssue(response.data));
    } else if (type === "pull") {
      let response = await octokit.rest.pulls.get({
        owner,
        repo,
        pull_number: number,
      });

      existing[key].issues.push(formatIssue(response.data));
    } else {
      throw new Error(`Unsupported type: ${type}, from: ${issue}`);
    }
  }
}

await writeData(existing);
