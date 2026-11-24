// SPDX-License-Identifier: MIT
// One-Liner Laugh Lab — make.fun bounty u-suroso-69-one-liner-laugh-lab-6ccf3aae
// Writes one short funny line to /output/entry.txt.
// The line is the excuse a robot vacuum gives after eating a sock:
// it claims it ate the sock to save it from the dryer — the dryer being
// the household appliance famous for eating socks. Deadpan hero framing,
// one line, no setup that overstays.

import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "I ate the sock to save it from the dryer. You're welcome.";
const MIN_CHARS = 1;
const MAX_CHARS = 200;

function emptyDir(dir: string): void {
  // Empty only the directory's contents. The grader's /output is a mounted
  // empty directory: removing the directory itself fails, so never rmSync it.
  mkdirSync(dir, { recursive: true });
  for (const entry of readdirSync(dir)) {
    rmSync(join(dir, entry), { recursive: true, force: true });
  }
}

function main(): void {
  const outDir = process.argv[2] ?? "/output";
  if (LINE.length < MIN_CHARS || LINE.length > MAX_CHARS) {
    throw new Error(`line is ${LINE.length} chars, outside the ${MIN_CHARS}-${MAX_CHARS} gate`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("line must not be whitespace-only");
  }
  if (LINE !== LINE.trim()) {
    throw new Error("line must not start or end with whitespace");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  emptyDir(outDir);
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  const written = readFileSync(target, "utf8");
  if (written !== LINE) {
    throw new Error("entry.txt does not match the line exactly");
  }
  console.log(`wrote ${target} (${LINE.length} chars)`);
}

main();
