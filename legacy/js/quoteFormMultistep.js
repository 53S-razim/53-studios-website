class QuoteFormMultistep {
  constructor() {
    this.selectedService = null;
    this.selectedBudget = null;
    this.selectedTimeline = null;
    this.selectedFeatures = [];
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Service selection
    document.querySelectorAll('.option-card[data-value]').forEach(card => {
      card.addEventListener('click', () => {
        this.selectedService = card.dataset.value;
        document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      });
    });

    // Form submission
    const submitButton = document.getElementById('step-4-submit');
    if (submitButton) {
      submitButton.addEventListener('click', () => this.submitForm());
    }
  }

  async submitForm() {
    const form = document.getElementById('quoteForm');
    if (!form) return;

    try {
      // Get form data
      const formData = {
        name: form.querySelector('#name').value,
        email: form.querySelector('#email').value,
        phone: form.querySelector('#phone').value,
        projectDetails: form.querySelector('#projectDetails')?.value || '',
        projectType: this.selectedService || 'Not specified',
        budget: this.selectedBudget || 'Not specified',
        timeline: this.selectedTimeline || 'Not specified',
        selectedFeatures: this.selectedFeatures || []
      };

      // Validate required fields
      if (!formData.name || !formData.email || !formData.phone) {
        throw new Error('Please fill in all required fields');
      }

      // Show loading state
      const submitBtn = form.querySelector('.submit-btn');
      const buttonText = submitBtn.querySelector('.button-text');
      const loadingSpinner = submitBtn.querySelector('.loading-spinner');
      
      buttonText.style.display = 'none';
      loadingSpinner.style.display = 'inline';
      submitBtn.disabled = true;

      console.log('Submitting quote form with data:', formData);

      // Use the global submitQuoteForm function
      const result = await window.submitQuoteForm(formData);

      if (result.success) {
        this.showSuccess();
        form.reset();
      } else {
        throw new Error(result.error || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again later.');
    } finally {
      // Reset button state
      const submitBtn = form.querySelector('.submit-btn');
      const buttonText = submitBtn.querySelector('.button-text');
      const loadingSpinner = submitBtn.querySelector('.loading-spinner');
      
      buttonText.style.display = 'inline';
      loadingSpinner.style.display = 'none';
      submitBtn.disabled = false;
    }
  }

  showSuccess() {
    const quoteContent = document.querySelector('.quote-content');
    if (quoteContent) {
      // Clear existing content
      quoteContent.innerHTML = '';
      
      // Create success message container
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.innerHTML = `
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <h2>Thank You!</h2>
        <p>Your quote request has been submitted successfully.</p>
        <p>We'll get back to you shortly with more details.</p>
        <button class="button button-primary" id="success-close">Close</button>
      `;
      
      // Add success message to the quote content
      quoteContent.appendChild(successMessage);
      
      // Add event listener to close button
      const closeButton = successMessage.querySelector('#success-close');
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          const modal = document.getElementById('quote-modal');
          if (modal) {
            modal.style.display = 'none';
            // Reset the form
            const form = document.getElementById('quoteForm');
            if (form) {
              form.reset();
            }
            // Reset the form state
            this.selectedService = null;
            this.selectedBudget = null;
            this.selectedTimeline = null;
            this.selectedFeatures = [];
            // Show the first step again
            this.showStep(1);
          }
        });
      }
    }
  }
}

// Initialize the form
document.addEventListener('DOMContentLoaded', () => {
  const quoteForm = new QuoteFormMultistep();
  quoteForm.init();
}); 