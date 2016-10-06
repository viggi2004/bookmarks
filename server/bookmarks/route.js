'use strict';
var express = require('express');
var router = express.Router();

	router.get('/',function(req,res) {
		console.log('hello');
		res.send(200);
	});

module.exports = router;