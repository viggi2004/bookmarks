var express = require('express');
var router = express.Router();
var app = express();
require('./routes.js')(app);
app.listen(3000, function() {
	console.log('Server started at 3000');
});