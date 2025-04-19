class ContactForm {
    constructor() {
        this.contactForm = document.getElementById('contactForm');
        if (!this.contactForm) return;

        this.initForm();
    }

    initForm() {
        this.contactForm.addEventListener('submit', this.handleSubmit.bind(this));
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        if (!this.validateForm(formData)) return;

        // Here you would typically send the form data to a server
        console.log('Form submitted:', formData);
        this.showSuccess('Thank you for your message! I will get back to you soon.');
        this.contactForm.reset();
    }

    validateForm({ name, email, subject, message }) {
        if (!name || !email || !subject || !message) {
            this.showError('Please fill in all fields');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showError('Please enter a valid email address');
            return false;
        }

        return true;
    }

    showError(message) {
        // Replace with your preferred error display method
        alert(message);
    }

    showSuccess(message) {
        // Replace with your preferred success display method
        alert(message);
    }
}

export function initContactForm() {
    try {
        new ContactForm();
    } catch (error) {
        console.error('Contact form error:', error);
    }
}