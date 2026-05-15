/**
 * ELEVATION NG - Universal Script
 * This file handles navigation, animations, and dynamic dates 
 * for all website pages.
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. DYNAMIC FOOTER YEAR
    // Automatically updates the copyright year
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // 2. MOBILE HAMBURGER MENU
    // Toggles the mobile navigation overlay and hamburger animation
    const menuToggle = document.querySelector('#mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('is-active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked (useful for one-page sections)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('is-active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 3. SCROLL REVEAL ANIMATION
    // Detects when elements with the 'reveal' class enter the viewport
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once the animation triggers, we can stop observing this element
                observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.15, // Triggers when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Slight offset for a smoother feel
    };

    const observer = new IntersectionObserver(revealCallback, revealOptions);

    document.querySelectorAll('.reveal').forEach(element => {
        observer.observe(element);
    });

    // 4. HEADER SCROLL EFFECT
    // Adds a background shadow/color to the header when the user scrolls down
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

});