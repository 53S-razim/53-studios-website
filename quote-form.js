// Quote Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const quoteModal = document.getElementById('quote-modal');
    const getQuoteButton = document.getElementById('get-quote-button');
    const quoteCloseButton = document.getElementById('quote-close-button');
    const quoteBackground = document.getElementById('quote-background');
    const quoteProgressBar = document.getElementById('quote-progress-bar');
    const quotePrevButton = document.getElementById('quote-prev-button');
    const quoteNextButton = document.getElementById('quote-next-button');
    const quoteSubmitButton = document.getElementById('quote-submit');
    
    // Form data storage
    const formData = {
        projectType: '',
        size: '',
        features: [],
        budget: '',
        timeline: '',
        name: '',
        email: '',
        phone: '',
        location: '',
        message: ''
    };
    
    // State management
    let currentStep = 1;
    const totalSteps = 6;
    
    // Background images for different project types
    const backgroundImages = {
        default: 'https://cdn.prod.website-files.com/6783d77212b58244ace7036d/67a37b4b6d3ce6df4b8377ad_StudioOlimpo_Works_01_Retroscena_01.avif',
        residential: 'https://cdn.prod.website-files.com/6783d77212b58244ace7036d/67a37b4b6d3ce6df4b8377ad_StudioOlimpo_Works_01_Retroscena_01.avif',
        commercial: 'https://cdn.prod.website-files.com/6783d77212b58244ace7036d/67a24d2efdad01250ef5efa1_StudioOlimpo_Works_02_ScarpeCarrioli_01-p-1080.avif',
        hospitality: 'https://cdn.prod.website-files.com/6783d77212b58244ace7036d/679bd61a7bf8d1806ecb0f83_Controluce%20%E2%80%93%C2%A0Portfolio_1-p-500.avif',
        other: 'https://cdn.prod.website-files.com/6783d77212b58244ace7036d/679bd5e8623cb61380b4a622_Controluce%20%E2%80%93%C2%A0Portfolio_11-p-1080.avif'
    };
    
    // Open quote modal
    if (getQuoteButton) {
        getQuoteButton.addEventListener('click', function(e) {
            e.preventDefault();
            closeMenu(); // Close menu if open
            openQuoteModal();
        });
    }
    
    // Close quote modal
    if (quoteCloseButton) {
        quoteCloseButton.addEventListener('click', function() {
            closeQuoteModal();
        });
    }
    
    // Initialize the form
    function initQuoteForm() {
        // Set initial background
        if (quoteBackground) {
            quoteBackground.style.backgroundImage = `url('${backgroundImages.default}')`;
        }
        
        // Show first step
        showStep(1);
        
        // Add event listeners to option buttons
        document.querySelectorAll('.quote-option-button').forEach(button => {
            button.addEventListener('click', function() {
                const step = parseInt(this.closest('.quote-step').id.split('-')[2]);
                const value = this.dataset.value;
                
                // Handle background change for project type
                if (step === 1) {
                    formData.projectType = value;
                    changeBackground(value);
                } else if (step === 2) {
                    formData.size = value;
                } else if (step === 4) {
                    formData.budget = value;
                } else if (step === 5) {
                    formData.timeline = value;
                }
                
                // Select this button and deselect others in the same step
                const stepButtons = this.closest('.quote-options-grid').querySelectorAll('.quote-option-button');
                stepButtons.forEach(btn => btn.classList.remove('selected'));
                this.classList.add('selected');
                
                // Automatically go to next step after selection (except on step 3 which has checkboxes)
                if (step !== 3) {
                    setTimeout(() => {
                        goToNextStep();
                    }, 500);
                }
            });
        });
        
        // Handle checkboxes in step 3
        document.querySelectorAll('.quote-checkbox-option input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const value = this.value;
                
                if (this.checked) {
                    formData.features.push(value);
                } else {
                    const index = formData.features.indexOf(value);
                    if (index > -1) {
                        formData.features.splice(index, 1);
                    }
                }
            });
        });
        
        // Handle navigation buttons
        if (quotePrevButton) {
            quotePrevButton.addEventListener('click', goToPrevStep);
        }
        
        if (quoteNextButton) {
            quoteNextButton.addEventListener('click', goToNextStep);
        }
        
        // Handle form submission
        if (quoteSubmitButton) {
            quoteSubmitButton.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Collect form data
                formData.name = document.getElementById('quote-name').value;
                formData.email = document.getElementById('quote-email').value;
                formData.phone = document.getElementById('quote-phone').value;
                formData.location = document.getElementById('quote-location').value;
                formData.message = document.getElementById('quote-message').value;
                
                // Validate form
                if (!formData.name || !formData.email || !formData.phone || !formData.location) {
                    alert('Please fill in all required fields');
                    return;
                }
                
                // Submit form - in a real implementation this would send data to a server
                console.log('Form submitted:', formData);
                
                // Show success step
                showStep(7);
                
                // Hide navigation buttons
                if (quotePrevButton) quotePrevButton.style.display = 'none';
                if (quoteNextButton) quoteNextButton.style.display = 'none';
                if (quoteProgressBar) quoteProgressBar.style.display = 'none';
            });
        }
    }
    
    // Show step
    function showStep(step) {
        currentStep = step;
        
        // Hide all steps
        document.querySelectorAll('.quote-step').forEach(el => {
            el.classList.remove('active');
        });
        
        // Show current step
        const currentStepEl = document.getElementById(`quote-step-${step}`);
        if (currentStepEl) {
            currentStepEl.classList.add('active');
        }
        
        // Update progress bar
        if (quoteProgressBar) {
            if (step <= totalSteps) {
                quoteProgressBar.setAttribute('data-progress', step);
                quoteProgressBar.style.display = 'block';
            } else {
                quoteProgressBar.style.display = 'none';
            }
        }
        
        // Show/hide prev button based on step
        if (quotePrevButton) {
            if (step === 1) {
                quotePrevButton.style.visibility = 'hidden';
            } else {
                quotePrevButton.style.visibility = 'visible';
            }
        }
        
        // Show/hide next button based on step
        if (quoteNextButton) {
            if (step === totalSteps) {
                quoteNextButton.style.display = 'none';
            } else {
                quoteNextButton.style.display = 'block';
            }
        }
    }
    
    // Go to next step
    function goToNextStep() {
        if (currentStep < totalSteps) {
            showStep(currentStep + 1);
        }
    }
    
    // Go to previous step
    function goToPrevStep() {
        if (currentStep > 1) {
            showStep(currentStep - 1);
        }
    }
    
    // Change background based on selection
    function changeBackground(type) {
        if (quoteBackground && backgroundImages[type]) {
            quoteBackground.classList.add('switching');
            
            setTimeout(() => {
                quoteBackground.style.backgroundImage = `url('${backgroundImages[type]}')`;
                quoteBackground.classList.remove('switching');
            }, 500);
        }
    }
    
    // Open quote modal
    function openQuoteModal() {
        if (quoteModal) {
            quoteModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            initQuoteForm();
        }
    }
    
    // Close quote modal
    function closeQuoteModal() {
        if (quoteModal) {
            quoteModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
            
            // Reset form after closing
            setTimeout(() => {
                resetQuoteForm();
            }, 600);
        }
    }
    
    // Reset quote form
    function resetQuoteForm() {
        // Reset form data
        Object.keys(formData).forEach(key => {
            if (Array.isArray(formData[key])) {
                formData[key] = [];
            } else {
                formData[key] = '';
            }
        });
        
        // Reset UI
        document.querySelectorAll('.quote-option-button').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        document.querySelectorAll('.quote-checkbox-option input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Reset form inputs
        const formInputs = document.querySelectorAll('.quote-input, .quote-textarea');
        if (formInputs) {
            formInputs.forEach(input => {
                input.value = '';
            });
        }
        
        // Reset to first step
        showStep(1);
        
        // Reset background
        if (quoteBackground) {
            quoteBackground.style.backgroundImage = `url('${backgroundImages.default}')`;
        }
        
        // Show navigation buttons again
        if (quotePrevButton) quotePrevButton.style.display = 'block';
        if (quoteNextButton) quoteNextButton.style.display = 'block';
        if (quoteProgressBar) quoteProgressBar.style.display = 'block';
    }
    
    // Initialize if elements exist
    if (quoteModal && getQuoteButton) {
        // Add global function to close quote modal
        window.closeQuoteModal = closeQuoteModal;
    }
});