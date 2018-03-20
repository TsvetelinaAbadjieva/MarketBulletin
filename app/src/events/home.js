var isLoggedIn = localStorage.getItem('token');
var componentArr = ['register', 'login', 'bodyContainer', 'campaignDashboard', 'mainBoard'];
var listId = 0;
var editId = 0;
var deleteId = 0;
var editBulletinId = 0;
var currentPage = 1;
var perPage = 2;
var totalRows = 0;
var currentPageLinks = 1;
var perPageLinks = 2;
var totalRowsLinks = 0;
var totalRowsLinks = 0

var isOnline = true;

var linkData = [];
var bulletinData = [];

window.addEventListener('load', function (e) {
    e.preventDefault();
    var task;
    var projDashboard;
    var chart;
    isLoggedIn = localStorage.getItem('token');
    var isAdmin = 0;

    if (isLoggedIn != null) {

        isAdmin = JSON.parse(localStorage.getItem('user')).role;
        document.getElementById('register').style.display = 'none';
        document.getElementById('login').style.display = 'none';
        document.getElementById('alertRegister').style.display = 'none';
        document.getElementById('alertLogin').style.display = 'none';
        document.getElementById('loginLink').style.display = 'none';
        document.getElementById('registrationLink').style.display = 'none';
        document.getElementById('logoutLink').style.display = '';

        if (isAdmin != 1) {
            document.getElementById('addLink').style.display = 'none';
        } else {
            document.getElementById('addLink').style.display = '';
        }
        redirectToUrl();

    } else {

        document.getElementById('loginLink').style.display = '';
        document.getElementById('registrationLink').style.display = '';
        document.getElementById('addLink').style.display = 'none';
        document.getElementById('logoutLink').style.display = 'none';
        redirectToUrl();
    }
    // else if((isLoggedIn() && isAdmin !=1)){

    //     document.getElementById('loginLink').style.display = 'none';
    //     document.getElementById('registrationLink').style.display = 'none';
    //     document.getElementById('addLink').style.display = 'none';
    //     document.getElementById('logoutLink').style.display = '';
    // }
});

window.addEventListener("hashchange", function (event) {

    event.preventDefault();
    redirectToUrl();
});

