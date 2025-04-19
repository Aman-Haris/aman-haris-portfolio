class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        if (!this.navbar) return;

        this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section');
        this.backToTopBtn = document.querySelector('.back-to-top');

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateActiveNavLink();
    }

    setupEventListeners() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.addEventListener('click', this.toggleMobileMenu.bind(this));
        }

        this.navLinks.forEach(link => {
            link.addEventListener('click', this.handleNavClick.bind(this));
        });

        if (this.backToTopBtn) {
            this.backToTopBtn.addEventListener('click', this.scrollToTop.bind(this));
        }
    }

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const aboutSection = document.getElementById('about');

        if (scrollTop >= aboutSection?.offsetTop - 100) {
            this.navbar.classList.add('visible');
        } else {
            this.navbar.classList.remove('visible');
        }

        this.updateActiveNavLink();

        if (this.backToTopBtn) {
            this.backToTopBtn.style.opacity = scrollTop > 300 ? '1' : '0';
        }
    }

    toggleMobileMenu() {
        const navLinksContainer = document.querySelector('.nav-links');
        navLinksContainer.classList.toggle('active');
        this.mobileMenuBtn.innerHTML = navLinksContainer.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    }

    handleNavClick(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection?.offsetTop - 70,
            behavior: 'smooth'
        });

        const navLinksContainer = document.querySelector('.nav-links');
        if (navLinksContainer?.classList.contains('active')) {
            navLinksContainer.classList.remove('active');
            this.mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }

    updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    scrollToTop(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

export function initNavigation() {
    try {
        new Navigation();
    } catch (error) {
        console.error('Navigation initialization error:', error);
    }
}