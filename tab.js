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



// Wait for the DOM to load before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // Handle Tab Switching
    function showTab(tabName) {
        const tabs = document.querySelectorAll('.tab-content');
        const buttons = document.querySelectorAll('.tab-button');

        // Hide all tabs and remove active class
        tabs.forEach(tab => tab.classList.remove('active'));
        buttons.forEach(button => button.classList.remove('active'));

        // Show the selected tab and activate the button
        document.getElementById(tabName).classList.add('active');
        const activeButton = Array.from(buttons).find(
            button => button.textContent.trim() === tabName.charAt(0).toUpperCase() + tabName.slice(1)
        );
        if (activeButton) activeButton.classList.add('active');
    }
    const signUpApi = 'https://food-salvage-api.onrender.com/api/users/signup';
    const signInApi = 'https://food-salvage-api.onrender.com/api/users/signin';
   

    // Handle Sign In Form Submission (POST Request)
    const signInForm = document.getElementById('signInForm');
    if (signInForm) {
        signInForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = {
                email: signInForm.querySelector('input[name="email"]').value,
                password: signInForm.querySelector('input[name="password"]').value,
            };
            try {
                const response = await axios.post(signInApi, formData);
                console.log('Sign-in success:', response.data);
                alert('Sign-in successful!');
            } catch (error) {
                console.error('Sign-in error:', error.response?.data || error.message);
                alert('Sign-in failed. Please try again.');
            }
        });
    }

    // Handle Sign Up Form Submission (POST Request)
    const signUpForm = document.getElementById('signUpForm');
    if (signUpForm) {
        signUpForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = {
                name: signUpForm.querySelector('input[name="name"]').value,
                email: signUpForm.querySelector('input[name="email"]').value,
                password: signUpForm.querySelector('input[name="password"]').value,
            };
            try {
                const response = await axios.post(signUpApi, formData);
                console.log('Sign-up success:', response.data);
                alert('Sign-up successful!');
            } catch (error) {
                console.error('Sign-up error:', error.response?.data || error.message);
                alert('Sign-up failed. Please try again.');
            }
        });
    }

    // Attach tab switching globally
    window.showTab = showTab;
});
