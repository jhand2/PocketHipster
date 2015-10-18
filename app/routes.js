module.exports = function(app) {
	app.post('/api/poems', function(req, res) {
		
	});

	app.get('/', function(req, res) {
		res.sendfile('./public/index.html'); //load index.html
	});
}