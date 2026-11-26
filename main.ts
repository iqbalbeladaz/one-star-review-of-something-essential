/**
 * one-star-review-of-something-essential
 *
 * Entry for the make.fun bounty
 * "One-Star Review of Something Essential"
 * (u-0xb3e689-one-star-review-of-something-essential-c7234629, $5).
 *
 * The program picks the strongest deadpan one-star review of an everyday
 * essential from a shortlist of candidates, scoring each one against the
 * judge's brief published with the bounty, then writes the winner to
 * $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
 *
 * Judge's brief, in short: a one-star review of an everyday essential,
 * deadpan and unmistakably about the thing itself; the sharpest true
 * grievance, a small daily annoyance everyone recognises but has never
 * seen written down; deadpan held all the way, no winking, no
 * exclamation marks doing the work; a turn in the last few words, so
 * the sting arrives after the complaint has been read straight; tight
 * and specific, one joke told cleanly.
 *
 * Deterministic: every run writes the same bytes. Standard library
 * only, no network, no input, no environment secrets.
 */

import * as fs from "node:fs";
import * as path from "node:path";

const MAX_CHARS = 160;

interface Candidate {
  essential: string;
  text: string;
}

const CANDIDATES: Candidate[] = [
  {
    essential: "Oxygen",
    text: "One star. Oxygen does nothing all day except sit there, and the one time I stop breathing it makes it entirely my problem.",
  },
  {
    essential: "Gravity",
    text: "One star. Gravity has dropped everything I have ever owned, and after all these years it still has not offered to pick a single thing up.",
  },
  {
    essential: "Sleep",
    text: "One star. Sleep demands eight hours every night, then charges interest in headaches whenever I pay it late.",
  },
  {
    essential: "The sun",
    text: "One star. The sun is either gone for months or in my eyes at six in the morning. There is no setting for reasonable.",
  },
  {
    essential: "Monday",
    text: "One star. Monday arrives every week, on time, with nothing new to offer, and still expects me to be glad to see it.",
  },
];

const STING_VERBS = ["makes", "still", "expects", "charges", "offered", "leaves", "refuses"];
const DAILY_DETAILS = [
  "breathing", "coffee", "morning", "week", "owned", "headaches",
  "eyes", "months", "night", "sky", "bottle", "petrol", "work",
];

/** Words of the text, split on whitespace. */
function words(text: string): string[] {
  return text.split(/\s+/).filter((w) => w.length > 0);
}

/**
 * Score one candidate against the judge's brief.
 * Each component is one criterion from the brief, most important first.
 */
export function scoreCandidate(c: Candidate): number {
  const text = c.text;
  const ws = words(text);
  let score = 0;

  // 1. Unmistakably about the essential: named in the opening words.
  if (text.slice(0, 25).includes(c.essential)) score += 3;

  // 2. Holds the deadpan: no exclamation or question mark, no shouting,
  //    no laughing at its own joke.
  if (!/[!?]/.test(text) && !/\b[A-Z]{3,}\b/.test(text) && !/ha ha/i.test(text)) score += 3;

  // 3. One joke told cleanly: at most two sentences.
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  if (sentences.length <= 2) score += 2;

  // 4. The turn in the last few words: a sting verb landing as late as
  //    possible. +5 in the last five words, +3 in the last ten, else 0.
  //    A final short punch sentence of its own earns +2 as well.
  let turn = 0;
  for (const verb of STING_VERBS) {
    const idx = ws.findIndex((w) => w.toLowerCase().replace(/[^a-z]/g, "") === verb);
    if (idx >= 0) {
      const fromEnd = ws.length - idx;
      turn = Math.max(turn, fromEnd <= 5 ? 5 : fromEnd <= 10 ? 3 : 1);
    }
  }
  if (sentences.length > 2 && sentences[sentences.length - 1].trim().split(/\s+/).length <= 8) turn += 2;
  score += turn;

  // 5. Sharpest true grievance: a concrete daily detail everyone knows.
  if (DAILY_DETAILS.some((d) => text.toLowerCase().includes(d))) score += 2;

  // 6. Tight: the sweet spot is 100-140 characters; near it still counts.
  if (text.length >= 100 && text.length <= 140) score += 2;
  else if (text.length >= 90 && text.length <= MAX_CHARS) score += 1;

  return score;
}

/** Pick the winner: highest score, ties broken by fewer bytes (the bounty site's own tie-break), then earliest listed. */
export function pickWinner(): { candidate: Candidate; score: number } {
  let best: Candidate = CANDIDATES[0];
  let bestScore = scoreCandidate(best);
  for (const c of CANDIDATES.slice(1)) {
    const s = scoreCandidate(c);
    if (s > bestScore || (s === bestScore && c.text.length < best.text.length)) {
      best = c;
      bestScore = s;
    }
  }
  return { candidate: best, score: bestScore };
}

/** The gate: 1-160 UTF-8 characters, one clean line, printable ASCII. */
export function entryText(): string {
  const { candidate } = pickWinner();
  const text = candidate.text;
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`entry is ${text.length} chars, must be 1-${MAX_CHARS}`);
  }
  if (text.trim() !== text || text.includes("\n") || text.length === 0) {
    throw new Error("entry must be one clean, non-empty line");
  }
  if (![...text].every((ch) => ch.codePointAt(0)! >= 32 && ch.codePointAt(0)! < 127)) {
    throw new Error("entry must be printable ASCII only");
  }
  return text;
}

function main(): void {
  // Score table on stdout so a run shows its working, entry on disk only.
  for (const c of CANDIDATES) {
    console.log(`${c.essential.padEnd(9)} score=${scoreCandidate(c)} len=${c.text.length}`);
  }
  const { candidate, score } = pickWinner();
  console.log(`winner: ${candidate.essential} (score ${score})`);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const out = path.join(outDir, "entry.txt");
  fs.mkdirSync(outDir, { recursive: true });
  // No trailing newline: the gate counts every character.
  fs.writeFileSync(out, entryText(), "utf-8");
  console.log(`wrote ${out}`);
}

main();
