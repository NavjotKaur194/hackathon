// Mock student database
const studentDatabase = {
    'student@example.com': {
        password: 'password123',
        studentDetails: {
            name: 'John Doe',
            id: '2024CSE001',
            course: 'B.Tech Computer Science',
            semester: '4th Semester',
            attendance: '85%',
            cgpa: '8.5',
            feeDue: '₹45,000',
            lastPayment: '₹55,000 (Jan 15, 2024)',
            dueDate: 'April 30, 2024',
            latestResult: 'Semester 3 - SGPA: 8.7',
            resultDate: 'December 15, 2023'
        }
    }
};

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Check if user exists and password matches
    if (studentDatabase[email] && studentDatabase[email].password === password) {
        // Store login state and user details
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('studentName', studentDatabase[email].studentDetails.name);
        localStorage.setItem('studentId', studentDatabase[email].studentDetails.id);
        localStorage.setItem('studentCourse', studentDatabase[email].studentDetails.course);
        
        // Redirect to home page
        window.location.href = 'index.html';
    } else {
        alert('Invalid email or password');
    }
}
