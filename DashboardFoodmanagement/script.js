// Sample data for food items
// Sample data for food items
const foodItems = [
    {
        id: 1,
        name: "Bread",
        price: 0.00,
        category: "Snacks",
        image: "/images/foodimages/bread.jpg"
    },
    {
        id: 2,
        name: "Rice",
        price: 0.00,
        category: "FreshFood",
        image: "/images/foodimages/garri.jpg"
    },
    {
        id: 3,
        name: "Provisions",
        price: 0.00,
        category: "Canned food",
        image: "/images/foodimages/donation2.jpg"
    },
    
   
    {
        id: 6,
        name: "Spaghetti Bolognese",
        price: 10.99,
        category: "RawFood",
        image: "/images/foodimages/vegetables.jpg"
    },
    
   
    {
        id: 9,
        name: "Yam",
        price: 9.99,
        category: "Dinner",
        image: "/images/foodimages/yam.jpg"
    },
  
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
      items: "Fresh food",
      status: "Denied"
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
  const categories = document.querySelectorAll('.category' , '.category-btn');
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

//order js
document.addEventListener("DOMContentLoaded", function() {
    const ordersList = document.querySelector('.orders-list');
    const tabButtons = document.querySelectorAll('.tab-btn');

    // Dummy data for Active Orders
    const activeOrders = [
        {
            id: 1,
            restaurant: "Burger King",
            items: ["Whopper", "Fries", "Coke"],
            status: "Preparing",
            date: "2023-10-01"
        },
        {
            id: 2,
            restaurant: "Pizza Hut",
            items: ["Pepperoni Pizza", "Garlic Bread"],
            status: "Out for Delivery",
            date: "2023-10-02"
        }
    ];

    // Dummy data for Past Orders
    const pastOrders = [
        {
            id: 3,
            restaurant: "McDonald's",
            items: ["Big Mac", "Chicken Nuggets", "Apple Pie"],
            status: "Delivered",
            date: "2023-09-25"
        },
        {
            id: 4,
            restaurant: "Subway",
            items: ["Turkey Sandwich", "Cookie"],
            status: "Delivered",
            date: "2023-09-20"
        }
    ];

    // Function to render orders
    function renderOrders(orders) {
        ordersList.innerHTML = ''; // Clear current orders
        orders.forEach(order => {
            const orderItem = document.createElement('div');
            orderItem.className = 'order-item';
            orderItem.innerHTML = `
                <h3>${order.restaurant}</h3>
                <p><strong>Items:</strong> ${order.items.join(', ')}</p>
                <p><strong>Status:</strong> ${order.status}</p>
                <p><strong>Date:</strong> ${order.date}</p>
            `;
            ordersList.appendChild(orderItem);
        });
    }

    // Initial render of Active Orders
    renderOrders(activeOrders);

    // Tab switching functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            this.classList.add('active');

            // Render the appropriate orders based on the button text
            if (this.textContent === "Active Orders") {
                renderOrders(activeOrders);
            } else if (this.textContent === "Past Orders") {
                renderOrders(pastOrders);
            }
        });
    });
});

