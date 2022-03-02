// const API_KEY = "8cea1b9c";

// fetch(`http://www.omdbapi.com/?s=dark&y=2012&page=1&apikey=${API_KEY}`)
//   .then((res) => res.json())
//   .then((data) => console.log(data));

const resultsContainer = document.querySelector(".results-container");

const form = document.querySelector("form");
const searchBar = document.querySelector("form input[type='search']");

const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&page=1&query=";

const renderMovies = async (url) => {
  try {
    resultsContainer.innerHTML = "";
    resultsContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="lds-dual-ring"></div>`
    );
    const response = await fetch(url);
    const resultData = await response.json();
    console.log(resultData);
    if (resultData.results.length === 0) {
      throw new Error("No Movies Found");
    }
    const results = resultData.results
      .map((data) => {
        const image = IMGPATH + data.poster_path;
        const title =
          data.title.length > 10 ? data.title.slice(0, 10) + "..." : data.title;
        const year = data.release_date ? data.release_date.slice(0, 4) : "";
        const rating = data.vote_average;
        return `
          <div class="result-details">
              <img src="${image}" alt ="Image not Found"/>
              <h2>${title}</h2>
              <div>
                  <span class="year">${year}</span>
                  <span class="duration">${rating}/10 IMDb</span>
                  <span class="tag">Movie</span>
              </div>
          </div>
            `;
      })
      .join("");

    resultsContainer.innerHTML = "";
    resultsContainer.insertAdjacentHTML("beforeend", results);
  } catch (e) {
    resultsContainer.innerHTML = "";
    resultsContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="error-message"> ${e.message} </div>`
    );
  }
};

renderMovies(APIURL);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const query = searchBar.value;

  if (!query) return;
  const searchUrl = SEARCHAPI + query;
  renderMovies(searchUrl);
});
