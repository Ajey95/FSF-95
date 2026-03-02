// Navbar scroll shadow
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Hamburger toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Intersection Observer — fade-in on scroll
const observerOpts = { threshold: 0.12 };
const fadeIn = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            fadeIn.unobserve(e.target);
        }
    });
}, observerOpts);

document.querySelectorAll('.pillar, .project-card, .hero-content').forEach(el => {
    el.classList.add('fade-target');
    fadeIn.observe(el);
});
