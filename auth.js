// Get users from localStorage or initialize empty array
let users = JSON.parse(localStorage.getItem('users')) || [];

document.addEventListener('DOMContentLoaded', function() {
    // Toggle Password Visibility
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            } else {
                input.type = 'password';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            }
        });
    });

    // Forgot Password Modal
    const modal = document.getElementById('forgotPasswordModal');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const closeModal = document.querySelector('.close-modal');

    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            modal.classList.add('show');
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.classList.remove('show');
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    // Login Form Validation and Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (validateEmail(email) && validatePassword(password)) {
                // Get updated users list
                const currentUsers = JSON.parse(localStorage.getItem('users')) || [];
                const user = currentUsers.find(u => u.email === email && u.password === password);
                
                if (user) {
                    // Store login state
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userEmail', email);
                    
                    // Show success message
                    showMessage('Login successful! Redirecting...', 'success');
                    
                    // Redirect to home page after a short delay
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1500);
                } else {
                    showMessage('Invalid email or password', 'error');
                }
            }
        });
    }

    // Register Form Validation and Submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (validateRegistration(firstName, lastName, email, phone, password, confirmPassword)) {
                // Get current users
                const currentUsers = JSON.parse(localStorage.getItem('users')) || [];
                
                // Check if email already exists
                if (currentUsers.some(user => user.email === email)) {
                    showMessage('Email already registered', 'error');
                    return;
                }
                
                // Add new user
                const newUser = {
                    firstName,
                    lastName,
                    email,
                    phone,
                    password
                };
                
                currentUsers.push(newUser);
                localStorage.setItem('users', JSON.stringify(currentUsers));
                
                // Show success message
                showMessage('Registration successful! Redirecting to login...', 'success');
                
                // Redirect to login page
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            }
        });
    }

    // Reset Password Form
    const resetPasswordForm = document.getElementById('resetPasswordForm');
    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.resetEmail.value;
            
            if (validateEmail(email)) {
                // Here you would typically send the reset request to your server
                console.log('Password reset requested for:', email);
                alert('Password reset link has been sent to your email!');
                modal.classList.remove('show');
            }
        });
    }
});

// Validation Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
        showMessage('Please enter a valid email address', 'error');
        return false;
    }
    return true;
}

function showMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;

    // Insert message after the form
    const form = document.querySelector('form');
    form.parentNode.insertBefore(messageDiv, form.nextSibling);

    // Remove message after 3 seconds if it's a success message
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
}

function validatePassword(password) {
    if (password.length < 6) {
        showError('password', 'Password must be at least 6 characters long');
        return false;
    }
    removeError('password');
    return true;
}

function validateRegistration(firstName, lastName, email, phone, password, confirmPassword) {
    let isValid = true;

    if (!firstName || firstName.length < 2) {
        showError('firstName', 'First name is required');
        isValid = false;
    } else {
        removeError('firstName');
    }

    if (!lastName || lastName.length < 2) {
        showError('lastName', 'Last name is required');
        isValid = false;
    } else {
        removeError('lastName');
    }

    if (!validateEmail(email)) {
        isValid = false;
    }

    if (!phone || phone.length < 10) {
        showError('phone', 'Please enter a valid phone number');
        isValid = false;
    } else {
        removeError('phone');
    }

    if (!validatePassword(password)) {
        isValid = false;
    }

    if (password !== confirmPassword) {
        showError('confirmPassword', 'Passwords do not match');
        isValid = false;
    } else {
        removeError('confirmPassword');
    }

    return isValid;
}

function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorDiv = input.parentElement.querySelector('.error-message') 
        || createErrorDiv(input.parentElement);
    
    input.classList.add('input-error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function removeError(inputId) {
    const input = document.getElementById(inputId);
    const errorDiv = input.parentElement.querySelector('.error-message');
    
    input.classList.remove('input-error');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
}

function createErrorDiv(parent) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    parent.appendChild(errorDiv);
    return errorDiv;
}
