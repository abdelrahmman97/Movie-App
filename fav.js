let favContainer = document.getElementById( 'fav-container' );
let favCount = document.getElementById( 'favCount' );
var currentUser = JSON.parse( localStorage.getItem( "currentUser" ) );

favCount.innerHTML = ` ${currentUser.favorites.length} `;


document.addEventListener( 'DOMContentLoaded', getFavorites( -1 ) );



function getFavorites( item ) {
    if ( item == -1 ) {
        favContainer.innerHTML = "";
        for ( let fav = 0; fav < currentUser.favorites.length; fav++ ) {
            favContainer.innerHTML += `
                <a href="#" title="title" class="movie-card">
                    <div class="movie-poster">
                        <img class="movie-poster-img" title="${currentUser.favorites[fav].title}"
                            src="https://image.tmdb.org/t/p/original/${currentUser.favorites[fav].backdrop_path}" />
                    </div>
                    <div class="movie-info">
                        <p class="movies-title">${currentUser.favorites[fav].title}</p>
                        <button type="button" onclick="getFavorites(${fav})"
                            class="btn btn-transparent with-icon fav-btn active" title="Add to favorites" id="addToFav">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="" id="favIcon">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path>
                            </svg>
                            </button>
                    </div>
                </a>
                `;
        }
        return
    }

    currentUser.favorites.splice( item, 1 );
    console.log( currentUser.favorites );

    var users = JSON.parse( localStorage.getItem( "users" ) );
    // users[currentUser.userID] = currentUser;
    // localStorage.setItem( "users", JSON.stringify( users ) );
    let userIndex = users.findIndex( user => user.email == currentUser.email );
    users[userIndex] = currentUser;
    localStorage.setItem( "currentUser", JSON.stringify( currentUser ) );
    localStorage.setItem( "users", JSON.stringify( users ) );

    favCount.innerHTML = ` ${currentUser.favorites.length} `;
    if ( currentUser.favorites.length == 0 ) {
        favContainer.innerHTML = `<p style="color: #fff; font-size: 20px;">You don't have any favorite movie yet<p>`;
    }
    getFavorites( -1 );
}