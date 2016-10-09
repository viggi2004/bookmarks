var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var config = require('./config/index.js');
var bodyParser = require('body-parser');

mongoose.connect(config.mongo.uri);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + JSON.stringify(err));
  process.exit(-1);
});

var root = path.normalize(__dirname + '/..');
app.use('/app',express.static(path.join(root,'client')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./routes.js')(app);

app.listen(3000, function() {
	console.log('Server started at 3000 ');
});