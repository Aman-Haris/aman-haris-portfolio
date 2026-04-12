/**
 * bento.js
 * Handles bento card expand/collapse via <template> cloning,
 * card entrance animations via IntersectionObserver,
 * and contact form char counter.
 */

export function initBento() {
  const overlay   = document.getElementById('bento-overlay');
  const modalBody = document.getElementById('modal-body');
  const closeBtn  = document.getElementById('modal-close-btn');

  if (!overlay || !modalBody || !closeBtn) return;

  // ─── Clear modal body safely ───────────────────────────────────────────────
  function clearModal() {
    while (modalBody.firstChild) {
      modalBody.removeChild(modalBody.firstChild);
    }
  }

  // ─── Open a template into the modal ───────────────────────────────────────
  function openTemplate(targetId) {
    const template = document.getElementById(targetId);
    if (!template) return;
    clearModal();
    modalBody.appendChild(template.content.cloneNode(true));
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    // Wire up contact form char counter if present
    wireCharCounter();
    wireContactForm();
  }

  // ─── Close the modal ──────────────────────────────────────────────────────
  function closeModal() {
    overlay.hidden = true;
    clearModal();
    document.body.style.overflow = '';
  }

  // ─── Card click listeners ─────────────────────────────────────────────────
  document.querySelectorAll('[data-expandable]').forEach(card => {
    card.addEventListener('click', e => {
      // Let anchor/button navigations inside the card work normally
      if (e.target.closest('a[href]')) return;
      // The .contact-cta button inside the contact card — trigger expand
      openTemplate(card.dataset.target);
    });

    // Keyboard accessibility
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openTemplate(card.dataset.target);
      }
    });
  });

  // ─── Close triggers ───────────────────────────────────────────────────────
  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !overlay.hidden) closeModal();
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
    if (spinner)  spinner.style.display = 'inline-block';
  });
}
