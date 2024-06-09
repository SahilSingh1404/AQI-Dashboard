const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("#loginForm");
const signupForm = document.querySelector("#signupForm");
const loginBtn = document.querySelector(".slide.login");
const signupBtn = document.querySelector(".slide.signup");
const signupLink = document.querySelector("form .signup-link a");

function showLogin() {
    document.getElementById("login").checked = true;
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
}

function showSignup() {
    document.getElementById("signup").checked = true;
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
}

signupBtn.onclick = showSignup;
loginBtn.onclick = showLogin;

signupLink.onclick = () => {
    showSignup();
    return false;
};

// Handle AJAX form submission for login
loginForm.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData);

    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const result = await response.json();
        localStorage.setItem('token', result.token); // Store the token in localStorage
        window.location.href = '/newpage.html'; // Redirect to newpage.html
    } else {
        alert('Login failed');
    }
};

// Handle AJAX form submission for signup
signupForm.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(signupForm);
    const data = Object.fromEntries(formData);

    const response = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert('Signup successful. Please login.');
        showLogin();
    } else {
        alert('Signup failed');
    }
};
