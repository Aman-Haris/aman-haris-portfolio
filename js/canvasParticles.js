// canvasParticles.js - Fixed mouse detection
function initCanvasParticles() {
    const canvas = document.querySelector('.connecting-dots');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size with device pixel ratio for clarity
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = document.body.scrollWidth * pixelRatio;
    canvas.height = window.innerHeight * pixelRatio;
    canvas.style.width = document.body.scrollWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(pixelRatio, pixelRatio);
    
    // Configuration
    const config = {
        particleCount: 100,
        particleColor: 'rgba(108, 92, 231, 0.8)',
        lineColor: 'rgba(108, 92, 231, 0.2)',
        particleRadius: 2,
        lineWidth: 1,
        mouseRadius: 150,
        particleSpeed: 0.8,
        particleOpacityBase: 0.8,
        lineOpacityBase: 0.4
    };
    
    // Adjust particle count based on screen width
    if (window.innerWidth > 1600) {
        config.particleCount = 150;
    } else if (window.innerWidth < 600) {
        config.particleCount = 50;
    }
    
    // Mouse position
    let mouse = {
        x: canvas.width / (2 * pixelRatio),
        y: canvas.height / (2 * pixelRatio),
        active: false
    };
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width / pixelRatio;
            this.y = Math.random() * canvas.height / pixelRatio;
            this.vx = (Math.random() - 0.5) * config.particleSpeed;
            this.vy = (Math.random() - 0.5) * config.particleSpeed;
            this.radius = Math.random() * config.particleRadius + 1;
        }
        
        update() {
            // Update position
            this.x += this.vx;
            this.y += this.vy;
            
            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width / pixelRatio) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height / pixelRatio) this.vy = -this.vy;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            
            // Calculate opacity based on distance to mouse
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const opacity = mouse.active ? 
                Math.min(config.particleOpacityBase, config.particleOpacityBase * (1 - distance / config.mouseRadius)) : 
                config.particleOpacityBase * 0.5;
                
            ctx.fillStyle = `rgba(108, 92, 231, ${Math.max(0.1, opacity)})`;
            ctx.fill();
        }
    }
    
    // Create particles
    let particles = [];
    function createParticles() {
        particles = [];
        for (let i = 0; i < config.particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Special mouse follower particle
    let mouseParticle = new Particle();
    mouseParticle.radius = config.particleRadius * 2;
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw lines between particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Only draw lines for particles that are close to each other
                // and at least one is close to the mouse
                if (distance < config.mouseRadius) {
                    const opacity = config.lineOpacityBase * (1 - distance / config.mouseRadius);
                    
                    // Check if either particle is close to mouse
                    let mouseDistance1 = Infinity;
                    let mouseDistance2 = Infinity;
                    
                    if (mouse.active) {
                        mouseDistance1 = Math.sqrt(
                            Math.pow(particles[i].x - mouse.x, 2) + 
                            Math.pow(particles[i].y - mouse.y, 2)
                        );
                        
                        mouseDistance2 = Math.sqrt(
                            Math.pow(particles[j].x - mouse.x, 2) + 
                            Math.pow(particles[j].y - mouse.y, 2)
                        );
                    }
                    
                    if (mouse.active && (mouseDistance1 < config.mouseRadius || mouseDistance2 < config.mouseRadius)) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(108, 92, 231, ${opacity})`;
                        ctx.lineWidth = config.lineWidth;
                        ctx.stroke();
                    }
                }
            }
        }
        
        // Draw mouse follower particle
        if (mouse.active) {
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, config.particleRadius * 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(108, 92, 231, 1)';
            ctx.fill();
            
            // Draw lines from mouse to nearby particles
            particles.forEach(particle => {
                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < config.mouseRadius) {
                    const opacity = config.lineOpacityBase * (1 - distance / config.mouseRadius);
                    ctx.beginPath();
                    ctx.moveTo(mouse.x, mouse.y);
                    ctx.lineTo(particle.x, particle.y);
                    ctx.strokeStyle = `rgba(108, 92, 231, ${opacity})`;
                    ctx.lineWidth = config.lineWidth;
                    ctx.stroke();
                }
            });
        }
        
        requestAnimationFrame(animate);
    }
    
    // Handle mouse movement - DOCUMENT LEVEL instead of canvas
    document.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
        
        console.log("Mouse detected:", mouse.x, mouse.y); // Debug line
    });
    
    // Handle mouse leave - DOCUMENT LEVEL
    document.addEventListener('mouseout', function(e) {
        // Only deactivate if the mouse is leaving the window
        if (e.relatedTarget === null || e.relatedTarget.nodeName === 'HTML') {
            mouse.active = false;
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = document.body.scrollWidth * pixelRatio;
        canvas.height = window.innerHeight * pixelRatio;
        canvas.style.width = document.body.scrollWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        ctx.scale(pixelRatio, pixelRatio);
        
        // Adjust particle count
        if (window.innerWidth > 1600) {
            config.particleCount = 150;
        } else if (window.innerWidth < 600) {
            config.particleCount = 50;
        } else {
            config.particleCount = 100;
        }
        
        createParticles();
    });
    
    // Add a debug element to check mouse position
    const debugElement = document.createElement('div');
    debugElement.style.position = 'fixed';
    debugElement.style.bottom = '10px';
    debugElement.style.right = '10px';
    debugElement.style.background = 'rgba(0,0,0,0.7)';
    debugElement.style.color = 'white';
    debugElement.style.padding = '5px';
    debugElement.style.fontSize = '12px';
    debugElement.style.zIndex = '9999';
    document.body.appendChild(debugElement);
    
    // Update debug info
    setInterval(() => {
        debugElement.textContent = `Mouse: ${mouse.x.toFixed(0)},${mouse.y.toFixed(0)} | Active: ${mouse.active}`;
    }, 100);
    
    // Initialize
    createParticles();
    animate();
    
    // Force mouse active at start with center position
    setTimeout(() => {
        mouse.active = true;
        mouse.x = canvas.width / (2 * pixelRatio);
        mouse.y = canvas.height / (2 * pixelRatio);
    }, 1000);
}

// Export the function
window.initCanvasParticles = initCanvasParticles;