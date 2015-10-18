module.exports = function(app) {

	var Markov = require('../markov.js');
    var datFile = "./public/res/mixtape.dat";
	var markov = Markov(datFile);

	app.post('/api/poems', function(req, res) {
		console.log(req.body);

		var tags = req.body.data;

		var poemArr = [];

		for (var i = 0; i < tags.length; i++) {
			if (i > 10) {
				break;
			}
			var sentence = markov.createLine(tags[i])
			if (sentence.trim().split(" ").length > 1) {
				poemArr.push(sentence);
			}
		}		

		res.json(poemArr);
	});

	app.get('/', function(req, res) {
		console.log("lol maybe?");
		res.sendfile('./public/index.html'); //load index.html
	});
}
