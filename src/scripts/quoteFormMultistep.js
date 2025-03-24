// Multi-step quote form with premium Apple iOS UI design
class MultistepQuoteForm {
  constructor() {
    this.quoteButton = document.getElementById('get-quote-button');
    this.quoteModal = document.getElementById('quote-modal');
    this.closeButtons = document.querySelectorAll('.quote-close-button');
    this.overlay = document.querySelector('.quote-modal-overlay');
    this.container = document.querySelector('.quote-modal-container');
    this.content = document.querySelector('.quote-content');

    // Form data
    this.formData = {
      projectType: '',
      spaceSize: '',
      features: [],
      budget: '',
      timeline: '',
      name: '',
      email: '',
      phone: '',
      location: ''
    };

    // Step tracking
    this.currentStep = 0;
    this.totalSteps = 6;

    // Background images for different project types
    this.backgroundImages = {
      default: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1470',
      residential: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80&w=1470',
      commercial: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1469',
      interior: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1470',
      hospitality: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=1470',
      // Feature specific backgrounds
      sustainability: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&q=80&w=1470',
      smart: 'https://images.unsplash.com/photo-1558002038-1055952a6c91?auto=format&fit=crop&q=80&w=1470',
      outdoor: 'https://images.unsplash.com/photo-1600607687939-ce8a6c349031?auto=format&fit=crop&q=80&w=1470',
      custom: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=1470',
      lighting: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=1470',
      landscape: 'https://images.unsplash.com/photo-1551524164-687a55dd1126?auto=format&fit=crop&q=80&w=1470'
    };

    // Initialize when elements exist
    if (this.quoteButton && this.quoteModal) {
      this.init();
    }
  }

