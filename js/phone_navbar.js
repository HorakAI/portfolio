function initNavbar() {
    const hamburger = document.querySelector('.mobile-hamburger');
    const overlay = document.querySelector('.navbar-overlay');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const modeToggle = document.querySelector('.mode-toggle');

    console.log('phone_navbar.js loaded');

    function closeDrawer() {
        overlay.classList.remove('active');
        navbar.classList.remove('open');
    }

    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            console.log('Hamburger clicked');
            e.stopPropagation();
            overlay.classList.toggle('active');
            navbar.classList.toggle('open');
        });
    } else {
        console.log('Hamburger button not found!');
    }

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeDrawer();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeDrawer();
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeDrawer();
        });
    });

    if (modeToggle) {
        modeToggle.addEventListener('click', function() {
            closeDrawer();
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbar);
} else {
    initNavbar();
}

function updateNavbarForMobile() {
    const isMobile = window.innerWidth <= 600;
    const navbar = document.querySelector('.navbar');
    const logo = navbar.querySelector('.logo');
    const modeToggle = navbar.querySelector('.mode-toggle');

    if (isMobile) {
        if (logo) logo.remove();
        if (modeToggle) modeToggle.remove();
    } else {
        // Optionally, re-insert logo and mode-toggle if you want them to reappear on desktop
        // This requires storing their HTML or cloning them before removal
        // Or simply reload the page on resize for simplicity
    }
}

window.addEventListener('DOMContentLoaded', updateNavbarForMobile);
window.addEventListener('resize', updateNavbarForMobile);