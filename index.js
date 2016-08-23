var glob = require('glob');
var extend = require('extend');
var fs = require('fs');

/**
 * [set local data from glob of json files]
 * @param {String}   directory [directory to grab json from]
 * @param {Object}   locals    [current locals passed in to extend with site data]
 * @param {Function} callback  [next function for middleware]
 */
exports = module.exports = function (directory, locals, callback) {
	glob(directory, function (err, files) {
		if(err) return callback(err);
		if(!files.length) return callback();

		var remaining = files.length;

		for (var file of files) {
			fs.readFile(file, (err, data) => {
				if(err) throw err;
				remaining -= 1;
				locals = extend(locals, JSON.parse(data));
				if(!remaining) return callback();
			});
		}
	});
};