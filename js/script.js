const global = {
  currentPage: window.location.pathname,
};

//fetch movies
async function displayPopularMovies(endpoint) {
  const { results: movies } = await fetchAPIData(endpoint);
  const popularMoviesDiv = document.querySelector('#popular-movies');
  movies.forEach((movie) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
                    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                    class="card-img-top"
                    alt="${movie.title}"
                />`
                : `<img
                    src="images/no-image.jpg"
                    class="card-img-top"
                    alt="${movie.title}"
                />`
            }
        </a>
        <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
                <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
        </div>`;
    popularMoviesDiv.appendChild(card);
  });
}

async function fetchAPIData(endpoint) {
  const API_KEY = `d620e91d55d898d76fea102541d21c76`;
  const API_URL = `https://api.themoviedb.org/3/`;
  const res = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await res.json();
  return data;
}

// Highlight active link
function displayActivePage() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies('movie/popular');
      break;
    case '/movies.html':
      console.log('Movies');
      break;
    case '/shows.html':
      console.log('Shows');
      break;
    case '/tv-details.html':
      console.log('TV show details');
      break;
  }
  displayActivePage();
}

// Event listeners
document.addEventListener('DOMContentLoaded', init);
