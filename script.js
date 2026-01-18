// MR WARNN - Modern Three.js Portfolio JavaScript
// Tourism & Travel Vibes

document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger);

    // Three.js Background Animation
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;
        const posArray = new Float32Array(particlesCount * 3);
        
        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0x00b4d8,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Add some floating spheres
        const sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);
        const sphereMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xff6b6b,
            transparent: true,
            opacity: 0.3
        });
        
        const spheres = [];
        for (let i = 0; i < 20; i++) {
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial.clone());
            sphere.position.x = (Math.random() - 0.5) * 8;
            sphere.position.y = (Math.random() - 0.5) * 8;
            sphere.position.z = (Math.random() - 0.5) * 8;
            sphere.material.color.setHex(Math.random() > 0.5 ? 0x00b4d8 : 0xff6b6b);
            spheres.push(sphere);
            scene.add(sphere);
        }
        
        camera.position.z = 3;

        // Mouse movement
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            
            particlesMesh.rotation.x += 0.0005;
            particlesMesh.rotation.y += 0.0005;
            
            // Smooth camera movement
            camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
            camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
            
            // Animate spheres
            spheres.forEach((sphere, i) => {
                sphere.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
                sphere.rotation.x += 0.01;
                sphere.rotation.y += 0.01;
            });
            
            renderer.render(scene, camera);
        };
        
        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // Preloader
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.classList.remove('loading');
            animateHeroElements();
        }, 2500);
    });

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursor && cursorFollower) {
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
        });
        
        const animateCursor = () => {
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            followerX += (cursorX - followerX) * 0.1;
            followerY += (cursorY - followerY) * 0.1;
            
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateCursor);
        };
        
        animateCursor();
        
        // Hover effect
        const hoverElements = document.querySelectorAll('a, button, .magnetic');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorFollower.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hover'));
        });
    }

    // Hero Animations
    function animateHeroElements() {
        const heroElements = document.querySelectorAll('.hero .animate-in');
        
        gsap.to(heroElements, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });
    }

    // Typing Effect
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        const phrases = [
            'Tourism Enthusiast',
            'Event Planner',
            'Business Strategist',
            'Cultural Explorer',
            'TBE Student at MFU'
        ];
        
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;
        
        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typeSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500;
            }
            
            setTimeout(typeEffect, typeSpeed);
        }
        
        setTimeout(typeEffect, 3000);
    }

    // Navigation
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            backToTop.classList.add('visible');
        } else {
            navbar.classList.remove('scrolled');
            backToTop.classList.remove('visible');
        }
        
        // Active section highlight
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // Mobile toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle) navToggle.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        });
    });
    
    // Back to top
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                el.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                el.textContent = target;
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
    
    statNumbers.forEach(num => counterObserver.observe(num));

    // Skills Progress Animation
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => skillObserver.observe(bar));

    // GSAP Scroll Animations
    // Section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
    
    // About section
    const aboutImage = document.querySelector('.about-image-container');
    if (aboutImage) {
        gsap.from(aboutImage, {
            scrollTrigger: {
                trigger: '.about-grid',
                start: 'top 70%'
            },
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }
    
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        gsap.from(aboutContent, {
            scrollTrigger: {
                trigger: '.about-grid',
                start: 'top 70%'
            },
            x: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }
    
    // Info cards
    gsap.utils.toArray('.info-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%'
            },
            y: 30,
            opacity: 0,
            duration: 0.5,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });
    
    // Timeline items
    gsap.utils.toArray('.timeline-item').forEach((item) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%'
            },
            x: item.classList.contains('left') ? -50 : 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
    
    // Skills categories
    gsap.utils.toArray('.skills-category').forEach((cat, i) => {
        gsap.from(cat, {
            scrollTrigger: {
                trigger: cat,
                start: 'top 80%'
            },
            y: 50,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.15,
            ease: 'power3.out'
        });
    });
    
    // Language cards
    gsap.utils.toArray('.language-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: '.languages-grid',
                start: 'top 80%'
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
            delay: i * 0.1,
            ease: 'back.out(1.7)'
        });
    });
    
    // Gallery items
    gsap.utils.toArray('.gallery-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: '.gallery-grid',
                start: 'top 80%'
            },
            y: 50,
            opacity: 0,
            duration: 0.5,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });
    
    // Contact section
    const contactInfo = document.querySelector('.contact-info');
    if (contactInfo) {
        gsap.from(contactInfo, {
            scrollTrigger: {
                trigger: '.contact-wrapper',
                start: 'top 70%'
            },
            x: -50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    }
    
    const contactFormWrapper = document.querySelector('.contact-form-wrapper');
    if (contactFormWrapper) {
        gsap.from(contactFormWrapper, {
            scrollTrigger: {
                trigger: '.contact-wrapper',
                start: 'top 70%'
            },
            x: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    }

    // Gallery Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    gsap.to(item, { scale: 1, opacity: 1, duration: 0.3 });
                } else {
                    gsap.to(item, { 
                        scale: 0.8, 
                        opacity: 0, 
                        duration: 0.3,
                        onComplete: () => item.classList.add('hidden')
                    });
                }
            });
        });
    });

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-nav.prev');
    const lightboxNext = document.querySelector('.lightbox-nav.next');
    const galleryBtns = document.querySelectorAll('.gallery-btn');
    
    const images = [
        'images/IMG_4111.JPG',
        'images/IMG_7420.JPG',
        'images/IMG_8176.JPEG',
        'images/IMG_8479.JPG'
    ];
    
    let currentIndex = 0;
    
    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = images[index];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function changeSlide(direction) {
        currentIndex = (currentIndex + direction + images.length) % images.length;
        lightboxImg.src = images[currentIndex];
    }
    
    galleryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-index'));
            openLightbox(index);
        });
    });
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => changeSlide(-1));
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => changeSlide(1));
    }
    
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') changeSlide(-1);
        if (e.key === 'ArrowRight') changeSlide(1);
    });

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('.btn-submit');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<span class="btn-text">Sending...</span><span class="btn-icon"><i class="fas fa-spinner fa-spin"></i></span>';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = '<span class="btn-text">Message Sent!</span><span class="btn-icon"><i class="fas fa-check"></i></span>';
                btn.style.background = 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 2000);
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Magnetic Effect for Buttons
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(el, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.3,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });

    console.log('MR WARNN Portfolio - Tourism, Business & Events');
    console.log('Mae Fah Luang University');
});
