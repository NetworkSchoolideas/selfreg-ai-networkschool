#!/usr/bin/env node

import { readFile } from "node:fs/promises";

const htmlFiles = ["index.html", "privacy.html", "terms.html"];
const keyPattern = /data-i18n(?:-[\w-]+)?="([^"]+)"/g;

function translationBlock(source, language, nextLanguage) {
  const start = source.indexOf(`  ${language}: {`);
  const end = nextLanguage ? source.indexOf(`  ${nextLanguage}: {`, start) : source.indexOf("\n};", start);

  if (start === -1 || end === -1) {
    throw new Error(`Unable to locate the ${language} translation block.`);
  }

  return source.slice(start, end);
}

function hasKey(block, key) {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escapedKey}\\s*:`).test(block);
}

const [translationSource, ...documents] = await Promise.all([
  readFile("i18n.js", "utf8"),
  ...htmlFiles.map((file) => readFile(file, "utf8")),
]);

const keys = new Set();
for (const document of documents) {
  for (const match of document.matchAll(keyPattern)) {
    keys.add(match[1]);
  }
}

const ru = translationBlock(translationSource, "ru", "en");
const en = translationBlock(translationSource, "en");
const missing = {
  ru: [...keys].filter((key) => !hasKey(ru, key)),
  en: [...keys].filter((key) => !hasKey(en, key)),
};

if (missing.ru.length || missing.en.length) {
  console.error("Localization integrity check failed.");
  for (const [language, languageMissing] of Object.entries(missing)) {
    if (languageMissing.length) {
      console.error(`Missing ${language.toUpperCase()} keys: ${languageMissing.join(", ")}`);
    }
  }
  process.exitCode = 1;
} else {
  console.log(`Localization integrity check passed (${keys.size} template keys in RU and EN).`);
}
