/**
 * particles.js
 * Neural-network canvas visualization for the About bento card —
 * layered nodes with edges between adjacent layers, and periodic
 * "signal" pulses traveling through the network to simulate inference.
 *
 * Canvas has pointer-events: none (see bento.css), so no mouse interactivity.
 */

const LAYER_COLORS = [
    'rgba(6, 182, 212, 0.9)',   // input layer — cyan
    'rgba(124, 58, 237, 0.9)',  // hidden layers — violet
    'rgba(124, 58, 237, 0.9)',
    'rgba(245, 158, 11, 0.9)',  // output layer — amber
];

class NeuralNetSystem {
    constructor(canvasSelector) {
        this.canvas = document.querySelector(canvasSelector);
        if (!this.canvas) return;

        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.paused = document.hidden;
        this.frameId = null;
        this.spawnIntervalId = null;
        this.pulses = [];

        this.initCanvas();
        this.initLayout();
        this.initResizeListener();
        this.initVisibilityListener();

        if (this.reducedMotion) {
            this.drawFrame(); // single static frame, no pulses, no spawn loop
        } else {
            this.startSpawning();
            this.startAnimation();
        }
    }

    initCanvas() {
        this.ctx = this.canvas.getContext('2d');
        this.pixelRatio = window.devicePixelRatio || 1;
        this.resizeCanvas();
    }

    layerSizesForWidth() {
        const w = window.innerWidth;
        if (w > 1279) return [4, 6, 6, 3];
        if (w > 600)  return [3, 5, 5, 2];
        return [3, 4, 2];
    }

    // Build node grid (layers x positions) and adjacent-layer edges.
    initLayout() {
        const w = this.canvas.width  / this.pixelRatio;
        const h = this.canvas.height / this.pixelRatio;
        const layerSizes = this.layerSizesForWidth();
        const padX = w * 0.12;
        const padY = h * 0.15;

        this.nodes = [];
        layerSizes.forEach((count, layerIndex) => {
            const x = layerSizes.length === 1
                ? w / 2
                : padX + (layerIndex / (layerSizes.length - 1)) * (w - padX * 2);
            for (let i = 0; i < count; i++) {
                const y = count === 1
                    ? h / 2
                    : padY + (i / (count - 1)) * (h - padY * 2);
                this.nodes.push({
                    x,
                    y: y + (Math.random() - 0.5) * 6,
                    layer: layerIndex,
                    color: LAYER_COLORS[layerIndex % LAYER_COLORS.length],
                    lastPulseTime: 0,
                });
            }
        });

        this.edges = [];
        for (let l = 0; l < layerSizes.length - 1; l++) {
            const fromNodes = this.nodes.filter(n => n.layer === l);
            const toNodes   = this.nodes.filter(n => n.layer === l + 1);
            fromNodes.forEach(a => {
                toNodes.forEach(b => this.edges.push({ a, b }));
            });
        }

        this.pulses = [];
    }

    // Resize listener — called exactly once in constructor
    initResizeListener() {
        this.resizeTimer = null;
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
                this.resizeCanvas();
                this.initLayout();
                if (this.reducedMotion) this.drawFrame();
            }, 200);
        });
    }

    // Visibility listener — called exactly once in constructor
    initVisibilityListener() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.paused = true;
                if (this.frameId) cancelAnimationFrame(this.frameId);
                if (this.spawnIntervalId) clearInterval(this.spawnIntervalId);
            } else if (!this.reducedMotion) {
                this.paused = false;
                this.startSpawning();
                this.startAnimation();
            }
        });
    }

    startSpawning() {
        if (this.spawnIntervalId) clearInterval(this.spawnIntervalId);
        this.spawnIntervalId = setInterval(() => this.spawnPulses(), 700);
    }

    spawnPulses() {
        if (!this.edges.length) return;
        const count = 1 + Math.floor(Math.random() * 2);
        for (let i = 0; i < count; i++) {
            const edge = this.edges[Math.floor(Math.random() * this.edges.length)];
            this.pulses.push({ edge, progress: 0, speed: 0.015 + Math.random() * 0.01 });
        }
    }

    startAnimation() {
        const animate = () => {
            if (this.paused) return;
            this.drawFrame();
            this.updatePulses();
            this.frameId = requestAnimationFrame(animate);
        };
        animate();
    }

    updatePulses() {
        const now = performance.now();
        this.pulses = this.pulses.filter(p => {
            p.progress += p.speed;
            if (p.progress >= 1) {
                p.edge.b.lastPulseTime = now;
                return false;
            }
            return true;
        });
    }

    drawFrame() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawEdges();
        this.drawPulses();
        this.drawNodes();
    }

    drawEdges() {
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'rgba(124, 58, 237, 0.15)';
        this.edges.forEach(({ a, b }) => {
            this.ctx.beginPath();
            this.ctx.moveTo(a.x, a.y);
            this.ctx.lineTo(b.x, b.y);
            this.ctx.stroke();
        });
    }

    drawPulses() {
        this.pulses.forEach(({ edge, progress }) => {
            const x = edge.a.x + (edge.b.x - edge.a.x) * progress;
            const y = edge.a.y + (edge.b.y - edge.a.y) * progress;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 2.5, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(245, 158, 11, 0.95)';
            this.ctx.fill();
        });
    }

    drawNodes() {
        const now = performance.now();
        this.nodes.forEach(node => {
            const sinceGlow = now - node.lastPulseTime;
            const glow = sinceGlow < 400 ? 1 - sinceGlow / 400 : 0;
            const radius = 3 + glow * 2.5;

            if (glow > 0) {
                this.ctx.beginPath();
                this.ctx.arc(node.x, node.y, radius + 4, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(245, 158, 11, ${glow * 0.35})`;
                this.ctx.fill();
            }

            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
            this.ctx.fillStyle = node.color;
            this.ctx.fill();
        });
    }

    // Resize canvas to fill the About card (parent element)
    resizeCanvas() {
        const parent = this.canvas.parentElement;
        const w = parent ? parent.offsetWidth  : window.innerWidth;
        const h = parent ? parent.offsetHeight : window.innerHeight;

        this.canvas.width  = w * this.pixelRatio;
        this.canvas.height = h * this.pixelRatio;
        this.canvas.style.width  = `${w}px`;
        this.canvas.style.height = `${h}px`;
        this.ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
    }
}

export function initCanvasParticles() {
    try {
        new NeuralNetSystem('.connecting-dots');
    } catch (err) {
        console.error('Neural net visualization error:', err);
    }
}