  init() {
    // Setup event listeners
    if (this.quoteButton) {
      this.quoteButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.openModal();
      });
    }

    // Fix for quote modal layout especially on mobile
    budquoteCss = document.createElement('style');
    quoteCss.textContent = `
      .quote-modal-container {
        padding-top: 60px;
        padding-bottom: 100px;
      }

      .form-progress-container {
        position: fixed;
        bottom: 60px;
        left: 0;
        width: 100%;
      }

      .form-buttons {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 15px;
        background: white;
        border-top: 1px solid #eee;
        z-index: 100;
      }

      @media (max-width: 428px) {
        .quote-modal-container {
          padding-top: 60px;
          padding-bottom: 120px;
        }
      }
    `;
    document.head.appendChild(quoteCss);

    // Close button
    if (this.closeButtons && this.closeButtons.length > 0) {
      this.closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.closeModal();
        });
      });
    }

    // Close on overlay click
    if (this.overlay) {
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) {
          this.closeModal();
        }
      });
    }

    // ESC key close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.quoteModal && this.quoteModal.classList.contains('active')) {
        this.closeModal();
      }
    });

    // Create DOM nodes for the form if they don't exist
    this.buildForm();
  }

  // Build the dynamic form structure
  buildForm() {
    if (!this.content) return;

    // Create container for dynamic content
    if (!this.content.querySelector('.form-steps')) {
      const formSteps = document.createElement('div');
      formSteps.className = 'form-steps';
      this.content.appendChild(formSteps);

      // Create progress bar
      const progressContainer = document.createElement('div');
      progressContainer.className = 'form-progress-container';

      const progressBar = document.createElement('div');
      progressBar.className = 'form-progress-bar';
      progressBar.style.width = '0%';

      progressContainer.appendChild(progressBar);
      this.content.appendChild(progressContainer);

      // Create buttons container
      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'form-buttons';

      const backButton = document.createElement('button');
      backButton.className = 'form-back-button';
      backButton.textContent = 'Back';
      backButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.previousStep();
      });

      const nextButton = document.createElement('button');
      nextButton.className = 'form-next-button';
      nextButton.textContent = 'Next';
      nextButton.addEventListener('click', (e) => {
        e.preventDefault();

        if (this.currentStep === this.totalSteps - 1) {
          // If on the last step, process the form
          this.processForm();
        } else {
          // Otherwise go to next step
          this.nextStep();
        }
      });

      buttonContainer.appendChild(backButton);
      buttonContainer.appendChild(nextButton);
      this.content.appendChild(buttonContainer);
    }

    // Store references to added elements
    this.formSteps = this.content.querySelector('.form-steps');
    this.progressBar = this.content.querySelector('.form-progress-bar');
    this.backButton = this.content.querySelector('.form-back-button');
    this.nextButton = this.content.querySelector('.form-next-button');
  }

  // Open modal and show first step
  openModal() {
    if (!this.quoteModal) return;

    // Set initial background image
    this.setBackgroundImage('default');

    // Reset to step 1
    this.currentStep = 0;

    // Show the modal
    this.quoteModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Create and show the first step
    this.renderStep();

    // Update buttons
    this.updateButtons();

    // Update progress bar
    this.updateProgressBar();
  }

  // Close the modal
  closeModal() {
    if (!this.quoteModal) return;

    this.quoteModal.classList.remove('active');
    document.body.style.overflow = '';

    // Clear form data
    setTimeout(() => {
      if (this.formSteps) {
        this.formSteps.innerHTML = '';
      }
      this.formData = {
        projectType: '',
        spaceSize: '',
        features: [],
        budget: '',
        timeline: '',
        name: '',
        email: '',
        phone: '',
        location: ''
      };
    }, 500);
  }

  // Set background image
  setBackgroundImage(type) {
    if (!this.quoteModal) return;

    const bgImg = this.backgroundImages[type] || this.backgroundImages.default;
    this.quoteModal.style.backgroundImage = `linear-gradient(rgba(30, 28, 27, 0.6), rgba(30, 28, 27, 0.85)), url(${bgImg})`;
    this.quoteModal.style.backgroundSize = 'cover';
    this.quoteModal.style.backgroundPosition = 'center';
  }

  // Render the current step
  renderStep() {
    if (!this.formSteps) return;

    this.formSteps.innerHTML = '';

    switch (this.currentStep) {
      case 0:
        this.renderProjectTypeStep();
        break;
      case 1:
        this.renderSpaceSizeStep();
        break;
      case 2:
        this.renderFeaturesStep();
        break;
      case 3:
        this.renderBudgetStep();
        break;
      case 4:
        this.renderTimelineStep();
        break;
      case 5:
        this.renderContactInfoStep();
        break;
      default:
        this.renderThankYouStep();
    }

    // Add animation class to new step
    setTimeout(() => {
      const step = this.formSteps.querySelector('.form-step');
      if (step) step.classList.add('visible');
    }, 50);
  }

  // Step 1: Project Type
  renderProjectTypeStep() {
    if (!this.formSteps) return;

    const step = document.createElement('div');
    step.className = 'form-step project-type-step';

    const heading = document.createElement('h2');
    heading.textContent = 'What type of project are you planning?';

    const options = document.createElement('div');
    options.className = 'option-grid';

    const projectTypes = [
      { id: 'residential', label: 'Residential' },
      { id: 'commercial', label: 'Commercial' },
      { id: 'interior', label: 'Interior Design' },
      { id: 'hospitality', label: 'Others (Custom)' }
    ];

    projectTypes.forEach(type => {
      const option = document.createElement('div');
      option.className = `option ${this.formData.projectType === type.id ? 'selected' : ''}`;
      option.setAttribute('data-value', type.id);
      option.setAttribute('data-type', type.id);

      const label = document.createElement('div');
      label.className = 'option-label premium-font';
      label.textContent = type.label;

      option.appendChild(label);

      // Add background change on hover
      option.addEventListener('mouseenter', () => {
        this.setBackgroundImage(type.id);
      });

      option.addEventListener('mouseleave', () => {
        if (!this.formData.projectType) {
          this.setBackgroundImage('default');
        } else {
          this.setBackgroundImage(this.formData.projectType);
        }
      });

      option.addEventListener('click', () => {
        // Remove selected class from all options
        options.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));

        // Add selected class to clicked option
        option.classList.add('selected');

        // Update form data
        this.formData.projectType = type.id;

        // Update background image
        this.setBackgroundImage(type.id);

        // Enable next button
        this.updateButtons();

        // Auto-advance to next step after a short delay
        setTimeout(() => {
          this.nextStep();
        }, 500);
      });

      options.appendChild(option);
    });

    step.appendChild(heading);
    step.appendChild(options);
    this.formSteps.appendChild(step);
  }

  // Step 2: Space Size
  renderSpaceSizeStep() {
    if (!this.formSteps) return;

    const step = document.createElement('div');
    step.className = 'form-step space-size-step';

    const heading = document.createElement('h2');
    heading.textContent = 'What is the size of your space?';

    const options = document.createElement('div');
    options.className = 'option-list';

    const spaceSizes = [
      { id: 'small', label: 'Under 500 sq ft', bgId: 'residential' },
      { id: 'medium', label: '500-1000 sq ft', bgId: 'commercial' },
      { id: 'large', label: '1000-2500 sq ft', bgId: 'interior' },
      { id: 'xl', label: 'Over 2500 sq ft', bgId: 'hospitality' }
    ];

    spaceSizes.forEach(size => {
      const option = document.createElement('div');
      option.className = `option ${this.formData.spaceSize === size.id ? 'selected' : ''}`;
      option.setAttribute('data-value', size.id);

      const label = document.createElement('div');
      label.className = 'option-label premium-font';
      label.textContent = size.label;

      option.appendChild(label);

      // Add background change on hover
      option.addEventListener('mouseenter', () => {
        this.setBackgroundImage(size.bgId);
      });

      option.addEventListener('mouseleave', () => {
        if (!this.formData.projectType) {
          this.setBackgroundImage('default');
        } else {
          this.setBackgroundImage(this.formData.projectType);
        }
      });

      option.addEventListener('click', () => {
        // Remove selected class from all options
        options.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));

        // Add selected class to clicked option
        option.classList.add('selected');

        // Update form data
        this.formData.spaceSize = size.id;

        // Enable next button
        this.updateButtons();

        // Auto-advance to next step after a short delay
        setTimeout(() => {
          this.nextStep();
        }, 500);
      });

      options.appendChild(option);
    });

    step.appendChild(heading);
    step.appendChild(options);
    this.formSteps.appendChild(step);
  }

  // Step 3: Key Features
  renderFeaturesStep() {
    if (!this.formSteps) return;

    const step = document.createElement('div');
    step.className = 'form-step features-step';

    const heading = document.createElement('h2');
    heading.textContent = 'Select features you need:';

    const options = document.createElement('div');
    options.className = 'option-grid feature-grid';

    const features = [
      { id: 'sustainability', label: 'Sustainable Design', bgId: 'sustainability' },
      { id: 'smart', label: 'Smart Home Integration', bgId: 'smart' },
      { id: 'outdoor', label: 'Outdoor Spaces', bgId: 'outdoor' },
      { id: 'custom', label: 'Custom Furniture', bgId: 'custom' },
      { id: 'lighting', label: 'Lighting Design', bgId: 'lighting' },
      { id: 'landscape', label: 'Landscape Design', bgId: 'landscape' }
    ];

    features.forEach(feature => {
      const option = document.createElement('div');
      option.className = `option ${this.formData.features.includes(feature.id) ? 'selected' : ''}`;
      option.setAttribute('data-value', feature.id);

      const label = document.createElement('div');
      label.className = 'option-label premium-font';
      label.textContent = feature.label;

      option.appendChild(label);

      // Add background change on hover
      option.addEventListener('mouseenter', () => {
        this.setBackgroundImage(feature.bgId);
      });

      option.addEventListener('mouseleave', () => {
        if (!this.formData.projectType) {
          this.setBackgroundImage('default');
        } else {
          this.setBackgroundImage(this.formData.projectType);
        }
      });

      option.addEventListener('click', () => {
        option.classList.toggle('selected');

        // Update form data
        if (option.classList.contains('selected')) {
          if (!this.formData.features.includes(feature.id)) {
            this.formData.features.push(feature.id);
          }
        } else {
          this.formData.features = this.formData.features.filter(id => id !== feature.id);
        }

        // Enable next button - features are optional so always valid
        this.updateButtons();
      });

      options.appendChild(option);
    });

    // Add a note that this is optional
    const note = document.createElement('p');
    note.className = 'form-note';
    note.textContent = 'Select any that apply. This step is optional.';

    step.appendChild(heading);
    step.appendChild(options);
    step.appendChild(note);
    this.formSteps.appendChild(step);
  }

  // Step 4: Budget Range
  renderBudgetStep() {
    if (!this.formSteps) return;

    const step = document.createElement('div');
    step.className = 'form-step budget-step';

    const heading = document.createElement('h2');
    heading.textContent = 'What is your budget range?';

    const options = document.createElement('div');
    options.className = 'option-list';

    const budgets = [
      { id: 'basic', label: '₹5 Lakhs - ₹10 Lakhs' },
      { id: 'standard', label: '₹10 Lakhs - ₹25 Lakhs' },
      { id: 'premium', label: '₹25 Lakhs - ₹50 Lakhs' },
      { id: 'luxury', label: '₹50 Lakhs+' }
    ];

    budgets.forEach(budget => {
      const option = document.createElement('div');
      option.className = `option ${this.formData.budget === budget.id ? 'selected' : ''}`;
      option.setAttribute('data-value', budget.id);

      const label = document.createElement('div');
      label.className = 'option-label premium-font';
      label.textContent = budget.label;

      option.appendChild(label);

      option.addEventListener('click', () => {
        // Remove selected class from all options
        options.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));

        // Add selected class to clicked option
        option.classList.add('selected');

        // Update form data
        this.formData.budget = budget.id;

        // Enable next button
        this.updateButtons();

        // Auto-advance to next step after a short delay
        setTimeout(() => {
          this.nextStep();
        }, 500);
      });

      options.appendChild(option);
    });

    step.appendChild(heading);
    step.appendChild(options);
    this.formSteps.appendChild(step);
  }

  // Step 5: Timeline
  renderTimelineStep() {
    if (!this.formSteps) return;

    const step = document.createElement('div');
    step.className = 'form-step timeline-step';

    const heading = document.createElement('h2');
    heading.textContent = 'When do you plan to start this project?';

    const options = document.createElement('div');
    options.className = 'option-list';

    const timelines = [
      { id: 'urgent', label: 'As soon as possible', bgId: 'commercial' },
      { id: 'soon', label: 'In the next 3 months', bgId: 'residential' },
      { id: 'planning', label: 'In 3-6 months', bgId: 'interior' },
      { id: 'future', label: 'In 6+ months', bgId: 'hospitality' }
    ];

    timelines.forEach(timeline => {
      const option = document.createElement('div');
      option.className = `option ${this.formData.timeline === timeline.id ? 'selected' : ''}`;
      option.setAttribute('data-value', timeline.id);

      const label = document.createElement('div');
      label.className = 'option-label premium-font';
      label.textContent = timeline.label;

      option.appendChild(label);

      // Add background change on hover
      option.addEventListener('mouseenter', () => {
        this.setBackgroundImage(timeline.bgId);
      });

      option.addEventListener('mouseleave', () => {
        if (!this.formData.projectType) {
          this.setBackgroundImage('default');
        } else {
          this.setBackgroundImage(this.formData.projectType);
        }
      });

      option.addEventListener('click', () => {
        // Remove selected class from all options
        options.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));

        // Add selected class to clicked option
        option.classList.add('selected');

        // Update form data
        this.formData.timeline = timeline.id;

        // Enable next button
        this.updateButtons();

        // Auto-advance to next step after a short delay
        setTimeout(() => {
          this.nextStep();
        }, 500);
      });

      options.appendChild(option);
    });

    step.appendChild(heading);
    step.appendChild(options);
    this.formSteps.appendChild(step);
  }

  // Step 6: Contact Information
  renderContactInfoStep() {
    if (!this.formSteps) return;

    const step = document.createElement('div');
    step.className = 'form-step contact-step';

    const heading = document.createElement('h2');
    heading.textContent = 'Almost done! Please provide your contact details:';

    const form = document.createElement('div');
    form.className = 'contact-form';

    // Name field
    const nameGroup = document.createElement('div');
    nameGroup.className = 'form-group';

    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'quote-name');
    nameLabel.textContent = 'Name';

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'quote-name';
    nameInput.required = true;
    nameInput.value = this.formData.name;
    nameInput.addEventListener('input', (e) => {
      this.formData.name = e.target.value;
      this.validateField(nameInput, !!e.target.value.trim());
      this.updateButtons();
    });

    nameGroup.appendChild(nameLabel);
    nameGroup.appendChild(nameInput);

    // Email field
    const emailGroup = document.createElement('div');
    emailGroup.className = 'form-group';

    const emailLabel = document.createElement('label');
    emailLabel.setAttribute('for', 'quote-email');
    emailLabel.textContent = 'Email';

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.id = 'quote-email';
    emailInput.required = true;
    emailInput.value = this.formData.email;
    emailInput.addEventListener('input', (e) => {
      this.formData.email = e.target.value;
      const isValid = this.validateEmail(e.target.value);
      this.validateField(emailInput, isValid);
      this.updateButtons();
    });

    emailGroup.appendChild(emailLabel);
    emailGroup.appendChild(emailInput);

    // Phone field
    const phoneGroup = document.createElement('div');
    phoneGroup.className = 'form-group';

    const phoneLabel = document.createElement('label');
    phoneLabel.setAttribute('for', 'quote-phone');
    phoneLabel.textContent = 'Phone';

    const phoneInput = document.createElement('input');
    phoneInput.type = 'tel';
    phoneInput.id = 'quote-phone';
    phoneInput.value = this.formData.phone;
    phoneInput.addEventListener('input', (e) => {
      this.formData.phone = e.target.value;
    });

    phoneGroup.appendChild(phoneLabel);
    phoneGroup.appendChild(phoneInput);

    // Location field
    const locationGroup = document.createElement('div');
    locationGroup.className = 'form-group';

    const locationLabel = document.createElement('label');
    locationLabel.setAttribute('for', 'quote-location');
    locationLabel.textContent = 'Location';

    const locationInput = document.createElement('input');
    locationInput.type = 'text';
    locationInput.id = 'quote-location';
    locationInput.value = this.formData.location;
    locationInput.addEventListener('input', (e) => {
      this.formData.location = e.target.value;
    });

    locationGroup.appendChild(locationLabel);
    locationGroup.appendChild(locationInput);

    form.appendChild(nameGroup);
    form.appendChild(emailGroup);
    form.appendChild(phoneGroup);
    form.appendChild(locationGroup);

    step.appendChild(heading);
    step.appendChild(form);
    this.formSteps.appendChild(step);

    // Focus the first field
    setTimeout(() => {
      nameInput.focus();
    }, 300);
  }

  // Thank You Step
  renderThankYouStep() {
    if (!this.formSteps) return;

    const step = document.createElement('div');
    step.className = 'form-step thank-you-step';

    const icon = document.createElement('div');
    icon.className = 'thank-you-icon';
    icon.innerHTML = '✓';

    const heading = document.createElement('h2');
    heading.textContent = 'Thank you for your request!';

    const message = document.createElement('p');
    message.textContent = 'We have received your quote request and our team will get back to you shortly.';

    const whatsapp = document.createElement('a');
    whatsapp.className = 'whatsapp-button';
    whatsapp.href = `https://wa.me/919876543210?text=Hi,%20I%20just%20submitted%20a%20quote%20request%20for%20my%20${this.formData.projectType}%20project.%20I'd%20like%20to%20discuss%20it%20further.`;
    whatsapp.target = '_blank';
    whatsapp.textContent = 'Continue on WhatsApp';

    const close = document.createElement('button');
    close.className = 'close-quote-button';
    close.textContent = 'Close';
    close.addEventListener('click', () => this.closeModal());

    step.appendChild(icon);
    step.appendChild(heading);
    step.appendChild(message);
    step.appendChild(whatsapp);
    step.appendChild(close);
    this.formSteps.appendChild(step);

    // Hide navigation buttons on the last step
    if (this.backButton) this.backButton.style.display = 'none';
    if (this.nextButton) this.nextButton.style.display = 'none';
  }

  // Validate email using regex
  validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Add/remove validation classes
  validateField(element, isValid) {
    if (isValid) {
      element.classList.remove('invalid');
      element.classList.add('valid');
    } else {
      element.classList.remove('valid');
      element.classList.add('invalid');
    }
  }

  // Go to the next step
  nextStep() {
    // Validation for current step
    if (!this.validateCurrentStep()) {
      return;
    }

    // Create exit animation
    const currentStep = this.formSteps ? this.formSteps.querySelector('.form-step') : null;
    if (currentStep) {
      currentStep.classList.remove('visible');
      currentStep.classList.add('exit');
    }

    // Wait for animation to complete
    setTimeout(() => {
      this.currentStep++;

      // Render the next step
      this.renderStep();

      // Update buttons
      this.updateButtons();

      // Update progress bar
      this.updateProgressBar();
    }, 300);
  }

  // Go to the previous step
  previousStep() {
    if (this.currentStep > 0) {
      // Create exit animation
      const currentStep = this.formSteps ? this.formSteps.querySelector('.form-step') : null;
      if (currentStep) {
        currentStep.classList.remove('visible');
        currentStep.classList.add('exit-reverse');
      }

      // Wait for animation to complete
      setTimeout(() => {
        this.currentStep--;

        // Render the previous step
        this.renderStep();

        // Update buttons
        this.updateButtons();

        // Update progress bar
        this.updateProgressBar();
      }, 300);
    }
  }

  // Update the navigation buttons based on current step
  updateButtons() {
    if (!this.backButton || !this.nextButton) return;

    if (this.currentStep === 0) {
      this.backButton.style.visibility = 'hidden';
    } else {
      this.backButton.style.visibility = 'visible';
    }

    if (this.currentStep === this.totalSteps - 1) {
      this.nextButton.textContent = 'Submit';
    } else {
      this.nextButton.textContent = 'Next';
    }

    // Disable next button if current step isn't valid
    const isValid = this.validateCurrentStep();
    this.nextButton.disabled = !isValid;

    // Make it visually obvious if the button is enabled/disabled
    if (isValid) {
      this.nextButton.classList.remove('disabled');
      this.nextButton.style.opacity = '1';
      this.nextButton.style.cursor = 'pointer';
    } else {
      this.nextButton.classList.add('disabled');
      this.nextButton.style.opacity = '0.5';
      this.nextButton.style.cursor = 'not-allowed';
    }
  }

  // Update the progress bar
  updateProgressBar() {
    if (!this.progressBar) return;

    const progress = (this.currentStep / this.totalSteps) * 100;
    this.progressBar.style.width = `${progress}%`;
  }

  // Validate the current step
  validateCurrentStep() {
    switch (this.currentStep) {
      case 0: // Project Type
        return !!this.formData.projectType;

      case 1: // Space Size
        return !!this.formData.spaceSize;

      case 2: // Features
        return true; // Features are optional

      case 3: // Budget
        return !!this.formData.budget;

      case 4: // Timeline
        return !!this.formData.timeline;

      case 5: // Contact Info
        return (
          !!this.formData.name &&
          this.validateEmail(this.formData.email)
        );

      default:
        return true;
    }
  }

  // Process the form submission
  processForm() {
    console.log('Form submitted:', this.formData);

    // In a real project, you would send this data to a server
    // For now, we'll just show the thank you step
    this.nextStep();
  }

  // Update form UI with some essential fixes
  renderMultistepForm() {
    this.renderProjectTypeStep();
    this.renderSpaceSizeStep();
    this.renderFeaturesStep();
    this.renderBudgetStep();
    this.renderTimelineStep();
    this.renderContactInfoStep();

    // Add form progress and buttons
    this.renderFormProgress();
  }
}

