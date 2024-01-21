
import { getData, writeData, type Result } from './utils.mts';

let data = await getData();

let total = 0;
let finished = 0;
let labels = new Set();

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
