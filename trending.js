

var trndingMoviesGroup = document.getElementById( "trnding-movies" );
var trndingTVShowsGroup = document.getElementById( "trnding-TVshows" );

var ItemsToShow = 4;

var moviesData;
var moviesResultsArr;
var moviesGenersArray = [];

var TVShowsData;
var TVShowsResultsArr;
var TVShowsGenersArray = [];

// get user and favorites
// get favorites list
var currentUser = JSON.parse( sessionStorage.getItem( "currentUser" ) );
var users = JSON.parse( localStorage.getItem( "users" ) );

// Trending Movies Code
moviesGenersArray = JSON.parse( localStorage.getItem( "MoviesGenres" ) );

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
            // check if in fav
            let favIndex = currentUser.favorites.findIndex( movie => movie.id === moviesResultsArr[ index ].id );
            var activeClass = ( favIndex > -1 ) ? "active" : "";

            var xGenerNumber = moviesResultsArr[ index ].genre_ids[ 0 ];
            var gener = moviesGenersArray.genres[ moviesGenersArray.genres.findIndex( ( item ) => item.id == xGenerNumber ) ];
            trndingMoviesGroup.innerHTML += `
                    <a title="title" class="movie-card" href="iteminfo.html?id=${ moviesResultsArr[ index ].id }">
                        <div class="movie-poster">
                            <img class="movie-poster-img" title="${ moviesResultsArr[ index ].title }"
                                src="https://image.tmdb.org/t/p/original/${ moviesResultsArr[ index ].backdrop_path }" />
                            <span class="movie-gener">${ gener.name }</span>
                        </div>
                        <div class="movie-info">
                            <p class="movies-title">${ moviesResultsArr[ index ].title }</p>
                            <button type="button" class="btn btn-transparent with-icon" id="${ moviesResultsArr[ index ].id }"
                                onclick="addToFavorites( 'movie','${ moviesResultsArr[ index ].id }' )">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="${ activeClass }" id="favIcon">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path>
                                </svg>
                            </button>
                        <a>
                    </a>`;
        }
    }
}




// Trending TV Shows Code
TVShowsGenersArray = JSON.parse( localStorage.getItem( "TVGenres" ) );

var xhrTV = new XMLHttpRequest();
xhrTV.open( "Get", 'https://api.themoviedb.org/3/trending/tv/day' );
xhrTV.setRequestHeader( 'accept', 'application/json' );
xhrTV.setRequestHeader( 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjZlMGE1ZWUwNjk5NzkyY2QyN2Q5NThhYzNlNGZmZiIsInN1YiI6IjVjZWE3Zjc5YzNhMzY4NTM5ZDFlYzcxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BXRPjuFGkBdwCKD8VIUmRnGjzq5fQ5DGfLCHZsLjgMU' );
xhrTV.send();
xhrTV.onreadystatechange = function () {
    if ( xhrTV.readyState == 4 && xhrTV.status == 200 ) {
        TVShowsData = JSON.parse( xhrTV.responseText );
        TVShowsResultsArr = TVShowsData.results;

        console.log( TVShowsData );
        for ( var index = 0; index < ItemsToShow; index++ ) {

            // check if in fav
            let favIndex = currentUser.favorites.findIndex( movie => movie.id === TVShowsResultsArr[ index ].id );
            var activeClass = ( favIndex > -1 ) ? "active" : "";

            var xGenreNumber = TVShowsResultsArr[ index ].genre_ids[ 0 ];
            console.log( xGenreNumber );
            var genre = TVShowsGenersArray.genres[ TVShowsGenersArray.genres.findIndex( ( item ) => item.id == xGenreNumber ) ];

            trndingTVShowsGroup.innerHTML += `
                    <a title="title" class="movie-card" href="#">
                        <div class="movie-poster">
                            <img class="movie-poster-img" title="${ TVShowsResultsArr[ index ].name }"
                                src="https://image.tmdb.org/t/p/original/${ TVShowsResultsArr[ index ].backdrop_path }" />
                            <span class="movie-gener">${ genre.name }</span>
                        </div>
                        <div class="movie-info">
                            <p class="movies-title">${ TVShowsResultsArr[ index ].name }</p>
                            <button type="button" class="btn btn-transparent with-icon" id="${ TVShowsResultsArr[ index ].id }"
                                onclick="addToFavorites( 'tv','${ TVShowsResultsArr[ index ].id }' )">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="${ activeClass }"
                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="" id="favIcon">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path>
                                </svg>
                            </button>
                        </div>
                    </a>
                    `;
        }
    }
}



function addToFavorites( mediaType, mediaId ) {
    // get favorites list
    var currentUser = JSON.parse( sessionStorage.getItem( "currentUser" ) );
    let users = JSON.parse( localStorage.getItem( "users" ) );

    let data;

    // get movie data
    var xhr = new XMLHttpRequest();
    xhr.open( 'GET', `https://api.themoviedb.org/3/${ mediaType }/${ mediaId }` );
    xhr.setRequestHeader( 'accept', 'application/json' );
    xhr.setRequestHeader( 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjZlMGE1ZWUwNjk5NzkyY2QyN2Q5NThhYzNlNGZmZiIsInN1YiI6IjVjZWE3Zjc5YzNhMzY4NTM5ZDFlYzcxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BXRPjuFGkBdwCKD8VIUmRnGjzq5fQ5DGfLCHZsLjgMU' );
    xhr.send();

    xhr.onreadystatechange = function () {
        if ( xhr.readyState == 4 ) {
            data = JSON.parse( xhr.responseText );

            let userIndex = users.findIndex( user => user.email === currentUser.email );
            let index = currentUser.favorites.findIndex( movie => movie.id === mediaId );

            // get fav icon btn
            let addToFavBtn = document.getElementById( mediaId );
            let favIcon = addToFavBtn.children[ 0 ];

            if ( index > -1 ) {
                favIcon.classList.remove( "active" );
                currentUser.favorites.splice( index, 1 );
                users[ userIndex ] = currentUser;
                sessionStorage.setItem( "currentUser", JSON.stringify( currentUser ) );
                localStorage.setItem( "users", JSON.stringify( users ) );
                alert( "removed from favorites" )
            }
            else {
                favIcon.style.animation = "like 0.5s 1";
                favIcon.classList.add( "active" );
                currentUser.favorites.push( data );
                users[ userIndex ] = currentUser;
                sessionStorage.setItem( "currentUser", JSON.stringify( currentUser ) );
                localStorage.setItem( "users", JSON.stringify( users ) );
                alert( "add to favorites" )
            }

        }
    }



}