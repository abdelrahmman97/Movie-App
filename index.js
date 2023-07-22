var div = document.getElementById( "div" );



var xhr = new XMLHttpRequest();

xhr.open( "Get", 'https://api.themoviedb.org/3/discover/movie' );

xhr.setRequestHeader( 'accept', 'application/json' );
xhr.setRequestHeader( 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjZlMGE1ZWUwNjk5NzkyY2QyN2Q5NThhYzNlNGZmZiIsInN1YiI6IjVjZWE3Zjc5YzNhMzY4NTM5ZDFlYzcxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BXRPjuFGkBdwCKD8VIUmRnGjzq5fQ5DGfLCHZsLjgMU' );

xhr.send();



var data;

xhr.onreadystatechange = function () {
    if ( xhr.readyState == 4 ) {
        data = JSON.parse( xhr.responseText );
        var arr = data.results;
        for (let index = 0; index < arr.length; index++) {
            div.innerHTML += `<p>${arr[index].original_title}</p>`;
        }
        console.log( data )
    }
}
