// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');
const contactForm = document.getElementById('contactForm');

// Mobile Navigation Toggle
hamburger.addEventListener('click', mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Close mobile menu when clicking on a link
navLinks.forEach(n => n.addEventListener('click', closeMenu));

function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Header Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + header.offsetHeight + 50;

    sections.forEach(current => {
        const top = current.offsetTop;
        const bottom = top + current.offsetHeight;
        const id = current.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

        if (scrollPos >= top && scrollPos <= bottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .team-member, .hero-stats, .experience-text, .contact-item');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
});

// Contact Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm(contactForm)) {
        return;
    }
    
    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    // Show loading state
    submitButton.innerHTML = '<span class="loading"></span> Enviando...';
    submitButton.disabled = true;
    
    try {
        // Send to Google Apps Script
        await sendToGoogleSheets(formData);
        
        // Show success message
        showNotification('¡Gracias por tu consulta! Te contactaremos pronto.', 'success');
        contactForm.reset();
        
    } catch (error) {
        console.error('Error sending form:', error);
        showNotification('Hubo un error al enviar tu consulta. Por favor, intenta de nuevo.', 'error');
    } finally {
        // Reset button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }
}

// Send form data to Google Apps Script
function sendToGoogleSheets(formData) {
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxzJNndcvTPbO2ZmcQw6HCyT29Or3xCfE0guos_XlFFzHST5-UiqTNnpyY3zkTF1lLr/exec';
    
    return new Promise((resolve, reject) => {
        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Required for Google Apps Script
        })
        .then(() => {
            // With no-cors mode, we can't read the response
            // but if no error is thrown, we assume success
            resolve({ status: 'success' });
        })
        .catch(error => {
            reject(error);
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        max-width: 400px;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${getNotificationStyles(type)}
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationStyles(type) {
    const styles = {
        success: 'background-color: #48bb78; color: white;',
        error: 'background-color: #f56565; color: white;',
        warning: 'background-color: #ed8936; color: white;',
        info: 'background-color: #4299e1; color: white;'
    };
    return styles[type] || styles.info;
}

// Statistics Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format the number
            let displayValue = Math.floor(current);
            if (counter.textContent.includes('+')) {
                displayValue += '+';
            }
            if (counter.textContent.includes('%')) {
                displayValue += '%';
            }
            
            counter.textContent = displayValue;
        }, 20);
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Form Validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'Este campo es obligatorio');
            isValid = false;
        } else {
            clearFieldError(field);
            
            // Email validation
            if (field.type === 'email' && !isValidEmail(field.value)) {
                showFieldError(field, 'Por favor ingresa un email válido');
                isValid = false;
            }
            
            // Phone validation (basic)
            if (field.type === 'tel' && field.value && !isValidPhone(field.value)) {
                showFieldError(field, 'Por favor ingresa un teléfono válido');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #f56565;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    `;
    
    field.style.borderColor = '#f56565';
    field.parentElement.appendChild(errorElement);
}

function clearFieldError(field) {
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{8,}$/;
    return phoneRegex.test(phone);
}

// Add real-time validation to form fields
if (contactForm) {
    const formFields = contactForm.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.addEventListener('blur', () => {
            if (field.hasAttribute('required') && !field.value.trim()) {
                showFieldError(field, 'Este campo es obligatorio');
            } else {
                clearFieldError(field);
                
                if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
                    showFieldError(field, 'Por favor ingresa un email válido');
                }
                
                if (field.type === 'tel' && field.value && !isValidPhone(field.value)) {
                    showFieldError(field, 'Por favor ingresa un teléfono válido');
                }
            }
        });
        
        field.addEventListener('input', () => {
            if (field.parentElement.querySelector('.field-error')) {
                clearFieldError(field);
            }
        });
    });
}

// Back to Top Button
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: var(--shadow-lg);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(button);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
}

// Initialize back to top button
createBackToTopButton();

// Service Card Hover Effects
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Loading Screen (optional)
function showLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Cargando GT Legal Solutions...</p>
        </div>
    `;
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Hide loading screen when page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    });
}

// Uncomment to enable loading screen
// showLoadingScreen();

// Performance optimization: Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// Console message for developers
console.log(`
🏛️ GT Legal Solutions Website
🚀 Developed with modern web technologies
📧 For technical support: info@gtlegalsolutions.com
`);

// Export functions for external use if needed
window.GTLegalSolutions = {
    showNotification,
    validateForm,
    animateCounters
};
