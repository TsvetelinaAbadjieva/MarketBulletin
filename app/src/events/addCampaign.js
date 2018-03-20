var errors = 0;
var alert = document.getElementById('alertInsertCampaign');

var inputCollection = document.getElementById('formCampaign').querySelectorAll("input, textarea");

document.getElementById('addCampaignLink').addEventListener('click', function () {

    var isAdmin = JSON.parse(localStorage.getItem('user')).role;

    if (isLoggedIn && isAdmin == 1) {

        document.getElementById('selectBulletins').style.display = 'none';
        hideUnusable('campaignDashboard', componentArr);
        hideUnusable('', ['addCampaignBtn']);
        enableDisable(['saveCampaign'], ['editCampaign']);
        var domEl = document.getElementById('bodyControls');
        deleteChildren(domEl, 0);

        addListeners(inputCollection);
    }
    else {
        window.location.hash = 'bulletins-dashboard';
    }
});


function addListeners(inputCollection) {

    for (var i = 0; i < inputCollection.length; i++) {
        inputCollection[i].addEventListener('blur', validateInput);
    }
};

function validateInput() {

    var value = this.value;

    //  for (var i = 0; i < inputCollection.length; i++) {
    if (!value || value == '' || value == null) {
        alertDraw(alert, 'danger', 'Field must not be empty');
        errors++;
    } else if (this.id != 'startDateInput' && this.id != 'endDateInput' && this.id != 'sendDateInput' && errors > 0) {
        errors--;
    }
}

document.getElementById('saveCampaign').addEventListener('click', function () {

    var startDate = document.getElementById('startDateInput').value;
    var endDate = document.getElementById('endDateInput').value;
    var dateSend = document.getElementById('sendDateInput').value;
    var sendCopies = document.getElementById('sendCopies').value;
    var clientId = JSON.parse(localStorage.getItem('user')).clientId;
    var message = '';

    if (startDate && dateSend && endDate) {

        if (!validateDate(startDate, dateSend)) {

            errors++;
            message = 'Incorect date to send or start date';

        } if (!validateDate(dateSend, endDate)) {

            errors++;
            message = 'Incorect date to send or end date';

        } if (!validateDate(startDate, endDate)) {

            message = 'Incorect start date or end date';
            errors++;

        }

        if (message != '') {
            alertDraw(alert, 'danger', message);
        }
        if (errors == 0) {
            var method = 'POST';
            var headers = {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            };

            var url = BASE_URL + '/add/campaign';
            var req = {
                startDate: startDate,
                sendDate: dateSend,
                endDate: endDate,
                title: document.getElementById('campaignTitleInput').value,
                description: document.getElementById('campaignDescriptionInput').value,
                type: document.getElementById('campaignTypeInput').value,
                sendCopies: document.getElementById('sendCopies').value || 0,
                clientId: clientId,
                visits: 0
            }
            callAjax(method, url, headers, req, function (data) {
                if (data.status == 200) {
                    alertDraw(alert, 'success', data.message);
                }
            });
            errors = 0;
        }
        errors = 0;
    }
});

document.getElementById('editCampaign').addEventListener('click', function () {

    var isAdmin = JSON.parse(localStorage.getItem('user')).role;

    if (isLoggedIn && isAdmin == 1) {

        var startDate = document.getElementById('startDateInput').value;
        var endDate = document.getElementById('endDateInput').value;
        var dateSend = document.getElementById('sendDateInput').value;
        var sendCopies = document.getElementById('sendCopies').value;
        var clientId = JSON.parse(localStorage.getItem('user')).clientId;
        var message = '';

        if (startDate && dateSend && endDate) {

            if (!validateDate(startDate, dateSend)) {

                errors++;
                message = 'Incorect date to send or start date';

            } if (!validateDate(dateSend, endDate)) {

                errors++;
                message = 'Incorect date to send or end date';

            } if (!validateDate(startDate, endDate)) {

                message = 'Incorect start date or end date';
                errors++;

            }

            if (message != '') {
                alertDraw(alert, 'danger', message);
            }
            if (errors == 0) {
                var method = 'POST';
                var headers = {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                };

                var url = BASE_URL + '/edit/bulletin';
                var req = {
                    startDate: startDate,
                    sendDate: dateSend,
                    endDate: endDate,
                    title: document.getElementById('campaignTitleInput').value,
                    description: document.getElementById('campaignDescriptionInput').value,
                    type: document.getElementById('campaignTypeInput').value,
                    sendCopies: document.getElementById('sendCopies').value || 0,
                    clientId: clientId,
                    visits: 0,
                    bulletinId: editBulletinId
                }
                callAjax(method, url, headers, req, function (data) {
                    if (data.status == 200) {
                        alertDraw(alert, 'success', data.message);
                    }
                });
                errors = 0;
            }
            errors = 0;
        }
    } else {
        window.location.hash = 'bulletins-dashboard';
    }
});

document.getElementById('closeCampaign').addEventListener('click', function () {
    window.location.hash = 'bulletins-dashboard';
});

function deleteBulletin(id) {

    if (id != 0) {

        var reqObj = {
            id: id,
            token: localStorage.getItem('token')
        }
        var headers = {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };

        var url = BASE_URL + '/delete/bulletin'
        var method = 'POST';
        var alert = document.getElementById('alertMessage');

        callAjax(method, url, headers, reqObj, function (data) {

            if (data.status == 200) {

                alertDraw(alert, 'success', 'Bulletin was successfully deleted!')

            } else {
                alertDraw(alert, 'danger', data.message);
            }
        });
    }
};
