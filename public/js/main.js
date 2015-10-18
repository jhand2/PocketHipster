(function() {
	window.addEventListener("load", function() {
		// this.accessToken = 'g9h6FG0W7avkgKz2F0yfz8Lh3N71SB';
		// adding multiple tag lines....
		var tagline = new Array();
		tagline.push("Give us an image and well turn it into feels");
		tagline.push("Your poetry is too mainstream to belong here");
		tagline.push("It's meh, da best");
		tagline.push("Not as dope as Disneyland");

		document.getElementById("tagline").innerHTML = 
			tagline[Math.floor(tagline.length * Math.random())];

		$("#upload-url").on("click", function() {
			//ajax call to clarifai
			console.log("test");
			$.ajax( 
				{
					'url' : "https://api.clarifai.com/v1/tag/",
					'data' : { "url" : $("#paste-url").val() },
					'type' : "POST",
					'headers' : {
						'Authorization': 'Bearer ' + 'g9h6FG0W7avkgKz2F0yfz8Lh3N71SB'
					},
					'success' : function(data) { sendToServer(data) },
					'beforeSend' : function() { console.log("before?")},
					'error' : function(err) { console.log(err) }
				}
			);

			//ajax call to our node server
			function sendToServer(data) {
				console.log(JSON.stringify(data.results[0].result.tag.classes));
				$.ajax( "/api/poems",
				{
					'data' : { "data" : data.results[0].result.tag.classes },
					'dataType' : 'json',
					'method' : "POST",
					'success' : function(data) {
						console.log(data);
					}
				});
			}
		});
		
		var f = document.createElement("input");
		f.type = "file";
		f.style.visibility = "hidden";
		f.style.position = "absolute";
		f.style.top = 0;
		document.body.appendChild(f);
		
		$("#upload-file").on("click", function() {
			f.click();
			// $.ajax({
			// 	'type':
			// });
		});
	});
	
	
})();