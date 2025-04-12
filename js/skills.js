// Updated skills.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize skills accordion
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(category => {
        const header = category.querySelector('.category-header');
        const content = category.querySelector('.category-content');
        const toggle = category.querySelector('.category-toggle');
        
        // Set initial state for the first category (expanded)
        if (category === skillCategories[0]) {
            content.classList.add('active');
            toggle.classList.add('active');
            // Set explicit height instead of auto
            content.style.maxHeight = content.scrollHeight + 'px';
        }
        
        header.addEventListener('click', () => {
            // Toggle the clicked category
            const isActive = content.classList.contains('active');
            
            // Toggle active class
            content.classList.toggle('active');
            toggle.classList.toggle('active');
            
            // Update max-height based on active state
            if (!isActive) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0px';
            }
        });
    });
});