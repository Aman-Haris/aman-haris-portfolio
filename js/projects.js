// Improved project slider for mobile
function initProjectSlider() {
    const swiperContainer = document.querySelector('.swiper-container');
    if (!swiperContainer) return;
    
    window.projectSwiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 20,
        centeredSlides: false,
        loop: false,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            480: {
                slidesPerView: 1.2,
                spaceBetween: 20
            },
            640: {
                slidesPerView: 1.5,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 25
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });
}

// Improved project tabs for mobile
function initProjectTabs() {
    const tabBtns = document.querySelectorAll('.project-tabs .tab-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!tabBtns.length || !projectCards.length) return;

    function filterProjects(category) {
        projectCards.forEach(card => {
            card.style.display = 'none';
        });
        
        if (category === 'all-projects') {
            projectCards.forEach(card => {
                card.style.display = 'flex';
            });
        } else {
            document.querySelectorAll('.' + category).forEach(card => {
                card.style.display = 'flex';
            });
        }
        
        if (window.projectSwiper) {
            setTimeout(() => {
                window.projectSwiper.update();
                window.projectSwiper.slideTo(0, 300);
            }, 50);
        }
    }
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Prevent rapid clicking on mobile
            if (this.classList.contains('active')) return;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterProjects(this.getAttribute('data-target'));
        });
    });
}