// schedule js 
document.addEventListener("DOMContentLoaded", function () {
    const scheduledMealsSection = document.querySelector(".scheduled-meals");
    const calendarView = document.querySelector(".calendar-view");

    // Dummy data for upcoming meals
    const upcomingMeals = [
        {
            id: 1,
            date: "2023-10-05",
            meal: "Breakfast",
            restaurant: "McDonald's",
            items: ["Pancakes", "Orange Juice"]
        },
        {
            id: 2,
            date: "2023-10-06",
            meal: "Lunch",
            restaurant: "Subway",
            items: ["Turkey Sandwich", "Chips", "Soda"]
        },
        {
            id: 3,
            date: "2023-10-07",
            meal: "Dinner",
            restaurant: "Pizza Hut",
            items: ["Pepperoni Pizza", "Garlic Bread", "Soda"]
        },
        {
            id: 4,
            date: "2023-10-08",
            meal: "Breakfast",
            restaurant: "Starbucks",
            items: ["Coffee", "Croissant"]
        },
        {
            id: 5,
            date: "2023-10-09",
            meal: "Lunch",
            restaurant: "Burger King",
            items: ["Whopper", "Fries", "Coke"]
        }
    ];

    // Function to render upcoming meals for a specific date
    function renderUpcomingMeals(date) {
        const mealsForDate = upcomingMeals.filter(meal => meal.date === date);
        scheduledMealsSection.innerHTML = "<h2>Upcoming Meals</h2>"; // Reset the heading

        if (mealsForDate.length > 0) {
            mealsForDate.forEach(meal => {
                const mealItem = document.createElement("div");
                mealItem.className = "meal-item";
                mealItem.innerHTML = `
                    <h3>${meal.meal} - ${meal.date}</h3>
                    <p><strong>Restaurant:</strong> ${meal.restaurant}</p>
                    <p><strong>Items:</strong> ${meal.items.join(", ")}</p>
                `;
                scheduledMealsSection.appendChild(mealItem);
            });
        } else {
            scheduledMealsSection.innerHTML += `<p>No meals scheduled for ${date}.</p>`;
        }
    }

    // Function to render a basic calendar with available dates
    function renderCalendar() {
        const calendarInput = document.createElement("input");
        calendarInput.type = "date";
        calendarInput.className = "calendar-input";
        calendarInput.value = new Date().toISOString().split("T")[0]; // Set default to today's date

        // Add available dates to the calendar input
        const availableDates = upcomingMeals.map(meal => meal.date);
        calendarInput.min = availableDates[0]; // Set the minimum date
        calendarInput.max = availableDates[availableDates.length - 1]; // Set the maximum date

        // Add event listener for date change
        calendarInput.addEventListener("change", function (e) {
            const selectedDate = e.target.value;
            renderUpcomingMeals(selectedDate);
        });

        calendarView.appendChild(calendarInput);

        // Render meals for the default date (today)
        renderUpcomingMeals(calendarInput.value);
    }

    // Initial render
    renderCalendar();
});

//logout js
document.addEventListener("DOMContentLoaded", function () {
    const logoutLink = document.getElementById("logout-link");

    // Logout functionality
    if (logoutLink) {
        logoutLink.addEventListener("click", function (e) {
            e.preventDefault(); // Prevent the default link behavior

            // Perform logout actions (e.g., clear session, redirect to login page)
            alert("Press Ok if you are sure you want to logout"); // Optional: Show a confirmation message
            window.location.href = "login.html"; // Redirect to the login page
        });
    }
});

