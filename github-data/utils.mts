import path from "node:path";
import fs from "node:fs/promises";
import url from "node:url";
import sortBy from "lodash.sortby";

import fse from "fs-extra";

import { type Dataset } from "./issue-data.mts";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export function parseURL(url) {
  let sansDomain = url.replace("https://github.com/", "");
  let [owner, repo, type, number] = sansDomain.split("/");

  return { owner, repo, type, number };
}

export async function getOmissions() {
  const omissions = path.join(__dirname, "omit.txt");
  const buffer = await fs.readFile(omissions);
  const str = buffer.toString();

  const lines = str.split("\n").filter(Boolean);

  return lines;
}

export function formatIssue(d) {
  let { owner, repo, type, number } = parseURL(d.html_url);

  return {
    href: d.html_url,
    text: `[${repo}]: ${d.title}`,
    labels: d.labels?.map((label) => label.name),
    isPending: d.state === "open",
  };
}

export async function eachDataSet(data, callback) {
  for (let [key, dataSet] of Object.entries(data)) {
    if (typeof dataSet !== "object") continue;

    // Array, manually managed at the end
    if (key === "labels") continue;

    await callback(key, dataSet);
  }
}

export async function getData() {
  let existing: Result = {};

  let jsonPath = "public/data.json";
  if (await fse.pathExists(jsonPath)) {
    let buffer = await fs.readFile(jsonPath);
    let str = buffer.toString();

    existing = JSON.parse(str);
  }

  return existing;
}

export async function writeData(result) {
  for (let [key, data] of Object.entries(result)) {
    if (typeof data !== "object") continue;

    result[key].issues = sortBy(result[key].issues, ["isPending", "href"]);
  }

  await fs.writeFile("public/data.json", JSON.stringify(result, null, 2));
}

export interface Result {
  total: number;
  finished: number;
  labels: string[];
  [key: string]: {
    category: Dataset["category"];
    issues: {
      href: string;
      labels: [];
      text: string;
      isPending: boolean;
    }[];
  };
}
