

// Function to toggle between Sign In and Sign Up tabs
function showTab(tabId) {
  const tabs = document.querySelectorAll(".tab-content");
  const buttons = document.querySelectorAll(".tab-button");

  tabs.forEach((tab) => tab.classList.remove("active"));
  buttons.forEach((btn) => btn.classList.remove("active"));

  document.getElementById(tabId).classList.add("active");
  document
    .querySelector(`[onclick="showTab('${tabId}')"]`)
    .classList.add("active");
}

// Handle Sign In form submission
document.getElementById("signIn-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signIn-email").value;
  const password = document.getElementById("signIn-password").value;

  if (!email || !password) {
      alert("Please fill in all fields.");
      return;
  }

  const signInBtn = e.target.querySelector('button[type="submit"]');
  signInBtn.disabled = true;
  signInBtn.textContent = "Logging in...";

  try {
      const response = await axios.post("https://food-salvage-api.onrender.com/api/users/signin", {
          email,
          password,
      });
      alert("Login successful! Redirecting...");
      setTimeout(() => window.location.href = "DashboardFoodmanagement/userlogin.html", 1500);
  } catch (error) {
      console.error("Login failed:", error);
      const message = error.response?.data?.message || "Login failed. Please check your credentials.";
      alert(message);
  } finally {
      signInBtn.disabled = false;
      signInBtn.textContent = "Login";
  }
});

// Handle Sign Up form submission
document.getElementById("signUp-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("signUp-email").value;
  const location = document.getElementById("location").value;
  const password = document.getElementById("signUp-password").value;

  if (!firstName || !lastName || !email || !location || !password) {
      alert("Please fill in all fields.");
      return;
  }

  if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
  }

  const signUpBtn = e.target.querySelector('button[type="submit"]');
  signUpBtn.disabled = true;
  signUpBtn.textContent = "Signing up...";

  try {
      const response = await axios.post("https://food-salvage-api.onrender.com/api/users/signup", {
          firstName,
          lastName,
          email,
          location,
          password,
      });
      alert("Sign Up successful! Please sign in.");
      showTab("signIn");
  } catch (error) {
      console.error("Sign Up failed:", error);
      const message = error.response?.data?.message || "Sign Up failed. Please try again.";
      alert(message);
  } finally {
      signUpBtn.disabled = false;
      signUpBtn.textContent = "Signup";
  }
});

// Handle "Forget Password" link clicks
document.querySelectorAll(".alternate-sign a").forEach((link) => {
  link.addEventListener("click", (e) => {
      e.preventDefault();
      const text = e.target.textContent.trim();
      if (text === "Sign Up") showTab("signUp");
      else if (text === "Sign In") showTab("signIn");
      else alert("Password reset functionality coming soon!");
  });
});
