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

// Initialize typing effect
function initTypingEffect() {
    const titleElement = document.querySelector('.title');
    if (!titleElement) return;
    
    const originalText = titleElement.textContent.trim();
    titleElement.innerHTML = '';
    
    const typingContainer = document.createElement('div');
    typingContainer.className = 'typing-container';
    
    const textElement = document.createElement('span');
    textElement.className = 'typed-text';
    
    const cursorElement = document.createElement('span');
    cursorElement.className = 'cursor blinking';
    cursorElement.innerHTML = '';
    
    typingContainer.appendChild(textElement);
    typingContainer.appendChild(cursorElement);
    titleElement.appendChild(typingContainer);
    
    let charIndex = 0;
    const typingDelay = 100;
    
    function typeText() {
        if (charIndex < originalText.length) {
            textElement.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, typingDelay);
        }
    }
    
    setTimeout(typeText, 800);
}