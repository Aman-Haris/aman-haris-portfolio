class SkillsAccordion {
    constructor() {
        this.skillRows = document.querySelectorAll('.skills-row');
        if (!this.skillRows.length) return;

        this.initCategories();
    }

    initCategories() {
        this.skillRows.forEach(row => {
            const categories = row.querySelectorAll('.skill-category');
            
            // Initialize all categories as open by default
            categories.forEach(category => {
                const content = category.querySelector('.category-content');
                const toggle = category.querySelector('.category-toggle');
                
                if (content && toggle) {
                    content.style.maxHeight = `${content.scrollHeight}px`;
                    toggle.classList.add('active');
                }
            });

            // Add click handler to each category in the row
            categories.forEach(category => {
                const header = category.querySelector('.category-header');
                if (!header) return;

                header.addEventListener('click', () => {
                    const currentState = this.getRowState(row);
                    this.toggleRow(row, !currentState);
                });
            });
        });
    }

    getRowState(row) {
        const firstCategory = row.querySelector('.skill-category');
        if (!firstCategory) return false;
        
        const content = firstCategory.querySelector('.category-content');
        return content.style.maxHeight !== '0px';
    }

    toggleRow(row, shouldOpen) {
        const categories = row.querySelectorAll('.skill-category');
        
        categories.forEach(category => {
            const content = category.querySelector('.category-content');
            const toggle = category.querySelector('.category-toggle');
            
            if (content && toggle) {
                if (shouldOpen) {
                    content.style.maxHeight = `${content.scrollHeight}px`;
                    toggle.classList.add('active');
                } else {
                    content.style.maxHeight = '0';
                    toggle.classList.remove('active');
                }
            }
        });
    }
}

export function initSkillsAccordion() {
    try {
        new SkillsAccordion();
    } catch (error) {
        console.error('Skills accordion error:', error);
    }
}