// deprecated: might need to escape url to prevent attacks
/*
var io = require('socket.io').listen();
var express = require('express');
var router = express.Router();
// import db
var db = require('../app/config.js')

router.post('/', function(req, res, next) {
  console.log(req.body);
  // write to database
  db.knex.raw('INSERT INTO photos ("image_url","user_id","group_id") VALUES ('+"'"+req.body.image_url+"','"+req.body.user_id+"','"+req.body.group_id+"')")
    .then(function(returnData){
      // watch for event in which a client adds an image to the photos table.
      console.log('new data received. emitting to all clients');
      // emit a socket event newData from server to all clients to update their view to include new items
      io.emit('newData',returnData);
      res.json(returnData);
    });
});

module.exports = router;
*/