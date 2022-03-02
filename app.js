// const API_KEY = "8cea1b9c";

// fetch(`http://www.omdbapi.com/?s=dark&y=2012&page=1&apikey=${API_KEY}`)
//   .then((res) => res.json())
//   .then((data) => console.log(data));

const resultsContainer = document.querySelector(".results-container");

const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=spiderman";

const renderMovies = async (url) => {
  const response = await fetch(url);
  const resultData = await response.json();
  const results = resultData.results
    .map((data) => {
      return `
          <div class="result-details">
              <img src="${IMGPATH + data.poster_path}" />
              <h2>title</h2>
              <div>
                  <span class="year">2022</span>
                  <span class="duration">63 min</span>
                  <span class="tag">Movie</span>
              </div>
          </div>
            `;
    })
    .join("");

  resultsContainer.innerHTML = "";
  resultsContainer.insertAdjacentHTML("beforeend", results);

  console.log(resultData.results);
};

renderMovies(APIURL);
