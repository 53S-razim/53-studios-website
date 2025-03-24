# 53 Studios Website Fixes

This folder contains fixes for the 53 Studios website issues. Follow the instructions below to apply these fixes.

## Issues Fixed

1. **Social Icon Alignment**
   - Proper spacing between social icons in footer and menu
   - Responsive sizing for mobile devices

2. **Quote Form Mobile Layout**
   - Fixed display on iPhone and other mobile devices
   - Updated budget options to "5-10Lakhs, 10-25Lakhs, 25-50Lakhs, 50Lakhs+"
   - Ensured the form is fully visible with proper scrolling

3. **More Projects Button**
   - Prevent page refresh when clicking "More Projects"

4. **404 Errors on Pages**
   - Fixed Netlify configuration to properly handle subpages

## How to Apply These Fixes

### 1. Fix Social Icons Alignment

Add the styles from `social-icons.css` to your `src/styles/main.css` file.

### 2. Fix Quote Form

In `src/scripts/quoteFormMultistep.js`:

1. Find the budgets array (around line 483) and replace it with:
```javascript
const budgets = [
  { id: 'basic', label: '₹5 Lakhs - ₹10 Lakhs' },
  { id: 'standard', label: '₹10 Lakhs - ₹25 Lakhs' },
  { id: 'premium', label: '₹25 Lakhs - ₹50 Lakhs' },
  { id: 'luxury', label: '₹50 Lakhs+' }
];
```

2. Add the CSS fixes from `quoteform-fixes.js` to the `init()` method (around line 50-60).

### 3. Fix More Projects Button

In `projects.html`, find the "More Projects" button and update it as shown in `more-projects-fix.html`.

### 4. Fix 404 Errors

Replace your `netlify.toml` file with the one provided in `netlify-config.toml`.

## After Applying the Fixes

1. Commit your changes:
```bash
git add .
git commit -m "Fix social icons, quote form, more projects button, and 404 errors"
git push
```

2. Check your Vercel deployment to make sure the changes are reflected.

## Notes

- If you continue to have issues with 404 errors, you may need to check your Vercel configuration as well.
- The CSS fix for the quote form is designed to work on both mobile and desktop views.
- For best results on mobile, test the website on actual devices or use device emulation in your browser.
