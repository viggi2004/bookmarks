'use strict';

var route = function(app) {
	app.use('/bookmarks', require('./bookmarks/route.js'));
	app.use('/folders', require('./folders/route.js'));
}
module.exports = route;