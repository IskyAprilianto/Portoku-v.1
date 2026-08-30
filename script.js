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
            
            // Set up mailto parameters
            // EDIT MANUAL: Ubah email penerima di sini jika ingin diarahkan ke email yang berbeda
            const recipient = 'iskydwiaprilianto@example.com';
            
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
});
