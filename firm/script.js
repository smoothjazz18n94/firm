 
        // Mobile Menu Toggle
        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const navMenu = document.querySelector('#navMenu');
            
            if (mobileMenuBtn) {
                mobileMenuBtn.addEventListener('click', function() {
                    navMenu.classList.toggle('active');
                });
            }
            
            // Close mobile menu when clicking a link
            document.querySelectorAll('nav a').forEach(link => {
                link.addEventListener('click', function() {
                    navMenu.classList.remove('active');
                });
            });
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        // Update active nav link
                        document.querySelectorAll('nav a').forEach(link => {
                            link.classList.remove('active');
                        });
                        this.classList.add('active');
                        
                        // Scroll to target
                        window.scrollTo({
                            top: targetElement.offsetTop - 100,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Form Submission
            const contactForm = document.getElementById('consultationForm');
            const formSuccess = document.getElementById('formSuccess');
            
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Basic validation
                    const name = document.getElementById('name');
                    const email = document.getElementById('email');
                    const phone = document.getElementById('phone');
                    const service = document.getElementById('service');
                    const message = document.getElementById('message');
                    
                    let isValid = true;
                    
                    // Reset error states
                    [name, email, phone, service, message].forEach(field => {
                        field.style.borderColor = '';
                    });
                    
                    // Validate name
                    if (!name.value.trim()) {
                        name.style.borderColor = '#dc3545';
                        isValid = false;
                    }
                    
                    // Validate email
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!email.value.trim() || !emailRegex.test(email.value)) {
                        email.style.borderColor = '#dc3545';
                        isValid = false;
                    }
                    
                    // Validate phone
                    const phoneRegex = /^[\d\s\-()+]+$/;
                    if (!phone.value.trim() || !phoneRegex.test(phone.value)) {
                        phone.style.borderColor = '#dc3545';
                        isValid = false;
                    }
                    
                    // Validate service
                    if (!service.value) {
                        service.style.borderColor = '#dc3545';
                        isValid = false;
                    }
                    
                    // Validate message
                    if (!message.value.trim()) {
                        message.style.borderColor = '#dc3545';
                        isValid = false;
                    }
                    
                    if (isValid) {
                        // In a real application, you would send this data to your backend
                        // For this demo, we'll just show a success message
                        formSuccess.classList.add('active');
                        contactForm.reset();
                        
                        // Scroll to success message
                        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        
                        // Hide success message after 5 seconds
                        setTimeout(() => {
                            formSuccess.classList.remove('active');
                        }, 5000);
                    }
                });
            }
            
            // Highlight active section in navigation
            window.addEventListener('scroll', function() {
                const sections = document.querySelectorAll('section');
                const navLinks = document.querySelectorAll('nav a');
                
                let currentSection = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 150;
                    const sectionHeight = section.clientHeight;
                    
                    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                        currentSection = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentSection}`) {
                        link.classList.add('active');
                    }
                });
            });
            
            // Testimonial Slider (Simple Version)
            const testimonials = document.querySelectorAll('.testimonial');
            let currentTestimonial = 0;
            
            function showTestimonial(index) {
                testimonials.forEach(testimonial => {
                    testimonial.style.display = 'none';
                });
                
                testimonials[index].style.display = 'block';
                currentTestimonial = index;
            }
            
            // Initialize first testimonial
            if (testimonials.length > 0) {
                showTestimonial(0);
                
                // Auto rotate testimonials every 5 seconds
                setInterval(() => {
                    let nextIndex = currentTestimonial + 1;
                    if (nextIndex >= testimonials.length) {
                        nextIndex = 0;
                    }
                    showTestimonial(nextIndex);
                }, 5000);
            }
        });
    