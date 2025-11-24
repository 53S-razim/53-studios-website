/**
 * Contact Form script for 53Studios website
 * Handles form validation and submission
 */

export class ContactForm {
  constructor() {
    this.form = document.getElementById('contactForm');
    this.successMessage = document.querySelector('.form-success-message');
    this.inputs = this.form.querySelectorAll('input, textarea');
    this.submitButton = this.form.querySelector('button[type="submit"]');
    
    this.initEventListeners();
  }

  initEventListeners() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    this.inputs.forEach(input => {
      input.addEventListener('input', () => this.validateInput(input));
      input.addEventListener('blur', () => this.validateInput(input));
    });
  }

  validateInput(input) {
    const isValid = input.checkValidity();
    input.classList.toggle('error', !isValid);
    return isValid;
  }

  validateForm() {
    let isValid = true;
    this.inputs.forEach(input => {
      if (!this.validateInput(input)) {
        isValid = false;
      }
    });
    return isValid;
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (!this.validateForm()) {
      return;
    }

    this.submitButton.disabled = true;
    this.submitButton.textContent = 'Sending...';

    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData.entries());

    try {
      // Here you would typically send the data to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));

      this.showSuccessMessage();
      this.form.reset();
      this.inputs.forEach(input => input.classList.remove('error'));
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      this.submitButton.disabled = false;
      this.submitButton.textContent = 'Send Message';
    }
  }

  showSuccessMessage() {
    this.successMessage.style.display = 'block';
    this.successMessage.classList.add('fade-in');
    
    setTimeout(() => {
      this.successMessage.style.display = 'none';
      this.successMessage.classList.remove('fade-in');
    }, 5000);
  }
} 