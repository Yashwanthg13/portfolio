// DOM Elements
const preloader = document.querySelector('.preloader');
const navbar = document.querySelector('.navbar');
const themeToggle = document.getElementById('theme-toggle');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectsGrid = document.querySelector('.projects-grid');
const contactForm = document.getElementById('contact-form');
const sections = document.querySelectorAll('section');

// Smooth Loading
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
        
        // Hide preloader with animation
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                // Initialize animations after preloader
                initializeAnimations();
            }, 500);
        }, 500);
    });
});

// Smooth Navbar Scroll Effect
let lastScroll = 0;
let navbarHideTimeout;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Clear previous timeout
    clearTimeout(navbarHideTimeout);
    
    if (currentScroll <= 0) {
        navbar.style.transform = 'translateY(0)';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    } else if (currentScroll > lastScroll) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        
        // Reset background after stop scrolling
        navbarHideTimeout = setTimeout(() => {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        }, 500);
    }
    
    // Update for dark theme
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        navbar.style.backgroundColor = navbar.style.backgroundColor.replace(
            'rgba(255, 255, 255',
            'rgba(39, 39, 42'
        );
    }
    
    lastScroll = currentScroll;
});

// Enhanced Theme Toggle
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Smooth transition
    document.documentElement.style.setProperty('--transition-duration', '0.5s');
    
    requestAnimationFrame(() => {
        // Animate icon
        const icon = themeToggle.querySelector('i');
        icon.style.transform = 'scale(0) rotate(360deg)';
        
        setTimeout(() => {
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            
            requestAnimationFrame(() => {
                icon.style.transform = 'scale(1) rotate(0)';
            });
        }, 150);
    });
});

// Smooth Project Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active state with animation
        filterBtns.forEach(b => {
            b.style.transform = b === btn ? 'scale(1.1)' : 'scale(0.9)';
            setTimeout(() => {
                b.classList.toggle('active', b === btn);
                b.style.transform = 'scale(1)';
            }, 200);
        });
        
        const filter = btn.dataset.filter;
        const projects = document.querySelectorAll('.project-card');
        
        projects.forEach(project => {
            // Prepare for animation
            project.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            
            if (filter === 'all' || project.dataset.category === filter) {
                project.style.opacity = '0';
                project.style.transform = 'scale(0.8) translateY(20px)';
                project.style.display = 'block';
                
                requestAnimationFrame(() => {
                    project.style.opacity = '1';
                    project.style.transform = 'scale(1) translateY(0)';
                });
            } else {
                project.style.opacity = '0';
                project.style.transform = 'scale(0.8) translateY(20px)';
                
                setTimeout(() => {
                    project.style.display = 'none';
                }, 500);
            }
        });
    });
});

// Enhanced Scroll Animations
function initializeAnimations() {
    const animatedElements = document.querySelectorAll(
        '.skill-item, .project-card, .stat-item, .contact-card, .social-btn'
    );
    
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    });
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        }
    );
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(element);
    });
}

// Enhanced Form Interactions
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    
    // Disable form with animation
    Array.from(contactForm.elements).forEach(element => {
        element.style.transition = 'opacity 0.3s ease';
        element.style.opacity = '0.5';
        element.disabled = true;
    });
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <div class="button-content" style="display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-spinner fa-spin"></i>
            <span>Sending...</span>
        </div>
    `;
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success animation
    submitBtn.innerHTML = `
        <div class="button-content" style="display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-check"></i>
            <span>Sent Successfully</span>
        </div>
    `;
    submitBtn.classList.add('success');
    
    // Reset form with animation
    setTimeout(() => {
        Array.from(contactForm.elements).forEach(element => {
            element.style.opacity = '1';
            element.disabled = false;
        });
        
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
            <div class="button-content" style="display: flex; align-items: center; gap: 8px;">
                <span>Send Message</span>
                <i class="fas fa-paper-plane"></i>
            </div>
        `;
        submitBtn.classList.remove('success');
        contactForm.reset();
    }, 3000);
});

// Smooth Scroll with Progress Indicator
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (document.querySelector('.nav-links.active')) {
            document.querySelector('.hamburger').click();
        }
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Smooth scroll with easing
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update URL without jump
            history.pushState(null, null, this.getAttribute('href'));
        }
    });
});

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial theme
    const storedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', storedTheme);
    
    // Generate content
    generateTimeline();
    generateProjects();
    
    // Start typewriter effect
    const nameElement = document.querySelector('.highlight');
    const typewriterElement = document.querySelector('.typewriter');
    
    if (nameElement && typewriterElement) {
        const fullName = nameElement.textContent;
        nameElement.textContent = '';
        
        typeWriter(nameElement, fullName, 100, () => {
            setTimeout(() => {
                typeWriter(typewriterElement, 'Software Engineer', 80);
            }, 500);
        });
    }
});

// Keep other existing functions unchanged
