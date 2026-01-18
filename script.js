/* ========================================
   MR WARNN - Portfolio JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });

    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1500);
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            backToTop.classList.add('visible');
        } else {
            navbar.classList.remove('scrolled');
            backToTop.classList.remove('visible');
        }
    });

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Typing Effect
    const typedText = document.querySelector('.typed-text');
    const phrases = [
        'Tourism Enthusiast',
        'Event Planner',
        'Business Strategist',
        'Cultural Explorer',
        'MFU Student'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typedText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before next phrase
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();

    // Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    };

    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => counterObserver.observe(stat));

    // Skill Progress Animation
    const skillProgress = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillProgress.forEach(skill => skillObserver.observe(skill));

    // Gallery Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                } else {
                    item.classList.add('hidden');
                    setTimeout(() => {
                        if (item.classList.contains('hidden')) {
                            item.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    });

    // Lightbox Functionality
    const images = [
        'images/IMG_4111.JPG',
        'images/IMG_7420.JPG',
        'images/IMG_8176.JPEG',
        'images/IMG_8479.JPG'
    ];
    let currentImageIndex = 0;

    window.openLightbox = function(index) {
        currentImageIndex = index;
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        
        lightboxImg.src = images[index];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeLightbox = function() {
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    window.changeSlide = function(direction) {
        currentImageIndex += direction;
        
        if (currentImageIndex >= images.length) {
            currentImageIndex = 0;
        } else if (currentImageIndex < 0) {
            currentImageIndex = images.length - 1;
        }

        const lightboxImg = document.getElementById('lightbox-img');
        lightboxImg.src = images[currentImageIndex];
    };

    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    });

    // Close lightbox when clicking outside image
    document.getElementById('lightbox').addEventListener('click', (e) => {
        if (e.target.id === 'lightbox') {
            closeLightbox();
        }
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Simple form validation feedback
        const btn = contactForm.querySelector('.btn-submit');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
        btn.disabled = true;

        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
            btn.style.background = 'linear-gradient(135deg, #059669 0%, #10b981 100%)';
            
            // Reset form
            contactForm.reset();

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        }, 2000);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect for floating elements
    window.addEventListener('mousemove', (e) => {
        const floatingItems = document.querySelectorAll('.floating-item');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        floatingItems.forEach((item, index) => {
            const speed = (index + 1) * 10;
            const xMove = (x - 0.5) * speed;
            const yMove = (y - 0.5) * speed;
            item.style.transform = `translate(${xMove}px, ${yMove}px)`;
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Intersection Observer for reveal animations
    const revealElements = document.querySelectorAll('.info-card, .skill-item, .gallery-item, .contact-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        revealObserver.observe(el);
    });

    console.log('🌴 Welcome to Mr Warnn\'s Portfolio!');
    console.log('🇹🇭 Tourism, Business & Events @ Mae Fah Luang University');
});
