var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var PORT = process.env.PORT || 3000;

var friendData = require(path.join(__dirname, 'app/friends'));

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//require routes in js, pass in app into module express functions 
require(path.join(__dirname, 'routing/apiRoutes.js'))(app);
require(path.join(__dirname, 'routing/htmlRoutes.js'))(app);

//listen to port
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});