/**
 * particles.js
 * Canvas particle system for the hero bento card.
 *
 * Bug fixes applied:
 * - Split initEventListeners into initMouseListeners + initResizeListener
 *   so resize handler never re-registers the mouse/resize listeners.
 * - Canvas resizes to parent card dimensions, not full viewport.
 * - Updated colors to match new design palette.
 * - Reduced particle counts to avoid frame drops.
 */

class ParticleSystem {
    constructor(canvasSelector) {
        this.canvas = document.querySelector(canvasSelector);
        if (!this.canvas) return;

        this.initCanvas();
        this.initConfig();
        this.initParticles();
        this.initMouseListeners();   // called once
        this.initResizeListener();   // called once
        this.startAnimation();
    }

    initCanvas() {
        this.ctx = this.canvas.getContext('2d');
        this.pixelRatio = window.devicePixelRatio || 1;
        this.resizeCanvas();
    }

    initConfig() {
        this.config = {
            particleCount:       this.calculateParticleCount(),
            particleColor:       'rgba(124, 58, 237, 0.8)',
            lineColor:           'rgba(6, 182, 212, 0.4)',
            particleRadius:      2,
            lineWidth:           1,
            mouseRadius:         150,
            particleSpeed:       0.4,
            particleOpacityBase: 0.85,
            lineOpacityBase:     0.5,
            defaultLineDistance: 90
        };
    }

    calculateParticleCount() {
        const w = window.innerWidth;
        if (w > 1279) return 120;
        if (w > 600)  return 80;
        if (w > 359)  return 40;
        return 25;
    }

    initParticles() {
        const w = this.canvas.width  / this.pixelRatio;
        const h = this.canvas.height / this.pixelRatio;
        this.particles = Array.from({ length: this.config.particleCount }, () => ({
            x:      Math.random() * w,
            y:      Math.random() * h,
            vx:     (Math.random() - 0.5) * this.config.particleSpeed,
            vy:     (Math.random() - 0.5) * this.config.particleSpeed,
            radius: Math.random() * this.config.particleRadius + 1
        }));
    }

    // Mouse listeners — called exactly once in constructor
    initMouseListeners() {
        this.mouse = {
            x:      this.canvas.width  / (2 * this.pixelRatio),
            y:      this.canvas.height / (2 * this.pixelRatio),
            active: false
        };

        if (window.innerWidth < 600) return;

        this.throttleTimer = null;
        document.addEventListener('mousemove', e => {
            if (this.throttleTimer) return;
            this.throttleTimer = setTimeout(() => {
                const rect = this.canvas.getBoundingClientRect();
                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
                this.mouse.active = true;
                this.throttleTimer = null;
            }, 16); // ~60fps
        });

        document.addEventListener('mouseout', e => {
            if (!e.relatedTarget || e.relatedTarget.nodeName === 'HTML') {
                this.mouse.active = false;
            }
        });
    }

    // Resize listener — called exactly once in constructor
    initResizeListener() {
        this.resizeTimer = null;
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
                this.resizeCanvas();
                this.config.particleCount = this.calculateParticleCount();
                this.initParticles();
                // Do NOT call initMouseListeners or initResizeListener here
            }, 200);
        });
    }

    startAnimation() {
        const animate = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.updateParticles();
            this.drawConnections();
            if (this.mouse.active && window.innerWidth >= 600) {
                this.drawMouseEffects();
            }
            requestAnimationFrame(animate);
        };
        animate();
    }

    updateParticles() {
        const w = this.canvas.width  / this.pixelRatio;
        const h = this.canvas.height / this.pixelRatio;
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;
            this.drawParticle(p);
        });
    }

    drawParticle(p) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const opacity = this.mouse.active && window.innerWidth >= 600
            ? Math.min(this.config.particleOpacityBase,
                this.config.particleOpacityBase * (1 - distance / this.config.mouseRadius))
            : this.config.particleOpacityBase * 0.6;

        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(124, 58, 237, ${Math.max(0.2, opacity)})`;
        this.ctx.fill();
    }

    drawConnections() {
        const maxDist = this.mouse.active && window.innerWidth >= 600
            ? this.config.mouseRadius
            : this.config.defaultLineDistance;

        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < maxDist) {
                    this.drawConnectionLine(p1, p2, dist, maxDist);
                }
            }
        }
    }

    drawConnectionLine(p1, p2, dist, maxDist) {
        let opacity;
        if (this.mouse.active && window.innerWidth >= 600) {
            const md1 = Math.sqrt((p1.x - this.mouse.x) ** 2 + (p1.y - this.mouse.y) ** 2);
            const md2 = Math.sqrt((p2.x - this.mouse.x) ** 2 + (p2.y - this.mouse.y) ** 2);
            if (md1 < this.config.mouseRadius || md2 < this.config.mouseRadius) {
                opacity = this.config.lineOpacityBase * (1 - dist / maxDist);
                this.drawLine(p1, p2, opacity, this.config.lineWidth);
            }
        } else {
            opacity = this.config.lineOpacityBase * 0.3 * (1 - dist / maxDist);
            this.drawLine(p1, p2, opacity, this.config.lineWidth * 0.7);
        }
    }

    drawLine(p1, p2, opacity, width) {
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.strokeStyle = `rgba(6, 182, 212, ${Math.max(0.04, opacity)})`;
        this.ctx.lineWidth = width;
        this.ctx.stroke();
    }

    drawMouseEffects() {
        this.ctx.beginPath();
        this.ctx.arc(this.mouse.x, this.mouse.y, this.config.particleRadius * 2, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(124, 58, 237, 0.9)';
        this.ctx.fill();

        this.particles.forEach(p => {
            const dx = this.mouse.x - p.x;
            const dy = this.mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < this.config.mouseRadius) {
                const opacity = this.config.lineOpacityBase * (1 - dist / this.config.mouseRadius);
                this.drawLine({ x: this.mouse.x, y: this.mouse.y }, p, opacity, this.config.lineWidth);
            }
        });
    }

    // Resize canvas to fill the hero card (parent element)
    resizeCanvas() {
        const parent = this.canvas.parentElement;
        const w = parent ? parent.offsetWidth  : window.innerWidth;
        const h = parent ? parent.offsetHeight : window.innerHeight;

        this.canvas.width  = w * this.pixelRatio;
        this.canvas.height = h * this.pixelRatio;
        this.canvas.style.width  = `${w}px`;
        this.canvas.style.height = `${h}px`;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);
    }
}

export function initCanvasParticles() {
    try {
        new ParticleSystem('.connecting-dots');
    } catch (err) {
        console.error('Particle system error:', err);
    }
}
