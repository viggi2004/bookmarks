var mongoose = require('mongoose');
var schema = require('../Schema.js');
var folderModel = mongoose.model('Folders', schema.folderSchema);

var post = function(req, res) {
	var name = req.body.name;
	if(!name) {
		res.send(400);
		return;
	}
	var json = {
		'name': name
	};

	folderModel.create(json, function(err, doc) {
		if(!err) {
			res.json(doc);
		}
	});
}
module.exports = post;