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
    
    // Menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const menuOverlay = document.getElementById('menu-overlay');
    
    if (menuToggle && menuOverlay) {
        menuToggle.addEventListener('click', () => {
            if (menuOverlay.style.display === 'flex') {
                menuOverlay.style.opacity = '0';
                setTimeout(() => {
                    menuOverlay.style.display = 'none';
                    menuToggle.textContent = 'MENU';
                }, 300);
            } else {
                menuOverlay.style.display = 'flex';
                setTimeout(() => {
                    menuOverlay.style.opacity = '1';
                    menuToggle.textContent = 'CLOSE';
                }, 10);
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

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    
    // Initial check for elements in view
    setTimeout(animateOnScroll, 800);
});