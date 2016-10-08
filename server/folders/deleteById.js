var mongoose = require('mongoose');
var schema = require('../Schema.js');
var FolderModel = mongoose.model('Folders', schema.folderSchema);

var deleteById = function(req, res) {
	var id = req.query.id;
	if(!id) {
		res.send(400);
		return;
	}

	FolderModel.findOneAndRemove({_id: id}, function(err, doc) {
		if(!err)
			res.json(doc);
	});
}

module.exports = deleteById;