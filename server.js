var express = require('express');
var http 	= require('http');
var path    = require('path');
var app 	= express();
var path    = require('path');

// Routes
var routes  = require('./../routes/index');


app.set('views', path.join(__dirname, '../client/www'));
// add view engine as jade
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, '../client/www')));


app.use('/', routes);
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

