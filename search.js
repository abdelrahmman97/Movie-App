let searchBtn = document.getElementById( "searchBtn" );




//#region Filter and Search

function search() {
    const searchQuery = document.getElementById( 'searchInput' ).value;

    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint for searching
    const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjZlMGE1ZWUwNjk5NzkyY2QyN2Q5NThhYzNlNGZmZiIsInN1YiI6IjVjZWE3Zjc5YzNhMzY4NTM5ZDFlYzcxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BXRPjuFGkBdwCKD8VIUmRnGjzq5fQ5DGfLCHZsLjgMU'
        }
    };

    fetch( apiUrl, options )
        //   .then(response => response.json())
        //   .then(response => displayResults(response.results))
        //   .catch(err => console.error(err));
        .then( response => response.json() )
        .then( response => {
            if ( response.results ) {
                const resultsDiv = document.getElementById( 'search-resualt' );
                resultsDiv.innerHTML = ''; // Clear previous results

                response.results.forEach( movie => {
                    const movieDiv = document.createElement( 'div' );

                    movieDiv.innerHTML =
                        `
                    <div class="card">
                        <img src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" />
                        <h2> ${movie.original_title}</h2>
                        <p class="overview"> ${movie.overview}</p>
                        <br />
                        <span class="rate"> Date : ${movie.release_date} </span>
                        <br />
                        <span class="rate"> Popularity : ${movie.popularity} </span>
                        <br />
                        <button class='addToFavorites' onclick='addToFavorites(${movie.id})'>Add to favorites</button>
                    </div>
                    `;
                    resultsDiv.appendChild( movieDiv );
                } );
            } else {
                alert( 'No movies found!' );
            }
        } )
        .catch( error => console.error( 'Error fetching data:', error ) );
}

//#endregion

//#region Display Movies By Geners

function DisplayMoviesByGeners( genres ) {

    const apiUrl = `https://api.themoviedb.org/3/discover/movie?with_genres=${genres}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjZlMGE1ZWUwNjk5NzkyY2QyN2Q5NThhYzNlNGZmZiIsInN1YiI6IjVjZWE3Zjc5YzNhMzY4NTM5ZDFlYzcxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BXRPjuFGkBdwCKD8VIUmRnGjzq5fQ5DGfLCHZsLjgMU'
        }
    };


    fetch( apiUrl, options )
        //   .then(response => response.json())
        //   .then(response => displayResults(response.results))
        //   .catch(err => console.error(err));
        .then( response => response.json() )
        .then( response => {
            if ( response.results ) {
                const resultsDiv = document.getElementById( 'search-resualt' );
                resultsDiv.innerHTML = ''; // Clear previous results

                response.results.forEach( movie => {
                    const movieDiv = document.createElement( 'div' );

                    movieDiv.innerHTML =
                        `
                  <div class="card">
                      <img src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" />
                      <h2> ${movie.original_title}</h2>
                      <p class="overview"> ${movie.overview}</p>
                      <br />
                      <span class="rate"> Date : ${movie.release_date} </span>
                      <br />
                      <span class="rate"> Popularity : ${movie.popularity} </span>
                      <br />
                      <button class='addToFavorites' onclick='addToFavorites(${movie.id})'>Add to favorites</button>
                  </div>
                  `;
                    resultsDiv.appendChild( movieDiv );
                } );
            } else {
                alert( 'No movies found!' );
            }
        } )
        .catch( error => console.error( 'Error fetching data:', error ) );
}

function DisplayMoviesByAfter( before ) {

    const apiUrl = `https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${before}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjZlMGE1ZWUwNjk5NzkyY2QyN2Q5NThhYzNlNGZmZiIsInN1YiI6IjVjZWE3Zjc5YzNhMzY4NTM5ZDFlYzcxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BXRPjuFGkBdwCKD8VIUmRnGjzq5fQ5DGfLCHZsLjgMU'
        }
    };


    fetch( apiUrl, options )
        //   .then(response => response.json())
        //   .then(response => displayResults(response.results))
        //   .catch(err => console.error(err));
        .then( response => response.json() )
        .then( response => {
            if ( response.results ) {
                const resultsDiv = document.getElementById( 'search-resualt' );
                resultsDiv.innerHTML = ''; // Clear previous results

                response.results.forEach( movie => {
                    const movieDiv = document.createElement( 'div' );

                    movieDiv.innerHTML =
                        `
                  <div class="card">
                      <img src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" />
                      <h2> ${movie.original_title}</h2>
                      <p class="overview"> ${movie.overview}</p>
                      <br />
                      <span class="rate"> Date : ${movie.release_date} </span>
                      <br />
                      <span class="rate"> Popularity : ${movie.popularity} </span>
                      <br />
                      <button class='addToFavorites' onclick='addToFavorites(${movie.id})'>Add to favorites</button>
                  </div>
                  `;
                    resultsDiv.appendChild( movieDiv );
                } );
            } else {
                alert( 'No movies found!' );
            }
        } )
        .catch( error => console.error( 'Error fetching data:', error ) );
}

