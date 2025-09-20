const API_URL = "http://localhost:5000/api/auth";

// REGISTER USER
async function registerUser() {
  const username = document.getElementById("reg-username").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  });

  const data = await res.json();
  alert(data.message || "Registered!");

  if (res.ok) {
    window.location.href = "login.html"; // Redirect to login
  }
}

// LOGIN USER
async function loginUser() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.user.username);

    window.location.href = "dashboard.html"; // Redirect to dashboard
  } else {
    alert(data.message || "Login failed");
  }
}

// LOGOUT USER
function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  window.location.href = "login.html"; // Redirect to login page
}
