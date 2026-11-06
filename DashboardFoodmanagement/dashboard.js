// Sample data for food items
const foodItems = [
    {
        id: 1,
        name: "Bread",
        category: "Snacks",
        image: "/DashboardFoodmanagement/images/foodimages/bread.jpg"
    },
    {
        id: 2,
        name: "Rice",
        category: "FreshFood",
        image: "/DashboardFoodmanagement/images/foodimages/rice.jpg"
    },
    {
        id: 3,
        name: "Provisions",
        category: "Canned food",
        image: "/DashboardFoodmanagement/images/foodimages/canned food.jpg"
    },
    {
        id: 6,
        name: "beans",
        category: "RawFood",
        image: "/DashboardFoodmanagement/images/foodimages/beans.jpg"
    },
    {
        id: 9,
        name: "Yam",
        category: "Dinner",
        image: "/DashboardFoodmanagement/images/foodimages/yam.jpg"
    },
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

// Sample donation requests data
const donationRequests = [
    { id: 1, recipient: "John Doe", address: "123 Food Street", items: "Rice, Beans, Oil", status: "Pending" },
    { id: 2, recipient: "Jane Smith", address: "456 Health Ave", items: "Canned Food, Milk", status: "Completed" },
    { id: 3, recipient: "Robert Johnson", address: "789 Charity Blvd", items: "Vegetables, Fruits", status: "Denied" },
];

// Function to create table rows for donations
function createDonationRow(request) {
    const row = document.createElement("tr");
    
    // Determine the status class
    let statusClass = "";
    switch(request.status.toLowerCase()) {
        case "pending":
            statusClass = "status-pending";
            break;
        case "completed":
            statusClass = "status-completed";
            break;
        case "denied":
            statusClass = "status-denied";
            break;
        default:
            statusClass = "status-pending";
    }

    row.innerHTML = `
        <td>${request.id}</td>
        <td>${request.recipient}</td>
        <td>${request.address}</td>
        <td>${request.items}</td>
        <td><span class="status-badge ${statusClass}">${request.status}</span></td>
        <td><button class="view-details-btn" data-id="${request.id}">View Details</button></td>
    `;

    return row;
}

// Function to initialize the donor dashboard
function initializeDonorDashboard() {
    const donationTable = document.getElementById("donation-table-body");
    const modal = document.getElementById("donation-modal");
    const modalContent = document.getElementById("donation-summary");
    const closeModal = document.querySelector(".close-btn");

    if (donationTable) {
        // Populate donation requests table
        donationRequests.forEach(request => {
            const row = createDonationRow(request);
            donationTable.appendChild(row);
        });

        // Add click event listeners to all view details buttons
        const viewButtons = document.querySelectorAll(".view-details-btn");
        viewButtons.forEach(button => {
            button.addEventListener("click", function() {
                const requestId = this.getAttribute("data-id");
                const request = donationRequests.find(req => req.id == requestId);

                if (request) {
                    modalContent.innerHTML = `
                        <p><strong>Recipient:</strong> ${request.recipient}</p>
                        <p><strong>Address:</strong> ${request.address}</p>
                        <p><strong>Items:</strong> ${request.items}</p>
                        <p><strong>Status:</strong> <span class="status-badge status-${request.status.toLowerCase()}">${request.status}</span></p>
                    `;

                    modal.style.display = "flex"; // Show modal
                }
            });
        });

        // Also use event delegation for dynamically created buttons
        document.addEventListener("click", function(event) {
            if (event.target.classList.contains("view-details-btn")) {
                const requestId = event.target.getAttribute("data-id");
                const request = donationRequests.find(req => req.id == requestId);

                if (request) {
                    modalContent.innerHTML = `
                        <p><strong>Recipient:</strong> ${request.recipient}</p>
                        <p><strong>Address:</strong> ${request.address}</p>
                        <p><strong>Items:</strong> ${request.items}</p>
                        <p><strong>Status:</strong> <span class="status-badge status-${request.status.toLowerCase()}">${request.status}</span></p>
                    `;

                    modal.style.display = "flex"; // Show modal
                }
            }
        });

        // Close modal when clicking the close button
        if (closeModal) {
            closeModal.addEventListener("click", function() {
                modal.style.display = "none";
            });
        }

        // Close modal when clicking outside the modal content
        window.addEventListener("click", function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
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
          </div>
          <div class="food-card-footer">
              <span class="food-card-category">${item.category}</span>
              <button class="order-button">claim</button>
          </div>
      </div>
  `;
  const claimButton = card.querySelector('.order-button');
  claimButton.addEventListener('click', () => {
    window.location.href = "user-dashboard.html"; // Redirect with item ID
  });
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

function createMenuCard(item) {
  const card = document.createElement('div');
  card.className = 'menu-card';
  card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="menu-card-content">
          <h3>${item.name}</h3>
          <p>${item.category}</p>
          <span class="menu-card-price">$${item.price ? item.price.toFixed(2) : '0.00'}</span>
      </div>
  `;
  return card;
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
        if (!ordersList) return;
        
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
    if (ordersList && tabButtons.length > 0) {
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
    }
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
        if (!scheduledMealsSection) return;
        
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
        if (!calendarView) return;
        
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
    if (calendarView) {
        renderCalendar();
    }
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
            window.location.href = "../index.html"; // Redirect to the login page
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const activeDonations = [
        { id: 1, title: "Canned Food", quantity: "10 boxes", date: "2025-02-05" },
        { id: 2, title: "Bags of Rice", quantity: "5 bags", date: "2025-02-04" },
    ];

    const modal = document.getElementById("donation-modal");
    const openModalBtn = document.querySelector(".primary-btn");
    const closeModalBtn = document.querySelector(".close-btn");
    const donationForm = document.getElementById("donation-form");

    // Open modal
    if (openModalBtn) {
        openModalBtn.addEventListener("click", () => {
            if (modal) modal.style.display = "flex";
        });
    }

    // Close modal
    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    // Close modal if user clicks outside modal content
    if (modal) {
        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }

    // Handle form submission
    if (donationForm) {
        donationForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const title = document.getElementById("donation-title").value;
            const quantity = document.getElementById("donation-quantity").value;
            const date = new Date().toISOString().split("T")[0];

            if (!title || !quantity) return;

            const newDonation = { id: activeDonations.length + 1, title, quantity: quantity + " units", date };

            activeDonations.push(newDonation);
            renderDonations(activeDonations);

            // Close modal
            if (modal) modal.style.display = "none";
            donationForm.reset();
        });
    }

    // Render donation items
    function renderDonations(donations) {
        const list = document.querySelector(".donations-list");
        if (!list) return;
        
        list.innerHTML = "";

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

    const donationsList = document.querySelector(".donations-list");
    if (donationsList) {
        renderDonations(activeDonations);
    }

    // Donation History Data
    const donationHistory = [
        { date: "2025-02-01", recipient: "Lagos Food Bank", items: "Canned Food, Rice, Water", status: "Delivered" },
        { date: "2025-01-28", recipient: "Hope Foundation", items: "Bread, Milk, Snacks", status: "Pending" },
        { date: "2025-01-20", recipient: "Red Cross", items: "Vegetables, Fruits", status: "Delivered" },
        { date: "2025-01-15", recipient: "Orphanage Home", items: "Clothing, Shoes", status: "Completed" },
    ];

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
                <td><span class="status-badge status-${entry.status.toLowerCase()}">${entry.status}</span></td>
                <td><button class='view-btn'>View</button></td>
            `;
            tableBody.appendChild(row);
        });
    }

    renderDonationHistory();
});

//history data
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
        if (!historyTableBody) return;
        
        historyTableBody.innerHTML = ""; // Clear previous data
        donationHistory.forEach((donation, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${donation.date}</td>
                <td>${donation.recipient}</td>
                <td>${donation.items}</td>
                <td><span class="status-badge status-${donation.status.toLowerCase()}">${donation.status}</span></td>
                <td><button class="delete-btn" data-index="${index}">Delete</button></td>
            `;
            historyTableBody.appendChild(row);
        });
    }

    // Delete donation history entry
    if (historyTableBody) {
        historyTableBody.addEventListener("click", function (event) {
            if (event.target.classList.contains("delete-btn")) {
                const index = event.target.getAttribute("data-index");
                donationHistory.splice(index, 1); // Remove from array
                renderTable(); // Re-render table
            }
        });

        // Initial render
        renderTable();
    }
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
    const analyticsGrid = document.querySelector(".analytics-grid");
    if (analyticsGrid) {
        analyticsGrid.innerHTML = `
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
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menu-btn");
    const sidebar = document.querySelector(".sidebar");

    if (menuBtn && sidebar) {
        menuBtn.addEventListener("click", function () {
            sidebar.classList.toggle("show-sidebar");
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const saveBtn = document.getElementById("save-profile-btn");

    if (saveBtn) {
        saveBtn.addEventListener("click", function () {
            const formGroups = document.querySelectorAll("#donor-profile-form .form-group, #donation-preferences-form .form-group");

            formGroups.forEach(group => {
                const input = group.querySelector("input, select, textarea");
                if (input) {
                    const value = input.value;
                    const textElement = document.createElement("p");
                    textElement.textContent = value;
                    textElement.classList.add("saved-text");
                    group.replaceChild(textElement, input);
                }
            });

            // Hide the save button after saving
            saveBtn.style.display = "none";
        });
    }
});
