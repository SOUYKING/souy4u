const apiKey = '4728d96d7';
const apiUrl = 'https://mdblist.p.rapidapi.com/movie/list';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': apiKey,
    'X-RapidAPI-Host': 'mdblist.p.rapidapi.com',
  },
};

// Function to fetch movie data
async function fetchMovieData() {
  try {
    const response = await fetch(apiUrl, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Assuming 'data' is an array of movie objects, update your movie cards here
    const movieCards = document.querySelectorAll('.card');

    data.forEach((movie, index) => {
      const card = movieCards[index];
      const titleElement = card.querySelector('h3');
      const imageElement = card.querySelector('img');
      const ratingElement = card.querySelector('.movie-rating'); // Added for displaying rating

      titleElement.textContent = movie.title;
      imageElement.src = movie.poster; // Update 'poster' property based on your API response
      ratingElement.textContent = `Rating: ${movie.rating}`; // Display movie rating
      // Update other card elements as needed
    });
  } catch (error) {
    console.error('Error fetching movie data:', error);
  }
}

const searchInput = document.querySelector('input[type="text"]');
const allCards = document.querySelectorAll('.card');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();

  allCards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    const description = card.querySelector('p') ? card.querySelector('p').textContent.toLowerCase() : '';

    if (title.includes(query) || description.includes(query)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

const home = document.querySelector('#home');
const movies = document.querySelector('#movies');
const tvShows = document.querySelector('#tv-shows');

const movieCards = document.querySelectorAll('.card:not(.tv-show)');
const tvShowCards = document.querySelectorAll('.card.tv-show');

home.addEventListener('click', () => {
  movieCards.forEach(card => {
    card.style.display = 'block';
  });
  tvShowCards.forEach(card => {
    card.style.display = 'block';
  });
});

movies.addEventListener('click', () => {
  movieCards.forEach(card => {
    card.style.display = 'block';
  });
  tvShowCards.forEach(card => {
    card.style.display = 'none';
  });
});

tvShows.addEventListener('click', () => {
  movieCards.forEach(card => {
    card.style.display = 'none';
  });
  tvShowCards.forEach(card => {
    card.style.display = 'block';
  });
});

const sidebarBtns = document.querySelectorAll('.sidebar-btn');
const contentSections = document.querySelectorAll('.content-section');

sidebarBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const contentToShow = btn.getAttribute('data-content');

    sidebarBtns.forEach((btn) => {
      btn.classList.remove('active');
    });

    contentSections.forEach((section) => {
      section.classList.remove('active');
    });

    btn.classList.add('active');
    document.querySelector(`.${contentToShow}`).classList.add('active');
  });
});

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

const menuItems = document.querySelectorAll('.menu a');

menuItems.forEach(item => {
  item.addEventListener('click', function (e) {
    e.preventDefault();

    // Remove the 'active' class from all menu items
    menuItems.forEach(item => item.classList.remove('active'));
    this.classList.add('active');

    const filter = this.getAttribute('data-filter');

    allCards.forEach(card => {
      // Show all cards if the clicked menu item is 'All'
      if (filter === 'all') {
        card.style.display = 'block';
      } else {
        // Hide the card if it doesn't have the specified filter class
        if (!card.classList.contains(filter)) {
          card.style.display = 'none';
        } else {
          card.style.display = 'block';
        }
      }
    });
  });
});

// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// List of movie titles you want to fetch ratings for
const movieTitles = [
  'The Flash (2023)',
  'Black Panther: Wakanda Forever (2022)',
  'Barbie (2023)',
  // Add more movie titles as needed
];

// Function to fetch movie ratings
async function fetchMovieRatings() {
  try {
    const ratings = await Promise.all(
      movieTitles.map(async (title, index) => {
        const omdbUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(
          title
        )}&apikey=728d96d7`; // Replace with your actual OMDb API key
        const response = await fetch(omdbUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return {
          title: title,
          rating: data.imdbRating,
        };
      })
    );

    // Update your movie cards with ratings here
    ratings.forEach((rating, index) => {
      const card = movieCards[index];
      const ratingElement = card.querySelector('.rating');

      ratingElement.textContent = `Rating: ${rating.rating}`;
    });
  } catch (error) {
    console.error('Error fetching movie ratings:', error);
  }
}

// Call the fetchMovieData and fetchMovieRatings functions when needed
fetchMovieData();
fetchMovieRatings();
