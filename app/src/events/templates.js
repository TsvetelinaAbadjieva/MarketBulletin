
function drawTableBulletin(isAdmin) {

  document.getElementById('bodyControls').innerHTML = '';
  var isAdmin = JSON.parse(localStorage.getItem('user')).role;

  var display = 'none'
  if (isAdmin == 1) {
    display = '';
    drawAddBulletinBtn();
  }
  var template =
    '<table class="table table-hover table-inverse">' +
    '  <thead>' +
    '  <tr style="background-color:#bb7777">' +
    '    <th>#</th> ' +
    '    <th>Compaign Name</th> ' +
    '    <th>Publicity type</th> ' +
    '    <th>Track image</th> ' +
    '    <th>Visits</th> ' +

    '    <th>Links</th> ' +
    '    <th style="display:' + display + '">Edit</th> ' +
    '    <th style="display:' + display + '">Delete</th> ' +

    '  </tr>' +
    '</thead>' +
    '<tbody style="background-color:#f9f3f3">' +
    '</tbody>' +
    '</table>'
  return template;
}

function drawTableBulletinRow(_document, data, isAdmin) {

//  var pager = Pagination.init(currentPage, 5, true, true).create(page, 'bodyContainer', data);
  var display = 'none';
  var isAdmin = JSON.parse(localStorage.getItem('user')).role;

  if (isAdmin == 1) {
    display = '';
  }
  var fragment = _document.createDocumentFragment();
  _document.getElementById('bodyContainer').innerHTML = '';

  _document.getElementById('bodyContainer').innerHTML = drawTableBulletin(isAdmin);

  var totalRows = data.length;

  for (var i = 0; i < totalRows; i++) {

    tableRow = _document.createElement('tr');
    tableRow.innerHTML = '<tr>' +
      '  <th scope="row">' + data[i].id + '</th>' +
      '  <td>' + data[i].title + '</td> ' +
      '  <td>' + data[i].description + '</td> ' +
      '  <td><a href="' + BASE_URL + '/img/' + btoa(data[i].id) + '">' + BASE_URL + '/img/' + btoa(data[i].id) + '<a></td> ' +
      '  <td><span class="badge badge-warning">' + data[i].visits + '</span></td> ' +

      '  <td><a href="#list/' + data[i].id + '"><span class="glyphicon glyphicon-list" style="width:50; height:50"></span><a></td> ' +
      '  <td style="display:' + display + '"><a href="#editBulletin/' + data[i].id + '"><span class="glyphicon glyphicon-edit" style="width:50; height:50"><a></td> ' +
      '  <td style="display:' + display + '"><a href="#deleteBulletin/' + data[i].id + '"><span class="glyphicon glyphicon-remove" style="width:50; height:50"><a></td> ' +

      '</tr>';

    fragment.appendChild(tableRow);
  }
  _document.getElementsByTagName('table')[0].querySelector('tbody').appendChild(fragment);
};

function drawTableLink(isAdmin) {

  var display = 'none';
  var isAdmin = JSON.parse(localStorage.getItem('user')).role;

  if (isAdmin == 1) {
    display = '';
  }

  var template =
    '<table class="table table-hover table-inverse">' +
    '  <thead>' +
    '  <tr style="background-color:#bb7777">' +
    '    <th>#</th> ' +
    '    <th>Real link</th> ' +
    '    <th>Track link</th> ' +
    '    <th>Description - source</th> ' +
    '    <th>Number clicks</th> ' +

    '    <th style="display:' + display + '">Edit</th> ' +
    '    <th style="display:' + display + '">Delete</th> ' +

    '  </tr>' +
    '</thead>' +
    '<tbody style="background-color:#f9f3f3">' +
    '</tbody>' +
    '</table>'
  return template;
};

