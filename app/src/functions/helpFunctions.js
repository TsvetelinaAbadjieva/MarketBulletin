validateInputField = function (input) {

    if (input == '') return false;
    return true;
}

validateUsername = function (username) {

    var message = '';
    if (username == '') {
        return false;
    }
    if (username.length < 3) {
        return false;
    }

    username = username.trim();
    var patt = /^[a-zA-Z\-]+$/;
    var res = patt.test(username);

    if (!res) {
        return false;

    } else {
        return true;
    }
    return true;
};

validateEmail = function (email) {

    var patt = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email == '') return false;
    email = email.trim();
    var res = patt.test(email);
    if (!res) {
        return false;
    } else {
        return true;
    }
};

validatePassword = function (password) {

    if (password.length < 6) {
        return false;
    }
    password = password.trim();
    var patt = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    var res = patt.test(password);

    if (!res) {
        return false;

    } else {
        return true;
    }

};

validateLink = function (link) {

    var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (pattern.test(link)) {
        alert("Url is valid");
        return true;
    }
    alert("Url is not valid!");
    return false;

};

validateDueDate = function (input) {

    var today = getToday();
    var correctDate = (today.toString() < input.toString());
    return correctDate;
};

validateDate = function (beforeInput, afterInput) {

    var today = getToday();
    var correctDate = ((today.toString() <= beforeInput.toString()) && (beforeInput.toString() < afterInput.toString()));
    return correctDate;
};


getToday = function () {

    var date = new Date();
    var day = (parseInt(date.getDate()) > 9) ? date.getDate() : '0' + date.getDate();
    var month = (parseInt(date.getMonth()) > 8) ? (parseInt(date.getMonth()) + 1) : '0' + (parseInt(date.getMonth()) + 1);
    var today = date.getFullYear() + '-' + month + '-' + day;
    return today;
};

escapeString = function (str) {

    var safeStr = '';
    if (str != '') {
        safeStr = str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace('  ', ' ').trim();
    }
    return safeStr;
};

alertMessage = function (alertEl, message) {
    console.log('In alert Message')
    alertEl.innerText = message;
    alertEl.style.display = 'block';
    setTimeout(function () {
        alertEl.style.display = 'none';
    }, 3000);
};

alertDraw = function (el, type, message) {

    switch (type) {
        case 'danger':
            el.classList.remove('alert-success');
            el.classList.add('alert-danger');
            alertMessage(el, message);
            break;
        case 'success':
            el.classList.remove('alert-danger');
            el.classList.add('alert-succes');
            alertMessage(el, message);
            break;
    }
};

callAjax = function (method, url, headerConfig, reqObj, func) {

    var params;
    if (reqObj != null) {
        params = JSON.stringify(reqObj) || '';
    }
    var params = JSON.stringify(reqObj) || '';
    var xhttp = new XMLHttpRequest();
    xhttp.open(method, url, true);
    for (var prop in headerConfig) {
        xhttp.setRequestHeader(prop, headerConfig[prop]);
    }
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 & xhttp.status == 200) {
            console.log(xhttp.responseText);
            data = JSON.parse(xhttp.responseText);
            func(data);
        }
    }
    if (reqObj === null) {
        xhttp.send();
    } else {
        xhttp.send(params);
    }
};

setTaskStatus = function (statusId) {

    var color = '';
    switch (statusId) {
        case "1":
            color = "#6fccb6";//to do
            break;
        case "2":
            color = "#e2f384";//in process - begin
            break;
        case "3":
            color = "#b59c9c";// pending
            break;
        case "4":
            color = "#3ba243"; //done
            break;
        case "5":
            color = "#da9847";// in process -upper
            break;
        case "6":
            color = "#e25503";//in process - end
            break;
        case "7":
            color = "#d60d0d";//testing
            break;

        case "8":
            color = "#a7bd4c";//await
            break;
        case "9":
            color = "#c7b848"; //in process - middle
            break;
        default:
            color = "grey";
    }
    return color;
};

function ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
};

