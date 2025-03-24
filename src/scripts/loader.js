// Loader animation script
class Loader {
  constructor() {
    this.loader = document.querySelector('.loader');
    this.loaderNumber = document.querySelector('.loader-number');
    this.loaderText = document.querySelector('.loader-text');
    this.images = document.querySelectorAll('.loader-visual-img');
    this.currentImage = 0;
    this.progress = 0;
    this.isLoading = true;
    this.loadingSpeed = 25; // Speed of loading progress

    // Only show the loader on the first visit ever, not just session
    const hasVisitedEver = localStorage.getItem('hasVisitedEver');

    if (!hasVisitedEver && this.loader) {
      // First time ever visiting the site
      this.init();
      // Mark that the user has visited the site ever
      localStorage.setItem('hasVisitedEver', 'true');
    } else if (this.loader) {
      // Hide the loader immediately without animation for all future visits
      this.loader.style.display = 'none';
      document.body.style.overflow = 'auto';

      // Trigger animations immediately
      setTimeout(() => {
        this.animateElements();
      }, 100);
    }
  }

  init() {
    // Position loader elements to match Studio Olimpo
    if (this.loaderText && this.loaderNumber) {
      this.loaderText.style.position = 'absolute';
      this.loaderText.style.top = '2rem';
      this.loaderText.style.left = '2rem';

      this.loaderNumber.style.position = 'absolute';
      this.loaderNumber.style.top = '2rem';
      this.loaderNumber.style.right = '2rem';
    }

    // Start with the first image visible if images exist
    if (this.images && this.images.length > 0) {
      this.images[0].classList.add('active');
    } else {
      console.warn('No loader images found');
    }

    // Start the loading animation
    this.startLoading();

    // Preload images to ensure smooth transitions
    this.preloadImages();
  }

  preloadImages() {
    if (!this.images || this.images.length === 0) return;

    const imageUrls = Array.from(this.images).map(img => img.src);
    imageUrls.forEach(url => {
      if (url) {
        const img = new Image();
        img.src = url;

        // Handle image loading errors
        img.onerror = () => {
          console.warn(`Failed to preload image: ${url}`);
        };
      }
    });
  }

  startLoading() {
    // Simulate loading progress
    const interval = setInterval(() => {
      if (this.progress >= 100) {
        clearInterval(interval);
        // Wait a moment before hiding the loader
        setTimeout(() => {
          this.hideLoader();
        }, 500);
      } else {
        this.progress++;
        if (this.loaderNumber) {
          this.loaderNumber.textContent = this.progress;
        }

        // Change image at certain progress points if images exist
        if (this.images && this.images.length > 1) {
          if (this.progress === 25) {
            this.changeImage();
          } else if (this.progress === 50) {
            this.changeImage();
          } else if (this.progress === 75) {
            this.changeImage();
          }
        }
      }
    }, this.loadingSpeed);
  }

  changeImage() {
    // Check if the images exist and index is valid before changing
    if (!this.images || this.images.length === 0) return;

    // Hide current image
    if (this.currentImage >= 0 && this.currentImage < this.images.length) {
      this.images[this.currentImage].classList.remove('active');
    }

    // Move to next image or back to first
    this.currentImage = (this.currentImage + 1) % this.images.length;

    // Show new image
    this.images[this.currentImage].classList.add('active');
  }

  hideLoader() {
    if (this.loader) {
      this.loader.classList.add('hidden');

      // After animation completes, set display to none
      setTimeout(() => {
        this.loader.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling

        // Trigger initial animations on visible elements
        this.animateElements();
      }, 600);
    }
  }

  animateElements() {
    // Add animation classes to elements that should animate in
    const animateElements = document.querySelectorAll('.animate-on-load');
    if (animateElements && animateElements.length > 0) {
      animateElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('animate');
        }, 100 * index); // Stagger the animations
      });
    }
  }
}

// Initialize loader when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Loader();
});

export default Loader;