function drawTableLinkRow(_document, data, isAdmin) {

  var display = 'none';
  var isAdmin = JSON.parse(localStorage.getItem('user')).role;

  if (isAdmin == 1) {
    display = '';
  }

  _document.getElementById('campaignName').style.display = 'block';
  var fragment = _document.createDocumentFragment();
  _document.getElementById('bodyContainer').innerHTML = drawTableLink(isAdmin);
  var bodyContainer = _document.getElementById('bodyContainer');

  if (data.length > 0) {

    for (var i = 0; i < data.length; i++) {

      tableRow = _document.createElement('tr');
      tableRow.innerHTML = '<tr>' +
        '  <th scope="row">' + data[i].linkId + '</th>' +
        '  <td>' + data[i].target_link + '</td> ' +
        '  <td><a href="' + BASE_URL + '/url/' + btoa(data[i].linkId) + '">' + BASE_URL + '/url/' + btoa(data[i].linkId) + '</a></td> ' +

        '  <td>' + data[i].description + '</td> ' +
        '  <td><span class="badge badge-warning">' + data[i].visits + '</span></td> ' +
        '  <td style="display:' + display + '"><a href="#edit/' + data[i].linkId + '"><span class="glyphicon glyphicon-edit" style="width:50; height:50"><a></td> ' +
        '  <td style="display:' + display + '"><a href="#delete/' + data[i].linkId + '"><span class="glyphicon glyphicon-remove" style="width:50; height:50"><a></td> ' +

        '</tr>';

      fragment.appendChild(tableRow);
    }
  } else {

    tableRow = _document.createElement('tr');
    tableRow.innerHTML = '<tr><td colspan = 5 style="color:#5d075f;"> No data for this bulletin </td></tr>';
    _document.getElementById('bodyContainer').innerHTML = drawTableLink(isAdmin);
    fragment.appendChild(tableRow);
  }
  _document.getElementsByTagName('table')[0].querySelector('tbody').appendChild(fragment);
  // paginationCreate(linkData,'track-links');
};

function drawControlButtons() {

  var btnAddLink = document.createElement('button');
  btnAddLink.innerHTML = '<button id="btnAddLink"  type="button" class="btn btn-secondary btn-medium controlBtn" href="#add-link" data-toggle="modal" data-target="#linkModal" data-whatever="@mdo">Add Link</button>';

  var btnAddBulletin = document.createElement('button');
  btnAddBulletin.innerHTML = '<button id="addCampaignBtn" type="button" class="btn btn-secondary btn-medium controlBtn" href="#add-campaign">Add Campaign</button>';

  document.getElementById('bodyControls').appendChild(btnAddBulletin);
  document.getElementById('bodyControls').appendChild(btnAddLink);

  btnAddLink.addEventListener('click', function () {
    document.getElementById('addLink').click();
  });

  btnAddBulletin.addEventListener('click', function () {
    document.getElementById('addCampaignLink').click();
    document.getElementById('bodyControls').innerHTML = '';
  })
};

function drawAddBulletinBtn() {

  var btnAddBulletin = document.createElement('button');
  btnAddBulletin.innerHTML = '<button id="addCampaignBtn" type="button" class="btn btn-secondary btn-medium controlBtn" href="#add-campaign">Add Campaign</button>';

  document.getElementById('bodyControls').appendChild(btnAddBulletin);

  btnAddBulletin.addEventListener('click', function () {
    document.getElementById('addCampaignLink').click();
    enableDisable(['saveCampaign'], ['editCampaign']);
    document.getElementById('bodyControls').innerHTML = '';
  })
};

function drawAddLinkBtn() {

  var btnAddLink = document.createElement('button');
  btnAddLink.innerHTML = '<button id="btnAddLink"  type="button" class="btn btn-secondary btn-medium controlBtn" href="#add-link" data-toggle="modal" data-target="#linkModal" data-whatever="@mdo">Add Link</button>';

  document.getElementById('bodyControls').appendChild(btnAddLink);

  btnAddLink.addEventListener('click', function () {
    document.getElementById('addLink').click();
  });
};

function drawTestPage(_document, data, isAdmin) {

  var fragment = _document.createDocumentFragment();

  for (var i = 0; i < data.length; i++) {

    var template = '<a href="' + data[i].target_link + '"><span>Tracked link:"' + data[i].target_link + '</span></a>';
    var div = _document.createElement('div');
    div.innerHTML = template;
    fragment.appendChild(div);

    if (i == (data.lenght - 1)) {

      var imgUrl = data[i].client + '/' + data[i].title + '/' + data[i].description + '/img' + data[i].bulletin_id;
      var img = _document.createElement('img');
      img.innerHTML = '<img src="/../../public/img.png" alt="" width="10px" height="10px">';
      fragment.appendChild(img);
    }
  }
  _document.getElementById('testPage').appendChild(fragment);
}

