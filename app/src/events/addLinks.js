
document.getElementById('addLink').addEventListener('click', function () {

    hideUnusable('saveLink', ['editLink', 'alertInsertLink']);
    hideUnusable('showBulletin', []);
    var formElement = document.getElementById('formAddLink');
    isLoggedIn = localStorage.getItem('token');
    clearInputFieldCollection(formElement);
    var data = {};
    var isAdmin = JSON.parse(localStorage.getItem('user')).role;
    var bulletinId = document.getElementById('campaignName').value;
    var alert = document.getElementById('alertInsertLink');

    if (isLoggedIn != null && isAdmin == 1 && bulletinId != 0) {

        document.getElementById('saveLink').disabled = false;
    } else {
        document.getElementById('saveLink').disabled = true;
        alertDraw(alert, 'danger', 'Please, select bulletin before insert link');
    }
    if (isLoggedIn == null) {
        document.getElementById('saveLink').disabled = true;
    }
});


document.getElementById('saveLink').addEventListener('click', function () {

    var isAdmin = JSON.parse(localStorage.getItem('user')).role;
    var isLoggedIn = localStorage.getItem('token');

    if (isLoggedIn != '' && isAdmin == 1) {
        var targetUrl = document.getElementById('targetLinkInput').value;
        targetUrl = checkValidUrl(targetUrl);
        var alert = document.getElementById('alertInsertLink');
        var bulletin = document.getElementById('campaignName').value;
        var _document = document;
        var bulletinTitle = document.getElementById('campaignName').options[document.getElementById('campaignName').selectedIndex].text;
        bulletinTitle = escapeString(bulletinTitle);

        var description = escapeString(document.getElementById('linkDescriptionInput').value);

        if (!targetUrl) {

            alertDraw(alert, 'danger', 'URL invalid')
        }
        if (bulletin != 0 && targetUrl != false && description != '') {

            var reqObj = {

                targetLink: targetUrl,
                trackLink: bulletinTitle,
                description: description,
                bulletinId: bulletin,
                base: BASE_URL,
                token: localStorage.getItem('token')
            }
            var headers = {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            };

            var url = BASE_URL + '/add/link'
            var method = 'POST';

            callAjax(method, url, headers, reqObj, function (data) {

                if (data.status == 200) {
                    alertDraw(alert, 'succes', data.message);
                    _document.getElementById('targetLinkInput').value = '';
                    _document.getElementById('linkDescriptionInput').value = '';

                } else {
                    alertDraw(alert, 'danger', data.message);
                }
            });
        }
    }// end if loggedIn
    else {
        window.location.hash = 'track-links';
        document.getElementById('closeLink').click();
    }
});

//--
document.getElementById('editLink').addEventListener('click', function () {

    var targetUrl = document.getElementById('targetLinkInput').value;
    targetUrl = checkValidUrl(targetUrl);
    var alert = document.getElementById('alertInsertLink');
    var _document = document;
    //document.getElementById('selectChangeBulletin').value = bulletinId;
    var bulletinId = document.getElementById('campaignName').value;

    //var bulletinId = document.getElementById('selectChangeBulletin').value;
    // var bulletinTitle = document.getElementById('selectChangeBulletin').options[document.getElementById('selectChangeBulletin').selectedIndex].text;

    var description = escapeString(document.getElementById('linkDescriptionInput').value);

    if (!targetUrl) {

        alertDraw(alert, 'danger', 'URL invalid')
    }
    if (editId != 0 && targetUrl != false && description != '') {

        var reqObj = {

            targetLink: targetUrl,
            bulletinId: bulletinId,
            description: description,
            editId: editId,
            base: BASE_URL,
            token: localStorage.getItem('token')
        }
        var headers = {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };

        var url = BASE_URL + '/edit/link'
        var method = 'POST';

        callAjax(method, url, headers, reqObj, function (data) {

            if (data.status == 200) {

                alertDraw(alert, 'succes', data.message);
                _document.getElementById('targetLinkInput').value = '';
                _document.getElementById('linkDescriptionInput').value = '';
                alertDraw(alert, 'success', data.message);

            } else {
                alertDraw(alert, 'danger', data.message);
            }
        });
    }
    hideUnusable('showBulletin', ['selectChangeBulletin'])
});

function deleteLink(id) {

    if (id != 0) {

        var reqObj = {
            id: id,
            token: localStorage.getItem('token')
        }
        var headers = {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };

        var url = BASE_URL + '/delete/link'
        var method = 'POST';
        var alert = document.getElementById('alertMessage');

        callAjax(method, url, headers, reqObj, function (data) {

            if (data.status == 200) {

                alertDraw(alert, 'success', 'Link was successfully deleted!')

            } else {
                alertDraw(alert, 'danger', data.message);
            }
        });
    }
};

// document.getElementById('showBulletin').addEventListener('click', function () {
//     // window.location.href = BASE_URL+ '/#edit/'+editId;
//     hideUnusable('selectChangeBulletin', ['showBulletin']);
// });

document.getElementById('closeLink').addEventListener('click', function () {
    window.location.hash = '#track-links';
});