function redirectToUrl() {

    var domEl;
    switch (window.location.hash) {

        case '':
            document.getElementById('homeDashboard').click();
            hideUnusable('mainBoard', componentArr);
            document.getElementById('pageTitle').innerHTML = '';
            document.getElementById('head').style.display = 'none';
            break;

        case '#home-dashboard':
            document.getElementById('homeDashboard').click();
            hideUnusable('mainBoard', componentArr);
            document.getElementById('pageTitle').innerHTML = '';
            document.getElementById('head').style.display = 'none';
            domEl = document.getElementById('bodyControls');
            deleteChildren(domEl, 0);
            document.getElementById('selectBulletins').style.display = 'none';
            break;

        case '#registration':
            document.getElementById('registrationLink').click();
            domEl = document.getElementById('bodyControls');
            deleteChildren(domEl, 0);
            break;

        case '?#registration':
            document.getElementById('registrationLink').click();
            domEl = document.getElementById('bodyControls');
            deleteChildren(domEl, 0);
            break;

        case '#login':
            document.getElementById('loginLink').click();
            domEl = document.getElementById('bodyControls');
            deleteChildren(domEl, 0);
            break;

        case '?#login':
            document.getElementById('loginLink').click();
            domEl = document.getElementById('bodyControls');
            deleteChildren(domEl, 0);
            break;

        case '?#logout':
            document.getElementById('logoutLink').click();
            domEl = document.getElementById('bodyControls');
            deleteChildren(domEl, 0);
            hideUnusable('', componentArr);
            break;

        case '#logout':
            document.getElementById('logoutLink').click();
            domEl = document.getElementById('bodyControls');
            deleteChildren(domEl, 0);
            hideUnusable('', componentArr);
            break;

        case '#bulletins-dashboard':
            if (!isLoggedIn) {
                window.location.hash = 'home-dashboard'
            } else {
                document.getElementById('bulletinDashboard').click();
            }
            break;

        case '?#bulletins-dashboard':
            if (!isLoggedIn) {
                window.location.hash = 'home-dashboard'
            } else {
                document.getElementById('bulletinDashboard').click();
            }
            break;


        case '#track-links':
            if (!isLoggedIn) {
                window.location.hash = 'home-dashboard'
            } else {
                document.getElementById('trackLinks').click();
            }
            break;

        case '?#track-links':
            if (!isLoggedIn) {
                window.location.hash = 'home-dashboard'
            } else {
                document.getElementById('trackLinks').click();
            }
            break;

        case '#add-campaign':
            if (!isLoggedIn) {
                window.location.hash = 'home-dashboard'
            } else {
                hideUnusable('addCampaign', ['editCampaign']);
                document.getElementById('addCampaignLink').click();
            }
            break;

        case '?#add-campaign':
            if (!isLoggedIn) {
                window.location.hash = 'home-dashboard'
            } else {
                hideUnusable('addCampaign', ['editCampaign']);
                document.getElementById('addCampaignLink').click();
            }
            break;

        case '#bulletinDashboard':
            if (!isLoggedIn) {
                window.location.hash = 'home-dashboard'
            } else {
                hideUnusable('addCampaign', ['editCampaign']);
                drawPageAfterLogin();
            }
            break;

        case '#testPage':
            if (!isLoggedIn) {
                window.location.hash = 'home-dashboard'
            } else {
                hideUnusable('addCampaign', ['editCampaign']);
                document.getElementById('testPageLink').click();
            }
            break;

    }

    if (window.location.hash.indexOf('#list/') !== -1) {
        listId = window.location.hash.split('/')[1];
        document.getElementById('trackLinks').click();
        document.getElementById('campaignName').value = listId;
        console.log(bulletinData);
        hideUnusable('saveLink', ['editLink']);
        fillImageTag(listId);

    }
    else if (window.location.hash.indexOf('#edit/') !== -1) {

        var isAdmin = JSON.parse(localStorage.getItem('user')).role;
        if ((isLoggedIn && isAdmin == 1) || (isLoggedIn && isAdministrator == true)) {
            editId = window.location.hash.split('/')[1];
            document.getElementById('btnAddLink').click();
            hideUnusable('editLink', ['saveLink', 'alertInsertLink']);
            document.getElementById('editLink').style.display = 'block';
            fillEditLinkData(editId);
        }
    }
    else if (window.location.hash.indexOf('#delete/') !== -1) {

        var isAdmin = JSON.parse(localStorage.getItem('user')).role;
        if (isLoggedIn && isAdmin == 1) {
            deleteId = window.location.hash.split('/')[1];
            console.log('deleteLink'); console.log(deleteId)
            if (confirm('Are you sure you want to delete this Link? ID = ' + deleteId)) {
                deleteLink(deleteId);
            }
        }
    }
    else if (window.location.hash.indexOf('#editBulletin/') !== -1) {

        var isAdmin = JSON.parse(localStorage.getItem('user')).role;
        if (isLoggedIn && isAdmin == 1) {

            editBulletinId = window.location.hash.split('/')[1];
            document.getElementById('addCampaignLink').click();
            var domEl = document.getElementById('bodyControls');
            deleteChildren(domEl, 0);
            enableDisable(['editCampaign'], ['saveCampaign']);
            fillEditBulletinData(editBulletinId);
        }
    }
    else if (window.location.hash.indexOf('#deleteBulletin/') !== -1) {

        var isAdmin = JSON.parse(localStorage.getItem('user')).role;
        if (isLoggedIn && isAdmin == 1) {
            deleteId = window.location.hash.split('/')[1];
            console.log('deleteLink'); console.log(deleteId)
            if (confirm('Are you sure you want to delete this Bulletin? ID = ' + deleteId)) {
                deleteBulletin(deleteId);
            }
        }
    }
    else if (window.location.hash.indexOf('#track-links?page=') !== -1) {
        var _document = document;
        document.getElementById('bulletinDashboard').click();
        currentPage = parseInt(window.location.hash.split('=')[1]);
        getLinkCollectionByPage( currentPage, perPage, _document, drawTableLinkRow)
    }
    else if (window.location.hash.indexOf('#bulletins-dashboard?page=') !== -1) {
        var _document = document;
      //  document.getElementById('bulletinDashboard').click();
        currentPage = parseInt(window.location.hash.split('=')[1]);
        getBulletinCollectionByPage( currentPage, perPage, _document, drawTableBulletinRow)
    }
}

