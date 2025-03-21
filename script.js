// Global function to close menu
function closeMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuOverlay = document.getElementById('menu-overlay');
    
    if (menuOverlay) {
        console.log("Closing menu from global function");
        menuOverlay.classList.remove('active');
        
        // Re-enable scrolling
        document.body.style.overflow = '';
        
        // Make menu button visible again
        if (menuToggle) {
            setTimeout(() => {
                menuToggle.style.opacity = '1';
                menuToggle.style.visibility = 'visible';
            }, 600);
        }
    }
}

// Global function to close quote modal
function closeQuoteModal() {
    const quoteModal = document.getElementById('quote-modal');
    if (quoteModal) {
        quoteModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Loading animation and page initialization
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const progressCounter = document.getElementById('progress-counter');
    
    // Only show loading when clicking on home link or first visit
    const isHomePage = window.location.pathname === '/' || 
                       window.location.pathname.endsWith('index.html') ||
                       window.location.pathname.endsWith('/');
    
    if (isHomePage && loader && progressCounter) {
        // Show loader
        loader.style.display = 'flex';
        
        let progress = 0;
        // Make loading faster (change interval from 30ms to 20ms)
        const interval = setInterval(() => {
            // Accelerate progress a bit
            progress += 1.5;
            progressCounter.textContent = Math.floor(progress);
            
            // Force display of at least one image
            const allImages = document.querySelectorAll('.loader-image');
            if (allImages.length > 0) {
                const activeIndex = Math.min(Math.floor((progress / 100) * allImages.length), allImages.length - 1);
                
                allImages.forEach((img, i) => {
                    if (i === activeIndex) {
                        img.classList.add('active');
                    } else {
                        img.classList.remove('active');
                    }
                });
            }
            
            if (progress >= 100) {
                clearInterval(interval);
                
                // Hide loader
                setTimeout(() => {
                    loader.style.opacity = '0';
                    loader.style.pointerEvents = 'none';
                    
                    setTimeout(() => {
                        loader.style.display = 'none';
                        
                        // Trigger initial animation
                        document.querySelectorAll('.initial-animate').forEach(el => {
                            el.classList.add('active');
                        });
                        
                        // Animate split title if on homepage
                        if (document.querySelector('.split-title-container')) {
                            animateSplitTitle();
                        }
                    }, 400); // Reduced from 500ms for faster transition
                }, 200); // Reduced from 300ms for faster transition
            }
        }, 20); // Faster interval (was 30ms)
        
        // Fallback
        setTimeout(() => {
            if (loader && loader.style.display !== 'none') {
                clearInterval(interval);
                loader.style.display = 'none';
                
                // Trigger initial animation
                document.querySelectorAll('.initial-animate').forEach(el => {
                    el.classList.add('active');
                });
                
                // Animate split title if on homepage
                if (document.querySelector('.split-title-container')) {
                    animateSplitTitle();
                }
            }
        }, 4000); // Slightly reduced from 5000ms
    } else if (loader) {
        // Not homepage, hide loader immediately
        loader.style.display = 'none';
        
        // Trigger initial animation immediately
        setTimeout(() => {
            document.querySelectorAll('.initial-animate').forEach(el => {
                el.classList.add('active');
            });
        }, 100);
    }

// Split title animation function
    function animateSplitTitle() {
        const leftTitle = document.querySelector('.left-title .main-title');
        const rightTitle = document.querySelector('.right-title .main-title');
        
        if (leftTitle && rightTitle) {
            setTimeout(() => {
                leftTitle.classList.add('animate');
            }, 300);
            
            setTimeout(() => {
                rightTitle.classList.add('animate');
            }, 600);
        }
    }
    
    // Menu toggle with X button - Simplified to ensure X button works
    const menuToggle = document.getElementById('menu-toggle');
    const menuOverlay = document.getElementById('menu-overlay');
    const closeButton = document.getElementById('close-button');

    if (menuToggle && menuOverlay) {
        // Open menu
        menuToggle.addEventListener('click', function() {
            console.log("Opening menu");
            menuOverlay.classList.add('active');
            // Hide menu button
            menuToggle.style.opacity = '0';
            menuToggle.style.visibility = 'hidden';
            // Disable scrolling
            document.body.style.overflow = 'hidden';
        });
        
        // Close menu with fallback inline handler
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                console.log("Close button clicked via listener");
                closeMenu(); // Call the global function
            });
        }
        
        // Add document click handler to close if clicking outside
        document.addEventListener('click', function(e) {
            // If menu is active and click target is the overlay (not its children)
            if (menuOverlay.classList.contains('active') && e.target === menuOverlay) {
                console.log("Clicking outside menu content");
                closeMenu();
            }
        });
    }

    // Get Quote button functionality
    const getQuoteButton = document.getElementById('get-quote-button');
    const quoteModal = document.getElementById('quote-modal');
    const quoteCloseButton = document.getElementById('quote-close-button');
    
    if (getQuoteButton && quoteModal) {
        getQuoteButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Get Quote button clicked");
            
            // Close menu first
            closeMenu();
            
            // After menu closes, open quote modal
            setTimeout(() => {
                quoteModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }, 600);
        });
    }
    
    if (quoteCloseButton) {
        quoteCloseButton.addEventListener('click', function() {
            closeQuoteModal();
        });
    }

// Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const company = document.getElementById('company').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            // For demo purposes, just show a success message
            contactForm.innerHTML = `
                <div class="form-success">
                    <h2 class="form-success-title">Thank you for your message!</h2>
                    <p class="form-success-text">We've received your inquiry and will get back to you soon.</p>
                </div>
            `;
            
            console.log('Form submitted:', { name, email, company, message });
        });
    }

// Custom cursor with 3D effect - adjusted size and position
const initCustomCursor = () => {
    // Don't add custom cursor on touch devices
    if ('ontouchstart' in window) return;
    
    // Create cursor element if it doesn't exist
    if (!document.querySelector('.cursor-circle')) {
        const cursorCircle = document.createElement('div');
        cursorCircle.className = 'cursor-circle';
        document.body.appendChild(cursorCircle);
        document.body.classList.add('has-custom-cursor');
    }
    
    // Initialize cursor movement
    const cursorCircle = document.querySelector('.cursor-circle');
    let mouseX = 0;
    let mouseY = 0;
    let circleX = 0;
    let circleY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Enhanced hover effect with more dramatic cursor changes
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .project-item, .menu-link, .clickable, input, textarea');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
            el.classList.add('element-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
            el.classList.remove('element-hover');
        });
    });
    
    const updateCursor = () => {
        // Slower movement for cursor (following the mouse tip)
        circleX += (mouseX - circleX) * 0.12;
        circleY += (mouseY - circleY) * 0.12;
        
        if (cursorCircle) {
            cursorCircle.style.transform = `translate(${circleX}px, ${circleY}px)`;
        }
        
        requestAnimationFrame(updateCursor);
    };
    
    requestAnimationFrame(updateCursor);
};

