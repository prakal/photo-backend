var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	// provide entire photos table as a json object
	res.render('updates',{});
});


module.exports = router;

