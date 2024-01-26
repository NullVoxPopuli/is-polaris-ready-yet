import { getOmissions } from "./utils.mts";

const lines = await getOmissions();

const errors = [];

for (let line of lines) {
  let hasHttps = line.startsWith("https://");
  let isGitHub = line.includes("github.com");
  let isIssue = line.includes("/issues/");
  let isPull = line.includes("/pull/");

  let httpsCount = (line.match(/https/g) || []).length;

  let isValid = hasHttps && isGitHub && (isIssue || isPull) && httpsCount === 1;

  if (!isValid) {
    errors.push(`Line: "${line}" was invalid`);
  }
}

if (errors.length > 0) {
  console.error(errors);
  process.exit(1);
} else {
  console.log("No Errors!");
}
