const spinner = document.querySelector('.spinner');
const global = {
  currentPage: window.location.pathname,
  queryString: window.location.search.split('=')[1],
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
          <a href="tv-details.html?id=${show.id}">
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

// fetch movies details
async function displayMovieDetails() {
  const movie = await fetchAPIData(`movie/${global.queryString}`);
  console.log(movie);
  const movieContainer = document.querySelector('#movie-details');

  const detailsTop = document.createElement('div');
  detailsTop.classList.add('details-top');
  const detailsBottom = document.createElement('div');
  detailsBottom.classList.add('details-bottom');
  detailsTop.innerHTML = `
        <div>
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
        </div>
        <div>
            <h2>${movie.title}</h2>
            <p>
                <i class="fas fa-star text-primary"></i>
                ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
                ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
                ${movie.genres
                  .map((genre) => `<li>${genre.name}</li>`)
                  .join('')}
            </ul>
            <a href="${
              movie.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
        </div>
        `;
  detailsBottom.innerHTML = `
    <h2>Movie Info</h2>
    <ul>
        <li><span class="text-secondary">Budget:</span> $${movie.budget}</li>
        <li><span class="text-secondary">Revenue:</span> $${movie.revenue}</li>
        <li><span class="text-secondary">Runtime:</span> ${
          movie.runtime
        } minutes</li>
        <li><span class="text-secondary">Status:</span> ${movie.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${movie.production_companies
      .map((company) => `${company.name}`)
      .join(', ')}
    </div>
    `;
  movieContainer.appendChild(detailsTop);
  movieContainer.appendChild(detailsBottom);
}

// fetch tv show details
async function displayTVShowDetails() {
  const show = await fetchAPIData(`tv/${global.queryString}`);
  console.log(show);
  const showContainer = document.querySelector('#show-details');

  const div = document.createElement('div');
  div.innerHTML = `
            <div class="details-top">
                <div>
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
                </div>
                <div>
                    <h2>S${show.name}</h2>
                    <p>
                    <i class="fas fa-star text-primary"></i>
                    ${show.vote_average.toFixed(1)} / 10
                    </p>
                    <p class="text-muted">First Air Date: ${
                      show.first_air_date
                    }</p>
                    <p>
                    ${show.overview}
                    </p>
                    <h5>Genres</h5>
                    <ul class="list-group">
                        ${show.genres
                          .map((genre) => `<li>${genre.name}</li>`)
                          .join('')}
                    </ul>
                    <a href="${
                      show.homepage
                    }" target="_blank" class="btn">Visit Show Homepage</a>
                </div>
            </div>
            <div class="details-bottom">
                <h2>Show Info</h2>
                <ul>
                    <li><span class="text-secondary">Number Of Episodes:</span> ${
                      show.number_of_episodes
                    }</li>
                    <li>
                    <span class="text-secondary">Last Episode To Air:</span> ${
                      show.last_episode_to_air.air_date
                    }
                    </li>
                    <li><span class="text-secondary">Status:</span> ${
                      show.status
                    }</li>
                </ul>
                <h4>Production Companies</h4>
                <div class="list-group">${show.production_companies
                  .map((company) => `${company.name}`)
                  .join(', ')}</div>
            </div>
        `;
  showContainer.appendChild(div);
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
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      displayTVShowDetails();
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
