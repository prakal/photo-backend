var express = require('express');
var http 	= require('http');
var app 	= express();
var path    = require('path');
var bodyParser = require('body-parser')
// import db
var db = require('../app/config.js')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.set('view options', {
    layout: false
});

// Routes
var routes  = require('./../routes/index');
var upload  = require('./../routes/upload');
var list  = require('./../routes/list');
var view  = require('./../routes/view');


app.set('views', path.join(__dirname, '../client/www'));
// add view engine as jade
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, '../client/www')));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

var io 		= require('socket.io').listen(server);
// socket.io code
io.on('connection', function(socket){
  console.log('a user connected');
  // watch for event in which a client adds an image to the photos table.
  
  });


app.use('/', routes);

// Routing
app.post('/upload', function(req,res,next){
	console.log('upload sidetrack');
	console.log(req.body);
	// write to database
	db.knex.raw('INSERT INTO photos ("image_url","user_id","group_id") VALUES ('+"'"+req.body.image_url+"','"+req.body.user_id+"','"+req.body.group_id+"') RETURNING *")
	  .then(function(returnData){
	    // watch for event in which a client adds an image to the photos table.
	    console.log('new data received. emitting to all clients');
	    // emit a socket event newData from server to all clients to update their view to include new items
	    io.emit('newData',returnData.rows[0]);
	    res.json(returnData.rows[0]);
	  });
});
app.use('/list', list);
app.use('/view', view);

module.exports = app;