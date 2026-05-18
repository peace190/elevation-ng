/**
 * ELEVATION NG - Universal Master Script
 * Handles Navigation, Viewport Animations, and Interactive UX Components
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. DYNAMIC FOOTER YEAR
    // ==========================================
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // ==========================================
    // 2. MOBILE HAMBURGER MENU & DROPDOWN LOGIC
    // ==========================================
    const menuToggle = document.querySelector('#mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('is-active');
            navLinks.classList.toggle('active');
        });

        // Close mobile drawer seamlessly when clicking an anchor link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('is-active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ==========================================
    // 3. HARDWARE-ACCELERATED SCROLL REVEAL
    // ==========================================
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Optimize performance by dropping observation once revealed
            }
        });
    };

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px" // Triggers slightly before element meets the viewport edge
    };

    const observer = new IntersectionObserver(revealCallback, revealOptions);
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

    // ==========================================
    // 4. HEADER BACKGROUND DYNAMICS ON SCROLL
    // ==========================================
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true }); // Optimizes scrolling performance
    }
});

// ==========================================
// 5. ADVANCED CLIPBOARD COPY ENGINE (UI/UX Enhanced)
// ==========================================
function copyAccount(accountNumber, element) {
    if (!navigator.clipboard) {
        // Fallback for older legacy browsers
        fallbackCopyText(accountNumber, element);
        return;
    }

    navigator.clipboard.writeText(accountNumber).then(() => {
        triggerCopySuccessUX(element);
    }).catch(err => {
        console.error('Clpboard failure:', err);
    });
}

// Micro-interaction UI State Controller
function triggerCopySuccessUX(element) {
    const badge = element.querySelector('.copy-badge');
    const originalText = badge.textContent;
    
    // 1. Prevent overlapping spam-click animation glitches
    if (element.classList.contains('copied-card')) return;

    // 2. Inject Success UI Visual States
    badge.textContent = "Copied! ✓";
    badge.classList.add('copied');
    element.classList.add('copied-card');

    // 3. Add a quick spring scale physical haptic feedback loop via JS styles
    element.style.transform = "scale(0.97)";
    setTimeout(() => {
        element.style.transform = "";
    }, 1000);

    // 4. Cool Down Period: Gracefully return back to default theme
    setTimeout(() => {
        badge.style.opacity = '0';
        element.style.borderColor = 'rgba(255,255,255,0.05)';
        
        setTimeout(() => {
            badge.textContent = originalText;
            badge.classList.remove('copied');
            element.classList.remove('copied-card');
            badge.style.opacity = '1';
            element.style.borderColor = ''; // Reverts back to CSS control
        }, 200);
        
    }, 2500);
}

// Legacy fallback helper for deep device optimization
function fallbackCopyText(text, element) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed"; // Avoid layout scrolling jumps
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        triggerCopySuccessUX(element);
    } catch (err) {
        alert('Please manually copy: ' + text);
    }
    document.body.removeChild(textArea);
}