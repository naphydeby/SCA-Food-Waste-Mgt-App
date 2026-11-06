const btn = document.getElementById('btn');
const sideBar = document.getElementById('sideBar');
const closeBtn = document.getElementById('sideBarMenu');

btn.addEventListener('click', () => {
    sideBar.classList.toggle('active');
});

closeBtn.addEventListener('click', () => {
    sideBar.classList.remove('active');
});

// Optional: Close sidebar when clicking outside
document.addEventListener('click', (event) => {
    if (!sideBar.contains(event.target) && event.target !== btn) {
        sideBar.classList.remove('active');
    }
});

async function renderLandingPage() {
    // Hero Section elements
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroImageContainer = document.getElementById('hero-image-container');

    // Testimonials Section
    const testimonialsContainer = document.querySelector('.testimonialContainer');

    try {
        // Fetch landing page data
        const response = await axios.get('https://food-salvage-api.onrender.com/api/landing');
        const landingData = response.data.data;

        // Render Hero Section (with dynamic background image)
        heroTitle.textContent = landingData.hero.title;
        heroSubtitle.textContent = landingData.hero.subtitle;

        if (landingData.hero.image && landingData.hero.image.trim() !== '') {
            heroImageContainer.style.backgroundImage = `url('${landingData.hero.image}')`;
        } else {
            console.warn(' Hero image missing or invalid. Displaying fallback image.');
            heroImageContainer.style.backgroundImage = `url('./image/default-hero.jpg')`; 
        }

        // Map backend names to local images
        const localImageMap = {
            "Lisa": "lisa.jpeg",
            "Amina": "Little Man Photography Test.jpeg"
        };

        // Render Community Testimonials Section
        testimonialsContainer.innerHTML = ''; 
        landingData.testimonials.forEach(testimonial => {
            const imagePath = `./image/${localImageMap[testimonial.name] || 'default-avatar.png'}`;

            const testimonialCard = document.createElement('div');
            testimonialCard.className = 'testimonialCards';

            testimonialCard.innerHTML = `
                <div class="testimonialcard-text">
                    <p>"${testimonial.message}"</p>
                </div>
                <div class="testimonialcard-text-and-persona">
                    <div class="testimonial-img">
                        <img src="${imagePath}" alt="avatar">
                    </div>
                    <div class="testimonial-persona">
                        <h4>— ${testimonial.name}, <i>${testimonial.role || 'Community Member'}</i></h4>
                    </div>
                </div>
            `;
            testimonialsContainer.appendChild(testimonialCard);
        });
      
    } catch (error) {
        console.error(' Error fetching landing page data:', error);
        heroTitle.textContent = 'Failed to load content';
        heroSubtitle.textContent = 'Please try again later.';
        testimonialsContainer.innerHTML = '<p>Failed to load testimonials. Please try again later.</p>';
    }
}

//  Call the function on page load
renderLandingPage();

//  Button functionality
document.getElementById('donate-btn').addEventListener('click', () => {
    window.location.href = 'donate.html';
});

document.getElementById('find-food-btn').addEventListener('click', () => {
    window.location.href = 'findfood.html';
});
