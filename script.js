// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');
let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMenu);

// Close mobile menu when clicking nav items
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        if (isMenuOpen) toggleMenu();
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (isMenuOpen && !hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        toggleMenu();
    }
});

// Handle active nav link
const sections = document.querySelectorAll('section');
const navOptions = {
    threshold: 0.3
};

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            document.querySelector(`.nav-link[href="#${id}"]`)?.classList.add('active');
            
            // Remove active class from other links
            navLinksItems.forEach(link => {
                if (link.getAttribute('href') !== `#${id}`) {
                    link.classList.remove('active');
                }
            });
        }
    });
}, navOptions);

sections.forEach(section => navObserver.observe(section));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // Close mobile menu after clicking a link
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Enhanced Typewriter effect with cursor
function typeWriter(element, text, speed = 100, callback) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            if (callback) {
                callback();
            }
            // Remove cursor after typing is complete
            setTimeout(() => {
                element.style.setProperty('--cursor-display', 'none');
            }, 1000);
        }
    }
    // Add custom property for cursor display
    element.style.setProperty('--cursor-display', 'inline');
    type();
}

// Start animations after page load
window.addEventListener('load', () => {
    // Typewriter effect for name
    const nameElement = document.querySelector('.highlight');
    const fullName = nameElement.textContent;
    nameElement.textContent = '';
    typeWriter(nameElement, fullName, 150, () => {
        // Start role typewriter after name is complete
        const typewriterElement = document.querySelector('.typewriter');
        typewriterElement.textContent = '';
        typeWriter(typewriterElement, 'Software Engineer', 100);
    });
    
    // Add stagger animation to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Animate social links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            link.style.transition = 'all 0.5s ease';
            link.style.opacity = '1';
            link.style.transform = 'translateX(0)';
        }, index * 200);
    });
});

// Enhanced Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add stagger effect to child elements
            if (entry.target.classList.contains('projects-grid') || 
                entry.target.classList.contains('timeline')) {
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        child.style.transition = 'all 0.5s ease';
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            } else {
                entry.target.classList.add('fade-in');
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Form submission handler
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Here you would typically send the form data to a server
    // For now, we'll just log it to console
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Add scroll-triggered animations to elements
window.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to elements that should animate
    const animatedElements = document.querySelectorAll('.skill-item, .project-card');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// Experience Timeline Data
const experiences = [
    {
        title: 'Lab Coordinator',
        company: 'GEC Mosalehosahalli',
        period: 'Aug 2022 - Present',
        description: 'Examining all computer systems in lab and equipping them with softwares required for practicals.'
    },
    {
        title: 'Member, Website Maintenance Team',
        company: 'GEC Mosalehosahalli',
        period: 'Aug 2022 - Present',
        description: 'Adding and updating information on college website specified by college administration.'
    }
];

// Generate Experience Timeline
function generateExperienceTimeline() {
    const timeline = document.querySelector('.timeline');
    experiences.forEach((exp, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <h3>${exp.title}</h3>
                <h4>${exp.company}</h4>
                <p class="period">${exp.period}</p>
                <p>${exp.description}</p>
            </div>
        `;
        timeline.appendChild(timelineItem);
    });
}

// Generate Projects
const projects = [
    {
        title: 'E-Commerce Website',
        description: 'Developed an e-commerce website with user friendly UI and optimized backend.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Backend Development'],
        link: '#'
    },
    {
        title: 'Inventory Management System',
        description: 'A software which helps track quantity of goods, supplier details and customer orders information.',
        technologies: ['Database Design', 'Backend Development', 'UI/UX'],
        link: '#'
    },
    {
        title: 'Cipher Vault',
        description: 'A symmetric cryptographic based web application consists of various symmetric cryptographic algorithms for encryption and decryption of information.',
        technologies: ['Cryptography', 'Web Development', 'Security'],
        link: '#'
    },
    {
        title: 'Cloud Computing with AWS',
        description: 'Hands-on experience with AWS services, involving real-world projects and tasks like deploying applications and managing cloud infrastructure.',
        technologies: ['AWS', 'Cloud Computing', 'DevOps'],
        link: '#'
    }
];

function generateProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="technologies">
                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
}

// Theme Switcher
const themeToggle = document.getElementById('theme-toggle');
const storedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', storedTheme);

// Set initial icon based on stored theme
const initialIcon = themeToggle.querySelector('i');
initialIcon.className = storedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Add transition class before changing theme
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon efficiently
    const icon = themeToggle.querySelector('i');
    requestAnimationFrame(() => {
        icon.classList.add('rotating');
        icon.className = newTheme === 'dark' ? 'fas fa-sun rotating' : 'fas fa-moon rotating';
        
        // Remove rotation class after animation
        setTimeout(() => {
            icon.classList.remove('rotating');
        }, 300);
    });
    
    // Batch style updates
    requestAnimationFrame(() => {
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Remove transition after theme change
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
});

// Initialize dynamic content
document.addEventListener('DOMContentLoaded', () => {
    generateExperienceTimeline();
    generateProjects();
});
