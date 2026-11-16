// Chapter 7: Dynamic Gallery / Showcase
// TravelExplore destination gallery

// Each destination is stored as an object inside this array.
const destinations = [
  {
    title: "Paris",
    country: "France",
    category: "City",
    image: "images/paris-france.jpg",
    description: "Paris is full of famous buildings, long history, and great food.",
    details: "Paris is known for the Eiffel Tower, the Louvre Museum, and the River Seine. It is a great place to explore art, history, cafes, and shops.",
    thingsToDo: ["Visit the Eiffel Tower", "Explore the Louvre Museum", "Walk along the Seine River"],
    fact: "The Eiffel Tower was originally planned to stand for only 20 years.",
    rating: 4.9,
    year: 2025
  },
  {
    title: "Banff",
    country: "Canada",
    category: "Nature",
    image: "images/banff.jpg",
    description: "Banff has bright blue lakes, tall mountains, and outdoor activities.",
    details: "Banff is located in the Canadian Rockies. Visitors can hike, canoe, explore mountain trails, and see beautiful lakes.",
    thingsToDo: ["Visit Lake Louise", "Drive the Icefields Parkway", "Explore Moraine Lake"],
    fact: "Banff became Canada's first national park in 1885.",
    rating: 4.9,
    year: 2024
  },
  {
    title: "Tokyo",
    country: "Japan",
    category: "City",
    image: "images/tokyo-japan.jpg",
    description: "Tokyo mixes traditional temples with bright lights and new technology.",
    details: "Tokyo is a large city with busy neighborhoods, peaceful temples, shopping areas, and many different foods to try.",
    thingsToDo: ["Visit Sensoji Temple", "See Shibuya Crossing", "Visit Tokyo Skytree"],
    fact: "Tokyo has one of the world's largest urban populations.",
    rating: 4.8,
    year: 2026
  },
  {
    title: "Maui",
    country: "Hawaii, USA",
    category: "Island",
    image: "images/maui-hawaii.webp",
    description: "Maui has beaches, green mountains, and a relaxed island feel.",
    details: "Maui is an island in Hawaii. It is known for its beaches, scenic drives, snorkeling areas, and Haleakala National Park.",
    thingsToDo: ["Visit Kaanapali Beach", "See Haleakala", "Drive the Road to Hana"],
    fact: "Haleakala means House of the Sun.",
    rating: 4.7,
    year: 2023
  },
  {
    title: "Santorini",
    country: "Greece",
    category: "Island",
    image: "images/greece.jpg",
    description: "Santorini is known for white buildings, blue roofs, and sunsets.",
    details: "Santorini is a Greek island with villages built along cliffs. Visitors can explore beaches, old ruins, and small streets.",
    thingsToDo: ["Watch the sunset in Oia", "Visit Red Beach", "Explore Akrotiri"],
    fact: "Santorini was shaped by a large volcanic eruption.",
    rating: 4.9,
    year: 2022
  },
  {
    title: "New York City",
    country: "United States",
    category: "City",
    image: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1000&q=85",
    description: "New York City has famous landmarks, parks, museums, and busy streets.",
    details: "New York City has five boroughs and many places to explore, including Central Park, Times Square, and the Statue of Liberty.",
    thingsToDo: ["Walk through Central Park", "Visit the Statue of Liberty", "Explore Times Square"],
    fact: "The Statue of Liberty was a gift from France in 1886.",
    rating: 4.8,
    year: 2021
  }
];

// These variables remember the current gallery settings.
let currentCategory = "All";
let currentSort = "az";
let searchText = "";
let favorites = [];

