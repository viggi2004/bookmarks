var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookmarkSchema = new Schema({
	'title' : String,
	'url' : String,
	'folder' : String
});

var folderSchema = new Schema({
	'name': String
});

module.exports =  {'bookmarkSchema' : bookmarkSchema,
  'folderSchema' : folderSchema
  };
