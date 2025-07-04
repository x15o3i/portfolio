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
        threshold: 0.25 // Changed from 0.6 to 0.25 (25% of section visible)
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

    // Contact form: mailto link
    const contactForm = document.getElementById('contact-form');
    const submitContactBtn = document.getElementById('submit-contact-btn');
    // It's good practice to let the user know what the real email is.
    // This email address should match the one in index.html
    const portfolioEmail = 'raphaelfulfilled@gmail.com';

    if (contactForm && submitContactBtn) {
        // Update the visible email link in the HTML
        const directEmailLink = document.getElementById('direct-email-link');
        if (directEmailLink) {
            directEmailLink.href = `mailto:${portfolioEmail}`;
            directEmailLink.textContent = portfolioEmail;
        }

        submitContactBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent any default form submission

            const name = contactForm.querySelector('#name').value;
            const emailField = contactForm.querySelector('#email').value; // Sender's email
            const message = contactForm.querySelector('#message').value;

            if (!name || !emailField || !message) {
                alert('Please fill out all fields in the contact form.');
                return;
            }

            // Basic email validation
            if (!validateEmail(emailField)) {
                alert('Please enter a valid email address.');
                return;
            }

            const subject = `Portfolio Contact: ${name}`;
            const body = `Name: ${name}\nEmail: ${emailField}\n\nMessage:\n${message}`;

            let mailtoLink = `mailto:${portfolioEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Some email clients have limits on URL length for mailto.
            // If the body is very long, it might be truncated.
            if (mailtoLink.length > 2000) { // Common limit, though varies
                alert('Your message is very long. Please consider sending a shorter message or emailing directly.');
                // Optionally, just open mailto with subject and let user copy-paste body
                mailtoLink = `mailto:${portfolioEmail}?subject=${encodeURIComponent(subject)}`;
            }

            window.location.href = mailtoLink;
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Theme switcher logic
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon'); // Get the icon span
    const body = document.body;

    const moonIcon = '🌙\uFE0E'; // Unicode moon character with text presentation selector
    const sunIcon = '☀️\uFE0E'; // Unicode sun character with text presentation selector

    // Function to apply the saved theme or default to dark
    function applyTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light-theme');
            if (themeIcon) themeIcon.textContent = sunIcon;
        } else {
            body.classList.remove('light-theme');
            if (themeIcon) themeIcon.textContent = moonIcon;
        }
    }

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme('dark'); // Default to dark theme, or use 'light' if you prefer light as default
    }

    if (themeToggle && themeIcon) { // Ensure the button and icon span exist
        themeToggle.addEventListener('click', () => {
            themeIcon.classList.add('theme-icon-spin'); // Add spin animation class
            if (body.classList.contains('light-theme')) {
                body.classList.remove('light-theme');
                localStorage.setItem('theme', 'dark');
                themeIcon.textContent = moonIcon;
            } else {
                body.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
                themeIcon.textContent = sunIcon;
            }
            // Remove the animation class after it has played
            setTimeout(() => {
                themeIcon.classList.remove('theme-icon-spin');
            }, 300); // Must match the CSS transition duration
        });
    }
});
