document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('header nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Ensure it's an internal link
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });

                    // Optional: Update active class on nav links
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });

    // Intersection Observer for active nav link highlighting on scroll (optional enhancement)
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px',
        threshold: 0.6 // 60% of section visible
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Note: Contact form submission will be handled by standard HTML form POST to Flask.
    // If AJAX submission was required, the code would go here.
    // Example:
    // const contactForm = document.getElementById('contact-form');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', function(e) {
    //         e.preventDefault();
    //         // Add AJAX submission logic here
    //         console.log('Contact form would be submitted via JavaScript here.');
    //         // Display success/error messages dynamically
    //     });
    // }

    // Theme switcher logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to apply the saved theme or default to dark
    function applyTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light-theme');
            themeToggle.textContent = 'Dark Mode';
        } else {
            body.classList.remove('light-theme');
            themeToggle.textContent = 'Light Mode';
        }
    }

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme('dark'); // Default to dark theme, or use 'light' if you prefer light as default
    }

    if (themeToggle) { // Ensure the button exists before adding an event listener
        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('light-theme')) {
                body.classList.remove('light-theme');
                localStorage.setItem('theme', 'dark');
                themeToggle.textContent = 'Light Mode';
            } else {
                body.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
                themeToggle.textContent = 'Dark Mode';
            }
        });
    }
});
