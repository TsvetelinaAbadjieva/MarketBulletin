document.getElementById('trackLinks').addEventListener('click', function () {

    document.getElementById('head').style.display = 'block';
    document.getElementById('bodyControls').innerHTML = '';
    document.getElementById('pageTitle').innerHTML = 'Links Dashboard'
    allowAddLink();
    hideUnusable('bodyContainer', componentArr);

    bulletinId = 0;
    perPage = 1;
    currentPage = (currentPage === null || currentPage == 1)? 1: currentPage;

    var data = {};
    var isAdmin = JSON.parse(localStorage.getItem('user')).role;
    console.log(Pagination)
    // var pager = Pagination.init(2, perPage, true, true, 'bodyContainer', document, 'track-links');

    if (isLoggedIn != null) {
        var _document = document;
        if (isAdmin == 1) {
            drawAddLinkBtn();
        }
        if (false === checkOnlineStatus()) {
            getAllLocalData('tracklinks', function (data) {
                linkData = data;
                console.log('-+++ Link Data from WEBSQL ', linkData);
                if (linkData.length > 0) {
                    totalRowsLinks = linkData.length;
                }
            });

        } else {
            getBulletinCollection(_document, drawBulletinItems);
            getAllLinks(listId);
            getLinkCollectionByPage(page, perPage, _document, drawTableLinkRow);
        }

    } else {
        window.location.hash = 'home-dashboard';
    }
});

//as post request
// function getLinks(_document, func, listId) {


//     var bulletinId = (listId != 0) ? listId : 0;
//     var bulletin = document.getElementById('campaignName');
//     var adm = JSON.parse(localStorage.getItem('user')).role;
//     var isAdmin = (adm == 1) ? true : false;

//     var clientId = JSON.parse(localStorage.getItem('user')).clientId;
//     var method = 'POST';
//     var url = BASE_URL + '/links';
//     var headers = {
//         'Content-type': 'application/json',
//         'Authorization': 'Bearer ' + localStorage.getItem('token')
//     };
//     var reqObj = {
//         clientId: JSON.parse(localStorage.getItem('user')).clientId,
//         token: localStorage.getItem('token'),
//         bulletinId: bulletinId
//     }

//         callAjax(method, url, headers, reqObj, function (data) {

//             if (data.data) {

//                 var data = filterUniqueId(data.data);
//                 linkData = data;

//                 dropTable('tracklinks');
//                 initLocalDBTable('tracklinks');
//                 insertDataLocally('tracklinks', linkData);
//             console.log('IN POST links request')
//                 func(_document, linkData, isAdmin);
//                 selectItemByValue(bulletin, reqObj.bulletinId);
//             }
//         });
// }

//as get request
function getAllLinks(listId) {

    var bulletinId = (listId != 0) ? listId : 0;
    var bulletin = document.getElementById('campaignName');
    var adm = JSON.parse(localStorage.getItem('user')).role;
    var isAdmin = (adm == 1) ? true : false;
    var _document = document;
    var clientId = JSON.parse(localStorage.getItem('user')).clientId;
    var method = 'GET';
    var url = BASE_URL + '/links?clientId=' + clientId + '&bulletinId=' + 0 + '&perPage=' + 0 + '&page=' + 1;
    var headers = {
        'Content-type': 'application/json',
        // 'Authorization': 'Bearer ' + localStorage.getItem('token')
    };

    callAjax(method, url, headers, null, function (data) {

        if (data.data) {

            count = data.data.count;
            var data = filterUniqueId(data.data.result);
            linkData = data;

            refreshData('tracklinks', linkData);

            console.log('IN GET links AJAX request', data, totalRowsLinks)
            selectItemByValue(bulletin, bulletinId);
        }
    });
}

// function getPaginatedLinks(_this) {

//     var bulletinId = (listId != 0) ? listId : 0;
//     var _document = _this._document;

//     var bulletin = (_document.getElementById('campaignName') != null) ? _document.getElementById('campaignName') : 0;
//     var adm = JSON.parse(localStorage.getItem('user')).role;
//     var isAdmin = (adm == 1) ? true : false;
//     var perPage = _this.perPage;
//     var currentPage = _this.page;
//     var clientId = JSON.parse(localStorage.getItem('user')).clientId;

//     var method = 'GET';
//     var baseUrl = BASE_URL + '/links?clientId=' + clientId + '&bulletinId=' + bulletinId;
//     var url = BASE_URL + '/links?clientId=' + clientId + '&bulletinId=' + bulletinId + '&perPage=' + _this.perPage + '&page=' + _this.page;

//     var headers = {
//         'Content-type': 'application/json',
//        // 'Authorization': 'Bearer ' + localStorage.getItem('token')
//     };

//     callAjax(method, url, headers, null, function (data) {

//         if (data.data) {

//             var data = filterUniqueId(data.data.result);
//             var count = data.length;

//             console.log('IN GET links AJAX request', data, totalRowsLinks)
//             drawTableLinkRow(_this._document, data, isAdmin);
//             selectItemByValue(bulletin, bulletinId);
//             _this.totalPages = (Math.ceil(count / perPage) >= 1) ? Math.ceil(count / perPage) : 1;
//             _this.url = baseUrl;
//             _this.getLinks(function (_this) {
//                 getPaginatedLinks(_this);
//             });
//         }
//     });
// };

