'use strict';
var express = require('express');
var router = express.Router();

router.get('/', require('./getS.js'));
router.post('/', require('./post.js'));
router.put('/', require('./putById.js'));
router.delete('/', require('./deleteById.js'));
module.exports = router;