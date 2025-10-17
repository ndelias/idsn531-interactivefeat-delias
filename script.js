// Interactive Bio Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all elements with scroll-animate class
    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });

    // Add scroll-animate class to project cards (disabled to prevent hiding)
    // document.querySelectorAll('.project-card').forEach((card, index) => {
    //     card.classList.add('scroll-animate');
    //     card.style.animationDelay = `${index * 0.1}s`;
    // });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Interactive button click effects
    document.querySelectorAll('.interactive-button, .cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // Typing animation for hero greeting (disabled to preserve HTML structure)
    // The typing animation was interfering with the highlight spans
    // Keeping the fade-in animation instead for better visual effect

    // Add hover sound effect (optional - requires audio file)
    document.querySelectorAll('.interactive-button, .project-card').forEach(element => {
        element.addEventListener('mouseenter', function() {
            // Add subtle vibration effect on mobile
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }
        });
    });

    // Dynamic skill tag animation
    document.querySelectorAll('.skill-tag').forEach((tag, index) => {
        tag.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.6s ease-in-out';
        });
        
        tag.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });

    // Profile image click effect
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('click', function() {
            this.style.animation = 'pulse 0.6s ease-in-out';
            setTimeout(() => {
                this.style.animation = 'float 3s ease-in-out infinite';
            }, 600);
        });
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    body.loaded .hero-section {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero-section {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.8s ease;
    }
`;
document.head.appendChild(style);
