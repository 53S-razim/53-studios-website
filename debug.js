// Debug utility for 53Studios website

(function() {
  // Debug log container
  let debugContainer;
  
  // Initialize
  function init() {
    console.log('Debug mode initialized');
    
    // Create debug container if it doesn't exist
    if (!document.getElementById('debug-info')) {
      debugContainer = document.createElement('div');
      debugContainer.id = 'debug-info';
      debugContainer.className = 'debug-info';
      debugContainer.innerHTML = '<strong>DEBUG MODE</strong>';
      document.body.appendChild(debugContainer);
    } else {
      debugContainer = document.getElementById('debug-info');
    }
    
    // Log initial info
    log('Debug initialized');
    logEnvironmentInfo();
    
    // Add click handler to toggle visibility
    debugContainer.addEventListener('click', function() {
      debugContainer.classList.toggle('minimized');
    });
    
    // Force loader to finish loading after timeout
    setTimeout(forceLoaderToFinish, 5000);
  }
  
  // Log message to debug console and browser console
  function log(message) {
    if (debugContainer) {
      const time = new Date().toLocaleTimeString();
      debugContainer.innerHTML += `<br>${time}: ${message}`;
      debugContainer.scrollTop = debugContainer.scrollHeight;
    }
    console.log(`DEBUG: ${message}`);
  }
  
  // Log environment information
  function logEnvironmentInfo() {
    log(`User Agent: ${navigator.userAgent}`);
    log(`Viewport: ${window.innerWidth}x${window.innerHeight}`);
    log(`Scripts loaded: ${document.scripts.length}`);
    
    // Check loader element
    const loader = document.querySelector('.loader');
    if (loader) {
      log('Loader element found');
    } else {
      log('WARNING: Loader element not found');
    }
    
    // Check cursor elements
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOuter = document.getElementById('cursor-outer');
    if (cursorDot && cursorOuter) {
      log('Cursor elements found');
    } else {
      log('WARNING: Cursor elements not found');
    }
  }
  
  // Force loader to finish if it's stuck
  function forceLoaderToFinish() {
    const loader = document.querySelector('.loader');
    if (loader && window.getComputedStyle(loader).display !== 'none') {
      log('FIXING: Forcing loader to finish');
      
      // Force progress to 100
      const counter = document.querySelector('.loader-counter');
      if (counter) counter.textContent = '100';
      
      // Hide loader
      loader.classList.add('finished');
      
      setTimeout(() => {
        loader.style.display = 'none';
        document.body.style.overflow = 'auto';
        log('Loader has been forcibly hidden');
      }, 600);
    }
  }
  
  // Expose debug functions to global scope
  window.debugUtils = {
    log: log,
    forceLoaderToFinish: forceLoaderToFinish
  };
  
  // Initialize when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
