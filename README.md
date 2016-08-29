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
