var mongoose = require('mongoose');
var schema = require('../Schema.js');
var FolderModel = mongoose.model('Folders', schema.folderSchema);
var _ = require('underscore');

var getS = function(req, res) {
	var ids = req.query.id;
	var objectIds = [];
	var cond = {};
	if (ids) {
		ids = ids.split(',');
		_.each(ids, function(id) {
			objectIds.push(mongoose.Types.ObjectId(id));
		});
		cond = {_id: {$in: objectIds}};
	}
	FolderModel.find(cond, function(err, docs) {
		if(!err)
			res.json(docs);
	});
}
module.exports = getS;