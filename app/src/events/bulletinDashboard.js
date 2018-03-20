var flagValidation = true;

document.getElementById('bulletinDashboard').addEventListener('click', function () {

    document.getElementById('head').style.display = 'block';
    document.getElementById('pageTitle').innerHTML = 'Bulletin Dashboard'

    hideUnusable('bodyContainer', componentArr);
    var _document = document;
    currentPage = (currentPage === null || currentPage == 1)? 1: currentPage;
    isOnline = checkOnlineStatus();
    console.log('isonline', isOnline)
    console.log('In bulletin click');

    if (isLoggedIn) {

        if (false === checkOnlineStatus()) {
            console.log('OFFLINE')
            getAllLocalData('bulletins', function (data) {
                bulletinData = data;
                console.log('-+++GETTING Data from WEBSQL', bulletinData);
                if (bulletinData.length > 0) {
                    //drawTableBulletinRow(_document, bulletinData, checkIsAdmin());
                    getBulletinCollectionByPageLocally(currentPage, perPage, _document, drawTableBulletinRow);
                }
            });
        }
        else if (true === checkOnlineStatus()) {
            console.log('ONLINE')
            perPage = 1;
            getBulletinCollection(_document);
            getBulletinCollectionByPage( currentPage, perPage, _document, drawTableBulletinRow)
            console.log('------')
        }
    }

});

//AS GET REQUEST
function getBulletinCollection(_document) {

    if (isLoggedIn) {
        var headers = {
            'Content-type': 'application/json',
            //'Authorization': 'Bearer ' + localStorage.getItem('token')
        };

        page = currentPage;
        var count = 0;

        var clientId = JSON.parse(localStorage.getItem('user')).clientId;
        var url = BASE_URL + '/bulletin?clientId=' + clientId + '&perPage=0&page=0';
        var method = 'GET';

        callAjax(method, url, headers, null, function (data) {

            if (data.data) {
                totalRows = data.data.count;
                count = data.data.count;

                var data = data.data;
                console.log('IN GET BULLETIN AJAX')

                console.log(data)
                bulletinData = data;
                refreshData('bulletins', bulletinData);
                console.log('In get Bulletin', bulletinData)
                //func(_document, bulletinData, checkIsAdmin());
            }
        });
    }
}

function getBulletinCollectionByPage(page, perPage, _document, func) {

    if (isLoggedIn) {
        var headers = {
            'Content-type': 'application/json',
            //'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        var count = 0;
        var container = document.getElementById('bodyContainer');

        var clientId = JSON.parse(localStorage.getItem('user')).clientId;
        var url = BASE_URL + '/bulletin?clientId=' + clientId + '&perPage=' + perPage + '&page=' + page;
        var method = 'GET';

        callAjax(method, url, headers, null, function (data) {

            if (data.data) {
              //  totalRows = data.data.count;
                count = data.count;

                var data = data.data;
                console.log('IN GET BULLETINPage AJAX')
                console.log(data);

                console.log('In get Bulletin', bulletinData)
                func(_document, data, null);
                var totalPages = (Math.ceil(count / perPage) >= 1) ? Math.ceil(count / perPage) : 1;

                printLinks(totalPages, page, totalPages, container, 'bulletins-dashboard', function(currentPage, perPage){
                  getBulletinCollectionByPage(currentPage, perPage, _document, drawTableBulletinRow);
                });

            }
        });
    }
};

function getBulletinCollectionByPageLocally(currentPage, perPage, _document, func){

console.log('In get bulletin locally')
  var offset = (currentPage-1)*perPage;
   var slicedData = sliceData(bulletinData, offset, perPage);
   var count = bulletinData.length || 0;
   var container = document.getElementById('bodyContainer');
   var totalPages = (Math.ceil(count / perPage) >= 1) ? Math.ceil(count / perPage) : 1;

   printLinks(totalPages, currentPage, totalPages, container, 'bulletins-dashboard', function(currentPage, perPage){
     getBulletinCollectionByPage(currentPage, perPage, _document, drawTableBulletinRow);
   });
};

function scliceData(array, offset, numRows){

  if( array && array.length > 0 && offset < array.length-1){
    offset = (offset-1 < 0) ?  0 : (offset-1);
    return array.slice(offset, numRows);
  }
  return;
};
// AS POST REQUEST
// function getBulletinCollection(_document, func) {

//     if (isLoggedIn) {
//         var headers = {
//             'Content-type': 'application/json',
//             'Authorization': 'Bearer ' + localStorage.getItem('token')
//         };

//         var reqObj = {
//             clientId: JSON.parse(localStorage.getItem('user')).clientId,
//             token: localStorage.getItem('token'),
//             perPage: perPage,
//             page: currentPage
//         }

//         page = currentPage

//         var clientId = JSON.parse(localStorage.getItem('user')).clientId;
//          var url = BASE_URL + '/bulletin' ;
//         var method = 'POST';

//         callAjax(method, url, headers, reqObj, function (data) {

//             if (data.data) {
//                 totalRows = data.count;
//                 var data = data.data;
//                  console.log('IN POST BULLETIN')

//                 console.log(data)
//                 bulletinData = data;
//                 dropTable('bulletins');
//                 initLocalDBTable('bulletins');
//                 insertDataLocally('bulletins', bulletinData);
//                 console.log('In get Bulletin', bulletinData)
//                 func(_document, bulletinData, checkIsAdmin());
//             }
//         });
//     }
// }
