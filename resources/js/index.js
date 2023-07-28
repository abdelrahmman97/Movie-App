
document.addEventListener( 'DOMContentLoaded', function () {
    var path = window.location.pathname;
    var page = path.split( "/" ).pop();
    var fav_li = document.getElementById( "fav-li" );

    if ( page == "index.html" || page == "/" || page == "" ) {
        fav_li.remove()
    }
    // Background image changer
    var bg = document.getElementById( "background-image" );
    if ( bg != null ) {
        var bgArr = [
            "./resources/Images/poster-1.jpg",
            "./resources/Images/poster-2.jpg",
            "./resources/Images/poster-3.jpg",
            "./resources/Images/poster-4.jpg"
        ];

        var random = Math.round( Math.random() * ( bgArr.length - 1 ) );
        bg.style.backgroundImage = `url(${bgArr[random]})`;
    }


}, false );


// Left menu control show/hide
var btnLeftMenuClose = document.getElementById( "btn-close" );
var btnLeftMenuOpen = document.getElementsByClassName( "btn-left-menu" )[0];
var leftMenu = document.getElementsByClassName( "left-menu" )[0];

btnLeftMenuOpen.addEventListener( 'click', function () {

    leftMenu.style.width = "15rem";
} );

btnLeftMenuClose.addEventListener( 'click', function () {

    leftMenu.style.width = "0";
} );


// Dropdown menu control show/hide
var btnOpenDropdownMenu = document.getElementById( "dropdownAvatarNameButton" );
var dropdownMenu = document.getElementById( "dropdownAvatarName" );
if ( btnOpenDropdownMenu != null && dropdownMenu != null ) {

    btnOpenDropdownMenu.addEventListener( 'click', function () {

        dropdownMenu.classList.toggle( "active" );
    } );

    document.addEventListener( 'click', function () {

        if ( event.target != btnOpenDropdownMenu ) {
            dropdownMenu.classList.remove( "active" );
        }
    }, false );
}

