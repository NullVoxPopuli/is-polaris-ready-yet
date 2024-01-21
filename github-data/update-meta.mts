
import { getData, writeData, type Result } from './utils.mts';

let data = await getData();

let total = 0;
let finished = 0;
let labels = new Set();

// 1. Remove duplicates (via href)
for (let [key, dataSet] of Object.entries(data)) {
  let seen = new Set();

  let newIssues = dataSet.issues.filter(issue => {
    if (seen.has(issue.href)) return false;

    seen.add(issue.href);

    return true;
  });

  dataSet.issues = newIssues;
}

// 2. Count totals and extract labels
for (let [key, dataSet] of Object.entries(data)) {
  total += dataSet.issues.length;
  finished += dataSet.issues.filter((i) => !i.isPending).length;

  for (let issue of dataSet.issues) {
    issue.labels.forEach(l => labels.add(l));
  }
}

await writeData({
  ...data,
  total,
  finished,
  labels: [...labels],
});
