var mongoose = require('mongoose');
var schema = require('../Schema.js'); 
var bookmarkModel = mongoose.model('Bookmarks', schema.bookmarkSchema);
 var getS = function(req, res) {
 	bookmarkModel.find(function(err, bookmarks) {
 		res.json(bookmarks);
 	});
 }
 module.exports = getS;