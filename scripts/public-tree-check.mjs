#!/usr/bin/env node

import { execFileSync } from "node:child_process";

const forbiddenPatterns = [
  /^\.agents\//,
  /^\.codex\//,
  /^plans\//,
  /^tmp-qa\//,
  /^output\//,
  /(^|\/)CODEX_HANDOFF\.md$/,
  /(^|\/)DELIVERY_PLAN\.md$/,
  /(^|\/)AGENTS(?:\.override)?\.md$/,
  /(^|\/)README_DEPLOY\.md$/,
  /^docs\/(?:LEGAL_RELEASE_BRIEF_RU\.md|.*_DRAFT\.md)$/,
  /(^|\/)\.env(?:\..*)?$/,
  /(^|\/).+\.log$/,
];

const trackedFiles = execFileSync("git", ["ls-files"], { encoding: "utf8" })
  .split(/\r?\n/)
  .filter(Boolean);

const unexpectedMarkdown = trackedFiles.filter(
  (file) => file.endsWith(".md") && file !== "README.md",
);
const forbiddenFiles = trackedFiles.filter((file) =>
  forbiddenPatterns.some((pattern) => pattern.test(file)),
);

if (forbiddenFiles.length || unexpectedMarkdown.length) {
  console.error("Public tree check failed.");
  if (forbiddenFiles.length) {
    console.error(`Forbidden tracked files: ${forbiddenFiles.join(", ")}`);
  }
  if (unexpectedMarkdown.length) {
    console.error(`Unexpected Markdown files: ${unexpectedMarkdown.join(", ")}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Public tree check passed (${trackedFiles.length} tracked files; README.md is the only Markdown file).`);
}
