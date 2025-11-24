/**
 * Navigation script for 53Studios website
 * Handles menu interaction and navigation transitions
 */

export class Navigation {
  constructor() {
    this.menuButton = document.getElementById('menu-button');
    this.menuOverlay = document.getElementById('menu-overlay');
    this.menuCloseButton = document.getElementById('menu-close-button');
    this.menuQuoteButton = document.getElementById('menu-quote-button');
    this.getQuoteButton = document.getElementById('get-quote-button');
    this.quoteCtaButton = document.getElementById('quote-cta-button');
    this.quoteModal = document.getElementById('quote-modal');
    this.quoteCloseButton = document.getElementById('quote-close');
    this.cursorDot = document.getElementById('cursor-dot');

    // Project popup elements
    this.projectPopup = document.getElementById('project-popup');
    this.projectPopupClose = this.projectPopup?.querySelector('.project-popup-close');
    this.projectPopupOverlay = this.projectPopup?.querySelector('.project-popup-overlay');

    this.init();
  }

  init() {
    // Menu button click handler
    if (this.menuButton) {
      this.menuButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.openMenu();
      });
    }

    // Menu close button click handler
    if (this.menuCloseButton) {
      this.menuCloseButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.closeMenu();
      });
    }

    // Menu quote button click handler
    if (this.menuQuoteButton) {
      this.menuQuoteButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.closeMenu();
        this.openQuoteModal();
      });
    }

    // Get quote button click handler
    if (this.getQuoteButton) {
      this.getQuoteButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.openQuoteModal();
      });
    }

    // Quote CTA button click handler
    if (this.quoteCtaButton) {
      this.quoteCtaButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.openQuoteModal();
      });
    }

    // Quote close button click handler
    if (this.quoteCloseButton) {
      this.quoteCloseButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.closeQuoteModal();
      });
    }

    // Escape key handler
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.menuOverlay && this.menuOverlay.classList.contains('active')) {
          this.closeMenu();
        }
        if (this.quoteModal && this.quoteModal.classList.contains('active')) {
          this.closeQuoteModal();
        }
      }
    });

    // Initialize project popup event listeners
    this.initProjectPopup();
  }

  openMenu() {
    if (this.menuOverlay) {
      this.menuOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (this.cursorDot) {
        this.cursorDot.style.display = 'none';
      }
    }
  }

  closeMenu() {
    if (this.menuOverlay) {
      this.menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
      if (this.cursorDot) {
        this.cursorDot.style.display = 'block';
      }
    }
  }

  openQuoteModal() {
    if (this.quoteModal) {
      this.quoteModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (this.cursorDot) {
        this.cursorDot.style.display = 'none';
      }
    }
  }

  closeQuoteModal() {
    if (this.quoteModal) {
      this.quoteModal.classList.remove('active');
      document.body.style.overflow = '';
      if (this.cursorDot) {
        this.cursorDot.style.display = 'block';
      }
    }
  }

  initProjectPopup() {
    if (!this.projectPopup || !this.projectPopupClose || !this.projectPopupOverlay) return;

    // Add click event to project items
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        this.openProjectPopup();
      });
    });

    // Close popup when clicking close button or overlay
    this.projectPopupClose.addEventListener('click', () => this.closeProjectPopup());
    this.projectPopupOverlay.addEventListener('click', () => this.closeProjectPopup());

    // Close popup when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.projectPopup.classList.contains('active')) {
        this.closeProjectPopup();
      }
    });
  }

  openProjectPopup() {
    if (!this.projectPopup) return;
    this.projectPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeProjectPopup() {
    if (!this.projectPopup) return;
    this.projectPopup.classList.remove('active');
    document.body.style.overflow = '';
  }
}