// Menu link hover animations with enhanced effects
    const initMenuHoverEffects = () => {
        const menuLinks = document.querySelectorAll('.menu-link');
        
        menuLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                // Add hover class to current item
                link.classList.add('menu-link-hover');
                
                // Add dim class to all other menu items
                menuLinks.forEach(otherLink => {
                    if (otherLink !== link) {
                        otherLink.classList.add('menu-link-dim');
                    }
                });
            });
            
            link.addEventListener('mouseleave', () => {
                // Remove hover class from current item
                link.classList.remove('menu-link-hover');
                
                // Remove dim class from all items
                menuLinks.forEach(otherLink => {
                    otherLink.classList.remove('menu-link-dim');
                });
            });
        });
    };

    // Enhanced page transitions
    const initPageTransitions = () => {
        // Create transition element
        const transitionEl = document.createElement('div');
        transitionEl.className = 'page-transition';
        document.body.appendChild(transitionEl);
        
        // Add click handlers to all internal links with enhanced animation
        document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"], a[href$=".html"]').forEach(link => {
            // Skip links that should open in new tabs or external links
            if (link.getAttribute('target') === '_blank' || link.getAttribute('rel') === 'external' ||
                link.classList.contains('get-quote-link')) { // Skip quote links
                return;
            }
            
            link.addEventListener('click', e => {
                const href = link.getAttribute('href');
                
                // Skip anchor links
                if (href.startsWith('#')) {
                    return;
                }
                
                e.preventDefault();
                
                // More dramatic animation for clicked links
                link.classList.add('link-clicked');
                
                // Trigger transition animation
                transitionEl.classList.add('active');
                
                // Navigate to new page after animation
                setTimeout(() => {
                    window.location.href = href;
                }, 800); // Longer delay for more dramatic transition
            });
        });
        
        // Animate transition out when page loads
        if (document.readyState === 'complete') {
            transitionEl.classList.add('exit');
        } else {
            window.addEventListener('load', () => {
                transitionEl.classList.add('exit');
            });
        }
    };

    // Smooth scroll and animations with enhanced effects
    const initScrollAnimations = () => {
        // Add animation classes to elements
        document.querySelectorAll('.title:not(.initial-animate):not(.main-title)').forEach(el => {
            el.classList.add('fade-in-up');
        });
        
        document.querySelectorAll('.intro-text:not(.initial-animate)').forEach(el => {
            el.classList.add('fade-in-up');
        });
        
        document.querySelectorAll('.section-header').forEach(el => {
            el.classList.add('fade-in-up');
        });
        
        document.querySelectorAll('.project-item').forEach(el => {
            el.classList.add('scale-in');
            el.classList.add('stagger-item');
        });
        
        document.querySelectorAll('.about-title:not(.initial-animate)').forEach(el => {
            el.classList.add('fade-in-up');
        });
        
        document.querySelectorAll('.about-text:not(.initial-animate)').forEach(el => {
            el.classList.add('fade-in-up');
        });
        
        document.querySelectorAll('.contact-title:not(.initial-animate), .contact-email:not(.initial-animate), .contact-description:not(.initial-animate)').forEach(el => {
            el.classList.add('fade-in-up');
        });
        
        // Check for elements in viewport with enhanced effects
        const checkInView = () => {
            const animatedElements = document.querySelectorAll('.fade-in-up:not(.initial-animate), .scale-in:not(.initial-animate)');
            const windowHeight = window.innerHeight;
            
            animatedElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                const triggerPoint = windowHeight * 0.85;
                
                if (rect.top <= triggerPoint) {
                    el.classList.add('visible');
                    
                    // Add additional animation class for more drama
                    setTimeout(() => {
                        el.classList.add('animate-complete');
                    }, 500);
                }
            });
        };
        
        // Listen for scroll events
        window.addEventListener('scroll', checkInView);
        
        // Initial check for elements in view
        setTimeout(checkInView, 500);
    };

    // Initialize all features
    initCustomCursor();
    initScrollAnimations();
    initMenuHoverEffects();
    initPageTransitions();
    
    // Add 'active' class to initial-animate elements after a delay
    setTimeout(() => {
        document.querySelectorAll('.initial-animate').forEach(el => {
            el.classList.add('active');
        });
    }, 800);
});

// Add this to your script.js file
document.addEventListener('DOMContentLoaded', function() {
    // More Projects button functionality
    const loadMoreButton = document.getElementById('load-more-projects');
    const hiddenProjects = document.getElementById('hidden-projects');
    
    if (loadMoreButton && hiddenProjects) {
        loadMoreButton.addEventListener('click', function() {
            // Show hidden projects with animation
            hiddenProjects.classList.add('visible');
            
            // Animate new projects into view
            setTimeout(() => {
                const newProjects = hiddenProjects.querySelectorAll('.project-row');
                newProjects.forEach((project, index) => {
                    setTimeout(() => {
                        project.classList.add('animate');
                    }, index * 200);
                });
                
                // Hide the button after animation
                loadMoreButton.style.opacity = '0';
                setTimeout(() => {
                    loadMoreButton.style.display = 'none';
                }, 300);
            }, 100);
        });
    }
// Logo animation initialization
function initLogoAnimation() {
    const logoContainer = document.getElementById('logo-animation');
    if (!logoContainer) return;
    
    // Download and save the JSON file to your project first
    const logoAnimation = lottie.loadAnimation({
        container: logoContainer,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: '53-studios-logo.json' // You'll need to download and save the JSON file with this name
    });
    
    // Set animation to final frame initially (where it shows "53 Studios")
    logoAnimation.addEventListener('DOMLoaded', () => {
        logoAnimation.goToAndStop(logoAnimation.totalFrames - 20, true);
    });
    
    // Play animation on hover
    const logoLink = document.querySelector('.logo');
    logoLink.addEventListener('mouseenter', () => {
        logoAnimation.goToAndPlay(0, true);
    });
}

// Call initialization
initLogoAnimation();

});