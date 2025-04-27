class ThemeToggle {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.body = document.body;
        this.moonIcon = document.getElementById('moon-icon');
        this.sunIcon = document.getElementById('sun-icon');

        this.init();
    }

    init() {
        // Load the saved theme from localStorage or use the default theme from the body attribute
        const savedTheme = localStorage.getItem('theme') || this.body.getAttribute('data-theme');
        this.body.setAttribute('data-theme', savedTheme);
        this.updateIcons(savedTheme);

        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        const currentTheme = this.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        this.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateIcons(newTheme);
    }

    updateIcons(theme) {
        if (theme === 'light') {
            this.moonIcon.style.color = 'var(--text-secondary)';
            this.sunIcon.style.color = 'var(--primary-accent)';
        } else {
            this.moonIcon.style.color = 'var(--primary-accent)';
            this.sunIcon.style.color = 'var(--text-secondary)';
        }
    }
}

export function initThemeToggle() {
    try {
        new ThemeToggle();
    } catch (error) {
        console.error('Theme toggle error:', error);
    }
}
