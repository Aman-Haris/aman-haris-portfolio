class ParticleSystem {
    constructor(canvasSelector) {
        this.canvas = document.querySelector(canvasSelector);
        if (!this.canvas) return;

        this.initCanvas();
        this.initConfig();
        this.initParticles();
        this.initEventListeners();
        this.startAnimation();
    }

    initCanvas() {
        this.ctx = this.canvas.getContext('2d');
        this.pixelRatio = window.devicePixelRatio || 1;
        this.resizeCanvas();
    }

    initConfig() {
        this.config = {
            particleCount: this.calculateParticleCount(),
            particleColor: 'rgba(108, 92, 231, 0.8)',
            lineColor: 'rgba(108, 92, 231, 0.5)',
            particleRadius: 2.5,
            lineWidth: 1.2,
            mouseRadius: 180,
            particleSpeed: 0.5,
            particleOpacityBase: 0.9,
            lineOpacityBase: 0.6,
            defaultLineDistance: 100
        };
    }

    calculateParticleCount() {
        if (window.innerWidth > 1600) return 700;
        if (window.innerWidth < 600) return 500;
        return 600;
    }

    initParticles() {
        this.particles = Array.from({ length: this.config.particleCount }, () => ({
            x: Math.random() * this.canvas.width / this.pixelRatio,
            y: Math.random() * this.canvas.height / this.pixelRatio,
            vx: (Math.random() - 0.5) * this.config.particleSpeed,
            vy: (Math.random() - 0.5) * this.config.particleSpeed,
            radius: Math.random() * this.config.particleRadius + 1.5
        }));
    }

    initEventListeners() {
        this.mouse = {
            x: this.canvas.width / (2 * this.pixelRatio),
            y: this.canvas.height / (2 * this.pixelRatio),
            active: false
        };

        // Throttled mousemove (60fps max)
        this.throttleTimer = null;
        document.addEventListener('mousemove', (e) => {
            if (!this.throttleTimer) {
                this.throttleTimer = setTimeout(() => {
                    const rect = this.canvas.getBoundingClientRect();
                    this.mouse.x = e.clientX - rect.left;
                    this.mouse.y = e.clientY - rect.top;
                    this.mouse.active = true;
                    this.throttleTimer = null;
                }, 16); // ~60fps
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (!e.relatedTarget || e.relatedTarget.nodeName === 'HTML') {
                this.mouse.active = false;
            }
        });

        // Debounced resize
        this.resizeTimer = null;
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
                this.resizeCanvas();
                this.config.particleCount = this.calculateParticleCount();
                this.initParticles();
            }, 200);
        });
    }

    startAnimation() {
        const animate = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.updateParticles();
            this.drawConnections();
            
            if (this.mouse.active) {
                this.drawMouseEffects();
            }
            
            requestAnimationFrame(animate);
        };
        animate();
    }

    updateParticles() {
        this.particles.forEach(p => {
            // Update position
            p.x += p.vx;
            p.y += p.vy;
            
            // Bounce off edges
            if (p.x < 0 || p.x > this.canvas.width / this.pixelRatio) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height / this.pixelRatio) p.vy *= -1;
            
            // Draw particle
            this.drawParticle(p);
        });
    }

    drawParticle(p) {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        
        // Calculate opacity based on distance to mouse
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const opacity = this.mouse.active 
            ? Math.min(this.config.particleOpacityBase, 
                      this.config.particleOpacityBase * (1 - distance / this.config.mouseRadius))
            : this.config.particleOpacityBase * 0.7;
                
        this.ctx.fillStyle = `rgba(108, 92, 231, ${Math.max(0.3, opacity)})`;
        this.ctx.fill();
    }

    drawConnections() {
        const maxDistance = this.mouse.active 
            ? this.config.mouseRadius 
            : this.config.defaultLineDistance;

        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    this.drawConnectionLine(p1, p2, distance, maxDistance);
                }
            }
        }
    }

    drawConnectionLine(p1, p2, distance, maxDistance) {
        let opacity;
        
        if (this.mouse.active) {
            const mouseDist1 = Math.sqrt(Math.pow(p1.x - this.mouse.x, 2) + 
                             Math.pow(p1.y - this.mouse.y, 2));
            const mouseDist2 = Math.sqrt(Math.pow(p2.x - this.mouse.x, 2) + 
                             Math.pow(p2.y - this.mouse.y, 2));

            if (mouseDist1 < this.config.mouseRadius || 
                mouseDist2 < this.config.mouseRadius) {
                opacity = this.config.lineOpacityBase * (1 - distance / maxDistance);
                this.drawLine(p1, p2, opacity, this.config.lineWidth);
            }
        } else {
            opacity = this.config.lineOpacityBase * 0.3 * (1 - distance / maxDistance);
            this.drawLine(p1, p2, opacity, this.config.lineWidth * 0.8);
        }
    }

    drawLine(p1, p2, opacity, width) {
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.strokeStyle = `rgba(108, 92, 231, ${Math.max(0.05, opacity)})`;
        this.ctx.lineWidth = width;
        this.ctx.stroke();
    }

    drawMouseEffects() {
        // Draw mouse follower particle
        this.ctx.beginPath();
        this.ctx.arc(
            this.mouse.x, 
            this.mouse.y, 
            this.config.particleRadius * 2.0, 
            0, 
            Math.PI * 2
        );
        this.ctx.fillStyle = 'rgba(108, 92, 231, 1)';
        this.ctx.fill();

        // Draw lines from mouse to nearby particles
        this.particles.forEach(p => {
            const dx = this.mouse.x - p.x;
            const dy = this.mouse.y - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.config.mouseRadius) {
                const opacity = this.config.lineOpacityBase * 
                               (1 - distance / this.config.mouseRadius);
                this.drawLine(
                    { x: this.mouse.x, y: this.mouse.y },
                    p,
                    opacity,
                    this.config.lineWidth
                );
            }
        });
    }

    resizeCanvas() {
        this.canvas.width = document.body.scrollWidth * this.pixelRatio;
        this.canvas.height = window.innerHeight * this.pixelRatio;
        this.canvas.style.width = `${document.body.scrollWidth}px`;
        this.canvas.style.height = `${window.innerHeight}px`;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);
    }
}

export function initCanvasParticles() {
    try {
        new ParticleSystem('.connecting-dots');
        
        // Force mouse active at start with center position
        setTimeout(() => {
            const canvas = document.querySelector('.connecting-dots');
            if (canvas) {
                const pixelRatio = window.devicePixelRatio || 1;
                const mouse = {
                    x: canvas.width / (2 * pixelRatio),
                    y: canvas.height / (2 * pixelRatio),
                    active: true
                };
            }
        }, 1000);
    } catch (error) {
        console.error('Particle system error:', error);
    }
}