class ScrollReveal {
    constructor() {
        this.revealElements = document.querySelectorAll('.section');
        if (!this.revealElements.length) return;

        this.init();
    }

    init() {
        // Initial check
        this.checkVisibility();
        
        // Event listener with throttling
        let isScrolling;
        window.addEventListener('scroll', () => {
            clearTimeout(isScrolling);
            isScrolling = setTimeout(() => {
                this.checkVisibility();
            }, 50);
        }, { passive: true });
    }

    checkVisibility() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        this.revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('reveal', 'active');
            }
        });
    }
}

export function initScrollReveal() {
    try {
        new ScrollReveal();
    } catch (error) {
        console.error('Scroll reveal error:', error);
    }
}