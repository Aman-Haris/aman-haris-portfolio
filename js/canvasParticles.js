// canvasParticles.js - Final optimized version
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
        particleCount: 1800,                    // Increased particle count
        particleColor: 'rgba(108, 92, 231, 0.8)',
        lineColor: 'rgba(108, 92, 231, 0.5)',  // Increased line opacity
        particleRadius: 2.5,                   // Increased particle size
        lineWidth: 1.2,                        // Increased line width
        mouseRadius: 180,                      // Increased mouse influence radius
        particleSpeed: 0.5,                    // Slowed down movement
        particleOpacityBase: 0.9,              // Increased base opacity
        lineOpacityBase: 0.6,                  // Increased line opacity
        defaultLineDistance: 100               // Distance for lines when mouse isn't active
    };
    
    // Adjust particle count based on screen width
    if (window.innerWidth > 1600) {
        config.particleCount = 2000;
    } else if (window.innerWidth < 600) {
        config.particleCount = 500;
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
            this.radius = Math.random() * config.particleRadius + 1.5;
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
                config.particleOpacityBase * 0.7; // Higher base opacity when mouse isn't active
                
            ctx.fillStyle = `rgba(108, 92, 231, ${Math.max(0.3, opacity)})`;
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
                
                // Draw lines between nearby particles regardless of mouse position
                const maxDistance = mouse.active ? config.mouseRadius : config.defaultLineDistance;
                
                if (distance < maxDistance) {
                    let opacity;
                    
                    if (mouse.active) {
                        // Check if either particle is close to mouse
                        const mouseDistance1 = Math.sqrt(
                            Math.pow(particles[i].x - mouse.x, 2) + 
                            Math.pow(particles[i].y - mouse.y, 2)
                        );
                        
                        const mouseDistance2 = Math.sqrt(
                            Math.pow(particles[j].x - mouse.x, 2) + 
                            Math.pow(particles[j].y - mouse.y, 2)
                        );
                        
                        // If mouse is active and at least one particle is near mouse
                        if (mouseDistance1 < config.mouseRadius || mouseDistance2 < config.mouseRadius) {
                            opacity = config.lineOpacityBase * (1 - distance / maxDistance);
                            
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.strokeStyle = `rgba(108, 92, 231, ${Math.max(0.1, opacity)})`;
                            ctx.lineWidth = config.lineWidth;
                            ctx.stroke();
                        }
                    } else {
                        // When mouse is not active, draw some lines anyway
                        if (distance < config.defaultLineDistance) {
                            opacity = config.lineOpacityBase * 0.3 * (1 - distance / config.defaultLineDistance);
                            
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.strokeStyle = `rgba(108, 92, 231, ${Math.max(0.05, opacity)})`;
                            ctx.lineWidth = config.lineWidth * 0.8;
                            ctx.stroke();
                        }
                    }
                }
            }
        }
        
        // Draw mouse follower particle
        if (mouse.active) {
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, config.particleRadius * 2.0, 0, Math.PI * 2);
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
                    ctx.strokeStyle = `rgba(108, 92, 231, ${Math.max(0.15, opacity)})`;
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
            config.particleCount = 180;
        } else if (window.innerWidth < 600) {
            config.particleCount = 70;
        } else {
            config.particleCount = 120;
        }
        
        createParticles();
    });
    
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