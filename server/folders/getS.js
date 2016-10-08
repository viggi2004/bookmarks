var mongoose = require('mongoose');
var schema = require('../Schema.js');
var FolderModel = mongoose.model('Folders', schema.folderSchema);

var getS = function(req, res) {
	FolderModel.find({}, function(err, docs) {
		if(!err)
			res.json(docs);
	});
}
module.exports = getS;