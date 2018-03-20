var flagValidation = true;
var isLoggedIn;

document.getElementById('registrationLink').addEventListener('click', function () {

    document.getElementById('pageTitle').innerHTML = '';
    document.getElementById('selectBulletins').style.display = 'none';
    hideUnusable('register', componentArr);


    var url = BASE_URL + "/clients";
    headerConfig = {
        "Content-type": "application/json"
    };
    var selectClient = document.getElementById('clients');
    var _document = document;

    callAjax('GET', url, headerConfig, null, function (data) {
        var fragment = _document.createDocumentFragment();
        console.log('In add clients')
        console.log(data.data);
        for (var i = 0; i < data.data.length; i++) {

            var option = _document.createElement('option');
            option.value = data.data[i].id;
            option.innerHTML = data.data[i].name;
            fragment.append(option);

        }
        selectClient.appendChild(fragment);

    });
});

document.getElementById('btnRegister').addEventListener('click', function (e) {

    e.preventDefault();
    var errorMessage = '';
    var errorStatus = '';
    var message = '';

    var fName = escapeString(document.getElementById('inputFirstNameReg').value);
    var lName = escapeString(document.getElementById('inputLastNameReg').value);
    var email = escapeString(document.getElementById('inputEmailReg').value);
    var password = escapeString(document.getElementById('inputPasswordReg').value);
    var client = document.getElementById('clients').value;
    if (client == 0) {
        flagValidation = false;
        message = 'Please, select client'
    }
    console.log(client);


    if (flagValidation) {

        var user = {
            firstName: fName,
            lastName: lName,
            username: email,
            email: email,
            password: password,
            clientId: client
        };
        var userString = JSON.stringify(user);
        var xhttp = new XMLHttpRequest();
        xhttp.open('POST', BASE_URL + '/register', true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.onreadystatechange = function () {

            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var data = JSON.parse(xhttp.responseText);
                message = data.message;
                errorStatus = data.status;
                if (parseInt(errorStatus) == 400) {

                    var alert = document.getElementById('alertRegister');
                    console.log('in error');
                    alert.innerText = message;
                    alert.style.display = 'block';
                }
                else if (parseInt(errorStatus) == 200) {

                    window.location.href = BASE_URL + '/#login';
                    document.getElementById('login').removeAttribute('hidden');
                    document.getElementById('login').style.display = "block";

                    var alert = document.getElementById('alertLogin');
                    alert.classList.remove('alert-danger');
                    alert.classList.add('alert-success');
                    alert.innerText = message;
                    alert.style.display = 'block';

                    var form = document.getElementById('registerForm');
                    form.style.display = 'none';
                    document.getElementById('register').removeChild(form);
                }
            }
        }
        xhttp.send(userString);
    }//end if validation
    else {
        var alert = document.getElementById('alertRegister');
        console.log(alert)
        alert.classList.remove('alert-danger');
        alert.classList.add('alert-success');
        alertMessage(alert, message);
    }


});

document.getElementById('inputFirstNameReg').addEventListener('change', function () {

    var alert = document.getElementById('alertRegister');

    var fName = escapeString(document.getElementById('inputFirstNameReg').value);

    if (!validateUsername(fName)) {
        alert.innerText = 'First name must be more than 3 symbols';
        alert.style.display = 'block';
        flagValidation = false;
    }
    else {
        alert.style.display = 'none';
        flagValidation = true;
    }
});

document.getElementById('inputLastNameReg').addEventListener('change', function () {


    var alert = document.getElementById('alertRegister');

    var lName = escapeString(document.getElementById('inputLastNameReg').value);

    if (!validateUsername(lName)) {
        alert.innerText = 'Last name must be more than 3 symbols';
        alert.style.display = 'block';
        flagValidation = false;

    }
    else {
        alert.style.display = 'none';
        flagValidation = true;
    }
});

document.getElementById('inputEmailReg').addEventListener('change', function () {


    var alert = document.getElementById('alertRegister');

    var email = escapeString(document.getElementById('inputEmailReg').value);

    if (!validateEmail(email)) {
        alert.innerText = 'Username must be a valid email';
        alert.style.display = 'block';
        flagValidation = false;

    }
    else {
        alert.style.display = 'none';
        flagValidation = true;
    }
});

document.getElementById('inputPasswordReg').addEventListener('change', function () {


    var alert = document.getElementById('alertRegister');

    var password = escapeString(document.getElementById('inputPasswordReg').value);

    if (!validatePassword(password)) {
        alert.innerText = 'Password must be more than 6 symbols in length with at least one char, number and upper case ';
        alert.style.display = 'block';
        flagValidation = false;

    }
    else {
        alert.style.display = 'none';
        flagValidation = true;
    }
});