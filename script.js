// Workout data
const workoutsData = [
  {
    id: 1,
    title: "HIIT Cardio Blast",
    category: "cardio",
    duration: 30,
    difficulty: "intermediate",
    calories: 350,
    equipment: ["none"],
    description:
      "High-intensity interval training to boost your metabolism and burn calories fast.",
    image: "https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg",
    exercises: [
      "Jumping Jacks - 45s",
      "Burpees - 30s",
      "Mountain Climbers - 45s",
      "High Knees - 30s",
    ],
  },
  {
    id: 2,
    title: "Strength Building",
    category: "strength",
    duration: 45,
    difficulty: "advanced",
    calories: 280,
    equipment: ["dumbbells", "barbell"],
    description:
      "Build lean muscle mass with compound movements and progressive overload.",
    image: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg",
    exercises: [
      "Deadlifts - 4x8",
      "Squats - 4x10",
      "Bench Press - 4x8",
      "Pull-ups - 3x12",
    ],
  },
  {
    id: 3,
    title: "Yoga Flow",
    category: "flexibility",
    duration: 60,
    difficulty: "beginner",
    calories: 180,
    equipment: ["yoga mat"],
    description:
      "Improve flexibility, balance, and mindfulness with this flowing yoga sequence.",
    image: "https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg",
    exercises: [
      "Sun Salutation A - 5 rounds",
      "Warrior Sequence - 10 min",
      "Hip Openers - 15 min",
      "Savasana - 10 min",
    ],
  },
  {
    id: 4,
    title: "Core Crusher",
    category: "strength",
    duration: 25,
    difficulty: "intermediate",
    calories: 200,
    equipment: ["none"],
    description:
      "Target your core muscles with this intense abdominal workout.",
    image: "https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg",
    exercises: [
      "Plank - 60s",
      "Russian Twists - 50 reps",
      "Bicycle Crunches - 40 reps",
      "Dead Bug - 20 each side",
    ],
  },
  {
    id: 5,
    title: "Beginner Cardio",
    category: "cardio",
    duration: 20,
    difficulty: "beginner",
    calories: 150,
    equipment: ["none"],
    description:
      "Perfect for beginners looking to improve cardiovascular health.",
    image: "https://images.pexels.com/photos/1730778/pexels-photo-1730778.jpeg",
    exercises: [
      "Marching in Place - 3 min",
      "Step Touches - 3 min",
      "Arm Circles - 2 min",
      "Walking - 12 min",
    ],
  },
  {
    id: 6,
    title: "Flexibility & Mobility",
    category: "flexibility",
    duration: 35,
    difficulty: "beginner",
    calories: 120,
    equipment: ["yoga mat"],
    description: "Improve your range of motion and reduce muscle tension.",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    exercises: [
      "Dynamic Warm-up - 5 min",
      "Hip Flexor Stretches - 10 min",
      "Shoulder Mobility - 10 min",
      "Cool Down Stretches - 10 min",
    ],
  },
];

// Global variables
let currentSlide = 0;
let slideInterval;
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let filteredWorkouts = [...workoutsData];
let showFavoritesOnly = false;
let currentPage = "home";

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

// Initialize application
function initializeApp() {
  setupNavigation();
  setupHeroSlider();
  setupWorkouts();
  setupNutrition();
  setupContactForm();
  setupAccordion();
  setupTabs();
  setupModal();
  loadDailyQuote();
  showPage("home");
}

// Page Navigation System
function showPage(pageName) {
  // Hide all pages
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => page.classList.remove("active"));

  // Show selected page
  const targetPage = document.getElementById(`${pageName}-page`);
  if (targetPage) {
    targetPage.classList.add("active");
  }

  // Update navigation active state
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("data-page") === pageName) {
      link.classList.add("active");
    }
  });

  currentPage = pageName;

  // Close mobile menu if open
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");

  // Scroll to top
  window.scrollTo(0, 0);

  // Initialize page-specific functionality
  if (pageName === "workouts") {
    setupWorkouts();
  } else if (pageName === "nutrition") {
    loadDailyQuote();
  }
}

// Navigation functionality
function setupNavigation() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const footerLinks = document.querySelectorAll(".footer-section a[data-page]");

  // Mobile menu toggle
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Navigation link clicks
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const page = this.getAttribute("data-page");
      if (page) {
        showPage(page);
      }
    });
  });

  // Footer link clicks
  footerLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const page = this.getAttribute("data-page");
      if (page) {
        showPage(page);
      }
    });
  });

  // Logo click
  const logo = document.querySelector(".nav-logo");
  logo.addEventListener("click", function () {
    showPage("home");
  });

  // Navbar background on scroll
  window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
    }
  });
}

