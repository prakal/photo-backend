// might need to escape url to prevent attacks
var express = require('express');
var router = express.Router();
// import db
var db = require('../app/config.js')

router.get('/', function(req, res, next) {
	// provide entire photos table as a json object
	db.knex('photos')
		.select('*')
		.then(function(data){
  		res.json(data);
		})
});

router.get('/:number', function(req, res, next) {
	// provide filtered by group id photos table as a json object
	// filter is the req.url.slice(1)
	
	db.knex('photos')
		.where({'photos.group_id':req.url.slice(1)})
		.select('*')
		.then(function(data){
  		res.json(data);
		})
});



module.exports = router;