(function() {
	window.addEventListener("load", function() {
		// adding multiple tag lines....
		var tagline = new Array();
		tagline.push("Give us an image and well turn it into feels");
		tagline.push("Your poetry is too mainstream to belong here");
		tagline.push("It's meh, da best");
		tagline.push("Not as dope as Disneyland");

		document.getElementById("tagline").innerHTML = 
			tagline[Math.floor(tagline.length * Math.random())];
		
		$("#upload-url").on("click", function() {
			$.ajax("/api/poems", 
			{
				"data" : $("#paste-url").val(),
				"method" : "GET"
			});
		});
		
		var f = document.createElement("input");
		f.type = "file";
		f.style.visibility = "hidden";
		f.style.position = "absolute";
		f.style.top = 0;
		document.body.appendChild(f);
		
		$("#upload-file").on("click", function() {
			f.click();
			//$.ajax("")
		});
	});
	
	
})();