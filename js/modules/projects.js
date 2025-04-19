class ProjectSystem {
    constructor() {
        this.tabBtns = document.querySelectorAll('.project-tabs .tab-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        this.swiperContainer = document.querySelector('.swiper-container');

        if (this.tabBtns.length && this.projectCards.length) {
            this.initTabs();
        }

        if (this.swiperContainer) {
            this.initSlider();
        }
    }

    initTabs() {
        this.tabBtns.forEach(btn => {
            btn.addEventListener('click', () => this.filterProjects(btn));
        });
    }

    filterProjects(activeBtn) {
        this.tabBtns.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');

        const target = activeBtn.dataset.target;
        this.projectCards.forEach(card => {
            card.style.display = (target === 'all-projects' || card.classList.contains(target)) 
                ? 'flex' 
                : 'none';
        });

        if (window.projectSwiper) {
            window.projectSwiper.update();
        }
    }

    initSlider() {
        window.projectSwiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: false,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 30 }
            }
        });
    }
}

export function initProjects() {
    try {
        new ProjectSystem();
    } catch (error) {
        console.error('Projects initialization error:', error);
    }
}