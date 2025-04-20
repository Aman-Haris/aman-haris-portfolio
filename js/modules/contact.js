class ContactForm {
    constructor() {
      this.contactForm = document.getElementById('contactForm');
      if (!this.contactForm) return;
  
      this.initForm();
    }
  
    initForm() {
      this.contactForm.addEventListener('submit', this.handleSubmit.bind(this));
      
      // Initialize character counter for message field
      const messageField = document.getElementById('message');
      if (messageField) {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.textContent = '0/500';
        messageField.parentNode.appendChild(counter);
        
        messageField.addEventListener('input', () => {
          counter.textContent = `${messageField.value.length}/500`;
        });
      }
    }
  
    handleSubmit(e) {
      e.preventDefault();
      
      const submitBtn = this.contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
      };
  
      if (!this.validateForm(formData)) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        return;
      }
  
      // Simulate form submission (replace with actual AJAX call)
      setTimeout(() => {
        console.log('Form submitted:', formData);
        this.showSuccess('Thank you for your message! I will get back to you soon.');
        this.contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        
        // Reset character counter
        const counter = this.contactForm.querySelector('.char-counter');
        if (counter) counter.textContent = '0/500';
      }, 1500);
    }
  
    validateForm({ name, email, subject, message }) {
      let isValid = true;
      
      // Clear previous errors
      document.querySelectorAll('.error-message').forEach(el => el.remove());
      document.querySelectorAll('.error-field').forEach(el => 
        el.classList.remove('error-field')
      );
  
      if (!name) {
        this.showFieldError('name', 'Please enter your name');
        isValid = false;
      }
      
      if (!email) {
        this.showFieldError('email', 'Please enter your email');
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        this.showFieldError('email', 'Please enter a valid email address');
        isValid = false;
      }
      
      if (!subject) {
        this.showFieldError('subject', 'Please enter a subject');
        isValid = false;
      }
      
      if (!message) {
        this.showFieldError('message', 'Please enter your message');
        isValid = false;
      } else if (message.length > 500) {
        this.showFieldError('message', 'Message must be 500 characters or less');
        isValid = false;
      }
      
      return isValid;
    }
  
    showFieldError(fieldId, message) {
      const field = document.getElementById(fieldId);
      if (!field) return;
      
      field.classList.add('error-field');
      
      const errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      errorElement.textContent = message;
      field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
  
    showError(message) {
      // Remove any existing messages
      document.querySelectorAll('.form-message').forEach(el => el.remove());
      
      const errorElement = document.createElement('div');
      errorElement.className = 'form-message error';
      errorElement.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
      `;
      this.contactForm.prepend(errorElement);
      setTimeout(() => errorElement.remove(), 5000);
    }
  
    showSuccess(message) {
      // Remove any existing messages
      document.querySelectorAll('.form-message').forEach(el => el.remove());
      
      const successElement = document.createElement('div');
      successElement.className = 'form-message success';
      successElement.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
      `;
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