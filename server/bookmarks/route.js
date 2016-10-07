'use strict';
var express = require('express');
var router = express.Router();

	router.get('/', require('./getS.js'));
	router.post('/', require('./post.js'));

module.exports = router;