function drawPageAfterLogin(_document) {
  var template =
    '<div class="navigationBtn border" id="linksLoad"><h4>Track Links</h4><a href="#track-links"><img  class="navigationBtn border" src="https://getsocial.ru/template/files/uploads/image/template/files/uploads/f/backlinks.gif" alt=""></a></div>' +
    '<div class="navigationBtn border" id="bulletinsLoad"><h4>Bulletins</h4><a href="#bulletins-dashboard"><img class="navigationBtn border" src="http://nonprofitorgs.files.wordpress.com/2011/09/socialmedia3.jpg" alt=""></a></div>';

  var div = _document.createElement('div');
  div.innerHTML = template;
  _document.getElementById('afterLoginBoard').appendChild(div);
}

function paginationCreate(data, href) {

  totalRows = (totalRows != 0) ? totalRows : data.length;
  perPage = (perPage != 1) ? perPage : 5;
  var numberPages = Math.ceil(totalRows / perPage);
  var page;

  if (currentPage < 1) {
    currentPage = 1;
  }
  var upperLimit = numberPages;
  
  paginationBodyDraw();
  var paginationUl = document.getElementById('pagination');

  var prev = document.createElement('li');
  prev.classList.add('page-item');
  prev.innerHTML = '<a class="page-link" href="#'+href+'" tabindex="-1" id="prevPage">Previous</a>';
  paginationUl.appendChild(prev);

  var next = document.createElement('li');
  next.classList.add('page-item');
  next.innerHTML = '<a class="page-link" href="#'+href+'" id="nextPage">Next</a>';

  for (var i = currentPage - 2; i <= upperLimit; i++) {

    if (i <= 1) {
      i = 1;
    }
    page = document.createElement('li');
    page.classList.add('page-item');
    page.id = 'li_'+i;
    page.innerHTML = '<a class="page-link" id="page_' + i + '" href="#'+href+'"><span class="page-link">' + i + '</span></a>';

    if (i == currentPage) {
      page.querySelector('a').classList.add('active');
      //page.querySelector('a').innerHTML = '<span class="page-link">' + i + '<span class="sr-only">(current)</span></span>';

    } else {
      page.querySelector('a').classList.remove('active');
      page.querySelector('a').innerHTML = '<span class="page-link">' + i + '</span>';
      page.querySelector('a').classList.remove('active-link');
    }
    paginationUl.appendChild(page);
    page.querySelector('#page_'+i).addEventListener('click', function () {
      //alert('page'+i)
      currentPage = this.id.split('_')[1];
      page.classList.add('active');
      page.querySelector('a').innerHTML = '<span class="page-link active-link">' + i + '<span class="sr-only">(current)</span></span>';

      if (page.id == 'li_'+currentPage) {
        page.classList.add('active-link');
      }else{
         page.classList.remove('active-link');
      }
      console.log(this)
      console.log(page);

      drawTableBulletinRow(document, data, null);
    });
  };

  paginationUl.appendChild(next);

  document.getElementById('prevPage').addEventListener('click', function () {
    currentPage--;
    if (currentPage < 1) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
    paginationUl.innerHTML = '';
    paginationCreate(data, href);
    drawTableBulletinRow(document, data, null);
  });

  document.getElementById('nextPage').addEventListener('click', function () {
    currentPage++;
    if (currentPage > numberPages) {
      this.disabled = true;
      currentPage = numberPages;
    } else {
      this.disabled = false;
    }

    paginationUl.innerHTML = '';
    paginationCreate(data, href);
    drawTableBulletinRow(document, data, null);
  });
};

function paginationBodyDraw() {

  var template = '<nav aria-label="Page navigation example">' +
    '<ul class="pagination justify-content-center" id="pagination">' +
    '</ul>' +
    '</nav>';
  var nav = document.createElement('nav');
  nav.innerHTML = template;
  return document.getElementById('bodyContainer').appendChild(nav);
};
