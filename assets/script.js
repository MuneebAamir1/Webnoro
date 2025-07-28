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
    const typingTextElement = document.querySelector('.typing-animation-text');
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 150; // Milliseconds per character
    const deletingSpeed = 100; // Milliseconds per character
    const delayBeforeDelete = 1500; // Milliseconds to wait before backspacing
    const delayBeforeType = 500; // Milliseconds to wait before typing next word

    function typeEffect() {
        const currentWord = wordsToAnimate[wordIndex];

        if (isDeleting) {
            // Deleting text
            typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Typing text
            typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentWord.length) {
            // Word finished typing, prepare to delete
            currentSpeed = delayBeforeDelete;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Word finished deleting, move to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % wordsToAnimate.length; // Cycle through words
            currentSpeed = delayBeforeType;
        }

        setTimeout(typeEffect, currentSpeed);
    }

    // Start the typing effect when the DOM is loaded
    typeEffect();


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
});