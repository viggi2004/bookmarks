angular.module('bookmarksApp').
directive('ngEnter', function() {
	return function(scope, element, attrs) {
		element.bind("keydown keypress", function(event) {
			if(event.which == 13) {
				scope.$apply(function(){
					scope.$eval(attrs.ngEnter, {'event': event});
				});
				event.preventDefault();
			}
		});
	}
})
.directive('myFolder', function() {
  return {
    restrict: 'E',
    templateUrl: './views/folder.html'
  };
})
.directive('ngDraggable', function() {
	return {
		link : function(scope, elem, attr) {
			$(elem).draggable();
		}
	}
})
.directive('ngDroppable', function(adapter) {
	return {
		link: function(scope, elem, attr) {
			$(elem).on('dblclick', function(event) {
				var folderId = $(event.target).closest('.folder-unit').attr('id');
				var folder = _.findWhere(scope.folders, {'_id': folderId});
				if(folder) {
					scope.$apply(function(){
						scope.currentDir.folderName = folder.name;
					});
				}
			});
			$( elem ).droppable({
  		accept: '.bookmark-list',
  		drop: function(event, ui) {
  			var folderId = $(event.target).attr('id');
  			var bookmarkId = $(ui.helper).attr('id');
  			$(ui.helper).addClass('hide');
  			var folder = _.findWhere(scope.folders, {_id: folderId});
  			var bookmark = _.findWhere(scope.bookmarks, {_id: bookmarkId});
  			adapter.putBookmark(bookmarkId, bookmark.title, bookmark.url, folder.name, function(err, doc) {
  				if(!err) {
  					scope.bookmarks = _.map(scope.bookmarks, function(item) {
  						if (item._id === doc._id) {
	  						item.title = doc.title;
	  						item.folder = doc.folder;
	  						item.url = doc.url;
  						}
  						return item;
  					});
  				}
  			});
   		}
		});
		}
	}
})


