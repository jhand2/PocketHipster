(function() {
	window.addEventListener("load", function() {
		// adding multiple tag lines....
		var tagline = new Array();
		tagline.push("Give us an image and well turn it into feels");
		tagline.push("Your poetry is too mainstream to belong here");
		document.getElementById("tagline").innerHTML = 
			tagline[Math.floor(tagline.length * Math.random())];
		
		$("#upload-url").on("click", function() {
			$.ajax("/api/poems", 
			{
				"data" : $("#paste-url").val(),
				"method" : "GET"
			});
		});
		
	});
	
	
})();