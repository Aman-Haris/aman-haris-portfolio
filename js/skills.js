function initSkillsAccordion() {
    const skillRows = document.querySelectorAll('.skills-row');
    
    skillRows.forEach(row => {
        const categories = row.querySelectorAll('.skill-category');
        
        categories.forEach(category => {
            const header = category.querySelector('.category-header');
            const content = category.querySelector('.category-content');
            const toggle = category.querySelector('.category-toggle');
            
            header.addEventListener('click', () => {
                // Toggle all categories in this row
                const willOpen = content.style.maxHeight === '0px';
                
                categories.forEach(cat => {
                    const catContent = cat.querySelector('.category-content');
                    const catToggle = cat.querySelector('.category-toggle');
                    
                    catContent.style.maxHeight = willOpen ? 
                        `${catContent.scrollHeight}px` : '0';
                    catToggle.classList.toggle('active', willOpen);
                });
            });
        });
    });
}