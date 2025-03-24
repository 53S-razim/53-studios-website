// Navigation script to handle menu animations
class Navigation {
  constructor() {
    this.menuButton = document.querySelector('[data-menu-toggle]');
    this.menuOverlay = document.querySelector('.menu-overlay');
    this.closeButton = document.querySelector('.close-button');
    this.menuLinks = document.querySelectorAll('.menu-link:not(.get-quote-button)'); // Exclude the quote button
    this.quoteButton = document.querySelector('.get-quote-button');
    this.body = document.body;
    this.isMenuOpen = false;

    // Ensure the body has the page-loaded class
    document.body.classList.add('page-loaded');

    // Ensure any loaders are properly hidden
    const loader = document.querySelector('.loader');
    if (loader) {
      loader.classList.add('hidden');
      loader.style.display = 'none';
    }

    // Set a class on the menu overlay to ensure cursor shows correctly
    if (this.menuOverlay) {
      this.menuOverlay.classList.add('dark-background');
    }

    // Only initialize if the menu elements exist
    if (this.menuButton && this.menuOverlay) {
      this.init();
    } else {
      console.warn('Menu elements not found');
    }
  }

  init() {
    // Add event listeners
    if (this.menuButton) {
      this.menuButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleMenu();
      });
    }

    if (this.closeButton) {
      this.closeButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.closeMenu();
      });
    }

    // Add click events for menu links if they exist
    // These should navigate to different pages
    if (this.menuLinks && this.menuLinks.length > 0) {
      this.menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          // Don't prevent default here to allow navigation
          this.closeMenu();
        });
      });
    }

    // Handle escape key to close menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMenu();
      }
    });
  }

  toggleMenu() {
    if (this.isMenuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    if (this.menuOverlay) {
      this.menuOverlay.classList.add('active');
      this.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
      this.isMenuOpen = true;

      // Animate in menu items
      this.animateMenuItems(true);
    }
  }

  closeMenu() {
    if (this.menuOverlay) {
      // Animate out menu items first
      this.animateMenuItems(false);

      // Then hide the menu
      setTimeout(() => {
        this.menuOverlay.classList.remove('active');
        this.body.style.overflow = ''; // Enable scrolling
        this.isMenuOpen = false;
      }, 300);
    }
  }

  animateMenuItems(isEntering) {
    // Check if menu links exist before animating
    if (!this.menuLinks || this.menuLinks.length === 0) return;

    // Reset all menu items first
    if (!isEntering) {
      this.menuLinks.forEach(link => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
      });

      if (this.quoteButton) {
        this.quoteButton.style.opacity = '0';
        this.quoteButton.style.transform = 'translateY(20px)';
      }
      return;
    }

    // Stagger the entrance of menu items
    this.menuLinks.forEach((link, index) => {
      setTimeout(() => {
        link.style.opacity = '1';
        link.style.transform = 'translateY(0)';
      }, 100 * (index + 1));
    });

    // Also animate the quote button if it exists
    if (this.quoteButton) {
      setTimeout(() => {
        this.quoteButton.style.opacity = '1';
        this.quoteButton.style.transform = 'translateY(0)';
      }, 100 * (this.menuLinks.length + 1));
    }
  }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Navigation();

  // Add an additional check to ensure the body has the page-loaded class
  setTimeout(() => {
    if (!document.body.classList.contains('page-loaded')) {
      document.body.classList.add('page-loaded');
    }

    // Ensure any loaders are properly hidden
    const loader = document.querySelector('.loader');
    if (loader) {
      loader.classList.add('hidden');
      loader.style.display = 'none';
    }
  }, 500);
});

export default Navigation;
