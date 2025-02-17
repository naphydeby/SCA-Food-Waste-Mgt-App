// Sample data for food items
const foodItems = [
  {
      id: 1,
      name: "Amina Ismaila",
      price: 0.00,
      category: "Breakfast",
      image: "/images/foodimages/bread.jpg"
  },
  {
      id: 2,
      name: "Ife Oyelade",
      price: 0.00,
      category: "Lunch",
      image: "/images/foodimages/garri.jpg"
  },
  {
      id: 3,
      name: "Queen Idris",
      price: 0.00,
      category: "Dinner",
      image: "/images/foodimages/donation2.jpg"
  }
];

// Sample data for donation requests
const donationRequests = [
  {
      id: "DON-123",
      recipient: "Sarah Johnson",
      address: "123 Main St",
      items: "Vegetables, Bread",
      status: "Pending"
  },
  {
      id: "DON-124",
      recipient: "Mike Smith",
      address: "456 Oak Ave",
      items: "Canned Goods",
      status: "Completed"
  },
  {
      id: "DON-125",
      recipient: "Emma Davis",
      address: "789 Pine Rd",
      items: "Fresh Fruits",
      status: "In Progress"
  }
];

// Initialize the dashboards when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeUserDashboard();
  initializeDonorDashboard();
  initializeMenuPage();
  setupLoginFunctionality();
});

function initializeUserDashboard() {
  const foodGrid = document.querySelector('.food-grid');
  const mealList = document.querySelector('.meal-list');
  
  if (foodGrid) {
      // Populate food grid
      foodItems.forEach(item => {
          const foodCard = createFoodCard(item);
          foodGrid.appendChild(foodCard);
      });
  }

  if (mealList) {
      // Populate meal list
      foodItems.forEach(item => {
          const mealItem = createMealItem(item);
          mealList.appendChild(mealItem);
      });
  }

  // Initialize category filters
  const categories = document.querySelectorAll('.category');
  categories.forEach(category => {
      category.addEventListener('click', () => {
          categories.forEach(c => c.classList.remove('active'));
          category.classList.add('active');
          filterFoodItems(category.textContent.trim());
      });
  });
}

function initializeDonorDashboard() {
  const donationTable = document.getElementById('donation-table-body');
  
  if (donationTable) {
      // Populate donation requests table
      donationRequests.forEach(request => {
          const row = createDonationRow(request);
          donationTable.appendChild(row);
      });
  }
}

function initializeMenuPage() {
  const menuGrid = document.querySelector('.menu-grid');
  
  if (menuGrid) {
      // Populate menu grid
      foodItems.forEach(item => {
          const menuItem = createMenuCard(item);
          menuGrid.appendChild(menuItem);
      });

      // Initialize category filters for menu page
      const menuCategories = document.querySelectorAll('.category-btn');
      menuCategories.forEach(category => {
          category.addEventListener('click', () => {
              menuCategories.forEach(c => c.classList.remove('active'));
              category.classList.add('active');
              filterMenuItems(category.textContent.trim());
          });
      });
  }
}

function createFoodCard(item) {
  const card = document.createElement('div');
  card.className = 'food-card';
  card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="food-card-content">
          <div class="food-card-title">
              <h3>${item.name}</h3>
              <span class="food-card-price">$${item.price.toFixed(2)}</span>
          </div>
          <div class="food-card-footer">
              <span class="food-card-category">${item.category}</span>
              <button class="order-button">Order</button>
          </div>
      </div>
  `;
  return card;
}

function createMealItem(item) {
  const mealItem = document.createElement('div');
  mealItem.className = 'meal-item';
  mealItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="meal-item-content">
          <div class="meal-item-title">${item.name}</div>
          <div class="meal-item-time">${item.category}</div>
      </div>
  `;
  return mealItem;
}

function createDonationRow(request) {
  const row = document.createElement('tr');
  row.innerHTML = `
      <td>${request.id}</td>
      <td>${request.recipient}</td>
      <td>${request.address}</td>
      <td>${request.items}</td>
      <td><span class="status-badge status-${request.status.toLowerCase()}">${request.status}</span></td>
      <td><button class="order-button">View Details</button></td>
  `;
  return row;
}

function createMenuCard(item) {
  const card = document.createElement('div');
  card.className = 'menu-card';
  card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="menu-card-content">
          <h3>${item.name}</h3>
          <p>${item.category}</p>
          <span class="menu-card-price">$${item.price.toFixed(2)}</span>
      </div>
  `;
  return card;
}

function filterFoodItems(category) {
  const foodCards = document.querySelectorAll('.food-card');
  foodCards.forEach(card => {
      const cardCategory = card.querySelector('.food-card-category').textContent.trim();
      if (category === 'All' || category === cardCategory) {
          card.style.display = 'block';
      } else {
          card.style.display = 'none';
      }
  });
}

function filterMenuItems(category) {
  const menuCards = document.querySelectorAll('.menu-card');
  menuCards.forEach(card => {
      const cardCategory = card.querySelector('p').textContent.trim();
      if (category === 'All' || category === cardCategory) {
          card.style.display = 'block';
      } else {
          card.style.display = 'none';
      }
  });
}

// Search functionality
function setupSearchFunctionality() {
  const searchInput = document.querySelector('.search-bar input');
  if (searchInput) {
      searchInput.addEventListener('input', function(e) {
          const searchTerm = e.target.value.toLowerCase();
          
          // For user dashboard
          const foodCards = document.querySelectorAll('.food-card');
          foodCards.forEach(card => {
              const title = card.querySelector('.food-card-title h3').textContent.toLowerCase();
              card.style.display = title.includes(searchTerm) ? 'block' : 'none';
          });
          
          // For donor dashboard
          const tableRows = document.querySelectorAll('#donation-table-body tr');
          tableRows.forEach(row => {
              const text = row.textContent.toLowerCase();
              row.style.display = text.includes(searchTerm) ? 'table-row' : 'none';
          });

          // For menu page
          const menuCards = document.querySelectorAll('.menu-card');
          menuCards.forEach(card => {
              const title = card.querySelector('h3').textContent.toLowerCase();
              card.style.display = title.includes(searchTerm) ? 'block' : 'none';
          });
      });
  }
}

// Login functionality
function setupLoginFunctionality() {
  const userLoginBtn = document.getElementById('user-login');
  const donorLoginBtn = document.getElementById('donor-login');

  if (userLoginBtn && donorLoginBtn) {
      userLoginBtn.addEventListener('click', function() {
          window.location.href = 'user-dashboard.html';
      });

      donorLoginBtn.addEventListener('click', function() {
          window.location.href = 'donor-dashboard.html';
      });
  }
}

// Call setup functions
setupSearchFunctionality();