
// Movie Poster and Background
var movieBgImage = document.getElementById( "movie-bg-image" );
var container = document.getElementsByClassName( "container" )[0];
window
// Movie Info
var showTitle = document.getElementById( "show-title" );
var showDesc = document.getElementById( "show-desc" );
var showBadge = document.getElementById( "show-badge" );

var addToCardBtn = document.getElementById( "addToCard" );
var moreInfoBtn = document.getElementById( "moreInfo" );

// Slider
var sliderBtnNext = document.getElementById( "data-slider-next" );
var sliderBtnprev = document.getElementById( "data-slider-prev" );
var sliderIndicatorsGroup = document.getElementById( "slider-indicators-group" );
var sliderIndicatorBtn = document.getElementsByClassName( "slider-indicator" );

var sliderItemsNumber = 4;
var sliderTime = 4000;

var nIntervId;
var index = 0;

var data;
var resultsArr;

var xhr = new XMLHttpRequest();

// xhr.open( "Get", 'https://api.themoviedb.org/3/trending/all/day' );
xhr.open( "Get", 'https://api.themoviedb.org/3/movie/now_playing' );

xhr.setRequestHeader( 'accept', 'application/json' );
xhr.setRequestHeader( 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjZlMGE1ZWUwNjk5NzkyY2QyN2Q5NThhYzNlNGZmZiIsInN1YiI6IjVjZWE3Zjc5YzNhMzY4NTM5ZDFlYzcxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BXRPjuFGkBdwCKD8VIUmRnGjzq5fQ5DGfLCHZsLjgMU' );

xhr.send();

xhr.onreadystatechange = function () {
    if ( xhr.readyState == 4 ) {
        data = JSON.parse( xhr.responseText );
        resultsArr = data.results;
        console.log( data );

        // Slider animation
        for ( let x = 0; x < sliderItemsNumber; x++ ) {
            sliderIndicatorBtn[x].classList.remove( "active-slider" );
        }
        sliderIndicatorBtn[index].classList.add( "active-slider" );

        // Append Info
        showTitle.innerHTML = resultsArr[index].title;
        showDesc.innerHTML = resultsArr[index].overview;
        movieBgImage.style.backgroundImage = `url("https://image.tmdb.org/t/p/original/${resultsArr[index].backdrop_path}")`;
        // addToCardBtn.addEventListener( "click", addToCard(resultsArr[index].id) );
        moreInfoBtn.addEventListener( "click", function () {
            goToInfoPage( resultsArr[index].id );
        } );

        if ( !nIntervId ) {
            nIntervId = setInterval( function () {
                index++;

                if ( index >= sliderItemsNumber ) {
                    index = 0;
                }

                // Slider animation
                for ( let x = 0; x < sliderItemsNumber; x++ ) {
                    sliderIndicatorBtn[x].classList.remove( "active-slider" );
                }
                sliderIndicatorBtn[index].classList.add( "active-slider" );

                // Append Info
                showTitle.innerHTML = resultsArr[index].title;
                showDesc.innerHTML = resultsArr[index].overview;
                movieBgImage.style.backgroundImage = `url("https://image.tmdb.org/t/p/original/${resultsArr[index].backdrop_path}")`;
            }, sliderTime );
        }
    }
}

document.addEventListener( 'DOMContentLoaded', function () {
    showBadge.innerText = "Now Playing";
    for ( let i = 0; i < sliderItemsNumber; i++ ) {
        sliderIndicatorsGroup.innerHTML += `<button type="button" title="click to show slide" class="slider-indicator" onclick="showSlide(${i})"></button>`;
    }
}, false );


function goToInfoPage( _id ) {
    var url = `./inteminfo.html?id=${_id}`;
    document.location.href = url;
}

function showSlide( newIndex ) {
    index = newIndex;
    if ( nIntervId != null ) {
        clearInterval( nIntervId );
        nIntervId = null;
    }
    if ( !nIntervId ) {
        if ( index >= sliderItemsNumber ) {
            index = 0;
        }
        else if ( index < 0 ) {
            index = sliderItemsNumber - 1
        }
        // Slider animation
        for ( let x = 0; x < sliderItemsNumber; x++ ) {
            sliderIndicatorBtn[x].classList.remove( "active-slider" );
        }
        sliderIndicatorBtn[index].classList.add( "active-slider" );

        // Append Info
        showTitle.innerHTML = resultsArr[index].title;
        showDesc.innerHTML = resultsArr[index].overview;
        movieBgImage.style.backgroundImage = `url("https://image.tmdb.org/t/p/original/${resultsArr[index].backdrop_path}")`;

        nIntervId = setInterval( playSlider, sliderTime );
    }
}

function playSlider() {
    index++;

    if ( index >= sliderItemsNumber ) {
        index = 0;
    }

    // Slider animation
    for ( let x = 0; x < sliderItemsNumber; x++ ) {
        sliderIndicatorBtn[x].classList.remove( "active-slider" );
    }
    sliderIndicatorBtn[index].classList.add( "active-slider" );

    // Append Info
    showTitle.innerHTML = resultsArr[index].title;
    showDesc.innerHTML = resultsArr[index].overview;
    movieBgImage.style.backgroundImage = `url("https://image.tmdb.org/t/p/original/${resultsArr[index].backdrop_path}")`;
}

sliderBtnNext.addEventListener( "click", function () {
    showSlide( ++index );
} );

sliderBtnprev.addEventListener( "click", function () {
    showSlide( --index );
} );

