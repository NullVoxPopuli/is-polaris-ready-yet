import { getData, writeData, eachDataSet, type Result } from "./utils.mts";

let data = await getData();

let total = 0;
let finished = 0;
let labels = new Set();

// 1. Remove duplicates (via href)
await eachDataSet(data, (key, dataSet) => {
  let seen = new Set();

  if (!dataSet.issues) {
    console.log(`${key} is missing issues`);
    console.log(dataSet);
    process.exit(1);
  }

  let newIssues = dataSet.issues.filter((issue) => {
    if (seen.has(issue.href)) return false;

    seen.add(issue.href);

    return true;
  });

  dataSet.issues = newIssues;
});

// 2. Count totals and extract labels
await eachDataSet(data, (key, dataSet) => {
  total += dataSet.issues.length;
  finished += dataSet.issues.filter((i) => !i.isPending).length;

  for (let issue of dataSet.issues) {
    issue.labels.forEach((l) => labels.add(l));
  }
});

await writeData({
  ...data,
  total,
  finished,
  labels: [...labels].sort(),
});
