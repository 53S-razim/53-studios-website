// Main JavaScript file for 53 Studios website
// Primary focus: Ensure the site loads and becomes interactive

// Function to trace execution and log to console
function trace(message) {
  console.log(`TRACE: ${message}`);
  if (window.debugUtils && typeof window.debugUtils.log === 'function') {
    window.debugUtils.log(message);
  }
}

// Function to force the loader to complete
function ensureLoadingCompletes() {
  trace('Checking if loader needs to be completed');
  
  const loader = document.querySelector('.loader');
  const counter = document.querySelector('.loader-counter');
  
  if (!loader) {
    trace('No loader found');
    return;
  }
  
  // If the loader is still visible
  if (window.getComputedStyle(loader).display !== 'none') {
    trace('Loader is still visible, will force completion');
    
    // Short timeout to ensure we don't interfere with natural loading
    setTimeout(() => {
      // Force the counter to 100
      if (counter) counter.textContent = '100';
      
      // Add the finished class
      loader.classList.add('finished');
      
      // After transition, hide the loader
      setTimeout(() => {
        loader.style.display = 'none';
        document.body.style.overflow = 'auto';
        trace('Loader has been forcibly completed');
      }, 600);
    }, 2000);
  } else {
    trace('Loader is already hidden');
  }
}

// Initialize components
function initializeComponents() {
  trace('Initializing components');
  
  // Initialize cursor
  const cursor = new Cursor();
  
  // Initialize navigation
  const navigation = new Navigation();
  
  // Initialize quote form
  const quoteForm = new QuoteFormMultistep();
  quoteForm.init();
}

// Wait for document ready
document.addEventListener('DOMContentLoaded', function() {
  trace('DOM loaded');
  
  // Initialize components immediately
  initializeComponents();
  
  // Allow a little time for natural loading, then check
  setTimeout(ensureLoadingCompletes, 5000);
});

// When window load completes
window.addEventListener('load', function() {
  trace('Window loaded');
  
  // If loader is still visible at window load, force it to complete
  setTimeout(ensureLoadingCompletes, 1000);
});