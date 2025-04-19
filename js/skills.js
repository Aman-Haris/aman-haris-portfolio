function toggleCategory(categoryId) {
    const category = document.getElementById(categoryId);
    const content = category.querySelector('.category-content');
    const toggle = category.querySelector('.category-toggle');
    
    // Toggle the active state
    const isActive = content.classList.toggle('active');
    toggle.classList.toggle('active', isActive);
    
    // Animate the height
    if (isActive) {
        content.style.maxHeight = content.scrollHeight + 'px';
    } else {
        content.style.maxHeight = '0';
    }
}

// Initialize all categories on load
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.skill-category').forEach(category => {
        const content = category.querySelector('.category-content');
        content.style.maxHeight = '0'; // Start all collapsed
    });
});