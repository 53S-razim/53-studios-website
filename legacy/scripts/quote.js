/**
 * Quote form functionality
 * Handles quote form validation and submission
 */

document.addEventListener('DOMContentLoaded', () => {
  initQuoteForm();
});

function initQuoteForm() {
  const quoteForm = document.getElementById('quote-form');
  
  if (!quoteForm) return;
  
  // Form validation
  quoteForm.addEventListener('submit', (e) => {
    // Prevent default form submission
    e.preventDefault();
    
    // Validate form
    if (validateForm(quoteForm)) {
      // Show success message
      submitForm(quoteForm);
    }
  });
  
  // Input validation on blur
  const formInputs = quoteForm.querySelectorAll('input, select, textarea');
  formInputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateInput(input);
    });
    
    // Clear error on focus
    input.addEventListener('focus', () => {
      const errorElement = input.parentElement.querySelector('.error-message');
      if (errorElement) {
        errorElement.remove();
      }
      input.classList.remove('error');
    });
  });
}

// Validate the entire form
function validateForm(form) {
  let isValid = true;
  
  // Check all required fields
  const requiredFields = form.querySelectorAll('[required]');
  requiredFields.forEach(field => {
    if (!validateInput(field)) {
      isValid = false;
    }
  });
  
  return isValid;
}

// Validate a single input field
function validateInput(input) {
  let isValid = true;
  let errorMessage = '';
  
  // Remove existing error messages
  const existingError = input.parentElement.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  // Check if empty
  if (input.hasAttribute('required') && !input.value.trim()) {
    isValid = false;
    errorMessage = 'This field is required';
  } 
  // Email validation
  else if (input.type === 'email' && input.value.trim()) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(input.value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    }
  }
  
  // Show error message if invalid
  if (!isValid) {
    input.classList.add('error');
    
    // Create and append error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = errorMessage;
    input.parentElement.appendChild(errorElement);
  } else {
    input.classList.remove('error');
  }
  
  return isValid;
}

// Submit form handling
function submitForm(form) {
  // In a real application, this would send the data to a server
  // Here we just show a success message and reset the form
  
  // Get quote modal
  const quoteModal = document.getElementById('quote-modal');
  
  // Create success message
  const successMessage = document.createElement('div');
  successMessage.className = 'success-message';
  successMessage.innerHTML = `
    <h3>Thank You!</h3>
    <p>Your quote request has been submitted successfully. Our team will contact you shortly.</p>
  `;
  
  // Replace form with success message
  form.parentElement.appendChild(successMessage);
  form.style.display = 'none';
  
  // Reset and hide form after delay
  setTimeout(() => {
    // Reset form
    form.reset();
    
    // Close modal after 3 seconds
    setTimeout(() => {
      if (quoteModal) {
        quoteModal.classList.remove('active');
        
        // Only remove body no-scroll if menu isn't active
        const menuOverlay = document.getElementById('menu-overlay');
        if (!menuOverlay || !menuOverlay.classList.contains('active')) {
          document.body.classList.remove('no-scroll');
        }
        
        // Remove success message and show form again
        setTimeout(() => {
          successMessage.remove();
          form.style.display = 'block';
        }, 500);
      }
    }, 3000);
  }, 500);
} 