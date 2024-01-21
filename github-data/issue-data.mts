import jsonData from "./issue-data.json" with { type: "json" };

export interface Dataset {
  category: "tooling" | "authoring experience" | "other";
  issues: string[];
}

export const data: Record<stsring, Dataset> = jsonData;
