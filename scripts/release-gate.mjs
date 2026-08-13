#!/usr/bin/env node

import { execFileSync, spawn } from "node:child_process";
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, resolve } from "node:path";

const root = process.cwd();
const port = 4318;
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function run(command, args) {
  console.log(`\n> ${command} ${args.join(" ")}`);
  execFileSync(command, args, { cwd: root, stdio: "inherit" });
}

function serveFile(request, response) {
  const pathname = new URL(request.url, "http://127.0.0.1").pathname;
  const route = pathname === "/"
    ? "index.html"
    : pathname === "/privacy"
      ? "privacy.html"
      : pathname === "/terms"
        ? "terms.html"
        : decodeURIComponent(pathname.replace(/^\//, ""));
  const file = resolve(root, route);

  if (!file.startsWith(root) || !existsSync(file) || statSync(file).isDirectory()) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  response.writeHead(200, { "content-type": mimeTypes[extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(response);
}

function runAsync(command, args) {
  console.log(`\n> ${command} ${args.join(" ")}`);
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: root, stdio: "inherit" });
    child.on("error", reject);
    child.on("close", (code) => code === 0 ? resolve() : reject(new Error(`${command} exited with ${code}.`)));
  });
}

run(process.execPath, ["--check", "i18n.js"]);
run(process.execPath, ["--check", "legal.js"]);
run(process.execPath, ["--check", "scripts/i18n-integrity.mjs"]);
run(process.execPath, ["--check", "scripts/public-tree-check.mjs"]);
run(process.execPath, ["scripts/i18n-integrity.mjs"]);
run(process.execPath, ["scripts/public-tree-check.mjs"]);
run("git", ["diff", "--check"]);

const server = createServer(serveFile);
await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));
try {
  await runAsync(process.execPath, ["scripts/landing-smoke.mjs", `http://127.0.0.1:${port}`]);
} finally {
  await new Promise((resolve) => server.close(resolve));
}

console.log("\nRelease gate passed.");
