
             



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

        //  Render Hero Section (with dynamic background image)
        heroTitle.textContent = landingData.hero.title;
        heroSubtitle.textContent = landingData.hero.subtitle;

        if (landingData.hero.image && landingData.hero.image.trim() !== '') {
            heroImageContainer.style.backgroundImage = `url('${landingData.hero.image}')`;
        } else {
            console.warn(' Hero image missing or invalid. Displaying fallback image.');
            heroImageContainer.style.backgroundImage = `url('./image/default-hero.jpg')`; 
        }

        // Render Community Testimonials Section
        // testimonialsContainer.innerHTML = ''; 
        // landingData.testimonials.forEach(testimonial => {
        //     const testimonialCard = document.createElement('div');
        //     testimonialCard.className = 'testimonialCards';

        //     testimonialCard.innerHTML = `
        //         <div class="testimonialcard-text">
        //             <p>"${testimonial.message}"</p>
        //         </div>
        //         <div class="testimonialcard-text-and-persona">
        //             <div class="testimonial-img">
        //                 <img src="${testimonial.imageUrl || './image/default-avatar.png'}" alt="avatar">
        //             </div>
        //             <div class="testimonial-persona">
        //                 <h4>— ${testimonial.name}, <i>${testimonial.role || 'Community Member'}</i></h4>
        //             </div>
        //         </div>
        //     `;
        //     testimonialsContainer.appendChild(testimonialCard);
        // });
       const testimonials = [
    {
      name: "Lisa",
      message: "This app made donating food simple and effective!",
      image:
        "https://plus.unsplash.com/premium_photo-1661373788628-411f09211c51?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM3fHxCbGFjayUyMGhhcHB5JTIwd29tYW58ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "Amina",
      message: "I love how transparent and impactful the donation process is.",
      image:
        "https://images.unsplash.com/photo-1729021284682-8b26fef07721?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTkwfHxCbGFjayUyMGhhcHB5JTIwd29tYW58ZW58MHx8MHx8fDA%3D",
    },
  ];

  // Select container
  const container = document.querySelector(".testimonialContainer");

  // Render testimonials dynamically
  testimonials.forEach((testimonial) => {
    const testimonialCard = document.createElement("div");
    testimonialCard.classList.add("testimonialCards");

    testimonialCard.innerHTML = `
      <div class="testimonialcard-text">
        <p> "${testimonial.message}" </p>
      </div>

      <div class="testimonialcard-text-and-persona">
        <div class="testimonial-img">
          <img src="${testimonial.image}" alt="${testimonial.name}" onerror="this.src='./image/default-avatar.png';">
        </div>
        <div class="testimonial-persona">
          <h4>— ${testimonial.name}</h4>
        </div>
      </div>
    `;

    container.appendChild(testimonialCard);
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
