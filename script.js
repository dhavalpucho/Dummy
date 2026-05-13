// Get all navigation buttons and pages
const navButtons = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Add event listeners to navigation buttons
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const pageName = button.getAttribute('data-page');
        showPage(pageName);
        updateActiveButton(button);
    });
});

// Show the selected page and hide others
function showPage(pageName) {
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    const selectedPage = document.getElementById(pageName);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
}

// Update active button styling
function updateActiveButton(activeButton) {
    navButtons.forEach(button => {
        button.classList.remove('active');
    });
    activeButton.classList.add('active');
}

// Handle contact form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validate form fields
    if (!name || !email || !message) {
        showFormMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Validate message length
    if (message.length < 10) {
        showFormMessage('Message must be at least 10 characters long', 'error');
        return;
    }
    
    // Success message
    showFormMessage('✓ Message sent successfully! We will get back to you soon.', 'success');
    
    // Reset form
    contactForm.reset();
    
    // Log form data (in a real app, this would be sent to a server)
    console.log('Form submitted with data:', {
        name: name,
        email: email,
        message: message,
        timestamp: new Date().toLocaleString()
    });
});

// Display form message
function showFormMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = type;
    
    // Auto-hide success message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formMessage.className = '';
        }, 5000);
    }
}

// Set Home as the default page on load
window.addEventListener('DOMContentLoaded', () => {
    showPage('home');
    navButtons[0].classList.add('active');
});