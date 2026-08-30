class ThemeToggle {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.root = document.documentElement;

        this.init();
    }

    init() {
        // Theme attribute is already applied by the blocking inline script in <head>
        // (avoids a flash of the wrong theme); this only wires up the toggle click.
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        const currentTheme = this.root.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        this.root.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }
}

export function initThemeToggle() {
    try {
        new ThemeToggle();
    } catch (error) {
        console.error('Theme toggle error:', error);
    }
}
