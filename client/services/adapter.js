var module = angular.module('bookmarksApp').factory(
	'adapter',['$http', function($http) {
		var adapter = {};
		
		adapter.getBookmarkS = function(query, cb) {
			var postTo = '/bookmarks?' + query;
			$http.get(postTo).then(function(res) {
				cb(null, res.data);
			}, function(res) {
				cb(res.data, null);
			});
		};
		
		adapter.postBookmark = function(title, url, folder, cb) {
			var postTo = '/bookmarks';
			var json = {
				'title' : title,
				'url' : url,
				'folder' : folder
			}
			$http.post(postTo, json).then(function(res) {
				cb(null, res.data);
			}, function(res) {
				cb(res.data, null);
			});
		};

		adapter.putBookmark = function(id, title, url, folder, cb) {
			var postTo = '/bookmarks';
			var json = {
				'_id': id,
				'title' : title,
				'url' : url,
				'folder' : folder
			}
			$http.put(postTo, json).then(function(res) {
				cb(null, res.data);
			}, function(res) {
				cb(res.data, null);
			});
		};

		adapter.deleteBookmark = function(query, cb) {
			var postTo = '/bookmarks?' + query;
			$http.delete(postTo).then(function(res) {
				cb(null, res.data);
			},function(res) {
				cb(res.data, null);
			});
		};

		adapter.postFolder = function(folder, cb) {
			var postTo = '/folders';
			var json = {
				name: folder
			}
			$http.post(postTo, json).then(function(res) {
				cb(null, res.data);
			},function(res) {
				cb(res.data, null);
			});
		}

		adapter.getFolderS = function(cb) {
			var postTo = '/folders';
			$http.get(postTo).then(function(res) {
				cb(null, res.data);
			}, function(res) {
				cb(res.data, null);
			});
		}

		adapter.deleteFolder = function(query, cb) {
			var postTo = '/folders?' + query;
			$http.delete(postTo).then(function(res) {
				cb(null, res.data);
			}, function(res) {
				cb(res.data, null);
			});
		}
		return adapter;
	}]);