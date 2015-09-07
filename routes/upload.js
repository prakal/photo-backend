// might need to escape url to prevent attacks
var express = require('express');
var router = express.Router();
// import db
var db = require('../app/config.js')

router.post('/', function(req, res, next) {
  console.log(req.body);
  // write to database
  db.knex.raw('INSERT INTO photos ("image_url","user_id","group_id") VALUES ('+"'"+req.body.image_url+"','"+req.body.user_id+"','"+req.body.group_id+"')")
    .then(function(returnData){
      res.json(returnData);
    });
});

module.exports = router;