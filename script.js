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
    // Initial loading animation
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
        document.body.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        document.body.style.opacity = '1';
        
        // Animated preloader hide
        setTimeout(() => {
            preloader.style.transform = 'scale(1.1)';
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                // Start page animations
                initializeAnimations();
                // Animate hero section elements
                animateHeroSection();
            }, 600);
        }, 800);
    });
});

// Enhanced Hero Section Animation
function animateHeroSection() {
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
            el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

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

// Enhanced Scroll Animations with Parallax
function initializeAnimations() {
    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll(
        '.skill-item, .project-card, .stat-item, .contact-card, .social-btn, .timeline-content'
    );

    // Parallax elements
    const parallaxElements = document.querySelectorAll('.section-title, .project-image');
    
    // Scroll animation observer
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px) scale(0.95)';
                    
                    requestAnimationFrame(() => {
                        entry.target.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        }
    );
    
    // Apply scroll animations
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px) scale(0.95)';
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
    });

    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach(element => {
            const speed = 0.3;
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
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

// Timeline Data
function generateTimeline() {
    const timeline = [
        {
            title: "Software Engineering Intern",
            company: "Tech Solutions Inc.",
            period: "2023 - Present",
            description: "Developing full-stack web applications using modern technologies. Implementing responsive designs and optimizing application performance.",
            skills: ["Angular", "Node.js", "MongoDB"]
        },
        {
            title: "Web Development Lead",
            company: "College Technical Club",
            period: "2022 - 2023",
            description: "Led a team of student developers in creating web applications for college events and departments.",
            skills: ["React", "Firebase", "Team Leadership"]
        },
        {
            title: "Freelance Developer",
            company: "Self-Employed",
            period: "2021 - 2022",
            description: "Developed custom websites and web applications for various clients while maintaining high standards of code quality.",
            skills: ["HTML/CSS", "JavaScript", "WordPress"]
        }
    ];

    const timelineContainer = document.querySelector('.timeline');
    timelineContainer.innerHTML = timeline.map((item, index) => `
        <div class="timeline-item" style="animation-delay: ${index * 0.2}s">
            <div class="timeline-content premium-card">
                <h3>${item.title}</h3>
                <h4>${item.company}</h4>
                <p class="period">${item.period}</p>
                <p class="description">${item.description}</p>
                <div class="skills">
                    ${item.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Projects Data
function generateProjects() {
    const projects = [
        {
            title: "E-commerce Platform",
            description: "A full-stack e-commerce platform with real-time inventory management and secure payment integration.",
            category: "web",
            image: "https://via.placeholder.com/400x300",
            tech: ["React", "Node.js", "MongoDB"],
            links: {
                live: "#",
                github: "https://github.com/yashwanthg13"
            }
        },
        {
            title: "Task Management App",
            description: "A mobile-responsive task management application with real-time updates and team collaboration features.",
            category: "app",
            image: "https://via.placeholder.com/400x300",
            tech: ["Angular", "Firebase"],
            links: {
                live: "#",
                github: "https://github.com/yashwanthg13"
            }
        },
        {
            title: "AI Image Generator",
            description: "An AI-powered image generation tool that creates unique artwork based on text descriptions.",
            category: "other",
            image: "https://via.placeholder.com/400x300",
            tech: ["Python", "TensorFlow", "Flask"],
            links: {
                live: "#",
                github: "https://github.com/yashwanthg13"
            }
        }
    ];

    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card premium-card" data-category="${project.category}">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="project-overlay">
                    <div class="project-links">
                        <a href="${project.links.live}" target="_blank" class="btn primary-btn">Live Demo</a>
                        <a href="${project.links.github}" target="_blank" class="btn secondary-btn">Source Code</a>
                    </div>
                </div>
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Typewriter Effect
function typeWriter(element, text, speed, callback) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

// Scroll Progress Indicator
const scrollProgress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = `${scrolled}%`;
});

// Image Loading Animation
function initializeImageLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    });
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Animate nav links
    const links = navLinks.querySelectorAll('a');
    links.forEach((link, index) => {
        if (navLinks.classList.contains('active')) {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        } else {
            link.style.animation = '';
        }
    });
});

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    // Set initial theme
    const storedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', storedTheme);
    themeToggle.querySelector('i').className = storedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    
    // Generate content
    generateTimeline();
    generateProjects();
    initializeImageLoading();
    
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
