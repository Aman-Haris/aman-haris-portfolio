// Improved experience tabs for mobile
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.qualification-button');
    const tabContents = document.querySelectorAll('.qualification-content');
    
    // Make tabs more touch-friendly
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add slight delay for mobile to ensure smooth transition
            setTimeout(() => {
                const target = this.dataset.target;
                
                tabButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                this.classList.add('active');
                document.querySelector(`.qualification-content.${target}`).classList.add('active');
            }, 50);
        });
    });
    
    // Set first tab as active by default
    if (tabButtons.length > 0) {
        tabButtons[0].click();
    }
});