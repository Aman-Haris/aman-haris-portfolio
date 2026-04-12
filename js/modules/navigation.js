/**
 * navigation.js
 * Adds a 'scrolled' class to the site header when the user scrolls
 * past the hero card, giving a slightly more opaque appearance.
 */
export function initNavigation() {
    const header = document.getElementById('site-header');
    if (!header) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (window.scrollY > 60) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}
