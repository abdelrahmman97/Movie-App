let tvGenre;
let moviesGenre;

let xhrMoviesGenres = new XMLHttpRequest();
xhrMoviesGenres.open( "Get", `https://api.themoviedb.org/3/genre/movie/list` );
xhrMoviesGenres.setRequestHeader( 'accept', 'application/json' );
xhrMoviesGenres.setRequestHeader( 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjZlMGE1ZWUwNjk5NzkyY2QyN2Q5NThhYzNlNGZmZiIsInN1YiI6IjVjZWE3Zjc5YzNhMzY4NTM5ZDFlYzcxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BXRPjuFGkBdwCKD8VIUmRnGjzq5fQ5DGfLCHZsLjgMU' );
xhrMoviesGenres.send();
xhrMoviesGenres.onreadystatechange = function () {
    if ( xhrMoviesGenres.readyState == 4 && xhrMoviesGenres.status == 200 ) {
        moviesGenre = JSON.parse( xhrMoviesGenres.responseText );
        localStorage.setItem( "MoviesGenres", JSON.stringify( moviesGenre ) )
    }
}


let xhrTVGenres = new XMLHttpRequest();
xhrTVGenres.open( "Get", `https://api.themoviedb.org/3/genre/tv/list` );
xhrTVGenres.setRequestHeader( 'accept', 'application/json' );
xhrTVGenres.setRequestHeader( 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjZlMGE1ZWUwNjk5NzkyY2QyN2Q5NThhYzNlNGZmZiIsInN1YiI6IjVjZWE3Zjc5YzNhMzY4NTM5ZDFlYzcxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BXRPjuFGkBdwCKD8VIUmRnGjzq5fQ5DGfLCHZsLjgMU' );
xhrTVGenres.send();
xhrTVGenres.onreadystatechange = function () {
    if ( xhrTVGenres.readyState == 4 && xhrTVGenres.status == 200 ) {
        tvGenre = JSON.parse( xhrTVGenres.responseText );
        localStorage.setItem( "TVGenres", JSON.stringify( tvGenre ) )
    }
}
