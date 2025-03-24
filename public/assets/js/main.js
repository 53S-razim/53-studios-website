// 53 Studios Website - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
  console.log('53 Studios - Website Initialized');

  // Hide loader immediately
  document.querySelector('.loader')?.classList.add('hidden');

  // Setup navigation
  setupNavigation();

  // Setup form handlers
  setupQuoteForm();
});

// Basic navigation functionality
function setupNavigation() {
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const header = document.querySelector('.header');

  if (menuToggle && header) {
    menuToggle.addEventListener('click', () => {
      header.classList.toggle('nav-open');
      document.body.classList.toggle('menu-open');
    });
  }

  // Setup all navigation links
  document.querySelectorAll('a').forEach(link => {
    // Only setup navigation for internal links
    if (link.getAttribute('href')?.startsWith('/') ||
        link.getAttribute('href')?.startsWith('./') ||
        link.getAttribute('href')?.startsWith('#')) {

      link.addEventListener('click', (e) => {
        if (header?.classList.contains('nav-open')) {
          header.classList.remove('nav-open');
          document.body.classList.remove('menu-open');
        }
      });
    }
  });
}

// Quote form handling
function setupQuoteForm() {
  const quoteButton = document.querySelector('[data-quote-button]');
  const quoteModal = document.querySelector('.quote-modal');
  const quoteClose = document.querySelector('.quote-close-button');

  if (quoteButton && quoteModal) {
    quoteButton.addEventListener('click', (e) => {
      e.preventDefault();
      quoteModal.classList.add('visible');
      document.body.classList.add('modal-open');
    });
  }

  if (quoteClose && quoteModal) {
    quoteClose.addEventListener('click', () => {
      quoteModal.classList.remove('visible');
      document.body.classList.remove('modal-open');
    });
  }

  // Handle form submission
  const quoteForm = document.querySelector('.quote-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(quoteForm);
      const formEntries = Object.fromEntries(formData.entries());

      // Show submission confirmation
      const confirmationSection = document.querySelector('.form-confirmation');
      if (confirmationSection) {
        quoteForm.style.display = 'none';
        confirmationSection.style.display = 'block';
      }

      // Reset form
      quoteForm.reset();
    });
  }
}
