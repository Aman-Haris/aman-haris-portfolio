import { initCanvasParticles } from './modules/animations/index.js';
import { initNavigation }      from './modules/navigation.js';
import { initThemeToggle }     from './modules/theme.js';
import { initBento }           from './modules/bento.js';

document.addEventListener('DOMContentLoaded', () => {
    initCanvasParticles();
    initNavigation();
    initThemeToggle();
    initBento();
});
