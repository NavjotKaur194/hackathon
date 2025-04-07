// Check admission access
function checkAdmissionAccess(event) {
    event.preventDefault();
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
        window.location.href = 'admission.html';
    } else {
        alert('Please log in to access the admission form.');
        window.location.href = 'login.html';
    }
}

// Check login state on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check login state
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userEmail = localStorage.getItem('userEmail');

    // Get UI elements
    const authButtons = document.getElementById('authButtons');
    const userMenu = document.getElementById('userMenu');
    const userEmailSpan = userMenu?.querySelector('.user-email');

    if (isLoggedIn && authButtons && userMenu && userEmailSpan) {
        // Show user menu
        authButtons.style.display = 'none';
        userMenu.style.display = 'flex';
        userEmailSpan.textContent = userEmail;
    }
});

// Logout function
function logout() {
    // Clear login state
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');

    // Redirect to login page
    window.location.href = 'login.html';
}

// Slider functionality
const slides = [
    {
        background: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg',
        title: 'Codegenix<br>Institute of Technology'
    },
    {
        background: 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg',
        title: 'Innovate<br>Your Future'
    },
    {
        background: 'https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg',
        title: 'Excellence in<br>Technology'
    }
];

let currentSlide = 0;

function updateSlide() {
    const slide = document.querySelector('.slide');
    const title = document.querySelector('.slide-content h1');
    
    slide.style.background = `url('${slides[currentSlide].background}') center/cover`;
    title.innerHTML = slides[currentSlide].title;
}

document.querySelector('.slider-prev').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlide();
});

document.querySelector('.slider-next').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlide();
});

// Auto-slide
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlide();
}, 5000);
