module.exports = function(app) {

	var Markov = require('../markov.js');
	var datFile = "./public/res/naughtyHarry.dat";
	var markov = Markov(datFile);

	app.post('/api/poems', function(req, res) {
		console.log(req.body);

		var tags = req.body.data;

		tags.forEach(function(tag) {
			console.log(markov.createLine(tag));
		});

		var poemArr = [];
		poemArr.push(markov.createLine("the"));

		res.json(poemArr);
	});

	app.get('/', function(req, res) {
		console.log("lol maybe?");
		res.sendfile('./public/index.html'); //load index.html
	});
}