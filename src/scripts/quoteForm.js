// Quote form functionality
class QuoteForm {
  constructor() {
    this.quoteModal = document.getElementById('quote-modal');
    this.quoteButtons = document.querySelectorAll('.get-quote-button');
    this.closeButtons = document.querySelectorAll('.quote-close-button');
    this.overlay = document.querySelector('.quote-modal-overlay');
    this.form = document.querySelector('.quote-form');
    this.isModalOpen = false;

    // Only initialize if the quote modal elements exist
    if (this.quoteModal) {
      this.init();
    }
  }

  init() {
    // Open modal when "Get Quote" is clicked
    if (this.quoteButtons && this.quoteButtons.length > 0) {
      this.quoteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          this.openModal();
        });
      });
    }

    // Close modal when the close button is clicked
    if (this.closeButtons && this.closeButtons.length > 0) {
      this.closeButtons.forEach(button => {
        button.addEventListener('click', () => {
          this.closeModal();
        });
      });
    }

    // Close modal when clicking the overlay
    if (this.overlay) {
      this.overlay.addEventListener('click', () => {
        this.closeModal();
      });
    }

    // Handle form submission
    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmit();
      });

      // Add validation for each input
      const inputs = this.form.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        input.addEventListener('input', () => {
          this.validateInput(input);
        });

        input.addEventListener('blur', () => {
          this.validateInput(input);
        });
      });
    }

    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isModalOpen) {
        this.closeModal();
      }
    });
  }

  openModal() {
    if (this.quoteModal) {
      this.quoteModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
      this.isModalOpen = true;

      // Focus the first input field
      setTimeout(() => {
        const firstInput = this.form.querySelector('input, select, textarea');
        if (firstInput) {
          firstInput.focus();
        }
      }, 400);
    }
  }

  closeModal() {
    if (this.quoteModal) {
      this.quoteModal.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
      this.isModalOpen = false;

      // Reset form after closing
      if (this.form) {
        this.form.reset();

        // Remove validation classes
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
          input.classList.remove('is-valid', 'is-invalid');
        });
      }
    }
  }

  validateInput(input) {
    // Skip validation if input is not required and empty
    if (!input.required && input.value.trim() === '') {
      input.classList.remove('is-valid', 'is-invalid');
      return true;
    }

    let isValid = true;

    // Check if field is empty but required
    if (input.required && input.value.trim() === '') {
      isValid = false;
    }

    // Validate email format
    if (input.type === 'email' && input.value.trim() !== '') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailPattern.test(input.value.trim());
    }

    // Validate phone number
    if (input.type === 'tel' && input.value.trim() !== '') {
      const phonePattern = /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
      isValid = phonePattern.test(input.value.trim());
    }

    // Add validation classes
    if (isValid) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
    } else {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
    }

    return isValid;
  }

  validateForm() {
    const inputs = this.form.querySelectorAll('input, select, textarea');
    let isFormValid = true;

    inputs.forEach(input => {
      const isInputValid = this.validateInput(input);
      if (!isInputValid) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  handleFormSubmit() {
    if (!this.validateForm()) {
      // Show validation error message
      const errorMessage = document.createElement('div');
      errorMessage.classList.add('form-error');
      errorMessage.textContent = 'Please correct the errors in the form.';

      // Remove previous error message if exists
      const existingError = this.form.querySelector('.form-error');
      if (existingError) {
        this.form.removeChild(existingError);
      }

      this.form.appendChild(errorMessage);
      return;
    }

    // Collect form data
    const formData = new FormData(this.form);
    const formValues = Object.fromEntries(formData.entries());

    // In a real project, you would send this data to a server
    console.log('Form submitted:', formValues);

    // Show success message
    const successMessage = document.createElement('div');
    successMessage.classList.add('form-success');
    successMessage.textContent = 'Thank you for your request! We will get back to you soon.';

    // Replace form with success message
    this.form.innerHTML = '';
    this.form.appendChild(successMessage);

    // Close modal after a delay
    setTimeout(() => {
      this.closeModal();
    }, 3000);
  }
}

// Initialize quote form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new QuoteForm();
});

export default QuoteForm;
