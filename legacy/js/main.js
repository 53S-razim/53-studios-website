// Quote Form Functionality
document.addEventListener('DOMContentLoaded', function() {
  const quoteButton = document.getElementById('quote-button');
  const quoteModal = document.getElementById('quote-modal');
  const closeButton = document.getElementById('quote-close-button');
  const overlay = document.querySelector('.quote-modal-overlay');

  // Open modal
  quoteButton.addEventListener('click', function() {
    quoteModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  // Close modal
  function closeModal() {
    quoteModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeButton.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  // Step navigation
  const steps = document.querySelectorAll('.step-content');
  let currentStep = 1;

  function showStep(stepNumber) {
    steps.forEach(step => step.style.display = 'none');
    document.getElementById(`step-${stepNumber}`).style.display = 'block';
    currentStep = stepNumber;
  }

  // Next buttons
  document.getElementById('step-1-next')?.addEventListener('click', () => showStep(2));
  document.getElementById('step-2-next')?.addEventListener('click', () => showStep(3));
  document.getElementById('step-3-next')?.addEventListener('click', () => showStep(4));

  // Back buttons
  document.getElementById('step-2-back')?.addEventListener('click', () => showStep(1));
  document.getElementById('step-3-back')?.addEventListener('click', () => showStep(2));
  document.getElementById('step-4-back')?.addEventListener('click', () => showStep(3));

  // Option card selection
  const optionCards = document.querySelectorAll('.option-card');
  optionCards.forEach(card => {
    card.addEventListener('click', function() {
      optionCards.forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');
    });
  });

  // Form submission
  document.getElementById('step-4-submit')?.addEventListener('click', function() {
    // Here you would typically collect form data and send it to your server
    showStep('success');
  });
}); 