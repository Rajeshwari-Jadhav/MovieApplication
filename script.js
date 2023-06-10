const API_KEY="api_key=d9f56d64fd8f376b2cf78cfe8a9e2025";
const BASE_URL="https://api.themoviedb.org/3";
const API_URL=BASE_URL+"/discover/movie?sort_by=popularity.desc&"+API_KEY;
const IMG_URL="https://image.tmdb.org/t/p/w500";
const all=document.getElementById("all");
const form=document.getElementById("form");
const search=document.getElementById("search");
const searchUrl=BASE_URL+"/search/movie?"+API_KEY;

getMovies(API_URL);

function showMovies(data){
    
    all.innerHTML='';

        data.forEach(movie => {
            const {title,poster_path,vote_average,overview}=movie;
            if(vote_average!=0){
                const movieElement=document.createElement("div");
                movieElement.classList.add("movie");
                movieElement.innerHTML=`<img src=${IMG_URL+poster_path} alt="title"/>
                    <div class="movie-info">
                        <h3>${title}</h3>
                        <span class=${getColour(vote_average)}>${vote_average}</span>
                    </div>
                    <div class="overview">
                        <h3>Overview</h3>
                        ${overview}
                    </div>`
                all.appendChild(movieElement);
            }
        });
}

function getMovies(url){
    fetch(url).then(res => res.json()).then(data=>{
        console.log(data);
        showMovies(data.results);
    })
}
function getColour(vote_average){
    if(vote_average>=8)
        return "green";
    else if(vote_average<=5)
        return "red";
    else
        return "yellow";
}
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const searchTerm=search.value;
    console.log(searchTerm);
    if(searchTerm){
        getMovies(searchUrl+"&query="+searchTerm)
    }
    else    getMovies(API_URL);
});


