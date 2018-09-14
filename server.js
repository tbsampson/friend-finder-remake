var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var app = express();
var PORT = process.env.PORT || 3000; // fixed for heroku

//static
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('app/public'));

// routes
require('./app/routing/apiRoutes.js')(app, path);
require('./app/routing/htmlRoutes.js')(app, path);

app.listen(PORT, function() {
    console.log("I\'m listening... on port " + PORT);
})