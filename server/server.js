var _ = require('underscore');
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
// var upload  = require('./../routes/upload');
var list  = require('./../routes/list');
var view  = require('./../routes/view');
var updates  = require('./../routes/updates');


app.set('views', path.join(__dirname, '../client/www'));
// add view engine as jade
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, '../client/www')));

var server = app.listen(process.env.PORT || 3000, function () {
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
	// use underscore escape to escape image_url, group_id, user_id
	var image_url = _.escape(req.body.image_url);
	var user_id = _.escape(req.body.user_id);
	var group_id = _.escape(req.body.group_id);
	// check if ID is provided. if it is, then do a SQL update into db
	if (req.body.ID){
		// write to database
		db.knex.raw('UPDATE photos SET ("image_url","user_id","group_id","views") = ('+"'"+image_url+"','"+user_id+"','"+group_id+"','0') WHERE id = "+_.escape(req.body.ID)+" RETURNING *")
		  .then(function(returnData){
		    // watch for event in which a client adds an image to the photos table.
		    console.log('updated data received. emitting to all clients');
		    // emit a socket event newData from server to all clients to update their view to include new items
		    // console.log('returnData',returnData.rows[0]);
		    if (!returnData.rows[0]){
		    	// if ID does not match any primary key in photos table, return an error instead, and emit to updated as an error
		    	io.emit('updatedData',{'error':'primary key not correct. not added to database', 'ID':req.body.ID});
		    	res.json({'error':'primary key not correct. not added to database', 'ID':req.body.ID});
		    } else {
			    io.emit('updatedData',returnData.rows[0]);
			    res.json(returnData.rows[0]);
		    }
		  })
		  .catch(function(error){
		  	res.json(error);
		  });
	} else {
		// if ID is not provided, then use SQL insert with new ID
		// write to database
		db.knex.raw('INSERT INTO photos ("image_url","user_id","group_id") VALUES ('+"'"+image_url+"','"+user_id+"','"+group_id+"') RETURNING *")
		  .then(function(returnData){
		    // watch for event in which a client adds an image to the photos table.
		    console.log('new data received. emitting to all clients');
		    // emit a socket event newData from server to all clients to update their view to include new items
		    io.emit('newData',returnData.rows[0]);
		    res.json(returnData.rows[0]);
		  })
		  .catch(function(error){
		  	res.json(error);
		  });
	}
});
app.use('/list', list);
app.get('/view/:number', view.view(io));
app.use('/updates', updates);

module.exports = app;