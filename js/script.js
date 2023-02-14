const spinner = document.querySelector('.spinner');
const global = {
  currentPage: window.location.pathname,
};

//fetch movies
async function displayPopularMovies() {
  const { results: movies } = await fetchAPIData('movie/popular');
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

// fetch tv shows
async function displayTVShows() {
  const { results: shows } = await fetchAPIData('tv/popular');
  const popularShowsDiv = document.querySelector('#popular-shows');
  shows.forEach((show) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
          <a href="movie-details.html?id=${show.id}">
              ${
                show.poster_path
                  ? `<img
                      src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                      class="card-img-top"
                      alt="${show.name}"
                  />`
                  : `<img
                      src="images/no-image.jpg"
                      class="card-img-top"
                      alt="${show.name}"
                  />`
              }
          </a>
          <div class="card-body">
              <h5 class="card-title">${show.name}</h5>
              <p class="card-text">
                  <small class="text-muted">First air date: ${
                    show.first_air_date
                  }</small>
              </p>
          </div>`;
    popularShowsDiv.appendChild(card);
  });
}

async function fetchAPIData(endpoint) {
  const API_KEY = `d620e91d55d898d76fea102541d21c76`;
  const API_URL = `https://api.themoviedb.org/3/`;
  showSpinner();
  const res = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await res.json();
  hideSpinner();
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
      displayPopularMovies();
      break;
    case '/movies.html':
      break;
    case '/shows.html':
      displayTVShows();
      break;
    case '/tv-details.html':
      console.log('TV show details');
      break;
  }
  displayActivePage();
}

function showSpinner() {
  spinner.classList.add('show');
}

function hideSpinner() {
  spinner.classList.remove('show');
}

// Event listeners
document.addEventListener('DOMContentLoaded', init);
