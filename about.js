let currentIndex = 0;  
const slides = document.querySelectorAll('.teamprofile');  
const totalSlides = slides.length;  

function showSlide(index) {  
    slides.forEach((teamprofile, i) => {  
        teamprofile.style.transform = `translateX(${(i - index) * 100}%)`;  
    });  
}  

setInterval(() => {  
    currentIndex = (currentIndex + 1) % totalSlides; // Loop back to the first slide  
    showSlide(currentIndex);  
}, 3000); // Change slide every 3 seconds  

showSlide(currentIndex); // Initial call to show first slide