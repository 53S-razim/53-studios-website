// 53 Studios Website - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
  console.log('53 Studios - Website Initialized');

  // Make sure loader is completely hidden
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.display = 'none';
    loader.style.opacity = '0';
    loader.style.visibility = 'hidden';
  }

  // Initialize all components
  initNavigation();
  initAnimations();
  initProjectPopups();
  initQuoteForm();

  // Add class to body to indicate the page is loaded
  document.body.classList.add('page-loaded');
});

// Navigation Functionality
function initNavigation() {
  const menuButton = document.querySelector('[data-menu-toggle]');
  const menuOverlay = document.querySelector('.menu-overlay');
  const closeButton = document.querySelector('.close-button');
  const menuLinks = document.querySelectorAll('.menu-link:not(.get-quote-button)');
  const logoLink = document.querySelector('.logo');

  // Ensure the menu button is clickable
  if (menuButton && menuOverlay) {
    menuButton.addEventListener('click', (e) => {
      e.preventDefault();
      menuOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Animate menu items
      menuLinks.forEach((link, index) => {
        setTimeout(() => {
          link.style.opacity = '1';
          link.style.transform = 'translateY(0)';
        }, 100 * (index + 1));
      });

      // Also animate get quote button
      const quoteButton = document.querySelector('.get-quote-button');
      if (quoteButton) {
        setTimeout(() => {
          quoteButton.style.opacity = '1';
          quoteButton.style.transform = 'translateY(0)';
        }, 100 * (menuLinks.length + 1));
      }
    });
  }

  // Ensure logo is clickable
  if (logoLink) {
    logoLink.addEventListener('click', (e) => {
      // Let the default navigation happen - it's a link to homepage
      console.log("Logo clicked - navigating to homepage");
    });
  }

  // Close Menu
  if (closeButton && menuOverlay) {
    closeButton.addEventListener('click', () => {
      closeMenu();
    });
  }

  // Close menu when clicking on menu links
  if (menuLinks) {
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });
  }

  // Close menu with escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay?.classList.contains('active')) {
      closeMenu();
    }
  });

  function closeMenu() {
    if (!menuOverlay) return;

    // Hide menu items first
    menuLinks.forEach(link => {
      link.style.opacity = '0';
      link.style.transform = 'translateY(20px)';
    });

    const quoteButton = document.querySelector('.get-quote-button');
    if (quoteButton) {
      quoteButton.style.opacity = '0';
      quoteButton.style.transform = 'translateY(20px)';
    }

    // Then close menu overlay
    setTimeout(() => {
      menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }, 300);
  }
}

// Animation functionality
function initAnimations() {
  // Initial animations on load
  const animateOnLoad = document.querySelectorAll('.animate-on-load');
  if (animateOnLoad) {
    animateOnLoad.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('visible');
      }, 300 + (index * 150));
    });
  }

  // Scroll animations
  const animateOnScroll = document.querySelectorAll('.animate-on-scroll');
  if (animateOnScroll.length > 0) {
    // Initial check for elements in viewport
    checkAnimateElements();

    // Check on scroll
    window.addEventListener('scroll', () => {
      checkAnimateElements();
    });
  }

  function checkAnimateElements() {
    animateOnScroll.forEach(element => {
      if (isInViewport(element) && !element.classList.contains('animated')) {
        element.classList.add('animated');
      }
    });
  }

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    // Element is in viewport when its top is within the bottom 80% of the screen
    return rect.top <= windowHeight * 0.8;
  }
}

