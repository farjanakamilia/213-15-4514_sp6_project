document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(event) {
      // Form validation
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const destination = document.getElementById('destination').value;
      const date = document.getElementById('date').value;
      
      let errors = [];
  
      // Name validation
      if (name === '') {
        errors.push('Name is required.');
      }
      
      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        errors.push('Invalid email address.');
      }
      
      // Phone validation (simple validation for digits)
      const phonePattern = /^[0-9]{10}$/;
      if (!phonePattern.test(phone)) {
        errors.push('Phone number must be 11 digits.');
      }
      
      // Destination validation
      if (destination === '') {
        errors.push('Please select a destination.');
      }
      
      // Date validation
      if (date === '') {
        errors.push('Please select a date.');
      }
  
      // If there are errors, prevent form submission and alert the user
      if (errors.length > 0) {
        event.preventDefault();
        alert(errors.join('\n'));
      } else {
        alert('Ticket booked successfully!');
      }
    });
  });
  document.getElementById('bookingForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone_number: document.getElementById('phone').value,
        destination: document.getElementById('destination').value,
        date: document.getElementById('date').value
    };

    fetch('http://localhost:5000/book', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.text())
        .then(data => {
            alert(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});