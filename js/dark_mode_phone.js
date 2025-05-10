function createMobileDarkModeToggle() {
    // Remove if already exists
    const existing = document.getElementById('mobile-dark-toggle');
    if (existing) existing.remove();

    // Only add if in mobile mode
    if (window.innerWidth > 600) return;

    const btn = document.createElement('button');
    btn.id = 'mobile-dark-toggle';
    btn.className = 'mobile-dark-toggle';
    btn.innerHTML = '<i class="fas fa-moon"></i>'; // or sun/moon logic

    btn.onclick = function() {
        // Toggle dark mode (adjust as needed for your theme logic)
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
        btn.innerHTML = isDark
            ? '<i class="fas fa-moon"></i>'
            : '<i class="fas fa-sun"></i>';
    };

    document.body.appendChild(btn);
}

// Run on load and resize
window.addEventListener('DOMContentLoaded', createMobileDarkModeToggle);
window.addEventListener('resize', createMobileDarkModeToggle);
