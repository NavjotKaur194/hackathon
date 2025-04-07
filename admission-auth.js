// Check if user is logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        // Show message and redirect to login
        alert('Please log in to access the admission form.');
        window.location.href = 'login.html';
    } else {
        // Show user menu
        const userMenu = document.getElementById('userMenu');
        const userEmail = localStorage.getItem('userEmail');
        if (userMenu) {
            userMenu.style.display = 'flex';
            const emailSpan = userMenu.querySelector('.user-email');
            if (emailSpan) {
                emailSpan.textContent = userEmail;
            }
        }
    }
}

// Call checkAuth when page loads
document.addEventListener('DOMContentLoaded', checkAuth);
