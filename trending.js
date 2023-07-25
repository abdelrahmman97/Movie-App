

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
                            <button type="button" class="btn btn-default with-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                            </button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
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
                            <button type="button" class="btn btn-default with-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                            </button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </div>
                    </a>
                    `;
                }
            }
        }
    }
}