function getLinkCollectionByPage(page, perPage, _document, func) {

    var _document = document;
    currentPage = page;
    var bulletinId = (document.getElementById('campaignName') != null) ? document.getElementById('campaignName').value : 0;
    var bulletin = (document.getElementById('campaignName') != null) ? document.getElementById('campaignName') : 0;
    var adm = JSON.parse(localStorage.getItem('user')).role;
    var isAdmin = (adm == 1) ? true : false;
    var clientId = JSON.parse(localStorage.getItem('user')).clientId;
    var container = document.getElementById('bodyContainer');

    var method = 'GET';
    var url = BASE_URL + '/links?clientId=' + clientId + '&bulletinId=' + bulletinId + '&perPage=' + perPage + '&page=' + page;

    var headers = {
        'Content-type': 'application/json',
        // 'Authorization': 'Bearer ' + localStorage.getItem('token')
    };

    callAjax(method, url, headers, null, function (data) {

        if (data.data) {
            console.log('IN GET links AJAX request', data)
            var data = filterUniqueId(data.data.result);
            var count = data.length;

            if (data.length > 0) {
              func(_document, data, null)
                //drawTableLinkRow(_document, data, isAdmin);
            }
            selectItemByValue(bulletin, bulletinId);
            //var totalPages = 4;
            var totalPages = (Math.ceil(count / perPage) >= 1) ? Math.ceil(count / perPage) : 1;
            printLinks(totalPages, page, totalPages, container, 'track-links', function(page, perPage){
              getLinkCollectionByPage(currentPage, perPage, _document, drawTableLinkRow);
            });
        }
    });
};

function printLinks(numberLinks, page, totalPages, container, href, callback) {

    var page = (page != null) ? page : 1;
    currentPage = page;
    var startPage = 1;
    var lastPage = totalPages;
    var backArrow = document.createElement('li');
    backArrow.classList.add("page-item");

    var nav = document.createElement('nav');
    var ul = document.createElement('ul');

    ul.classList.add('pagination');
    nav.appendChild(ul);
    container.appendChild(nav);

    backArrow.innerHTML =
        '<a class="page-link" href="#' + href + '?page=' + (currentPage-1) + '" aria-label="Previous">' +
        '  <span aria-hidden="true">&laquo;</span>' +
        '  <span class="sr-only">Previous</span>' +
        '</a>';
    ul.appendChild(backArrow);
    backArrow.querySelector('a').addEventListener('click', function () {
        currentPage--;
        if (currentPage < 1) currentPage = 1;
        callback(currentPage, perPage);
    });

    for (var i = startPage; i <= lastPage; i++) {

        var li = document.createElement('li');
        li.classList.add('page-item');
        li.id = "li_" + i;
        li.innerHTML = '<a id="page_' + i + '" class="page-link" href="#' + href + '?page=' + i + '">' + i + '</a>';
        ul.appendChild(li);

        li.querySelector('#page_' + i).addEventListener('click', function () {
            currentPage = parseInt(this.innerText);
            console.log('******', i);
            callback(currentPage, perPage);
        });
    }

    var nextArrow = document.createElement('li');
    nextArrow.classList.add("page-item");
    nextArrow.innerHTML =
        '<a class="page-link" href="#' + href + '?page=' + (currentPage+1) + '" aria-label="Next">' +
        '  <span class="sr-only">Next</span>' +
        '  <span aria-hidden="true">&raquo;</span>' +
        '</a>';
    ul.appendChild(nextArrow);

    nextArrow.querySelector('a').addEventListener('click', function () {
        currentPage++;
        if (  currentPage > totalPages) {
              currentPage = totalPages;
        }
        callback(  currentPage, perPage);
    });
}

function drawBulletinItems(_document, data, isAdmin) {

    var bulletinList;
    for (var j = 0; j < 1; j++) {
        if (j == 0) {

            _document.getElementById('selectBulletins').style.display = 'block';
            bulletinList = _document.getElementById('campaignName');
            bulletinList.style.marginTop = '5px';
            bulletinList.classList.add('bulletinList');

        }

        //if needed to change bulletin, uncomment this code
        // else if (j == 1) {

        //     _document.getElementById('selectBulletinDiv').style.display = 'block';
        //     bulletinList = _document.getElementById('selectChangeBulletin');
        //     bulletinList.classList.add('bulletinList');
        // }

        while (bulletinList.childNodes.length > 2) {
            bulletinList.removeChild(bulletinList.lastChild);
        }

        var fragment = _document.createDocumentFragment();
        if (data.length > 0) {

            for (var i = 0; i < data.length; i++) {

                var option = _document.createElement('option');
                option.value = data[i].id;
                option.innerHTML = data[i].title;
                fragment.append(option);
            }
        } else {
            fragment.innerHTML = '';
        }
        bulletinList.appendChild(fragment);
    }//end for
}

document.getElementById('campaignName').addEventListener('change', function () {

    listId = this.value;
    getLinks(document, drawTableLinkRow, listId);
    selectItemByValue(this, listId);

    var isAdmin = JSON.parse(localStorage.getItem('user')).role;
    var span = document.getElementById('bodyControls').querySelector('span');
    var parent = null;

    if ((span || listId == 0) && isAdmin) {
        parent = span.parentElement;
        deleteChildren(parent, 1);
    }
    else if (span || listId == 0) {
        parent = span.parentElement;
        deleteChildren(parent, 0);
    }
    fillImageTag(listId);
});

function allowAddLink() {
    document.getElementById('addLink').style.display = '';
    document.getElementById('separatorAfter').style.display = '';
};

function filterUniqueId(arr) {

    var result = [];
    var len = arr.length;
    for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i].linkId != arr[i + 1].linkId && (i + 1) < arr.length)
            result.push(arr[i]);
    }
    result.push(arr[len - 1]);
    return result;
};
