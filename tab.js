// function showTab(tabName) {  
//     const tabs = document.querySelectorAll('.tab-content');  
//     const buttons = document.querySelectorAll('.tab-button');  

//     // Hide all tabs and remove active class from buttons  
//     tabs.forEach(tab => {  
//         tab.classList.remove('active');  
//     });  
//     buttons.forEach(button => {  
//         button.classList.remove('active');  
//     });  

//     // Show the selected tab and set the button as active  
//     document.getElementById(tabName).classList.add('active');  
//     const activeButton = Array.from(buttons).find(button => button.textContent === tabName.charAt(0).toUpperCase() + tabName.slice(1).replace(/([A-Z])/g, ' $1'));  
//     if (activeButton) {  
//         activeButton.classList.add('active');  
//     }  
// }  

// // Handle form submissions (optional)  
// document.getElementById('signInForm').addEventListener('submit', function(event) {  
//     event.preventDefault();  
//     // Add sign-in logic here  
//     alert('Signing in...');  
// });  

// document.getElementById('signUpForm').addEventListener('submit', function(event) {  
//     event.preventDefault();  
//     // Add sign-up logic here  
//     alert('Signing up...');  
// });

// end of linda's code


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
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    try {
      const response = await axios.post("https://food-salvage-api.onrender.com/api/users/signin", {
        email,
        password,
      });
      alert("Login successful!");
      console.log(response.data);
      // Redirect user after login
      window.location.href = "/dashboard.html";
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  });
  
  // Handle Sign Up form submission
  document.getElementById("signUp-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("signup-email").value;
    const phonenumber = document.getElementById("phonenumber").value;
    const password = document.getElementById("signup-password").value;
  
    try {
      const response = await axios.post("https://food-salvage-api.onrender.com/api/users/signin", {
        fullname,
        email,
        phonenumber,
        password,
      });
      alert("Sign Up successful! Please sign in.");
      console.log(response.data);
      showTab("signIn");
    } catch (error) {
      console.error("Sign Up failed:", error);
      alert("Sign Up failed. Please try again.");
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
  