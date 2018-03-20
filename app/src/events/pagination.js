var Pagination = (function () {

  var page = 1;
  var totalPages = 100;
  var startPage = 1;
  var lastPage = 1;
  var perPage = 5;

  var showBackArrow = true;
  var showNextArrow = true;
  var numberLinks = 2;

  var containerId = null;
  var _document = null;
  var href = '';
  var url = '';


  // init = function (numberLinks, perPage, showBackArrow, showNextArrow, container, _document, href) {
  //
  //   this.perPage = perPage;
  //   this.showBackArrow = showBackArrow;
  //   this.showNextArrow = showNextArrow;
  //   this.numberLinks = numberLinks;
  //   this.container = container;
  //   this._document = _document;
  //   this.href = href;
  //   this.totalPages = 100;
  //   this.url = '';
  //
  //   return this;
  // };

  init = function (obj) {

    this.perPage = obj.perPage;
    this.showBackArrow = obj.showBackArrow;
    this.showNextArrow = obj.showNextArrow;
    this.numberLinks = obj.numberLinks;
    this.container = obj.container;
    this._document =obj._document;
    this.href = obj.href;
    this.totalPages = 100;
    this.url = '';

    return this;
  };
  setNumberLinks = function(numLinks){
    this.numberLinks = numLinks;
  };
   setPerPage = function (perPage){
     this.perPage = perPage;
   };
   setStartPage = function(startPage){
     this.startPage = startPage;
   };
   setLastPage = function(lastPage){
     this.lastPage = lastPage;
   };
   setHref = function(href){
     this.herf = herf;
   };
   setContainer = function(container){
     this.container = container;
   };

  getLinks = function (funcName) {

    this.page = (this.page > 1) ? this.page : 1;
    this.startPage = this.page;
    this.lastPage = (this.page + this.numberLinks > this.totalPages) ? this.totalPages : this.page + this.numberLinks;

    var container = this._document.getElementById(this.containerId);
    var nav = document.createElement('nav');
    var ul = document.createElement('ul');

    var _this = this;
    ul.classList.add('pagination');
    nav.appendChild(ul);
    container.appendChild(nav);

    if (this.showBackArrow == true) {

      var backArrow = document.createElement('li');
      backArrow.classList.add("page-item");

      backArrow.innerHTML =
        '<a class="page-link" href="#' + this.href + '?page=' + this.startPage + '" aria-label="Previous">' +
        '  <span aria-hidden="true">&laquo;</span>' +
        '  <span class="sr-only">Previous</span>' +
        '</a>';
      ul.appendChild(backArrow);
      backArrow.querySelector('a').addEventListener('click', function () {
        _this.page = _this.startPage--;
        if (_this.page < 1) _this.page = 1;
        _this.loadData(_this.page, funcName)

      });
    }

    for (var i = this.startPage; i <= this.lastPage; i++) {

      var li = document.createElement('li');
      li.classList.add('page-item');
      li.id = "li_" + i;
      li.innerHTML = '<a id="page_' + i + '" class="page-link" href="#' + this.href + '?page=' + i + '">' + i + '</a>';
      ul.appendChild(li);

      li.querySelector('#page_' + i).addEventListener('click', function () {
        _this.page = parseInt(this.innerText);
        console.log('******')
        _this.loadData(_this.page, funcName);
      });
    }

    if (this.showNextArrow == true) {

      var nextArrow = document.createElement('li');
      nextArrow.classList.add("page-item");
      nextArrow.innerHTML =
        '<a class="page-link" href="#' + this.href + '?page=' + this.lastPage + '" aria-label="Next">' +
        '  <span class="sr-only">Next</span>' +
        '  <span aria-hidden="true">&raquo;</span>' +
        '</a>';
      ul.appendChild(nextArrow);

      nextArrow.querySelector('a').addEventListener('click', function () {
        _this.page = _this.lastPage++;
        if (_this.page > _this.totalPages) _this.page = _this.totalPages;
        _this.loadData(_this.page, funcName)
      });
    }
  }

  printLinks = function(numberLinks, page, totalPages, container, href, callback) {

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
          //this callback is the load and render data function AJAX
          // ex.   getBulletinCollectionByPage(currentPage, perPage, _document, drawTableBulletinRow);

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
  return {

  //  init: init,
    printLinks: printLinks,
  }
})();




function printData(data) {
  var container = document.getElementById('dataLoaded');
  var fragment = document.createDocumentFragment();
  var len = data.length;
  for (var i = 0; i < len; i++) {
    var div = document.createElement('div');
    div.innerText = data[i];
    fragment.appendChild(div);
  }
  container.appendChild(fragment);
}

function fillData() {
  var data = [];
  for (var i = 0; i < 100; i++) {
    data[i] = i;
  }
  return data;
}
