const BASE = "https://api.themoviedb.org/3/movie/now_playing?api_key=3857824c7b3c696a0ea27be5c08dc3be";
const movieList = document.querySelector('#movie-list');
let page = 1;

function fetchMovies(pageNum) {
    page++;
    document.querySelector("#loading").innerHTML = `<div class="loader"><span></span></div>
    `
  fetch(`${BASE}&page=${pageNum}`)
    .then(res => res.json())
    .then(res => {
      document.querySelector("#loading > div").remove()
      
      let movies = res.results;

      movies.forEach(item => {
        
        let title = item.title.length > 10 ? item.title.slice(0, 10) : item.title;
        let average = Math.round(item.vote_average / 2);
        document.querySelector("#movie-list").innerHTML += `
            <div class="col-xs-4 col-sm-2">
              <div class="movie-card m-t-15" id="movie-${item.id}">
                <div class="image" style="background-image: url('https://image.tmdb.org/t/p/w185_and_h278_bestv2/${item.poster_path}');"></div>
                <div class="content">
                  <strong class="dblock text-500 text-normal m-b-5">${title}</strong>
                  <ul class="ratings"></ul>
                </div>
              </div>
            </div>`;
            for (let i = 0; i < 5; i++) {
              let li = document.createElement("li");
              let icon = document.createElement("i");
              icon.className = "fas fa-star";
              li.append(icon);
              if(average > i){
                  li.classList.add("fill");
              }
              document.querySelector(`#movie-${item.id} .ratings`).append(li);
            }
      });
    });
}

fetchMovies(page);
