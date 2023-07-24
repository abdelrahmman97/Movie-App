
var path = window.location.pathname;
var page = path.split( "/" ).pop();
console.log( page );


document.addEventListener( 'DOMContentLoaded', function () {

    // Background image changer
    if ( page != "home.html" || page != "cart.html" || page != "search.htmls") {
        var bgArr = [
            "./resources/Images/poster-1.jpg",
            "./resources/Images/poster-2.jpg",
            "./resources/Images/poster-3.jpg",
            "./resources/Images/poster-4.jpg"
        ];
        var bg = document.getElementById( "background-image" );

        var random = Math.round( Math.random() * ( bgArr.length - 1 ) );
        bg.style.backgroundImage = `url(${bgArr[random]})`;
        console.log( random );
        console.log( bg.style.backgroundImage );
    }


}, false );


// Left menu control show/hide
var btnLeftMenuClose = document.getElementById( "btn-close" );
var btnLeftMenuOpen = document.getElementsByClassName( "btn-left-menu" )[0];
var leftMenu = document.getElementsByClassName( "left-menu" )[0];

btnLeftMenuOpen.addEventListener( 'click', function () {
    leftMenu.style.width = "14rem";
} );

btnLeftMenuClose.addEventListener( 'click', function () {
    leftMenu.style.width = "0";
} );


// Dropdown menu control show/hide
if ( page != "index.html" ) {
    var btnOpenDropdownMenu = document.getElementById( "dropdownAvatarNameButton" );
    var dropdownMenu = document.getElementById( "dropdownAvatarName" );

    btnOpenDropdownMenu.addEventListener( 'click', function () {
        dropdownMenu.classList.toggle( "active" );
    } );

    document.addEventListener( 'click', function ( event ) {
        console.log(event.target);
        if ( event.target != btnOpenDropdownMenu ) {
            dropdownMenu.classList.remove( "active" );
        }
    }, false );
}