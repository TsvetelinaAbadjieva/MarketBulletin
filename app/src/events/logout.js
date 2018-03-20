document.getElementById('logoutLink').addEventListener('click', function () {

  var isLoggedIn = localStorage.getItem('token');

  if (isLoggedIn != null) {
    var user = localStorage.getItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    document.getElementById('loginLink').click();
    // document.getElementById('userLoggedIn').innerText = user+', You logged out the system';
    // document.getElementById('userLoggedIn').style.display = 'block';
    var domEl = document.getElementById('bodyControls');
    deleteChildren(domEl, 0);
    window.location.href = BASE_URL + '/#login';
    this.style.display = 'none';
    document.getElementById('loginLink').style.display = '';
    document.getElementById('registrationLink').style.display = '';
  }
});
