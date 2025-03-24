// Animations script for smooth transitions and scroll animations
class Animations {
  constructor() {
    // Initialize animated elements before calling any methods that use it
    this.animatedElements = document.querySelectorAll('.animate-on-scroll');
    this.init();
    this.setupScrollAnimations();
  }

  init() {
    // Add smooth page transitions
    this.setupPageTransitions();

    // Apply initial animations to elements in the viewport
    this.animateElementsInView();

    // Add scroll listener for scroll-triggered animations
    window.addEventListener('scroll', () => {
      this.animateElementsInView();
    });

    // Add class to body when page is loaded
    document.body.classList.add('page-loaded');
  }

  setupPageTransitions() {
    // Handle internal links for smooth page transitions
    // Exclude menu links to allow them to work normally
    const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');

    internalLinks.forEach(link => {
      // Skip menu links
      if (link.classList.contains('menu-link')) {
        return;
      }

      link.addEventListener('click', (e) => {
        // Only handle internal navigation and ignore anchor links
        if (
          link.getAttribute('target') !== '_blank' &&
          !link.getAttribute('href').startsWith('http') &&
          !link.getAttribute('href').startsWith('#')
        ) {
          // Allow standard navigation - remove the preventDefault
          // e.preventDefault();
          const targetHref = link.getAttribute('href');

          // Add overlay for page transition
          const transitionOverlay = document.createElement('div');
          transitionOverlay.classList.add('page-transition-overlay');
          document.body.appendChild(transitionOverlay);

          // Wait for overlay to fade in, then navigate
          setTimeout(() => {
            window.location.href = targetHref;
          }, 400);
        }
      });
    });

    // Handle page load animations
    window.addEventListener('load', () => {
      // Add a small delay to allow the DOM to settle
      setTimeout(() => {
        this.animatePageEntrance();
      }, 100);
    });

    // Add page entrance animation
    this.animatePageEntrance();
  }

  animatePageEntrance() {
    // Animate entrance for elements with animate-on-load class
    const entranceElements = document.querySelectorAll('.animate-on-load');
    if (entranceElements && entranceElements.length > 0) {
      entranceElements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add('visible');
        }, 100 + (index * 100));
      });
    }
  }

  setupScrollAnimations() {
    // Set initial states for animated elements
    if (this.animatedElements && this.animatedElements.length > 0) {
      this.animatedElements.forEach(element => {
        // Set initial opacity and transform
        element.style.opacity = '0';
        element.style.transform = 'translateY(40px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      });
    }
  }

  animateElementsInView() {
    // Add a check to ensure this.animatedElements exists before calling forEach
    if (this.animatedElements && this.animatedElements.length > 0) {
      this.animatedElements.forEach(element => {
        if (this.isElementInViewport(element) && !element.classList.contains('animated')) {
          element.classList.add('animated');
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    }
  }

  isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Element is considered in viewport when it's top is within the bottom 80% of the screen
    return rect.top <= windowHeight * 0.8;
  }

  // Helper function to add delay to animations
  static setDelay(element, delay) {
    element.style.transitionDelay = `${delay}ms`;
  }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Animations();
});

export default Animations;
