const cursor = document.querySelector('.cursor');
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursor() {
    cursor.style.left = mouseX - 10 + 'px';
    cursor.style.top = mouseY - 10 + 'px';
    requestAnimationFrame(updateCursor);
}
updateCursor();

// Cursor hover effects
document.querySelectorAll('a, .skill-category, .project-card, .contact-card, .profile-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Scroll progress indicator
window.addEventListener('scroll', () => {
    const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.querySelector('.scroll-progress').style.width = scrolled + '%';
});

// Parallax effect for floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Dynamic typing effect for hero subtitle (optional enhancement)
const heroTitle = document.querySelector('.hero-title');
const titles = ['Full Stack Developer & BTech Student', 'Python Enthusiast', 'GUI Application Developer', 'Problem Solver'];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeTitle() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        heroTitle.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        heroTitle.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentTitle.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 500;
    }

    setTimeout(typeTitle, typeSpeed);
}

// Start typing effect after page load
setTimeout(typeTitle, 3000);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Project card enhanced hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Skills category rotation effect
document.querySelectorAll('.skill-category').forEach(skill => {
    skill.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.skill-icon');
        icon.style.transform = 'scale(1.2) rotateY(360deg)';
        icon.style.transition = 'transform 0.6s ease';
    });
    
    skill.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.skill-icon');
        icon.style.transform = 'scale(1) rotateY(0deg)';
    });
});

// Contact card pulse effect
document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.contact-icon');
        icon.style.animation = 'pulse 1s infinite';
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.contact-icon');
        icon.style.animation = 'none';
    });
});

// Add pulse animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Resume download functionality (you can link to actual resume)
document.querySelector('.resume-btn').addEventListener('click', function(e) {
    e.preventDefault();
    // Replace with actual resume file path
    // window.open('/path-to-your-resume.pdf', '_blank');
    
    // For now, show an alert
    alert('Resume download functionality - Please add your actual resume file path!');
});

// Add a subtle parallax effect to the hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});