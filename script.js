// Loading animation and page initialization
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const progressCounter = document.getElementById('progress-counter');
    
    // Only show loading screen on homepage
    const isHomePage = window.location.pathname === '/' || 
                      window.location.pathname === '/index.html' || 
                      window.location.pathname.endsWith('index.html');
    
    if (isHomePage && loader && progressCounter) {
        // Show loader
        loader.style.display = 'flex';
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += 1;
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
                    }, 500);
                }, 300);
            }
        }, 30);
        
        // Fallback
        setTimeout(() => {
            if (loader && loader.style.display !== 'none') {
                clearInterval(interval);
                loader.style.display = 'none';
                
                // Trigger initial animation
                document.querySelectorAll('.initial-animate').forEach(el => {
                    el.classList.add('active');
                });
            }
        }, 5000);
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
    
    // Updated menu toggle with animation
    const menuToggle = document.getElementById('menu-toggle');
    const menuOverlay = document.getElementById('menu-overlay');
    
    // Replace the menu toggle section in script.js
    if (menuToggle && menuOverlay) {
    	menuToggle.addEventListener('click', () => {
            if (menuOverlay.classList.contains('active')) {
            	// Menu is open and being closed
            	menuOverlay.classList.remove('active');
           	 menuToggle.textContent = 'MENU'; // Set text directly to MENU
            	// Re-enable scrolling
            	document.body.style.overflow = '';
            } else {
            	// Menu is closed and being opened
           	 menuOverlay.classList.add('active');
            	menuToggle.textContent = 'CLOSE'; // Set text directly to CLOSE
            	// Disable scrolling when menu is open
            	document.body.style.overflow = 'hidden';
            }
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
            
            // Here you would normally send data to a server
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

    // Custom cursor
    const initCustomCursor = () => {
        // Don't add custom cursor on touch devices
        if ('ontouchstart' in window) return;
        
        const cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        
        const cursorCircle = document.createElement('div');
        cursorCircle.className = 'cursor-circle';
        
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorCircle);
        document.body.classList.add('has-custom-cursor');
        
        let mouseX = 0;
        let mouseY = 0;
        let dotX = 0;
        let dotY = 0;
        let circleX = 0;
        let circleY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Add hover effect to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, [role="button"], .project-item, .menu-link, .clickable');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
        
        const updateCursor = () => {
            // Precise dot position
            dotX = mouseX;
            dotY = mouseY;
            
            // Much slower movement for circle
            circleX += (mouseX - circleX) * 0.08; // Significantly slower
            circleY += (mouseY - circleY) * 0.08; // Significantly slower
            
            cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
            cursorCircle.style.transform = `translate(${circleX}px, ${circleY}px)`;
            
            requestAnimationFrame(updateCursor);
        };
        
        requestAnimationFrame(updateCursor);
    };

    // Smooth scroll and animations
    const initScrollAnimations = () => {
        // Add animation classes to elements if they don't already have .initial-animate
        document.querySelectorAll('.title:not(.initial-animate)').forEach(el => {
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
        
        // Check for elements in viewport
        const checkInView = () => {
            const animatedElements = document.querySelectorAll('.fade-in-up:not(.initial-animate), .scale-in:not(.initial-animate)');
            const windowHeight = window.innerHeight;
            
            animatedElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                const triggerPoint = windowHeight * 0.85;
                
                if (rect.top <= triggerPoint) {
                    el.classList.add('visible');
                }
            });
        };
        
        // Listen for scroll events
        window.addEventListener('scroll', checkInView);
        
        // Initial check for elements in view
        setTimeout(checkInView, 500);
    };

    // Smooth page transitions
    const initPageTransitions = () => {
        // Create transition element
        const transitionEl = document.createElement('div');
        transitionEl.className = 'page-transition';
        document.body.appendChild(transitionEl);
        
        // Add click handlers to all internal links
        document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"], a[href$=".html"]').forEach(link => {
            // Skip links that should open in new tabs or external links
            if (link.getAttribute('target') === '_blank' || link.getAttribute('rel') === 'external') {
                return;
            }
            
            link.addEventListener('click', e => {
                const href = link.getAttribute('href');
                
                // Skip anchor links
                if (href.startsWith('#')) {
                    return;
                }
                
                e.preventDefault();
                
                // Trigger transition animation
                transitionEl.classList.add('active');
                
                // Navigate to new page after animation
                setTimeout(() => {
                    window.location.href = href;
                }, 600);
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

    // Initialize all features
    initCustomCursor();
    initScrollAnimations();
    initPageTransitions();
    
    // Add initial-animate classes programmatically if not already added in HTML
    if (document.querySelector('.title') && !document.querySelector('.title.initial-animate')) {
        const titleEl = document.querySelector('.title');
        titleEl.classList.add('initial-animate', 'delay-1');
        
        // Add to adjacent intro-text elements if they exist
        const introTextEls = document.querySelectorAll('.intro-text');
        if (introTextEls.length > 0) {
            introTextEls.forEach((el, index) => {
                el.classList.add('initial-animate', `delay-${index + 2}`);
            });
        }
    }
    
    // Add 'active' class to initial-animate elements after a delay
    setTimeout(() => {
        document.querySelectorAll('.initial-animate').forEach(el => {
            el.classList.add('active');
        });
    }, 800);
});