// Project Popup Functionality
function initProjectPopups() {
  const projectItems = document.querySelectorAll('.project-item');
  const projectPopup = document.querySelector('.project-popup');
  const closePopupBtn = document.querySelector('.project-popup-close');

  if (projectItems && projectPopup) {
    projectItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();

        // Get project title if available
        const projectTitle = item.querySelector('.project-title')?.textContent || 'Project';
        const popupTitle = projectPopup.querySelector('.project-popup-title');

        if (popupTitle) {
          popupTitle.textContent = `${projectTitle} details coming soon`;
        }

        // Show popup
        projectPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    // Close popup on button click
    if (closePopupBtn) {
      closePopupBtn.addEventListener('click', () => {
        projectPopup.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Close on overlay click
    const popupOverlay = projectPopup.querySelector('.project-popup-overlay');
    if (popupOverlay) {
      popupOverlay.addEventListener('click', () => {
        projectPopup.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && projectPopup.classList.contains('active')) {
        projectPopup.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

// Quote Form Functionality
function initQuoteForm() {
  const quoteButton = document.querySelector('#get-quote-button');
  const quoteModal = document.querySelector('.quote-modal');
  const closeButton = document.querySelector('.quote-close-button');
  const quoteContent = document.querySelector('.quote-content');

  if (quoteButton && quoteModal && quoteContent) {
    quoteButton.addEventListener('click', (e) => {
      e.preventDefault();

      // Generate the form if it hasn't been created yet
      if (!quoteContent.innerHTML.trim()) {
        generateQuoteForm();
      }

      // Show the modal
      quoteModal.classList.add('visible');
      document.body.style.overflow = 'hidden';
    });

    // Close button functionality
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        quoteModal.classList.remove('visible');
        document.body.style.overflow = '';
      });
    }

    // Close on overlay click
    const modalOverlay = quoteModal.querySelector('.quote-modal-overlay');
    if (modalOverlay) {
      modalOverlay.addEventListener('click', () => {
        quoteModal.classList.remove('visible');
        document.body.style.overflow = '';
      });
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && quoteModal.classList.contains('visible')) {
        quoteModal.classList.remove('visible');
        document.body.style.overflow = '';
      }
    });
  }

  function generateQuoteForm() {
    if (!quoteContent) return;

    // Define the multistep form structure
    const formHTML = `
      <div class="quote-form-container">
        <h2>Request a Quote</h2>
        <div class="form-step active" data-step="1">
          <h3>What type of project are you planning?</h3>
          <div class="option-list">
            <label class="option-item">
              <input type="radio" name="project_type" value="residential">
              <span class="option-text">Residential</span>
            </label>
            <label class="option-item">
              <input type="radio" name="project_type" value="commercial">
              <span class="option-text">Commercial</span>
            </label>
            <label class="option-item">
              <input type="radio" name="project_type" value="hospitality">
              <span class="option-text">Hospitality</span>
            </label>
            <label class="option-item">
              <input type="radio" name="project_type" value="other">
              <span class="option-text">Other</span>
            </label>
          </div>
        </div>

        <div class="form-step" data-step="2">
          <h3>What is the approximate size of your space?</h3>
          <div class="option-list">
            <label class="option-item">
              <input type="radio" name="space_size" value="small">
              <span class="option-text">Below 500 sqft</span>
            </label>
            <label class="option-item">
              <input type="radio" name="space_size" value="medium">
              <span class="option-text">500-1000 sqft</span>
            </label>
            <label class="option-item">
              <input type="radio" name="space_size" value="large">
              <span class="option-text">1000-2000 sqft</span>
            </label>
            <label class="option-item">
              <input type="radio" name="space_size" value="xlarge">
              <span class="option-text">2000+ sqft</span>
            </label>
          </div>
        </div>

        <div class="form-step" data-step="3">
          <h3>Which key features are important for your project?</h3>
          <div class="option-grid">
            <label class="option-item">
              <input type="checkbox" name="features" value="sustainable">
              <span class="option-text">Sustainable Design</span>
            </label>
            <label class="option-item">
              <input type="checkbox" name="features" value="smart_home">
              <span class="option-text">Smart Home/Office</span>
            </label>
            <label class="option-item">
              <input type="checkbox" name="features" value="luxury">
              <span class="option-text">Luxury Finishes</span>
            </label>
            <label class="option-item">
              <input type="checkbox" name="features" value="outdoor">
              <span class="option-text">Outdoor Space</span>
            </label>
            <label class="option-item">
              <input type="checkbox" name="features" value="energy">
              <span class="option-text">Energy Efficiency</span>
            </label>
            <label class="option-item">
              <input type="checkbox" name="features" value="custom">
              <span class="option-text">Custom Furniture</span>
            </label>
          </div>
        </div>

        <div class="form-step" data-step="4">
          <h3>What is your approximate budget range?</h3>
          <div class="option-list">
            <label class="option-item">
              <input type="radio" name="budget" value="basic">
              <span class="option-text">₹5-15 Lakhs</span>
            </label>
            <label class="option-item">
              <input type="radio" name="budget" value="standard">
              <span class="option-text">₹15-30 Lakhs</span>
            </label>
            <label class="option-item">
              <input type="radio" name="budget" value="premium">
              <span class="option-text">₹30-50 Lakhs</span>
            </label>
            <label class="option-item">
              <input type="radio" name="budget" value="luxury">
              <span class="option-text">₹50+ Lakhs</span>
            </label>
          </div>
        </div>

        <div class="form-step" data-step="5">
          <h3>What is your preferred timeline?</h3>
          <div class="option-list">
            <label class="option-item">
              <input type="radio" name="timeline" value="urgent">
              <span class="option-text">Urgent (ASAP)</span>
            </label>
            <label class="option-item">
              <input type="radio" name="timeline" value="short">
              <span class="option-text">1-3 months</span>
            </label>
            <label class="option-item">
              <input type="radio" name="timeline" value="medium">
              <span class="option-text">3-6 months</span>
            </label>
            <label class="option-item">
              <input type="radio" name="timeline" value="flexible">
              <span class="option-text">Flexible</span>
            </label>
          </div>
        </div>

        <div class="form-step" data-step="6">
          <h3>Share your contact details</h3>
          <div class="contact-form">
            <div class="form-group">
              <label for="name">Your Name</label>
              <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" required>
            </div>
            <div class="form-group">
              <label for="location">Location</label>
              <input type="text" id="location" name="location" required>
            </div>
            <div class="form-group">
              <label for="details">Additional Details (Optional)</label>
              <textarea id="details" name="details" rows="4"></textarea>
            </div>
          </div>
        </div>

        <div class="form-step" data-step="7">
          <div class="thank-you-message">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h3>Thank you for your submission!</h3>
            <p>We've received your details and will get back to you shortly.</p>
            <p>For faster response, connect with us on WhatsApp:</p>
            <a href="https://wa.me/919876543210" class="whatsapp-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              Connect on WhatsApp
            </a>
          </div>
        </div>

        <div class="form-progress-container">
          <div class="form-progress-bar" style="width: 14.28%"></div>
        </div>

        <div class="form-buttons">
          <button type="button" class="prev-button" disabled>Previous</button>
          <button type="button" class="next-button">Next</button>
        </div>
      </div>
    `;

    // Insert the form HTML
    quoteContent.innerHTML = formHTML;

    // Add form event listeners after insertion
    setupMultistepForm();
  }

  function setupMultistepForm() {
    const form = document.querySelector('.quote-form-container');
    if (!form) return;

    const steps = form.querySelectorAll('.form-step');
    const progressBar = form.querySelector('.form-progress-bar');
    const nextButton = form.querySelector('.next-button');
    const prevButton = form.querySelector('.prev-button');
    let currentStep = 1;
    const totalSteps = steps.length;

    // Function to update step visibility
    function goToStep(stepNumber) {
      // Hide all steps
      steps.forEach(step => {
        step.classList.remove('active');
      });

      // Show current step
      const step = form.querySelector(`[data-step="${stepNumber}"]`);
      if (step) {
        step.classList.add('active');
      }

      // Update progress bar
      if (progressBar) {
        const progress = (stepNumber / totalSteps) * 100;
        progressBar.style.width = `${progress}%`;
      }

      // Update buttons
      prevButton.disabled = stepNumber === 1;

      if (stepNumber === totalSteps) {
        nextButton.textContent = 'Submit';
      } else {
        nextButton.textContent = 'Next';
      }

      // Scroll to top of form for better mobile experience
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Handle next button click
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        const currentStepElement = form.querySelector(`[data-step="${currentStep}"]`);

        // Validate current step if not the last one
        if (currentStep === totalSteps) {
          // Form submission - show thank you message
          currentStep = 7;
          goToStep(currentStep);

          // Hide buttons on thank you step
          nextButton.style.display = 'none';
          prevButton.style.display = 'none';

          return;
        }

        // Simple validation for required fields
        if (currentStep === 6) {
          // Check the contact form fields
          const requiredFields = currentStepElement.querySelectorAll('input[required]');
          let isValid = true;

          requiredFields.forEach(field => {
            if (!field.value.trim()) {
              isValid = false;
              field.classList.add('error');
            } else {
              field.classList.remove('error');
            }
          });

          if (!isValid) {
            return; // Stop if validation fails
          }
        }

        // Move to next step
        currentStep++;
        goToStep(currentStep);
      });
    }

    // Handle previous button click
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        if (currentStep > 1) {
          currentStep--;
          goToStep(currentStep);
        }
      });
    }

    // Handle radio and checkbox selections
    const optionItems = form.querySelectorAll('.option-item');
    if (optionItems) {
      optionItems.forEach(item => {
        item.addEventListener('click', () => {
          const input = item.querySelector('input');
          if (input.type === 'radio') {
            // For radio buttons, deselect others
            const name = input.name;
            const radioButtons = form.querySelectorAll(`input[name="${name}"]`);
            radioButtons.forEach(radio => {
              radio.parentElement.classList.remove('selected');
            });

            // Select clicked one
            input.checked = true;
            item.classList.add('selected');

            // Auto-advance for single selection questions
            if (currentStep < totalSteps && currentStep !== 3 && currentStep !== 6) {
              setTimeout(() => {
                nextButton.click();
              }, 500);
            }
          } else if (input.type === 'checkbox') {
            // For checkboxes, toggle selection
            input.checked = !input.checked;
            item.classList.toggle('selected', input.checked);
          }
        });
      });
    }

    // Initialize the form
    goToStep(1);

    // Add CSS for form styling
    const formStyles = document.createElement('style');
    formStyles.textContent = `
      .quote-form-container {
        width: 100%;
        max-width: 100%;
      }

      .form-step {
        display: none;
        margin-bottom: 2rem;
      }

      .form-step.active {
        display: block;
      }

      .form-step h3 {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
        font-weight: var(--font-weight-medium);
      }

      .option-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .option-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }

      .option-item {
        display: flex;
        align-items: center;
        padding: 1rem 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .option-item:hover {
        border-color: var(--color-accent);
      }

      .option-item.selected {
        border-color: var(--color-text);
        background-color: rgba(30, 28, 27, 0.05);
      }

      .option-item input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
      }

      .option-text {
        margin-left: 0.5rem;
        font-size: 1.1rem;
      }

      .contact-form {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }

      .form-group {
        display: flex;
        flex-direction: column;
      }

      .form-group label {
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
      }

      .form-group input,
      .form-group textarea {
        padding: 0.75rem 1rem;
        border: 1px solid var(--color-border);
        border-radius: 4px;
        font-family: var(--font-primary);
        font-size: 1rem;
      }

      .form-group input:focus,
      .form-group textarea:focus {
        outline: none;
        border-color: var(--color-accent);
      }

      .form-group input.error,
      .form-group textarea.error {
        border-color: #e74c3c;
      }

      .thank-you-message {
        text-align: center;
        padding: 2rem 1rem;
      }

      .thank-you-message svg {
        color: var(--color-accent);
        margin-bottom: 1rem;
      }

      .thank-you-message h3 {
        margin-bottom: 1rem;
      }

      .thank-you-message p {
        margin-bottom: 1.5rem;
      }

      .whatsapp-button {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        background-color: #25D366;
        color: white;
        border-radius: 2rem;
        text-decoration: none;
        font-weight: var(--font-weight-medium);
      }

      .prev-button,
      .next-button {
        padding: 0.75rem 1.5rem;
        border-radius: 2rem;
        font-size: 1rem;
        font-weight: var(--font-weight-medium);
        cursor: pointer;
        transition: background-color 0.3s ease;
      }

      .prev-button {
        background-color: transparent;
        border: 1px solid var(--color-border);
      }

      .prev-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .next-button {
        background-color: var(--color-text);
        color: var(--color-background);
        border: none;
      }

      .next-button:hover {
        background-color: var(--color-accent);
      }

      @media (max-width: 768px) {
        .option-grid {
          grid-template-columns: 1fr;
        }

        .form-step h3 {
          font-size: 1.25rem;
        }
      }
    `;

    document.head.appendChild(formStyles);
  }
}
