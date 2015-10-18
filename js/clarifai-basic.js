$(document).ready(
  function(){
      var clarifai = new Clarifai(
          {
            'clientId': 'YOUR_CLIENT_ID',
            'clientSecret': 'YOUR_CLIENT_SECRET' 
          }
      );
  }  
);

var clarifai = new Clarifai(
	{
		'acessToken': 1mrinzNSUpc2mjLYGiuzay3Yw3wXCT
	}
);

// Give a few positive examples and a name for the custom concept.
clarifai.positive('http://example.com/car.jpg', 'car');

// Give a few negative examples and a name for the custom concept.
clarifai.negative('http://example.com/not-a-car.jpg', 'car');

// Train the platform on your custom concept.
clarifai.train('car');

// Ask for a prediction on a new image with your custom concept.
clarifai.predict('http://example.com/a-new-car.jpg', 'car');