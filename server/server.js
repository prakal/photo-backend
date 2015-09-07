var express = require('express');
var http 	= require('http');
var path    = require('path');
var bodyParser = require('body-parser')
var app 	= express();
var path    = require('path');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Routes
var routes  = require('./../routes/index');
var upload  = require('./../routes/upload');
var list  = require('./../routes/list');
var view  = require('./../routes/view');


app.set('views', path.join(__dirname, '../client/www'));
// add view engine as jade
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, '../client/www')));


app.use('/', routes);

// Routing
app.use('/upload', upload);
app.use('/list', list);
app.use('/view', view);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


module.exports = app;