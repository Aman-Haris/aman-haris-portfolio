class ProjectSystem {
    constructor() {
        this.tabBtns = document.querySelectorAll('.project-tabs .tab-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        this.swiperContainer = document.querySelector('.swiper-container');
        this.modal = document.querySelector('.modal');
        this.modalContent = document.querySelector('.modal-content');

        if (this.tabBtns.length && this.projectCards.length) {
            this.initTabs();
            // Activate first tab by default
            this.tabBtns[0].click();
        }

        if (this.swiperContainer) {
            this.initSlider();
        }

        this.initModals();
    }

    initTabs() {
        this.tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const target = btn.dataset.target;
                this.updateActiveTab(btn, target);
            });
        });
    }

    updateActiveTab(activeBtn, target) {
        this.tabBtns.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    
        this.projectCards.forEach(card => {
            card.style.display = card.classList.contains(target) ? 'flex' : 'none';
        });
    
        if (window.projectSwiper) {
            setTimeout(() => {
                window.projectSwiper.update();
                window.projectSwiper.slideTo(0); // Reset to first slide
            }, 100);
        }
    }

    initSlider() {
        window.projectSwiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: false, // Disable looping to prevent project mixing
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
            },
            // Update slides when tab changes
            on: {
                init: function() {
                    this.update();
                }
            }
        });
    }

    initModals() {
        // Close modal when clicking X or outside
        document.querySelector('.modal-close')?.addEventListener('click', () => this.closeModal());
        this.modal?.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });

        // View button handlers (show project details)
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const card = btn.closest('.project-card');
                this.openModal(`
                    <h2>${card.querySelector('h3').textContent}</h2>
                    <p>${card.querySelector('p').textContent}</p>
                    <div class="project-tech">${card.querySelector('.project-tech').innerHTML}</div>
                    ${card.querySelector('.project-video') ? `
                    <div class="video-container">
                        <video class="modal-video" controls>
                            <source src="${card.querySelector('.project-video source').src}" type="video/mp4">
                        </video>
                    </div>
                    ` : ''}
                    ${card.querySelector('.github-btn') ? `
                    <div class="project-links">
                        <a href="${card.querySelector('.github-btn').href}" target="_blank" class="btn github-btn">
                            <i class="fab fa-github"></i> View Code
                        </a>
                    </div>
                    ` : ''}
                `);
            });
        });
    }

    openModal(content) {
        this.modalContent.innerHTML = `
            <button class="modal-close">&times;</button>
            ${content}
        `;
        this.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Re-attach close event to the new button
        this.modalContent.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
    }

    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

export function initProjects() {
    try {
        new ProjectSystem();
    } catch (error) {
        console.error('Projects initialization error:', error);
    }
}