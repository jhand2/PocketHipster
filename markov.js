// Markov Chain factory
// given an input file in the format
// startWord \t word:::count word:::count ...
// and . is a special character for end-line.
module.exports = function(inputfile) {
	var fs = require("fs");
	fs.readFile(inputfile, 'utf8', processData);
	
	// array of arrays, keys are words from
	var words = {};
		
	// private, please ignore
	// processes a file
	function processData(err, data) {
		if (err) throw err;
		var lines = data.split("\n");
		for(var i = 0; i < lines.length; i++) {
			var line = lines[i];
			var parts = line.split("\t");
			if (parts.length < 2) {
				continue;
			}
			var word = parts[0];
			words[word] = [];    
            for(var j = 1; j < parts.length; j++) {
                var token = parts[j];
                var p = token.split(":::");
                var count = parseInt(p[1]);
                if (isNaN(count))
                    count = 1;
                words[word].push({"word" : p[0], "count" : count});
            }
		}
	}
	
	// creates an array of markov chain's starting with the input array's 
	// words.
	this.createLines = function (worda) {
		var out = [];
		for(var i = 0; i < worda.length; i++) {
		    out[i] = createLine(worda[i]);
		}
		return out;
	}
	
	// creates a markov chain starting with word
	this.createLine = function (word) {
		sent = word;
		var n = word;;
        var max = Math.round(Math.random() * 5 + 12);
        var c = 0;
        var dontStop = ["to", "the", "that", "a", "of", "be", "are", 
            "at", "as", "am", "they", "my", "and", "on", "but", "or", "i",
            "i’ve"];
		while(n != null && (dontStop.indexOf(n) != -1 || c < max)) {
			n = getNext(n);
            if (n == null)
                return sent;
			sent += " " + n;
            c++;
		}
		return sent;
	}
	
	// private, gets the next word given the current word
	function getNext(word) {
		var w = words[word];
		var total = 0;
        if (w == undefined) {
            return null;
        }
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

	return this;
}
