document.getElementById('testPageLink').addEventListener('click', function(){

   window.location.href = BASE_URL+'/testhtml';
   document.getElementsByTagName('body')[0];
   
});

function testTemplate(obj) {

 var template = ' <h2>Bulletin sent  TO: </h2>'+
                ' <h4>'+obj.email+'</h4>'+
                ' <h5>'+obj.clientId+'</h5>'
                ' <ul>'+
                    '<li></li>'+
                ' </ul>';
                
  var div = document.createElement('div');
  div.innerHTML = template;
  document.getElementsByTagName('body')[0].appendChild(div);

};