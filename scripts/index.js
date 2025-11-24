// Import required modules
import { Navigation } from './navigation.js';
import { Cursor } from './cursor.js';
import { QuoteFormMultistep } from './quoteFormMultistep.js';
import { Projects } from './projects.js';
import { ContactForm } from './contact.js';
import { Loader } from './loader.js';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Initialize components
    initializeComponents();
  } catch (error) {
    console.error('Error initializing components:', error);
  }
});

function initializeComponents() {
  // Initialize loader
  new Loader();
  
  // Initialize navigation
  new Navigation();
  
  // Initialize cursor
  new Cursor();
  
  // Initialize quote form
  const quoteForm = new QuoteFormMultistep();
  
  // Initialize projects
  if (document.querySelector('.projects-grid')) {
    new Projects();
  }
  
  // Initialize contact form
  if (document.querySelector('.contact-form')) {
    new ContactForm();
  }
  
  // Log initialization status
  console.log('Components initialized successfully');
} 