var mongoose = require('mongoose');
var schema = require('../Schema.js'); 
var bookmarkModel = mongoose.model('Bookmarks', schema.bookmarkSchema);
 var getS = function(req, res) {
 	var folder = req.query.folder;
 	var condition = {};
 	if(folder)
 		condition = {'folder' : folder};
 	bookmarkModel.find(condition, function(err, bookmarks) {
 		res.json(bookmarks);
 	});
 }
 module.exports = getS;