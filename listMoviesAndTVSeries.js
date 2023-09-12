// get media type
const url = new URL( window.location.href );
let media = url.searchParams.get( 'media' );
console.log( media );


var listContainer = document.getElementById( "list-container" );
var pagination = document.getElementById( "pagination" );

var ItemsToShow = 20;
var totalPages = 1;
var currentPage = 1;

var Data;
var DataResultsArr;
var DataGenresArray = [];


// get user and favorites
var currentUser = JSON.parse( sessionStorage.getItem( "currentUser" ) );
var users = JSON.parse( localStorage.getItem( "users" ) );


function addToFavorites( mediaType, mediaId ) {
    // get favorites list
    var currentUser = JSON.parse( sessionStorage.getItem( "currentUser" ) );
    let users = JSON.parse( localStorage.getItem( "users" ) );

    let data;

    // get movie data
    var xhr = new XMLHttpRequest();
    xhr.open( 'GET', `https://api.themoviedb.org/3/${mediaType}/${mediaId}` );
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
            let favIcon = addToFavBtn.children[0];

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

        }
    }



}


document.addEventListener( 'DOMContentLoaded', function () {
    for ( let i = currentPage; i < 6; i++ ) {
        pagination.innerHTML += `<a href="#" class="btn btn-alt ${( i == 1 ) ? "active" : ""}" data-page="${i} ">${i}</a>`;
    }
    getData( currentPage );
} );

function updatePagination() {
    pagination.innerHTML = "";
    for ( let i = currentPage; i <= currentPage + 6 && i < totalPages; i++ ) {
        pagination.innerHTML += `<a href="#" class="btn btn-alt" data-page="${i}">${i}</a>`;
    }

    for ( let i = currentPage; i <= currentPage + 6; i++ ) {
        if ( i == currentPage + 6 ) { break }
        let a = pagination.querySelector( `[data-page="${i}"]` );
        a.classList.remove( "active" );
        if ( i === currentPage ) {
            a.classList.add( "active" )
        }
    }
    getData( currentPage )

}

async function getData( pageNumber ) {
    var xhr = new XMLHttpRequest();
    xhr.open( "Get", `https://api.themoviedb.org/3/genre/${media}/list` );
    xhr.setRequestHeader( 'accept', 'application/json' );
    xhr.setRequestHeader( 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjZlMGE1ZWUwNjk5NzkyY2QyN2Q5NThhYzNlNGZmZiIsInN1YiI6IjVjZWE3Zjc5YzNhMzY4NTM5ZDFlYzcxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BXRPjuFGkBdwCKD8VIUmRnGjzq5fQ5DGfLCHZsLjgMU' );
    xhr.send();
    xhr.onreadystatechange = function () {
        if ( xhr.readyState == 4 && xhr.status == 200 ) {
            DataGenres = JSON.parse( xhr.responseText );

            var xhrTVSeries = new XMLHttpRequest();
            xhrTVSeries.open( "Get", `https://api.themoviedb.org/3/${media}/popular?api_key=f26e0a5ee0699792cd27d958ac3e4fff&page=${pageNumber}` );
            xhrTVSeries.setRequestHeader( 'accept', 'application/json' );
            xhrTVSeries.setRequestHeader( 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjZlMGE1ZWUwNjk5NzkyY2QyN2Q5NThhYzNlNGZmZiIsInN1YiI6IjVjZWE3Zjc5YzNhMzY4NTM5ZDFlYzcxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BXRPjuFGkBdwCKD8VIUmRnGjzq5fQ5DGfLCHZsLjgMU' );
            xhrTVSeries.send();
            xhrTVSeries.onreadystatechange = function () {
                if ( xhrTVSeries.readyState == 4 && xhrTVSeries.status == 200 ) {
                    Data = JSON.parse( xhrTVSeries.responseText );
                    DataResultsArr = Data.results;
                    console.log( "🚀 ~ Data:", Data )
                    totalPages = Data.total_pages;
                    listContainer.innerHTML = "";

                    for ( var index = 0; index < ItemsToShow; index++ ) {
                        var skip = false;
                        // check if in fav
                        let favIndex = currentUser.favorites.findIndex( movie => movie.id === DataResultsArr[index].id );
                        var activeClass = ( favIndex > -1 ) ? "active" : "";

                        // get genres
                        var genreArr = [];
                        var genre_ids = DataResultsArr[index].genre_ids;
                        genre_ids.forEach( element => {
                            let xGenre = DataGenres.genres.find( x => x.id === element );
                            if ( xGenre != null ) {
                                if ( xGenre.name.toLowerCase() == "News".toLowerCase() ) { skip = true };
                                genreArr.push( xGenre.name );
                            }
                        } );

                        if ( skip ) {
                            continue
                        }

                        var mediaImg = ( DataResultsArr[index].backdrop_path == null ) ? DataResultsArr[index].poster_path : DataResultsArr[index].backdrop_path;
                        let title;
                        if ( media == 'movie' )
                            title = DataResultsArr[index].original_title
                        else
                            title =  DataResultsArr[index].name

                        listContainer.innerHTML += `
                        <a title="title" class="movie-card" href="/iteminfo.html?id=${DataResultsArr[index].id}">
                            <div class="movie-poster">
                                <img class="movie-poster-img" title="${DataResultsArr[index].name}"
                                    src="https://image.tmdb.org/t/p/original/${mediaImg}" />
                                    <span class="movie-gener">${genreArr.slice( 0, 3 ).join( ", " )}</span>
                            </div>
                            <div class="movie-info">
                                <p class="movies-title">${title}</p>
                                <button type="button" class="btn btn-transparent with-icon" id="${DataResultsArr[index].id}"
                                    onclick="addToFavorites( 'movie','${DataResultsArr[index].id}' )">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                        stroke="currentColor" class="${activeClass}" id="favIcon">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path>
                                    </svg>
                                </button>
                            <div>
                        </div>`;
                    }
                }
            }
        }
    }
}

pagination.addEventListener( "click", function ( event ) {
    let element = event.target;
    if ( element.hasAttribute( "data-page" ) ) {
        currentPage = parseInt( element.getAttribute( "data-page" ) );
    }
    updatePagination();
} );
document.getElementById( "prev" ).addEventListener( "click", function () {
    if ( currentPage != 1 || currentPage != 0 ) {
        return
    }
    else {
        currentPage--;
        updatePagination();
    }
} );
document.getElementById( "next" ).addEventListener( "click", function () {
    currentPage++;
    updatePagination();
} );


