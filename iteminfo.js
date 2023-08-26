
// Movie Poster and Background
var movieBgImage = document.getElementById( "movie-bg-image" );
var container = document.getElementsByClassName( "container" )[0];

// Movie Info
var showTitle = document.getElementById( "show-title" );
var showDesc = document.getElementById( "show-desc" );
var showBadge = document.getElementById( "show-badge" );
var showPoster = document.getElementById( "show-poster" );

var infoRate = document.getElementById( "rating-vote" );
var infoRuntime = document.getElementById( "info-runtime" );
var infoGenre = document.getElementById( "info-genre" );
var infoReleaseDate = document.getElementById( "info-release-date" );

var postersContainer = document.getElementById( "posters-container" );
var actorsContainer = document.getElementById( "actors-container" );

// for video modal
let videoModal = document.getElementById( 'video-modal' );
let trailerBtn = document.getElementById( 'trailerBtn' );
let videoModalClose = document.getElementById( 'btn-close-modal-video' );
let videoTrailer = document.getElementById( 'videoTrailer' );

// get fav icon btn
let addToFavBtn = document.getElementById( 'addToFav' );
let favIcon = addToFavBtn.children[0];

// get movie id
const url = new URL( window.location.href );
let id = url.searchParams.get( 'id' );
console.log( id );

var postersToShow = 8;
var actorsToShow = 8;
var showGenre = [];
let data;

// get favorites list
var currentUser = JSON.parse( sessionStorage.getItem( "currentUser" ) );
let users = JSON.parse( localStorage.getItem( "users" ) );



