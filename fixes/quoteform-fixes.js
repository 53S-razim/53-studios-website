// Update the budget options and add mobile fixes to quoteFormMultistep.js

// 1. Update the budgets array when initializing the budget step:
/*
const budgets = [
  { id: 'basic', label: '₹5 Lakhs - ₹10 Lakhs' },
  { id: 'standard', label: '₹10 Lakhs - ₹25 Lakhs' },
  { id: 'premium', label: '₹25 Lakhs - ₹50 Lakhs' },
  { id: 'luxury', label: '₹50 Lakhs+' }
];
*/

// 2. Add this CSS to the init() method to fix mobile layout:
/*
// Fix for quote modal layout especially on mobile
const quoteCss = document.createElement('style');
quoteCss.textContent = `
  .quote-modal-container {
    position: relative;
    padding: 40px 30px 100px;
    max-width: 640px;
    margin: 4vh auto;
    border-radius: 12px;
    background-color: var(--color-background);
    color: var(--color-text);
    overflow-y: auto;
    max-height: 92vh;
    z-index: 100;
  }

  .quote-close-button {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 101;
  }

  .form-step {
    position: relative;
    padding-bottom: 130px; /* Space for fixed elements at bottom */
    min-height: 380px;
  }

  .form-progress-container {
    position: fixed;
    bottom: 60px;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: rgba(30, 28, 27, 0.1);
    z-index: 101;
  }

  .form-progress-bar {
    height: 100%;
    background-color: var(--color-text);
    transition: width 0.4s ease;
  }

  .form-buttons {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background-color: var(--color-background);
    border-top: 1px solid rgba(30, 28, 27, 0.1);
    z-index: 101;
  }

  /* Make sure the form displays properly on mobile */
  @media (max-width: 428px) {
    .quote-modal-container {
      max-height: 85vh;
      margin: 0;
      padding-top: 65px;
      padding-bottom: 120px;
      border-radius: 0;
      width: 100%;
    }

    .form-step h2 {
      margin-top: 0;
      font-size: 24px;
    }

    /* Always show form title by adding space at top */
    .form-step {
      padding-top: 20px;
    }

    .option-list,
    .option-grid {
      margin-top: 15px;
    }

    .form-progress-container {
      bottom: 70px;
    }

    .form-buttons {
      padding-bottom: 30px; /* Safari bottom bar compensation */
    }
  }
`;
document.head.appendChild(quoteCss);
*/