function isLoggedIn() {

    if (localStorage.getItem('token') != null || localStorage.getItem('token') !='')
        return true;
    return false;
};

function checkIsAdmin() {

    var role = JSON.parse(localStorage.getItem('user')).role;
    console.log(role);
    if (role == 1) {
        return true;
    }
    return false;
};

//delete children form level to Down
function deleteChildren(domEl, levelToDown) {

    while (domEl.childNodes.length > levelToDown) {
        domEl.removeChild(domEl.lastChild);
    }
};

function clearInputFieldCollection(formElement){

    var inputCollection = [];
     inputCollection = formElement.querySelectorAll("input, textarea");
     inputCollection.forEach((item)=>{ if (item.type != 'button') item.value = '';})
};

function convertToCSV(objArray) {

    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var index in array[0]) {
        str += index + ', ';
    };
    str += '\r\n';
    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
};

var parseDate = function (date) {
    date += ' GMT';
    date = new Date(date).toISOString().slice(0, 19);
    return date;
};

function selectItemByValue(elmnt, value) {

    for (var i = 0; i < elmnt.options.length; i++) {
        if (elmnt.options[i].value === value) {
            elmnt.selectedIndex = i;
            break;
        }
    }
};

function URLParser(u) {
    var path = "", query = "", hash = "", params;
    if (u.indexOf("#") > 0) {
        hash = u.substr(u.indexOf("#") + 1);
        u = u.substr(0, u.indexOf("#"));
    }
    if (u.indexOf("?") > 0) {
        path = u.substr(0, u.indexOf("?"));
        query = u.substr(u.indexOf("?") + 1);
        params = query.split('&');
    } else
        path = u;
    return {
        getHost: function () {
            var hostexp = /\/\/([\w.-]*)/;
            var match = hostexp.exec(path);
            if (match != null && match.length > 1)
                return match[1];
            return "";
        },
        getPath: function () {
            var pathexp = /\/\/[\w.-]*(?:\/([^?]*))/;
            var match = pathexp.exec(path);
            if (match != null && match.length > 1)
                return match[1];
            return "";
        },
        getHash: function () {
            return hash;
        },
        getParams: function () {
            return params
        },
        getQuery: function () {
            return query;
        },
        setHash: function (value) {
            if (query.length > 0)
                query = "?" + query;
            if (value.length > 0)
                query = query + "#" + value;
            return path + query;
        },
        setParam: function (name, value) {
            if (!params) {
                params = new Array();
            }
            params.push(name + '=' + value);
            for (var i = 0; i < params.length; i++) {
                if (query.length > 0)
                    query += "&";
                query += params[i];
            }
            if (query.length > 0)
                query = "?" + query;
            if (hash.length > 0)
                query = query + "#" + hash;
            return path + query;
        },
        getParam: function (name) {
            if (params) {
                for (var i = 0; i < params.length; i++) {
                    var pair = params[i].split('=');
                    if (decodeURIComponent(pair[0]) == name)
                        return decodeURIComponent(pair[1]);
                }
            }
            console.log('Query variable %s not found', name);
        },
        hasParam: function (name) {
            if (params) {
                for (var i = 0; i < params.length; i++) {
                    var pair = params[i].split('=');
                    if (decodeURIComponent(pair[0]) == name)
                        return true;
                }
            }
            console.log('Query variable %s not found', name);
        },
        removeParam: function (name) {
            query = "";
            if (params) {
                var newparams = new Array();
                for (var i = 0; i < params.length; i++) {
                    var pair = params[i].split('=');
                    if (decodeURIComponent(pair[0]) != name)
                        newparams.push(params[i]);
                }
                params = newparams;
                for (var i = 0; i < params.length; i++) {
                    if (query.length > 0)
                        query += "&";
                    query += params[i];
                }
            }
            if (query.length > 0)
                query = "?" + query;
            if (hash.length > 0)
                query = query + "#" + hash;
            return path + query;
        },
    }
};

function checkValidUrl(url) {

    url = url.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace('  ', '').trim();

    var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    if (url != '' && regex.test(url)) {
        return url;
    }
    return false;
}