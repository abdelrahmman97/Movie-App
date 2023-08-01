var path = window.location.pathname;
var page = path.split( "/" ).pop();

var currentUser = JSON.parse( sessionStorage.getItem( "currentUser" ) );
switch ( page ) {
    case "index.html":
        if ( currentUser != null ) {
            window.location.replace( "./home.html" )
        }
        break;
    case "login.html":
    case "register.html":
        if ( currentUser != null ) {
            window.location.replace( "./home.html" )
        }
        break;
    case "home.html":
    case "iteminfo.html":
    case "favorites.html":
        if ( currentUser == null ) {
            window.location.replace( "./index.html" )
        }
        break;

    default:
        break;
}


document.addEventListener( 'DOMContentLoaded', function () {
    var dropdownUserName = this.getElementById( "dropdownUserName" );
    if ( currentUser != null && dropdownUserName != null) {
        dropdownUserName.innerHTML = currentUser.userName;
    }
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


// Dropdown menu control
var btnOpenDropdownMenu = document.getElementById( "dropdownAvatarNameButton" );
var dropdownMenu = document.getElementById( "dropdownAvatarName" );
var dropdownUserName = document.getElementById( 'dropdownUserName' );
var imgAvatar = document.getElementById( 'dropdownAvatar' );
var svgIcon = document.getElementById( 'dropdownSvgIcon' );

if ( btnOpenDropdownMenu != null && dropdownMenu != null ) {

    // show / hide dropdown menu
    btnOpenDropdownMenu.addEventListener( 'click', function () {
        dropdownMenu.classList.toggle( "active" );
    } );

    dropdownUserName.addEventListener( 'click', function ( event ) {
        event.stopPropagation();
        dropdownMenu.classList.toggle( "active" );
    } );
    imgAvatar.addEventListener( 'click', function ( event ) {
        event.stopPropagation();
        dropdownMenu.classList.toggle( "active" );
    } );
    svgIcon.addEventListener( 'click', function ( event ) {
        event.stopPropagation();
        dropdownMenu.classList.toggle( "active" );
    } );

    document.addEventListener( 'click', function ( event ) {
        if ( event.target != btnOpenDropdownMenu ) {
            dropdownMenu.classList.remove( "active" );
        }
    } );


    // user signout
    document.getElementById( "signout" ).addEventListener( "click", function () {
        sessionStorage.removeItem( "currentUser" );
        window.location.replace("./login.html")
    })
}

