document.addEventListener('DOMContentLoaded', function () {
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

// Razorpay configuration
const razorpayConfig = {
    key: 'rzp_test_ZBAIZ7HkSCtkjJ', // Replace with your actual test key
    amount: 1000 * 100, // Amount in paise (₹1000)
    currency: 'INR',
    name: 'Codegenix Institute',
    description: 'Admission Fee Payment',
    image: 'images/icon.jpg',
    theme: {
        color: '#4CAF50'
    }
};

function showSuccessNotification() {
    const notification = document.getElementById('successNotification');
    notification.style.display = 'flex';
    
    // Redirect after 3 seconds
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 3000);
}

function handlePaymentSuccess(response) {
    // Handle successful payment
    showSuccessNotification();
}

function handleAdmissionSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const form = document.getElementById('admissionForm');
    const formData = new FormData(form);
    
    // Initialize Razorpay payment
    const options = {
        ...razorpayConfig,
        handler: function(response) {
            // Payment successful
            const paymentId = response.razorpay_payment_id;
            console.log('Payment successful:', paymentId);
            
            // Show success notification and redirect
            showSuccessNotification();
        },
        prefill: {
            name: document.getElementById('studentName').value,
            email: document.getElementById('email').value,
            contact: document.getElementById('phone').value
        },
        modal: {
            ondismiss: function() {
                console.log('Payment cancelled');
            }
        }
    };

    // Create and open Razorpay payment window
    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
}
