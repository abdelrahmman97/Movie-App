

var trndingMoviesGroup = document.getElementById( "trnding-movies" );
var trndingTVShowsGroup = document.getElementById( "trnding-TVshows" );

var ItemsToShow = 4;

var moviesData;
var moviesResultsArr;
var moviesGenersArray = [];

var TVShowsData;
var TVShowsResultsArr;
var TVShowsGenersArray = [];

// Trending Movies Code
var xhrMoviesGenres = new XMLHttpRequest();
xhrMoviesGenres.open( "Get", 'https://api.themoviedb.org/3/genre/movie/list' );
xhrMoviesGenres.setRequestHeader( 'accept', 'application/json' );
xhrMoviesGenres.setRequestHeader( 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjZlMGE1ZWUwNjk5NzkyY2QyN2Q5NThhYzNlNGZmZiIsInN1YiI6IjVjZWE3Zjc5YzNhMzY4NTM5ZDFlYzcxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BXRPjuFGkBdwCKD8VIUmRnGjzq5fQ5DGfLCHZsLjgMU' );
xhrMoviesGenres.send();
xhrMoviesGenres.onreadystatechange = function () {
    if ( xhrMoviesGenres.readyState == 4 && xhrMoviesGenres.status == 200 ) {
        moviesGenersArray = JSON.parse( xhrMoviesGenres.responseText );

        var xhrMovies = new XMLHttpRequest();
        xhrMovies.open( "Get", 'https://api.themoviedb.org/3/trending/movie/day' );
        xhrMovies.setRequestHeader( 'accept', 'application/json' );
        xhrMovies.setRequestHeader( 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjZlMGE1ZWUwNjk5NzkyY2QyN2Q5NThhYzNlNGZmZiIsInN1YiI6IjVjZWE3Zjc5YzNhMzY4NTM5ZDFlYzcxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BXRPjuFGkBdwCKD8VIUmRnGjzq5fQ5DGfLCHZsLjgMU' );
        xhrMovies.send();
        xhrMovies.onreadystatechange = function () {
            if ( xhrMovies.readyState == 4 && xhrMovies.status == 200 ) {
                moviesData = JSON.parse( xhrMovies.responseText );
                moviesResultsArr = moviesData.results;

                for ( var index = 0; index < ItemsToShow; index++ ) {
                    var xGenerNumber = moviesResultsArr[index].genre_ids[0];
                    var gener = moviesGenersArray.genres[moviesGenersArray.genres.findIndex( ( item ) => item.id == xGenerNumber )];
                    trndingMoviesGroup.innerHTML += `
                    <a href="#" title="title" class="movie-card">
                        <div class="movie-poster">
                            <img class="movie-poster-img" title="${moviesResultsArr[index].title}"
                                src="https://image.tmdb.org/t/p/original/${moviesResultsArr[index].backdrop_path}" />
                            <span class="movie-gener">${gener.name}</span>
                        </div>
                        <div class="movie-info">
                            <p class="movies-title">${moviesResultsArr[index].title}</p>
                            <button type="button" class="btn btn-transparent with-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="" id="favIcon">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path>
                                </svg>
                            </button>
                        </div>
                    </a>
                    `;
                }
            }
        }
    }
}


// Trending TV Shows Code
var xhrTVShowsGenres = new XMLHttpRequest();
xhrTVShowsGenres.open( "Get", 'https://api.themoviedb.org/3/genre/tv/list' );
xhrTVShowsGenres.setRequestHeader( 'accept', 'application/json' );
xhrTVShowsGenres.setRequestHeader( 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjZlMGE1ZWUwNjk5NzkyY2QyN2Q5NThhYzNlNGZmZiIsInN1YiI6IjVjZWE3Zjc5YzNhMzY4NTM5ZDFlYzcxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BXRPjuFGkBdwCKD8VIUmRnGjzq5fQ5DGfLCHZsLjgMU' );
xhrTVShowsGenres.send();
xhrTVShowsGenres.onreadystatechange = function () {
    if ( xhrTVShowsGenres.readyState == 4 && xhrTVShowsGenres.status == 200 ) {
        TVShowsGenersArray = JSON.parse( xhrTVShowsGenres.responseText );

        var xhrTV = new XMLHttpRequest();
        xhrTV.open( "Get", 'https://api.themoviedb.org/3/trending/tv/day' );
        xhrTV.setRequestHeader( 'accept', 'application/json' );
        xhrTV.setRequestHeader( 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjZlMGE1ZWUwNjk5NzkyY2QyN2Q5NThhYzNlNGZmZiIsInN1YiI6IjVjZWE3Zjc5YzNhMzY4NTM5ZDFlYzcxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BXRPjuFGkBdwCKD8VIUmRnGjzq5fQ5DGfLCHZsLjgMU' );
        xhrTV.send();
        xhrTV.onreadystatechange = function () {
            if ( xhrTV.readyState == 4 && xhrTV.status == 200 ) {
                TVShowsData = JSON.parse( xhrTV.responseText );
                TVShowsResultsArr = TVShowsData.results;

                for ( var indexx = 0; indexx < ItemsToShow; indexx++ ) {
                    var xGenerNumber = TVShowsResultsArr[indexx].genre_ids[0];
                    var gener = TVShowsGenersArray.genres[TVShowsGenersArray.genres.findIndex( ( item ) => item.id == xGenerNumber )];
                    trndingTVShowsGroup.innerHTML += `
                    <a href="#" title="title" class="movie-card">
                        <div class="movie-poster">
                            <img class="movie-poster-img" title="${TVShowsResultsArr[indexx].name}"
                                src="https://image.tmdb.org/t/p/original/${TVShowsResultsArr[indexx].backdrop_path}" />
                            <span class="movie-gener">${gener.name}</span>
                        </div>
                        <div class="movie-info">
                            <p class="movies-title">${TVShowsResultsArr[indexx].name}</p>
                            <button type="button" class="btn btn-transparent with-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="" id="favIcon">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path>
                                </svg>
                            </button>
                        </div>
                    </a>
                    `;
                }
            }
        }
    }
}



