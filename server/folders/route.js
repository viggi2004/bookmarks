'use strict';
var express = require('express');
var router = express.Router();

	router.post('/', require('./post.js'));
	router.get('/', require('./getS.js'));
	router.delete('/', require('./deleteById.js'));
module.exports = router;