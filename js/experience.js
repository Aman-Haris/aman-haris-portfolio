// Experience/Qualification tabs functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.qualification-button');
    const tabContents = document.querySelectorAll('.qualification-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.dataset.target;
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.querySelector(`.qualification-content.${target}`).classList.add('active');
        });
    });
    
    // Set first tab as active by default
    if (tabButtons.length > 0) {
        tabButtons[0].click();
    }
});