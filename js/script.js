const global = {
  currentPage: window.location.pathname,
};

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
      console.log('Home');
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
