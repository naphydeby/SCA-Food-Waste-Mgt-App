function showTab(tabName) {  
    const tabs = document.querySelectorAll('.tab-content');  
    const buttons = document.querySelectorAll('.tab-button');  

    // Hide all tabs and remove active class from buttons  
    tabs.forEach(tab => {  
        tab.classList.remove('active');  
    });  
    buttons.forEach(button => {  
        button.classList.remove('active');  
    });  

    // Show the selected tab and set the button as active  
    document.getElementById(tabName).classList.add('active');  
    const activeButton = Array.from(buttons).find(button => button.textContent === tabName.charAt(0).toUpperCase() + tabName.slice(1).replace(/([A-Z])/g, ' $1'));  
    if (activeButton) {  
        activeButton.classList.add('active');  
    }  
}  

// Handle form submissions (optional)  
document.getElementById('signInForm').addEventListener('submit', function(event) {  
    event.preventDefault();  
    // Add sign-in logic here  
    alert('Signing in...');  
});  

document.getElementById('signUpForm').addEventListener('submit', function(event) {  
    event.preventDefault();  
    // Add sign-up logic here  
    alert('Signing up...');  
});