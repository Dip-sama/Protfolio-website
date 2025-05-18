// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-links');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const backToTopButton = document.getElementById('backToTop');
    const currentYear = document.getElementById('year');
    const loadingScreen = document.querySelector('.loading-screen');
    const body = document.body;
    
    // Set current year in footer
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // Hide loading screen after page loads
    window.addEventListener('load', function() {
        setTimeout(function() {
            loadingScreen.style.opacity = '0';
            setTimeout(function() {
                loadingScreen.style.display = 'none';
            }, 300);
        }, 500);
    });
    
    // Mobile Menu Toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Create overlay if it doesn't exist
            let overlay = document.querySelector('.overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'overlay';
                document.body.appendChild(overlay);
            }
            
            // Toggle overlay
            overlay.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            if (navMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const overlay = document.querySelector('.overlay');
        if (overlay && overlay.classList.contains('active') && !e.target.closest('.nav-links') && !e.target.closest('.hamburger')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
        }
    });
    
    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Remove overlay
            const overlay = document.querySelector('.overlay');
            if (overlay) {
                overlay.classList.remove('active');
            }
            
            // Re-enable scrolling
            body.style.overflow = '';
        });
    });
    
    // Dark Mode Toggle
    if (darkModeToggle) {
        // Check for saved preference
        if (localStorage.getItem('darkMode') === 'enabled') {
            body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }
        
        // Toggle dark mode
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'enabled');
            } else {
                body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', null);
            }
        });
    }
    
    // Back to Top Button
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Typing animation for the hero section
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const jobTitles = ['Web Developer', 'Frontend Developer', 'UI/UX Enthusiast', 'Student'];
        let currentTitleIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 150;
        
        function type() {
            const currentTitle = jobTitles[currentTitleIndex];
            
            if (isDeleting) {
                typingText.textContent = currentTitle.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = 80;
            } else {
                typingText.textContent = currentTitle.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 150;
            }
            
            if (!isDeleting && currentCharIndex === currentTitle.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at the end of the word
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentTitleIndex = (currentTitleIndex + 1) % jobTitles.length;
                typingSpeed = 500; // Pause before typing new word
            }
            
            setTimeout(type, typingSpeed);
        }
        
        setTimeout(type, 1000);
    }
    
    // Animate on scroll effect
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.85;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('aos-animate');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    window.addEventListener('load', checkScroll);
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = body.classList.contains('dark-mode') ? 'rgba(18, 18, 18, 0.95)' : 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = body.classList.contains('dark-mode') ? 'rgba(18, 18, 18, 0.8)' : 'rgba(255, 255, 255, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Handle form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add a success message
            const formElements = this.elements;
            const submitButton = this.querySelector('button[type="submit"]');
            
            // Store original button text
            const originalButtonText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual form submission logic)
            setTimeout(function() {
                // Success message
                contactForm.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Message Sent Successfully!</h3>
                        <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
                    </div>
                `;
                
                // Reset form after 5 seconds (optional)
                /* Uncomment to reset form after delay
                setTimeout(function() {
                    contactForm.reset();
                    contactForm.innerHTML = originalForm;
                }, 5000);
                */
            }, 2000);
        });
    }
    
    // Projects filter functionality (can be expanded)
    const viewAllProjectsBtn = document.querySelector('.projects-section .view-more .btn');
    if (viewAllProjectsBtn) {
        viewAllProjectsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // This can be expanded to show more projects or implement filtering
            alert('More projects coming soon!');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Skills marquee - duplicate items to create infinite loop effect
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        // Clone the current items
        const items = marqueeContent.innerHTML;
        marqueeContent.innerHTML = items + items;
    }
    
    // Initialize active nav link based on scroll position
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navHeight = navbar.offsetHeight;
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 20;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    window.addEventListener('load', setActiveNavLink);
    
    // Newsletter subscription form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button');
            
            // Store original button innerHTML
            const originalButtonHTML = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            emailInput.disabled = true;
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(function() {
                // Success state
                submitButton.innerHTML = '<i class="fas fa-check"></i>';
                submitButton.style.backgroundColor = '#28a745';
                
                // Reset after some time
                setTimeout(function() {
                    submitButton.innerHTML = originalButtonHTML;
                    submitButton.style.backgroundColor = '';
                    emailInput.value = '';
                    emailInput.disabled = false;
                    submitButton.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // Add CSS active class to navbar links when clicking
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Add responsive class to navbar on mobile
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            navbar.classList.add('mobile');
        } else {
            navbar.classList.remove('mobile');
        }
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize(); // Initial check
});