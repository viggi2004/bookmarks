var mongoose = require('mongoose');
var schema = require('../Schema.js');
var FolderModel = mongoose.model('Folders', schema.folderSchema);
var async = require('async');
var request = require('request');
var _ = require('underscore');

var deleteById = function(req, res) {
	var bag = {};
	var validate = function(callback) {
		var id = req.query.id;
		if(!id) {
			res.send(400);
			return callback('bad request', null);
		}
		bag.id = mongoose.Types.ObjectId(id);
		return callback(null, null);
	};

	var getFolderName = function(cb) {
		FolderModel.findOne({_id: bag.id}, function(err, doc) {
			if(doc) {
				bag.folderName = doc.name;
				return cb(null, null);
			}
			else
				return cb(err);
		});
	}

	var getBookmarks = function(cb) {
		var query = 'folder=' + bag.folderName;
		var to = 'http://localhost:3000/bookmarks?'+query;
		bag.bookmarkIds = [];
		request.get(to, function(err, response, body) {
			if(err)
				return cb(err, null);
			if(!_.isEmpty(body)) {
				bag.bookmarkIds = _.pluck(JSON.parse(body), '_id');
			}
			return cb(null, null);
		});
	};

	var removeBookmarks = function(cb) {
		async.each(bag.bookmarkIds, function(item, eachCb) {
			var query = 'id=' + item;	
			var to = 'http://localhost:3000/bookmarks?'+query;
				request.delete(to, function(err, response, body) {
					return eachCb();
				});
			}, function(err) {
				cb(err, null);
				}
		);
	}

	var deleteFolder = function(cb) {
		FolderModel.remove({_id: bag.id}, function(err, doc) {
			if(err)
				return cb(err, null);
			bag.removedFolder = doc;
			return cb(null, null);
		});
	}

	async.series([
		validate,
		getFolderName,
		getBookmarks,
		removeBookmarks,
		deleteFolder
		], function(err, resp) {
			res.json(bag.removedFolder);
		});
	
}

module.exports = deleteById;