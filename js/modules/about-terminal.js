/**
 * about-terminal.js
 * Cycles a terminal boot-line inside the About card (type -> hold -> clear -> next),
 * looping forever. Purely decorative — respects prefers-reduced-motion.
 */

import { typeLine } from './typewriter.js';

const LINES = [
  '> whoami',
  'aman-haris — ai/ml engineer',
  '> cat skills.json | head -3',
  '["GenAI", "RAG", "LLMs"]',
  '> ./deploy.sh --tool resume-analysis-tool',
  '✓ 70k+ resumes analyzed',
  '> echo $UPTIME',
  '2+ years shipping production AI',
];

const HOLD_MS = 1800;
const GAP_MS = 400;

export function initAboutTerminal() {
  const line = document.querySelector('.about-terminal-line');
  if (!line) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index = 0;
  let timerId = null;
  let typer = null;

  function step() {
    typer = typeLine(line, LINES[index], {
      onDone: () => {
        timerId = setTimeout(() => {
          index = (index + 1) % LINES.length;
          if (reducedMotion) {
            step(); // typeLine swaps text instantly, no clear/gap needed
          } else {
            line.textContent = '';
            timerId = setTimeout(step, GAP_MS);
          }
        }, HOLD_MS);
      },
    });
  }

  step();

  return {
    cancel() {
      if (typer) typer.cancel();
      if (timerId) clearTimeout(timerId);
    },
  };
}
