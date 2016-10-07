var mongoose = require('mongoose');
var schema = require('../Schema.js');
var bookmarkModel = mongoose.model('Bookmarks', schema.bookmarkSchema);

var putById = function(req, res) {
	var id = req.body._id;
	if (!id) {
		res.send(400);
		return;
	}
	var body = {
		$set : {
			title : req.body.title,
			url: req.body.url,
			folder: req.body.folder
		}
	}
	var options = {
		new: true
	};

	bookmarkModel.findOneAndUpdate({_id: id}, body, options, function(err, update) {
		res.json(update);
	});
}
module.exports = putById;