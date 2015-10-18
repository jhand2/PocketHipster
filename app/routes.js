module.exports = function(app) {

	var Markov = require('Markov');

	app.post('/api/poems', function(req, res) {

		var markov = Markov(url("../public/res/naughtyHarry.dat"));

		var sentence = markov.createLine("wand");

		console.log(sentence);

		res.json();
	});

	app.get('/', function(req, res) {
		res.sendfile('./public/index.html'); //load index.html
	});
}