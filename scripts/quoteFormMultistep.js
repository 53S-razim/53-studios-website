/**
 * Premium Multi-step Quote Form for 53Studios
 * Full-screen modal with dynamic backgrounds based on user selections
 */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPH_T4qhXrMsAINfbKsC_aqTpJVtOmYUc",
  authDomain: "test53s.firebaseapp.com",
  projectId: "test53s",
  storageBucket: "test53s.firebasestorage.app",
  messagingSenderId: "672164580616",
  appId: "1:672164580616:web:3f5351bd759178b50d70bd",
  measurementId: "G-WK0Q228HC9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export class QuoteFormMultistep {
  constructor() {
    // Initialize properties
    this.quoteModal = document.getElementById('quote-modal');
    this.quoteContent = this.quoteModal ? this.quoteModal.querySelector('.quote-content') : null;
    this.currentStep = 1;
    this.totalSteps = 6;
    this.projectType = '';
    this.selectedFeatures = [];
    this.formData = {};

    // Step data
    this.steps = {
      1: {
        title: 'What type of project are you interested in?',
        options: [
          { type: 'residential', title: 'Residential', description: 'Custom homes and renovations' },
          { type: 'commercial', title: 'Commercial', description: 'Retail and business spaces' },
          { type: 'office', title: 'Office', description: 'Corporate and workspace design' },
          { type: 'hospitality', title: 'Hospitality', description: 'Hotels and restaurants' }
        ],
        columns: 4
      },
      2: {
        title: 'What features are you looking for?',
        options: [
          { type: 'sustainable', title: 'Sustainable Design', description: 'Eco-friendly materials and energy efficiency' },
          { type: 'smart', title: 'Smart Home', description: 'Integrated technology and automation' },
          { type: 'luxury', title: 'Luxury Finishes', description: 'High-end materials and custom details' },
          { type: 'minimalist', title: 'Minimalist Style', description: 'Clean lines and simple aesthetics' },
          { type: 'traditional', title: 'Traditional Style', description: 'Classic architectural elements' },
          { type: 'modern', title: 'Modern Style', description: 'Contemporary design elements' },
          { type: 'renovation', title: 'Renovation', description: 'Space transformation and updates' },
          { type: 'custom', title: 'Custom Features', description: 'Unique and personalized elements' }
        ],
        columns: 4,
        multiple: true
      },
      3: {
        title: 'What is your estimated budget range?',
        options: [
          { type: 'budget1', title: '₹5-10Lakhs', description: 'Basic to moderate project scope' },
          { type: 'budget2', title: '₹10-25Lakhs', description: 'Moderate to substantial project scope' },
          { type: 'budget3', title: '₹25-50Lakhs', description: 'Substantial to high-end project scope' },
          { type: 'budget4', title: 'Over ₹50Lakhs', description: 'Premium and luxury project scope' }
        ],
        columns: 2
      },
      4: {
        title: 'What is your preferred timeline?',
        options: [
          { type: 'timeline1', title: 'ASAP', description: 'Ready to start immediately' },
          { type: 'timeline2', title: '1-3 months', description: 'Planning to start soon' },
          { type: 'timeline3', title: '3-6 months', description: 'Planning for the near future' },
          { type: 'timeline4', title: '6+ months', description: 'Long-term planning' }
        ],
        columns: 2
      },
      5: {
        title: 'Tell us about your project',
        type: 'form',
        fields: [
          { name: 'name', type: 'text', label: 'Full Name', required: true },
          { name: 'email', type: 'email', label: 'Email Address', required: true },
          { name: 'phone', type: 'tel', label: 'Phone Number', required: true },
          { name: 'message', type: 'textarea', label: 'Project Details (Example: apprx. Sqft of your project)', required: true }
        ]
      },
      6: {
        title: 'Review your selections',
        type: 'review'
      }
    };

    // Background images for different project types
    this.backgroundImages = {
      residential: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      commercial: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
      office: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2148&q=80',
      hospitality: 'https://images.unsplash.com/photo-1618219740975-d40978bb7378?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80'
    };

    // Initialize event listeners
    this.initEventListeners();
  }

  initEventListeners() {
    if (!this.quoteModal) {
      console.error('Quote modal not found');
      return;
    }

    // Initialize quote buttons
    const quoteButtons = document.querySelectorAll('[data-action="open-quote"]');
    quoteButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.openModal();
      });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.quoteModal.classList.contains('active')) {
        e.preventDefault();
        this.closeModal();
      }
    });

    // Add close button event listener
    const closeButton = this.quoteModal.querySelector('.quote-close-button');
    if (closeButton) {
      closeButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.closeModal();
      });
    }

    // Add overlay click event listener
    const overlay = this.quoteModal.querySelector('.quote-modal-overlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.closeModal();
      });
    }
  }

  openModal() {
    if (!this.quoteModal || !this.quoteContent) {
      console.error('Quote modal or content not found');
      return;
    }

    // Show modal
    this.quoteModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Add active class
    requestAnimationFrame(() => {
      this.quoteModal.classList.add('active');
      
      // Render first step
    this.renderStep(1);
    });
  }

  closeModal() {
    if (!this.quoteModal) return;

    // Remove active class
    this.quoteModal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Hide modal after transition
    setTimeout(() => {
      this.quoteModal.style.display = 'none';
      this.resetForm();
    }, 300);
  }

  resetForm() {
    this.currentStep = 1;
    this.projectType = '';
    this.selectedFeatures = [];
    this.formData = {};
    if (this.quoteContent) {
      this.quoteContent.innerHTML = '';
    }
  }

  renderStep(step) {
    if (!this.quoteContent) return;

    // Clear previous content
    this.quoteContent.innerHTML = '';

    // Reset selections for the current step
    if (step === 1) {
      this.projectType = '';
    } else if (step === 2) {
      this.selectedFeatures = [];
    } else if (step === 3) {
      this.budget = '';
    } else if (step === 4) {
      this.timeline = '';
    } else if (step === 5) {
      this.formData = {};
    }

    // Create step content
    const stepContent = document.createElement('div');
    stepContent.className = 'step-content';

    // Add step indicator
    const stepIndicator = document.createElement('div');
    stepIndicator.className = 'step-indicator';
    stepIndicator.innerHTML = `
      <div class="step-progress">
        <div class="progress-bar" style="width: ${(step / this.totalSteps) * 100}%"></div>
      </div>
      <div class="step-text">Step ${step} of ${this.totalSteps}</div>
    `;
    stepContent.appendChild(stepIndicator);

    // Get current step data
    const stepData = this.steps[step];
    if (!stepData) return;

    // Add step title
    const title = document.createElement('h2');
    title.textContent = stepData.title;
    stepContent.appendChild(title);

    // Render step content based on type
    if (stepData.type === 'form') {
      this.renderFormStep(stepContent, stepData);
    } else if (stepData.type === 'review') {
      this.renderReviewStep(stepContent);
    } else {
      this.renderOptionsStep(stepContent, stepData);
    }

    // Add navigation buttons
    this.renderNavigationButtons(stepContent, step);

    this.quoteContent.appendChild(stepContent);
    this.initStepEventListeners(step);
  }

  renderOptionsStep(container, stepData) {
    const optionsContainer = document.createElement('div');
    optionsContainer.className = `option-cards step-${this.currentStep}`;
    
    // Set grid columns based on screen width
    const isMobile = window.innerWidth <= 480;
    if (isMobile) {
      if (this.currentStep === 1) {
        optionsContainer.style.gridTemplateColumns = '1fr';
        optionsContainer.style.gap = '0.75rem';
      } else if (this.currentStep === 2) {
        optionsContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
        optionsContainer.style.gap = '0.75rem';
      }
    } else {
      optionsContainer.style.gridTemplateColumns = `repeat(${stepData.columns}, 1fr)`;
    }

    stepData.options.forEach(option => {
      const optionCard = document.createElement('div');
      optionCard.className = 'option-card';
      optionCard.dataset.type = option.type;
      
      // Check if this option is already selected
      if (this.currentStep === 1 && this.projectType === option.type) {
        optionCard.classList.add('selected');
      } else if (this.currentStep === 2 && this.selectedFeatures.includes(option.type)) {
        optionCard.classList.add('selected');
      } else if (this.currentStep === 3 && this.budget === option.type) {
        optionCard.classList.add('selected');
      } else if (this.currentStep === 4 && this.timeline === option.type) {
        optionCard.classList.add('selected');
      }

      const title = document.createElement('h3');
      title.textContent = option.title;
      optionCard.appendChild(title);

      if (!isMobile) {
        const description = document.createElement('p');
        description.textContent = option.description;
        optionCard.appendChild(description);
      }

      optionsContainer.appendChild(optionCard);
    });

    container.appendChild(optionsContainer);
  }

  renderFormStep(container, stepData) {
    const form = document.createElement('form');
    form.className = 'quote-form';

    stepData.fields.forEach(field => {
      const formGroup = document.createElement('div');
      formGroup.className = 'form-group';

      const label = document.createElement('label');
      label.htmlFor = field.name;
      label.textContent = field.label;
      if (field.required) {
        label.innerHTML += ' <span class="required">*</span>';
      }

      let input;
      if (field.type === 'textarea') {
        input = document.createElement('textarea');
        input.rows = 4;
      } else {
        input = document.createElement('input');
        input.type = field.type;
      }

      input.id = field.name;
      input.name = field.name;
      input.required = field.required;
      input.value = this.formData[field.name] || '';

      formGroup.appendChild(label);
      formGroup.appendChild(input);
      form.appendChild(formGroup);
    });

    container.appendChild(form);
  }

  renderReviewStep(container) {
    const reviewContent = document.createElement('div');
    reviewContent.className = 'review-content';

    const reviewList = document.createElement('ul');
    reviewList.className = 'review-list';

    // Add project type
    const projectType = document.createElement('li');
    projectType.innerHTML = `<strong>Project Type:</strong> ${this.projectType}`;
    reviewList.appendChild(projectType);

    // Add selected features
    if (this.selectedFeatures.length > 0) {
      const features = document.createElement('li');
      features.innerHTML = `<strong>Features:</strong> ${this.selectedFeatures.join(', ')}`;
      reviewList.appendChild(features);
    }

    // Add form data
    Object.entries(this.formData).forEach(([key, value]) => {
      if (value) {
        const item = document.createElement('li');
        item.innerHTML = `<strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}`;
        reviewList.appendChild(item);
      }
    });

    reviewContent.appendChild(reviewList);
    container.appendChild(reviewContent);
  }

  renderNavigationButtons(container, step) {
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'step-buttons';

    // Back button
    if (step > 1) {
      const backButton = document.createElement('button');
      backButton.className = 'button button-secondary';
      backButton.textContent = 'Back';
      backButton.addEventListener('click', () => {
        // Reset selections for the current step
        if (step === 2) {
          this.selectedFeatures = [];
        } else if (step === 3) {
          this.budget = '';
        } else if (step === 4) {
          this.timeline = '';
        } else if (step === 5) {
          this.formData = {};
        }
        
        this.currentStep--;
        this.renderStep(this.currentStep);
      });
      buttonContainer.appendChild(backButton);
    } else {
      // Add empty div to maintain space
      const emptyDiv = document.createElement('div');
      buttonContainer.appendChild(emptyDiv);
    }

    // Next/Submit button
    const nextButton = document.createElement('button');
    nextButton.className = 'button button-primary';
    nextButton.textContent = step === this.totalSteps ? 'Submit' : 'Next';
    nextButton.style.color = '#fff';
    nextButton.style.opacity = '1';
    nextButton.style.cursor = 'pointer';
    nextButton.addEventListener('click', () => {
      if (step === this.totalSteps) {
        this.submitForm();
      } else {
        // Validate form fields if current step is a form
        if (this.steps[step].type === 'form') {
          const form = this.quoteContent.querySelector('form');
          if (form) {
            const formData = new FormData(form);
            let isValid = true;
            let errorMessage = '';
            
            for (const field of this.steps[step].fields) {
              if (field.required) {
                const value = formData.get(field.name);
                const input = form.querySelector(`[name="${field.name}"]`);
                
                if (!value || value.trim() === '') {
                  isValid = false;
                  input.classList.add('error');
                  input.setAttribute('aria-invalid', 'true');
                  errorMessage = 'Please fill in all required fields';
                } else {
                  // Email validation
                  if (field.name === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                      isValid = false;
                      input.classList.add('error');
                      input.setAttribute('aria-invalid', 'true');
                      errorMessage = 'Please enter a valid email address';
                    }
                  }
                  
                  // Phone number validation
                  if (field.name === 'phone') {
                    const phoneRegex = /^\d{10,}$/;
                    if (!phoneRegex.test(value.replace(/\D/g, ''))) {
                      isValid = false;
                      input.classList.add('error');
                      input.setAttribute('aria-invalid', 'true');
                      errorMessage = 'Please enter a valid phone number (at least 10 digits)';
                    }
                  }
                  
                  if (isValid) {
                    input.classList.remove('error');
                    input.removeAttribute('aria-invalid');
                  }
                }
              }
            }

            if (!isValid) {
              // Show error message
              const errorDiv = document.createElement('div');
              errorDiv.className = 'form-error';
              errorDiv.textContent = errorMessage;
              if (!form.querySelector('.form-error')) {
                form.insertBefore(errorDiv, form.firstChild);
              } else {
                form.querySelector('.form-error').textContent = errorMessage;
              }
              return;
            }

            // If all fields are valid, proceed
            for (const [key, value] of formData.entries()) {
              this.formData[key] = value;
            }
          }
        }
        
        // Only increment step by 1
        this.currentStep = step + 1;
        this.renderStep(this.currentStep);
      }
    });
    buttonContainer.appendChild(nextButton);

    container.appendChild(buttonContainer);
  }

  initStepEventListeners(step) {
    const stepData = this.steps[step];
    if (!stepData) return;

    if (stepData.type === 'form') {
      const form = this.quoteContent.querySelector('form');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          
          // Validate all required fields
          const formData = new FormData(form);
          let isValid = true;
          
          for (const field of stepData.fields) {
            if (field.required) {
              const value = formData.get(field.name);
              if (!value || value.trim() === '') {
                isValid = false;
                const input = form.querySelector(`[name="${field.name}"]`);
                input.classList.add('error');
                input.setAttribute('aria-invalid', 'true');
              } else {
                const input = form.querySelector(`[name="${field.name}"]`);
                input.classList.remove('error');
                input.removeAttribute('aria-invalid');
              }
            }
          }

          if (!isValid) {
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'form-error';
            errorMessage.textContent = 'Please fill in all required fields';
            if (!form.querySelector('.form-error')) {
              form.insertBefore(errorMessage, form.firstChild);
            }
            return;
          }

          // If all fields are valid, proceed
          for (const [key, value] of formData.entries()) {
            this.formData[key] = value;
          }
          this.currentStep = step + 1;
          this.renderStep(this.currentStep);
        });
      }
    } else if (stepData.type === 'review') {
      // For review step, ensure the submit button is clickable
      const submitButton = this.quoteContent.querySelector('.button-primary');
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
        submitButton.style.cursor = 'pointer';
      }
    } else {
      const optionCards = this.quoteContent.querySelectorAll('.option-card');
      const nextButton = this.quoteContent.querySelector('.button-primary');
      
      // Disable next button initially
      if (nextButton) {
        nextButton.disabled = true;
        nextButton.style.opacity = '0.5';
      }

      optionCards.forEach(card => {
        card.addEventListener('click', () => {
          // For single selection steps (1, 3, 4), remove selected class from all cards
          if (step !== 2) {
            optionCards.forEach(c => c.classList.remove('selected'));
          }
          
          // Add selected class to clicked card
          card.classList.add('selected');
          
          // Enable next button
          if (nextButton) {
            nextButton.disabled = false;
            nextButton.style.opacity = '1';
          }

          // Store selection
          if (step === 1) {
            this.projectType = card.dataset.type;
          } else if (step === 2) {
            const type = card.dataset.type;
            if (this.selectedFeatures.includes(type)) {
              this.selectedFeatures = this.selectedFeatures.filter(f => f !== type);
              card.classList.remove('selected');
            } else {
              this.selectedFeatures.push(type);
            }
          } else if (step === 3) {
            this.budget = card.dataset.type;
          } else if (step === 4) {
            this.timeline = card.dataset.type;
          }
        });
      });

      // Add click handler for next button
      if (nextButton) {
        nextButton.addEventListener('click', () => {
          // Validate selection before proceeding
          if (step === 1 && !this.projectType) return;
          if (step === 2 && this.selectedFeatures.length === 0) return;
          if (step === 3 && !this.budget) return;
          if (step === 4 && !this.timeline) return;
          
          this.currentStep = step + 1;
          this.renderStep(this.currentStep);
        });
      }
    }
  }

  async submitForm() {
    try {
      // Show loading state briefly
      const submitButton = this.quoteContent.querySelector('.submit-btn');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="loading-spinner">Submitting...</span>';
      }

      // Show success message immediately
      this.quoteContent.innerHTML = `
        <div class="form-error-message">
          <h2>Thank you for your submission!</h2>
          <p>We'll review your project details and get back to you shortly.</p>
          <button class="close-btn" onclick="this.closest('.quote-modal').classList.remove('active')">Close</button>
        </div>
      `;

      // Close modal after a short delay
      setTimeout(() => {
        this.closeModal();
      }, 1000);

      // Prepare and submit form data in the background
      const formData = {
        projectType: this.projectType,
        selectedFeatures: this.selectedFeatures,
        budget: this.budget,
        timeline: this.timeline,
        name: this.formData.name,
        email: this.formData.email,
        phone: this.formData.phone,
        message: this.formData.message
      };

      // Submit to Firebase in the background
      this.submitQuoteForm(formData).catch(error => {
        console.error('Error submitting form to Firebase:', error);
        // Log the error but don't show it to the user since we've already shown success
      });

    } catch (error) {
      console.error('Error in form submission:', error);
      // Show error message
      this.quoteContent.innerHTML = `
        <div class="form-error-message">
          <h2>Error Submitting Form</h2>
          <p>There was an error submitting your form. Please try again later.</p>
          <button class="close-btn" onclick="this.closest('.quote-modal').classList.remove('active')">Close</button>
        </div>
      `;
    }
  }

  async submitQuoteForm(formData) {
    try {
      console.log('Preparing to submit quote form with data:', formData);
      
      // Ensure all required fields are present and not undefined
      const submissionData = {
        name: formData.name || '',
        email: formData.email || '',
        phone: formData.phone || '',
        projectDetails: formData.message || '',
        projectType: formData.projectType || 'Not specified',
        budget: formData.budget || 'Not specified',
        timeline: formData.timeline || 'Not specified',
        selectedFeatures: formData.selectedFeatures || [],
        timestamp: serverTimestamp()
      };

      console.log('Submitting to Firestore with data:', submissionData);
      
      const docRef = await addDoc(collection(db, "quoteSubmissions"), submissionData);
      console.log("Quote form submitted with ID: ", docRef.id);
      
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error("Error submitting quote form:", error);
      return { success: false, error: error.message };
    }
  }
}

// Initialize form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // The form will be initialized when the quote modal is opened
  // to ensure all elements are available in the DOM
});
