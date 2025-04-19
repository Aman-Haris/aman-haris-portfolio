class ProjectSystem {
    constructor() {
        this.tabBtns = document.querySelectorAll('.project-tabs .tab-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        this.swiperContainer = document.querySelector('.swiper-container');
        this.modal = document.querySelector('.modal');
        this.modalContent = document.querySelector('.modal-content');

        if (this.tabBtns.length && this.projectCards.length) {
            this.initTabs();
        }

        if (this.swiperContainer) {
            this.initSlider();
        }

        this.initModals();
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
            setTimeout(() => window.projectSwiper.update(), 300);
        }
    }

    initSlider() {
        window.projectSwiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true, // Enable looping
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
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

    initModals() {
        // Close modal when clicking X or outside
        document.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });

        // Demo button handlers
        document.querySelectorAll('.demo-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const videoSrc = btn.closest('.project-card').querySelector('.project-video source').src;
                this.openModal(`
                    <video class="modal-video" controls autoplay>
                        <source src="${videoSrc}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <h3>${btn.closest('.project-card').querySelector('h3').textContent}</h3>
                `);
            });
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