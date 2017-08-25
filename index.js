var glob = require('glob');
var extend = require('extend');
var fs = require('fs');

function parseJSON(data) {
	let rtnJSON;

	try {
		rtnJSON = JSON.parse(data);
	} catch (e) {
		rtnJSON = null;
	}

	return rtnJSON;
}

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
			fs.readFile(file, 'utf8', (err, data) => {
				if (err) throw err;
				remaining -= 1;

				let parsedData = parseJSON(data);

				locals = extend(locals, parsedData);

				if(!remaining) return callback();
			});
		}
	});
};