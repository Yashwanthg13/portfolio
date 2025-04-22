// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinksWrapper = document.querySelector('.nav-links-wrapper');

const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn?.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu?.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !mobileMenuBtn.contains(e.target)) {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

// Initialize theme icon based on current theme
function updateThemeIcon() {
    themeIcon.className = html.dataset.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

themeToggle?.addEventListener('click', () => {
    html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
    updateThemeIcon();
});

// Set initial theme icon state
document.addEventListener('DOMContentLoaded', updateThemeIcon);

// Typing Animation with cursor hide
const text = "Yashwanth G";
const typingText = document.querySelector('.typing-text');
const typingCursor = document.querySelector('.typing-cursor');
let charIndex = 0;

function type() {
    if (charIndex < text.length) {
        typingText.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(type, 150);
    } else {
        // Hide cursor after typing completes
        setTimeout(() => {
            typingCursor.classList.add('hide');
        }, 1500);
    }
}

// Create floating particles
function createParticles() {
    const hero = document.querySelector('.hero');
    const particles = document.createElement('div');
    particles.className = 'particles';
    hero.appendChild(particles);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 5 + 10) + 's';
        particles.appendChild(particle);
    }
}

// Mouse trail effect
function createTrailDot(x, y) {
    const dot = document.createElement('div');
    dot.className = 'trail-dot';
    dot.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: var(--accent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.8;
        left: ${x}px;
        top: ${y}px;
        transition: transform 0.15s ease;
    `;
    document.body.appendChild(dot);
    
    setTimeout(() => {
        dot.style.transform = 'scale(0)';
        setTimeout(() => dot.remove(), 150);
    }, 100);
}

let throttleTimer;
document.addEventListener('mousemove', (e) => {
    if (!throttleTimer) {
        throttleTimer = setTimeout(() => {
            createTrailDot(e.clientX, e.clientY);
            throttleTimer = null;
        }, 50);
    }
});

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 500);
    createParticles();
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Add glowing effect to blinkers
function pulseEffect() {
    const blinkers = document.querySelectorAll('.blinker, .typing-cursor');
    blinkers.forEach(blinker => {
        blinker.style.boxShadow = '0 0 15px var(--accent)';
        setTimeout(() => {
            blinker.style.boxShadow = '0 0 8px var(--accent)';
        }, 200);
    });
}

// Pulse blinkers every 3 seconds
setInterval(pulseEffect, 3000);
