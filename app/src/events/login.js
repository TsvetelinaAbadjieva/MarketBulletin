var isAdmin = false;
var isAdministrator = false;

var role = 0;
document.getElementById('loginLink').addEventListener('click', function () {

        document.getElementById('pageTitle').innerHTML = '';
        document.getElementById('selectBulletins').style.display = 'none';
        hideUnusable('login', componentArr);
});

document.getElementById('btnLogin').addEventListener('click', function (e) {

        e.preventDefault();

        var email = escapeString(document.getElementById('inputEmail').value);
        var password = escapeString(document.getElementById('inputPassword').value);
        var alert = document.getElementById('alertLogin');
        var errorMessage = '';
        var message = '';
        var _document = document;


        if (validateEmail(email) && validatePassword(password)) {

                var user = {
                        email: email,
                        password: password
                };
                console.log(BASE_URL);
                var userString = JSON.stringify(user);
                var xhttp = new XMLHttpRequest();
                var resp;
                xhttp.open('POST', BASE_URL + '/login', true);
                xhttp.setRequestHeader("Content-type", "application/json");

                xhttp.onreadystatechange = function () {

                        if (xhttp.readyState == 4 && xhttp.status == 200) {

                                resp = JSON.parse(xhttp.responseText);
                                if (resp.status == 200) {
console.log('login response', resp);
                                        isAdmin = checkIsAdmin(resp.role);
                                        var userLoggedInInfo = document.getElementById('userLoggedIn').querySelector('a');
                                        userLoggedInInfo.innerText = user.email;

                                        message = user.email + ', You Logged in successfully!';
                                        user['role'] = resp.role;
                                        user['clientId'] = resp.clientId;
                                        delete user['password'];
                                        role = resp.role;
                                        //isAdministrator = (resp.role == 1)? true : false;
                                        userData = JSON.stringify(user);
                                        localStorage.setItem('token', resp.token);
                                        localStorage.setItem('user', userData);
                                        _document.getElementById('loginLink').style.display = 'none';
                                        _document.getElementById('registrationLink').style.display = 'none';
                                        _document.getElementById('logoutLink').style.display = '';
                                        drawPageAfterLogin(_document);
                                        window.location.hash = 'bulletinDashboard';
                                        console.log(resp.token)
                                        isLoggedIn = true;
                                        isOffline = false;
                                }
                                else if (resp.status == 400) {
                                        message = resp.message;

                                        var alert = document.getElementById('alertLogin');
                                        alert.classList.remove('alert-success');
                                        alert.classList.add('alert-danger');
                                        alert.innerText = message;
                                        alert.style.display = 'block';
                                }
                        }
                }
                xhttp.send(userString);
        }
        else {
                alert.style.display = 'block';
                alert.innerText = 'Username or password might be incorrect';
        }

        window.location.href = BASE_URL + '/#bulletinDashboard';

        var form = document.getElementById('loginForm');
        form.style.display = 'none';
        document.getElementById('login').removeChild(form);
});

function checkIsAdmin(role) {

        if (role == 1)
                return true;
        return false;
};

