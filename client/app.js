var _ = window._;
var module = angular.module('bookmarksApp', [
	'ngRoute'
	]);
module.controller('indexCtrl', ['$scope', 'adapter', '$compile', function($scope, adapter, $compile) {
	$scope.bookmarks = [];
	$scope.filename = '';
	$scope.folders = [];
	adapter.getBookmarkS('folder=root', function(err, bookmarks) {
		if(!err) {
			bookmarks = _.map(bookmarks, function(item) {
				item.editMode = false;
				return item;
			});
			$scope.bookmarks = $scope.bookmarks.concat(bookmarks);	
		}
	});
	adapter.getFolderS(function(err, folders) {
		if (!err)
			$scope.folders = $scope.folders.concat(folders);
		console.log($scope.folders);
	});
	$('#add-bookmark').on('click',function() {
		var title = $('#title').val();
		var url = $('#url').val();

		if(_.isEmpty(title) || _.isEmpty(url)) {
			$('.error').removeClass('hidden');
		}
		else {
			$('.error').addClass('hidden');
			adapter.postBookmark(title, url, 'root', function(err, bookmark) {
				if (!err) {
					bookmark.editMode = false;
					$scope.bookmarks.push(bookmark);
				}
			});
		}
	});

	$scope.doEdit = function(id) {
		$scope.bookmarks = _.map($scope.bookmarks, function(item) {
			if(item._id === id) {
				item.editMode = !item.editMode;
				var selector = '[name=save][id=' + id + ']';
				//$(selector).toggleClass('hide');
			}
			return item;
		});
	}

	$scope.doSave = function(id) {
		var titleSelector = '[name=title][id=' + id + ']';
		var urlSelector = '[name=url][id=' + id + ']';

		var title = $(titleSelector).val();
		var url = $(urlSelector).val();
		var folder = 'root';
		adapter.putBookmark(id, title, url, folder, function(err, bookmark) {
			if(!err) {
				$scope.bookmarks = _.map($scope.bookmarks, function(item) {
					if(bookmark._id === item._id) {
						item.url = bookmark.url;
						item.title = bookmark.title;
						item.folder = bookmark.folder;
						item.editMode = false;
					}
					return item;
				});
			}
		});
	}

	$scope.doDelete = function(id) {
		var query = 'id='+id;
		adapter.deleteBookmark(query, function(err, doc) {
			if (!err) {
				$scope.bookmarks = _.reject($scope.bookmarks, function(item) {
					return doc._id===item._id;
				});
			}
		});
	}

	$scope.doSaveFolder = function(event) {
		var elem = event.target;
		var folder = elem.value;
		console.log(folder);
		adapter.postFolder(folder, function(err, doc) {
			if(!err) {
				console.log(doc);
				$scope.folders.push(doc);
				$(elem).closest('.folder-unit').attr('id', doc._id); //this is useful when u r dragging
				$(elem).blur();
				$('.create-folder').find('input').val('');
				$('.create-folder').addClass('hide');

			}
		});
	};

	$scope.doCreateFolder = function() {
		$('.create-folder').removeClass('hide');
	}

	$scope.doDeleteFolder = function(id) {
		var query = 'id=' + id;
		adapter.deleteFolder(query, function(err, res) {
			if(!err) {
				$scope.folders = _.reject($scope.folders, function(item) {
					return item._id === id;
				});
			}
		});
	}
}]);