// get movie data
var xhr = new XMLHttpRequest();
xhr.open( 'GET', `https://api.themoviedb.org/3/movie/${id}` );
xhr.setRequestHeader( 'accept', 'application/json' );
xhr.setRequestHeader( 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjZlMGE1ZWUwNjk5NzkyY2QyN2Q5NThhYzNlNGZmZiIsInN1YiI6IjVjZWE3Zjc5YzNhMzY4NTM5ZDFlYzcxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BXRPjuFGkBdwCKD8VIUmRnGjzq5fQ5DGfLCHZsLjgMU' );
xhr.send();

xhr.onreadystatechange = function () {
    if ( xhr.readyState == 4 ) {
        data = JSON.parse( xhr.responseText );
        // resultsArr = data.results;
        console.log( data );
        // localStorage.setItem( "currentMovie", JSON.stringify( data ) )

        // Append Info
        showTitle.innerHTML = data.title;
        showDesc.innerHTML = data.overview;
        movieBgImage.style.backgroundImage = `url("https://image.tmdb.org/t/p/original/${data.backdrop_path}")`;

        infoRate.innerHTML = `<span class="vote-average">${data.vote_average.toFixed(1)}</span><span class="vote-count">| ${data.vote_count}</span>`;
        infoRuntime.innerHTML = `${convertMinutesToHoursAndMinutes( data.runtime )}`;
        data.genres.forEach( genre => {
            showGenre.push( genre.name );
        } );
        infoGenre.innerHTML = `${showGenre.join( ", " )}`;
        infoReleaseDate.innerHTML = `${new Date( data.release_date ).getFullYear()}`;

        // update fav btn icon
        let check = currentUser.favorites.some( movie => movie.id === data.id );
        if ( check ) {
            favIcon.classList.add( "active" );
        }
        else {
            favIcon.classList.remove( "active" );
        }

    }
}


// get posters
var xhrPosters = new XMLHttpRequest();
xhrPosters.open( 'GET', `https://api.themoviedb.org/3/movie/${id}/images` );
xhrPosters.setRequestHeader( 'accept', 'application/json' );
xhrPosters.setRequestHeader( 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjZlMGE1ZWUwNjk5NzkyY2QyN2Q5NThhYzNlNGZmZiIsInN1YiI6IjVjZWE3Zjc5YzNhMzY4NTM5ZDFlYzcxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BXRPjuFGkBdwCKD8VIUmRnGjzq5fQ5DGfLCHZsLjgMU' );
xhrPosters.send();

xhrPosters.onreadystatechange = function () {
    if ( xhrPosters.readyState == 4 ) {
        var posters = JSON.parse( xhrPosters.responseText );
        // resultsArr = posters.posters;
        resultsArr = posters.backdrops;
        // resultsArr = posters.logos;
        console.log( posters );

        // Append Info
        for ( var index = 0; index < postersToShow; index++ ) {
            postersContainer.innerHTML +=
                `<div class="poster-img-li">
                    <img class="poster-img" src="https://image.tmdb.org/t/p/original/${resultsArr[index].file_path}" alt="">
                </div>`;
        }

    }
}


function convertMinutesToHoursAndMinutes( minutes ) {
    const hours = Math.floor( minutes / 60 );
    const remainingMinutes = minutes % 60;
    return `${hours}h:${remainingMinutes}m`;
}

// get actors
var actorsData;
var xhrActors = new XMLHttpRequest();
xhrActors.open( 'GET', `https://api.themoviedb.org/3/movie/${id}/credits` );
xhrActors.setRequestHeader( 'accept', 'application/json' );
xhrActors.setRequestHeader( 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjZlMGE1ZWUwNjk5NzkyY2QyN2Q5NThhYzNlNGZmZiIsInN1YiI6IjVjZWE3Zjc5YzNhMzY4NTM5ZDFlYzcxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BXRPjuFGkBdwCKD8VIUmRnGjzq5fQ5DGfLCHZsLjgMU' );
xhrActors.send();

xhrActors.onreadystatechange = function () {
    if ( xhrActors.readyState == 4 ) {
        actorsData = JSON.parse( xhrActors.responseText );
        var resArr = actorsData.cast;
        // resArr.sort( function ( a, b ) { return b.popularity - a.popularity } );
        // resArr.sort( function ( a, b ) { return b.order - a.order } );

        console.log( actorsData );

        // Append Info
        for ( var index = 0; index < actorsToShow; index++ ) {
            var newGUID = Math.round( Math.random() * 1000 ) + resArr[index].original_name.split( " " ).join( "" )
            actorsContainer.innerHTML +=
                `<div class="show-actor">
                    <div class="actor-img" id="${newGUID}"></div>
                    <p class="actor-name">${resArr[index].original_name}</a>
                    <p class="actor-character">${resArr[index].character}</a>
                    </div>`;
            // <img class="actor-img" src="https://image.tmdb.org/t/p/original${resArr[index].profile_path}" alt="${resArr[index].original_name}">

            document.getElementById( newGUID ).style.backgroundImage = `url("https://image.tmdb.org/t/p/original${resArr[index].profile_path}")`;
        }

    }
}


// add movie to favorites
addToFavBtn.addEventListener( 'click', function () {

    let userIndex = users.findIndex( user => user.email === currentUser.email );
    console.log( userIndex );

    let index = currentUser.favorites.findIndex( movie => movie.id === data.id );
    console.log( index );
    if ( index > -1 ) {
        favIcon.classList.remove( "active" );
        currentUser.favorites.splice( index, 1 );
        users[userIndex] = currentUser;
        sessionStorage.setItem( "currentUser", JSON.stringify( currentUser ) );
        localStorage.setItem( "users", JSON.stringify( users ) );
        alert( "removed from favorites" )
    }
    else {
        favIcon.style.animation = "like 0.5s 1";
        favIcon.classList.add( "active" );
        currentUser.favorites.push( data );
        users[userIndex] = currentUser;
        sessionStorage.setItem( "currentUser", JSON.stringify( currentUser ) );
        localStorage.setItem( "users", JSON.stringify( users ) );
        alert( "add to favorites" )
    }

} );


// get trailer
var xhrVideos = new XMLHttpRequest();
xhrVideos.open( 'GET', `https://api.themoviedb.org/3/movie/${id}/videos` );
xhrVideos.setRequestHeader( 'accept', 'application/json' );
xhrVideos.setRequestHeader( 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjZlMGE1ZWUwNjk5NzkyY2QyN2Q5NThhYzNlNGZmZiIsInN1YiI6IjVjZWE3Zjc5YzNhMzY4NTM5ZDFlYzcxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BXRPjuFGkBdwCKD8VIUmRnGjzq5fQ5DGfLCHZsLjgMU' );
xhrVideos.send();

xhrVideos.onreadystatechange = function () {
    if ( xhrVideos.readyState == 4 ) {
        var videos = JSON.parse( xhrVideos.responseText );
        resultsArr = videos.results;
        console.log( videos );

        // Append Info
        var trailerId = resultsArr.findIndex( vid => ( vid.name.toLowerCase() == "Official Trailer".toLowerCase() || ( vid.official == true && vid.type == "Trailer" ) ) );
        console.log( trailerId );
        videoTrailer.src = `https://www.youtube.com/embed/${resultsArr[trailerId].key}`;

        console.log( "🚀 ~ file: iteminfo.js:201 ~ resultsArr[trailerId].key:", resultsArr[trailerId].key )
    }
}

// video modal
trailerBtn.addEventListener( "click", function () {
    videoModal.classList.toggle( "open" );
} )

videoModalClose.addEventListener( "click", function () {
    videoModal.classList.remove( "open" );
} )