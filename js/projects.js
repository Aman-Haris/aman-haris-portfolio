// Project tabs and slider functionality
function initProjectTabs() {
    const tabBtns = document.querySelectorAll('.project-tabs .tab-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!tabBtns.length || !projectCards.length) return;

    // Function to filter projects
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
            window.projectSwiper.update();
            window.projectSwiper.slideTo(0);
        }
    }
    
    // Add click event to tab buttons
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProjects(btn.getAttribute('data-target'));
        });
    });
}

function initProjectSlider() {
    if (!document.querySelector('.swiper-container')) return;
    
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