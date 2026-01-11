/**
 * Custom cursor implementation inspired by studioolimpo.it
 * Feature a dot and larger circle that follow the mouse with smooth animation
 */

export class Cursor {
  constructor() {
    this.cursor = document.getElementById('cursor-dot');
    this.menuButton = document.getElementById('menu-button');
    this.menuOverlay = document.getElementById('menu-overlay');
    this.quoteModal = document.getElementById('quote-modal');
    
    if (this.cursor) {
      this.init();
    }
  }

  init() {
    // Only initialize cursor for desktop
    if (window.innerWidth > 768) {
      document.addEventListener('mousemove', this.onMouseMove.bind(this));
      document.addEventListener('mousedown', this.onMouseDown.bind(this));
      document.addEventListener('mouseup', this.onMouseUp.bind(this));
      
      // Prevent cursor movement when menu is open
      if (this.menuButton) {
        this.menuButton.addEventListener('click', () => {
          this.cursor.style.display = 'none';
        });
      }
      
      if (this.menuOverlay) {
        this.menuOverlay.addEventListener('click', () => {
          this.cursor.style.display = 'block';
        });
      }
      
      if (this.quoteModal) {
        this.quoteModal.addEventListener('click', () => {
          this.cursor.style.display = 'block';
        });
      }
    }
  }

  onMouseMove(e) {
    if (this.cursor && this.menuOverlay && this.quoteModal && 
        !this.menuOverlay.classList.contains('active') && 
        !this.quoteModal.classList.contains('active')) {
      this.cursor.style.left = e.clientX + 'px';
      this.cursor.style.top = e.clientY + 'px';
    }
  }

  onMouseDown() {
    if (this.cursor && this.menuOverlay && this.quoteModal && 
        !this.menuOverlay.classList.contains('active') && 
        !this.quoteModal.classList.contains('active')) {
      this.cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    }
  }

  onMouseUp() {
    if (this.cursor && this.menuOverlay && this.quoteModal && 
        !this.menuOverlay.classList.contains('active') && 
        !this.quoteModal.classList.contains('active')) {
      this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  }
} 