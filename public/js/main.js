function submitLink() {

}

(function() {
	window.addEventListener("load", function() {
		// adding multiple tag lines....
		var tagline = new Array();
		tagline.push("Give us an image and well turn it into feels");
		document.getElementById("tagline").innerHTML = tagline[Math.floor(tagline.length * Math.random())];
	})
})();