// Initialize the form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Replace the old quote form with the new multi-step form
  new MultistepQuoteForm();

  const additionalCSS = document.createElement('style');
  additionalCSS.textContent = `
    /* Basic form structure with improved positioning */
    .quote-modal-container {
      position: relative;
      padding: 40px 30px 80px;
      max-width: 640px;
      margin: 4vh auto;
      border-radius: 12px;
      background-color: var(--color-background);
      color: var(--color-text);
      overflow-y: auto;
      max-height: 92vh;
    }

    .quote-close-button {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      cursor: pointer;
      z-index: 10;
    }

    .form-step {
      display: none;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.4s ease;
    }

    .form-step.active {
      display: block;
      opacity: 1;
      transform: translateY(0);
    }

    .form-step h2 {
      font-family: 'Canela', serif;
      font-size: 28px;
      margin-bottom: 2rem;
      font-weight: 300;
    }

    .option-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 2rem;
    }

    .form-progress-container {
      position: fixed;
      bottom: 125px;
      left: 0;
      width: 100%;
      height: 4px;
      background-color: rgba(30, 28, 27, 0.1);
      margin: 0.5rem 0;
      z-index: 10;
    }

    .form-progress-bar {
      height: 100%;
      background-color: var(--color-text);
      transition: width 0.4s ease;
    }

    .form-buttons {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 2rem;
      background-color: var(--color-background);
      border-top: 1px solid rgba(30, 28, 27, 0.1);
      z-index: 10;
    }

    /* Improve spacing on small screens */
    @media (max-width: 768px) {
      .quote-modal-container {
        padding: 40px 20px 80px;
        max-height: 90vh;
        margin: 5vh auto;
      }

      .form-step h2 {
        font-size: 24px;
        margin-bottom: 1.5rem;
      }

      .option-list {
        gap: 12px;
      }

      .option {
        padding: 12px;
      }

      .contact-info-grid {
        grid-template-columns: 1fr;
      }

      .form-input {
        margin-bottom: 1.25rem;
      }

      .form-progress-container {
        bottom: 115px;
      }
    }

    /* Fix for iPhone */
    @media (max-width: 428px) {
      .quote-modal-container {
        padding: 40px 20px 90px;
        margin-top: 2vh;
        border-radius: 8px;
        max-height: 94vh;
      }

      .form-progress-container {
        bottom: 125px;
      }

      .form-buttons {
        padding: 1.5rem 1.25rem 2rem;
      }
    }
  `;

  document.head.appendChild(additionalCSS);
});

export default MultistepQuoteForm;
