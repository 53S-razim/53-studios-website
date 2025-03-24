// Import styles
import './styles/main.css';
import './styles/fixes.css'; // Add the fixes CSS

// Import scripts
import './scripts/loader.js';
import './scripts/navigation.js';
import './scripts/animations.js';
import './scripts/quoteFormMultistep.js'; // Use the new multi-step form
import './scripts/projectPopup.js'; // Import the project popup script

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('53 Studios - Website Initialized');

  // Create and initialize the custom cursor if we're not on a touch device
  if (!('ontouchstart' in window)) {
    initCustomCursor();
  }
});

// Custom cursor similar to Studio Olimpo
function initCustomCursor() {
  // Create a single cursor element - just the ball
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);

  // Update cursor position on mouse move with slight lag for smooth effect
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Update cursor position with lag effect
  function updateCursorPosition() {
    const lagFactor = 0.15; // Lower = smoother/slower follow

    cursorX += (mouseX - cursorX) * lagFactor;
    cursorY += (mouseY - cursorY) * lagFactor;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    requestAnimationFrame(updateCursorPosition);
  }

  updateCursorPosition();

  // Handle cursor appearance on dark/light backgrounds
  // Create observer to detect when cursor moves over dark elements
  const darkElements = document.querySelectorAll('.menu-overlay, .quote-modal, .dark-background');

  // Function to check if cursor is over a dark element
  function isCursorOverDarkElement() {
    for (const element of darkElements) {
      const rect = element.getBoundingClientRect();
      if (
        mouseX >= rect.left &&
        mouseX <= rect.right &&
        mouseY >= rect.top &&
        mouseY <= rect.bottom &&
        window.getComputedStyle(element).display !== 'none' &&
        window.getComputedStyle(element).visibility !== 'hidden'
      ) {
        return true;
      }
    }
    return false;
  }

  // Check cursor position against dark elements continuously
  function updateCursorColor() {
    if (isCursorOverDarkElement()) {
      cursor.classList.add('on-dark');
    } else {
      cursor.classList.remove('on-dark');
    }

    requestAnimationFrame(updateCursorColor);
  }

  updateCursorColor();

  // Add active state on mouse down only - no hover effect
  document.addEventListener('mousedown', () => {
    cursor.classList.add('cursor-active');
  });

  document.addEventListener('mouseup', () => {
    cursor.classList.remove('cursor-active');
  });

  // Hide cursor when it leaves the window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });
}

// Add custom cursor styles directly to the document
const cursorStyles = document.createElement('style');
cursorStyles.textContent = `
  .custom-cursor {
    position: fixed;
    width: 8px;
    height: 8px;
    background-color: var(--color-text);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    opacity: 1;
    mix-blend-mode: exclusion; /* Makes it visible on all backgrounds */
  }

  /* White cursor on dark backgrounds */
  .custom-cursor.on-dark {
    background-color: white;
    mix-blend-mode: normal;
  }

  /* Active state only - no hover changes */
  .custom-cursor.cursor-active {
    transform: translate(-50%, -50%) scale(0.8);
  }

  /* Show normal cursor so the custom one complements it */
  body {
    cursor: auto;
  }

  /* All clickable elements should have pointer cursor */
  a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"]) {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .custom-cursor {
      display: none;
    }
  }
`;

document.head.appendChild(cursorStyles);
