// Interactive Bio Page JavaScript with jQuery
$(document).ready(function() {
    
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
    $(window).on('load', function() {
        $('body').addClass('loaded');
    });

    // Toggle project details with jQuery
    $('.toggle-details-btn').on('click', function() {
        const $button = $(this);
        const $details = $($button.attr('aria-controls'));
        const isExpanded = $button.attr('aria-expanded') === 'true';
        
        if (isExpanded) {
            $details.slideUp(300);
            $button.text('View Details').attr('aria-expanded', 'false');
        } else {
            $details.slideDown(300);
            $button.text('Hide Details').attr('aria-expanded', 'true');
        }
    });

    // Enhanced hover effects with jQuery
    $('.project-card').hover(
        function() {
            $(this).find('.toggle-details-btn').addClass('hover-effect');
        },
        function() {
            $(this).find('.toggle-details-btn').removeClass('hover-effect');
        }
    );

    // Keyboard navigation for toggle buttons
    $('.toggle-details-btn').on('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            $(this).click();
        }
    });

    // Image Slider functionality
    let currentSlide = 0;
    const slides = $('.slide');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.removeClass('active');
        slides.eq(index).addClass('active');
        $('.dot').removeClass('active');
        $('.dot').eq(index).addClass('active');
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prev);
    }

    // Slider controls
    $('#nextBtn').on('click', nextSlide);
    $('#prevBtn').on('click', prevSlide);

    // Dot navigation
    $('.dot').on('click', function() {
        const slideIndex = parseInt($(this).data('slide'));
        showSlide(slideIndex);
    });

    // Keyboard navigation for slider
    $(document).on('keydown', function(e) {
        if ($('.slider-container').is(':visible')) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
            }
        }
    });

    // Auto-play slider (optional - can be disabled)
    // setInterval(nextSlide, 5000);

    // Accessibility: Skip to main content
    $('body').prepend('<a href="#main-content" class="skip-link">Skip to main content</a>');
    
    // Accessibility: Focus management for modals and dynamic content
    $('.toggle-details-btn').on('click', function() {
        const $details = $($(this).attr('aria-controls'));
        if ($details.is(':visible')) {
            // Focus on the details content when expanded
            setTimeout(() => {
                $details.focus();
            }, 350);
        }
    });

    // Accessibility: Announce dynamic content changes
    function announceToScreenReader(message) {
        const announcement = $('<div class="sr-only" aria-live="polite" aria-atomic="true">' + message + '</div>');
        $('body').append(announcement);
        setTimeout(() => {
            announcement.remove();
        }, 1000);
    }

    // Enhanced slider with screen reader announcements
    function showSlideWithAnnouncement(index) {
        showSlide(index);
        const slideTitle = $('.slide').eq(index).find('h3').text();
        announceToScreenReader('Now showing: ' + slideTitle);
    }

    // Update slider functions to include announcements
    $('#nextBtn').off('click').on('click', function() {
        const next = (currentSlide + 1) % totalSlides;
        showSlideWithAnnouncement(next);
    });

    $('#prevBtn').off('click').on('click', function() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlideWithAnnouncement(prev);
    });

    $('.dot').off('click').on('click', function() {
        const slideIndex = parseInt($(this).data('slide'));
        showSlideWithAnnouncement(slideIndex);
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
