// Script to handle project popup functionality
class ProjectPopup {
  constructor() {
    this.popup = document.getElementById('project-popup');
    this.overlay = document.querySelector('.popup-overlay');
    this.closeButton = document.querySelector('.popup-close-button');
    this.okButton = document.querySelector('.popup-button');
    this.projectLinks = document.querySelectorAll('.project-item, .project-showcase');

    this.init();
  }

  init() {
    // Attach click event to all project links
    if (this.projectLinks && this.projectLinks.length > 0) {
      this.projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.openPopup();
        });
      });
    }

    // Close popup when close button is clicked
    if (this.closeButton) {
      this.closeButton.addEventListener('click', () => {
        this.closePopup();
      });
    }

    // Close popup when OK button is clicked
    if (this.okButton) {
      this.okButton.addEventListener('click', () => {
        this.closePopup();
      });
    }

    // Close popup when overlay is clicked
    if (this.overlay) {
      this.overlay.addEventListener('click', () => {
        this.closePopup();
      });
    }

    // Close popup when ESC key is pressed
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.popup && this.popup.classList.contains('active')) {
        this.closePopup();
      }
    });
  }

  openPopup() {
    if (this.popup) {
      this.popup.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
    }
  }

  closePopup() {
    if (this.popup) {
      this.popup.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }
  }
}

// Initialize the project popup functionality
document.addEventListener('DOMContentLoaded', () => {
  new ProjectPopup();
});

export default ProjectPopup;
