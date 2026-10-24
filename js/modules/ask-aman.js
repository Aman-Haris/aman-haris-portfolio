/**
 * ask-aman.js
 * Scripted (no live LLM calls) FAQ chat for the "Ask Aman" bento card.
 * Hooks into bento.js's template:mounted/unmounted CustomEvents so it only
 * initializes when the expand-ask template is actually in the DOM.
 */

import { TOPICS, matchTopic } from './ask-aman-data.js';
import { typeLine } from './typewriter.js';

let activeTypers = [];

function appendMessage(log, text, role) {
  const message = document.createElement('div');
  message.className = `ask-message ask-message-${role}`;
  const span = document.createElement('span');
  span.className = 'ask-message-text';
  message.appendChild(span);
  log.appendChild(message);
  log.scrollTop = log.scrollHeight;
  return span;
}

function respond(log, text) {
  const el = appendMessage(log, '', 'bot');
  const typer = typeLine(el, text, {
    onDone: () => {
      log.scrollTop = log.scrollHeight;
    },
  });
  activeTypers.push(typer);
}

function renderChips(chipRow, log) {
  while (chipRow.firstChild) chipRow.removeChild(chipRow.firstChild);

  TOPICS.filter(t => t.chip).forEach(topic => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'ask-chip';
    chip.textContent = topic.chip;
    chip.addEventListener('click', () => {
      appendMessage(log, topic.chip, 'user');
      respond(log, topic.response);
    });
    chipRow.appendChild(chip);
  });
}

function initChatUI() {
  const log     = document.getElementById('ask-chat-log');
  const chipRow = document.getElementById('ask-chip-row');
  const form    = document.getElementById('ask-form');
  const input   = document.getElementById('ask-input');
  if (!log || !chipRow || !form || !input) return;

  renderChips(chipRow, log);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    appendMessage(log, value, 'user');
    const topic = matchTopic(value);
    respond(log, topic.response);
    input.value = '';
  });
}

function teardownChatUI() {
  activeTypers.forEach(t => t.cancel());
  activeTypers = [];
}

export function initAskAman() {
  const modalBody = document.getElementById('modal-body');
  if (!modalBody) return;

  modalBody.addEventListener('template:mounted', e => {
    if (e.detail.targetId === 'expand-ask') initChatUI();
  });

  modalBody.addEventListener('template:unmounted', e => {
    if (e.detail.targetId === 'expand-ask') teardownChatUI();
  });
}
