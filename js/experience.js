// Experience section functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize experience tabs
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
    
    // Expand/collapse timeline details
    const timelineHeaders = document.querySelectorAll('.timeline-content h3');
    
    timelineHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const details = this.parentNode.querySelector('.timeline-details');
            
            if (details) {
                details.classList.toggle('active');
                
                if (details.classList.contains('active')) {
                    details.style.maxHeight = details.scrollHeight + 'px';
                } else {
                    details.style.maxHeight = '0';
                }
            }
        });
    });
});