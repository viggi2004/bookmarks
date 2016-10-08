var mongoose = require('mongoose');
var schema = require('../Schema.js');
var bookmarkModel = mongoose.model('Bookmarks', schema.bookmarkSchema);

var deleteById = function(req, res) {

	var id = req.query.id;
	if(!id) {
		res.send(400);
		return;
	}
	bookmarkModel.findOneAndRemove({_id: id}, function(err, doc) {
		if(!err)
			res.json(doc);
	});
}

module.exports = deleteById;