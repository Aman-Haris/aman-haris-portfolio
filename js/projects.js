// Updated projects.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize project tabs
    const tabBtns = document.querySelectorAll('.project-tabs .tab-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Function to filter projects
    function filterProjects(category) {
        // Hide all projects first
        projectCards.forEach(card => {
            card.style.display = 'none';
        });
        
        // Show only the projects that match the selected category
        if (category === 'all-projects') {
            projectCards.forEach(card => {
                card.style.display = 'flex';
            });
        } else {
            document.querySelectorAll('.' + category).forEach(card => {
                card.style.display = 'flex';
            });
        }
        
        // Update the swiper after filtering
        if (window.projectSwiper) {
            window.projectSwiper.update();
            window.projectSwiper.slideTo(0);
        }
    }
    
    // Add click event to tab buttons
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects based on selected category
            const target = btn.getAttribute('data-target');
            filterProjects(target);
        });
    });
    
    // Initialize project slider with proper settings
    if (document.querySelector('.swiper-container')) {
        window.projectSwiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 30,
            centeredSlides: false,
            loop: false, // Disable loop to prevent duplicate slides
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }
        });
    }
});