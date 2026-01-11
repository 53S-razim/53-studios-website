/**
 * Loader implementation for 53Studios website
 * Uses a loader screen with counter and transitions through images
 * Inspired by studioolimpo.it
 */

export class Loader {
  constructor() {
    this.loaderElement = document.querySelector('.loader');
    this.counter = document.querySelector('.loader-counter');
    this.images = document.querySelectorAll('.loader-image');
    this.currentImageIndex = 0;
    this.progress = 0;
    this.isComplete = false;
    this.loadingSpeed = 25; // Speed of counter increment
    this.imageInterval = 2000; // Time between image transitions
    
    // Check if we've loaded the site before
    this.hasVisitedBefore = sessionStorage.getItem('hasVisited');
    
    // Initialize only if loader element exists
    if (this.loaderElement && !this.hasVisitedBefore) {
      this.init();
    } else if (this.loaderElement) {
      // If visited before, hide loader immediately
      this.hideLoader();
    }
  }
  
  init() {
    // Start incrementing counter
    this.incrementProgress();
    
    // Start image transitions
    this.startImageTransition();
    
    // Mark as visited for future page loads
    sessionStorage.setItem('hasVisited', 'true');
  }
  
  incrementProgress() {
    if (this.progress < 100 && !this.isComplete) {
      // Increment progress
      this.progress += 1;
      
      // Update counter display
      if (this.counter) {
        this.counter.textContent = this.progress;
      }
      
      // When reaching 100%, finish loading
      if (this.progress >= 100) {
        setTimeout(() => this.hideLoader(), 500);
      } else {
        // Continue incrementing
        setTimeout(() => this.incrementProgress(), this.loadingSpeed);
      }
    }
  }
  
  startImageTransition() {
    // Only run if we have images
    if (this.images && this.images.length > 1) {
      this.imageTransitionInterval = setInterval(() => {
        // Remove active class from current image
        this.images[this.currentImageIndex].classList.remove('active');
        
        // Increment to next image (loop back to first if at end)
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        
        // Add active class to new current image
        this.images[this.currentImageIndex].classList.add('active');
      }, this.imageInterval);
    }
  }
  
  hideLoader() {
    if (this.loaderElement) {
      // Add finished class for fade out effect
      this.loaderElement.classList.add('finished');
      
      // After transition completes, set display none
      setTimeout(() => {
        this.loaderElement.style.display = 'none';
        
        // Clear any intervals
        if (this.imageTransitionInterval) {
          clearInterval(this.imageTransitionInterval);
        }
        
        // Dispatch event that loading is complete
        document.dispatchEvent(new Event('loaderComplete'));
        this.isComplete = true;
      }, 600);
    }
  }
}
