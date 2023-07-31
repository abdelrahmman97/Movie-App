
let registerBtn = document.getElementById( 'register' );
let loginBtn = document.getElementById( 'login' );
let formValidation = document.getElementById( 'form-validation' );
let successReiteration = document.getElementById( 'successReiteration' );
let validation = document.getElementById( 'form-validation-ul' );


let usernamePattern = /^(?=.{3,20}$)(?![_.-])(?!.*[_.-]{2})[a-zA-Z0-9_.]+([^._-])$/;
let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let passwordPattern = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;

let users = JSON.parse( localStorage.getItem( "users" ) );
if ( users == null ) {
    users = [];
}

registerBtn.addEventListener( "click", function () {
    let currentUser = {
        userId: -1,
        userName: "",
        password: "",
        favorites: []
    };
    let validationArr = [];

    formValidation.style.display = "flex";
    successReiteration.innerHTML = "";
    validation.innerHTML = "";

    let username_valid = true;
    let email_valid = true;
    let password_valid = true;

    let _userName = document.getElementById( 'username' ).value;
    let _email = document.getElementById( 'email' ).value;
    let _password = document.getElementById( 'password' ).value;

    if ( _userName === "" || !usernamePattern.test( _userName ) ) {
        validationArr.push( "Your Username is not valid. Only characters A-Z, a-z and '-', '.' are acceptable." );
        username_valid = false;
    }

    if ( _email === "" || !emailPattern.test( _email ) ) {
        validationArr.push( "Your Email is not valid." );
        email_valid = false;
    }
    if ( _password === "" || !passwordPattern.test( _password ) ) {
        if ( _password.length < 8 || _password.length > 16 ) {
            password_valid = false;
            validationArr.push(
                `Your Password is not valid.
                <br> - password must contain 1 number (0-9)
                <br> - password must contain 1 uppercase letters
                <br> - password must contain 1 lowercase letters
                <br> - password is 8-16 characters with no space`
            );
        }
    }

    if ( !username_valid || !email_valid || !password_valid ) {
        validationArr.forEach( message => {
            validation.innerHTML +=
                `<li><p>${message}</p></li>`;
        } )
    }
    else {

        if ( users.some( _user => _user.email === _email ) ) {
            validation.innerHTML += `<li><p>This email is used before</p></li>`;
        } else {
            var user = {
                userId: users.length,
                userName: _userName,
                email: _email,
                password: _password,
                favorites: []
            }
            users.push( user );
            localStorage.setItem( "users", JSON.stringify( users ) );
            successReiteration.innerHTML = "You have registered successfully!<br>You can now login to your account";
            validation.innerHTML = "";
            document.getElementById( 'username' ).value = "";
            document.getElementById( 'email' ).value = "";
            document.getElementById( 'password' ).value = "";
        }
    }


} )
