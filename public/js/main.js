(function() {
	window.addEventListener("load", function() {
		// this.accessToken = 'g9h6FG0W7avkgKz2F0yfz8Lh3N71SB';
		// adding multiple tag lines....

		function deselect(e) {
  			$('.pop').slideFadeToggle(function() {
    			e.removeClass('selected');
  			});    
		}

		$('#upload-url').on('click', function() {
    		if($(this).hasClass('selected')) {
     			deselect($('#popup'));               
    		} else {
      			$(this).addClass('selected');
      			$('.pop').slideFadeToggle();
    		}
    		return false;
  		});

  		$('.close').on('click', function() {
    		deselect($('#contact'));
    		return false;
  		});

  		$.fn.slideFadeToggle = function(easing, callback) {
			return this.animate({ opacity: 'toggle', height: 'toggle' }, 'fast', easing, callback);
		};

		var tagline = new Array();
		tagline.push("Give us an image and well turn it into feels");
		tagline.push("Your poetry is too mainstream to belong here");
		tagline.push("It's meh, da best");
		tagline.push("Not as dope as Disneyland");

		document.getElementById("tagline").innerHTML = 
			tagline[Math.floor(tagline.length * Math.random())];

		$('#close-popup').on('click', function() {
			deselect($(this));
		});

		$("#upload-url").on("click", function() {
			var popup = $('#popup');
			popup.append('<img id="uppicture" src='+ $("#paste-url").val() +' />');
			$('#uppicture').css('max-width', '90%');
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
				$.ajax( "/api/poems",
				{
					'data' : { "data" : data.results[0].result.tag.classes },
					'dataType' : 'json',
					'method' : "POST",
					'success' : function(data) { initPopup(data) }
				});
			}

			var initPopup = function(data) {
				var img = $('upload-url').innerHTML;
				// img = "url('" + img + "');";
				//$('.messagepopup').style.backgroundImage = img;
				var popup = $('#popup');
                var par = $("#popup p");
                for(var i = 0; i < par.length; i++) {
                    par[i].remove();
                }
                data.forEach(function(tag) {
					console.log(tag);
					var p = document.createElement("P");
					p.innerHTML = tag;
					popup.append(p);
					var btn = $('#upload-url');
		    		if(btn.hasClass('selected')) {
		     			// deselect($(this));               
		    		} else {
		      			btn.addClass('selected');
		      			$('.pop').slideFadeToggle();
		    		}
				});
	    		return false;
			}
		});
		
		var f = document.createElement("input");
		f.type = "file";
		f.style.visibility = "hidden";
		f.style.position = "absolute";
		f.style.top = 0;
		document.body.appendChild(f);
        f.addEventListener("change", function(e) {
            console.log(e);
            $.ajax({
                'type': "POST",
                'enctype': "multipart/form-data",
                'url': "https://api.clarifai.com/v1/tag/",
                'data' : {'encoded_data' : "@" +  e.target.value},
                'headers' : {
						'Authorization': 'Bearer ' + 'g9h6FG0W7avkgKz2F0yfz8Lh3N71SB'
				},
                'success': function(data) {
                    sendToServer(data);
                }
            });
        });
		
		$("#upload-file").on("click", function() {
			f.click();
		});
	});
	
	
})();
