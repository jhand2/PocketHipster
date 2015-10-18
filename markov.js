// Markov Chain factory
// given an input file in the format
// startWord \t word:::count word:::count ...
// and . is a special character for end-line.
function Markov(inputfile) {
	var fs = require("fs");
	fs.open(inputfile, "r", load);
	
	function load(err, fd) {
		if (err) throw err;
		// fs.read(fd, buffer, offset, length, position, callback (err, bytesRead, buffer))
	}
}