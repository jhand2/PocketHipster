var express 	   = require('express');
var app			   = express();
var bodyParser 	   = require('body-parser');
var methodOverride = require('method-override')

var port = process.env.PORT || 8080;

//Express configuration

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// parse application/vnd.api+json as json
// app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
// app.use(bodyParser.json({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// routes ==================================================
var routes = require('./app/routes'); // configure our routes

routes(app);

app.listen(port);

console.log("Listening on port " + port);

exports = module.exports = app;  