// Show the destinations on the page.
function showDestinations() {
  const gallery = document.getElementById("destinationGallery");
  gallery.innerHTML = "";

  let shownDestinations = [];

  // Check each destination to see if it matches the search and category.
  for (let i = 0; i < destinations.length; i++) {
    let destination = destinations[i];
    let matchesCategory = currentCategory === "All" || destination.category === currentCategory;
    let searchWords = (destination.title + " " + destination.country + " " + destination.description + " " + destination.category).toLowerCase();
    let matchesSearch = searchWords.includes(searchText);

    if (matchesCategory && matchesSearch) {
      shownDestinations.push(destination);
    }
  }

  // Sort the destinations based on the selected option.
  if (currentSort === "az") {
    shownDestinations.sort(function(a, b) {
      return a.title.localeCompare(b.title);
    });
  } else if (currentSort === "newest") {
    shownDestinations.sort(function(a, b) {
      return b.year - a.year;
    });
  } else if (currentSort === "highest") {
    shownDestinations.sort(function(a, b) {
      return b.rating - a.rating;
    });
  } else if (currentSort === "lowest") {
    shownDestinations.sort(function(a, b) {
      return a.rating - b.rating;
    });
  }

  // Create a card for every destination that matches.
  for (let i = 0; i < shownDestinations.length; i++) {
    let destination = shownDestinations[i];
    let card = document.createElement("article");
    card.className = "gallery-card";

    let image = document.createElement("img");
    image.className = "gallery-image";
    image.src = destination.image;
    image.alt = "View of " + destination.title;

    let cardContent = document.createElement("div");
    cardContent.className = "gallery-card-content";

    let category = document.createElement("span");
    category.className = "gallery-tag";
    category.textContent = destination.category;

    let title = document.createElement("h3");
    title.textContent = destination.title;

    let country = document.createElement("p");
    country.className = "gallery-country";
    country.textContent = destination.country;

    let description = document.createElement("p");
    description.className = "gallery-description";
    description.textContent = destination.description;

    let rating = document.createElement("p");
    rating.className = "gallery-rating";
    rating.textContent = "★ " + destination.rating + " / 5";

    let buttons = document.createElement("div");
    buttons.className = "gallery-buttons";

    let detailsButton = document.createElement("button");
    detailsButton.className = "details-button";
    detailsButton.textContent = "View Details";
    detailsButton.addEventListener("click", function() {
      showDetails(destination);
    });

    let favoriteButton = document.createElement("button");
    favoriteButton.className = "favorite-button";
    if (favorites.includes(destination.title)) {
      favoriteButton.textContent = "♥ Saved";
      favoriteButton.classList.add("saved");
    } else {
      favoriteButton.textContent = "♡ Favorite";
    }

    favoriteButton.addEventListener("click", function() {
      changeFavorite(destination.title);
    });

    buttons.appendChild(detailsButton);
    buttons.appendChild(favoriteButton);
    cardContent.appendChild(category);
    cardContent.appendChild(title);
    cardContent.appendChild(country);
    cardContent.appendChild(description);
    cardContent.appendChild(rating);
    cardContent.appendChild(buttons);
    card.appendChild(image);
    card.appendChild(cardContent);
    gallery.appendChild(card);
  }

  document.getElementById("resultCount").textContent = shownDestinations.length + " destinations found";

  if (shownDestinations.length === 0) {
    gallery.innerHTML = "<p class='no-results'>No destinations found. Try another search.</p>";
  }

  showFavorites();
}

// Open the details popup for a destination.
function showDetails(destination) {
  document.getElementById("detailsTitle").textContent = destination.title + ", " + destination.country;
  document.getElementById("detailsDescription").textContent = destination.details;
  document.getElementById("detailsFact").textContent = destination.fact;
  document.getElementById("detailsRating").textContent = "Rating: " + destination.rating + " / 5";
  document.getElementById("detailsYear").textContent = "Featured year: " + destination.year;

  let list = document.getElementById("detailsThings");
  list.innerHTML = "";

  for (let i = 0; i < destination.thingsToDo.length; i++) {
    let item = document.createElement("li");
    item.textContent = destination.thingsToDo[i];
    list.appendChild(item);
  }

  document.getElementById("detailsModal").classList.add("show-modal");
}

// Close the details popup.
function closeDetails() {
  document.getElementById("detailsModal").classList.remove("show-modal");
}

// Add or remove a destination from favorites.
function changeFavorite(title) {
  if (favorites.includes(title)) {
    favorites = favorites.filter(function(item) {
      return item !== title;
    });
  } else {
    favorites.push(title);
  }

  showDestinations();
}

// Display the saved favorites in their own section.
function showFavorites() {
  let favoritesList = document.getElementById("favoritesList");
  favoritesList.innerHTML = "";

  if (favorites.length === 0) {
    favoritesList.textContent = "You have not saved any destinations yet.";
  } else {
    for (let i = 0; i < favorites.length; i++) {
      let favorite = document.createElement("button");
      favorite.className = "favorite-link";
      favorite.textContent = favorites[i];
      favorite.addEventListener("click", function() {
        for (let j = 0; j < destinations.length; j++) {
          if (destinations[j].title === favorites[i]) {
            showDetails(destinations[j]);
          }
        }
      });
      favoritesList.appendChild(favorite);
    }
  }
}

// Filter buttons.
let filterButtons = document.querySelectorAll(".filter-button");
for (let i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function() {
    for (let j = 0; j < filterButtons.length; j++) {
      filterButtons[j].classList.remove("active-filter");
    }
    filterButtons[i].classList.add("active-filter");
    currentCategory = filterButtons[i].getAttribute("data-category");
    showDestinations();
  });
}

// Search bar.
document.getElementById("gallerySearch").addEventListener("input", function() {
  searchText = this.value.toLowerCase().trim();
  showDestinations();
});

// Sorting menu.
document.getElementById("gallerySort").addEventListener("change", function() {
  currentSort = this.value;
  showDestinations();
});

// Close popup with the close button or by clicking outside the popup.
document.getElementById("closeDetails").addEventListener("click", closeDetails);
document.getElementById("detailsModal").addEventListener("click", function(event) {
  if (event.target.id === "detailsModal") {
    closeDetails();
  }
});

// Show the gallery when the page first loads.
showDestinations();
