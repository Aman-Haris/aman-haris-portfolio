// Skills accordion functionality
function initSkillsAccordion() {
    const skillCategories = document.querySelectorAll('.skill-category');
    if (!skillCategories.length) return;
    
    skillCategories.forEach((category, index) => {
        const header = category.querySelector('.category-header');
        const content = category.querySelector('.category-content');
        const toggle = category.querySelector('.category-toggle');
        
        // Set first category expanded by default
        if (index === 0) {
            content.classList.add('active');
            toggle.classList.add('active');
            content.style.maxHeight = content.scrollHeight + 'px';
        }
        
        header.addEventListener('click', () => {
            const isActive = content.classList.contains('active');
            content.classList.toggle('active');
            toggle.classList.toggle('active');
            content.style.maxHeight = isActive ? '0px' : content.scrollHeight + 'px';
        });
    });
}