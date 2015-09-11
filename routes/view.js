var express = require('express');
var router = express.Router();
var db = require('../app/config.js')
exports.view = function(io){
	return function(req,res,next){
		// provide image only, filtered by primary id in photos table, rendered as an image, not as json
		// filter is the req.url.slice(4), as url is view/
		
		db.knex('photos')
			.where({'photos.id':req.url.slice(6)})
			.increment('views',1)
			.then(function(){
				db.knex('photos')
					.where({'photos.id':req.url.slice(6)})	
					.select('*')
					.then(function(data){
						console.log(data[0]);
						// increase view count on photo based on primary key
						if (data[0]){
							// there is data present
							io.emit('updatedData',data[0]);
							var image = data[0].image_url
				  			res.render('view',{'image':image});
						}
						else {
							// no data present, render generic image
							res.render('view',{'image':'http://www.kickoff.com/chops/images/resized/large/no-image-found.jpg'});
						}
					})
					.catch(function(error){
							res.json(error);
				  	});
			});
		
	};
};