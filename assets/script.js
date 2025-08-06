document.addEventListener('DOMContentLoaded', () => {
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const navLinksContainer = document.querySelector('.nav-links-container');
    const navLinks = document.querySelectorAll('.nav-links li'); // Get individual list items

    // --- Hamburger Menu Toggle ---
    hamburgerIcon.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
    });

    // --- Initial Load Animation for Nav Links ---
    navLinks.forEach((link, index) => {
        link.style.transitionDelay = `${index * 0.1}s`;
        link.style.transform = 'translateY(0)';
        link.style.opacity = '1';
    });
   navLinks.forEach(link => {
        void link.offsetHeight; // Forces reflow/repaint
    });
    // --- Active Link Underline (Basic Implementation) ---
    const currentPath = window.location.pathname;
    const navLinksElements = document.querySelectorAll('.nav-link');

    navLinksElements.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' && currentPath === '/') {
            link.classList.add('active');
        } else if (link.getAttribute('href') !== '#' && currentPath.includes(link.getAttribute('href').replace('.html', ''))) {
            link.classList.add('active');
        }
    });

    if (currentPath === '/' || currentPath === '/index.html' || currentPath === '') {
        document.querySelector('.nav-link[href="#"]').classList.add('active');
    }

    // --- New: Typography Animation for Hero Paragraph ---
    const wordsToAnimate = ["responsive", "clean", "modern"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 150; // Milliseconds per character
    const deletingSpeed = 100; // Milliseconds per character
    const delayBeforeDelete = 1500; // Milliseconds to wait before backspacing
    const delayBeforeType = 500; // Milliseconds to wait before typing next word

   // --- Homepage Specific: Typing Animation ---
const typingTextElement = document.querySelector('.typing-animation-text');
// We only run this code if the typing element exists on the page
if (typingTextElement) {
    const wordsToAnimate = ["responsive", "clean", "modern"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 150;
    const deletingSpeed = 100;
    const delayBeforeDelete = 1500;
    const delayBeforeType = 500;

    function typeEffect() {
        const currentWord = wordsToAnimate[wordIndex];
        if (isDeleting) {
            typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;
        if (!isDeleting && charIndex === currentWord.length) {
            currentSpeed = delayBeforeDelete;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % wordsToAnimate.length;
            currentSpeed = delayBeforeType;
        }
        setTimeout(typeEffect, currentSpeed);
    }
    // Start the effect
    typeEffect();
}


// --- Project Showcase Horizontal Scroll (NEW) ---
const scrollContainer = document.querySelector('.project-scroll-container');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

if (scrollContainer && leftArrow && rightArrow) {
    const scrollAmount = 550; // Adjust how much to scroll per click

    leftArrow.addEventListener('click', () => {
        stopAutoScroll(); // Stop auto-scroll on manual interaction
        scrollContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    // UPDATED: Right arrow to loop back to start if at end
    rightArrow.addEventListener('click', () => {
        stopAutoScroll(); // Stop auto-scroll on manual interaction
        const currentScrollLeft = scrollContainer.scrollLeft;
        const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;

        if (currentScrollLeft + 5 >= maxScrollLeft) { // Check if already at or near end
            scrollContainer.scrollTo({ // Jump back to beginning
                left: 0,
                behavior: 'smooth'
            });
        } else {
            scrollContainer.scrollBy({ // Otherwise, scroll forward
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    });

// UPDATED: Arrow visibility logic for left arrow at start
const updateArrowVisibility = () => {
    const currentScrollLeft = scrollContainer.scrollLeft;
    const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    // Left Arrow Visibility
    if (currentScrollLeft <= 5) { // If at or very near the beginning
        leftArrow.style.display = 'none';
    } else {
        leftArrow.style.display = 'flex';
    }

    // Right Arrow Visibility - FIX: Ensure it shows when not at the very end
    // It should hide only when the remaining scrollable width is very small (e.g., less than 5px)
    if (currentScrollLeft >= maxScrollLeft - 5) { // If at or very near the end
        rightArrow.style.display = 'none';
    } else {
        rightArrow.style.display = 'flex';
    }
};

    // Initial check and update on scroll
    scrollContainer.addEventListener('scroll', updateArrowVisibility);
    // Call it once on load to set initial state
    updateArrowVisibility();

    // Also update if window resizes, as scroll positions might change
    window.addEventListener('resize', updateArrowVisibility);

    // --- Automatic Sliding Logic (KEEP AS IS - it handles its own loop) ---
    const autoScrollIntervalTime = 3000; // 3 seconds
    let autoScrollInterval;

    const startAutoScroll = () => {
        // Clear any existing interval to prevent duplicates
        clearInterval(autoScrollInterval);
        autoScrollInterval = setInterval(() => {
            const currentScrollLeft = scrollContainer.scrollLeft;
            const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;

            // If at the end, jump back to the beginning
            if (currentScrollLeft + 5 >= maxScrollLeft) { // Added a small buffer
                scrollContainer.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            } else {
                // Otherwise, scroll forward by scrollAmount
                scrollContainer.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }
            updateArrowVisibility(); // Update arrow visibility after auto-scroll
        }, autoScrollIntervalTime);
    };

    const stopAutoScroll = () => {
        clearInterval(autoScrollInterval);
    };

    // Start auto-scrolling when the page loads
    startAutoScroll();

    // Pause auto-scroll on hover and resume on mouse leave
    scrollContainer.addEventListener('mouseenter', stopAutoScroll);
    scrollContainer.addEventListener('mouseleave', startAutoScroll);
    // Also pause when user manually scrolls
    scrollContainer.addEventListener('wheel', stopAutoScroll, { once: true });
    scrollContainer.addEventListener('touchstart', stopAutoScroll, { once: true });
}

// --- Contact Page FAQ Accordion ---
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const questionButton = item.querySelector('.faq-question');
    const answerDiv = item.querySelector('.faq-answer');

    questionButton.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-answer').style.maxHeight = 0;
        });

        // Open the clicked item if it wasn't already active
        if (!isActive) {
            item.classList.add('active');
            answerDiv.style.maxHeight = answerDiv.scrollHeight + "px";
        }
    });
});

// --- Contact Form with EmailJS ---
const contactForm = document.getElementById('contact-form');
const feedbackEl = document.getElementById('form-feedback');

if (contactForm) {
    // Initialize EmailJS with your Public Key
    // FIND THIS IN YOUR EMAILJS ACCOUNT > ACCOUNT > API KEYS
    emailjs.init({
      publicKey: "Gd6RzAIhxQxCm128v", // PASTE YOUR PUBLIC KEY HERE
    });

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const submitButton = this.querySelector('.form-submit-button');
        const buttonText = submitButton.querySelector('.button-text');
        
        buttonText.textContent = 'Sending...';
        submitButton.disabled = true;
        feedbackEl.textContent = '';
        feedbackEl.className = '';

        // These IDs from your EmailJS account
        // SERVICE ID: EMAIL SERVICES > YOUR SERVICE
        // TEMPLATE ID: EMAIL TEMPLATES > YOUR TEMPLATE
        const serviceID = 'service_s8v7ui7'; // PASTE YOUR SERVICE ID
        const templateID = 'template_3oas7wd'; // PASTE YOUR TEMPLATE ID

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                buttonText.textContent = 'Sent Successfully!';
                feedbackEl.textContent = 'Thank you! Your message has been sent.';
                feedbackEl.classList.add('success');
                contactForm.reset();
                
                setTimeout(() => {
                    buttonText.textContent = 'Send Message';
                    submitButton.disabled = false;
                }, 3000);

            }, (err) => {
                buttonText.textContent = 'Send Message';
                submitButton.disabled = false;
                feedbackEl.textContent = 'Oops! Something went wrong. ' + JSON.stringify(err);
                feedbackEl.classList.add('error');
            });
    });
}

// --- Services Page: Animate Timeline on Scroll ---
const timelineItems = document.querySelectorAll('.timeline-item');

if (timelineItems.length > 0) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Optional: stop observing once animated
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the item is visible
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
}
});