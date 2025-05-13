// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen Animation
    setTimeout(() => {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 500);
    }, 1500);

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check if user previously enabled dark mode
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }
    
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Typing Animation
    const typingElement = document.querySelector('.typing-text');
    const typingTexts = ['Web Developer', 'BCA Student', 'Freelancer', 'Tech Enthusiast'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = typingTexts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Add blinking cursor effect
        typingElement.style.borderRight = '2px solid var(--primary-color)';
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        // If completed typing
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end
            typeSpeed = 1500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            // Move to next text
            textIndex = (textIndex + 1) % typingTexts.length;
            // Pause before typing next
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Start typing animation
    setTimeout(type, 1000);

    // Scroll to section animation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
        
        // Active Navigation Link
        let scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // Navbar Scroll Effect
        const navbar = document.querySelector('.navbar');
        if (scrollPosition > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Current Year for Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Initialize AOS Animation (if available)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    // Project Filter (if needed)
    // This code would be used if you add project filtering functionality later
    /*
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Set active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    */
    
    // Contact Form Handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form Validation
            let valid = true;
            const formElements = contactForm.elements;
            
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].hasAttribute('required') && !formElements[i].value) {
                    formElements[i].style.borderColor = 'red';
                    valid = false;
                } else if (formElements[i].type !== 'submit') {
                    formElements[i].style.borderColor = '';
                }
            }
            
            if (valid) {
                // Show success message
                const formData = new FormData(contactForm);
                const formValues = Object.fromEntries(formData.entries());
                
                // In a real application, you would send this data to a server
                console.log('Form Data:', formValues);
                
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <div style="background-color: #4CAF50; color: white; padding: 1rem; border-radius: 5px; margin-top: 1rem; display: flex; align-items: center; justify-content: space-between;">
                        <span>Thank you for your message! I'll get back to you soon.</span>
                        <span style="cursor: pointer;" class="close-message">&times;</span>
                    </div>
                `;
                
                contactForm.after(successMessage);
                contactForm.reset();
                
                // Remove message after 5 seconds
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        successMessage.remove();
                    }, 300);
                }, 5000);
                
                // Close button functionality
                const closeBtn = document.querySelector('.close-message');
                if (closeBtn) {
                    closeBtn.addEventListener('click', () => {
                        successMessage.remove();
                    });
                }
            }
        });
    }

    // Portfolio Image Hover Effect
    const portfolioImages = document.querySelectorAll('.project-image, .blog-image');
    
    portfolioImages.forEach(image => {
        image.addEventListener('mouseenter', () => {
            image.style.transform = 'translateY(-5px)';
        });
        
        image.addEventListener('mouseleave', () => {
            image.style.transform = 'translateY(0)';
        });
    });

    // Skills Animation
    const skillLevels = document.querySelectorAll('.skill-level');
    
    const animateSkills = () => {
        skillLevels.forEach(level => {
            const width = level.style.width;
            level.style.width = '0';
            
            setTimeout(() => {
                level.style.width = width;
            }, 200);
        });
    };
    
    // Animate skills when they come into view
    const skillsSection = document.getElementById('skills');
    
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, {threshold: 0.2});
        
        observer.observe(skillsSection);
    }

    // Parallax Effect on Home Section
    const homeSection = document.querySelector('.home-section');
    
    if (homeSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight) {
                homeSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
            }
        });
    }

    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animateElements.length > 0) {
        const elementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    elementObserver.unobserve(entry.target);
                }
            });
        }, {threshold: 0.2});
        
        animateElements.forEach(element => {
            elementObserver.observe(element);
        });
    }

    // Handle form input focus states
    const formInputs = document.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input already has value on page load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
});

// Preload Images
function preloadImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            const newImg = new Image();
            newImg.src = src;
        }
    });
}

// Call preload function
window.addEventListener('load', preloadImages);

// Add AOS Animations Library if not added in HTML
// This is typically better added via a CDN link in the HTML head
// But can be dynamically loaded if needed
function loadAOSIfNeeded() {
    if (typeof AOS === 'undefined') {
        const aosCSS = document.createElement('link');
        aosCSS.rel = 'stylesheet';
        aosCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css';
        document.head.appendChild(aosCSS);
        
        const aosScript = document.createElement('script');
        aosScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js';
        aosScript.onload = function() {
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100
            });
        };
        document.body.appendChild(aosScript);
    }
}

// Load AOS animations
window.addEventListener('load', loadAOSIfNeeded);