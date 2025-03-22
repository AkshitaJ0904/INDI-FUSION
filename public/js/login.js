document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    const loginInput = document.querySelector('input[type="text"]');
    const otpInput = document.querySelector('input[placeholder="Enter OTP *"]');
    const continueButton = document.querySelector('button');
    const errorMessage = document.createElement('p');
    errorMessage.style.color = '#dc3545';
    errorMessage.style.textAlign = 'center';
    errorMessage.style.margin = '10px 0';
    errorMessage.style.padding = '8px';
    errorMessage.style.borderRadius = '4px';
    errorMessage.style.backgroundColor = '#ffe6e6';
    errorMessage.style.display = 'none';
    loginInput.insertAdjacentElement('afterend', errorMessage);

    let otpSent = false;
    let mockOTP = '';

    // Handle Continue button click
    continueButton.addEventListener('click', (e) => {
        e.preventDefault();
        const loginValue = loginInput.value.trim();

        // Basic validation
        if (!loginValue) {
            showError('Please enter email or phone number');
            return;
        }

        const isEmail = loginValue.includes('@');
        const isPhone = /^\d{10}$/.test(loginValue);

        if (!isEmail && !isPhone) {
            showError('Please enter valid email or 10-digit phone number');
            return;
        }

        if (!otpSent) {
            // Generate mock OTP
            mockOTP = Math.floor(100000 + Math.random() * 900000).toString();
            console.log('Mock OTP for testing:', mockOTP);
            
            // Show OTP input
            otpInput.style.display = 'block';
            otpInput.value = ''; // Clear any previous value
            otpInput.placeholder = 'Enter OTP *';
            
            // Disable email/phone input
            loginInput.disabled = true;
            loginInput.style.backgroundColor = '#f5f5f5';
            
            otpSent = true;
            showError(''); // Clear any error messages
            
            // Show success message for OTP sent
            const successMsg = document.createElement('p');
            successMsg.textContent = 'OTP sent successfully to ${loginValue}';
            successMsg.style.color = '#28a745';
            successMsg.style.textAlign = 'center';
            successMsg.style.margin = '10px 0';
            otpInput.insertAdjacentElement('afterend', successMsg);
            
            setTimeout(() => successMsg.remove(), 3000); // Remove after 3 seconds
        } else {
            // Verify OTP
            const enteredOTP = otpInput.value.trim();
            
            if (!enteredOTP) {
                showError('Please enter OTP');
                return;
            }

            if (enteredOTP === mockOTP) {
                // Successful login
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', loginValue);
                
                // Redirect to dashboard
                window.location.href = 'mydashboard.html';
            } else {
                showError('Invalid OTP. Please try again.');
            }
        }
    });

    // Handle social login buttons
    document.querySelector('.facebook').addEventListener('click', () => {
        alert('Facebook login is not implemented in this demo');
    });

    document.querySelector('.google').addEventListener('click', () => {
        alert('Google login is not implemented in this demo');
    });

    // Handle Resend OTP
    const resendLink = document.querySelector('.resend-otp a');
    if (resendLink) {
        resendLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (otpSent) {
                mockOTP = Math.floor(100000 + Math.random() * 900000).toString();
                console.log('New Mock OTP:', mockOTP);
                showError('New OTP sent successfully', 'success');
                setTimeout(() => showError(''), 3000);
            }
        });
    }

    function showError(message, type = 'error') {
        errorMessage.textContent = message;
        errorMessage.style.display = message ? 'block' : 'none';
        
        if (type === 'success') {
            errorMessage.style.backgroundColor = '#e6ffe6';
            errorMessage.style.color = '#28a745';
        } else {
            errorMessage.style.backgroundColor = '#ffe6e6';
            errorMessage.style.color = '#dc3545';
        }
    }
});