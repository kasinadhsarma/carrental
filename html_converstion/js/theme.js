// Theme handling
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Function to update theme icons visibility
    const updateThemeIcons = (isDark) => {
        const lightIcon = themeToggle.querySelector('.light-icon');
        const darkIcon = themeToggle.querySelector('.dark-icon');
        if (isDark) {
            lightIcon.style.display = 'none';
            darkIcon.style.display = 'block';
        } else {
            lightIcon.style.display = 'block';
            darkIcon.style.display = 'none';
        }
    };

    // Function to set theme
    const setTheme = (theme) => {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcons(theme === 'dark');
        
        // Add transition class after a small delay to prevent initial transition
        setTimeout(() => {
            document.body.classList.add('theme-transition');
        }, 100);
    };

    // Check system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Get initial theme
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || (systemPrefersDark.matches ? 'dark' : 'light');
    
    // Apply initial theme without transition
    document.body.classList.remove('theme-transition');
    setTheme(initialTheme);

    // Handle theme toggle click
    themeToggle.addEventListener('click', () => {
        const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // Listen for system theme changes
    systemPrefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Mobile navigation handling
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.innerHTML = `
        <div class="flex items-center justify-between p-4 border-b">
            <a href="/" class="flex items-center gap-2 font-bold text-xl">
                <svg class="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M7 17h10v-4H7v4zm12-4h-1v4h1a1 1 0 001-1v-2a1 1 0 00-1-1zM5 17v-4H4a1 1 0 00-1 1v2a1 1 0 001 1h1z"/>
                    <path d="M17 11H7l-1.5-5h13L17 11z"/>
                </svg>
                <span>CarRental</span>
            </a>
            <button class="close-nav rounded-md p-2 hover:bg-accent">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>
        <nav class="p-4">
            <a href="/about" class="block py-2 text-sm font-medium hover:text-primary transition-colors">About</a>
            <a href="/contact" class="block py-2 text-sm font-medium hover:text-primary transition-colors">Contact</a>
        </nav>
    `;
    
    document.body.appendChild(mobileNav);

    // Handle mobile nav toggle
    mobileNavToggle.addEventListener('click', () => {
        mobileNav.classList.add('open');
    });

    // Handle mobile nav close
    const closeNav = mobileNav.querySelector('.close-nav');
    closeNav.addEventListener('click', () => {
        mobileNav.classList.remove('open');
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileNav.contains(e.target) && !mobileNavToggle.contains(e.target) && mobileNav.classList.contains('open')) {
            mobileNav.classList.remove('open');
        }
    });
});
