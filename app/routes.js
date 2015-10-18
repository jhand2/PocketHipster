module.exports = function(app) {

	var Markov = require('../markov.js');
	var datFile = "./public/res/big_poems.dat";
	var markov = Markov(datFile);

	app.post('/api/poems', function(req, res) {
		console.log(req.body);

		var tags = req.body.data;

		var poemArr = [];

		tags.forEach(function(tag) {
			poemArr.push(markov.createLine(tag));
		});		

		res.json(poemArr);
	});

	app.get('/', function(req, res) {
		console.log("lol maybe?");
		res.sendfile('./public/index.html'); //load index.html
	});
}