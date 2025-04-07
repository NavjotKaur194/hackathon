document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.getElementById('sameAddress');
    
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            // Copy values from present to permanent address
            document.getElementById('permDivision').value = document.getElementById('presDivision').value;
            document.getElementById('permDistrict').value = document.getElementById('presDistrict').value;
            document.getElementById('permUpazila').value = document.getElementById('presUpazila').value;
            document.getElementById('permPostCode').value = document.getElementById('presPostCode').value;
            document.getElementById('permAddress').value = document.getElementById('presAddress').value;
        }
    });
});

function handleAdmissionSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const form = document.getElementById('admissionForm');
    const formData = new FormData(form);
    
    // Create a notification
    const notification = document.createElement('div');
    notification.className = 'admission-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <h3>Admission Form Submitted Successfully!</h3>
            <p>Thank you for applying. We will contact you soon.</p>
            <div class="notification-progress"></div>
        </div>
    `;
    
    // Add notification to the page
    document.body.appendChild(notification);
    
    // Animate notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Redirect after 3 seconds
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 3000);
}
