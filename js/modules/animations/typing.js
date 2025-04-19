class TypingEffect {
    constructor() {
        this.titleElement = document.querySelector('.title');
        if (!this.titleElement) return;

        this.originalText = this.titleElement.textContent.trim();
        this.init();
    }

    init() {
        this.titleElement.innerHTML = '';
        
        const typingContainer = document.createElement('div');
        typingContainer.className = 'typing-container';
        
        this.textElement = document.createElement('span');
        this.textElement.className = 'typed-text';
        
        const cursorElement = document.createElement('span');
        cursorElement.className = 'cursor blinking';
        
        typingContainer.appendChild(this.textElement);
        typingContainer.appendChild(cursorElement);
        this.titleElement.appendChild(typingContainer);
        
        this.startTyping();
    }

    startTyping() {
        let charIndex = 0;
        const typingDelay = 100; // milliseconds between characters
        
        const typeText = () => {
            if (charIndex < this.originalText.length) {
                this.textElement.textContent += this.originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, typingDelay);
            } else {
                this.startBlinkingCursor();
            }
        };
        
        // Start after a short delay
        setTimeout(typeText, 800);
    }

    startBlinkingCursor() {
        const cursor = this.titleElement.querySelector('.cursor');
        if (cursor) {
            setInterval(() => {
                cursor.classList.toggle('blinking');
            }, 500);
        }
    }
}

export function initTypingEffect() {
    try {
        new TypingEffect();
    } catch (error) {
        console.error('Typing effect error:', error);
    }
}