// get search string
const url = new URL( window.location.href );
const search = url.searchParams.get( 's' );
document.getElementById( "searchText" ).innerHTML = search;
console.log( search );

// let searchBtn = document.getElementById( "searchBtn" );

const listContainer = document.getElementById( "list-container" );
const pagination = document.getElementById( "pagination" );

const ItemsToShow = 20;
let totalItems = 2;
let totalPages = 1;
let currentPage = 1;

var Data;
var DataResultsArr;
var TVGenresArray = [];
var MoviesGenresArray = [];

// get user and favorites
var currentUser = JSON.parse( sessionStorage.getItem( "currentUser" ) );
var users = JSON.parse( localStorage.getItem( "users" ) );

// get genres
const tv_genre = JSON.parse( localStorage.getItem( "TVGenres" ) );
const movies_genre = JSON.parse( localStorage.getItem( "MoviesGenres" ) );


document.addEventListener( 'DOMContentLoaded', function () {
    for ( let i = currentPage; i < 6; i++ ) {
        pagination.innerHTML += `<a href="#" class="btn btn-alt ${ ( i == 1 ) ? "active" : "" }" data-page="${ i } ">${ i }</a>`;
    }
    getData( currentPage );
} );



function updatePagination() {
    pagination.innerHTML = "";

    for ( let i = currentPage; i <= currentPage + 6 && i < totalPages; i++ ) {
        pagination.innerHTML += `<a href="#" class="btn btn-alt" data-page="${ i }">${ i }</a>`;
    }

    for ( let i = currentPage; i <= currentPage + 6; i++ ) {
        if ( i == currentPage + 6 ) { break }
        let a = pagination.querySelector( `[data-page="${ i }"]` );
        a.classList.remove( "active" );
        if ( i === currentPage ) {
            a.classList.add( "active" )
        }
    }
    getData( currentPage )

}

if ( search != "" || search != null ) {
    // https://api.themoviedb.org/3/search/multi?query=batman&include_adult=false&language=en-US&page=1
    getData( currentPage )

}


function addToFavorites( mediaType, mediaId ) {
    // get favorites list
    var currentUser = JSON.parse( sessionStorage.getItem( "currentUser" ) );
    let users = JSON.parse( localStorage.getItem( "users" ) );

    let data;

    // get data
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


async function getData( pageNumber ) {
    var xhrSearch = new XMLHttpRequest();
    xhrSearch.open( "Get", `https://api.themoviedb.org/3/search/multi?query=${ search }&include_adult=false&language=en-US&page=${ pageNumber }` );
    xhrSearch.setRequestHeader( 'accept', 'application/json' );
    xhrSearch.setRequestHeader( 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjZlMGE1ZWUwNjk5NzkyY2QyN2Q5NThhYzNlNGZmZiIsInN1YiI6IjVjZWE3Zjc5YzNhMzY4NTM5ZDFlYzcxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BXRPjuFGkBdwCKD8VIUmRnGjzq5fQ5DGfLCHZsLjgMU' );
    xhrSearch.send();
    xhrSearch.onreadystatechange = function () {
        if ( xhrSearch.readyState == 4 && xhrSearch.status == 200 ) {
            Data = JSON.parse( xhrSearch.responseText );
            DataResultsArr = Data.results;
            console.log( "🚀 ~ Data:", Data )
            totalPages = Data.total_pages;
            totalItems = Data.results.length;
            listContainer.innerHTML = "";

            for ( var index = 0; index < totalItems; index++ ) {

                var skip = false;
                // check if in fav
                let favIndex = currentUser.favorites.findIndex( movie => movie.id === DataResultsArr[ index ].id );
                var activeClass = ( favIndex > -1 ) ? "active" : "";

                let title, genre;

                // get genres
                var genreArr = [];
                var genre_ids = DataResultsArr[ index ].genre_ids;

                if ( DataResultsArr[ index ].media_type == "movie" ) {
                    title = DataResultsArr[ index ].original_title

                    genre_ids.forEach( element => {
                        let xGenre = movies_genre.genres.find( x => x.id === element );
                        if ( xGenre != null ) {
                            if ( xGenre.name.toLowerCase() == "News".toLowerCase() ) { skip = true };
                            genreArr.push( xGenre.name );
                        }
                    } );

                }
                else if ( DataResultsArr[ index ].media_type == 'tv' ) {
                    title = DataResultsArr[ index ].name

                    genre_ids.forEach( element => {
                        let xGenre = movies_genre.genres.find( x => x.id === element );
                        if ( xGenre != null ) {
                            if ( xGenre.name.toLowerCase() == "News".toLowerCase() ) { skip = true };
                            genreArr.push( xGenre.name );
                        }
                    } );

                }


                if ( skip ) { continue }

                var mediaImg = ( DataResultsArr[ index ].backdrop_path == null ) ? DataResultsArr[ index ].poster_path : DataResultsArr[ index ].backdrop_path;

                listContainer.innerHTML += `
                        <div title="title" class="movie-card">
                            <div class="movie-poster">


                    ${( mediaImg == null ) ?
                        `<img class="movie-poster-img" src="https://picturesofmaidenhead.files.wordpress.com/2019/01/image-not-found.jpg?w=1620"/>`
                    : `<img class="movie-poster-img" title="${ DataResultsArr[ index ].name }"
                                    src="${ ( mediaImg == null ) ? "" : 'https://image.tmdb.org/t/p/original/' + mediaImg }" />`}
                                        
                                    <span class="movie-gener">${ genreArr.slice( 0, 3 ).join( ", " ) }</span>
                            </div>
                            <div class="movie-info">
                                <p class="movies-title">${ title }</p>
                                <button type="button" class="btn btn-transparent with-icon" id="${ DataResultsArr[ index ].id }"
                                    onclick="addToFavorites( 'movie','${ DataResultsArr[ index ].id }' )">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                        stroke="currentColor" class="${ activeClass }" id="favIcon">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path>
                                    </svg>
                                </button>
                            <div>
                        </div>
                        `;
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
    if ( currentPage != totalPages ) {
        currentPage++;
        updatePagination();
    }
    else {
        return
    }

} );



