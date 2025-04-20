class ContactForm {
    constructor() {
      this.contactForm = document.getElementById('contactForm');
      if (!this.contactForm) return;
  
      this.initForm();
    }
  
    initForm() {
      // Character counter
      const messageField = document.getElementById('message');
      if (messageField) {
        const counter = document.querySelector('.char-counter');
        messageField.addEventListener('input', () => {
          counter.textContent = `${messageField.value.length}/500`;
        });
      }
  
      // Form submission
      this.contactForm.addEventListener('submit', this.handleSubmit.bind(this));
    }
  
    handleSubmit(e) {
      e.preventDefault();
      
      const submitBtn = this.contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Show loading state
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
  
      // Create FormData object
      const formData = new FormData(this.contactForm);
  
      // Submit to Formspree
      fetch(this.contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          this.showSuccess('Message sent successfully!');
          this.contactForm.reset();
          document.querySelector('.char-counter').textContent = '0/500';
        } else {
          throw new Error('Failed to send message');
        }
      })
      .catch(error => {
        this.showError(error.message || 'Failed to send message. Please try again.');
      })
      .finally(() => {
        // Reset button
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      });
    }
  
    showError(message) {
      const errorElement = document.createElement('div');
      errorElement.className = 'form-message error';
      errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
      this.contactForm.prepend(errorElement);
      setTimeout(() => errorElement.remove(), 5000);
    }
  
    showSuccess(message) {
      const successElement = document.createElement('div');
      successElement.className = 'form-message success';
      successElement.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
      this.contactForm.prepend(successElement);
      setTimeout(() => successElement.remove(), 5000);
    }
  }
  
  export function initContactForm() {
    try {
      new ContactForm();
    } catch (error) {
      console.error('Contact form error:', error);
    }
  }