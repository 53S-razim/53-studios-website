// Loading animation
document.addEventListener('DOMContentLoaded', function() {
    let progress = 0;
    const progressCounter = document.getElementById('progress-counter');
    const loader = document.getElementById('loader');
    const images = [
        document.getElementById('loader-image-1'),
        document.getElementById('loader-image-2'),
        document.getElementById('loader-image-3'),
        document.getElementById('loader-image-4')
    ];
    
    if (progressCounter && loader && images.every(img => img)) {
        const interval = setInterval(() => {
            progress += 1;
            progressCounter.textContent = progress;
            
            const imageIndex = Math.floor((progress / 100) * images.length);
            
            images.forEach((img, i) => {
                if (i === imageIndex) {
                    img.classList.add('active');
                } else {
                    img.classList.remove('active');
                }
            });
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    loader.style.opacity = '0';
                    loader.style.pointerEvents = 'none';
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 500);
                }, 500);
            }
        }, 20);
    }
    
    // Improved menu toggle with animation
    const menuToggle = document.getElementById('menu-toggle');
    const menuOverlay = document.getElementById('menu-overlay');
    
    if (menuToggle && menuOverlay) {
        menuToggle.addEventListener('click', () => {
            if (menuOverlay.classList.contains('active')) {
                menuOverlay.classList.remove('active');
                menuToggle.textContent = 'MENU';
                // Re-enable scrolling
                document.body.style.overflow = '';
            } else {
                menuOverlay.classList.add('active');
                menuToggle.textContent = 'CLOSE';
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
        const interactiveElements = document.querySelectorAll('a, button, [role="button"], .project-item, .menu-link');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
        
        const updateCursor = () => {
            // Smooth dot movement
            dotX += (mouseX - dotX) * 0.2;
            dotY += (mouseY - dotY) * 0.2;
            
            // Smoother circle movement (lags behind dot slightly)
            circleX += (mouseX - circleX) * 0.1;
            circleY += (mouseY - circleY) * 0.1;
            
            cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
            cursorCircle.style.transform = `translate(${circleX}px, ${circleY}px)`;
            
            requestAnimationFrame(updateCursor);
        };
        
        requestAnimationFrame(updateCursor);
    };

    // Smooth scroll and animations
    const initScrollAnimations = () => {
        // Add animation classes to elements
        document.querySelectorAll('.title').forEach(el => {
            el.classList.add('fade-in-up');
        });
        
        document.querySelectorAll('.intro-text').forEach(el => {
            el.classList.add('fade-in-up');
        });
        
        document.querySelectorAll('.section-header').forEach(el => {
            el.classList.add('fade-in-up');
        });
        
        document.querySelectorAll('.project-item').forEach(el => {
            el.classList.add('scale-in');
            el.classList.add('stagger-item');
        });
        
        document.querySelectorAll('.about-title').forEach(el => {
            el.classList.add('fade-in-up');
        });
        
        document.querySelectorAll('.about-text').forEach(el => {
            el.classList.add('fade-in-up');
        });
        
        document.querySelectorAll('.contact-title, .contact-email, .contact-description').forEach(el => {
            el.classList.add('fade-in-up');
        });
        
        // Check for elements in viewport
        const checkInView = () => {
            const animatedElements = document.querySelectorAll('.fade-in-up, .scale-in');
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
});