//donor dashboard js data
document.addEventListener("DOMContentLoaded", function () {
    // Sample donation data
    const activeDonations = [
        { id: 1, title: "Canned Food", quantity: "10 boxes", date: "2025-02-05" },
        { id: 2, title: "Bags of Rice", quantity: "5 bags", date: "2025-02-04" },
    ];
    
    const scheduledDonations = [
        { id: 3, title: "Milk Cartons", quantity: "20 cartons", date: "2025-02-10" },
    ];

    const donationHistory = [
        { date: "2025-02-01", recipient: "Local Shelter", items: "5kg Rice, 10 Cans of Beans", status: "Delivered" },
        { date: "2025-01-28", recipient: "Community Kitchen", items: "15 Packs of Noodles", status: "Pending" },
    ];

    // Populate active donations by default
    function renderDonations(donations) {
        const list = document.querySelector(".donations-list");
        list.innerHTML = ""; // Clear list
        donations.forEach(donation => {
            const item = document.createElement("div");
            item.classList.add("donation-item");
            item.innerHTML = `
                <h3>${donation.title}</h3>
                <p>Quantity: ${donation.quantity}</p>
                <p>Date: ${donation.date}</p>
            `;
            list.appendChild(item);
        });
    }

    renderDonations(activeDonations);

    // Tab switching functionality
    document.querySelectorAll(".tab-btn").forEach((button, index) => {
        button.addEventListener("click", () => {
            document.querySelector(".tab-btn.active").classList.remove("active");
            button.classList.add("active");
            renderDonations(index === 0 ? activeDonations : scheduledDonations);
        });
    });

    // Add new donation
    document.querySelector(".primary-btn").addEventListener("click", () => {
        // Prompt user for donation details
        const title = prompt("Enter donation item name:");
        if (!title) return; // Exit if no input
    
        const quantity = prompt("Enter quantity:");
        if (!quantity) return;
    
        const date = new Date().toISOString().split("T")[0];
    
        // Create new donation object
        const newDonation = {
            id: activeDonations.length + 1,
            title: title,
            quantity: quantity + " units",
            date: date,
        };
    
        // Add donation and re-render list
        activeDonations.push(newDonation);
        renderDonations(activeDonations);
    });
    

    // Populate Donation History Table
    function renderDonationHistory() {
        const tableBody = document.querySelector(".history-table tbody");
        if (!tableBody) return;
        tableBody.innerHTML = "";
        donationHistory.forEach(entry => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${entry.date}</td>
                <td>${entry.recipient}</td>
                <td>${entry.items}</td>
                <td>${entry.status}</td>
                <td><button class='view-btn'>View</button></td>
            `;
            tableBody.appendChild(row);
        });
    }

    renderDonationHistory();
});
//histrory data
document.addEventListener("DOMContentLoaded", function () {
    const historyTableBody = document.querySelector(".history-table tbody");

    // Sample donation history data
    const donationHistory = [
        { date: "2025-02-01", recipient: "Lagos Food Bank", items: "Canned Food, Rice, Water", status: "Delivered" },
        { date: "2025-01-28", recipient: "Hope Foundation", items: "Bread, Milk, Snacks", status: "Pending" },
        { date: "2025-01-20", recipient: "Red Cross", items: "Vegetables, Fruits", status: "Delivered" },
        { date: "2025-01-15", recipient: "Orphanage Home", items: "Clothing, Shoes", status: "Completed" },
    ];

    // Function to render table rows
    function renderTable() {
        historyTableBody.innerHTML = ""; // Clear previous data
        donationHistory.forEach((donation, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${donation.date}</td>
                <td>${donation.recipient}</td>
                <td>${donation.items}</td>
                <td>${donation.status}</td>
                <td><button class="delete-btn" data-index="${index}">Delete</button></td>
            `;
            historyTableBody.appendChild(row);
        });
    }

    // Delete donation history entry
    historyTableBody.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-btn")) {
            const index = event.target.getAttribute("data-index");
            donationHistory.splice(index, 1); // Remove from array
            renderTable(); // Re-render table
        }
    });

    // Initial render
    renderTable();
});

// donor history data js
document.addEventListener("DOMContentLoaded", function () {
    // Dummy Data for Analytics
    const donationsOverTime = [
        { month: "January", count: 20 },
        { month: "February", count: 35 },
        { month: "March", count: 50 },
        { month: "April", count: 40 },
        { month: "May", count: 70 },
    ];

    const topDonatedItems = [
        { item: "Rice", count: 120 },
        { item: "Beans", count: 85 },
        { item: "Canned Food", count: 60 },
        { item: "Milk", count: 45 },
    ];

    const recipientDemographics = {
        "Children": 40,
        "Elderly": 30,
        "Homeless": 50,
        "Others": 20,
    };

    const impactSummary = {
        totalDonations: 500,
        totalBeneficiaries: 250,
        foodDistributed: "1,200 kg",
    };

    // Populating the Analytics Page
    document.querySelector(".analytics-grid").innerHTML = `
        <div class="chart-container">
            <h3>Donations Over Time</h3>
            <ul>
                ${donationsOverTime.map(d => `<li>${d.month}: ${d.count} donations</li>`).join('')}
            </ul>
        </div>
        <div class="chart-container">
            <h3>Top Donated Items</h3>
            <ul>
                ${topDonatedItems.map(item => `<li>${item.item}: ${item.count} times</li>`).join('')}
            </ul>
        </div>
        <div class="chart-container">
            <h3>Impact Summary</h3>
            <p>Total Donations: ${impactSummary.totalDonations}</p>
            <p>Total Beneficiaries: ${impactSummary.totalBeneficiaries}</p>
            <p>Food Distributed: ${impactSummary.foodDistributed}</p>
        </div>
        <div class="chart-container">
            <h3>Recipient Demographics</h3>
            <ul>
                ${Object.entries(recipientDemographics).map(([group, count]) => `<li>${group}: ${count} people</li>`).join('')}
            </ul>
        </div>
    `;
});

