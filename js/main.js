import { initCanvasParticles } from './modules/animations/index.js';
import { initNavigation }      from './modules/navigation.js';
import { initThemeToggle }     from './modules/theme.js';
import { initBento }           from './modules/bento.js';
import { initAboutTerminal }   from './modules/about-terminal.js';
import { initAskAman }         from './modules/ask-aman.js';

document.addEventListener('DOMContentLoaded', () => {
    initCanvasParticles();
    initNavigation();
    initThemeToggle();
    initBento();
    initAboutTerminal();
    initAskAman();
});
