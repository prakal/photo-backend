var express = require('express');
var http 	= require('http');
var path    = require('path');
var app 	= express();

// Routes
var routes  = require('./../routes/index');
app.use('/', routes);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