// Hero slider functionality
function setupHeroSlider() {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (!slides.length) return;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

    currentSlide = index;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  // Auto-play slider
  function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function stopSlideShow() {
    clearInterval(slideInterval);
  }

  // Event listeners
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      stopSlideShow();
      startSlideShow();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      stopSlideShow();
      startSlideShow();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      stopSlideShow();
      startSlideShow();
    });
  });

  // Start auto-play
  startSlideShow();

  // Pause on hover
  const heroSection = document.querySelector(".hero");
  if (heroSection) {
    heroSection.addEventListener("mouseenter", stopSlideShow);
    heroSection.addEventListener("mouseleave", startSlideShow);
  }
}

// Workouts functionality
function setupWorkouts() {
  const workoutsGrid = document.getElementById("workoutsGrid");
  const categoryFilter = document.getElementById("categoryFilter");
  const difficultyFilter = document.getElementById("difficultyFilter");
  const favoritesToggle = document.getElementById("favoritesToggle");
  const favoritesCount = document.getElementById("favoritesCount");

  if (!workoutsGrid) return;

  function renderWorkouts(workouts) {
    workoutsGrid.innerHTML = "";

    if (workouts.length === 0) {
      workoutsGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                    <i class="fas fa-search" style="font-size: 3rem; color: #9ca3af; margin-bottom: 1rem;"></i>
                    <h3 style="color: #6b7280; margin-bottom: 0.5rem;">No workouts found</h3>
                    <p style="color: #9ca3af;">Try adjusting your filters to see results.</p>
                </div>
            `;
      return;
    }

    workouts.forEach((workout) => {
      const workoutCard = createWorkoutCard(workout);
      workoutsGrid.appendChild(workoutCard);
    });
  }

  function createWorkoutCard(workout) {
    const card = document.createElement("div");
    card.className = "workout-card";
    card.innerHTML = `
            <div class="workout-image" style="background-image: url('${
              workout.image
            }')">
                <button class="favorite-btn ${
                  favorites.includes(workout.id) ? "active" : ""
                }" 
                        onclick="toggleFavorite(${workout.id})">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <div class="workout-content">
                <div class="workout-header">
                    <h3 class="workout-title">${workout.title}</h3>
                    <span class="difficulty-badge difficulty-${
                      workout.difficulty
                    }">
                        ${getDifficultyText(workout.difficulty)}
                    </span>
                </div>
                <p class="workout-description">${workout.description}</p>
                <div class="workout-stats">
                    <span><i class="fas fa-clock"></i> ${
                      workout.duration
                    } min</span>
                    <span><i class="fas fa-fire"></i> ${
                      workout.calories
                    } cal</span>
                </div>
                <div class="workout-footer">
                    <div class="equipment">Equipment: ${workout.equipment.join(
                      ", "
                    )}</div>
                    <button class="btn btn-primary" onclick="openWorkoutModal(${
                      workout.id
                    })">
                        View Details
                    </button>
                </div>
            </div>
        `;
    return card;
  }

  function getDifficultyText(difficulty) {
    const difficultyMap = {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
    };
    return difficultyMap[difficulty] || difficulty;
  }

  function filterWorkouts() {
    const category = categoryFilter ? categoryFilter.value : "";
    const difficulty = difficultyFilter ? difficultyFilter.value : "";

    filteredWorkouts = workoutsData.filter((workout) => {
      const categoryMatch = !category || workout.category === category;
      const difficultyMatch = !difficulty || workout.difficulty === difficulty;
      const favoriteMatch =
        !showFavoritesOnly || favorites.includes(workout.id);

      return categoryMatch && difficultyMatch && favoriteMatch;
    });

    renderWorkouts(filteredWorkouts);
  }

  function updateFavoritesCount() {
    if (favoritesCount) {
      favoritesCount.textContent = favorites.length;
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  // Global functions for workout functionality
  window.toggleFavorite = function (workoutId) {
    const index = favorites.indexOf(workoutId);
    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(workoutId);
    }
    updateFavoritesCount();
    filterWorkouts();
  };

  window.openWorkoutModal = function (workoutId) {
    const workout = workoutsData.find((w) => w.id === workoutId);
    if (workout) {
      showWorkoutModal(workout);
    }
  };

  // Event listeners
  if (categoryFilter) {
    categoryFilter.addEventListener("change", filterWorkouts);
  }

  if (difficultyFilter) {
    difficultyFilter.addEventListener("change", filterWorkouts);
  }

  if (favoritesToggle) {
    favoritesToggle.addEventListener("click", function () {
      showFavoritesOnly = !showFavoritesOnly;
      this.classList.toggle("btn-primary", showFavoritesOnly);
      this.classList.toggle("btn-outline", !showFavoritesOnly);
      this.innerHTML = `
                <i class="fas fa-heart"></i>
                ${showFavoritesOnly ? "Show All" : "Show Favorites"} (${
        favorites.length
      })
            `;
      filterWorkouts();
    });
  }

  // Initialize
  updateFavoritesCount();
  renderWorkouts(workoutsData);
}

// Modal functionality
function setupModal() {
  const modal = document.getElementById("workoutModal");
  const modalClose = document.getElementById("modalClose");

  if (!modal || !modalClose) return;

  modalClose.addEventListener("click", closeModal);

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });
}

function showWorkoutModal(workout) {
  const modal = document.getElementById("workoutModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalImage = document.getElementById("modalImage");
  const modalDescription = document.getElementById("modalDescription");
  const modalDuration = document.getElementById("modalDuration");
  const modalCalories = document.getElementById("modalCalories");
  const modalExercises = document.getElementById("modalExercises");

  if (!modal) return;

  modalTitle.textContent = workout.title;
  modalImage.src = workout.image;
  modalImage.alt = workout.title;
  modalDescription.textContent = workout.description;
  modalDuration.textContent = `${workout.duration} min`;
  modalCalories.textContent = `${workout.calories} cal`;

  modalExercises.innerHTML = "";
  workout.exercises.forEach((exercise) => {
    const li = document.createElement("li");
    li.textContent = exercise;
    modalExercises.appendChild(li);
  });

  modal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("workoutModal");
  if (modal) {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
  }
}

// Nutrition functionality
function setupNutrition() {
  loadDailyQuote();
}

async function loadDailyQuote() {
  const quoteText = document.getElementById("quoteText");
  const quoteAuthor = document.getElementById("quoteAuthor");

  if (!quoteText || !quoteAuthor) return;

  try {
    const response = await fetch(
      "https://api.quotable.io/random?tags=motivational"
    );
    const data = await response.json();

    quoteText.textContent = data.content;
    quoteAuthor.textContent = `— ${data.author}`;
  } catch (error) {
    quoteText.textContent = "Stay motivated on your nutrition journey!";
    quoteAuthor.textContent = "— FitNutrition";
  }
}

// Tabs functionality
function setupTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab");

      // Remove active class from all tabs and contents
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      // Add active class to clicked tab and corresponding content
      this.classList.add("active");
      const targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  });
}

// Accordion functionality
function setupAccordion() {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const accordionItem = this.parentElement;
      const isActive = accordionItem.classList.contains("active");

      // Close all accordion items
      document.querySelectorAll(".accordion-item").forEach((item) => {
        item.classList.remove("active");
      });

      // Open clicked item if it wasn't active
      if (!isActive) {
        accordionItem.classList.add("active");
      }
    });
  });
}

// Contact form functionality
function setupContactForm() {
  const contactForm = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  if (!contactForm || !successMessage) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm()) {
      // Simulate form submission
      setTimeout(() => {
        contactForm.style.display = "none";
        successMessage.classList.add("show");

        // Reset form after 5 seconds
        setTimeout(() => {
          contactForm.style.display = "block";
          successMessage.classList.remove("show");
          contactForm.reset();
          clearErrors();
        }, 5000);
      }, 1000);
    }
  });

  function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    let isValid = true;

    // Clear previous errors
    clearErrors();

    // Validate name
    if (!name) {
      showError("nameError", "Name is required");
      isValid = false;
    }

    // Validate email
    if (!email) {
      showError("emailError", "Email is required");
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError("emailError", "Please enter a valid email address");
      isValid = false;
    }

    // Validate message
    if (!message) {
      showError("messageError", "Message is required");
      isValid = false;
    } else if (message.length < 10) {
      showError("messageError", "Message must be at least 10 characters long");
      isValid = false;
    }

    return isValid;
  }

  function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  function clearErrors() {
    const errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach((element) => {
      element.textContent = "";
    });
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Intersection Observer for animations
function setupAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".feature-card, .program-card, .workout-card"
  );
  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", setupAnimations);
