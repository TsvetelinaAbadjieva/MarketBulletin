const express = require('express');
const app = express();

var http = require('http').Server(app);
var mysql = require('mysql');
var fc = require('../db/queries');
var path = require('path');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var passwordHash = require('password-hash');
var io = require('socket.io')(http);
var url = require('url');
// var bta = require('btoa-atob');
var btoa = require('btoa');
var atob = require('atob');
var BASE_URL = 'localhost:8000';
const PORT = process.env.PORT || 8000;

//var hashedPassword = passwordHash.generate('password123');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); next();
});

// routes for view navigation start

// app.all('*', (req, res)=>{
//   var res = req;
//   console.log(req)
// })

app.get('/', function (req, res) {

  res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

app.get('/img/:id?', function (req, res, next) {

  if (!req.params.id) {

    next();
    return;

  } else {
    var id = atob(req.params.id);

    fc.updateBulletin(id, res, function (res, err, result) {

      if (err)
        res.json({ message: 'Error occured' });
      res.sendFile(path.resolve(__dirname + '/../public/img.jpg'));
    });
  }
});


// app.use('/', express.static(path.join(__dirname, 'public')));
//app.use('/src', express.static(path.join(__dirname, '/../src/events')));

//-------
app.get('/home', function (req, res) {

  res.sendFile(path.resolve(__dirname + '/../src/events/home.js'));
});

app.get('/sw', function (req, res) {

  res.sendFile(path.resolve(__dirname + '/../public/sw1.js'));
});

app.get('/websql', function (req, res) {

  res.sendFile(path.resolve(__dirname + '/../public/websql.js'));
});

app.get('/indexedDB', function (req, res) {

  res.sendFile(path.resolve(__dirname + '/../public/indexedDb.js'));
});

app.get('/registration', function (req, res) {

  res.sendFile(path.resolve(__dirname + '/../src/events/registration.js'));
});

app.get('/login', function (req, res) {

  res.sendFile(path.resolve(__dirname + '/../src/events/login.js'));
});

app.get('/bulletinDashboard', function (req, res) {

  res.sendFile(path.resolve(__dirname + '/../src/events/bulletinDashboard.js'));
});

app.get('/editBulletin', function (req, res) {

  res.sendFile(path.resolve(__dirname + '/../src/events/editBulletin.js'));
});

app.get('/linksDashboard', function (req, res) {

  res.sendFile(path.resolve(__dirname + '/../src/events/linksDashboard.js'));
});


app.get('/testpage', function (req, res) {

  res.sendFile(path.resolve(__dirname + '/../src/events/testPage.js'));
});

app.get('/img', function (req, res) {

  res.sendFile(path.resolve(__dirname + '/../public/img.jpg'));
});

app.get('/addCampaign', function (req, res) {

  res.sendFile(path.resolve(__dirname + '/../src/events/addCampaign.js'));
});

app.get('/addLink', function (req, res) {

  res.sendFile(path.resolve(__dirname + '/../src/events/addLinks.js'));
});


app.get('/template', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../src/events/templates.js'));
});

app.get('/pagination', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../src/events/pagination.js'));
});

app.get('/logout', function (req, res) {

  res.sendFile(path.resolve(__dirname + '/../src/events/logout.js'));
});

app.get('/canvas', function (req, res) {

  res.sendFile(path.resolve(__dirname + '/../src/events/canvas.js'));
});

app.get('/online', function (req, res) {

  res.sendFile(path.resolve(__dirname + '/../src/events/checkonline.js'));
});

app.get('/style', function (req, res) {

  res.sendFile(path.resolve(__dirname + '/../public/styles/styles.css'));
});

app.get('/bootstrapstyle', function (req, res) {

  res.sendFile(path.resolve(__dirname + '/../public/styles/css/bootstrap.min.css'));
});

app.get('/bootstrapjs', function (req, res) {

  res.sendFile(path.resolve(__dirname + '/../public/styles/js/bootstrap.min.js'));
});

app.get('/help', function (req, res) {

  res.sendFile(path.resolve(__dirname + '/../src/functions/helpFunctions.js'));
});



//-------------------

// app.get('/socket', function (req, res) {

//   res.send(path.resolve('https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.2/socket.io.js'));
// });

// routes for view navigation end

