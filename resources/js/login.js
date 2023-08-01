
let loginBtn = document.getElementById( 'login' );
let formValidation = document.getElementById( 'form-validation' );
let successReiteration = document.getElementById( 'successReiteration' );
let validation = document.getElementById( 'form-validation-ul' );

let users = JSON.parse( localStorage.getItem( "users" ) );
if ( users == null ) {
    users = [];
}

loginBtn.addEventListener( "click", function () {
    let currentUser = {
        userId: -1,
        userName: "",
        password: "",
        favorites: []
    };
    let validationArr = [];

    validation.innerHTML = "";

    let _email = document.getElementById( 'email_login' ).value;
    let _password = document.getElementById( 'password_login' ).value;

    var index = users.findIndex( _user => _user.email === _email && _user.password === _password )
    if ( index > -1 ) {
        currentUser = users[index]
        sessionStorage.setItem( "currentUser", JSON.stringify( currentUser ) )
        window.location.replace( "/home.html" );
        console.log( currentUser );
    }
    else {
        formValidation.style.display = "flex";
        validation.innerHTML = "<li><p>Email or password is wrong!</p></li>";
    }
} )
