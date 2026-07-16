#!/usr/bin/env node

const inputBaseUrl = process.argv[2] ?? "http://127.0.0.1:4317";
const baseUrl = new URL(inputBaseUrl.endsWith("/") ? inputBaseUrl : `${inputBaseUrl}/`);

const checks = [
  ["landing RU", "?lang=ru", 'id="top"'],
  ["landing EN", "?lang=en", 'id="top"'],
  ["privacy RU", "privacy?lang=ru", 'class="legal-page"'],
  ["privacy EN", "privacy?lang=en", 'class="legal-page"'],
  ["terms RU", "terms?lang=ru", 'class="legal-page"'],
  ["terms EN", "terms?lang=en", 'class="legal-page"'],
  ["landing stylesheet", "styles.css", "--text:"],
];

let failed = false;

for (const [label, path, expectedFragment] of checks) {
  const url = new URL(path, baseUrl);

  try {
    const response = await fetch(url, { redirect: "manual" });
    const body = await response.text();
    const contentType = response.headers.get("content-type") ?? "";
    const hasExpectedContent = body.includes(expectedFragment);

    if (!response.ok || !hasExpectedContent) {
      failed = true;
      console.error(
        `FAIL ${label}: HTTP ${response.status}; expected ${JSON.stringify(expectedFragment)}`,
      );
      continue;
    }

    console.log(`PASS ${label}: HTTP ${response.status} (${contentType || "unknown content type"})`);
  } catch (error) {
    failed = true;
    console.error(`FAIL ${label}: ${error.message}`);
  }
}

if (failed) {
  process.exitCode = 1;
} else {
  console.log("Landing route smoke check passed.");
}
