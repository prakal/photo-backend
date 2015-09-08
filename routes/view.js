// might need to escape url to prevent attacks
var express = require('express');
var router = express.Router();
var db = require('../app/config.js')

router.get('/:number', function(req, res, next) {
	// provide image only, filtered by primary id in photos table, rendered as an image, not as json
	// filter is the req.url.slice(1)
	
	db.knex('photos')
		.where({'photos.id':req.url.slice(1)})
		.increment('views',1)
		.then(function(){
			db.knex('photos')
				.where({'photos.id':req.url.slice(1)})	
				.select('*')
				.then(function(data){
					console.log(data[0]);
					// increase view count on photo based on primary key
		  		res.end('<img src='+data[0].image_url+'>');
				});
		})
});

module.exports = router;