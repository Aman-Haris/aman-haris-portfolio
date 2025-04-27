// Import all module functions
import { initCanvasParticles, initTypingEffect, initScrollReveal } from './modules/animations/index.js';
import { initNavigation } from './modules/navigation.js';
import { initSkillsAccordion } from './modules/skills.js';
import { initProjects } from './modules/projects.js';
import { initExperience } from './modules/experience.js';
import { initContactForm } from './modules/contact.js';
import { initThemeToggle } from './modules/theme.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    initCanvasParticles();
    initTypingEffect();
    initScrollReveal();
    
    // Initialize other modules
    initNavigation();
    initSkillsAccordion();
    initProjects();
    initExperience();
    initContactForm();
    initThemeToggle();
});