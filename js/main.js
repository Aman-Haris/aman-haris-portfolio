// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initCanvasParticles();
    initSkillsAccordion();
    initProjectTabs();
    initExperienceTabs();
    initProjectSlider();
    initScrollReveal();
    initContactForm();
    initTypingEffect();
});

// Initialize navigation behavior
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Show/hide navbar on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Show navbar when scrolling up or when past the hero section
        if (scrollTop > window.innerHeight * 0.8 || scrollTop < lastScrollTop) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }
        
        lastScrollTop = scrollTop;
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
        
        // Toggle icon between bars and X
        if (navLinks.classList.contains('active')) {
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70, // Adjust for navbar height
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            document.querySelector('.nav-links').classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// In main.js, update the initTypingEffect function:
function initTypingEffect() {
    const titleElement = document.querySelector('.title');
    if (!titleElement) return;
    
    // Store original text
    const originalText = titleElement.textContent.trim();
    
    // Clear the element but keep any existing HTML structure
    titleElement.innerHTML = '';
    
    // Create a container for the typing effect
    const typingContainer = document.createElement('div');
    typingContainer.className = 'typing-container';
    
    // Create the text element
    const textElement = document.createElement('span');
    textElement.className = 'typed-text'; // Changed to match CSS
    
    // Create the cursor element
    const cursorElement = document.createElement('span');
    cursorElement.className = 'cursor blinking'; // Changed to match CSS and add blinking class
    cursorElement.innerHTML = '';
    
    // Add elements to the container
    typingContainer.appendChild(textElement);
    typingContainer.appendChild(cursorElement);
    
    // Add the container to the title element
    titleElement.appendChild(typingContainer);
    
    // Animation variables
    let charIndex = 0;
    const typingDelay = 100; // milliseconds between each character
    
    // Function to type the text character by character
    function typeText() {
        if (charIndex < originalText.length) {
            textElement.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, typingDelay);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeText, 800);
}

// Initialize scroll reveal animations
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.section');
    
    const revealOnScroll = function() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('reveal', 'active');
            }
        });
    };
    
    // Initial check on page load
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
}

// Initialize skills accordion
function initSkillsAccordion() {
    // Wait for DOM to be fully ready
    document.addEventListener('DOMContentLoaded', function() {
        const categories = document.querySelectorAll('.skill-category');
        
        categories.forEach(category => {
            const header = category.querySelector('.category-header');
            const content = category.querySelector('.category-content');
            const toggle = category.querySelector('.category-toggle');
            
            // Initialize all as closed except first
            if (category !== categories[0]) {
                content.style.maxHeight = '0';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                toggle.classList.add('active');
            }
            
            // Add click handler
            header.addEventListener('click', function() {
                const isOpening = content.style.maxHeight === '0px';
                
                // Toggle this category only
                content.style.maxHeight = isOpening ? content.scrollHeight + 'px' : '0';
                toggle.classList.toggle('active', isOpening);
                
                // Close all other categories if needed (optional)
                /*
                categories.forEach(otherCat => {
                    if (otherCat !== category) {
                        otherCat.querySelector('.category-content').style.maxHeight = '0';
                        otherCat.querySelector('.category-toggle').classList.remove('active');
                    }
                });
                */
            });
        });
    });
}

// Initialize project tabs
function initProjectTabs() {
    const tabBtns = document.querySelectorAll('.project-tabs .tab-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const target = btn.getAttribute('data-target');
            
            // Show/hide project cards based on selected tab
            projectCards.forEach(card => {
                if (target === 'all-projects' || card.classList.contains(target)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Refresh the Swiper instance to update after filtering
            if (window.projectSwiper) {
                window.projectSwiper.update();
            }
        });
    });
}

// Initialize experience tabs
function initExperienceTabs() {
    const tabBtns = document.querySelectorAll('.experience-tabs .tab-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const target = btn.getAttribute('data-target');
            
            // Show/hide timeline items based on selected tab
            timelineItems.forEach(item => {
                if (target === 'all' || item.classList.contains(target)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Initialize project slider
function initProjectSlider() {
    window.projectSwiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            // When window width is >= 640px
            640: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            // When window width is >= 768px
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            // When window width is >= 1024px
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });
}

// Initialize contact form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic form validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For now, we'll just log it and show a success message
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
}