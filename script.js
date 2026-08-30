document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // ==========================================================================
    // STICKY HEADER
    // ==========================================================================
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================================================
    // MOBILE NAVIGATION
    // ==========================================================================
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileNavToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const icon = mobileNavToggle.querySelector('i');
        
        // Toggle menu and close icons
        if (navMenu.classList.contains('open')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                mobileNavToggle.querySelector('i').setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    });

    // ==========================================================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ==========================================================================
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeObserverOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Stop observing once it appears
            }
        });
    }, fadeObserverOptions);

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // ==========================================================================
    // ACTIVE NAVIGATION LINK ON SCROLL
    // ==========================================================================
    const sections = document.querySelectorAll('section');
    
    const navObserverOptions = {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px' // adjust based on header height
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // ==========================================================================
    // CONTACT FORM HANDLING (Mailto Link Generation)
    // ==========================================================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            const recipient = 'iskydwi.aprilianto442@gmail.com';
            
            const emailSubject = encodeURIComponent(`[Portofolio Kontak] ${subject}`);
            const emailBody = encodeURIComponent(
                `Nama Pengirim: ${name}\n` +
                `Email Pengirim: ${email}\n\n` +
                `Pesan:\n${message}`
            );
            
            // Generate mailto link and open it
            const mailtoUrl = `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;
            
            // Open user's default email client
            window.location.href = mailtoUrl;
            
            // Reset form
            contactForm.reset();
        });
    }

    // ==========================================================================
    // CAROUSEL GALLERY LOGIC
    // ==========================================================================
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (track && prevBtn && nextBtn && dotsContainer) {
        const slides = Array.from(track.children);
        const dots = Array.from(dotsContainer.children);
        let currentSlideIndex = 0;
        const totalSlides = slides.length;
        
        const updateCarousel = (index) => {
            currentSlideIndex = index;
            // Slide translation
            track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
            
            // Update dots
            dots.forEach((dot, idx) => {
                if (idx === currentSlideIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };
        
        // Next button click
        nextBtn.addEventListener('click', () => {
            let nextIndex = (currentSlideIndex + 1) % totalSlides;
            updateCarousel(nextIndex);
        });
        
        // Prev button click
        prevBtn.addEventListener('click', () => {
            let prevIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
            updateCarousel(prevIndex);
        });
        
        // Dots navigation
        dotsContainer.addEventListener('click', (e) => {
            const targetDot = e.target.closest('.dot');
            if (!targetDot) return;
            
            const targetIndex = parseInt(targetDot.getAttribute('data-index'), 10);
            updateCarousel(targetIndex);
        });
        
        // Touch / Swipe Support
        let startX = 0;
        let isDragging = false;
        
        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        }, { passive: true });
        
        track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const diffX = e.touches[0].clientX - startX;
            
            // Threshold for swiping
            if (Math.abs(diffX) > 60) {
                if (diffX > 0) {
                    // Swipe right -> Prev
                    let prevIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
                    updateCarousel(prevIndex);
                } else {
                    // Swipe left -> Next
                    let nextIndex = (currentSlideIndex + 1) % totalSlides;
                    updateCarousel(nextIndex);
                }
                isDragging = false;
            }
        }, { passive: true });
        
        track.addEventListener('touchend', () => {
            isDragging = false;
        });

        // Mouse Drag Support for Desktop
        let mouseStartX = 0;
        let isMouseDragging = false;

        track.addEventListener('mousedown', (e) => {
            mouseStartX = e.clientX;
            isMouseDragging = true;
        });

        track.addEventListener('mousemove', (e) => {
            if (!isMouseDragging) return;
            const diffX = e.clientX - mouseStartX;

            if (Math.abs(diffX) > 80) {
                if (diffX > 0) {
                    let prevIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
                    updateCarousel(prevIndex);
                } else {
                    let nextIndex = (currentSlideIndex + 1) % totalSlides;
                    updateCarousel(nextIndex);
                }
                isMouseDragging = false;
            }
        });

        window.addEventListener('mouseup', () => {
            isMouseDragging = false;
        });
    }
});
