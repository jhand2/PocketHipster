module.exports = function(app) {

	var Markov = require('../markov.js');
	var datFile = "./public/res/naughtyHarry.dat";
	var markov = Markov(datFile);

	app.get('/api/poems', function(req, res) {

		var sentence = markov.createLine("the");
		console.log(sentence);
		console.log("");

		res.json();
	});

	app.get('/', function(req, res) {
		console.log("lol maybe?");
		res.sendfile('./public/index.html'); //load index.html
	});
}