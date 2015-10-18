// Markov Chain factory
// given an input file in the format
// startWord \t word:::count word:::count ...
// and . is a special character for end-line.
exports.Markov = function(inputfile) {
	var fs = require("fs");
	fs.readFile(inputfile, 'utf8', processData);
	
	// array of arrays, keys are words from
	var words = [];
	
	// datastructure used for word/count pairs
	function Word(w, c) {
		this.word = w;
		this.count = c;
	}
	
	// private, please ignore
	// processes a file
	function processData(err, data) {
		if (err) throw err;
		var lines = data.split("\n");
		for(var i = 0; i < lines.length; i++) {
			var line = lines[i];
			var parts = line.split("\t");
			var word = parts[0];
			var tokens = parts[1].split(" ");
			if (tokens.length > 0) {
				words[word] = [];
				for(var j = 0; j < tokens.length; j++) {
					var token = tokens[j];
					var p = token.split(":::");
					var w = new Word(p[0], parseInt(p[1]));
					words[word].push(w);
				}
			}
		}
	}
	
	// creates an array of markov chain's starting with the input array's 
	// words.
	function createLines(worda) {
		var out = [];
		for(var i = 0; i < worda.length; i++) {
			out[i] = createLine(worda[i]);
		}
		return out;
	}
	
	// creates a markov chain starting with word
	function createLine(word) {
		sent = word;
		var n = getNext(word);
		while(n != null) {
			sent += " " + n;
			n = getNext(n);
		}
		return sent;
	}
	
	// private, gets the next word given the current word
	function getNext(word) {
		var w = words[word];
		var total = 0;
		for(var i = 0; i < w.length; i++) {
			total += w[i].count;
		}
		var countTo = Math.floor(Math.random() * total);
		for(var i = 0; i < w.length; i++) {
			countTo -= w[i].count;
			if (countTo <= 0) {
				if (w[i].word == ".") {
					return null;
				} else {
					return w[i].word;
				}
			}
		}
	}
}