function DisplayMoviesByBefore( after ) {

    const apiUrl = `https://api.themoviedb.org/3/discover/movie?primary_release_date.lte=${after}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjZlMGE1ZWUwNjk5NzkyY2QyN2Q5NThhYzNlNGZmZiIsInN1YiI6IjVjZWE3Zjc5YzNhMzY4NTM5ZDFlYzcxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BXRPjuFGkBdwCKD8VIUmRnGjzq5fQ5DGfLCHZsLjgMU'
        }
    };


    fetch( apiUrl, options )
        //   .then(response => response.json())
        //   .then(response => displayResults(response.results))
        //   .catch(err => console.error(err));
        .then( response => response.json() )
        .then( response => {
            if ( response.results ) {
                const resultsDiv = document.getElementById( 'search-resualt' );
                resultsDiv.innerHTML = ''; // Clear previous results

                response.results.forEach( movie => {
                    const movieDiv = document.createElement( 'div' );

                    movieDiv.innerHTML =
                        `
                  <div class="card">
                      <img src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" />
                      <h2> ${movie.original_title}</h2>
                      <p class="overview"> ${movie.overview}</p>
                      <br />
                      <span class="rate"> Date : ${movie.release_date} </span>
                      <br />
                      <span class="rate"> Popularity : ${movie.popularity} </span>
                      <br />
                      <button class='addToFavorites' onclick='addToFavorites(${movie.id})'>Add to favorites</button>
                  </div>
                  `;
                    resultsDiv.appendChild( movieDiv );
                } );
            } else {
                alert( 'No movies found!' );
            }
        } )
        .catch( error => console.error( 'Error fetching data:', error ) );
}

function DisplayMoviesByVote( Vote ) {

    const apiUrl = `https://api.themoviedb.org/3/discover/movie?vote_average.lte=${Vote}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjZlMGE1ZWUwNjk5NzkyY2QyN2Q5NThhYzNlNGZmZiIsInN1YiI6IjVjZWE3Zjc5YzNhMzY4NTM5ZDFlYzcxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BXRPjuFGkBdwCKD8VIUmRnGjzq5fQ5DGfLCHZsLjgMU'
        }
    };


    fetch( apiUrl, options )
        .then( response => response.json() )
        .then( response => {
            if ( response.results ) {
                const resultsDiv = document.getElementById( 'search-resualt' );
                resultsDiv.innerHTML = ''; // Clear previous results

                response.results.forEach( movie => {
                    const movieDiv = document.createElement( 'div' );

                    movieDiv.innerHTML =
                        `
                  <div class="card">
                      <img src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" />
                      <h2> ${movie.original_title}</h2>
                      <p class="overview"> ${movie.overview}</p>
                      <br />
                      <span class="rate"> Date : ${movie.release_date} </span>
                      <br />
                      <span class="rate"> Popularity : ${movie.popularity} </span>
                      <br />
                      <span class="rate"> vote : ${movie.vote_count} </span>
                      <br />
                      <button class='addToFavorites' onclick='addToFavorites(${movie.id})'>Add to favorites</button>
                  </div>
                  `;
                    resultsDiv.appendChild( movieDiv );
                } );
            } else {
                alert( 'No movies found!' );
            }
        } )
        .catch( error => console.error( 'Error fetching data:', error ) );
}
function DisplayMoviesBySmallerVote( Vote ) {

    const apiUrl = `https://api.themoviedb.org/3/discover/movie?vote_average.gte=${Vote}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjZlMGE1ZWUwNjk5NzkyY2QyN2Q5NThhYzNlNGZmZiIsInN1YiI6IjVjZWE3Zjc5YzNhMzY4NTM5ZDFlYzcxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BXRPjuFGkBdwCKD8VIUmRnGjzq5fQ5DGfLCHZsLjgMU'
        }
    };


    fetch( apiUrl, options )
        .then( response => response.json() )
        .then( response => {
            if ( response.results ) {
                const resultsDiv = document.getElementById( 'search-resualt' );
                resultsDiv.innerHTML = ''; // Clear previous results


                if ( response.total_results === 0 ) {
                    alert( "No movies found Samller Than 1000 Vote" );
                }

                response.results.forEach( movie => {
                    const movieDiv = document.createElement( 'div' );

                    movieDiv.innerHTML =
                        `
                  <div class="card">
                      <img src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" />
                      <h2> ${movie.original_title}</h2>
                      <p class="overview"> ${movie.overview}</p>
                      <br />
                      <span class="rate"> Date : ${movie.release_date} </span>
                      <br />
                      <span class="rate"> Popularity : ${movie.popularity} </span>
                      <br />
                      <span class="rate"> vote : ${movie.vote_count} </span>
                      <br />
                      <button class='addToFavorites' onclick='addToFavorites(${movie.id})'>Add to favorites</button>
                  </div>
                  `;
                    resultsDiv.appendChild( movieDiv );
                } );
            } else {
                alert( 'No movies found!' );
            }
        } )
        .catch( error => console.error( 'Error fetching data:', error ) );
}



//#endregion


// Add to favorites

async function addToFavorites( movieId ) {
    var currentUser = JSON.parse( localStorage.getItem( "currentUser" ) );

    let data;

    // get favorites list
    var currentUser = JSON.parse( localStorage.getItem( "currentUser" ) );
    let users = JSON.parse( localStorage.getItem( "users" ) );



    // get movie data
    var xhr = new XMLHttpRequest();
    xhr.open( 'GET', `https://api.themoviedb.org/3/movie/${movieId}` );
    xhr.setRequestHeader( 'accept', 'application/json' );
    xhr.setRequestHeader( 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjZlMGE1ZWUwNjk5NzkyY2QyN2Q5NThhYzNlNGZmZiIsInN1YiI6IjVjZWE3Zjc5YzNhMzY4NTM5ZDFlYzcxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BXRPjuFGkBdwCKD8VIUmRnGjzq5fQ5DGfLCHZsLjgMU' );
    xhr.send();

    xhr.onreadystatechange = function () {
        if ( xhr.readyState == 4 ) {
            data = JSON.parse( xhr.responseText );
            console.log( data );

            let userIndex = users.findIndex( user => user.email === currentUser.email );
            console.log( userIndex );

            let index = currentUser.favorites.findIndex( movie => movie.id === data.id );
            console.log( index );
            if ( index > -1 ) {
                currentUser.favorites.splice( index, 1 );
                users[userIndex] = currentUser;
                localStorage.setItem( "currentUser", JSON.stringify( currentUser ) );
                localStorage.setItem( "users", JSON.stringify( users ) );
                alert( "removed from favorites" )
            }
            else {
                currentUser.favorites.push( data );
                users[userIndex] = currentUser;
                localStorage.setItem( "currentUser", JSON.stringify( currentUser ) );
                localStorage.setItem( "users", JSON.stringify( users ) );
                alert( "add to favorites" )
            }

        }
    }



}