function hideUnusable(componentToShowId, componentArr) {

    componentArr.map(function (item) {

        // if (componentToShowId != item) {
        //     document.getElementById(componentToShowId).style.display = 'block';
        // }
        // else {
        //     document.getElementById(item).style.display = 'none';
        // }
        if (item != componentToShowId) {
            document.getElementById(item).style.display = 'none';
        } else {
            document.getElementById(componentToShowId).style.display = 'block';
        }
        //document.getElementById(componentToShowId).style.display = 'block';
    });
};

function enableDisable(enableArray, disableArray) {

    var len = Math.max(enableArray.length, disableArray.length);

    for (var i = 0; i < len; i++) {

        if (enableArray[i] != undefined) {
            document.getElementById(enableArray[i]).disabled = false;
        }
        if (disableArray[i] != undefined) {

            document.getElementById(disableArray[i]).disabled = true;
        }
    }
};

function fillEditLinkData(id) {

    for (var i = 0; i < linkData.length; i++) {
        if (linkData[i].linkId == id) {
            document.getElementById('targetLinkInput').value = linkData[i].target_link;
            document.getElementById('linkDescriptionInput').value = linkData[i].description;
            // document.getElementById('selectChangeBulletin').value = linkData[i].bulletin_id;
        }
    }
    //  hideUnusable('showBulletin', ['selectChangeBulletin']);
};

function fillEditBulletinData(id) {
    console.log("In edit bulletin" + bulletinData)
    for (var i = 0; i < bulletinData.length; i++) {
        if (bulletinData[i].id == id) {

            document.getElementById('campaignTitleInput').value = bulletinData[i].title;
            document.getElementById('campaignTypeInput').value = bulletinData[i].type;
            document.getElementById('campaignDescriptionInput').value = bulletinData[i].description;
            document.getElementById('startDateInput').value = bulletinData[i].start_date.split('T')[0];
            document.getElementById('endDateInput').value = bulletinData[i].expiration_date.split('T')[0];
            document.getElementById('sendDateInput').value = bulletinData[i].send_date.split('T')[0];
            document.getElementById('sendCopies').value = (bulletinData[i].send_copies != null) ? bulletinData[i].send_copies : 0;

        }
    }
};

function fillImageTag(id) {

    for (var i = 0; i < bulletinData.length; i++) {
        if (bulletinData[i].id == id) {

            var span = document.createElement('span');
            var img = document.createElement('img');
            span.innerText = '<img src="' + BASE_URL + '/img/' + btoa(bulletinData[i].id) + '" alt="" class="" id="" width="1px" height="1px;">';
            span.style.color = '#542c56';
            span.style.border = '6px solid #d6eae5';
            span.style.backgroundColor = '#bfe4bf';
            span.style.padding = '10px';

            document.getElementById('bodyControls').style.marginBottom = '5px';
            document.getElementById('bodyControls').style.marginTop = '5px';

            document.getElementById('bodyControls').appendChild(span);

        }
    }
}
