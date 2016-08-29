# set-locals
Set local express data from multiple json files

## Usage as middleware in an express.js application

```
exports.globals = function (req, res, next) {
	let locals = res.locals;
	let appDir = path.dirname(require.main.filename);

	setLocals(`${appDir}/model/*.json`, locals, next);
};
```

## Usage with res.render and a single json file
```
exports = module.exports = function (req, res) {
	let appDir = path.dirname(require.main.filename);
	let locals = res.locals;
	
	// set the locals of the current page model and render the view with the callback
	setLocals(`${appDir}/model/index.json`, locals, function () {
	
		res.render('index', function (err, html) {
			if(err) {
				console.log(err);
				return res.redirect('/404');
			}
	
			return res.send(html);
		});
	});
};
```
