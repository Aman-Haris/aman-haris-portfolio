/**
 * typewriter.js
 * Shared char-by-char text reveal helper, respecting prefers-reduced-motion.
 */

export function typeLine(el, text, { speed = 35, onDone } = {}) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    el.textContent = text;
    if (onDone) onDone();
    return { cancel() {} };
  }

  el.textContent = '';
  let i = 0;
  const id = setInterval(() => {
    i++;
    el.textContent = text.slice(0, i);
    if (i >= text.length) {
      clearInterval(id);
      if (onDone) onDone();
    }
  }, speed);

  return { cancel: () => clearInterval(id) };
}
