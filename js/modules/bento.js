/**
 * bento.js
 * Handles bento card expand/collapse via <template> cloning,
 * card entrance animations via IntersectionObserver,
 * and contact form char counter.
 */

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function initBento() {
  const overlay   = document.getElementById('bento-overlay');
  const modalBody = document.getElementById('modal-body');
  const closeBtn  = document.getElementById('modal-close-btn');
  const main      = document.querySelector('main.bento-grid');

  if (!overlay || !modalBody || !closeBtn) return;

  let lastFocusedEl = null;
  let currentTargetId = null;

  // ─── Clear modal body safely ───────────────────────────────────────────────
  function clearModal() {
    while (modalBody.firstChild) {
      modalBody.removeChild(modalBody.firstChild);
    }
  }

  // ─── Focus trap ────────────────────────────────────────────────────────────
  function trapFocus(e) {
    if (e.key !== 'Tab') return;
    const focusable = overlay.querySelectorAll(FOCUSABLE_SELECTOR);
    if (!focusable.length) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  // ─── Open a template into the modal ───────────────────────────────────────
  function openTemplate(targetId, triggerEl) {
    const template = document.getElementById(targetId);
    if (!template) return;
    currentTargetId = targetId;
    clearModal();
    modalBody.appendChild(template.content.cloneNode(true));
    overlay.hidden = false;
    document.body.classList.add('modal-open');
    if (main) main.setAttribute('inert', '');
    lastFocusedEl = triggerEl || document.activeElement;
    closeBtn.focus();
    // Wire up contact form char counter if present
    wireCharCounter();
    wireContactForm();
    modalBody.dispatchEvent(new CustomEvent('template:mounted', { bubbles: true, detail: { targetId } }));
  }

  // ─── Close the modal ──────────────────────────────────────────────────────
  function closeModal() {
    modalBody.dispatchEvent(new CustomEvent('template:unmounted', { bubbles: true, detail: { targetId: currentTargetId } }));
    overlay.hidden = true;
    clearModal();
    currentTargetId = null;
    document.body.classList.remove('modal-open');
    if (main) main.removeAttribute('inert');
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  // ─── Card click listeners ─────────────────────────────────────────────────
  document.querySelectorAll('[data-expandable]').forEach(card => {
    card.addEventListener('click', e => {
      // Let anchor/button navigations inside the card work normally
      if (e.target.closest('a[href]')) return;
      // The .contact-cta button inside the contact card — trigger expand
      openTemplate(card.dataset.target, card);
    });

    // Keyboard accessibility
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openTemplate(card.dataset.target, card);
      }
    });
  });

  // ─── Close triggers ───────────────────────────────────────────────────────
  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (overlay.hidden) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Tab') trapFocus(e);
  });

  // ─── About photo flip ─────────────────────────────────────────────────────
  const photoWrap = document.querySelector('.about-photo-wrap');
  if (photoWrap) {
    photoWrap.addEventListener('click', e => {
      e.stopPropagation(); // don't also open the about modal
      photoWrap.classList.toggle('flipped');
    });
  }

  // ─── Card entrance animations ─────────────────────────────────────────────
  const entranceObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          entranceObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  document.querySelectorAll('.bento-card').forEach(card => {
    entranceObserver.observe(card);
  });
}

// ─── Contact form char counter ───────────────────────────────────────────────
function wireCharCounter() {
  const textarea = document.getElementById('message');
  const counter  = document.querySelector('.char-counter');
  if (!textarea || !counter) return;

  textarea.addEventListener('input', () => {
    counter.textContent = `${textarea.value.length}/500`;
  });
}

// ─── Contact form submit spinner ─────────────────────────────────────────────
function wireContactForm() {
  const form       = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', () => {
    const btnText    = form.querySelector('.button-text');
    const spinner    = form.querySelector('.loading-icon');
    if (btnText)  btnText.textContent = 'Sending…';
    if (spinner)  spinner.classList.add('is-visible');
  });
}
