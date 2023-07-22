// var bgArr = [
//     "./../Images/poster 1.jpg",
//     "./../Images/poster 2.jpg",
//     "./../Images/poster 3.jpg",
//     "./../Images/poster 4.jpg"
// ];
var bg = document.getElementById( "background-image" );

document.addEventListener( 'DOMContentLoaded', function () {
    var random = Math.round( ( Math.random() * 3 ) + 1 );
    bg.style.backgroundImage = `url("./resources/Images/poster-${random}.jpg")`;
    console.log( random );
    console.log( bg.style.backgroundImage );
    // setInterval( createEgg, 1000 )
}, false );

var btnLeftMenuClose = document.getElementById( "btn-close" );
var btnLeftMenuOpen = document.getElementsByClassName( "btn-left-menu" )[0];
var leftMenu = document.getElementsByClassName( "left-menu" )[0];

btnLeftMenuOpen.addEventListener( 'click', function () {
    leftMenu.style.width = "14rem";
} );

btnLeftMenuClose.addEventListener( 'click', function () {
    leftMenu.style.width = "0";
} );
