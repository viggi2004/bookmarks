var mongoose = require('mongoose');
var schema = require('../Schema.js');
var bookmarkModel = mongoose.model('Bookmarks', schema.BookmarkSchema);

var post = function(req, res) {
	if (!req.body || !req.body.title || !req.body.url) {
		res.send(400);
		return;
	}

	bookmarkModel.create({
		title: req.body.title,
		url: req.body.url,
		folder: req.body.folder
	},
	function(err, bookmark) {
		if(bookmark)
			return res.json(bookmark);
	});
};
module.exports = post;