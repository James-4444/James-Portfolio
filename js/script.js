// Script for interactivity and form handling

document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled', 'shadow-sm');
        } else {
            navbar.classList.remove('scrolled', 'shadow-sm');
        }
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Store in localStorage (simulating backend)
            const contactData = {
                name: name,
                email: email,
                message: message,
                date: new Date().toISOString()
            };
            
            // Get existing messages or initialize empty array
            let messages = JSON.parse(localStorage.getItem('portfolioMessages')) || [];
            messages.push(contactData);
            localStorage.setItem('portfolioMessages', JSON.stringify(messages));
            
            // Show success message (using Bootstrap alert would be better, but alert is simple)
            alert(`Thank you, ${name}! Your message has been sent successfully.`);
            
            // Reset form
            contactForm.reset();
        });
    }

    // Add animation on scroll (simple intersection observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    document.querySelectorAll('.card, .skill-card, .section-title').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    // Add CSS for the animation dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in-up {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    const roles = ["Web Developer","Application Developer"]; // Roles to type
const roleElement = document.getElementById("auto-role");
let roleIndex = 0;
let charIndex = 0;
let typing = true;

function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (typing) {
        roleElement.textContent += currentRole.charAt(charIndex);
        charIndex++;
        if (charIndex === currentRole.length) {
            typing = false;
            setTimeout(typeRole, 1500); // Wait before deleting
        } else {
            setTimeout(typeRole, 100); // Typing speed
        }
    } else {
        roleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            typing = true;
            roleIndex = (roleIndex + 1) % roles.length; // Loop roles
            setTimeout(typeRole, 500);
        } else {
            setTimeout(typeRole, 50); // Deleting speed
        }
    }
}

window.onload = typeRole;
});
