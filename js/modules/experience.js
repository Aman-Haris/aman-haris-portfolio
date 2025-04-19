class ExperienceTabs {
    constructor() {
        this.tabButtons = document.querySelectorAll('.qualification-button');
        this.tabContents = document.querySelectorAll('.qualification-content');
        
        if (!this.tabButtons.length || !this.tabContents.length) return;

        this.initTabs();
    }

    initTabs() {
        this.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                setTimeout(() => {
                    const target = button.dataset.target;
                    this.updateActiveTab(button, target);
                }, 50);
            });
        });

        // Set first tab as active by default
        if (this.tabButtons.length > 0) {
            this.tabButtons[0].click();
        }
    }

    updateActiveTab(activeButton, target) {
        this.tabButtons.forEach(btn => btn.classList.remove('active'));
        this.tabContents.forEach(content => content.classList.remove('active'));

        activeButton.classList.add('active');
        document.querySelector(`.qualification-content.${target}`)?.classList.add('active');
    }
}

export function initExperience() {
    try {
        new ExperienceTabs();
    } catch (error) {
        console.error('Experience tabs error:', error);
    }
}