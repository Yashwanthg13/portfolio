// DOM Elements
const preloader = document.querySelector('.preloader');
const navbar = document.querySelector('.navbar');
const themeToggle = document.getElementById('theme-toggle');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectsGrid = document.querySelector('.projects-grid');
const contactForm = document.getElementById('contact-form');

// Preloader
window.addEventListener('load', () => {
    preloader.classList.add('hidden');
    setTimeout(() => {
        preloader.style.display = 'none';
        // Start animations after preloader
        initializeAnimations();
    }, 500);
});

// Navbar Scroll Effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
        navbar.style.transform = 'translateY(0)';
        navbar.style.backgroundColor = 'var(--card-bg)';
    } else if (currentScroll > lastScroll) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
        navbar.style.backgroundColor = 'var(--card-bg)';
    }
    lastScroll = currentScroll;
});

// Theme Toggle
const storedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', storedTheme);
const initialIcon = themeToggle.querySelector('i');
initialIcon.className = storedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Update theme with transition
    requestAnimationFrame(() => {
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Animate icon
        const icon = themeToggle.querySelector('i');
        icon.style.transform = 'scale(0)';
        
        setTimeout(() => {
            icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            icon.style.transform = 'scale(1)';
        }, 150);
    });
});

// Project Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        const projects = document.querySelectorAll('.project-card');
        
        projects.forEach(project => {
            project.style.opacity = '0';
            project.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                if (filter === 'all' || project.dataset.category === filter) {
                    project.style.display = 'block';
                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    project.style.display = 'none';
                }
            }, 300);
        });
    });
});

// Experience Timeline Data
const experiences = [
    {
        title: 'Lab Coordinator',
        company: 'GEC Mosalehosahalli',
        period: 'Aug 2022 - Present',
        description: 'Examining all computer systems in lab and equipping them with softwares required for practicals.',
        category: 'education'
    },
    {
        title: 'Member, Website Maintenance Team',
        company: 'GEC Mosalehosahalli',
        period: 'Aug 2022 - Present',
        description: 'Adding and updating information on college website specified by college administration.',
        category: 'work'
    }
];

// Projects Data
const projects = [
    {
        title: 'E-Commerce Website',
        description: 'Developed an e-commerce website with user friendly UI and optimized backend.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Backend Development'],
        category: 'web',
        image: 'project1.jpg'
    },
    {
        title: 'Inventory Management System',
        description: 'A software which helps track quantity of goods, supplier details and customer orders information.',
        technologies: ['Database Design', 'Backend Development', 'UI/UX'],
        category: 'app',
        image: 'project2.jpg'
    },
    {
        title: 'Cipher Vault',
        description: 'A symmetric cryptographic based web application for encryption and decryption of information.',
        technologies: ['Cryptography', 'Web Development', 'Security'],
        category: 'web',
        image: 'project3.jpg'
    },
    {
        title: 'Cloud Computing with AWS',
        description: 'Hands-on experience with AWS services, involving real-world projects and cloud infrastructure.',
        technologies: ['AWS', 'Cloud Computing', 'DevOps'],
        category: 'other',
        image: 'project4.jpg'
    }
];

// Generate Timeline
function generateTimeline() {
    const timeline = document.querySelector('.timeline');
    experiences.forEach((exp, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${exp.category}`;
        timelineItem.innerHTML = `
            <div class="timeline-content" data-aos="fade-${index % 2 === 0 ? 'right' : 'left'}">
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
function generateProjects() {
    projectsGrid.innerHTML = '';
    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.dataset.category = project.category;
        projectCard.dataset.aos = 'fade-up';
        projectCard.dataset.aosDelay = index * 100;
        
        projectCard.innerHTML = `
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="technologies">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Scroll Animations
function initializeAnimations() {
    const animatedElements = document.querySelectorAll(
        '.skill-item, .project-card, .stat-item, .contact-card'
    );
    
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(element);
    });
}

// Typewriter Effect
function typeWriter(element, text, speed = 100, callback) {
    let i = 0;
    element.textContent = '';
    element.style.setProperty('--cursor-display', 'inline');
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            requestAnimationFrame(() => setTimeout(type, speed));
        } else {
            if (callback) callback();
            setTimeout(() => {
                element.style.setProperty('--cursor-display', 'none');
            }, 1000);
        }
    }
    
    requestAnimationFrame(type);
}

// Form Handling
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success message
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully';
    submitBtn.classList.add('success');
    
    // Reset form
    setTimeout(() => {
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
        submitBtn.classList.remove('success');
    }, 3000);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    generateTimeline();
    generateProjects();
    
    // Start typewriter effect for name
    const nameElement = document.querySelector('.highlight');
    const typewriterElement = document.querySelector('.typewriter');
    if (nameElement && typewriterElement) {
        const fullName = nameElement.textContent;
        nameElement.textContent = '';
        typeWriter(nameElement, fullName, 150, () => {
            typeWriter(typewriterElement, 'Software Engineer', 100);
        });
    }
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMenu);

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (isMenuOpen && !hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        toggleMenu();
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        if (isMenuOpen) toggleMenu();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