//begin socket
// io.on('connection', function(socket){
//     socket.on('chat message', function(msg){
//       io.emit('chat message', msg);
//   });
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register("sw.js").then(function (registration) {
//     console.log('You are registered for caching');
//   }).catch(function (err) {
//     console.log('Registration error');
//     console.log(err);
//   });
// }


io.on('connection', function (socket) {
  socket.on('message', function (msg) {
    var message = JSON.parse(msg);
    io.emit('message', msg);
  });
});
//end socket

//begin routes for dbRequests
//working
// app.get('/img/:id', function (req, res) {
//   var id = atob(req.params.id);
//   console.log('In route 2')
//   fc.updateBulletin(id, res, function (res, err, result) {
//     if (err)
//       res.json({ status: 400, message: 'Something went wrong' });
//     res.redirect(path.resolve(__dirname + '/../public/img.jpg'));
//     // res.json({ status: 200, message: 'Bulletin updated!'})
//   })
//   console.log(req.params.id)
// });

app.get('/*:url/:id', function (req, res) {

  var id = parseInt(atob(req.params.id));
  var url = req.params.url;
  var str = btoa(id);

  fc.updateLink(id, res, function (res, resp, err) {
    if (err) {
      res.json({ message: 'Bad request' })
    }
    //res.json({message: 'Link visits incremented', data:resp[0]});
    res.redirect(resp[0].target_link);
  });
});



app.post('/register', function (req, res) {

  //res.send(fc.joinTables(1));
  // var user = {
  //   firstName: 'Dima',
  //   lastName: 'Angelova',
  //   username: 'd_angelova',
  //   email: 'd_angelova@gmail.com',
  //   password: '123456'
  // };
  //req.body = user;
  req.body.password = passwordHash.generate(req.body.password);
  fc.insertUser(req.body, function (result) {
    res.json(result);
  });

});

app.get('/clients', function (req, res) {

  fc.getClientCollection(res, function (res, error, result) {
    if (error) {
      res.json({ status: 400, message: 'Data could not be retrieved' })
    }

    res.json({ status: 200, message: 'Clients loaded!', data: result });
  });
});


app.post('/login', function (req, res) {

  var token = '';
  var hashedPassword = passwordHash.generate(req.body.password);

  fc.checkUserLogin(req.body, function (err, response) {
    if (err) {
      res.json({ status: 400, message: 'User not found!' })
    }
    else {

      if (response.length == 0) {
        res.json({ status: 400, message: 'User not found' });
      }
      if (response.length > 0) {
        if (passwordHash.verify(req.body.password, response[0].password)) {

          token = jwt.sign(response[0].id, 'someSecretKey');
          console.log(token);
          res.json({
            status: 200,
            message: 'Login successful',
            token: token,
            role: response[0].role,
            clientId: response[0].client_id
          });
        }
      }
    }// end else
  });
});

app.get('/bulletin', function (req, res) {
console.log('In get bulletin')
  // jwt.verify(req.token, 'someSecretKey', function (err, req) {
  //   if (err) {
  //     res.sendStatus(403);
  //     res.message('Operation Impossible!')
  //   }
  // });
  var page = (req.query.page != null) ? parseInt(req.query.page) :null;
  var offset = (parseInt(req.query.page)-1) * parseInt(req.query.perPage);
  var perPage = (req.query.perPage != null)? parseInt(req.query.perPage) : 10;
  if (page == null) {
      offset = 0;
      page = 0;
  }
  else if (page < 1) {
      page = 1;
      offset = 0;
  }
  var settings = {
    page: page,
    offset: offset,
    perPage: perPage
  }
  //var clientId = req.body.clientId;
  console.log('In request')
  var clientId = parseInt(req.query.clientId);

  console.log(req.query)
  fc.getBulletinCollection(res, clientId, settings, function (res, error, result) {
    console.log('Before erroro')

    if (error) {
      res.json({ status: 400, message: 'Data could not be retrieved' })
    }
    console.log('Before result')
    console.log(result);
    res.json({ status: 200, message: 'Bulletins loaded!', count: result.count, data: result.data });
  });
});


//start working post request

app.post('/bulletin', ensureToken, function (req, res) {
  jwt.verify(req.token, 'someSecretKey', function (err, req) {
    if (err) {
      res.sendStatus(403);
      res.message('Operation Impossible!')
    }
  });
  var clientId = parseInt(req.body.clientId);
  // var clientId = req.params.clientId;

  if (req.body.page < 1) {
    req.body.page = 1;
  }
  var settings = {
    page: req.body.page,
    offset: (req.body.page - 1) * req.body.perPage,
    perPage: req.body.perPage
  }
  console.log(req.body)
  fc.getBulletinCollection(res, clientId, settings, function (res, error, result) {
    if (error) {
      res.json({ status: 400, message: 'Data could not be retrieved' })
    }
    console.log(result);
    res.json({ status: 200, message: 'Bulletins loaded!', count: result.count, data: result.data });
  });
});


app.post('/edit/bulletin', ensureToken, function (req, res) {

  jwt.verify(req.token, 'someSecretKey', function (err, req) {
    if (err) {
      res.sendStatus(403);
      res.message('Operation Impossible!')
    }
  });

  fc.updateBulletinData(req.body, function (error, result) {
    if (error) {
      res.json({ status: 400, message: 'Request went wrong!' })
    }
    if (result.affectedRows > 0) {
      res.json({ status: 200, message: 'Bulletin was updated!', data: result });
    } else {
      res.json({ status: 401, message: 'Bulletin IS NOT updated!', data: result });
    }
  });
});

app.post('/delete/bulletin', ensureToken, function (req, res) {

  jwt.verify(req.token, 'someSecretKey', function (err, req) {
    if (err) {
      res.sendStatus(403);
      res.message('Operation Impossible!')
    }
  });

  fc.deleteBulletin(req.body, function (error, result) {
    if (error) {
      res.json({ status: 400, message: 'Request went wrong!' })
    }
    if (result.affectedRows > 0) {
      res.json({ status: 200, message: 'Bulletin was deleted!', data: result });
    } else {
      res.json({ status: 401, message: 'Bulletin IS NOT deleted!' });
    }
  });
});


app.post('/add/link', ensureToken, function (req, res) {

  jwt.verify(req.token, 'someSecretKey', function (err, req) {
    if (err) {
      res.sendStatus(403);
      res.message('Operation Impossible!')
    }
  });

  var trackLink = passwordHash.generate(req.body.trackLink);
  req.body.trackLink = trackLink + '/url';

  fc.insertLink(res, req.body, function (res, error, result) {
    if (error) {
      res.json({ status: 400, message: 'Request went wrong!' })
    }

    res.json({ status: 200, message: 'Link inserted!', data: result });
  });
});

app.post('/edit/link', ensureToken, function (req, res) {

  jwt.verify(req.token, 'someSecretKey', function (err, req) {
    if (err) {
      res.sendStatus(403);
      res.message('Operation Impossible!')
    }
  });

  fc.updateLinkData(req.body, function (error, result) {
    if (error) {
      res.json({ status: 400, message: 'Request went wrong!' })
    }
    if (result.affectedRows > 0) {
      res.json({ status: 200, message: 'Link was updated!', data: result });
    } else {
      res.json({ status: 401, message: 'Link IS NOT updated!', data: result });
    }
  });
});

app.post('/delete/link', ensureToken, function (req, res) {

  jwt.verify(req.token, 'someSecretKey', function (err, req) {
    if (err) {
      res.sendStatus(403);
      res.message('Operation Impossible!')
    }
  });

  fc.deleteLinkData(req.body, function (error, result) {
    if (error) {
      res.json({ status: 400, message: 'Request went wrong!' })
    }
    if (result.affectedRows > 0) {
      res.json({ status: 200, message: 'Link was deleted!', data: result });
    } else {
      res.json({ status: 401, message: 'Link IS NOT deleted!' });
    }
  });
});


app.post('/add/campaign', ensureToken, function (req, res) {

  jwt.verify(req.token, 'someSecretKey', function (err, req) {
    if (err) {
      res.sendStatus(403);
      res.message('Operation Impossible!')
    }
  });


  fc.insertBulletin(res, req.body, function (res, error, result) {
    if (error) {
      res.json({ status: 400, message: 'Request went wrong!' })
    }

    res.json({ status: 200, message: 'Campaign inserted!', data: result });
  });
});

app.get('/links',  function (req, res) {

  // jwt.verify(req.token, 'someSecretKey', function (err, req) {
  //   if (err) {
  //     res.sendStatus(403);
  //     next();
  //     //res.message ='Operation Impossible!';
  //   }
  // });
  //  var clientId = req.body.clientId;
  if (parseInt(req.query.page) < 1) {
    req.query.page = 1;
  }
  var obj = {
    clientId: req.query.clientId,
    bulletinId: req.query.bulletinId,
    offset: (req.query.page - 1) * req.query.perPage,
    perPage: req.query.perPage
  }

  fc.getLinkCollection(res, obj, function (res, error, result) {
    if (error) {
      res.json({ status: 400, message: 'Data could not be retrieved' })
    }
    console.log(result);
    res.json({ status: 200, message: 'Links loaded!', data: result });
  });
});



app.post('/links', ensureToken, function (req, res) {

  jwt.verify(req.token, 'someSecretKey', function (err, req) {
    if (err) {
      res.sendStatus(403);
      res.message('Operation Impossible!')
    }
  });
  //  var clientId = req.body.clientId;

  fc.getLinkCollection(res, req.body, function (res, error, result) {
    if (error) {
      res.json({ status: 400, message: 'Data could not be retrieved', data:[] })
    }

    res.json({ status: 200, message: 'Links loaded!', data: result });
  });
});

//====================================================

//get users assigned to project
app.post('/project/users', ensureToken, function (req, res, next) {
  console.log('In request');
  // req.body.id = 51;
  jwt.verify(req.token, 'someSecretKey', function (err, req) {
    if (err) {
      res.sendStatus(403);
      res.message('Operation Impossible!')
    }
  });
  //  var decodedToken = jwt.decode(req.token);
  //  console.log(decodedToken);
  //req.body.projectId = 2;
  fc.getUserByProjectCollection(req.body.projectId, function (error, data) {
    if (error) {
      res.json({ status: 400, message: 'Data could not be retrieved' })
    }
    console.log(data);

    res.json({ status: 200, message: 'Data retrieved', data: data });
  });
});

//get sections for project
app.post('/project/sections', function (req, res) {
  console.log('In request');

  fc.getSectionCollectionByProject(res, req.body.projectId, function (res, error, data) {
    if (error) {
      res.json({ status: 400, message: 'Data could not be retrieved' })
    }
    console.log(data);

    res.json({ status: 200, message: 'Data retrieved', data: data });
  });
});


app.post('/task/details', function (req, res) {
  var task = {
    taskId: req.body.taskId,
  };
  fc.getTaskDetails(task, function (error, data) {
    if (error) {
      res.json({ status: 400, message: 'Data could not be retrieved' })
    }
    console.log(data[0]);

    res.json({ status: 200, message: 'Data retrieved', data: data[0] });
  });
});

app.post('/task/update', ensureToken, function (req, res, next) {
  console.log('In request');
  // req.body.id = 51;
  jwt.verify(req.token, 'someSecretKey', function (err, req) {
    if (err) {
      res.sendStatus(403);
      res.message('Operation Impossible!')
    }
  });
  //  var decodedToken = jwt.decode(req.token);
  //  console.log(decodedToken);
  fc.updateTask(res, req.body, function (res, error, result) {
    if (error) {
      res.json({ status: 400, message: 'Data could not be retrieved' })
    }

    res.json({ status: 200, message: 'Data updated!' });
  });
});

//insert comments
app.post('/task/comment', ensureToken, function (req, res, next) {

  jwt.verify(req.token, 'someSecretKey', function (err, req) {
    if (err) {
      res.sendStatus(403);
      res.message('Operation Impossible!')
    }
  });

  var comment = {
    userId: jwt.decode(req.token),
    projectId: req.body.projectId,
    taskId: req.body.taskId,
    comment: req.body.comment
  };
  console.log(comment);
  fc.insertComment(res, comment, function (res, error, result) {
    if (error) {
      res.json({ status: 400, message: 'Data could not be retrieved' })
    }

    res.json({ status: 200, message: 'Comment added!' });
  });
});

//---------------------------
// app.get('/projects', ensureToken, function (req, res, next) {
//   console.log('In request');
//   // req.body.id = 51;
//   jwt.verify(req.token, 'someSecretKey', function (err, req) {
//     if (err) {
//       res.sendStatus(403);
//       res.message('Operation Impossible!')
//     }
//   });
//   var decodedToken = jwt.decode(req.token);
//   console.log(decodedToken);
//   fc.getProjectCollection(res, decodedToken, function (res, error, data) {
//     if (error) {
//       res.json({ status: 400, message: 'Data could not be retrieved' })
//     }
//     res.json({ status: 200, message: 'Data retrieved', data: data });
//   });
// });
//-------------------
app.get('/user/projects', ensureToken, function (req, res, next) {
  console.log('In request');
  // req.body.id = 51;
  jwt.verify(req.token, 'someSecretKey', function (err, req) {
    if (err) {
      res.sendStatus(403);
      res.message('Operation Impossible!')
    }
  });
  var decodedToken = jwt.decode(req.token);
  console.log(decodedToken);
  fc.getProjectCollectionByUser(res, decodedToken, function (res, error, data) {
    if (error) {
      res.json({ status: 400, message: 'Data could not be retrieved' })
    }
    res.json({ status: 200, message: 'Data retrieved', data: data });
  });
});


function ensureToken(req, res, next) {

  var bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};




module.exports = app;
http.listen(PORT, function () {
  console.log('PMS app listening on port ' + PORT)
});
